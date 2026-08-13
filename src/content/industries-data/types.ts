export type IndustryFocus = {
  title: string;
  detail: string;
};

export type IndustryDomain = {
  title: string;
  detail: string;
};

export type IndustryFaq = {
  question: string;
  answer: string;
};

export type IndustrySlug =
  | "home-services"
  | "ecommerce"
  | "healthcare"
  | "dental"
  | "legal"
  | "real-estate"
  | "restaurants"
  | "saas"
  | "automotive"
  | "fitness"
  | "construction"
  | "professional-services"
  | "financial-services"
  | "education"
  | "beauty-wellness";

export type IndustryStatCallout = {
  value: string;
  label: string;
};

export type IndustryPainPoint = {
  title: string;
  detail: string;
};

export type IndustryCaseStudy = {
  client: string;
  industry: string;
  challenge: string;
  result: string;
  resultValue: string;
  resultLabel: string;
  href?: string;
};

export type IndustryTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type IndustryProcessStep = {
  title: string;
  detail: string;
};

export type Industry = {
  slug: IndustrySlug;
  title: string;
  navLabel: string;
  eyebrow: string;
  /** Short line on the industries hub */
  summary: string;
  exploreLabel: string;
  /** Names shown in the Clay-style discovery row on the hub */
  discover: string[];
  /** Hub body — one tight paragraph */
  body: string;
  focuses: IndustryFocus[];
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSignal?: string;
  heroCopy: string;
  problemTitle: string;
  problemCopy: string;
  approachTitle: string;
  approachCopy: string;
  helpTitle: string;
  help: IndustryFocus[];
  domainsTitle: string;
  domainsCopy: string;
  domains: IndustryDomain[];
  whyTitle: string;
  why: IndustryFocus[];
  faq: IndustryFaq[];
  ctaTitle: string;
  ctaCopy: string;
  /** Hex color for accent — icons, tags, chart highlights per industry */
  accentColor?: string;
  /** Hero-adjacent stat for the proof strip */
  statCallout?: IndustryStatCallout;
  /** Dedicated pain points — 3-4 problems in the client's language */
  painPoints?: IndustryPainPoint[];
  /** Real or representative case study for this vertical */
  caseStudy?: IndustryCaseStudy;
  /** Process section framing — unique per industry */
  processTitle?: string;
  processCopy?: string;
  /** Process steps — how engagement works, industry-adjusted */
  processSteps?: IndustryProcessStep[];
  /** Proof section heading — unique per industry */
  proofTitle?: string;
  /** Testimonials section heading — unique per industry */
  testimonialsTitle?: string;
  /** Testimonials from this industry specifically */
  testimonials?: IndustryTestimonial[];
  /** Mid-page CTA — unique per industry */
  midCtaTitle?: string;
  midCtaCopy?: string;
  /** FAQ section heading — unique per industry */
  faqTitle?: string;
};
