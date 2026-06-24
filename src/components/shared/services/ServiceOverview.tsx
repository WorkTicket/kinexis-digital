"use client";

import { m as motion } from "@/lib/framer";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ServiceOverviewData } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = ServiceOverviewData & { surfaceIndex: number };

export default function ServiceOverview({ headline, problem, solution, problemPoints, solutionPoints, surfaceIndex }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <Section id="overview" variant="dark" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionHeader pattern="B" title={headline} subtitle={problem} />
        <motion.ul
          className="section-content mx-auto mt-10 max-w-3xl space-y-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {problemPoints.map((point) => (
            <motion.li key={point} variants={fadeUp} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80" aria-hidden />
              {point}
            </motion.li>
          ))}
        </motion.ul>

        <div className="section-content mx-auto mt-16 max-w-3xl rounded-2xl border border-neon-cyan/15 bg-neon-cyan/[0.04] p-8 md:p-10">
          <h3 id="overview-solution-heading" className="text-xl font-bold md:text-2xl" style={{ fontSize: "var(--text-h3)" }}>
            {solution}
          </h3>
          <motion.ul
            className="mt-6 space-y-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {solutionPoints.map((point) => (
              <motion.li key={point} variants={fadeUp} className="flex gap-3 text-sm leading-relaxed text-muted md:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" aria-hidden />
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  );
}
