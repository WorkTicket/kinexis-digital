import Reveal from "@/components/ui/Reveal";
import { getComparisonIcon } from "@/lib/deliverable-icons";
import { Check } from "lucide-react";
import type { ComparisonProps } from "./shared";
import { findRow, footerRows, getColumnIndices } from "./shared";
import { cardClasses } from "@/lib/card-styles";

export default function ImpactComparison({ columns, rows }: ComparisonProps) {
  const { highlightIndex, altIndex } = getColumnIndices(columns);
  const altCol = columns[altIndex];
  const kinexisCol = columns[highlightIndex];

  const heroRow =
    findRow(rows, "typical", "cpl", "cost per", "conversion lift", "roas", "reduction") ??
    footerRows(rows)[0];
  const detailRows = rows.filter((row) => row !== heroRow);

  return (
    <div className="space-y-8">
      {heroRow && (
        <Reveal className="grid gap-4 md:grid-cols-2">
          <div className={cardClasses({ hover: false, className: "!bg-bg-secondary/50 !p-6 md:!p-8" })}>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
              {altCol.header}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/40">
              {heroRow.label}
            </p>
            <p className="mt-3 type-metric text-2xl text-white/45 md:text-3xl">
              {heroRow.values[altIndex]}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-neon-cyan/20 bg-gradient-to-br from-neon-cyan/[0.1] to-bg-dark p-6 md:p-8">
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-neon-blue/60 to-neon-cyan/80" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neon-cyan/70">
              {kinexisCol.header}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-neon-cyan/50">
              {heroRow.label}
            </p>
            <p className="mt-3 type-metric text-2xl gradient-text md:text-3xl">
              {heroRow.values[highlightIndex]}
            </p>
          </div>
        </Reveal>
      )}

      <Reveal stagger className="space-y-2">
        {detailRows.map((row) => {
          const Icon = getComparisonIcon(row.label);
          return (
            <div
              key={row.label}
              className="grid overflow-hidden rounded-xl border border-surface bg-surface-base md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div className="flex items-center gap-3 border-b border-surface px-5 py-4 md:border-b-0 md:border-r">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/15 bg-neon-cyan/10">
                  <Icon className="h-3.5 w-3.5 text-neon-cyan" aria-hidden />
                </div>
                <span className="text-sm font-semibold text-white/75">{row.label}</span>
              </div>
              <div className="border-b border-surface px-5 py-4 text-sm text-muted md:border-b-0 md:border-r">
                {row.values[altIndex]}
              </div>
              <div className="flex items-start gap-2 bg-neon-cyan/[0.04] px-5 py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan/70" aria-hidden />
                <span className="text-sm font-medium text-white/90">{row.values[highlightIndex]}</span>
              </div>
            </div>
          );
        })}
      </Reveal>
    </div>
  );
}
