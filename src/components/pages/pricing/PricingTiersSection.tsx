"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { PricingPageContent } from "@/content/pricing/pricing-pages";

type Props = {
  tiers: PricingPageContent["tiers"];
  section: NonNullable<PricingPageContent["tiersSection"]>;
  surfaceIndex: number;
};

export default function PricingTiersSection({ tiers, section, surfaceIndex }: Props) {
  const { fadeUp, stagger } = useMotionVariants();
  const recommendedIndex = tiers.length - 1;

  return (
    <Section id="pricing-tiers" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="C" title={section.title} subtitle={section.subtitle} />

        <motion.div
          className="section-content grid gap-grid-sm md:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {tiers.map((tier, index) => {
            const isRecommended = index === recommendedIndex;

            return (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-500",
                  isRecommended
                    ? "border-neon-cyan/20 bg-gradient-to-br from-neon-cyan/[0.08] via-white/[0.03] to-bg-dark shadow-glow-sm"
                    : "border-white/[0.06] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]",
                )}
              >
                {isRecommended && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-neon-blue/60 to-neon-cyan/80" />
                    <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-neon-cyan/70">
                      Recommended
                    </span>
                  </>
                )}

                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="mt-3 type-metric text-neon-cyan">{tier.range}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{tier.description}</p>
                <p className="mt-5 border-t border-white/[0.06] pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-neon-cyan/70">
                  Best for
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{tier.bestFor}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {section.note && (
          <p className="section-content mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            {section.note}
          </p>
        )}
      </div>
    </Section>
  );
}
