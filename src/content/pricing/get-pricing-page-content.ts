import { CASE_STUDIES } from "@/content/case-study-crossrefs";
import {
  buildGenericPricingFaqs,
  generatedPricingOverrides,
  tierProofSectionLabel,
  tierProofTierLabels,
} from "@/content/pricing/generated-pricing-localized";
import { mergeServiceFaqs } from "@/content/service-seo";
import type { ComparisonRow, ServiceSeoSlug } from "@/content/service-seo/types";
import { servicePillarBySlug } from "@/content/services/architecture/build-service-page-data";
import type { PricingSlug } from "@/content/registry/site-routes";
import { serviceLabels } from "@/content/registry/site-routes";
import type { Locale } from "@/i18n/routing";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { pricingContent, type PricingPageContent } from "@/content/pricing/pricing-pages";

const FLAGSHIP_PRICING_SLUGS = ["seo", "ppc-management", "web-design", "meta-ads"] as const;

const INVESTMENT_LABELS = ["starting investment", "monthly investment", "project cost", "investment level", "inversión"];
const BEST_FOR_LABELS = ["best for", "ideal para"];

function pricingShortName(label: string, locale: Locale) {
  if (locale === "es") {
    const ES_SHORT: Record<string, string> = {
      "Funnels & Conversion Rate Optimization": "Funnels y CRO",
    };
    if (ES_SHORT[label]) return ES_SHORT[label];
    return label
      .replace(/ Services$/, "")
      .replace(/ Management$/, "")
      .replace(/ Services$/, "");
  }
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

const PRICING_TIER_PROOF: Partial<
  Record<PricingSlug, { caseStudy: keyof typeof CASE_STUDIES; result: string; tierName: string }>
> = {
  seo: { caseStudy: "landscaping", result: "4.8X lead growth", tierName: "Growth" },
  "local-seo": { caseStudy: "plumbing", result: "327% more emergency calls", tierName: "Growth" },
  "ppc-management": { caseStudy: "plumbing", result: "327% more emergency calls", tierName: "Growth" },
  "meta-ads": { caseStudy: "saas", result: "5.9X demo requests", tierName: "Growth" },
  "web-design": { caseStudy: "landscaping", result: "1.8% to 8.4% conversion rate", tierName: "Growth" },
  funnels: { caseStudy: "landscaping", result: "1.8% to 8.4% conversion rate", tierName: "Growth" },
  analytics: { caseStudy: "saas", result: "5.9X demo requests", tierName: "Growth" },
  "growth-consulting": { caseStudy: "saas", result: "5.9X demo requests", tierName: "Growth" },
  "social-media": { caseStudy: "landscaping", result: "4.8X lead growth", tierName: "Growth" },
};

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
  _locale: Locale,
): PricingPageContent["comparison"] {
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
  const tierProofConfig = PRICING_TIER_PROOF[slug];
  const tierNameKey = tierProofConfig?.tierName ?? "Growth";
  const tierProof = tierProofConfig
    ? {
        result: tierProofConfig.result,
        client: CASE_STUDIES[tierProofConfig.caseStudy].client,
        href: CASE_STUDIES[tierProofConfig.caseStudy].href,
        tierName: tierProofTierLabels[locale][tierNameKey] ?? tierNameKey,
        sectionLabel: tierProofSectionLabel[locale],
      }
    : content.tierProof;

  return {
    ...content,
    comparison,
    tierProof,
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
  const shortName = pricingShortName(label, locale);
  const pricingLabel = locale === "es" ? `Precios ${shortName}` : `${shortName} Pricing`;

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

  const overrides = generatedPricingOverrides[locale][slug];
  const defaultHero = {
    label: pricingLabel,
    line1: pricingLabel,
    line2: locale === "es" ? "sin adivinar." : "without the guesswork.",
    subtitle:
      locale === "es"
        ? "Alcance fijo en cada nivel. Ves qué incluye antes de firmar."
        : "Fixed scope at each tier. You see what is included before you sign anything.",
  };
  const defaultAnswerBlock = [pillar.overview.paragraphs[0], pillar.pricing.note].filter(Boolean).join(" ");
  const defaultMetaTitle = locale === "es" ? `Precios ${shortName} | KINEXIS` : `${shortName} Pricing | KINEXIS`;
  const defaultMetaDescription =
    locale === "es"
      ? `Precios transparentes de ${shortName.toLowerCase()} con niveles Starter, Growth y Scale. Entregables definidos, sin cargos ocultos ni contratos largos.`
      : `Transparent ${shortName.toLowerCase()} pricing with clear Starter, Growth, and Scale tiers. Defined deliverables at every level, no hidden fees, no vague retainers, and no long-term contracts required.`;

  return enrichPricingContent(
    {
      metaTitle: overrides?.metaTitle ?? defaultMetaTitle,
      metaDescription: overrides?.metaDescription ?? defaultMetaDescription,
      hero: overrides?.hero ?? defaultHero,
      answerBlock: overrides?.answerBlock ?? defaultAnswerBlock,
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
      faqs: mergeServiceFaqs(slug, locale, buildGenericPricingFaqs(slug, locale, pillar.pricing.note)).slice(0, 8),
      ctaHeadline:
        overrides?.ctaHeadline ??
        (locale === "es" ? `¿Quieres cotización de ${shortName.toLowerCase()}?` : `Want a quote for ${shortName.toLowerCase()}?`),
      ctaSubtitle:
        overrides?.ctaSubtitle ??
        (locale === "es"
          ? "Cuéntanos tus metas, mercado y alcance.|Recomendaremos el nivel y los primeros 90 días."
          : "Tell us your goals, market, and scope.|We will recommend the right tier and show you what the first 90 days look like."),
      ctaLabel:
        overrides?.ctaLabel ??
        (locale === "es" ? `Obtén Precios ${shortName}` : `Get ${shortName} Pricing`),
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
