import nodemailer from "nodemailer";
import { escapeHtml, escapeHtmlWithBreaks } from "@/lib/sanitize";

export type EmailCredentials = {
  toEmail: string;
  gmailUser: string;
  gmailPass: string;
};

export function getEmailCredentials(): EmailCredentials | null {
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!toEmail || !gmailUser || !gmailPass || gmailPass === "your-gmail-app-password-here") {
    return null;
  }

  return { toEmail, gmailUser, gmailPass };
}

export function createMailTransporter(creds: EmailCredentials) {
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: creds.gmailUser, pass: creds.gmailPass },
  });
}

export function wrapKinexisEmailHtml(title: string, rows: string, footer?: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#05060a;color:#fff;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#0099cc,#00d4ff);padding:32px 40px;">
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">${escapeHtml(title)}</h1>
        <p style="margin:8px 0 0;font-size:14px;opacity:0.85;">KINEXIS Digital — kinexisdigital.com</p>
      </div>
      <div style="padding:40px;">
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
        ${
          footer
            ? `<div style="margin-top:32px;padding:16px 20px;background:rgba(0, 212, 255,0.06);border:1px solid rgba(0, 212, 255,0.15);border-radius:8px;">
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">${footer}</p>
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
