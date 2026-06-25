"use client";

import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CTAArchetype from "@/components/ui/CTAArchetype";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import ProofMetric from "@/components/ui/ProofMetric";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { localSeoPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { LocalSeoContent } from "@/content/services/local-seo";
import { getServiceHeroTheme } from "@/lib/service-hero";
import SeoHeroViz from "@/components/services/hero-viz/SeoHeroViz";

type Props = { content: LocalSeoContent };

const diagramLabels = {
  technical: "Local Citations",
  ux: "Google Business Profile",
  content: "Location Pages",
  links: "Reviews",
  rankings: "Map Pack",
  revenue: "Booked Calls",
};

export default function LocalSeoPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("local-seo");

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        theme={getServiceHeroTheme("seo")}
        label={seo.hero.label}
        headline={
          <>
            <span className="type-hero-line">{seo.hero.line1}</span>
            <span className="type-hero-line">{seo.hero.line2}</span>
          </>
        }
        subtitle={seo.hero.subtitle}
        ctaLabel={c.ctaLabel}
        ctaHref="/contact"
  breadcrumbs={breadcrumbs}
        visualizationClassName="hero__viz-inner--service-page"
        visualization={<SeoHeroViz labels={diagramLabels} />}
      />

      <ServiceSeoSections slug="local-seo" locale={locale} />

      <ServicePillarSections content={localSeoPillarContent} />

      <section className="section-padding section--editorial">
        <div className="container-site">
          <SectionHeader pattern="B" title={c.phasesTitle} subtitle={c.phasesSubtitle} />
          <div className="section-content">
            <ServicePhaseList phases={c.phases} />
          </div>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader pattern="C" title={c.resultsTitle} subtitle={c.resultsSubtitle} />
          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {c.results.map((r) => (
              <div key={r.label} className="proof-metric-card">
                <ProofMetric value={r.metric} label={r.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicePageFooter slug="local-seo" locale={locale} existingFaqs={c.faqs} />

      <CTAArchetype
        archetype="tool"
        headline={c.ctaHeadline}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
