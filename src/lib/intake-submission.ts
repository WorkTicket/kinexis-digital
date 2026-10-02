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

  for (const section of INTAKE_SECTIONS) {
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

  if (!companyName || !contactName || !email || !signature) {
    return {
      ok: false,
      error: "Company name, contact name, email, and signature are required.",
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
    "Website intake questionnaire — KINEXIS Digital",
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
