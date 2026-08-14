/**
 * Canonical on-page business facts for schema and site metadata.
 * Remote-first agency — no public storefront; schema uses service-area address only.
 *
 * Phone and booking URL are env-driven so we never fabricate contact channels.
 * Set NEXT_PUBLIC_BUSINESS_PHONE / NEXT_PUBLIC_BOOKING_URL to enable CTAs.
 */
function optionalEnv(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value && value.length > 0 ? value : undefined;
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
  /** E.164 preferred. Undefined when not configured — do not invent a number. */
  phone: optionalEnv("NEXT_PUBLIC_BUSINESS_PHONE"),
  /** Cal.com / Calendly / other booking URL. Undefined when not configured. */
  bookingUrl: optionalEnv("NEXT_PUBLIC_BOOKING_URL"),
} as const;

/** tel: href from configured phone, or null when unavailable. */
export function getBusinessTelHref(): string | null {
  const phone = businessProfile.phone;
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}
