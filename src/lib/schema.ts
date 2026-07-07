import { businessProfile } from "@/lib/business";
import { getDefaultOgImageUrl, getOrganizationLogoUrl, getSiteUrl } from "@/lib/metadata";
import { parseContentDate } from "@/lib/sitemap-last-modified";

export type BreadcrumbItem = { name: string; url?: string };

function organizationLogoObject() {
  return {
    "@type": "ImageObject" as const,
    url: getOrganizationLogoUrl(),
    width: 512,
    height: 512,
  };
}

/** schema.org Date values must be ISO 8601 — not display strings like "June 15, 2026". */
function toSchemaDate(value: string): string {
  const parsed = parseContentDate(value);
  if (parsed) return parsed.toISOString().slice(0, 10);
  return value;
}

function defaultOgImageObject() {
  return {
    "@type": "ImageObject" as const,
    url: getDefaultOgImageUrl(),
    width: 1200,
    height: 630,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: businessProfile.name,
    url: getSiteUrl(),
    logo: organizationLogoObject(),
    description: businessProfile.description,
    sameAs: [businessProfile.linkedIn],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: businessProfile.email,
      availableLanguage: [...businessProfile.languages],
    },
  };
}

/**
 * Agency hub schema — ProfessionalService (subtype of LocalBusiness) with service-area
 * address only. No fabricated street address or phone; email matches footer + contact page.
 */
export function localBusinessSchema(pageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${getSiteUrl()}/#localbusiness`,
    name: businessProfile.name,
    url: pageUrl ?? getSiteUrl(),
    image: getOrganizationLogoUrl(),
    logo: organizationLogoObject(),
    description: businessProfile.description,
    email: businessProfile.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: businessProfile.addressCountry,
    },
    areaServed: businessProfile.areaServed.map((name) => ({
      "@type": "Country",
      name,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: businessProfile.email,
      availableLanguage: [...businessProfile.languages],
    },
    sameAs: [businessProfile.linkedIn],
    parentOrganization: { "@id": `${getSiteUrl()}/#organization` },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: businessProfile.name,
    url: getSiteUrl(),
    publisher: { "@id": `${getSiteUrl()}/#organization` },
  };
}

type AreaServedInput = {
  city: string;
  region?: string;
};

export function serviceSchema(
  name: string,
  description: string,
  url: string,
  areaServed?: AreaServedInput
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    provider: { "@id": `${getSiteUrl()}/#organization` },
    url,
    areaServed: areaServed
      ? {
          "@type": "City",
          name: areaServed.city,
          ...(areaServed.region && {
            containedInPlace: { "@type": "State", name: areaServed.region },
          }),
        }
      : { "@type": "Country", name: "Worldwide" },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export type PersonSchemaInput = {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
};

export function personSchema(person: PersonSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${person.url}#person`,
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: person.url,
    worksFor: { "@type": "Organization", name: businessProfile.name, url: getSiteUrl() },
    ...(person.image && { image: person.image }),
  };
}

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  reviewedBy,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  reviewedBy?: string;
}) {
  const author = authorName
    ? { "@type": "Person" as const, name: authorName, ...(authorUrl && { url: authorUrl }) }
    : { "@type": "Organization" as const, "@id": `${getSiteUrl()}/#organization`, name: businessProfile.name };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    datePublished: toSchemaDate(datePublished),
    dateModified: toSchemaDate(dateModified || datePublished),
    author,
    image: defaultOgImageObject(),
    ...(reviewedBy && { editor: { "@type": "Person", name: reviewedBy } }),
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function caseStudySchema({
  title,
  description,
  url,
  industry,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  industry: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    articleSection: industry,
    datePublished: toSchemaDate(datePublished),
    author: { "@id": `${getSiteUrl()}/#organization` },
    image: defaultOgImageObject(),
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}
