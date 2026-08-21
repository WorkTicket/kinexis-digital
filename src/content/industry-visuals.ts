import type { IndustrySlug } from "@/content/industries";

export type IndustryVisualAsset = {
  src: string;
  thumb: string;
  alt: string;
};

/** Bump when industry stills are regenerated so Next/Image + browser caches refresh. */
const INDUSTRY_VISUAL_VERSION = "20260812a";

function industryAsset(slug: IndustrySlug, kind: "full" | "thumb") {
  const base =
    kind === "thumb"
      ? `/assets/images/industries/industry-${slug}-thumb.webp`
      : `/assets/images/industries/industry-${slug}.webp`;
  return `${base}?v=${INDUSTRY_VISUAL_VERSION}`;
}

export const industryVisuals: Record<IndustrySlug, IndustryVisualAsset> = {
  "home-services": {
    src: industryAsset("home-services", "full"),
    thumb: industryAsset("home-services", "thumb"),
    alt: "Home services editorial: local demand headline with map pin and booking appointment UI",
  },
  ecommerce: {
    src: industryAsset("ecommerce", "full"),
    thumb: industryAsset("ecommerce", "thumb"),
    alt: "Ecommerce editorial: product cards, checkout rail, and conversion metric chip",
  },
  healthcare: {
    src: industryAsset("healthcare", "full"),
    thumb: industryAsset("healthcare", "thumb"),
    alt: "Healthcare editorial: confirmed appointment cards and Find, Book, Visit care path",
  },
  dental: {
    src: industryAsset("dental", "full"),
    thumb: industryAsset("dental", "thumb"),
    alt: "Dental editorial: practice schedule grid with fill-rate progress and patient reminder",
  },
  legal: {
    src: industryAsset("legal", "full"),
    thumb: industryAsset("legal", "thumb"),
    alt: "Legal editorial: scales construction mark, matter file intake card, and case status rail",
  },
  "real-estate": {
    src: industryAsset("real-estate", "full"),
    thumb: industryAsset("real-estate", "thumb"),
    alt: "Real estate editorial: building facade grid with listing cards and open house chip",
  },
  restaurants: {
    src: industryAsset("restaurants", "full"),
    thumb: industryAsset("restaurants", "thumb"),
    alt: "Restaurants editorial: reservation board, guest card, and covers metric",
  },
  saas: {
    src: industryAsset("saas", "full"),
    thumb: industryAsset("saas", "thumb"),
    alt: "SaaS editorial: pipeline dashboard with charts, retention metric, and live overview",
  },
  automotive: {
    src: industryAsset("automotive", "full"),
    thumb: industryAsset("automotive", "thumb"),
    alt: "Automotive editorial: vehicle mark with service checklist and bay booking card",
  },
  fitness: {
    src: industryAsset("fitness", "full"),
    thumb: industryAsset("fitness", "thumb"),
    alt: "Fitness editorial: class schedule grid with progress ring and membership status",
  },
  construction: {
    src: industryAsset("construction", "full"),
    thumb: industryAsset("construction", "thumb"),
    alt: "Construction editorial: blueprint panel with project timeline and won bid chip",
  },
  "professional-services": {
    src: industryAsset("professional-services", "full"),
    thumb: industryAsset("professional-services", "thumb"),
    alt: "Professional services editorial: signed proposal document and engagement agenda rail",
  },
  "financial-services": {
    src: industryAsset("financial-services", "full"),
    thumb: industryAsset("financial-services", "thumb"),
    alt: "Financial services editorial: growth chart, portfolio cards, and allocation mix",
  },
  education: {
    src: industryAsset("education", "full"),
    thumb: industryAsset("education", "thumb"),
    alt: "Education editorial: course module path with enrollment open chip",
  },
  "beauty-wellness": {
    src: industryAsset("beauty-wellness", "full"),
    thumb: industryAsset("beauty-wellness", "thumb"),
    alt: "Beauty and wellness editorial: treatment menu, booking card, and capacity ring",
  },
};

/** Map a case-study href to its screenshot when one exists in the asset library. */
export function industryProofImage(href?: string): string | undefined {
  if (!href) return undefined;
  const slug = href.split("/").filter(Boolean).pop();
  if (!slug) return undefined;
  const known: Record<string, string> = {
    "landscaping-company-growth": "landscaping-company-growth",
    "plumbing-company-growth": "plumbing-company-growth",
    "ecommerce-store-growth": "saas-platform-growth",
  };
  const fileSlug = known[slug];
  if (!fileSlug) return undefined;
  const version = fileSlug === "saas-platform-growth" ? "?v=20260820a" : "";
  return `/assets/images/case-studies/${fileSlug}.webp${version}`;
}
