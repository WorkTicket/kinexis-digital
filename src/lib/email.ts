import { getCloudflareContext } from "@opennextjs/cloudflare";
import { escapeHtml, escapeHtmlWithBreaks } from "@/lib/sanitize";

/** Inbox that receives form notifications (comma-separated OK). */
export const DEFAULT_CONTACT_TO_EMAIL = "hello@kinexisdigital.com";
/** Must be an address on the Cloudflare Email Sending–onboarded domain. */
export const DEFAULT_CONTACT_FROM_EMAIL = "forms@kinexisdigital.com";

export type SendEmailBinding = {
  send: (message: {
    to: string | string[];
    from: string | { email: string; name?: string };
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
  }) => Promise<unknown>;
};

export type EmailEnv = {
  EMAIL?: SendEmailBinding;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

export function getRecipientEmails(raw?: string | null): string[] {
  const source = raw?.trim() || DEFAULT_CONTACT_TO_EMAIL;
  return source
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function getEmailEnv(): Promise<EmailEnv> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as EmailEnv;
  } catch {
    return {
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    };
  }
}

/** Safe summary for server logs — never includes credentials. */
export function describeMailError(error: unknown): string {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const err = error as {
    code?: string;
    status?: number;
    message?: string;
  };

  const parts = [
    err.code,
    err.status != null ? `status=${err.status}` : null,
    err.message?.split("\n")[0],
  ].filter(Boolean);

  return parts.join(" | ") || "Unknown mail error";
}

export type KinexisMailPayload = {
  /** Display name in the From header, e.g. "KINEXIS Digital Contact". */
  fromName: string;
  replyTo: string;
  subject: string;
  title: string;
  rows: string;
  text: string;
  /** Plain-text footer (HTML-escaped by the template). */
  footer?: string;
};

export type SendKinexisMailResult =
  | { ok: true; sent: boolean }
  | { ok: false; reason: "missing_credentials" };

/**
 * Shared team-notification send used by contact, booking, and lead forms.
 * Uses Cloudflare Email Service (`env.EMAIL.send`) — same approach as
 * callpreferredplumbing / a1pslandscape.
 */
export async function sendKinexisMail(
  payload: KinexisMailPayload,
  logLabel = "Form",
): Promise<SendKinexisMailResult> {
  const env = await getEmailEnv();
  const isDev = process.env.NODE_ENV === "development";

  if (!env.EMAIL) {
    if (!isDev) {
      console.error(`${logLabel}: Cloudflare EMAIL binding not configured`);
      return { ok: false, reason: "missing_credentials" };
    }
    return { ok: true, sent: false };
  }

  const toEmails = getRecipientEmails(env.CONTACT_TO_EMAIL);
  const fromEmail = env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_CONTACT_FROM_EMAIL;

  await env.EMAIL.send({
    to: toEmails.length === 1 ? toEmails[0] : toEmails,
    from: { email: fromEmail, name: payload.fromName },
    subject: payload.subject,
    html: wrapKinexisEmailHtml(payload.title, payload.rows, payload.footer),
    text: payload.text,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });

  return { ok: true, sent: true };
}

export function wrapKinexisEmailHtml(title: string, rows: string, footer?: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#05060a;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0099cc,#00d4ff);padding:32px 40px;">
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">${escapeHtml(title)}</h1>
        <p style="margin:8px 0 0;font-size:14px;opacity:0.85;">KINEXIS Digital · kinexisdigital.com</p>
      </div>
      <div style="padding:40px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        ${
          footer
            ? `<div style="margin-top:32px;padding:16px 20px;background:rgba(0, 212, 255,0.06);border:1px solid rgba(0, 212, 255,0.15);border-radius:8px;">
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">${escapeHtml(footer)}</p>
        </div>`
            : ""
        }
      </div>
    </div>
  `;
}

export function emailRow(label: string, value: string, link = false): string {
  const cell = link
    ? `<a href="mailto:${escapeHtml(value)}" style="color:#00d4ff;text-decoration:none;">${escapeHtml(value)}</a>`
    : escapeHtml(value);

  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);width:120px;color:rgba(255,255,255,0.5);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#fff;font-size:15px;">${cell}</td>
    </tr>
  `;
}

export function emailMessageRow(message: string): string {
  return `
    <tr>
      <td style="padding:16px 0 0;color:rgba(255,255,255,0.5);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Message</td>
      <td style="padding:16px 0 0;color:#fff;font-size:15px;line-height:1.7;">${escapeHtmlWithBreaks(message)}</td>
    </tr>
  `;
}
