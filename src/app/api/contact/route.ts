import { getCloudflareContext } from "@opennextjs/cloudflare";
import { isPreviewSite, SITE } from "@/lib/site";
import { clientIp } from "@/lib/client-ip";
import { META_CONTENT_NAME_BY_FORM, sendMetaLeadCapi, type MetaLeadForm } from "@/lib/meta-capi";
import {
  EMAIL_PATTERN,
  contactDeliveryBlocked,
  contactEmailBinding,
  contactRecipients,
  logDeliveryFailure,
} from "@/lib/contact-mail";
import { isRateLimited } from "@/lib/rate-limit";
import { logApiError } from "@/lib/api-log";
import {
  attachmentAllowed,
  formDataByteLength,
  formEndpointAllowed,
  hasContentType,
  phoneLooksValid,
  privateJson,
  rejectCrossSite,
  rejectOversize,
  rejectReadOversize,
} from "@/lib/request-security";
import nodemailer from "nodemailer";
import { ATTRIBUTION_FIELDS, sanitizeMarketingAttribution } from "@/lib/marketing-attribution";

const MAX_FILE = 4 * 1024 * 1024;
const MAX_FILES = 9;
const MAX_REQUEST = 22 * 1024 * 1024;
const MAX_TEXT = 20_000;
const META_EVENT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,99}$/;

type MailAttachment = {
  filename: string;
  content: ArrayBuffer;
  type: string;
  file: File;
};

function visitorError(message: string, status: number) {
  return privateJson({ error: message }, { status });
}

function consentAllowsAttribution(request: Request) {
  const value = request.headers.get("cookie")?.match(/(?:^|;\s*)kinexis_consent=([^;]*)/)?.[1];
  if (!value) return { analytics: false, ads: false };
  try {
    const consent = decodeURIComponent(value);
    return {
      analytics: consent.startsWith("v1|") && /(?:^|\|)a=1(?:\||$)/.test(consent),
      ads: consent.startsWith("v1|") && /(?:^|\|)d=1(?:\||$)/.test(consent),
    };
  } catch {
    return { analytics: false, ads: false };
  }
}

function cookieValue(request: Request, name: string) {
  const prefix = `${name}=`;
  const part = (request.headers.get("cookie") || "").split(";").map((item) => item.trim()).find((item) => item.startsWith(prefix));
  if (!part) return undefined;
  try {
    return decodeURIComponent(part.slice(prefix.length));
  } catch {
    return undefined;
  }
}

function queueMetaLeadCapi(request: Request, input: {
  eventId: string;
  formPath: string;
  metaForm: MetaLeadForm;
  language: "en" | "es";
  email?: string;
  phone?: string;
}) {
  let context: ReturnType<typeof getCloudflareContext>;
  try {
    context = getCloudflareContext();
  } catch {
    return;
  }
  const env = context.env as CloudflareEnv & {
    META_CAPI_TOKEN?: string;
    META_TEST_EVENT_CODE?: string;
    NEXT_PUBLIC_META_PIXEL_ID?: string;
  };
  const token = env.META_CAPI_TOKEN?.trim();
  const pixelId = env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const testEventCode = env.META_TEST_EVENT_CODE?.trim();
  if (!token || !pixelId || (isPreviewSite() && !testEventCode)) return;

  const eventSourceUrl = new URL(input.formPath, SITE.url).toString();
  const task = sendMetaLeadCapi({
    ...input,
    eventSourceUrl,
    clientIp: clientIp(request) || undefined,
    clientUserAgent: request.headers.get("user-agent") || undefined,
    fbp: cookieValue(request, "_fbp"),
    fbc: cookieValue(request, "_fbc"),
    consent: true,
  }, pixelId, token, fetch, testEventCode).then((result) => {
    if (testEventCode) {
      console.info("Meta CAPI test event response", {
        endpointPath: `/v21.0/${pixelId}/events`,
        eventId: input.eventId,
        ...(result.status !== undefined ? { status: result.status } : {}),
        ...(result.eventsReceived !== undefined ? { events_received: result.eventsReceived } : {}),
        ...(result.messages ? { messages: result.messages } : {}),
        ...(result.fbtraceId ? { fbtrace_id: result.fbtraceId } : {}),
        ...(result.errorMessage ? { error: result.errorMessage } : {}),
        ...(result.networkError ? { networkError: true } : {}),
      });
    } else if (!result.accepted) {
      console.warn("Meta CAPI lead was not accepted", {
        eventIdPrefix: input.eventId.slice(0, 8),
        ...(result.status ? { status: result.status } : {}),
      });
    }
  }).catch(() => {
    if (testEventCode) {
      console.warn("Meta CAPI test event request failed", {
        endpointPath: `/v21.0/${pixelId}/events`,
        eventId: input.eventId,
        networkError: true,
      });
    } else {
      console.warn("Meta CAPI lead request failed", { eventIdPrefix: input.eventId.slice(0, 8) });
    }
  });

  try {
    (context.ctx as { waitUntil(promise: Promise<unknown>): void }).waitUntil(task);
  } catch {
    // Local runtimes may not expose an execution context; don't affect lead delivery.
    void task;
  }
}

function safeFilename(file: File, fallback: string) {
  return file.name.replace(/[\x00-\x1f\x7f\\/:*?"<>|]+/g, "-").trim().slice(0, 180) || fallback;
}

async function collectAttachments(form: FormData): Promise<{ files: File[]; error?: Response }> {
  const files: File[] = [];
  for (const value of form.values()) {
    if (!(value instanceof File) || value.size <= 0) continue;
    files.push(value);
  }
  if (files.length > MAX_FILES) {
    return { files, error: visitorError(`Please attach ${MAX_FILES} files or fewer.`, 400) };
  }
  for (const file of files) {
    if (file.size > MAX_FILE) {
      return { files, error: visitorError("Each attachment must be 4 MB or smaller.", 400) };
    }
    if (!(await attachmentAllowed(file))) {
      return { files, error: visitorError("Attachments must be a PDF, Word document, text file, or image.", 400) };
    }
  }
  return { files };
}

export async function POST(request: Request) {
  const rejected = rejectCrossSite(request) || rejectOversize(request, MAX_REQUEST);
  if (rejected) return rejected;
  if (!hasContentType(request, "multipart/form-data")) {
    return visitorError("That form could not be read. Please try again.", 415);
  }

  if (await isRateLimited("contact", clientIp(request), 120)) {
    return visitorError("Please wait a moment before sending another message.", 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch (error) {
    logApiError("contact", error);
    return visitorError("That form could not be read. Please try again.", 400);
  }

  const oversized = rejectReadOversize(formDataByteLength(form), MAX_REQUEST);
  if (oversized) return oversized;

  if (String(form.get("_gotcha") ?? "").trim()) return privateJson({ ok: true });

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  if (!name || name.length > 120) {
    return visitorError("Please add your name.", 400);
  }
  if (!email && !phone) {
    return visitorError("Please add a phone number or email.", 400);
  }
  if (email && (email.length > 200 || !EMAIL_PATTERN.test(email))) {
    return visitorError("Please add a valid email.", 400);
  }
  if (phone && !phoneLooksValid(phone)) {
    return visitorError("Please add a valid phone number.", 400);
  }
  // Phone-only leads must not Reply-To SITE.email (staff reply would bounce to ourselves).
  const replyTo = email || undefined;

  const collected = await collectAttachments(form);
  if (collected.error) return collected.error;

  const lines: string[] = [];
  let textLength = 0;
  const attributionInput: Record<string, unknown> = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const values = form.getAll(`kx_attr_${key}`);
    attributionInput[key] = values.length === 1 ? values[0] : null;
  }
  const consent = consentAllowsAttribution(request);
  const conversionValues = form.getAll("kx_conversion");
  const conversion = conversionValues.length === 1 ? conversionValues[0] : null;
  const isMarketingConversion = conversion === "preview" || conversion === "audit";
  const attribution = consent.analytics && isMarketingConversion
    ? sanitizeMarketingAttribution(attributionInput)
    : {};
  if (!consent.ads) {
    delete attribution.fbclid;
    delete attribution.gclid;
  }
  if (attribution.referrer) {
    try {
      if (new URL(attribution.referrer).origin === new URL(SITE.url).origin) delete attribution.referrer;
    } catch {
      delete attribution.referrer;
    }
  }
  for (const [key, value] of form.entries()) {
    if (
      key === "_gotcha" ||
      key === "kx_conversion" ||
      key === "kx_meta_form" ||
      key === "kx_event_id" ||
      key === "kx_form_path" ||
      key.startsWith("kx_attr_") ||
      value instanceof File
    ) continue;
    const label = key.replace(/[^a-z0-9 _-]/gi, "").slice(0, 50);
    const raw = String(value);
    if (raw.length > 5_000) return visitorError("That message is too long.", 400);
    const entry = raw.replace(/[\r\n\t\f\v]+/g, " ").replace(/\s+/g, " ").trim();
    textLength += label.length + entry.length;
    if (textLength > MAX_TEXT) return visitorError("That message is too long.", 400);
    if (label && entry) lines.push(`${label}: ${entry}`);
  }
  for (const [key, value] of Object.entries(attribution)) {
    lines.push(`Attribution ${key}: ${value}`);
  }
  if (collected.files.length) {
    lines.push(`attachments: ${collected.files.map((file) => file.name).join(", ")}`);
  }
  const text = lines.join("\n");
  const safeName = name.replace(/[\r\n]+/g, " ").slice(0, 120);
  const topic = String(form.get("topic") ?? "").trim();
  const isUpdate = String(form.get("request") ?? "").trim().length > 0;
  const isCall = topic === "strategy-call";
  const isIntake = topic === "intake";
  const isAudit = topic === "audit";
  const metaEventId = String(form.get("kx_event_id") ?? "").trim();
  const metaFormPath = String(form.get("kx_form_path") ?? "").trim();
  const metaFormValues = form.getAll("kx_meta_form");
  const metaFormValue = metaFormValues.length === 1 ? String(metaFormValues[0]).trim() : "";
  const metaForm = Object.prototype.hasOwnProperty.call(META_CONTENT_NAME_BY_FORM, metaFormValue)
    ? metaFormValue as MetaLeadForm
    : null;

  try {
    const sent = await sendMail({
      name: safeName,
      replyTo,
      text,
      isUpdate,
      isCall,
      isIntake,
      isAudit,
      formPath: metaFormPath,
      files: collected.files,
    });
    if (sent === "sent") {
      if (
        consent.ads &&
        metaForm &&
        (metaForm !== "audit" || isAudit) &&
        !isUpdate &&
        META_EVENT_ID_PATTERN.test(metaEventId) &&
        /^\/(?!\/)[A-Za-z0-9/_~.%\-]{0,240}$/.test(metaFormPath) &&
        !metaFormPath.includes("..")
      ) {
        const language = metaFormPath === "/es" || metaFormPath.startsWith("/es/") ||
          metaFormPath === "/es-es" || metaFormPath.startsWith("/es-es/")
          ? "es"
          : "en";
        queueMetaLeadCapi(request, {
          eventId: metaEventId,
          formPath: metaFormPath,
          metaForm,
          language,
          email: email || undefined,
          phone: phone || undefined,
        });
      }
      // `accepted: true` marks provider handoff. Honeypot returns `{ ok: true }` only.
      // GA4 generate_lead must wait for this marker; native clients may ignore it.
      return privateJson({ ok: true, accepted: true });
    }
    if (sent === "unconfigured") {
      return visitorError(`We could not send that from the site. Call ${SITE.phone} or email ${SITE.email}.`, 503);
    }
    return visitorError("Something went wrong. Please try again, or call us.", 502);
  } catch (error) {
    logApiError("contact", error);
    return visitorError("Something went wrong. Please try again, or call us.", 502);
  }
}

async function sendMail({
  name, replyTo, text, isUpdate, isCall, isIntake, isAudit, formPath, files,
}: {
  name: string;
  replyTo?: string;
  text: string;
  isUpdate: boolean;
  isCall: boolean;
  isIntake: boolean;
  isAudit: boolean;
  formPath: string;
  files: File[];
}): Promise<"sent" | "unconfigured" | "failed"> {
  if (contactDeliveryBlocked()) {
    console.error("Contact delivery blocked: preview has no CONTACT_PREVIEW_TO");
    return "unconfigured";
  }
  const recipients = contactRecipients();
  if (recipients.length === 0) return "unconfigured";
  const safeFormPath = /^\/(?!\/)[A-Za-z0-9/_~.%\-]{0,240}$/.test(formPath) && !formPath.includes("..")
    ? formPath
    : "";
  const spanish = /^\/es(?:-es)?(?:\/|$)/.test(safeFormPath);
  const pageLabels: Record<string, string> = spanish
    ? {
        "/es": "Inicio",
        "/es/contact": "Contacto",
        "/es/audit": "Auditoría web",
        "/es/strategy-call": "Llamada estratégica",
        "/es/intake": "Datos del sitio",
        "/es/update": "Cambios del sitio",
      }
    : {
        "/": "Home",
        "/contact": "Contact",
        "/audit": "Website audit",
        "/strategy-call": "Strategy call",
        "/intake": "Website intake",
        "/update": "Site update",
        "/lp/get-a-website": "Get-a-website landing page",
        "/lp/phoenix-preview": "Phoenix preview landing page",
      };
  const pageLabel = pageLabels[safeFormPath] ||
    (safeFormPath ? safeFormPath : "");
  const source = pageLabel ? ` · ${pageLabel}` : "";
  const subject = isIntake
    ? `${spanish ? "[ES] " : ""}Website intake${source} from ${name}`
    : isAudit
      ? `${spanish ? "[ES] " : ""}Website audit request${source} from ${name}`
    : isCall
      ? `${spanish ? "[ES] " : ""}Strategy call request${source} from ${name}`
    : isUpdate
      ? `${spanish ? "[ES] " : ""}Site update${source} from ${name}`
      : spanish
        ? `[ES] Mensaje nuevo${source} — ${name}`
        : `New message${source} — ${name}`;

  const attachments: MailAttachment[] = [];
  for (const [index, file] of files.entries()) {
    attachments.push({
      filename: safeFilename(file, `attachment-${index + 1}`),
      content: await file.arrayBuffer(),
      type: file.type || "application/octet-stream",
      file,
    });
  }

  const cloudflareEmail = contactEmailBinding();
  if (cloudflareEmail) {
    try {
      const providerResult = await cloudflareEmail.send({
        from: { email: SITE.email, name: SITE.name },
        to: recipients,
        ...(replyTo ? { replyTo: { email: replyTo, name } } : {}),
        subject,
        text,
        attachments: attachments.map(({ filename, content, type }) => ({
          filename,
          content,
          type,
          disposition: "attachment" as const,
        })),
      });
      const messageId =
        providerResult && typeof providerResult === "object" && "messageId" in providerResult &&
        typeof providerResult.messageId === "string"
          ? providerResult.messageId
          : undefined;
      console.warn("Contact delivery accepted", {
        provider: "Cloudflare Email",
        ...(safeFormPath ? { sourcePath: safeFormPath } : {}),
        ...(messageId ? { messageId } : {}),
      });
      return "sent";
    } catch (error) {
      logDeliveryFailure("Cloudflare Email", error);
    }
  }

  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (key && domain) {
    const from = process.env.MAILGUN_FROM || `${SITE.name} <${SITE.email}>`;
    const region = process.env.MAILGUN_REGION === "eu" ? "https://api.eu.mailgun.net" : "https://api.mailgun.net";
    const body = new FormData();
    body.append("from", from);
    for (const recipient of recipients) body.append("to", recipient);
    if (replyTo) body.append("h:Reply-To", replyTo);
    body.append("subject", subject);
    body.append("text", text);
    for (const { file, filename } of attachments) {
      body.append("attachment", file, filename);
    }
    const res = await fetch(`${region}/v3/${encodeURIComponent(domain)}/messages`, {
      method: "POST",
      headers: { Authorization: `Basic ${btoa(`api:${key}`)}` },
      body,
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) return "sent";
    console.error("Contact delivery failed", { provider: "Mailgun", status: res.status });
    return "failed";
  }

  const endpoint = process.env.FORM_ENDPOINT;
  if (endpoint) {
    if (!formEndpointAllowed(endpoint)) {
      console.error("Contact delivery failed", { provider: "form endpoint", reason: "disallowed URL" });
      return "failed";
    }
    const forwarded = new FormData();
    forwarded.append("name", name);
    if (replyTo) forwarded.append("email", replyTo);
    forwarded.append("message", text);
    for (const { file, filename } of attachments) {
      forwarded.append("file", file, filename);
    }
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: forwarded,
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) return "sent";
    console.error("Contact delivery failed", { provider: "form endpoint", status: res.status });
    return "failed";
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  if (gmailUser && gmailPassword) {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailPassword },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
    const result = await transport.sendMail({
      from: { name: SITE.name, address: gmailUser },
      to: recipients,
      ...(replyTo ? { replyTo: { name, address: replyTo } } : {}),
      subject,
      text,
      attachments: attachments.map(({ filename, content }) => ({
        filename,
        content: Buffer.from(content),
      })),
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    return result.accepted.length > 0 ? "sent" : "failed";
  }

  return "unconfigured";
}
