"use client";

import { m as motion } from "@/lib/framer";
import { Link } from "@/i18n/navigation";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import CardFamily from "@/components/ui/CardFamily";
import MetricCard from "@/components/ui/MetricCard";
import PhaseDot from "@/components/ui/PhaseDot";
import { ArrowRight, Check } from "lucide-react";
import { cardClasses } from "@/lib/card-styles";

const MOTION_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const MOTION_ITEM = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});
export type PillarDeliverable = { title: string; description: string };
export type PillarTimeline = { phase: string; duration: string; description: string };
export type PillarPricingTier = { name: string; range: string; description: string };
export type PillarResult = { metric: string; label: string };
export type InternalLinkGroup = { title: string; links: { href: string; label: string }[] };

export type ServicePillarContent = {
  overview: { title: string; paragraphs: string[] };
  deliverables: { title: string; subtitle: string; items: PillarDeliverable[] };
  timeline: { title: string; subtitle: string; phases: PillarTimeline[] };
  pricing: { title: string; subtitle: string; tiers: PillarPricingTier[]; note: string };
  results: { title: string; subtitle: string; metrics: PillarResult[] };
  internalLinks?: InternalLinkGroup[];
};

type ServicePillarSectionsProps = {
  content: ServicePillarContent;
  startSurfaceIndex?: number;
};

export default function ServicePillarSections({ content, startSurfaceIndex = 0 }: ServicePillarSectionsProps) {
  let surfaceIndex = startSurfaceIndex;

  return (
    <>
      <Section id="overview" surfaceIndex={surfaceIndex++}>
        <div className="container-site max-w-3xl">
          <SectionHeader title={content.overview.title} headingId="overview-heading" />
          <div className="mt-8 space-y-5 text-muted leading-relaxed">
            {content.overview.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="pillar-deliverables" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.deliverables.title} description={content.deliverables.subtitle} headingId="pillar-deliverables-heading" />

          <motion.div
            className="section-content relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.05] via-bg-secondary/90 to-bg-dark shadow-panel"
            {...MOTION_UP}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"
              aria-hidden
            />

            <div className="relative border-b border-surface px-6 py-5 md:px-10 md:py-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  Scope of work
                </span>
                <div className="flex items-center gap-2" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/50" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
              </div>
            </div>

            <ul className="relative grid gap-px bg-surface-hover md:grid-cols-2">
              {content.deliverables.items.map((item, i) => (
                <motion.li
                  key={item.title}
                  className="flex gap-4 bg-bg-secondary/90 px-6 py-6 md:px-8 md:py-7"
                  {...MOTION_ITEM(i * 0.06)}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.1]">
                    <Check className="h-2.5 w-2.5 text-neon-cyan" strokeWidth={2.5} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section id="timeline" variant="data" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.timeline.title} description={content.timeline.subtitle} headingId="timeline-heading" />
          <div className="section-content relative mx-auto max-w-3xl">
            {/* Vertical timeline track */}
            <div
              className="pointer-events-none absolute left-[0.625rem] top-3 bottom-3 w-px bg-gradient-to-b from-neon-cyan/30 via-white/[0.08] to-transparent hidden lg:block"
              aria-hidden
            />
            <div className="space-y-4 lg:space-y-0">
              {content.timeline.phases.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  className="group relative lg:pl-9 lg:pb-8 last:lg:pb-0"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-0 top-[1.75rem] items-center justify-center">
                    <PhaseDot
                      active
                      className="transition-shadow duration-premium group-hover:shadow-glow-sm"
                    />
                  </div>

                  {/* Card */}
                  <div className={cardClasses({ surface: "elevated", hover: false, className: "p-6 md:p-8 transition-all duration-500 group-hover:border-strong group-hover:bg-surface-raised" })}>
                    {/* Timing badge */}
                    <h3 className="inline-block rounded-lg border border-strong bg-surface-glass px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neon-cyan/65 mb-4">
                      {phase.phase}
                    </h3>
                    <span className="text-lg font-bold md:text-xl">{phase.duration}</span>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="pricing" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.pricing.title} description={content.pricing.subtitle} headingId="pricing-heading" />
          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {content.pricing.tiers.map((tier) => (
              <CardFamily key={tier.name} family="dashboard">
                <h3 className="font-bold">{tier.name}</h3>
                <p className="mt-2 type-metric">{tier.range}</p>
                <p className="mt-3 text-sm text-muted">{tier.description}</p>
              </CardFamily>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted text-center max-w-2xl mx-auto">{content.pricing.note}</p>
        </div>
      </Section>

      <Section id="results" variant="proof" surfaceIndex={surfaceIndex++}>
        <div className="container-site">
          <SectionHeader title={content.results.title} description={content.results.subtitle} headingId="results-heading" />
          <div className="section-content grid gap-grid-sm md:grid-cols-3">
            {content.results.metrics.map((r) => (
              <MetricCard key={r.label} value={r.metric} label={r.label} />
            ))}
          </div>
        </div>
      </Section>

      {content.internalLinks && content.internalLinks.length > 0 && (
        <Section id="internal-links" surfaceIndex={surfaceIndex++}>
          <div className="container-site">
            <div className="grid gap-grid-lg md:grid-cols-2 lg:grid-cols-3">
              {content.internalLinks.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neon-cyan mb-4">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-muted hover:text-white transition-colors inline-flex items-center gap-1 group">
                          {link.label}
                          <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
