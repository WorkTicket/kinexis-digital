"use client";

import { useLocale } from "next-intl";
import AnswerBlock from "@/components/sections/seo/AnswerBlock";
import ComparisonTable from "@/components/sections/seo/ComparisonTable";
import DeliverablesSection from "@/components/shared/services/DeliverablesSection";
import ProcessSection from "@/components/shared/services/ProcessSection";
import ProofSection from "@/components/shared/services/ProofSection";
import ResultsSection from "@/components/shared/services/ResultsSection";
import ServiceCTA from "@/components/shared/services/ServiceCTA";
import ServiceFAQSection from "@/components/shared/services/ServiceFAQSection";
import ServiceHero from "@/components/shared/services/ServiceHero";
import ServiceOverview from "@/components/shared/services/ServiceOverview";
import ServicePricingTeaser from "@/components/shared/services/ServicePricingTeaser";
import ServiceSection from "@/components/shared/services/ServiceSection";
import WebDesignDeviceMockupsSection from "@/components/services/WebDesignDeviceMockupsSection";
import WhyKinexusSection from "@/components/shared/services/WhyKinexusSection";
import { getServiceHeroVisualization } from "@/components/services/service-hero-visualizations";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import { buildServicePageData } from "@/content/services/architecture/build-service-page-data";
import type { ServiceSeoSlug } from "@/content/service-seo/types";
import type { Locale } from "@/i18n/routing";

type Props = {
  slug: ServiceSeoSlug;
};

const CORE_SECTIONS = [
  "ServiceOverview",
  "WhyKinexus",
  "Process",
  "Deliverables",
  "Proof",
  "Results",
  "AnswerBlock",
  "Comparison",
  "PricingTeaser",
] as const;

type CoreSectionId = (typeof CORE_SECTIONS)[number];

export default function ServicePage({ slug }: Props) {
  const locale = useLocale() as Locale;
  const data = buildServicePageData(slug, locale);
  const { breadcrumbs } = useServicePageSeo(slug);

  let surfaceIndex = 0;

  function renderSection(name: string, index: number) {
    if (CORE_SECTIONS.includes(name as CoreSectionId)) {
      switch (name as CoreSectionId) {
        case "ServiceOverview":
          return <ServiceOverview {...data.overview} surfaceIndex={index} />;
        case "WhyKinexus":
          return <WhyKinexusSection {...data.whyKinexus} surfaceIndex={index} />;
        case "Process":
          return (
            <ProcessSection
              title={data.process.title}
              subtitle={data.process.subtitle}
              steps={data.process.steps}
              surfaceIndex={index}
            />
          );
        case "Deliverables":
          return (
            <DeliverablesSection
              title={data.deliverables.title}
              subtitle={data.deliverables.subtitle}
              items={data.deliverables.items}
              surfaceIndex={index}
            />
          );
        case "Proof":
          return data.proof ? <ProofSection {...data.proof} surfaceIndex={index} /> : null;
        case "Results":
          return (
            <ResultsSection
              title={data.results.title}
              subtitle={data.results.subtitle}
              metrics={data.results.metrics}
              surfaceIndex={index}
            />
          );
        case "AnswerBlock":
          return data.answerBlock ? <AnswerBlock text={data.answerBlock} surfaceIndex={index} /> : null;
        case "Comparison":
          return data.comparison ? <ComparisonTable {...data.comparison} surfaceIndex={index} /> : null;
        case "PricingTeaser":
          return <ServicePricingTeaser slug={slug} />;
        default:
          return null;
      }
    }

    if (name === "DeviceMockups" && slug === "web-design") {
      return <WebDesignDeviceMockupsSection surfaceIndex={index} />;
    }

    const serviceSection = data.serviceSections[name];
    if (serviceSection) {
      return <ServiceSection {...serviceSection} surfaceIndex={index} />;
    }

    return null;
  }

  const orderedSections = data.sectionOrder
    .map((name) => {
      const section = renderSection(name, surfaceIndex);
      if (!section) return null;
      const rendered = <div key={name}>{section}</div>;
      if (name !== "PricingTeaser") {
        surfaceIndex += 1;
      }
      return rendered;
    })
    .filter(Boolean);

  const faqSection =
    data.faq.length > 0 ? (
      <ServiceFAQSection key="faq" items={data.faq} surfaceIndex={surfaceIndex++} />
    ) : null;

  return (
    <>
      <ServiceHero
        slug={slug}
        breadcrumbs={breadcrumbs}
        visualization={getServiceHeroVisualization(slug, locale)}
        {...data.hero}
      />

      {orderedSections}
      {faqSection}
      <ServiceCTA />
    </>
  );
}
