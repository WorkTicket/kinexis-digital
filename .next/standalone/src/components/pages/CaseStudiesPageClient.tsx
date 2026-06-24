"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import CTAArchetype from "@/components/ui/CTAArchetype";
import TextLink from "@/components/ui/TextLink";
import HeroArchetype from "@/components/ui/HeroArchetype";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProofMetric from "@/components/ui/ProofMetric";
import type { CaseStudiesContent } from "@/content/case-studies";
import TwoLineText from "@/components/ui/TwoLineText";
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  MousePointerClick,
  DollarSign,
  BarChart3,
  Layers,
} from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";

const metricWallIcons = [DollarSign, TrendingUp, Users, MousePointerClick];

function formatMetricValue(
  value: number,
  options: { prefix?: string; suffix?: string; decimals?: number } = {}
) {
  const { prefix = "", suffix = "", decimals = 0 } = options;
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}

type Props = { content: CaseStudiesContent };

export default function CaseStudiesPageClient({ content: c }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  const [activeIndustry, setActiveIndustry] = useState(c.industries[0]);

  const filtered =
    activeIndustry === c.industries[0]
      ? c.caseStudies
      : c.caseStudies.filter((cs) => cs.industry === activeIndustry);

  const featuredCS = c.caseStudies.find((cs) => cs.featured)!;

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
          <div className="grid grid-cols-2 gap-4">
            {c.metricWall.map((m, i) => {
              const Icon = metricWallIcons[i];
              return (
                <div
                  key={m.label}
                  className="proof-metric-card backdrop-blur-sm text-left"
                >
                  <ProofMetric
                    value={m.value}
                    label={
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4 text-neon-cyan shrink-0" />
                        {m.label}
                      </span>
                    }
                    align="left"
                    labelVariant="stat"
                    labelFirst
                  />
                </div>
              );
            })}
          </div>
        }
        visualizationClassName="hero__viz-inner--service"
        visualizationWrapperClassName="mt-8 lg:mt-0"
      />

      {/* Featured spotlight */}
      <section className="section-padding border-t border-white/[0.06]">
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

                <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 [&>*]:min-w-0">
                  {featuredCS.metrics.map((m) => (
                    <ProofMetric
                      key={m.label}
                      size="default"
                      align="left"
                      value={
                        <AnimatedCounter
                          from={m.from}
                          to={m.to}
                          prefix={m.prefix}
                          suffix={m.suffix}
                          decimals={m.decimals}
                        />
                      }
                      label={m.label}
                      valueClassName="whitespace-nowrap leading-snug"
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
      <section className="section-padding bg-bg-dark">
        <div className="container-site">
          <motion.div className="section-header section-header--left" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {c.clientResultsLabel}
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title section-title--left mt-4">
              <TwoLineText text={c.clientResultsTitle} variant="section" />
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle section-subtitle--left mt-4">
              <TwoLineText text={c.clientResultsDescription} variant="body" />
            </motion.p>
          </motion.div>

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
                  className="group motion-card flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
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

                    <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-3 xs:gap-3 pt-5 border-t border-white/[0.06]">
                      <div>
                        <div className="text-sm font-bold text-emerald-400">{cs.trafficLift}</div>
                        <div className="text-[10px] text-muted mt-0.5">{c.trafficLabel}</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neon-cyan">{cs.leadLift}</div>
                        <div className="text-[10px] text-muted mt-0.5">{c.leadsLabel}</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold gradient-text">{cs.revenueLift}</div>
                        <div className="text-[10px] text-muted mt-0.5">{c.revenueLabel}</div>
                      </div>
                    </div>

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
      <section className="section-padding border-t border-white/[0.06]">
        <div className="container-site">
          <motion.div className="section-header" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {c.whatDataShowsLabel}
            </motion.span>
            <motion.h2 variants={fadeUp} className="section-title mt-4">
              <TwoLineText text={c.whatDataShowsTitle} variant="section" />
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle mt-4">
              <TwoLineText text={c.whatDataShowsDescription} variant="body" />
            </motion.p>
          </motion.div>

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
