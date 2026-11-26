import { LIVE_SITES } from "@/data/liveSites";

/**
 * Case studies built only from verified LIVE_SITES facts.
 * No fabricated conversion rates, revenue, or testimonials.
 */
export type CaseStudy = {
  slug: string;
  liveSiteSlug: string;
  title: string;
  trade: string;
  problem: string;
  changes: string[];
  features: string[];
  /** Qualitative only — never invent metrics */
  outcome: string;
  summary: string;
  url: string;
  heroImage: string;
  heroWidth: number;
  heroHeight: number;
  overviewImage: string;
  fullPageImage: string;
  overviewWidth: number;
  overviewHeight: number;
  fullPageWidth: number;
  fullPageHeight: number;
};

function live(slug: string) {
  const site = LIVE_SITES.find((item) => item.slug === slug);
  if (!site) throw new Error(`Missing LIVE_SITES entry: ${slug}`);
  return site;
}

const preferred = live("preferred-plumbing");
const a1 = live("a1-landscaping");
const manos = live("manos-creativas");

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "preferred-plumbing",
    liveSiteSlug: preferred.slug,
    title: preferred.name,
    trade: preferred.trade,
    problem:
      "Preferred Plumbing needed a clear mobile-first site so homeowners in Spirit Lake, Idaho could see services and call without hunting.",
    changes: [
      "Homepage and service presentation for a local plumbing company",
      "Mobile-friendly layout with a clear call path",
      "Live site hosted at the customer’s domain",
    ],
    features: ["Trade-specific design", "Mobile layout", "Service presentation", "Live production site"],
    outcome:
      "The live website is public at callpreferredplumbing.com. Performance numbers and client quotes are shared only when the customer approves them in writing.",
    summary:
      "A straightforward service-business website built to help local homeowners understand the plumbing services and find a clear way to get in touch.",
    url: preferred.url,
    heroImage: "/case-studies/preferred-plumbing/screenshots/after-hero-1322w.webp",
    heroWidth: 1322,
    heroHeight: 952,
    overviewImage: "/case-studies/preferred-plumbing/overview-1200w.webp",
    fullPageImage: "/case-studies/preferred-plumbing/screenshots/after-full-homepage-1322w.webp",
    overviewWidth: 1200,
    overviewHeight: 1069,
    fullPageWidth: 1322,
    fullPageHeight: 7660,
  },
  {
    slug: "a1-property-services",
    liveSiteSlug: a1.slug,
    title: a1.name,
    trade: a1.trade,
    problem:
      "A1 Property Services needed a professional landscaping site that presents services and project context for Cedar Falls, Iowa.",
    changes: [
      "Website for property and landscaping services",
      "Gallery-friendly structure for real job photos",
      "Clear service-area presentation on a live domain",
    ],
    features: ["Trade-specific design", "Project gallery structure", "Service pages", "Live production site"],
    outcome:
      "The live website is public at a1pslandscape.com. Lead or revenue figures are omitted here until verified with the client.",
    summary:
      "A professional online presence for a local property-services company, with service information and project imagery brought into one cohesive experience.",
    url: a1.url,
    heroImage: "/case-studies/a1-property-services/screenshots/after-hero-1322w.webp",
    heroWidth: 1322,
    heroHeight: 952,
    overviewImage: "/case-studies/a1-property-services/overview-1200w.webp",
    fullPageImage: "/case-studies/a1-property-services/screenshots/after-full-homepage-1322w.webp",
    overviewWidth: 1200,
    overviewHeight: 1069,
    fullPageWidth: 1322,
    fullPageHeight: 10059,
  },
  {
    slug: "manos-creativas",
    liveSiteSlug: manos.slug,
    title: manos.name,
    trade: manos.trade,
    problem:
      "Manos Creativas needed a product-focused site to present crochet patterns clearly to customers online.",
    changes: [
      "Site focused on product presentation",
      "Clear customer journey from browse to purchase path on their domain",
      "Live bilingual-capable presentation for a Spanish-market maker brand",
    ],
    features: ["Trade-specific design", "Product presentation", "Live production site"],
    outcome:
      "The live website is public at bynmwcreative.com. Purchase or conversion metrics are not claimed without verified store data.",
    summary:
      "A product-led storefront for digital crochet patterns, organized to help shoppers explore designs, compare collections and find purchase support.",
    url: manos.url,
    heroImage: "/case-studies/bynmwcreative/screenshots/after-hero-1322w.webp",
    heroWidth: 1322,
    heroHeight: 952,
    overviewImage: "/case-studies/bynmwcreative/overview-1200w.webp",
    fullPageImage: "/case-studies/bynmwcreative/screenshots/after-full-homepage-1322w.webp",
    overviewWidth: 1200,
    overviewHeight: 1069,
    fullPageWidth: 1322,
    fullPageHeight: 7729,
  },
];

export function caseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
