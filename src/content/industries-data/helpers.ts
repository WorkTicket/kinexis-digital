import type { Industry, IndustrySlug } from "./types";
import { industries } from "./data";

/** Full detail pages kept for nav dropdown markets. */
export const STANDALONE_INDUSTRY_SLUGS: IndustrySlug[] = [
  "home-services",
  "ecommerce",
];

/** All industry slugs (hub chapters + redirects). */
export const FEATURED_SLUGS: IndustrySlug[] = industries.map(
  (industry) => industry.slug,
);

export function isStandaloneIndustry(slug: string): slug is IndustrySlug {
  return STANDALONE_INDUSTRY_SLUGS.includes(slug as IndustrySlug);
}

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getAllIndustrySlugs(): IndustrySlug[] {
  return FEATURED_SLUGS;
}

export function getStandaloneIndustrySlugs(): IndustrySlug[] {
  return STANDALONE_INDUSTRY_SLUGS;
}

/** Detail pages for standalone markets; everyone else anchors on the hub. */
export function industryHref(slug: IndustrySlug) {
  if (isStandaloneIndustry(slug)) return `/industries/${slug}`;
  return `/industries#${slug}`;
}

/** Other industries to surface on a detail page (wraps around the list). */
export function getRelatedIndustries(slug: IndustrySlug, count = 2) {
  const index = industries.findIndex((industry) => industry.slug === slug);
  if (index < 0) return [];
  const related: Industry[] = [];
  for (let step = 1; step < industries.length && related.length < count; step++) {
    related.push(industries[(index + step) % industries.length]);
  }
  return related;
}
