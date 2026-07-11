import Reveal from "@/components/ui/Reveal";
import { getComparisonIcon } from "@/lib/deliverable-icons";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import type { ComparisonProps } from "./shared";
import { getColumnIndices } from "./shared";

export default function ContrastComparison({ columns, rows }: ComparisonProps) {
  const { highlightIndex, altIndex } = getColumnIndices(columns);

  return (
    <Reveal stagger className="grid gap-6 lg:grid-cols-2">
      {[altIndex, highlightIndex].map((colIndex) => {
        const col = columns[colIndex];
        const isKinexis = colIndex === highlightIndex;

        return (
          <div
            key={col.header}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-3xl border p-7 md:p-9",
              isKinexis
                ? "border-neon-cyan/20 bg-gradient-to-br from-neon-cyan/[0.08] via-bg-secondary/90 to-bg-dark shadow-[0_20px_60px_-30px_rgba(0,212,255,0.4)]"
                : "border-surface bg-bg-secondary/60"
            )}
          >
            {isKinexis && (
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-neon-blue/60 to-neon-cyan/80" />
            )}

            <div className="mb-8">
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.18em]",
                  isKinexis ? "text-neon-cyan/70" : "text-white/35"
                )}
              >
                {isKinexis ? "Recommended approach" : "Typical alternative"}
              </span>
              <h3
                className={cn(
                  "type-metric-md mt-2",
                  isKinexis ? "gradient-text" : "text-white/40"
                )}
              >
                {col.header}
              </h3>
            </div>

            <ul className="flex-1 space-y-5">
              {rows.map((row) => {
                const Icon = getComparisonIcon(row.label);
                return (
                  <li key={row.label} className="flex gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                        isKinexis
                          ? "border-neon-cyan/20 bg-neon-cyan/10"
                          : "border-strong bg-surface-raised"
                      )}
                    >
                      <Icon
                        className={cn("h-4 w-4", isKinexis ? "text-neon-cyan" : "text-white/35")}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {row.label}
                      </p>
                      <div className="mt-1.5 flex items-start gap-2">
                        {isKinexis ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" aria-hidden />
                        ) : (
                          <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/25" aria-hidden />
                        )}
                        <p
                          className={cn(
                            "text-sm leading-relaxed md:text-base",
                            isKinexis ? "font-medium text-white" : "text-white/45"
                          )}
                        >
                          {row.values[colIndex]}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </Reveal>
  );
}
