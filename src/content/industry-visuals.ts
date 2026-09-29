import type { IndustrySlug } from "@/content/industries";

export type IndustryVisualAsset = {
  src: string;
  thumb: string;
  alt: string;
};

/** Bump when industry stills are regenerated so Next/Image + browser caches refresh. */
const INDUSTRY_VISUAL_VERSION = "20260929e";

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
    alt: "Home services desk craft: tablet map booking wireframe and job checklist clipboard",
  },
  ecommerce: {
    src: industryAsset("ecommerce", "full"),
    thumb: industryAsset("ecommerce", "thumb"),
    alt: "Ecommerce desk craft: product grid wireframe and packing checklist",
  },
  healthcare: {
    src: industryAsset("healthcare", "full"),
    thumb: industryAsset("healthcare", "thumb"),
    alt: "Healthcare desk craft: appointment schedule wireframe and clipboard checklist",
  },
  dental: {
    src: industryAsset("dental", "full"),
    thumb: industryAsset("dental", "thumb"),
    alt: "Dental desk craft: practice schedule wireframe and appointment cards",
  },
  legal: {
    src: industryAsset("legal", "full"),
    thumb: industryAsset("legal", "thumb"),
    alt: "Legal desk craft: case folders and document intake wireframe",
  },
  "real-estate": {
    src: industryAsset("real-estate", "full"),
    thumb: industryAsset("real-estate", "thumb"),
    alt: "Real estate desk craft: listing cards wireframe and floorplan sheet",
  },
  restaurants: {
    src: industryAsset("restaurants", "full"),
    thumb: industryAsset("restaurants", "thumb"),
    alt: "Restaurants desk craft: reservation board wireframe and menu layout grid",
  },
  saas: {
    src: industryAsset("saas", "full"),
    thumb: industryAsset("saas", "thumb"),
    alt: "SaaS desk craft: product dashboard wireframe and funnel diagram sheet",
  },
  automotive: {
    src: industryAsset("automotive", "full"),
    thumb: industryAsset("automotive", "thumb"),
    alt: "Automotive desk craft: service checklist and bay booking schedule",
  },
  fitness: {
    src: industryAsset("fitness", "full"),
    thumb: industryAsset("fitness", "thumb"),
    alt: "Fitness desk craft: class schedule wireframe and membership sheet",
  },
  construction: {
    src: industryAsset("construction", "full"),
    thumb: industryAsset("construction", "thumb"),
    alt: "Construction desk craft: blueprint grids and project timeline wireframe",
  },
  "professional-services": {
    src: industryAsset("professional-services", "full"),
    thumb: industryAsset("professional-services", "thumb"),
    alt: "Professional services desk craft: proposal document and agenda wireframe",
  },
  "financial-services": {
    src: industryAsset("financial-services", "full"),
    thumb: industryAsset("financial-services", "thumb"),
    alt: "Financial services desk craft: portfolio chart wireframe and allocation sheets",
  },
  education: {
    src: industryAsset("education", "full"),
    thumb: industryAsset("education", "thumb"),
    alt: "Education desk craft: course module path wireframe and notebooks",
  },
  "beauty-wellness": {
    src: industryAsset("beauty-wellness", "full"),
    thumb: industryAsset("beauty-wellness", "thumb"),
    alt: "Beauty and wellness desk craft: treatment booking menu and appointment cards",
  },
  plumbing: {
    src: industryAsset("home-services", "full"),
    thumb: industryAsset("home-services", "thumb"),
    alt: "Plumbing desk craft: service-area map wireframe and job checklist",
  },
  landscaping: {
    src: industryAsset("construction", "full"),
    thumb: industryAsset("construction", "thumb"),
    alt: "Landscaping desk craft: project timeline wireframe and estimate sheets",
  },
  hvac: {
    src: industryAsset("automotive", "full"),
    thumb: industryAsset("automotive", "thumb"),
    alt: "HVAC desk craft: dispatch checklist and bay booking schedule",
  },
  roofing: {
    src: industryAsset("real-estate", "full"),
    thumb: industryAsset("real-estate", "thumb"),
    alt: "Roofing desk craft: listing-style building cards and inspection booking sheet",
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
    "ecommerce-store-growth": "ecommerce-store-growth",
  };
  const fileSlug = known[slug];
  if (!fileSlug) return undefined;
  const version = fileSlug === "ecommerce-store-growth" ? "?v=20260822a" : "";
  return `/assets/images/case-studies/${fileSlug}.webp${version}`;
}
