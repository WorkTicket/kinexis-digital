"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import CaseStudyMetricCard from "@/components/case-studies/CaseStudyMetricCard";
import CaseStudyLiftRow from "@/components/case-studies/CaseStudyLiftRow";
import CTAArchetype from "@/components/ui/CTAArchetype";
import TextLink from "@/components/ui/TextLink";
import HeroArchetype from "@/components/ui/HeroArchetype";
import ProofMetric from "@/components/ui/ProofMetric";
import type { CaseStudiesContent } from "@/content/case-studies";
import { formatMetricValue } from "@/lib/format-metric";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSectionClasses } from "@/lib/page-section-surface";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  MousePointerClick,
  DollarSign,
  BarChart3,
  Layers,
} from "lucide-react";

const metricWallIcons = [DollarSign, TrendingUp, Users, MousePointerClick];

type Props = { content: CaseStudiesContent };

export default function CaseStudiesPageClient({ content: c }: Props) {
  const [activeIndustry, setActiveIndustry] = useState(c.industries[0]);

  const filtered =
    activeIndustry === c.industries[0]
      ? c.caseStudies
      : c.caseStudies.filter((cs) => cs.industry === activeIndustry);

  const featuredCS = c.caseStudies.find((cs) => cs.featured)!;
  let surfaceIndex = 0;

  return (
    <>
      <HeroArchetype
        archetype="showcase"
        label="Case Studies"
        headline={
          <>
            <span className="type-hero-line">{c.heroTitleLine1}</span>
            <span className="type-hero-line gradient-text">{c.heroTitleGradient}</span>
          </>
        }
        subtitle={c.heroSubtitle}
        ctaLabel="Book a Strategy Call"
        ctaHref="/contact"
        visualization={
          <div className="flex justify-center w-full">
            <div className="relative inline-flex">
              <div className="absolute -inset-4 bg-gradient-to-br from-neon-cyan/[0.04] via-transparent to-transparent blur-2xl pointer-events-none" />
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                {c.metricWall.map((m, i) => {
                  const Icon = metricWallIcons[i];
                  return (
                    <div
                      key={m.label}
                      className="proof-metric-card backdrop-blur-sm text-left p-4 xs:p-3.5 sm:p-4"
                    >
                      <div className="flex flex-col gap-1.5">
                        <span className="type-metric-label-stat inline-flex items-start gap-2 mt-0">
                          <Icon className="h-4 w-4 text-neon-cyan shrink-0 mt-0.5" />
                          <span>{m.label}</span>
                        </span>
                        <span className="type-metric">{m.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        }
        visualizationClassName="hero__viz-inner--service"
        visualizationWrapperClassName="mt-8 lg:mt-0"
      />

      {/* Featured spotlight */}
      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site">
          <motion.div
            className="rounded-3xl border border-white/[0.06] bg-white/[0.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.05] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                  {c.featuredCaseStudyLabel}
                </span>
                <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-muted">
                  {featuredCS.industry}
                </span>
                <h2 className="section-title section-title--left mt-3 gradient-text">
                  {featuredCS.headline}
                </h2>
                <h3 className="mt-2 text-xl font-bold">{featuredCS.title}</h3>
                <p className="mt-4 section-intro section-intro--left">
                  {featuredCS.summary}
                </p>

                <div className="mt-8 case-study-results-grid">
                  {featuredCS.metrics.map((m) => (
                    <CaseStudyMetricCard
                      key={m.label}
                      metric={{
                        label: m.label,
                        before: m.from,
                        after: m.to,
                        prefix: m.prefix,
                        suffix: m.suffix,
                        decimals: m.decimals,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredCS.services.map((s) => (
                    <span key={s} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <TextLink href={`/case-studies/${featuredCS.slug}`}>
                    {c.readFullCaseStudy}
                  </TextLink>
                </div>
              </div>

              <div className="bg-bg-dark p-8 md:p-12 lg:p-14 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
                <div className="flex items-center gap-2 mb-8">
                  <BarChart3 className="h-4 w-4 text-neon-cyan" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neon-cyan">{c.beforeVsAfterLabel}</span>
                </div>
                <div className="space-y-7">
                  {featuredCS.metrics.map((m) => {
                    const total = m.from + m.to;
                    const beforePercent = (m.from / total) * 100;
                    const afterPercent = (m.to / total) * 100;
                    return (
                      <div key={m.label}>
                        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <span className="text-sm font-medium shrink-0">{m.label}</span>
                          <span className="text-xs tabular-nums text-muted sm:text-right">
                            <span className="whitespace-nowrap">{formatMetricValue(m.from, m)}</span>
                            <span className="text-muted/40 mx-1.5">→</span>
                            <span className="whitespace-nowrap text-neon-cyan font-semibold">
                              {formatMetricValue(m.to, m)}
                            </span>
                          </span>
                        </div>
                        <div className="relative h-2.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="absolute left-0 top-0 h-full bg-white/15 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${beforePercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          />
                          <motion.div
                            className="absolute top-0 h-full bg-gradient rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${afterPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            style={{ left: `${beforePercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between text-sm">
                  <span className="text-muted">{c.timelineLabel}</span>
                  <span className="font-semibold">{featuredCS.timeline}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case study grid */}
      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site">
          <SectionHeader
            badge={c.clientResultsLabel}
            title={c.clientResultsTitle}
            description={c.clientResultsDescription}
            align="left"
          />

          <div className="section-content flex flex-wrap gap-2">
            {c.industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`min-h-touch px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 touch-manipulation ${
                  activeIndustry === ind
                    ? "bg-neon-cyan text-bg-dark shadow-lg shadow-neon-cyan/20"
                    : "border border-white/[0.08] text-muted hover:border-white/20 hover:text-white"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              className="section-content grid gap-grid-sm md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {filtered.map((cs, i) => (
                <motion.article
                  key={cs.slug}
                  className="group motion-card flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-block rounded-full border border-white/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {cs.industry}
                      </span>
                      <span className="text-xs text-muted">{cs.timeline}</span>
                    </div>

                    <h3 className="mt-5 text-2xl font-bold gradient-text">{cs.headline}</h3>
                    <p className="mt-1 text-base font-semibold">{cs.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted flex-1">{cs.summary}</p>

                    <CaseStudyLiftRow
                      className="mt-6"
                      items={[
                        { value: cs.trafficLift, label: c.trafficLabel, tone: "traffic" },
                        { value: cs.leadLift, label: c.leadsLabel, tone: "leads" },
                        { value: cs.revenueLift, label: c.revenueLabel, tone: "revenue" },
                      ]}
                    />

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {cs.services.map((s) => (
                        <span key={s} className="text-[10px] text-muted/60">{s}</span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="flex items-center justify-between gap-2 border-t border-white/[0.06] px-6 md:px-8 py-4 text-sm font-semibold text-neon-cyan group-hover:bg-neon-cyan/[0.03] transition-colors"
                  >
                    {c.viewCaseStudy}
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="section-cta-row text-muted">{c.noCaseStudiesMessage}</p>
          )}
        </div>
      </section>

      {/* Growth patterns */}
      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site">
          <SectionHeader
            badge={c.whatDataShowsLabel}
            title={c.whatDataShowsTitle}
            description={c.whatDataShowsDescription}
          />

          <div className="section-content grid gap-grid-sm sm:grid-cols-2 lg:grid-cols-4">
            {c.growthPatterns.map((p, i) => (
              <motion.div
                key={p.combo}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-neon-cyan/15 transition-colors duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex justify-center mb-3">
                  <Layers className="h-4 w-4 text-neon-cyan/60" />
                </div>
                <ProofMetric value={p.lift} label={p.combo} description={p.desc} align="center" className="[&_.type-metric-label]:font-bold" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTAArchetype
        headline={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaButton}
        ctaHref="/contact"
      />
    </>
  );
}
