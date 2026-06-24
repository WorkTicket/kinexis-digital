"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { m as motion } from "@/lib/framer";
import { ArrowRight, Quote } from "lucide-react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import ProofMetric from "@/components/ui/ProofMetric";
import type { ProofData, ResultMetric } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = ProofData & {
  metrics?: ResultMetric[];
  surfaceIndex: number;
};

export default function ProofSection({
  title = "Proof it works",
  subtitle = "Trust signals from real client work, not vanity metrics.",
  caseStudy,
  testimonial,
  logos,
  beforeAfter,
  metrics,
  surfaceIndex,
}: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  const hasContent = metrics?.length || caseStudy || testimonial || logos?.length || beforeAfter;
  if (!hasContent) return null;

  return (
    <Section id="proof" variant="data" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="C" title={title} subtitle={subtitle} />

        <motion.div className="section-content space-y-10" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {/* Hierarchy 1: Results metrics */}
          {metrics && metrics.length > 0 && (
            <motion.div variants={fadeUp} className="grid gap-grid-sm md:grid-cols-3">
              {metrics.map((r) => (
                <div key={r.label} className="proof-metric-card">
                  <ProofMetric value={r.metric} label={r.label} />
                </div>
              ))}
            </motion.div>
          )}

          {/* Hierarchy 2: Case study */}
          {caseStudy && (
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-cyan/70">Case Study</span>
              <h3 className="mt-3 text-xl font-bold">{caseStudy.client}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{caseStudy.challenge}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/90">{caseStudy.outcome}</p>
              {caseStudy.href && (
                <Link href={caseStudy.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:text-white transition-colors">
                  Read the full case study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>
          )}

          {/* Hierarchy 3: Testimonial */}
          {testimonial && (
            <motion.blockquote variants={fadeUp} className="relative rounded-2xl border border-white/[0.06] bg-bg-dark p-8 md:p-10">
              <Quote className="absolute right-8 top-8 h-8 w-8 text-neon-cyan/20" aria-hidden />
              <p className="text-lg leading-relaxed md:text-xl">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-6">
                <cite className="not-italic font-semibold">{testimonial.name}</cite>
                <span className="block text-sm text-muted">{testimonial.title}</span>
              </footer>
            </motion.blockquote>
          )}

          {/* Hierarchy 4: Logos */}
          {logos && logos.length > 0 && (
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70">
              {logos.map((logo) => (
                <div key={logo.alt} className="relative h-8 w-24 md:h-10 md:w-32">
                  <Image src={logo.src} alt={logo.alt} fill className="object-contain object-center grayscale" />
                </div>
              ))}
            </motion.div>
          )}

          {/* Before/after visual */}
          {beforeAfter && (
            <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400">{beforeAfter.beforeLabel}</span>
                <p className="mt-2 type-metric text-red-300">{beforeAfter.beforeValue}</p>
                <p className="mt-1 text-sm text-muted">{beforeAfter.metric}</p>
              </div>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 text-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">{beforeAfter.afterLabel}</span>
                <p className="mt-2 type-metric text-emerald-300">{beforeAfter.afterValue}</p>
                <p className="mt-1 text-sm text-muted">{beforeAfter.metric}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
