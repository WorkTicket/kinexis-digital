"use client";

import { m as motion } from "@/lib/framer";
import { getComparisonIcon } from "@/lib/deliverable-icons";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import type { ComparisonProps } from "./shared";

export default function ProgressionComparison({ columns, rows }: ComparisonProps) {
  const { fadeUp, stagger } = useMotionVariants();
  const highlightIndex = columns.findIndex((col) => col.highlight);
  const bestForRow = rows.find((row) => row.label.toLowerCase().includes("best for"));
  const investmentRow = rows.find((row) =>
    ["starting investment", "monthly investment", "project cost"].some((key) =>
      row.label.toLowerCase().includes(key)
    )
  );
  const featureRows = rows.filter((row) => row !== bestForRow && row !== investmentRow);

  return (
    <motion.div
      className="grid items-end gap-5 lg:grid-cols-3 lg:gap-6"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {columns.map((col, colIndex) => {
        const isHighlight = colIndex === highlightIndex;
        const isScale = colIndex === columns.length - 1 && colIndex !== highlightIndex;
        const Icon = isHighlight ? Check : undefined;

        return (
          <motion.article
            key={col.header}
            variants={fadeUp}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500",
              isHighlight
                ? "z-10 border-neon-cyan/25 bg-gradient-to-b from-neon-cyan/[0.1] via-bg-secondary/95 to-bg-dark shadow-[0_24px_80px_-24px_rgba(0,212,255,0.35)] lg:-translate-y-4 lg:scale-[1.03]"
                : isScale
                  ? "border-white/[0.1] bg-gradient-to-b from-white/[0.04] to-bg-dark"
                  : "border-white/[0.06] bg-bg-secondary/80"
            )}
          >
            {isHighlight && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-blue/70 via-neon-cyan to-neon-blue/70" />
            )}

            <div className={cn("px-6 pt-7 pb-5 md:px-8", isHighlight && "pt-8")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  {isHighlight ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-neon-cyan">
                      Recommended starting point
                    </span>
                  ) : colIndex === 0 ? (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                      Entry level
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neon-cyan/50">
                      Scale tier
                    </span>
                  )}
                  <h3
                    className={cn(
                      "mt-3 text-lg font-bold leading-snug md:text-xl",
                      isHighlight ? "text-white" : "text-white/70"
                    )}
                  >
                    {col.header}
                  </h3>
                </div>
              </div>

              {bestForRow && (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-white/60">Best for: </span>
                  {bestForRow.values[colIndex]}
                </p>
              )}
            </div>

            <ul className="flex-1 space-y-0 border-t border-white/[0.06] px-6 md:px-8">
              {featureRows.map((row) => {
                const RowIcon = getComparisonIcon(row.label);
                return (
                  <li
                    key={row.label}
                    className="flex gap-3 border-b border-white/[0.05] py-4 last:border-0"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                        isHighlight
                          ? "border-neon-cyan/20 bg-neon-cyan/10"
                          : "border-white/[0.08] bg-white/[0.03]"
                      )}
                    >
                      <RowIcon
                        className={cn("h-3.5 w-3.5", isHighlight ? "text-neon-cyan" : "text-white/40")}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                        {row.label}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-sm leading-relaxed",
                          isHighlight ? "font-medium text-white/90" : "text-muted"
                        )}
                      >
                        {row.values[colIndex]}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {investmentRow && (
              <div
                className={cn(
                  "mt-auto border-t px-6 py-5 md:px-8",
                  isHighlight
                    ? "border-neon-cyan/15 bg-neon-cyan/[0.06]"
                    : "border-white/[0.06] bg-black/20"
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                  {investmentRow.label}
                </p>
                <p
                  className={cn(
                    "mt-1.5 type-metric text-xl md:text-2xl",
                    isHighlight ? "gradient-text" : "text-white/55"
                  )}
                >
                  {investmentRow.values[colIndex]}
                </p>
              </div>
            )}

            {isHighlight && Icon && (
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-cyan/[0.08] blur-[50px]" aria-hidden />
            )}
          </motion.article>
        );
      })}
    </motion.div>
  );
}
