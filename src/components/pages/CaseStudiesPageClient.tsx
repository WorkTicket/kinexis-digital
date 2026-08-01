"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { m as motion, AnimatePresence } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import CaseStudyMetricCard from "@/components/case-studies/CaseStudyMetricCard";
import CaseStudyLiftRow from "@/components/case-studies/CaseStudyLiftRow";
import CTAArchetype from "@/components/ui/CTAArchetype";
import TextLink from "@/components/ui/TextLink";
import HeroArchetype from "@/components/ui/HeroArchetype";
import ProofMetric from "@/components/ui/ProofMetric";
import { cardClasses } from "@/lib/card-styles";
import type { CaseStudiesContent } from "@/content/case-studies";
import { formatMetricValue } from "@/lib/format-metric";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/ui/SectionHeader";
import Section from "@/components/shared/services/Section";
import {
  ArrowUpRight,
  ExternalLink,
  BarChart3,
  Layers,
} from "lucide-react";

type Props = { content: CaseStudiesContent };

export default function CaseStudiesPageClient({ content: c }: Props) {
  const tCommon = useTranslations("common");
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
        ctaLabel={tCommon("bookStrategyCall")}
        ctaHref="/contact"
        secondaryCtaLabel={tCommon("getFreeAudit")}
        secondaryCtaHref="/lead-magnet"
      />

      {/* Aggregate proof — below the fold, homepage ProofStrip pattern */}
      <Section id="results-proof" surfaceIndex={surfaceIndex++} compact className="border-y border-surface">
        <div className="container-site">
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
            {c.metricWall.map((m, index) => (
              <li key={m.label}>
                <div
                  className={cn(
                    "flex h-full flex-col gap-2 lg:px-8",
                    index === 0 && "lg:pl-0",
                    index === c.metricWall.length - 1 && "lg:pr-0",
                  )}
                >
                  <span className="type-metric text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="gradient-text">{m.value}</span>
                  </span>
                  <span className="text-sm font-medium leading-snug text-white/85">{m.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Featured spotlight */}
      <Section id="featured-spotlight" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <motion.div
            className={cardClasses({ surface: "elevated", hover: false, className: "rounded-3xl !p-0 overflow-hidden" })}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={featuredCS.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border-b border-surface"
            >
              <div className="relative aspect-[16/9] w-full bg-bg-dark">
                <Image
                  src={featuredCS.screenshot}
                  alt={`${featuredCS.client} website homepage`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  priority
                />
              </div>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-bg-dark/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                {c.visitLiveSite}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>

            <div className="grid lg:grid-cols-2">
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.05] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                  {c.featuredCaseStudyLabel}
                </span>
                <span className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-muted">
                  {featuredCS.industry}
                </span>
                <h2 className="card-heading mt-3 gradient-text">
                  {featuredCS.headline}
                </h2>
                <h3 className="card-heading mt-2">{featuredCS.client}</h3>
                <p className="mt-1 text-sm text-muted">{featuredCS.title}</p>
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
                    <span key={s} className="rounded-full border border-strong bg-surface-raised px-3 py-1 text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <TextLink href={`/case-studies/${featuredCS.slug}`}>
                    {c.readFullCaseStudy}
                  </TextLink>
                  <a
                    href={featuredCS.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-neon-cyan"
                  >
                    {c.visitLiveSite}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="bg-bg-dark p-8 md:p-12 lg:p-14 border-t lg:border-t-0 lg:border-l border-surface">
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
                        <div className="relative h-2.5 w-full rounded-full bg-surface-glass overflow-hidden">
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
                <div className="mt-10 pt-6 border-t border-surface flex items-center justify-between text-sm">
                  <span className="text-muted">{c.timelineLabel}</span>
                  <span className="font-semibold">{featuredCS.timeline}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Case study grid */}
      <Section id="case-study-grid" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            badge={c.clientResultsLabel}
            title={c.clientResultsTitle}
            description={c.clientResultsDescription}
            headingId="case-study-grid-heading"
          />

          <div className="section-content flex flex-wrap gap-2">
            {c.industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`min-h-touch px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 touch-manipulation ${
                  activeIndustry === ind
                    ? "bg-neon-cyan text-bg-dark shadow-lg shadow-neon-cyan/20"
                    : "border border-strong text-muted hover:border-white/20 hover:text-white"
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
                  className={cardClasses({ surface: "elevated", className: "group flex flex-col !p-0 overflow-hidden" })}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] border-b border-surface bg-bg-dark"
                  >
                    <Image
                      src={cs.screenshotCard}
                      alt={`${cs.client} website`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </a>

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-block rounded-full border border-strong px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {cs.industry}
                      </span>
                      <span className="text-xs text-muted">{cs.timeline}</span>
                    </div>

                    <h3 className="type-subheader mt-5 gradient-text">{cs.headline}</h3>
                    <p className="mt-1 text-base font-semibold">{cs.client}</p>
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

                  <div className="grid grid-cols-2 border-t border-surface">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold text-neon-cyan group-hover:bg-neon-cyan/[0.03] transition-colors"
                    >
                      {c.viewCaseStudy}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border-l border-surface px-4 py-4 text-sm font-semibold text-muted transition-colors hover:bg-surface-base hover:text-white"
                    >
                      {c.visitLiveSite}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="section-cta-row text-muted">{c.noCaseStudiesMessage}</p>
          )}
        </div>
      </Section>

      <Section id="growth-patterns" variant="proof" surfaceIndex={surfaceIndex++}>
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
                className={cardClasses({ className: "text-center hover:border-neon-cyan/15 transition-colors duration-300" })}
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
      </Section>

      <CTAArchetype
        headline={c.ctaTitle}
        subtitle={c.ctaSubtitle}
        ctaLabel={c.ctaButton}
        ctaHref="/contact"
      />
    </>
  );
}
