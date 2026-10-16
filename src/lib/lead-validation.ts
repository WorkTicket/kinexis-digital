import { isWebsiteValue } from "@/lib/website-url";

export const LEAD_LIMITS = {
  name: 200, businessName: 200, email: 254, phone: 50, website: 500,
  budget: 50, timeline: 80, role: 80, industry: 80, websiteStatus: 80,
} as const;

export const LEAD_MESSAGES = {
  role: "Choose your role.",
  industry: "Choose the type of work.",
  budget: "Choose a budget range.",
  timeline: "Choose when you want to start.",
  name: "Enter your name.",
  phone: "Enter a 10-digit phone number, like (919) 555-1234.",
  email: "Enter an email like name@company.com.",
  website: "That website doesn't look right. Check it, or leave it blank.",
  businessName: "Business name must be 200 characters or fewer.",
} as const;

export type LeadField = keyof typeof LEAD_MESSAGES;
export type LeadErrors = Partial<Record<LeadField, string>>;

export function normalizeEmail(raw: string): string {
  const value = raw.trim().replace(/^[<>"']+|[<>"'.]+$/g, "").trim();
  const at = value.lastIndexOf("@");
  return at < 0 ? value : value.slice(0, at + 1) + value.slice(at + 1).toLowerCase();
}

export function isValidEmail(raw: string): boolean {
  const value = normalizeEmail(raw);
  return value.length <= LEAD_LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function normalizePhone(raw: string): { e164: string; ext?: string } | null {
  if (raw.length > LEAD_LIMITS.phone) return null;
  const match = raw.trim().match(/^(.*?)(?:\s*(?:ext\.?|x)\s*(\d+))?$/i);
  if (!match) return null;
  const main = match[1].trim();
  if (!/^\+?[\d\s().-]+$/.test(main)) return null;
  const digits = main.replace(/\D/g, "");
  let e164: string;
  if (main.startsWith("+")) {
    if (digits.length < 8 || digits.length > 15) return null;
    if (digits.startsWith("1") && digits.length !== 11) return null;
    e164 = `+${digits}`;
  } else if (digits.length === 10) e164 = `+1${digits}`;
  else if (digits.length === 11 && digits.startsWith("1")) e164 = `+${digits}`;
  else return null;
  return { e164, ...(match[2] ? { ext: match[2] } : {}) };
}

export function formatPhoneForDisplay(e164: string): string {
  return e164.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
}

export function validateLeadStep1(values: { role: string; industry: string; budget: string; timeline: string }): LeadErrors {
  const errors: LeadErrors = {};
  for (const field of ["role", "industry", "budget", "timeline"] as const) {
    if (!values[field].trim() || values[field].length > LEAD_LIMITS[field]) errors[field] = LEAD_MESSAGES[field];
  }
  return errors;
}

export function validateLeadStep2(values: { name: string; phone: string; email: string; businessName?: string; website: string }): LeadErrors {
  const errors: LeadErrors = {};
  if (!values.name.trim() || values.name.length > LEAD_LIMITS.name) errors.name = LEAD_MESSAGES.name;
  if (!normalizePhone(values.phone)) errors.phone = LEAD_MESSAGES.phone;
  if (!isValidEmail(values.email)) errors.email = LEAD_MESSAGES.email;
  if (values.businessName && values.businessName.length > LEAD_LIMITS.businessName) errors.businessName = LEAD_MESSAGES.businessName;
  if (values.website.trim() && (values.website.length > LEAD_LIMITS.website || !isWebsiteValue(values.website))) errors.website = LEAD_MESSAGES.website;
  return errors;
}
