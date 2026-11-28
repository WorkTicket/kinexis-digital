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
  /** ISO date (YYYY-MM-DD) for sitemap lastmod. */
  updatedAt?: string;
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
    updatedAt: "2026-11-27",
    problem:
      "Preferred Plumbing needed a hire-ready plumber website: an emergency callback path for wet-floor callers in Spirit Lake, Idaho, plus specialty inquiry paths for radiant, tankless, and drain work—without burying the phone on mobile.",
    changes: [
      "Mobile-first hero with tap-to-call and free-estimate CTA for emergency callbacks",
      "Separate service presentation for repairs, radiant heat, tankless heaters, drains, and hydronics",
      "Honest staffed-hours language instead of unsupported 24/7 claims",
      "Live site hosted at the customer’s domain with dated project screenshots on this case study",
    ],
    features: ["Emergency call path", "Specialty inquiry paths", "Mobile layout", "Live production site"],
    outcome:
      "The live website is public at callpreferredplumbing.com. Annotated process proof (hero call path, specialty cards, hours honesty) is published here; numeric lead or revenue claims wait for written client approval and a defined measurement window.",
    summary:
      "A plumber website designed so emergency callers can dial immediately while specialty jobs still get a clear inquiry path—documented with real screenshots, not invented metrics.",
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
    updatedAt: "2026-11-27",
    problem:
      "A1 Property Services needed a landscaping website that separates recurring maintenance signup from project quote paths for Cedar Falls, Iowa—without mixing mow leads into patio consults.",
    changes: [
      "Recurring maintenance path with place-first hero and clear route geography",
      "Project quote path for hardscape and design-build with gallery-friendly proof",
      "Before/after comparisons from real Cedar Falls jobs instead of stock art",
      "Live domain with dated screenshots on this case study",
    ],
    features: ["Maintenance signup path", "Project quote path", "Real job gallery", "Live production site"],
    outcome:
      "The live website is public at a1pslandscape.com. Annotated process proof (maintenance vs project paths, real yard gallery, honest service area) is published here; numeric lead or revenue claims wait for written client approval and a defined measurement window.",
    summary:
      "A landscaping website that keeps recurring maintenance leads and design-build quotes on separate next steps—documented with real Cedar Falls screenshots.",
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
      "Custom site focused on product presentation",
      "Clear customer journey from browse to purchase path on their domain",
      "Live bilingual-capable presentation for a Spanish-market maker brand",
    ],
    features: ["Custom design", "Product presentation", "Live production site"],
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
