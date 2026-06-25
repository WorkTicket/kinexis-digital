"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { ComparisonProps } from "./shared";
import { getColumnIndices } from "./shared";

export default function LedgerComparison({ columns, rows }: ComparisonProps) {
  const { fadeUp, stagger } = useMotionVariants();
  const { highlightIndex, altIndex } = getColumnIndices(columns);
  const altCol = columns[altIndex];
  const kinexisCol = columns[highlightIndex];

  return (
    <div className="overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.04] via-bg-secondary/90 to-bg-dark shadow-panel">
      <div className="grid border-b border-white/[0.06] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex items-end border-b border-white/[0.06] bg-bg-dark px-6 py-5 md:border-b-0 md:border-r">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Compared</p>
        </div>
        <div className="border-b border-white/[0.06] bg-bg-dark px-6 py-5 md:border-b-0 md:border-r">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">{altCol.header}</p>
        </div>
        <div className="relative bg-neon-cyan/[0.06] px-6 py-5">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-neon-blue/60 to-neon-cyan/80" />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neon-cyan/70">
            {kinexisCol.header}
          </p>
        </div>
      </div>

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            variants={fadeUp}
            className={cn(
              "grid border-b border-white/[0.06] last:border-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]",
              i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
            )}
          >
            <div className="border-b border-white/[0.06] px-6 py-5 md:border-b-0 md:border-r">
              <p className="text-sm font-semibold text-white/80">{row.label}</p>
            </div>
            <div className="flex items-start gap-2.5 border-b border-white/[0.06] px-6 py-5 md:border-b-0 md:border-r">
              <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/25" aria-hidden />
              <p className="text-sm leading-relaxed text-muted">{row.values[altIndex]}</p>
            </div>
            <div className="flex items-start gap-2.5 bg-neon-cyan/[0.03] px-6 py-5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan/80" aria-hidden />
              <p className="text-sm font-medium leading-relaxed text-white/90">{row.values[highlightIndex]}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
