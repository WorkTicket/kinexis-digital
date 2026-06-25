"use client";

import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import StepIcon from "@/components/ui/StepIcon";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { analyticsPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { AnalyticsContent } from "@/content/services/analytics";
import AnalyticsHeroViz from "@/components/services/hero-viz/AnalyticsHeroViz";
import { BarChart3, TrendingUp, Target, Eye, Layers, Activity, Settings, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const dataLayerIcons: Record<string, LucideIcon> = {
  traffic: BarChart3,
  behavior: Eye,
  conversions: Target,
  attribution: Layers,
};
const dataLayerColors = [
  "from-neon-cyan to-neon-blue",
  "from-neon-blue to-[#007aa3]",
  "from-[#007aa3] to-[#005f80]",
  "from-[#005f80] to-[#003d52]",
];
const dataLayerBarWidths = ["95%", "88%", "92%", "78%"];
const stackIcons: Record<string, LucideIcon> = {
  ga4: Settings,
  dashboards: LayoutDashboard,
  attribution: Layers,
};
const metricIcons: LucideIcon[] = [Target, Activity, TrendingUp];

type Props = { content: AnalyticsContent };

export default function AnalyticsPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("analytics");

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label={seo.hero.label}
        headline={
          <>
            <span className="type-hero-line">{seo.hero.line1}</span>
            <span className="type-hero-line">{seo.hero.line2}</span>
          </>
        }
        subtitle={seo.hero.subtitle}
        ctaLabel={c.hero.ctaLabel}
        ctaHref="/contact"
  breadcrumbs={breadcrumbs}
        visualizationClassName="hero__viz-inner--service-page"
        visualization={<AnalyticsHeroViz metrics={c.metricsSection.metrics} />}
      />

      <ServiceSeoSections slug="analytics" locale={locale} />

      <ServicePillarSections content={analyticsPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.dataWallSection.title}
            subtitle={c.dataWallSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.dataLayers.map((layer, i) => {
              const Icon = dataLayerIcons[layer.id];
              return (
                <CardFamily key={layer.id} family="dashboard">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">{layer.label}</span>
                  </div>
                  <div className="text-sm font-medium">{layer.metric}</div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${dataLayerColors[i]}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: dataLayerBarWidths[i] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    />
                  </div>
                </CardFamily>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.stackSection.title}
            subtitle={c.stackSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-3">
            {c.stackSection.items.map((phase, i) => {
              const Icon = stackIcons[phase.id];
              return (
              <motion.div
                key={phase.id}
                className="rounded-xl border border-white/[0.06] p-6 hover:border-white/[0.1] transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <StepIcon icon={Icon} size="sm" className="mb-4" />
                <h3 className="font-bold">{phase.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{phase.desc}</p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding section--data">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.metricsSection.title}
            subtitle={c.metricsSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-3 items-stretch">
            {c.metricsSection.metrics.map((r, i) => {
              const Icon = metricIcons[i];
              return (
                <CardFamily key={r.label} family="dashboard" className="h-full">
                  <ProofMetric
                    size="lg"
                    align="left"
                    labelFirst
                    label={
                      <span className="inline-flex items-center gap-3 text-sm font-medium normal-case tracking-normal text-muted">
                        <Icon className="h-5 w-5 text-neon-cyan shrink-0" />
                        {r.label}
                      </span>
                    }
                    value={<AnimatedCounter from={0} to={r.value} suffix={r.suffix} />}
                    description={r.desc}
                    className="[&_.type-metric-label]:normal-case [&_.type-metric-label]:font-medium [&_.type-metric-label]:text-sm [&_.type-metric-label]:tracking-normal"
                  />
                </CardFamily>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="B"
            title={c.processSection.title}
            subtitle={c.processSection.subtitle}
          />
          <ServicePhaseList phases={c.phases} />
        </div>
      </section>

      <ServicePageFooter slug="analytics" locale={locale} existingFaqs={c.faqs} />

      <CTAArchetype
        archetype="tool"
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaLabel={c.cta.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
