/** Canonical case study metrics — single source of truth for cross-page references */

export const CASE_STUDIES = {
  landscaping: {
    slug: "landscaping-company-growth",
    href: "/case-studies/landscaping-company-growth",
    client: "Landscaping Co.",
    clientFull: "Landscaping Company",
    heroMetric: "4.8X Lead Growth",
    linkLabel: "4.8X Leads · Landscaping Co.",
    trafficLift: "+1,290%",
    leadLift: "+380%",
    revenueLift: "+$14,300/mo",
    conversionBefore: "1.8%",
    conversionAfter: "8.4%",
    timeline: "10 months",
  },
  plumbing: {
    slug: "plumbing-company-growth",
    href: "/case-studies/plumbing-company-growth",
    client: "Plumbing Co.",
    clientFull: "Plumbing Company",
    heroMetric: "327% More Emergency Calls",
    linkLabel: "327% Calls · Plumbing Co.",
    trafficLift: "+410%",
    leadLift: "+327%",
    revenueLift: "+$14,200/mo",
    adSpendReduction: "65%",
    timeline: "8 months",
  },
  saas: {
    slug: "saas-platform-growth",
    href: "/case-studies/saas-platform-growth",
    client: "SaaS Platform",
    clientFull: "SaaS Platform",
    heroMetric: "5.9X Demo Requests",
    linkLabel: "5.9X Demos · SaaS Platform",
    trafficLift: "+482%",
    leadLift: "+490%",
    revenueLift: "+$24,500/mo",
    timeline: "8 months",
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
