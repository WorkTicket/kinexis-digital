import { LIVE_SITES } from "@/data/liveSites";
import { getProject, portfolioFile } from "@/data/portfolio";
import { industryCostPostPath, industryPagesPostPath } from "@/data/industries";

export type IndustryExample = {
  name: string;
  url: string;
  image: string;
  width: number;
  height: number;
  annotation: string;
  /** Visible “Demo template” label when not a live client site. */
  demo?: boolean;
};

export type IndustrySeoDepth = {
  pagesList: string[];
  examples: IndustryExample[];
};

const PROCESS_STEPS_EN = [
  { title: "Send logo and photos", text: "Share what you have—logo, truck shots, job photos. We work with incomplete sets for the preview." },
  { title: "Free homepage preview", text: "In 2 business days you see a homepage concept for your trade. No card and no obligation." },
  { title: "Choose a plan", text: "Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It $1,497 once. $0 down on monthly plans." },
  { title: "Launch", text: "We finish the service pages and publish. Typical launch is about 5 business days after approval and content." },
] as const;

function liveExample(slug: string, annotation: string): IndustryExample | null {
  const site = LIVE_SITES.find((item) => item.slug === slug);
  if (!site) return null;
  return {
    name: site.name,
    url: site.url,
    image: site.image,
    width: site.width,
    height: Math.min(site.height, 1400),
    annotation,
  };
}

function demoExample(projectSlug: string, annotation: string): IndustryExample | null {
  const project = getProject(projectSlug);
  if (!project) return null;
  return {
    name: project.name,
    url: `/portfolio/${project.slug}`,
    image: portfolioFile(project.image, 640),
    width: 640,
    height: Math.round((project.height * 640) / project.width),
    annotation,
    demo: true,
  };
}

function examples(...items: (IndustryExample | null)[]): IndustryExample[] {
  return items.filter((item): item is IndustryExample => Boolean(item)).slice(0, 3);
}

/** Depth blocks for live trades (examples + pages list). Shared process/cost copy is rendered in the component. */
export const INDUSTRY_SEO_DEPTH: Record<string, IndustrySeoDepth> = {
  plumbing: {
    pagesList: [
      "Leak Repair",
      "Drain Cleaning",
      "Water Heaters",
      "Repipes",
      "Emergency / Hours",
      "Service Area",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      liveExample(
        "preferred-plumbing",
        "Live Preferred Plumbing site: Spirit Lake hero with tap-to-call, trust strip early, and separate paths for repairs, drains, and tankless work.",
      ),
      demoExample(
        "undertow-drainage",
        "Drainage-focused layout that keeps emergency repair and planned work on different paths—useful when drains dominate the call board.",
      ),
    ),
  },
  hvac: {
    pagesList: [
      "No-Cool Repair",
      "System Replacement",
      "Maintenance Plans",
      "Financing (if offered)",
      "Service Area",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      demoExample(
        "switchyard-heating-air",
        "Demo HVAC template: repair and replacement are separate jobs, with maintenance visible for shoulder season.",
      ),
      demoExample(
        "kiln-hearth-chimney",
        "Related home-comfort layout showing how seasonal service pages sit beside urgent repair CTAs.",
      ),
    ),
  },
  electrical: {
    pagesList: [
      "Panel Upgrades",
      "EV Chargers",
      "Troubleshooting / Repair",
      "New Construction",
      "Service Area",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      demoExample(
        "union-electric",
        "Demo electrician template: panel, EV, and repair paths with license and trust cues near the first call button.",
      ),
    ),
  },
  roofing: {
    pagesList: [
      "Roof Repair",
      "Roof Replacement",
      "Storm / Insurance Inspections",
      "Photo Gallery",
      "Service Area",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      demoExample(
        "red-oak-roofing",
        "Demo roofing template: inspection request up front, with repair vs replacement separated after the storm-season rush.",
      ),
    ),
  },
  landscaping: {
    pagesList: [
      "Lawn Maintenance",
      "Landscape Projects",
      "Seasonal Cleanup",
      "Service Area / Routes",
      "Project Photos",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      liveExample(
        "a1-landscaping",
        "Live A1 Property Services site: route and project work stay distinct, with real yard photos instead of stock landscaping.",
      ),
      demoExample(
        "graft-tree-care",
        "Demo outdoor template showing how specialty crews present services and a clear next step on mobile.",
      ),
    ),
  },
  "garage-doors": {
    pagesList: [
      "Spring Repair",
      "Opener Repair",
      "New Garage Doors",
      "Same-Day Service",
      "Service Area",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      demoExample(
        "liftline-garage-doors",
        "Demo garage-door template: springs and new doors are not mashed into one generic services page.",
      ),
    ),
  },
  "pressure-washing": {
    pagesList: [
      "House Wash",
      "Concrete / Driveways",
      "Roof Soft Wash",
      "Quote Form",
      "Service Area",
      "Reviews",
      "About",
      "Contact",
    ],
    examples: examples(
      demoExample(
        "rinseworks",
        "Demo pressure-washing template: house, concrete, and roof paths with a short quote form on every device.",
      ),
      demoExample(
        "spraycraft",
        "Second demo layout emphasizing before/after proof and surface-specific calls to action.",
      ),
    ),
  },
};

export function industryProcessStepsEn(tradeNoun: string) {
  return PROCESS_STEPS_EN.map((step, index) =>
    index === 1
      ? { ...step, text: `In 2 business days you see a homepage concept for your ${tradeNoun} business. No card and no obligation.` }
      : { ...step },
  );
}

export function industryCostRows() {
  return [
    { plan: "Website", price: "$97/mo", note: "Up to 5 pages · hosting · 2 small edits/mo" },
    { plan: "Lead System", price: "$197/mo", note: "Reviews · optional text-back · 60-day lead guarantee" },
    { plan: "Plus (Bilingual)", price: "$297/mo", note: "English + Spanish · up to 20 pages" },
    { plan: "Own It", price: "$1,497 once", note: "Site files yours · 12 months hosting included" },
  ];
}

export function industryDepthLinks(slug: string, name: string) {
  return {
    costHref: industryCostPostPath(slug),
    costLabel: `${name} website cost, explained`,
    pagesHref: industryPagesPostPath(slug),
    pagesLabel: `Full checklist: what pages a ${name.toLowerCase()} website needs`,
  };
}
