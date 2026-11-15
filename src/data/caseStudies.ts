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
  url: string;
  image: string;
  width: number;
  height: number;
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
      "Custom homepage and service presentation for a local plumbing company",
      "Mobile-friendly layout with a clear call path",
      "Live site hosted at the customer’s domain",
    ],
    features: ["Custom design", "Mobile layout", "Service presentation", "Live production site"],
    outcome:
      "The live website is public at callpreferredplumbing.com. Performance numbers and client quotes are shared only when the customer approves them in writing.",
    url: preferred.url,
    image: preferred.image,
    width: preferred.width,
    height: preferred.height,
  },
  {
    slug: "a1-property-services",
    liveSiteSlug: a1.slug,
    title: a1.name,
    trade: a1.trade,
    problem:
      "A1 Property Services needed a professional landscaping site that presents services and project context for Cedar Falls, Iowa.",
    changes: [
      "Custom website for property and landscaping services",
      "Gallery-friendly structure for real job photos",
      "Clear service-area presentation on a live domain",
    ],
    features: ["Custom design", "Project gallery structure", "Service pages", "Live production site"],
    outcome:
      "The live website is public at a1pslandscape.com. Lead or revenue figures are omitted here until verified with the client.",
    url: a1.url,
    image: a1.image,
    width: a1.width,
    height: a1.height,
  },
  {
    slug: "manos-creativas",
    liveSiteSlug: manos.slug,
    title: manos.name,
    trade: manos.trade,
    problem:
      "Manos Creativas needed a product-focused site to present crochet patterns clearly to customers online.",
    changes: [
      "Custom site focused on product presentation",
      "Clear customer journey from browse to purchase path on their domain",
      "Live bilingual-capable presentation for a Spanish-market maker brand",
    ],
    features: ["Custom design", "Product presentation", "Live production site"],
    outcome:
      "The live website is public at bynmwcreative.com. Purchase or conversion metrics are not claimed without verified store data.",
    url: manos.url,
    image: manos.image,
    width: manos.width,
    height: manos.height,
  },
];

export function caseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((item) => item.slug === slug);
}
