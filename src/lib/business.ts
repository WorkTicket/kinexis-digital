/**
 * Canonical on-page business facts for schema and site metadata.
 * Remote-first agency — no public storefront; schema uses service-area address only.
 *
 * Phone ships as a production default so call CTAs render without waiting on
 * an empty GitHub secret. Set NEXT_PUBLIC_BUSINESS_PHONE to override.
 * Set it to an empty string to hide call CTAs (tests).
 */

/** E.164 — public click-to-call number. */
export const DEFAULT_BUSINESS_PHONE = "+13075003371";

function optionalEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value && value.length > 0 ? value : undefined;
}

function resolveBusinessPhone(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_BUSINESS_PHONE;
  if (raw !== undefined && raw.trim() === "") return undefined;
  return raw?.trim() || DEFAULT_BUSINESS_PHONE;
}

export const businessProfile = {
  name: "KINEXIS Digital",
  legalName: "KINEXIS Digital",
  email: "hello@kinexisdigital.com",
  description:
    "Digital marketing agency for home services and ecommerce. SEO, paid media, web design, CRO, and analytics scored on leads and revenue.",
  linkedIn: "https://www.linkedin.com/company/kinexisdigital",
  /** ISO 3166-1 alpha-2 — primary market; no street address published on site. */
  addressCountry: "CA",
  areaServed: ["Canada", "United States"],
  languages: ["English", "Spanish"] as const,
  phone: resolveBusinessPhone(),
} as const;

/** NANP display, e.g. +1 (307) 500-3371. */
export function formatBusinessPhone(raw?: string): string | undefined {
  if (!raw) return undefined;
  const digits = raw.replace(/\D/g, "");
  const national =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) return raw;
  return `+1 (${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6)}`;
}

export function getBusinessPhoneDisplay(): string | undefined {
  return formatBusinessPhone(businessProfile.phone) ?? businessProfile.phone;
}

/** tel: href from configured phone, or null when unavailable. */
export function getBusinessTelHref(): string | null {
  const phone = businessProfile.phone;
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  const keepPlus = phone.replace(/[^\d+]/g, "");
  return keepPlus ? `tel:${keepPlus}` : null;
}
