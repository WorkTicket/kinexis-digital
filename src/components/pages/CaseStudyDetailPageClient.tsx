"use client";

import { m as motion } from "@/lib/framer";
import CaseStudyResultsMetrics from "@/components/case-studies/CaseStudyResultsMetrics";
import FAQSection from "@/components/sections/FAQSection";
import ArticleHeroShell from "@/components/shared/ArticleHeroShell";
import CTAArchetype from "@/components/ui/CTAArchetype";
import ProofMetric from "@/components/ui/ProofMetric";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicePhaseList from "@/components/ui/ServicePhaseList";
import type { CaseStudyDetail } from "@/content/case-study-details";
import type { CaseStudySlugMeta } from "@/content/case-study-slug-meta";
import { pageSectionClasses } from "@/lib/page-section-surface";
import type { BreadcrumbItem } from "@/lib/schema";
import { useMotionVariants } from "@/hooks/useMotionVariants";

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
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-muted">
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
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
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
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
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
  const { fadeUp, stagger } = useMotionVariants();
  let surfaceIndex = 0;

  const overviewMeta = [
    { label: "Industry", value: cs.industry },
    { label: "Client", value: cs.client },
    { label: "Engagement", value: meta.timeline },
    { label: "Primary Goal", value: cs.strategyPhases[0]?.objective ?? "Growth" },
    { label: "Services", value: cs.strategyPhases.length > 0 ? `${cs.strategyPhases.length} phases` : "Full-stack" },
    { label: "Results", value: `${cs.resultsList.length} KPIs tracked` },
  ];

  const strategyPhases = cs.strategyPhases.map((phase) => ({
    title: phase.objective,
    desc: phase.actions,
    metric: phase.outcome,
  }));

  return (
    <article>
      <ArticleHeroShell
        label={cs.industry}
        headline={cs.headline}
        subtitle={`${cs.title} · ${cs.client} · ${meta.timeline}`}
        ctaLabel={cs.heroCtaLabel}
        ctaHref="/contact"
        breadcrumbs={breadcrumbs}
      />

      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site">
          <CaseStudyResultsMetrics results={cs.resultsList} />
        </div>
      </section>

      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site">
          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
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
      </section>

      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site max-w-3xl">
          <SectionHeader
            badge="Overview"
            title="What happened, in three sentences"
            align="left"
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
      </section>

      {cs.problems.length > 0 && (
        <section className={pageSectionClasses(surfaceIndex++)}>
          <div className="container-site">
            <SectionHeader badge={cs.beforeHeading} title="Where things stood at kickoff" align="left" />
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
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
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
        </section>
      )}

      {cs.strategyPhases.length > 0 && (
        <section className={pageSectionClasses(surfaceIndex++)}>
          <div className="container-site">
            <SectionHeader badge={cs.strategyHeading} title="Five moves, run in sequence" align="left" />
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
        </section>
      )}

      <section className={pageSectionClasses(surfaceIndex++, { className: "section--data" })}>
        <div className="container-site">
          <SectionHeader
            badge={cs.resultsHeading}
            title={`${meta.progressionLabel} growth, month by month`}
            align="center"
          />
          <div className="section-content mx-auto max-w-3xl space-y-8">
            <ProgressionChart meta={meta} />
            <CaseStudyResultsMetrics results={cs.resultsList} className="mx-auto max-w-2xl" />
          </div>
        </div>
      </section>

      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
            <div>
              <SectionHeader badge="Deliverables" title="What was built" align="left" />
              <motion.div
                className="section-content grid grid-cols-2 gap-grid-sm sm:grid-cols-3"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {meta.deliverables.map((d) => (
                  <motion.div key={d.label} variants={fadeUp} className="proof-metric-card text-center">
                    <ProofMetric value={d.count} label={d.label} labelVariant="stat" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div>
              <SectionHeader badge="Tools & Platforms" title={cs.techStackHeading} align="left" />
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
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className={pageSectionClasses(surfaceIndex++)}>
        <div className="container-site max-w-4xl mx-auto">
          <SectionHeader badge="Key Takeaways" title="Why it compounded" align="center" />
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
      </section>

      <FAQSection
        label="FAQ"
        title="Common questions"
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
