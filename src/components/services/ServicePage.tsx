"use client";

import dynamic from "next/dynamic";
import DeliverablesSection from "@/components/shared/services/DeliverablesSection";
import ProcessSection from "@/components/shared/services/ProcessSection";
import ServiceHero from "@/components/shared/services/ServiceHero";
import ServiceOverview from "@/components/shared/services/ServiceOverview";
import ServicePricingTeaser from "@/components/shared/services/ServicePricingTeaser";
import ServiceSection from "@/components/shared/services/ServiceSection";
import WhyKinexusSection from "@/components/shared/services/WhyKinexusSection";
import { getServiceHeroVisualization } from "@/components/services/service-hero-visualizations";
import type { ServicePageServerProps } from "@/lib/service-page-props";

const AnswerBlock = dynamic(() => import("@/components/sections/seo/AnswerBlock"));
const ComparisonTable = dynamic(() => import("@/components/sections/seo/ComparisonTable"));
const ProofSection = dynamic(() => import("@/components/shared/services/ProofSection"));
const ResultsSection = dynamic(() => import("@/components/shared/services/ResultsSection"));
const ServiceCTA = dynamic(() => import("@/components/shared/services/ServiceCTA"));
const ServiceFAQSection = dynamic(() => import("@/components/shared/services/ServiceFAQSection"));
const RelatedLinks = dynamic(() => import("@/components/sections/RelatedLinks"));
const WebDesignDeviceMockupsSection = dynamic(
  () => import("@/components/services/WebDesignDeviceMockupsSection")
);

type Props = ServicePageServerProps;

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

export default function ServicePage({
  slug,
  locale,
  data,
  breadcrumbs,
  relatedLinks,
  locationLinks,
}: Props) {
  const pageVisualization = getServiceHeroVisualization(slug, locale);

  let surfaceIndex = 0;

  function visualizationFor(sectionName: string) {
    return data.visualizationSection === sectionName ? pageVisualization : undefined;
  }

  function renderSection(name: string, index: number) {
    if (CORE_SECTIONS.includes(name as CoreSectionId)) {
      switch (name as CoreSectionId) {
        case "ServiceOverview":
          return (
            <ServiceOverview
              {...data.overview}
              surfaceIndex={index}
              visualization={visualizationFor("ServiceOverview")}
            />
          );
        case "WhyKinexus":
          return (
            <WhyKinexusSection
              {...data.whyKinexus}
              surfaceIndex={index}
              visualization={visualizationFor("WhyKinexus")}
            />
          );
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
      return (
        <ServiceSection
          {...serviceSection}
          surfaceIndex={index}
          visualization={visualizationFor(name)}
        />
      );
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
      <ServiceHero slug={slug} breadcrumbs={breadcrumbs} {...data.hero} />

      {orderedSections}
      {faqSection}
      <RelatedLinks
        agencyHub
        serviceLinks={relatedLinks.services}
        solutionLinks={relatedLinks.solutions.length > 0 ? relatedLinks.solutions : undefined}
        locationLinks={locationLinks.length > 0 ? locationLinks : undefined}
        caseStudyLinks={relatedLinks.caseStudies}
        blogLinks={relatedLinks.blog}
      />
      <ServiceCTA />
    </>
  );
}
