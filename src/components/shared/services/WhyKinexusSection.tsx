"use client";

import type { ReactNode } from "react";
import { m as motion } from "@/lib/framer";
import Section from "@/components/shared/services/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionIntroWithVisualization from "@/components/shared/services/SectionIntroWithVisualization";
import type { WhyKinexusData } from "@/content/services/architecture/types";
import { useMotionVariants } from "@/hooks/useMotionVariants";

type Props = WhyKinexusData & {
  surfaceIndex: number;
  visualization?: ReactNode;
};

export default function WhyKinexusSection({ headline, points, surfaceIndex, visualization }: Props) {
  const { fadeUp, stagger } = useMotionVariants();

  // Problem-framed sections ("Why Most X Fails...") use red issue labels.
  // Positive-framed sections ("The Kinexus Framework...") drop the label so the copy isn't contradicted.
  const isProblemFramed = /^why\b/i.test(headline.trim());
  const subtitle = isProblemFramed
    ? "What most agencies get wrong — and how we approach it differently."
    : "How we approach this work, and why it produces results most agencies don't.";

  return (
    <Section id="why-kinexus" variant="editorial" surfaceIndex={surfaceIndex}>
      <div className="container-site" style={{ maxWidth: "var(--container-max)", paddingInline: "var(--inner-padding)" }}>
        <SectionIntroWithVisualization
          header={
            <SectionHeader
              pattern="B"
              title={headline}
              subtitle={subtitle}
            />
          }
          visualization={visualization}
        />

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-2"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-2xl border p-6 pl-8 transition-all duration-200 md:p-8 md:pl-10 ${
                isProblemFramed
                  ? "border-white/[0.07] bg-white/[0.025] hover:border-red-500/20 hover:bg-white/[0.04]"
                  : "border-white/[0.07] bg-white/[0.025] hover:border-neon-cyan/20 hover:bg-white/[0.04]"
              }`}
            >
              {/* Left accent bar — red for problems, cyan for strengths */}
              <div
                className={`absolute inset-y-0 left-0 w-[3px] rounded-l-2xl bg-gradient-to-b ${
                  isProblemFramed
                    ? "from-red-500/70 via-red-500/30 to-transparent"
                    : "from-neon-cyan/50 via-neon-cyan/20 to-transparent"
                }`}
                aria-hidden
              />
              {/* Faded background numeral */}
              <span
                className="pointer-events-none absolute right-3 top-1 select-none font-black tabular-nums text-white/[0.04]"
                style={{ fontSize: "5.5rem", lineHeight: 1 }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                {isProblemFramed && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-red-400/70">
                    Issue {String(i + 1).padStart(2, "0")}
                  </p>
                )}
                <h3 className="mb-2 font-bold leading-snug" style={{ fontSize: "var(--text-h3)" }}>
                  {point.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted md:text-base">{point.description}</p>
              </div>
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  isProblemFramed
                    ? "from-red-500/40 via-red-500/10 to-transparent"
                    : "from-neon-cyan/30 via-neon-cyan/10 to-transparent"
                }`}
                aria-hidden
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
