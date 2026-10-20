import { QUICK_FIELDS, LAUNCH_FIELDS, requiresTradeLicense, SMS_CONSENT_VERSION, SMS_CONSENT_TEXT } from "@/content/contractor-intake";
import {
  COMPETITOR_COUNT,
  INTAKE_SECTIONS,
  competitorKey,
  type IntakeCheckField,
} from "@/content/client-intake";
import { escapeHtml, escapeHtmlWithBreaks } from "@/lib/sanitize";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEXT_MAX = 500;
const AREA_MAX = 4000;
const COMP_MAX = 300;

export type IntakeMailRow = { label: string; value: string };

export type IntakeMailSection = {
  number: string;
  title: string;
  rows: IntakeMailRow[];
};

export type IntakeSubmission = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sections: IntakeMailSection[];
};

type ParseResult =
  | { ok: true; submission: IntakeSubmission }
  | { ok: false; error: string };

function readString(
  input: Record<string, unknown>,
  id: string,
  max: number,
  label: string,
): { ok: true; value: string } | { ok: false; error: string } {
  const value = input[id];
  if (value == null || value === "") return { ok: true, value: "" };
  if (typeof value !== "string") {
    return { ok: false, error: `"${label}" could not be read. Refresh and try again.` };
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    return { ok: false, error: `"${label}" is too long.` };
  }
  return { ok: true, value: trimmed };
}

function readChecks(
  input: Record<string, unknown>,
  field: IntakeCheckField,
): { ok: true; value: string[] } | { ok: false; error: string } {
  const value = input[field.id];
  if (value == null) return { ok: true, value: [] };
  if (!Array.isArray(value)) {
    return { ok: false, error: `"${field.label}" could not be read. Refresh and try again.` };
  }
  const allowed = new Set(field.options);
  const picked: string[] = [];
  for (const item of value) {
    if (typeof item !== "string" || !allowed.has(item)) {
      return { ok: false, error: `"${field.label}" has a selection we couldn't save. Refresh and try again.` };
    }
    if (!picked.includes(item)) picked.push(item);
  }
  if (field.max && picked.length > field.max) {
    return { ok: false, error: `Choose up to ${field.max} for "${field.label}".` };
  }
  return { ok: true, value: picked };
}

function readCompetitors(
  input: Record<string, unknown>,
): { ok: true; value: string } | { ok: false; error: string } {
  const lines: string[] = [];
  for (let index = 1; index <= COMPETITOR_COUNT; index += 1) {
    const parts: Record<"name" | "url" | "notes", string> = { name: "", url: "", notes: "" };
    for (const part of ["name", "url", "notes"] as const) {
      const read = readString(input, competitorKey(index, part), COMP_MAX, `Competitor ${index}`);
      if (!read.ok) return read;
      parts[part] = read.value;
    }
    if (!parts.name && !parts.url && !parts.notes) continue;
    const head = [parts.name, parts.url].filter(Boolean).join(" — ");
    lines.push(parts.notes ? `${index}. ${head}\n${parts.notes}` : `${index}. ${head}`);
  }
  return { ok: true, value: lines.join("\n\n") };
}

export function parseIntakeAnswers(raw: unknown): ParseResult {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, error: "Invalid submission." };
  }
  const input = raw as Record<string, unknown>;
  const sections: IntakeMailSection[] = [];
  let companyName = "";
  let contactName = "";
  let email = "";
  let phone = "";
  let signature = "";

  const newFields = [...QUICK_FIELDS, ...LAUNCH_FIELDS];
  const newIds = new Set(newFields.map(f => f.id));
  // Older request keys stay optional and continue to reach the same inbox.
  const legacySections = INTAKE_SECTIONS.map(section => ({ ...section, rows: section.rows.map(row => row.filter(f => !("id" in f) || !newIds.has(f.id))) }));
  for (const section of legacySections) {
    const rows: IntakeMailRow[] = [];
    for (const row of section.rows) {
      for (const field of row) {
        if (field.type === "note") continue;
        if (field.type === "competitors") {
          const read = readCompetitors(input);
          if (!read.ok) return read;
          if (read.value) rows.push({ label: "Competitors", value: read.value });
          continue;
        }
        if (field.type === "checks") {
          const read = readChecks(input, field);
          if (!read.ok) return read;
          if (read.value.length) rows.push({ label: field.label, value: read.value.join(", ") });
          continue;
        }
        const max = field.type === "textarea" ? AREA_MAX : TEXT_MAX;
        const read = readString(input, field.id, max, field.label);
        if (!read.ok) return read;
        if (field.id === "companyName") companyName = read.value;
        if (field.id === "primaryContact") contactName = read.value;
        if (field.id === "email") email = read.value;
        if (field.id === "phone") phone = read.value;
        if (field.id === "signature") signature = read.value;
        if (read.value) rows.push({ label: field.label, value: read.value });
      }
    }
    if (rows.length) {
      sections.push({ number: section.number, title: section.title, rows });
    }
  }

  const currentRows: IntakeMailRow[] = [];
  for (const field of newFields) {
    const rawValue = input[field.id];
    if (field.required && (typeof rawValue !== "string" || !rawValue.trim())) return { ok: false, error: `${field.en} is required.` };
    if (field.type === "checks") {
      if (rawValue == null) continue;
      if (!Array.isArray(rawValue) || rawValue.some(v => typeof v !== "string" || !field.options?.some(o => o[0] === v))) return { ok: false, error: `${field.en} has an invalid selection.` };
      if (rawValue.length) currentRows.push({ label: field.en, value: [...new Set(rawValue)].join(", ") });
      continue;
    }
    const read = readString(input, field.id, field.type === "textarea" ? AREA_MAX : TEXT_MAX, field.en);
    if (!read.ok) return read;
    if (read.value && field.options && !field.options.some(o => o[0] === read.value)) return { ok: false, error: `${field.en} has an invalid selection.` };
    if (field.id === "companyName") companyName = read.value;
    if (field.id === "primaryContact") contactName = read.value;
    if (field.id === "email") email = read.value;
    if (field.id === "phone") phone = read.value;
    if (read.value) currentRows.push({ label: field.en, value: read.value });
  }
  if (requiresTradeLicense(input.trade) && (typeof input.licenseNumber !== "string" || !input.licenseNumber.trim())) return { ok: false, error: "Texas license number is required for this trade." };
  if (input.smsConsent != null && typeof input.smsConsent !== "boolean") return { ok: false, error: "SMS consent must be a boolean." };
  const locale = input.locale === "es-419" || input.locale === "es-ES" ? input.locale : "en";
  const timestamp = new Date().toISOString();
  const page = readString(input, "pageUrl", 2000, "Page URL");
  if (!page.ok) return page;
  if (page.value && !/^https?:\/\//.test(page.value)) return { ok: false, error: "Invalid page URL." };
  currentRows.push(
    { label: "SMS consent", value: input.smsConsent === true ? "Yes" : "No" },
    { label: "Consent recorded at (server)", value: timestamp },
    { label: "Consent text version", value: SMS_CONSENT_VERSION },
    { label: "Consent text", value: SMS_CONSENT_TEXT[locale === "en" ? "en" : "es"] + (locale === "en" ? " See our Privacy Policy (/privacy) and Terms (/terms)." : " Vea la Política de Privacidad (/privacy) y los Términos (/terms).") },
    { label: "Locale", value: locale },
    { label: "Page URL", value: page.value },
    { label: "Signature date (server, America/Chicago)", value: new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()) },
  );
  sections.unshift({ number: "01", title: "Contractor preview", rows: currentRows });
  if (!companyName || !contactName || !email || !phone || !signature) {
    return {
      ok: false,
      error: "Company name, contact name, email, phone, trade, plan, and signature are required.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  return {
    ok: true,
    submission: { companyName, contactName, email, phone, sections },
  };
}

function mailBlock(label: string, value: string): string {
  return `<tr><td colspan="2" style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);"><div style="color:rgba(255,255,255,0.5);font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;">${escapeHtml(label)}</div><div style="color:#fff;font-size:15px;line-height:1.55;padding-top:4px;">${escapeHtmlWithBreaks(value)}</div></td></tr>`;
}

export function formatIntakeMail(submission: IntakeSubmission): {
  subject: string;
  text: string;
  rows: string;
} {
  const subject = `Website intake: ${submission.companyName} — ${submission.contactName}`.slice(0, 180);
  const textParts = [
    "Website intake questionnaire — Kinexis Digital",
    "",
    `Company: ${submission.companyName}`,
    `Contact: ${submission.contactName}`,
    `Email: ${submission.email}`,
  ];
  if (submission.phone) textParts.push(`Phone: ${submission.phone}`);
  textParts.push("", "Blank questions are left out.");
  const html: string[] = [
    mailBlock("Company", submission.companyName),
    mailBlock("Contact", submission.contactName),
    mailBlock("Email", submission.email),
  ];
  if (submission.phone) html.push(mailBlock("Phone", submission.phone));

  for (const section of submission.sections) {
    textParts.push("", `${section.number}  ${section.title.toUpperCase()}`);
    html.push(
      `<tr><td colspan="2" style="padding:22px 0 4px;color:#7dd3fc;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(section.number)}  ${escapeHtml(section.title)}</td></tr>`,
    );
    for (const row of section.rows) {
      textParts.push("", row.label, row.value);
      html.push(mailBlock(row.label, row.value));
    }
  }

  return {
    subject,
    text: textParts.join("\n"),
    rows: html.join(""),
  };
}
