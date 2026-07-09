import type { FAQItem } from "@/components/sections/FAQSection";
import type { ServiceSlug } from "@/content/registry/site-routes";

export type ServiceSeoSlug = ServiceSlug | "local-seo";

export type ComparisonColumn = {
  header: string;
  highlight?: boolean;
};

export type ComparisonRow = {
  label: string;
  values: string[];
};

/** Controls which comparison UI renders. Each layout fits a different story. */
export type ComparisonLayout =
  | "ledger" // clean spec sheet: alt vs KINEXIS in one panel
  | "contrast" // two tall pillar columns
  | "impact" // metric-forward for ads / CRO
  | "stacked" // stacked verdict cards
  | "progression"; // 3-stage maturity path (paid ads)

export type ServiceSeoContent = {
  metaTitle: string;
  metaDescription: string;
  editorial?: {
    bridgeParagraph: string;
    pullQuote?: { quote: string; attribution: string };
  };
  hero: {
    label: string;
    line1: string;
    line2: string;
    subtitle: string;
  };
  answerBlock: string;
  problem: {
    title: string;
    intro: string;
    points: string[];
  };
  solution: {
    title: string;
    intro: string;
    points: string[];
  };
  deliverables: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  comparison: {
    title: string;
    subtitle: string;
    layout?: ComparisonLayout;
    columns: ComparisonColumn[];
    rows: ComparisonRow[];
  };
  extraFaqs: FAQItem[];
};
