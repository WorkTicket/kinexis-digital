import type { FAQItem } from "@/components/sections/FAQSection";
import { getServiceSeoContent, mergeServiceFaqs } from "@/content/service-seo";
import type { ComparisonRow, ServiceSeoSlug } from "@/content/service-seo/types";
import { servicePillarBySlug } from "@/content/services/architecture/build-service-page-data";
import type { PricingSlug } from "@/content/registry/site-routes";
import { serviceLabels } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { pricingContent, type PricingPageContent } from "@/content/pricing/pricing-pages";

const FLAGSHIP_PRICING_SLUGS = ["seo", "google-ads", "web-design", "meta-ads"] as const;

const INVESTMENT_LABELS = ["starting investment", "monthly investment", "project cost", "investment level"];
const BEST_FOR_LABELS = ["best for", "ideal para"];

function pricingShortName(label: string) {
  const SHORT: Record<string, string> = {
    "Funnels & Conversion Rate Optimization": "Funnels and CRO",
  };
  if (SHORT[label]) return SHORT[label];
  return label.replace(/ Services$/, "").replace(/ Management$/, "");
}

function isInvestmentRow(label: string) {
  return INVESTMENT_LABELS.some((key) => label.toLowerCase().includes(key));
}

function isBestForRow(label: string) {
  return BEST_FOR_LABELS.some((key) => label.toLowerCase().includes(key));
}

function genericPricingFaqs(note?: string): FAQItem[] {
  return [
    {
      question: "Is there a setup fee?",
      answer:
        "Most engagements include onboarding and strategy in month one. We quote it upfront. No surprise charges on the first invoice.",
    },
    {
      question: "Do you require a long-term contract?",
      answer: "No. Month to month. Results should earn your business, not a contract clause.",
    },
    {
      question: "What affects my price?",
      answer:
        note ??
        "Scope, competition, where you are starting from, and how much production your market needs. We scope this on a strategy call, not a generic quote form.",
    },
    {
      question: "Can I start with a smaller plan and upgrade?",
      answer:
        "Yes. Many clients start on Starter and move up once momentum builds. We plan the upgrade path so you are not rebuilding from scratch.",
    },
  ];
}

function buildProgressionComparison(
  title: string,
  subtitle: string,
  tiers: PricingPageContent["tiers"],
  featureRows: ComparisonRow[] = [],
): PricingPageContent["comparison"] {
  const columns = tiers.map((tier, index) => ({
    header: tier.name,
    highlight: index === 1,
  }));

  const rows: ComparisonRow[] = [
    ...featureRows,
    {
      label: "Best for",
      values: tiers.map((tier) => tier.bestFor),
    },
    {
      label: "Starting investment",
      values: tiers.map((tier) => tier.range),
    },
  ];

  return { title, subtitle, layout: "progression", columns, rows };
}

function buildDeliverableFeatureRows(
  tiers: PricingPageContent["tiers"],
  deliverableTitles: string[],
): ComparisonRow[] {
  const depthLabels = ["Core", "Standard", "Advanced"];

  return deliverableTitles.slice(0, 4).map((title) => ({
    label: title,
    values: tiers.map((_, index) => depthLabels[Math.min(index, depthLabels.length - 1)] ?? "Included"),
  }));
}

function resolveProgressionComparison(
  content: PricingPageContent,
  slug: PricingSlug,
  locale: Locale,
): PricingPageContent["comparison"] {
  if (slug === "paid-ads") {
    return getServiceSeoContent("paid-ads", locale).comparison;
  }

  const { tiers, comparison, tiersSection } = content;
  if (tiers.length !== 3) {
    return { ...comparison, layout: comparison.layout ?? "progression" };
  }

  if (comparison.layout === "progression" && comparison.columns.length === 3) {
    return {
      ...comparison,
      columns: comparison.columns.map((column, index) => ({
        ...column,
        highlight: index === 1,
      })),
    };
  }

  const title = tiersSection?.title ?? comparison.title;
  const subtitle = tiersSection?.subtitle ?? comparison.subtitle;

  const existingFeatureRows =
    comparison.columns.length === 3
      ? comparison.rows.filter((row) => !isBestForRow(row.label) && !isInvestmentRow(row.label))
      : [];

  const pillar = servicePillarBySlug[slug as ServiceSeoSlug];
  const featureRows =
    existingFeatureRows.length > 0
      ? existingFeatureRows
      : buildDeliverableFeatureRows(
          tiers,
          pillar?.deliverables.items.map((item) => item.title) ?? [],
        );

  return buildProgressionComparison(title, subtitle, tiers, featureRows);
}

function enrichPricingContent(content: PricingPageContent, slug: PricingSlug, locale: Locale): PricingPageContent {
  const pillar = servicePillarBySlug[slug as ServiceSeoSlug];
  const comparison = resolveProgressionComparison(content, slug, locale);

  return {
    ...content,
    comparison,
    tiersSection: content.tiersSection ?? {
      title: comparison.title,
      subtitle: comparison.subtitle,
      note: pillar?.pricing.note,
    },
    includedSection: content.includedSection ?? {
      title: pillar?.deliverables.title ?? "Included in every plan",
      subtitle:
        pillar?.deliverables.subtitle.replace(/\|/g, " ") ??
        "Core deliverables covered at every tier. Volume and depth scale with your plan.",
      items: pillar
        ? pillar.deliverables.items.map((item) => ({ title: item.title, description: item.description }))
        : content.included.map((title) => ({ title, description: "" })),
    },
  };
}

function buildGeneratedPricingContent(slug: PricingSlug, locale: Locale): PricingPageContent {
  const pillar = servicePillarBySlug[slug as ServiceSeoSlug];
  const label = serviceLabels[slug];
  const shortName = pricingShortName(label);
  const pricingLabel = `${shortName} Pricing`;

  const tiers = pillar.pricing.tiers.map((tier) => ({
    name: tier.name,
    range: tier.range,
    description: tier.description,
    bestFor: tier.description,
  }));

  const included = pillar.deliverables.items.map((item) => item.title);
  const tiersSection = {
    title: pillar.pricing.title,
    subtitle: pillar.pricing.subtitle,
    note: pillar.pricing.note,
  };

  return enrichPricingContent(
    {
      metaTitle: `${shortName} Pricing | KINEXIS`,
      metaDescription: `Transparent ${shortName.toLowerCase()} pricing with clear tiers and deliverables. No hidden fees. No vague retainers.`,
      hero: {
        label: pricingLabel,
        line1: pricingLabel,
        line2: "without the guesswork.",
        subtitle: "Fixed scope at each tier. You see what is included before you sign anything.",
      },
      answerBlock: [pillar.overview.paragraphs[0], pillar.pricing.note].filter(Boolean).join(" "),
      tiers,
      tiersSection,
      included,
      includedSection: {
        title: pillar.deliverables.title,
        subtitle: pillar.deliverables.subtitle.replace(/\|/g, " "),
        items: pillar.deliverables.items.map((item) => ({
          title: item.title,
          description: item.description,
        })),
      },
      comparison: buildProgressionComparison(
        tiersSection.title,
        tiersSection.subtitle,
        tiers,
        buildDeliverableFeatureRows(tiers, pillar.deliverables.items.map((item) => item.title)),
      ),
      faqs: mergeServiceFaqs(slug, locale, genericPricingFaqs(pillar.pricing.note)).slice(0, 8),
      ctaHeadline: `Want a quote for ${shortName.toLowerCase()}?`,
      ctaSubtitle:
        "Tell us your goals, market, and scope.|We will recommend the right tier and show you what the first 90 days look like.",
      ctaLabel: `Get ${shortName} Pricing`,
    },
    slug,
    locale,
  );
}

export function getPricingPageContent(slug: PricingSlug, locale: Locale): PricingPageContent {
  if ((FLAGSHIP_PRICING_SLUGS as readonly string[]).includes(slug)) {
    const content = getLocalizedContent(pricingContent[slug as (typeof FLAGSHIP_PRICING_SLUGS)[number]], locale);
    return enrichPricingContent(content, slug, locale);
  }

  return buildGeneratedPricingContent(slug, locale);
}
