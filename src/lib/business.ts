/**
 * Canonical on-page business facts for schema and site metadata.
 * Remote-first agency — no public storefront; schema uses service-area address only.
 */
export const businessProfile = {
  name: "KINEXIS Digital",
  legalName: "KINEXIS Digital",
  email: "hello@kinexisdigital.com",
  description:
    "Digital marketing agency specializing in SEO, paid media, web design, CRO, and analytics for local businesses, SaaS companies, and enterprise organizations.",
  linkedIn: "https://www.linkedin.com/company/kinexisdigital",
  /** ISO 3166-1 alpha-2 — primary market; no street address published on site. */
  addressCountry: "CA",
  areaServed: ["Canada", "United States"],
  languages: ["English", "Spanish"] as const,
} as const;
