"use client";

import { useLocale } from "next-intl";
import { m as motion } from "@/lib/framer";
import CaseStudyResultsMetrics from "@/components/case-studies/CaseStudyResultsMetrics";
import FAQSection from "@/components/sections/FAQSection";
import StaticHeroShell from "@/components/ui/StaticHeroShell";
import CTAArchetype from "@/components/ui/CTAArchetype";
import MetricCard from "@/components/ui/MetricCard";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import type { CaseStudyDetail } from "@/content/case-study-details";
import type { CaseStudySlugMeta } from "@/content/case-study-slug-meta";
import { uiChrome } from "@/content/ui-chrome";
import Section from "@/components/shared/services/Section";
import { cardClasses } from "@/lib/card-styles";
import type { BreadcrumbItem } from "@/lib/schema";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { Locale } from "@/i18n/routing";

type Props = {
  cs: CaseStudyDetail;
  meta: CaseStudySlugMeta;
  breadcrumbs: BreadcrumbItem[];
};

function FlowPills({ steps, align = "center" }: { steps: string[]; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "flex flex-wrap items-center justify-center gap-2" : "flex flex-wrap gap-2"}>
      {steps.map((step, i) => (
        <span key={step} className="inline-flex items-center gap-2">
          <span className="rounded-full border border-strong bg-surface-raised px-3.5 py-1.5 text-xs font-semibold text-muted">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-muted/40 text-xs" aria-hidden>
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

function ProgressionChart({ meta }: { meta: CaseStudySlugMeta }) {
  const max = Math.max(...meta.progressionPoints.map((p) => p.value));

  return (
    <div className={cardClasses({ surface: "elevated", hover: false, className: "!p-6 md:!p-8" })}>
      <div className="space-y-6">
        {meta.progressionPoints.map((pt) => {
          const pct = (pt.value / max) * 100;
          const val = meta.progressionPrefix
            ? `${meta.progressionPrefix}${pt.value.toLocaleString()}`
            : `${pt.value.toLocaleString()}${meta.progressionSuffix ?? ""}`;

          return (
            <div key={pt.label}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{pt.label}</span>
                <span className="text-sm font-bold tabular-nums text-neon-cyan">{val}</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-surface-glass">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CaseStudyDetailPageClient({ cs, meta, breadcrumbs }: Props) {
  const locale = useLocale() as Locale;
  const copy = uiChrome[locale].caseStudy;
  const { fadeUp, stagger } = useMotionVariants();
  let surfaceIndex = 0;

  const overviewMeta = [
    { label: copy.meta.industry, value: cs.industry },
    { label: copy.meta.client, value: cs.client },
    { label: copy.meta.engagement, value: meta.timeline },
    {
      label: copy.meta.primaryGoal,
      value: cs.strategyPhases[0]?.objective ?? copy.meta.growthFallback,
    },
    {
      label: copy.meta.services,
      value:
        cs.strategyPhases.length > 0
          ? copy.meta.phases(cs.strategyPhases.length)
          : copy.meta.fullStack,
    },
    { label: copy.meta.results, value: copy.meta.kpisTracked(cs.resultsList.length) },
  ];

  const strategyPhases = cs.strategyPhases.map((phase) => ({
    title: phase.objective,
    desc: phase.actions,
    metric: phase.outcome,
  }));

  return (
    <article>
      <StaticHeroShell
        variant="article"
        label={cs.industry}
        headline={cs.headline}
        subtitle={`${cs.title} · ${cs.client} · ${meta.timeline}`}
        ctaLabel={cs.heroCtaLabel}
        ctaHref="/contact"
        breadcrumbs={breadcrumbs}
      />

      <Section id="results-metrics" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <CaseStudyResultsMetrics results={cs.resultsList} />
        </div>
      </Section>

      <Section id="overview-meta" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <motion.div
            className={cardClasses({ surface: "elevated", hover: false, className: "!p-6 md:!p-8" })}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <dl className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {overviewMeta.map((cell) => (
                <div key={cell.label}>
                  <dt className="text-[10.5px] font-mono uppercase tracking-wider text-muted">{cell.label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{cell.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Section>

      <Section id="overview" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader
            badge={copy.overviewBadge}
            title={copy.overviewTitle}
            align="left"
            headingId="overview-heading"
          />
          <motion.div
            className="section-content space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p variants={fadeUp} className="section-intro section-intro--left">
              {cs.challenge}
            </motion.p>
            <motion.p variants={fadeUp} className="section-intro section-intro--left">
              {cs.results}
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {cs.problems.length > 0 && (
        <Section id="kickoff-problems" surfaceIndex={surfaceIndex++}>
          <div className="container-site">
            <SectionHeader
              badge={cs.beforeHeading}
              title={copy.kickoffTitle}
              align="left"
              headingId="kickoff-problems-heading"
            />
            <motion.div
              className="section-content grid gap-grid-sm sm:grid-cols-2 xl:grid-cols-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {cs.problems.map((group) => (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  className={cardClasses({ surface: "elevated", hover: false, className: "!p-6 md:!p-8" })}
                >
                  <h3 className="text-lg font-bold text-neon-cyan">{group.category}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-0.5 shrink-0 text-neon-cyan/60">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>
      )}

      {cs.strategyPhases.length > 0 && (
        <Section id="strategy-phases" surfaceIndex={surfaceIndex++}>
          <div className="container-site">
            <SectionHeader
              badge={cs.strategyHeading}
              title={copy.strategyTitle}
              align="left"
              headingId="strategy-phases-heading"
            />
            <motion.div
              className="section-content space-y-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="flex justify-center">
                <FlowPills steps={meta.flowSteps} />
              </div>
              <ServicePhaseList phases={strategyPhases} />
            </motion.div>
          </div>
        </Section>
      )}

      <Section id="growth-results" variant="proof" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader
            badge={cs.resultsHeading}
            title={copy.growthTitle(meta.progressionLabel)}
            align="center"
          />
          <div className="section-content mx-auto max-w-3xl space-y-8">
            <ProgressionChart meta={meta} />
            <CaseStudyResultsMetrics results={cs.resultsList} className="mx-auto max-w-2xl" />
          </div>
        </div>
      </Section>

      <Section id="deliverables" variant="proof" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
            <div>
              <SectionHeader badge={copy.deliverablesBadge} title={copy.deliverablesTitle} align="left" />
              <motion.div
                className="section-content grid grid-cols-2 gap-grid-sm sm:grid-cols-3"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {meta.deliverables.map((d) => (
                  <motion.div key={d.label} variants={fadeUp}>
                    <MetricCard value={d.count} label={d.label} labelVariant="stat" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div>
              <SectionHeader badge={copy.toolsBadge} title={cs.techStackHeading} align="left" />
              <motion.div
                className="section-content flex flex-wrap gap-2"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {cs.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-strong bg-surface-raised px-3.5 py-1.5 text-xs font-medium text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="key-takeaways" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-4xl mx-auto">
          <SectionHeader
            badge={copy.takeawaysBadge}
            title={copy.takeawaysTitle}
            align="center"
            headingId="key-takeaways-heading"
          />
          <motion.div
            className="section-content flex justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <FlowPills steps={meta.takeawaySteps} />
          </motion.div>
        </div>
      </Section>

      <FAQSection
        label={copy.faqLabel}
        title={copy.faqTitle}
        items={meta.faq.map((item) => ({ question: item.q, answer: item.a }))}
        surfaceIndex={surfaceIndex++}
      />

      <CTAArchetype
        headline={cs.ctaHeadline}
        subtitle={cs.ctaSubtitle}
        ctaLabel={cs.ctaLabel}
        ctaHref="/contact"
      />
    </article>
  );
}
