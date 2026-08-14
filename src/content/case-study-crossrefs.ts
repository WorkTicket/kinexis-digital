/** Canonical case study metrics — derived from listing content so pages stay uniform */

import { caseStudiesContent } from "@/content/case-studies";

const en = caseStudiesContent.en.caseStudies;

function bySlug(slug: string) {
  const study = en.find((item) => item.slug === slug);
  if (!study) {
    throw new Error(`Missing case study content for slug: ${slug}`);
  }
  return study;
}

const landscaping = bySlug("landscaping-company-growth");
const plumbing = bySlug("plumbing-company-growth");
const ecommerce = bySlug("ecommerce-store-growth");

const landscapingConversion = landscaping.metrics.find((m) =>
  m.label.toLowerCase().includes("conversion")
);

export const CASE_STUDIES = {
  landscaping: {
    slug: landscaping.slug,
    href: `/case-studies/${landscaping.slug}`,
    client: landscaping.client,
    clientFull: landscaping.client,
    heroMetric: `${landscaping.primaryLift} Lead Growth`,
    linkLabel: `${landscaping.primaryLift} Leads · ${landscaping.client}`,
    trafficLift: landscaping.trafficLift,
    leadLift: landscaping.leadLift,
    revenueLift: landscaping.revenueLift,
    conversionBefore: landscapingConversion ? `${landscapingConversion.from}%` : "1.8%",
    conversionAfter: landscapingConversion ? `${landscapingConversion.to}%` : "3.9%",
    timeline: landscaping.timeline,
    liveUrl: landscaping.liveUrl,
  },
  plumbing: {
    slug: plumbing.slug,
    href: `/case-studies/${plumbing.slug}`,
    client: plumbing.client,
    clientFull: plumbing.client,
    heroMetric: `${plumbing.primaryLift} More Emergency Calls`,
    linkLabel: `${plumbing.primaryLift} Calls · ${plumbing.client}`,
    trafficLift: plumbing.trafficLift,
    leadLift: plumbing.leadLift,
    revenueLift: plumbing.revenueLift,
    adSpendReduction: "40%",
    timeline: plumbing.timeline,
    liveUrl: plumbing.liveUrl,
  },
  saas: {
    slug: ecommerce.slug,
    href: `/case-studies/${ecommerce.slug}`,
    client: ecommerce.client,
    clientFull: ecommerce.client,
    heroMetric: `${ecommerce.primaryLift} Monthly Orders`,
    linkLabel: `${ecommerce.primaryLift} Orders · ${ecommerce.client}`,
    trafficLift: ecommerce.trafficLift,
    leadLift: ecommerce.leadLift,
    revenueLift: ecommerce.revenueLift,
    timeline: ecommerce.timeline,
    liveUrl: ecommerce.liveUrl,
  },
} as const;

export type CaseStudyKey = keyof typeof CASE_STUDIES;

export function caseStudyLink(key: CaseStudyKey): { href: string; label: string } {
  const cs = CASE_STUDIES[key];
  return { href: cs.href, label: cs.linkLabel };
}

export function caseStudyLinks(...keys: CaseStudyKey[]): { href: string; label: string }[] {
  return keys.map(caseStudyLink);
}
