"use client";

import { m as motion } from "@/lib/framer";
import { getComparisonIcon } from "@/lib/deliverable-icons";
import { Check } from "lucide-react";
import { cardClasses } from "@/lib/card-styles";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { ComparisonProps } from "./shared";
import { getColumnIndices } from "./shared";

export default function StackedComparison({ columns, rows }: ComparisonProps) {
  const { fadeUp, stagger } = useMotionVariants();
  const { highlightIndex, altIndex } = getColumnIndices(columns);
  const altCol = columns[altIndex];
  const kinexisCol = columns[highlightIndex];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-strong bg-surface-raised px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/45">
          {altCol.header}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">vs</span>
        <span className="rounded-full border border-neon-cyan/25 bg-neon-cyan/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-neon-cyan">
          {kinexisCol.header}
        </span>
      </div>

      <motion.div
        className="space-y-3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {rows.map((row) => {
          const Icon = getComparisonIcon(row.label);
          return (
            <motion.article
              key={row.label}
              variants={fadeUp}
              className={cardClasses({ surface: "elevated", className: "overflow-hidden hover:bg-surface-raised" })}
            >
              <div className="flex items-center gap-3 border-b border-surface px-5 py-4 md:px-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/15 bg-neon-cyan/10">
                  <Icon className="h-4 w-4 text-neon-cyan" aria-hidden />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white/80">{row.label}</h3>
              </div>
              <div className="grid md:grid-cols-2">
                <div className="border-b border-surface px-5 py-5 md:border-b-0 md:border-r md:px-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    {altCol.header}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">{row.values[altIndex]}</p>
                </div>
                <div className="relative bg-neon-cyan/[0.04] px-5 py-5 md:px-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neon-cyan/65">
                    {kinexisCol.header}
                  </p>
                  <div className="mt-2 flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-cyan/15">
                      <Check className="h-3 w-3 text-neon-cyan" aria-hidden />
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-white">
                      {row.values[highlightIndex]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
