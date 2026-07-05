export type CaseStudySlugMeta = {
  timeline: string;
  progressionLabel: string;
  progressionPrefix?: string;
  progressionSuffix?: string;
  progressionPoints: { label: string; value: number }[];
  flowSteps: string[];
  takeawaySteps: string[];
  deliverables: { count: number; label: string }[];
  faq: { q: string; a: string }[];
};

export const caseStudySlugMeta: Record<string, CaseStudySlugMeta> = {
  "landscaping-company-growth": {
    timeline: "10 months",
    progressionLabel: "Revenue Influenced",
    progressionPrefix: "$",
    progressionPoints: [
      { label: "Month 1", value: 4200 },
      { label: "Month 4", value: 9000 },
      { label: "Month 7", value: 14000 },
      { label: "Month 10", value: 18500 },
    ],
    flowSteps: ["Website", "SEO", "Google Business", "Content", "Conversion"],
    takeawaySteps: ["Fast Website", "Better Rankings", "Higher Conversion", "Revenue Growth"],
    deliverables: [
      { count: 15, label: "Website Pages" },
      { count: 12, label: "SEO Landing Pages" },
      { count: 40, label: "GBP Posts" },
      { count: 18, label: "Content Articles" },
      { count: 45, label: "Directory Citations" },
      { count: 4, label: "Automations" },
    ],
    faq: [
      { q: "How long did this project take?", a: "The full engagement ran 10 months, from the initial technical audit through post-launch conversion optimization." },
      { q: "How long before rankings improved?", a: "First movement in local pack rankings appeared around month 3, with the largest gains between months 4 and 7 after content production and citation cleanup were complete." },
      { q: "Which service had the biggest impact?", a: "The website rebuild and conversion optimization produced the fastest revenue impact. Local SEO and content marketing compounded over the full engagement and drove the majority of organic traffic by month 8." },
      { q: "How many keywords did you target?", a: "We targeted 50+ high-intent keywords across landscaping, hardscaping, irrigation, lawn care, and seasonal services. The business ranked in the local pack for 42 of those by month 10." },
      { q: "How were results measured?", a: "Lead and revenue data came directly from the client's CRM tied to form submissions and phone calls. Traffic and ranking data came from Google Analytics 4, Search Console, and Ahrefs position tracking." },
    ],
  },
  "plumbing-company-growth": {
    timeline: "8 months",
    progressionLabel: "Emergency Calls",
    progressionSuffix: " calls",
    progressionPoints: [
      { label: "Month 1", value: 22 },
      { label: "Month 3", value: 42 },
      { label: "Month 5", value: 68 },
      { label: "Month 8", value: 94 },
    ],
    flowSteps: ["Website", "GBP", "SEO", "Reviews", "Conversion"],
    takeawaySteps: ["Emergency Website", "GBP Dominance", "Organic Calls", "Lower Ad Spend"],
    deliverables: [
      { count: 14, label: "Website Pages" },
      { count: 12, label: "SEO Landing Pages" },
      { count: 36, label: "GBP Posts" },
      { count: 24, label: "Content Articles" },
      { count: 38, label: "Directory Citations" },
      { count: 5, label: "Automations" },
    ],
    faq: [
      { q: "How long did this project take?", a: "The full engagement ran 8 months, from the initial GBP claim and website rebuild through the final CRO optimization phase." },
      { q: "How long before emergency call volume increased?", a: "First noticeable increases appeared around month 3 after the website rebuild and GBP optimization. The largest gains came between months 4 and 6 as the SEO campaign matured." },
      { q: "How did you reduce ad spend while growing leads?", a: "Organic traffic and GBP visibility replaced paid channels as the primary lead source. As local rankings improved for emergency keywords, ad spend was scaled back from $6,800 to $2,400 per month without losing volume." },
      { q: "Which tactic moved fastest?", a: "The GBP optimization and website rebuild produced the fastest results — emergency call routing and click-to-call CTAs started converting within weeks of launch." },
      { q: "How were results measured?", a: "Every inbound call was tracked through the call tracking system and matched to its source. Revenue data came from the client's CRM, and ranking data from Search Console and Ahrefs." },
    ],
  },
  "saas-platform-growth": {
    timeline: "8 months",
    progressionLabel: "MRR",
    progressionPrefix: "$",
    progressionPoints: [
      { label: "Month 1", value: 8500 },
      { label: "Month 3", value: 14000 },
      { label: "Month 5", value: 24000 },
      { label: "Month 8", value: 33000 },
    ],
    flowSteps: ["Content", "Technical SEO", "Landing Pages", "CRO", "Analytics"],
    takeawaySteps: ["Content Authority", "Organic Rankings", "Dedicated Landing Pages", "Qualified Demos"],
    deliverables: [
      { count: 10, label: "Website Pages" },
      { count: 6, label: "Landing Pages" },
      { count: 18, label: "Content Guides" },
      { count: 12, label: "Schema Types" },
      { count: 8, label: "Integrations" },
      { count: 5, label: "Automations" },
    ],
    faq: [
      { q: "How long did this project take?", a: "The full engagement ran 8 months — months 1-2 focused on technical audit and content production, months 3-5 on SEO maturation and landing page development, and months 6-8 on CRO and attribution buildout." },
      { q: "How long before demo requests increased?", a: "First content published in month 2 started ranking by month 3. Demo request volume began to meaningfully increase around month 4 as the content engine and landing pages aligned with search intent." },
      { q: "Which tactic had the fastest impact?", a: "The landing page and CRO program showed the fastest conversion gains. Technical SEO was the foundation, but dedicated use-case pages with progressive profiling forms drove the immediate demo volume lift." },
      { q: "How did you reduce CAC by 43%?", a: "As organic traffic grew from 950 to 5,520 visits per month, paid channels were scaled back. The content engine contributed 62% of new demo requests by month 8, significantly lowering the blended cost per acquisition." },
      { q: "How were results measured?", a: "Demo requests and SQLs were tracked through the CRM with source attribution. Traffic and rankings came from GA4 and Search Console. MRR was reported from the client's billing system, attributed back to marketing channels through a multi-touch model." },
    ],
  },
};

export function getCaseStudySlugMeta(slug: string): CaseStudySlugMeta {
  return caseStudySlugMeta[slug] ?? caseStudySlugMeta["landscaping-company-growth"];
}
