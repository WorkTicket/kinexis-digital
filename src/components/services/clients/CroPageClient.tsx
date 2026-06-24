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
import { croPillarContent } from "@/content/services/service-pillar-map";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
import type { CROContent } from "@/content/services/cro";
import CroHeroViz from "@/components/services/hero-viz/CroHeroViz";
import { GitCompare, Activity, Target, Search, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const methodStepIcons: Record<string, LucideIcon> = {
  collect: Search,
  hypothesize: Target,
  experiment: GitCompare,
  analyze: Activity,
  iterate: TrendingUp,
};

type Props = { content: CROContent };

export default function CroPageClient({ content: c }: Props) {
  const { locale, seo, breadcrumbs } = useServicePageSeo("cro");

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
        visualization={<CroHeroViz variantLabel={c.hero.variantLabel} />}
      />

      <ServiceSeoSections slug="cro" locale={locale} />

      <ServicePillarSections content={croPillarContent} />

      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.testTrackerSection.title}
            subtitle={c.testTrackerSection.subtitle}
          />
          <div className="overflow-hidden rounded-xl border border-white/[0.06]">
            <div className="grid grid-cols-[1fr_1fr_100px_100px_100px] gap-px bg-white/[0.06] text-xs md:text-sm">
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{c.testTrackerSection.headers.test}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted">{c.testTrackerSection.headers.winner}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.testTrackerSection.headers.lift}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.testTrackerSection.headers.significance}</div>
              <div className="bg-bg-dark px-5 py-4 font-semibold uppercase tracking-wider text-muted text-right">{c.testTrackerSection.headers.visitors}</div>
              {c.testResults.map((t, i) => (
                <motion.div
                  key={t.test}
                  className="contents"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <div className="bg-bg px-5 py-4 font-medium">{t.test}</div>
                  <div className="bg-bg px-5 py-4 text-muted">{t.winner}</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-emerald-400 font-semibold">{t.lift}</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-neon-cyan">{t.significance}</div>
                  <div className="bg-bg px-5 py-4 text-right font-mono text-muted">{t.runs}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-site">
          <SectionHeader
            pattern="C"
            title={c.methodSection.title}
            subtitle={c.methodSection.subtitle}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {c.methodSection.steps.map((ms) => {
              const Icon = methodStepIcons[ms.id];
              return (
                <CardFamily key={ms.id} family="glass" className="flex flex-col gap-5">
                  <StepIcon icon={Icon} size="sm" />
                  <div>
                    <h3 className="text-sm font-bold leading-snug">{ms.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{ms.desc}</p>
                  </div>
                </CardFamily>
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
          <div className="grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-4 items-stretch">
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

      <ServicePageFooter slug="cro" locale={locale} existingFaqs={c.faqs} />

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
