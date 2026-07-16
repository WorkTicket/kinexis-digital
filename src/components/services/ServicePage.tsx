import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import ProcessSection from "@/components/shared/services/ProcessSection";
import ServicePricingTeaser from "@/components/shared/services/ServicePricingTeaser";
import ServiceOverview from "@/components/shared/services/ServiceOverview";
import EditorialSection from "@/components/shared/services/EditorialSection";
import WhyKinexisSection from "@/components/shared/services/WhyKinexisSection";
import DeliverablesSection from "@/components/shared/services/DeliverablesSection";
import ServiceSection from "@/components/shared/services/ServiceSection";
import ProofSection from "@/components/shared/services/ProofSection";
import ResultsSection from "@/components/shared/services/ResultsSection";
import ServiceInlineCTA from "@/components/shared/services/ServiceInlineCTA";
import { getServiceHeroVisualization } from "@/components/services/service-hero-visualizations";
import type { ServicePageServerProps } from "@/lib/service-page-props";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

const AnswerBlock = dynamic(() => import("@/components/sections/seo/AnswerBlock"));
const ComparisonTable = dynamic(() => import("@/components/sections/seo/ComparisonTable"));
const ServiceCTA = dynamic(() => import("@/components/shared/services/ServiceCTA"));
const ServiceFAQSection = dynamic(() => import("@/components/shared/services/ServiceFAQSection"));
const RelatedLinks = dynamic(() => import("@/components/sections/RelatedLinks"));
const WebDesignDeviceMockupsSection = dynamic(
  () => import("@/components/services/WebDesignDeviceMockupsSection")
);

type Props = ServicePageServerProps;

type SectionRenderer = (ctx: { index: number }) => ReactNode;

function buildRegistry(slug: ServiceSeoSlug, locale: Locale, data: Props["data"]): Record<string, SectionRenderer> {
  const viz = getServiceHeroVisualization(slug, locale);

  function visualizationFor(sectionName: string) {
    return data.visualizationSection === sectionName ? viz : undefined;
  }

  return {
    ServiceOverview: ({ index }) => (
      <ServiceOverview {...data.overview} surfaceIndex={index} visualization={visualizationFor("ServiceOverview")} />
    ),
    EditorialOverview: ({ index }) =>
      data.editorial ? (
        <EditorialSection {...data.editorial} surfaceIndex={index} visualization={visualizationFor("EditorialOverview")} />
      ) : null,
    WhyKinexis: ({ index }) => (
      <WhyKinexisSection {...data.whyKinexis} surfaceIndex={index} visualization={visualizationFor("WhyKinexis")} />
    ),
    Process: ({ index }) => (
      <ProcessSection
        title={data.process.title}
        subtitle={data.process.subtitle}
        intro={data.process.intro}
        steps={data.process.steps}
        surfaceIndex={index}
      />
    ),
    Deliverables: ({ index }) => (
      <DeliverablesSection
        title={data.deliverables.title}
        subtitle={data.deliverables.subtitle}
        items={data.deliverables.items}
        surfaceIndex={index}
      />
    ),
    Proof: ({ index }) =>
      data.proof ? <ProofSection {...data.proof} locale={locale} surfaceIndex={index} /> : null,
    Results: ({ index }) => (
      <ResultsSection
        title={data.results.title}
        subtitle={data.results.subtitle}
        metrics={data.results.metrics}
        surfaceIndex={index}
      />
    ),
    AnswerBlock: ({ index }) =>
      data.answerBlock ? <AnswerBlock text={data.answerBlock} surfaceIndex={index} /> : null,
    Comparison: ({ index }) =>
      data.comparison ? <ComparisonTable {...data.comparison} surfaceIndex={index} /> : null,
    PricingTeaser: ({ index }) => <ServicePricingTeaser slug={slug} locale={locale} surfaceIndex={index} />,
    ServiceInlineCTA: ({ index }) =>
      data.cta?.inlineLabel ? (
        <ServiceInlineCTA label={data.cta.inlineLabel} subtitle={data.cta.inlineSubtitle} surfaceIndex={index} />
      ) : null,
    DeviceMockups: ({ index }) =>
      slug === "web-design" ? <WebDesignDeviceMockupsSection surfaceIndex={index} /> : null,
  };
}

export default function ServicePage({
  slug,
  locale,
  data,
  breadcrumbs: _breadcrumbs,
  relatedLinks,
}: Props) {
  const registry = buildRegistry(slug, locale, data);

  const effectiveOrder = [...data.sectionOrder];

  if (
    data.answerBlock &&
    !effectiveOrder.includes("AnswerBlock") &&
    effectiveOrder.includes("ServiceOverview")
  ) {
    const overviewIndex = effectiveOrder.indexOf("ServiceOverview");
    if (overviewIndex !== -1) {
      effectiveOrder.splice(overviewIndex + 1, 0, "AnswerBlock");
    }
  }

  if (data.comparison && !effectiveOrder.includes("Comparison")) {
    const pricingIndex = effectiveOrder.indexOf("PricingTeaser");
    if (pricingIndex !== -1) {
      effectiveOrder.splice(pricingIndex, 0, "Comparison");
    }
  }

  const sectionsWithIndex = effectiveOrder.reduce<{ name: string; index: number }[]>(
    (acc, name) => {
      const lastIndex = acc.length > 0 ? acc[acc.length - 1].index : 0;
      const nextIndex = name !== "PricingTeaser" ? lastIndex + 1 : lastIndex;
      acc.push({ name, index: nextIndex });
      return acc;
    },
    []
  );

  const orderedSections = sectionsWithIndex
    .map(({ name, index }) => {
      const renderer = registry[name];
      if (renderer) {
        const section = renderer({ index });
        if (!section) return null;
        return <div key={name}>{section}</div>;
      }
      const serviceSection = data.serviceSections[name];
      if (!serviceSection) return null;
      const viz = data.visualizationSection === name ? getServiceHeroVisualization(slug, locale) : undefined;
      return <div key={name}><ServiceSection {...serviceSection} surfaceIndex={index} visualization={viz} /></div>;
    })
    .filter(Boolean);

  const faqSurfaceIndex =
    sectionsWithIndex.length > 0 ? sectionsWithIndex[sectionsWithIndex.length - 1].index : 0;
  const faqSection =
    data.faq.length > 0 ? (
      <ServiceFAQSection key="faq" items={data.faq} surfaceIndex={faqSurfaceIndex} />
    ) : null;

  return (
    <>
      {orderedSections}
      {faqSection}
      <RelatedLinks
        agencyHub
        serviceLinks={relatedLinks.services}
        solutionLinks={relatedLinks.solutions.length > 0 ? relatedLinks.solutions : undefined}
        caseStudyLinks={relatedLinks.caseStudies}
        blogLinks={relatedLinks.blog}
      />
      <ServiceCTA cta={data.cta} />
    </>
  );
}
