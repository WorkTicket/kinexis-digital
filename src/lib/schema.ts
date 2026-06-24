import { getSiteUrl } from "@/lib/metadata";

export type BreadcrumbItem = { name: string; url?: string };

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KINEXIS Digital",
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/logo.png`,
    description:
      "Digital marketing agency specializing in SEO, paid media, web design, CRO, and analytics for local businesses, SaaS companies, and enterprise organizations.",
    sameAs: [
      "https://www.linkedin.com/company/kinexisdigital",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

export function localBusinessSchema(city?: string, region?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: city ? `KINEXIS Digital | ${city}` : "KINEXIS Digital",
    url: getSiteUrl(),
    description: "Digital marketing agency delivering SEO, paid media, web design, and conversion optimization.",
    ...(city && { areaServed: { "@type": "City", name: city, ...(region && { containedInPlace: { "@type": "State", name: region } }) } }),
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: "KINEXIS Digital", url: getSiteUrl() },
    url,
    areaServed: "Worldwide",
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
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: person.url,
    worksFor: { "@type": "Organization", name: "KINEXIS Digital", url: getSiteUrl() },
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
    : { "@type": "Organization" as const, name: "KINEXIS Digital" };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author,
    ...(reviewedBy && { editor: { "@type": "Person", name: reviewedBy } }),
    publisher: { "@type": "Organization", name: "KINEXIS Digital", url: getSiteUrl() },
  };
}

export function caseStudySchema({
  title,
  description,
  url,
  industry,
}: {
  title: string;
  description: string;
  url: string;
  industry: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: title,
    description,
    url,
    articleSection: industry,
    author: { "@type": "Organization", name: "KINEXIS Digital" },
    publisher: { "@type": "Organization", name: "KINEXIS Digital" },
  };
}
