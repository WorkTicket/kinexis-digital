import type { Locale } from "@/i18n/routing";
import type { Industry, IndustrySlug } from "./types";
import { industries } from "./data";
import { localizeIndustry } from "./spanish";

/** Home-service trade pages with their own URL and search intent. */
export const VERTICAL_INDUSTRY_SLUGS: IndustrySlug[] = [
  "plumbing",
  "landscaping",
  "hvac",
  "roofing",
];

/** Full detail pages: core markets plus scored trade verticals. */
export const STANDALONE_INDUSTRY_SLUGS: IndustrySlug[] = [
  "home-services",
  "ecommerce",
  "saas",
  "fintech",
  ...VERTICAL_INDUSTRY_SLUGS,
];

/** All industry slugs (hub chapters + verticals + redirects). */
export const FEATURED_SLUGS: IndustrySlug[] = industries.map(
  (industry) => industry.slug,
);

export function isVerticalIndustry(slug: string): slug is IndustrySlug {
  return VERTICAL_INDUSTRY_SLUGS.includes(slug as IndustrySlug);
}

export function isStandaloneIndustry(slug: string): slug is IndustrySlug {
  return STANDALONE_INDUSTRY_SLUGS.includes(slug as IndustrySlug);
}

export function getIndustryBySlug(slug: string, locale: Locale = "en") {
  const industry = industries.find((item) => item.slug === slug);
  return industry ? localizeIndustry(industry, locale) : undefined;
}

export function getAllIndustrySlugs(): IndustrySlug[] {
  return FEATURED_SLUGS;
}

export function getStandaloneIndustrySlugs(): IndustrySlug[] {
  return STANDALONE_INDUSTRY_SLUGS;
}

/** Hub catalog — original markets only. Verticals live as sibling URLs. */
export function getHubIndustries(locale: Locale = "en"): Industry[] {
  return industries
    .filter((industry) => !isVerticalIndustry(industry.slug))
    .map((industry) => localizeIndustry(industry, locale));
}

/** Detail pages for standalone markets; everyone else anchors on the hub. */
export function industryHref(slug: IndustrySlug) {
  if (isStandaloneIndustry(slug)) return `/industries/${slug}`;
  return `/industries#${slug}`;
}

const VERTICAL_CLUSTER: IndustrySlug[] = [
  "home-services",
  ...VERTICAL_INDUSTRY_SLUGS,
];

/** Other industries to surface on a detail page. */
export function getRelatedIndustries(slug: IndustrySlug, count = 3) {
  if (VERTICAL_CLUSTER.includes(slug)) {
    return VERTICAL_CLUSTER.filter((item) => item !== slug)
      .map((item) => getIndustryBySlug(item, "en"))
      .filter((industry): industry is Industry => Boolean(industry))
      .slice(0, count);
  }

  const hub = getHubIndustries();
  const index = hub.findIndex((industry) => industry.slug === slug);
  if (index < 0) return [];
  const related: Industry[] = [];
  for (let step = 1; step < hub.length && related.length < count; step++) {
    related.push(hub[(index + step) % hub.length]);
  }
  return related;
}
