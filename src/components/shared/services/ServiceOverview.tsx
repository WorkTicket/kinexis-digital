"use client";

import type { ReactNode } from "react";
import { m as motion } from "@/lib/framer";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ServiceOverviewData } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = ServiceOverviewData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

export default function ServiceOverview({
  headline,
  problem,
  solution,
  problemPoints,
  solutionPoints,
  surfaceIndex,
  visualization,
}: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  return (
    <Section id="overview" variant="dark" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <div className="service-overview-intro grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:gap-12 xl:gap-16">
          <SectionHeader pattern="B" title={headline} subtitle={problem} />
          {visualization ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="service-overview-viz mx-auto w-full max-w-[360px] lg:mx-0 lg:justify-self-end"
            >
              <div className="hero__viz-inner hero__viz-inner--service-page hero__viz-inner--overview">
                <div className="hero__viz-content">{visualization}</div>
              </div>
            </motion.div>
          ) : null}
        </div>

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
