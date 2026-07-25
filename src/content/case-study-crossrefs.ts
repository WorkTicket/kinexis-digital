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
const saas = bySlug("saas-platform-growth");

const landscapingConversion = landscaping.metrics.find((m) =>
  m.label.toLowerCase().includes("conversion")
);

export const CASE_STUDIES = {
  landscaping: {
    slug: landscaping.slug,
    href: `/case-studies/${landscaping.slug}`,
    client: "Landscaping Co.",
    clientFull: landscaping.title,
    heroMetric: `${landscaping.primaryLift} Lead Growth`,
    linkLabel: `${landscaping.primaryLift} Leads · Landscaping Co.`,
    trafficLift: landscaping.trafficLift,
    leadLift: landscaping.leadLift,
    revenueLift: landscaping.revenueLift,
    conversionBefore: landscapingConversion ? `${landscapingConversion.from}%` : "1.8%",
    conversionAfter: landscapingConversion ? `${landscapingConversion.to}%` : "3.9%",
    timeline: landscaping.timeline,
  },
  plumbing: {
    slug: plumbing.slug,
    href: `/case-studies/${plumbing.slug}`,
    client: "Plumbing Co.",
    clientFull: plumbing.title,
    heroMetric: `${plumbing.primaryLift} More Emergency Calls`,
    linkLabel: `${plumbing.primaryLift} Calls · Plumbing Co.`,
    trafficLift: plumbing.trafficLift,
    leadLift: plumbing.leadLift,
    revenueLift: plumbing.revenueLift,
    adSpendReduction: "40%",
    timeline: plumbing.timeline,
  },
  saas: {
    slug: saas.slug,
    href: `/case-studies/${saas.slug}`,
    client: saas.title,
    clientFull: saas.title,
    heroMetric: `${saas.primaryLift} Demo Requests`,
    linkLabel: `${saas.primaryLift} Demos · SaaS Platform`,
    trafficLift: saas.trafficLift,
    leadLift: saas.leadLift,
    revenueLift: saas.revenueLift,
    timeline: saas.timeline,
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
