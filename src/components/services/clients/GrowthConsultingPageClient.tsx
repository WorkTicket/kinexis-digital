"use client";

import { m as motion } from "@/lib/framer";
import HeroArchetype from "@/components/ui/HeroArchetype";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import CTAArchetype from "@/components/ui/CTAArchetype";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePillarSections from "@/components/sections/ServicePillarSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { growthConsultingPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { GrowthConsultingContent } from "@/content/services/growth-consulting";
import GrowthConsultingHeroViz from "@/components/services/hero-viz/GrowthConsultingHeroViz";
import { TrendingUp, Users, BarChart3, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const frameworkIcons: Record<string, LucideIcon> = {
  traffic: BarChart3,
  conversion: Target,
  revenue: TrendingUp,
  retention: Users,
};


type Props = { content: GrowthConsultingContent };

export default function GrowthConsultingPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("growth-consulting");

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
        visualization={<GrowthConsultingHeroViz quarters={c.roadmapSection.quarters} />}
      />

      <ServiceSeoSections slug="growth-consulting" locale={locale} />

      <ServicePillarSections content={growthConsultingPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.frameworkSection.title}
            subtitle={c.frameworkSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.frameworkSection.layers.map((f, i) => {
              const Icon = frameworkIcons[f.id];
              return (
                <motion.div
                  key={f.id}
                  className="rounded-xl border border-white/[0.06] bg-bg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-neon-cyan" />
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">{f.status}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{f.layer}</h3>
                      <p className="mt-1 text-xs text-muted">{f.channels}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.roadmapSection.title}
            subtitle={c.roadmapSection.subtitle}
          />
          <div className="grid gap-grid-sm md:grid-cols-4">
            {c.roadmapSection.quarters.map((r) => (
              <CardFamily key={r.quarter} family="glass">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan shrink-0">{r.quarter}</span>
                  <h3 className="font-bold text-sm leading-tight">{r.focus}</h3>
                </div>
                <ProofMetric value={r.impact} align="left" className="mb-2" />
                <p className="text-xs text-muted leading-relaxed">{r.actions}</p>
              </CardFamily>
            ))}
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
            {c.metricsSection.metrics.map((r) => (
              <CardFamily key={r.label} family="dashboard" className="h-full">
                <ProofMetric
                  size="lg"
                  value={
                    <AnimatedCounter from={0} to={r.value} prefix={r.prefix} suffix={r.suffix} />
                  }
                  label={r.label}
                  description={r.desc}
                />
              </CardFamily>
            ))}
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

      <ServicePageFooter slug="growth-consulting" locale={locale} existingFaqs={c.faqs} />

      <CTAArchetype
        archetype="story"
        headline={c.cta.headline}
        subtitle={c.cta.subtitle}
        ctaLabel={c.cta.ctaLabel}
        ctaHref="/contact"
      />
    </>
  );
}
