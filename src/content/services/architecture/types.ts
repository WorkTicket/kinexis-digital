import type { ReactNode } from "react";
import type { FAQItem } from "@/components/sections/FAQSection";
import type { ServicePhase } from "@/components/ui/ServicePhaseList";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

export type { ServiceSeoSlug };

export type VisualVariant = "dashboard" | "mockup" | "split" | "chart" | "comparison" | "content";

export type EditorialData = {
  headline: string;
  paragraphs: string[];
  pullQuote?: { quote: string; attribution: string };
};

export type ServiceCTAData = {
  headline: string;
  subtitle: string;
  label: string;
  inlineLabel?: string;
  inlineSubtitle?: string;
};

export type ServiceSectionId =
  | "ServiceOverview"
  | "WhyKinexis"
  | "EditorialOverview"
  | "Process"
  | "Deliverables"
  | "Proof"
  | "Results"
  | "AnswerBlock"
  | "Comparison"
  // SEO
  | "SeoAudit"
  | "RankingStrategy"
  | "ContentStrategy"
  | "TechnicalSeo"
  // Google Ads
  | "CampaignArchitecture"
  | "KeywordResearch"
  | "LandingPages"
  | "ConversionTracking"
  // Web Design
  | "UxAudit"
  | "DeviceMockups"
  | "ConversionOptimization"
  | "Speed"
  // Meta Ads
  | "CreativeTesting"
  | "AudienceTargeting"
  | "LeadGenFunnel"
  | "Retargeting";

export type ServiceHeroData = {
  label: string;
  line1: string;
  line2: string;
  subtitle: string;
  ctaLabel: string;
  visualization?: ReactNode;
};

export type ServiceOverviewData = {
  headline: string;
  problem: string;
  solution: string;
  problemPoints: string[];
  solutionPoints: string[];
};

export type WhyKinexisData = {
  headline: string;
  /** Service-specific intro line, avoids generic copy on every page */
  subtitle: string;
  points: { title: string; description: string }[];
};

export type ProofCaseStudy = {
  client: string;
  challenge: string;
  /** What we actually did, narrative between challenge and results. */
  approach?: string;
  outcome: string;
  href?: string;
};

export type ProofBeforeAfter = {
  beforeLabel: string;
  afterLabel: string;
  beforeValue: string;
  afterValue: string;
  metric: string;
};

export type ProofData = {
  title?: string;
  subtitle?: string;
  caseStudy?: ProofCaseStudy;
  logos?: { src: string; alt: string }[];
  beforeAfter?: ProofBeforeAfter;
};

export type ResultMetric = {
  metric: string;
  label: string;
};

export type DeliverableItem = {
  title: string;
  description: string;
};

export type ServiceSectionTableHeaders = {
  col1: string;
  col2: string;
  col3: string;
};

export type ServiceSectionData = {
  id: string;
  headline: string;
  subheadline?: string;
  visualVariant: VisualVariant;
  points?: { title: string; description: string; metric?: string }[];
  /** Prose block above cards, required on content-rich service pages. */
  body?: string;
  maxCards?: number;
  tableHeaders?: ServiceSectionTableHeaders;
};

export type ServicePageData = {
  slug: ServiceSeoSlug;
  locale: Locale;
  visualVariant: VisualVariant;
  visualizationSection: string;
  hero: ServiceHeroData;
  sectionOrder: string[];
  editorial?: EditorialData;
  overview: ServiceOverviewData;
  whyKinexis: WhyKinexisData;
  cta?: ServiceCTAData;
  proof?: ProofData;
  results: {
    title: string;
    subtitle: string;
    metrics: ResultMetric[];
  };
  process: {
    title: string;
    subtitle: string;
    intro?: string;
    steps: ServicePhase[];
  };
  deliverables: {
    title: string;
    subtitle: string;
    items: DeliverableItem[];
  };
  serviceSections: Record<string, ServiceSectionData>;
  faq: FAQItem[];
  answerBlock?: string;
  comparison?: {
    title: string;
    subtitle: string;
    layout?: "ledger" | "contrast" | "impact" | "stacked" | "progression";
    columns: { header: string; highlight?: boolean }[];
    rows: { label: string; values: string[] }[];
  };
};

export type ArchitectedServiceSlug = ServiceSeoSlug;

/** @deprecated Use ArchitectedServiceSlug */
export type FlagshipServiceSlug = ServiceSeoSlug;
