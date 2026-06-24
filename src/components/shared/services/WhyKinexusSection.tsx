"use client";

import { m as motion } from "@/lib/framer";
import { BarChart3, Target, Sparkles, Shield } from "lucide-react";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import type { WhyKinexusData } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

const icons = [BarChart3, Target, Sparkles, Shield];

type Props = WhyKinexusData & { surfaceIndex: number };

export default function WhyKinexusSection({ headline, points, surfaceIndex }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <Section id="why-kinexus" variant="editorial" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="B" title={headline} subtitle="How we work, and why it is different from a typical agency retainer." />

        <motion.div
          className="relative mx-auto mt-16 max-w-4xl"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute left-7 top-0 hidden h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent max-md:hidden" aria-hidden />

          {points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div key={point.title} variants={fadeUp} className="group relative flex gap-8 pb-16 last:pb-0">
                <div className="relative z-10 hidden flex-col items-center max-md:hidden">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-bg transition-all duration-200 group-hover:border-neon-cyan/40 group-hover:shadow-lg group-hover:shadow-neon-cyan/10">
                    <Icon className="h-6 w-6 text-white/40 transition-colors duration-200 group-hover:text-neon-cyan" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3 md:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                      <Icon className="h-5 w-5 text-neon-cyan" />
                    </div>
                  </div>
                  <h3 className="font-bold" style={{ fontSize: "var(--text-h3)" }}>
                    {point.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
}
