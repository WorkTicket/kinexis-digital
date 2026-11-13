import { SITE } from "@/lib/site";
import { clientIp } from "@/lib/client-ip";
import {
  EMAIL_PATTERN,
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

const MAX_FILE = 4 * 1024 * 1024;
const MAX_FILES = 9;
const MAX_REQUEST = 22 * 1024 * 1024;
const MAX_TEXT = 20_000;

type MailAttachment = {
  filename: string;
  content: ArrayBuffer;
  type: string;
  file: File;
};

function visitorError(message: string, status: number) {
  return privateJson({ error: message }, { status });
}

function safeFilename(file: File, fallback: string) {
  return file.name.replace(/[\x00-\x1f\x7f\\/:*?"<>|]+/g, "-").trim().slice(0, 180) || fallback;
}

function collectAttachments(form: FormData): { files: File[]; error?: Response } {
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
    if (!attachmentAllowed(file)) {
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

  const collected = collectAttachments(form);
  if (collected.error) return collected.error;

  const lines: string[] = [];
  let textLength = 0;
  for (const [key, value] of form.entries()) {
    if (key === "_gotcha" || value instanceof File) continue;
    const label = key.replace(/[^a-z0-9 _-]/gi, "").slice(0, 50);
    const raw = String(value);
    if (raw.length > 5_000) return visitorError("That message is too long.", 400);
    const entry = raw.replace(/[\r\n\t\f\v]+/g, " ").replace(/\s+/g, " ").trim();
    textLength += label.length + entry.length;
    if (textLength > MAX_TEXT) return visitorError("That message is too long.", 400);
    if (label && entry) lines.push(`${label}: ${entry}`);
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

  try {
    const sent = await sendMail({
      name: safeName,
      replyTo,
      text,
      isUpdate,
      isCall,
      isIntake,
      files: collected.files,
    });
    if (sent === "sent") return privateJson({ ok: true });
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
  name, replyTo, text, isUpdate, isCall, isIntake, files,
}: {
  name: string;
  replyTo?: string;
  text: string;
  isUpdate: boolean;
  isCall: boolean;
  isIntake: boolean;
  files: File[];
}): Promise<"sent" | "unconfigured" | "failed"> {
  const recipients = contactRecipients();
  const subject = isIntake
    ? `Website intake from ${name}`
    : isCall
      ? `Strategy call request from ${name}`
      : isUpdate
        ? `Site update from ${name}`
        : `New message from ${name}`;

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
      await cloudflareEmail.send({
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
