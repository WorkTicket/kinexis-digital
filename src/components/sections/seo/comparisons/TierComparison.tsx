"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { ComparisonProps } from "./shared";

/** Pricing / plan feature matrix — not used on service pages. */
export default function TierComparison({ columns, rows }: ComparisonProps) {
  const { fadeUp, stagger } = useMotionVariants();
  const highlightIndex = columns.findIndex((col) => col.highlight);
  const colCount = columns.length;
  const gridTemplateColumns = `minmax(140px, 1.2fr) repeat(${colCount}, minmax(0, 1fr))`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-surface bg-gradient-to-br from-white/[0.05] via-bg-secondary/90 to-bg-dark shadow-panel">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"
        aria-hidden
      />

      <div
        className="grid gap-px border-b border-surface bg-surface-hover"
        style={{ gridTemplateColumns }}
      >
        <div className="flex items-end border-r border-surface bg-bg-dark px-6 py-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Included</span>
        </div>
        {columns.map((col) => (
          <div
            key={col.header}
            className={cn(
              "relative flex flex-col items-center justify-center px-6 py-6 text-center",
              col.highlight ? "bg-neon-cyan/[0.07]" : "bg-bg-dark"
            )}
          >
            {col.highlight && (
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-neon-blue/60 to-neon-cyan/80" />
            )}
            {col.highlight && (
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-neon-cyan/70">
                Recommended
              </p>
            )}
            <p
              className={cn(
                "text-sm font-bold uppercase tracking-wider",
                col.highlight ? "text-neon-cyan" : "text-white/55"
              )}
            >
              {col.header}
            </p>
          </div>
        ))}
      </div>

      <motion.div
        className="divide-y divide-surface"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {rows.map((row) => (
          <motion.div
            key={row.label}
            variants={fadeUp}
            className="grid"
            style={{ gridTemplateColumns }}
          >
            <div className="flex items-center border-r border-surface bg-bg px-6 py-5">
              <span className="text-sm font-semibold text-white/75">{row.label}</span>
            </div>
            {row.values.slice(0, colCount).map((value, colIndex) => {
              const col = columns[colIndex];
              const isHighlight = col?.highlight ?? colIndex === highlightIndex;
              return (
                <div
                  key={`${row.label}-${colIndex}`}
                  className={cn(
                    "flex items-center justify-center px-6 py-5 text-center",
                    isHighlight ? "bg-neon-cyan/[0.04]" : "bg-bg"
                  )}
                >
                  {isHighlight ? (
                    <Check className="mr-2 h-4 w-4 shrink-0 text-neon-cyan/70" aria-hidden />
                  ) : null}
                  <span
                    className={cn(
                      "text-sm leading-relaxed",
                      isHighlight ? "font-medium text-white/90" : "text-muted"
                    )}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
