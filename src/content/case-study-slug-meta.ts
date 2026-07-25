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
      { label: "Month 4", value: 6200 },
      { label: "Month 7", value: 8200 },
      { label: "Month 10", value: 9800 },
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
      { q: "How many keywords did you target?", a: "We targeted 50+ high-intent keywords across landscaping, hardscaping, irrigation, lawn care, and seasonal services. The business ranked in the local pack for 28 of those by month 10." },
      { q: "How were results measured?", a: "Lead and revenue data came directly from the client's CRM tied to form submissions and phone calls. Traffic and ranking data came from Google Analytics 4, Search Console, and Ahrefs position tracking." },
    ],
  },
  "plumbing-company-growth": {
    timeline: "8 months",
    progressionLabel: "Emergency Calls",
    progressionSuffix: " calls",
    progressionPoints: [
      { label: "Month 1", value: 22 },
      { label: "Month 3", value: 32 },
      { label: "Month 5", value: 42 },
      { label: "Month 8", value: 52 },
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
      { q: "How did you reduce ad spend while growing leads?", a: "Organic traffic and GBP visibility replaced paid channels as the primary lead source. As local rankings improved for emergency keywords, ad spend was scaled back from $6,800 to $4,100 per month without losing volume." },
      { q: "Which tactic moved fastest?", a: "The GBP optimization and website rebuild produced the fastest results — emergency call routing and click-to-call CTAs started converting within weeks of launch." },
      { q: "How were results measured?", a: "Every inbound call was tracked through the call tracking system and matched to its source. Revenue data came from the client's CRM, and ranking data from Search Console and Ahrefs." },
    ],
  },
  "saas-platform-growth": {
    timeline: "8 months",
    progressionLabel: "Revenue",
    progressionPrefix: "€",
    progressionPoints: [
      { label: "Month 1", value: 8500 },
      { label: "Month 3", value: 11200 },
      { label: "Month 5", value: 14500 },
      { label: "Month 8", value: 17200 },
    ],
    flowSteps: ["Store Rebuild", "Technical SEO", "Collections", "CRO", "Content"],
    takeawaySteps: ["Conversion Storefront", "Organic Rankings", "Collection Funnels", "Order Growth"],
    deliverables: [
      { count: 12, label: "Website Pages" },
      { count: 6, label: "Collection Pages" },
      { count: 14, label: "Content Guides" },
      { count: 8, label: "Schema Types" },
      { count: 5, label: "Integrations" },
      { count: 4, label: "Automations" },
    ],
    faq: [
      { q: "How long did this project take?", a: "The full engagement ran 8 months — months 1-2 focused on the storefront rebuild and technical foundation, months 3-5 on SEO and collection funnels, and months 6-8 on CRO and attribution." },
      { q: "How long before orders increased?", a: "Conversion gains appeared within weeks of the storefront launch. Organic order volume began climbing around month 4 as collection pages and guides started ranking for buyer-intent searches." },
      { q: "Which tactic had the fastest impact?", a: "The storefront rebuild and product-page CRO moved first — clearer collections, instant-download messaging, and trust proof lifted conversion rate before SEO fully matured." },
      { q: "How did organic take share from paid?", a: "As organic traffic grew from 950 to 2,280 visits per month and conversion improved from 1.9% to 3.4%, paid spend was scaled back. Organic and direct channels carried a larger share of the 78 monthly orders by month 8." },
      { q: "How were results measured?", a: "Orders and revenue came from the storefront checkout and Hotmart reporting with source attribution. Traffic and rankings came from GA4 and Search Console. Conversion rate was tracked on collection and product pages." },
    ],
  },
};

export function getCaseStudySlugMeta(slug: string): CaseStudySlugMeta {
  return caseStudySlugMeta[slug] ?? caseStudySlugMeta["landscaping-company-growth"];
}
