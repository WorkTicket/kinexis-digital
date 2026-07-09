import { Link } from "@/i18n/navigation";
import Reveal from "@/components/ui/Reveal";
import { getComparisonIcon } from "@/lib/deliverable-icons";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import type { ComparisonProps } from "./shared";
function isPositiveValue(val: string): boolean {
  const lower = val.toLowerCase().trim();
  if (["yes", "sí", "included", "incluido", "true"].includes(lower)) return true;
  if (lower.startsWith("yes")) return true;
  if (lower.startsWith("sí")) return true;
  return false;
}

function isNegativeValue(val: string): boolean {
  const lower = val.toLowerCase().trim();
  if (["no", "—", "-", "n/a", "none", "ninguno"].includes(lower)) return true;
  return false;
}

export default function ProgressionComparison({ columns, rows }: ComparisonProps) {
  const highlightIndex = columns.findIndex((col) => col.highlight);
  const bestForRow = rows.find((row) => row.label.toLowerCase().includes("best for"));
  const investmentRow = rows.find((row) =>
    ["starting investment", "monthly investment", "project cost", "inversión"].some((key) =>
      row.label.toLowerCase().includes(key)
    )
  );
  const featureRows = rows.filter((row) => row !== bestForRow && row !== investmentRow);

  return (
    <Reveal stagger className="grid items-stretch gap-5 sm:grid-cols-3 sm:gap-5 lg:gap-6">
      {columns.map((col, colIndex) => {
        const isHighlight = colIndex === highlightIndex;
        const isStarter = colIndex === 0;
        const isScale = colIndex === columns.length - 1 && colIndex !== highlightIndex;
        const investmentVal = investmentRow?.values[colIndex] ?? "";
        const bestForVal = bestForRow?.values[colIndex] ?? "";

        return (
          <article
            key={col.header}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500",
              isHighlight
                ? "z-10 border-neon-cyan/25 bg-gradient-to-b from-neon-cyan/[0.1] via-bg-secondary/95 to-bg-dark shadow-[0_24px_80px_-24px_rgba(0,212,255,0.35)] lg:-translate-y-4 lg:scale-[1.03]"
                : isScale
                  ? "border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-bg-dark"
                  : "border-white/[0.06] bg-bg-secondary/80"
            )}
          >
            {isHighlight && (
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-neon-blue/80 via-neon-cyan to-neon-blue/80" />
            )}

            {/* Header */}
            <div className={cn("px-6 pt-7 pb-5 md:px-8", isHighlight && "pt-9")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  {isHighlight ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-neon-cyan">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      Most Popular
                    </span>
                  ) : isStarter ? (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
                      Entry Level
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neon-cyan/45">
                      Enterprise
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

              {/* Price */}
              {investmentVal && (
                <p
                  className={cn(
                    "mt-4 type-metric text-2xl md:text-3xl",
                    isHighlight ? "gradient-text" : "text-white/65"
                  )}
                >
                  {investmentVal}
                </p>
              )}

              {bestForVal && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-white/55">Best for: </span>
                  {bestForVal}
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="flex-1 space-y-0 border-t border-white/[0.06] px-6 md:px-8">
              {featureRows.map((row) => {
                const RowIcon = getComparisonIcon(row.label);
                const val = row.values[colIndex];
                const positive = isPositiveValue(val);
                const negative = isNegativeValue(val);

                return (
                  <li
                    key={row.label}
                    className="flex gap-3 border-b border-white/[0.04] py-4 last:border-0"
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                        isHighlight
                          ? "border-neon-cyan/20 bg-neon-cyan/10"
                          : "border-white/[0.06] bg-white/[0.02]"
                      )}
                    >
                      {positive ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
                      ) : negative ? (
                        <span className="text-xs text-white/20">—</span>
                      ) : (
                        <RowIcon
                          className={cn("h-3.5 w-3.5", isHighlight ? "text-neon-cyan" : "text-white/35")}
                          aria-hidden
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                        {row.label}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-sm leading-relaxed",
                          isHighlight ? "font-medium text-white/90" : "text-white/55"
                        )}
                      >
                        {val}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <div
              className={cn(
                "mt-auto border-t px-6 py-5 md:px-8",
                isHighlight
                  ? "border-neon-cyan/15 bg-neon-cyan/[0.06]"
                  : "border-white/[0.04] bg-black/15"
              )}
            >
              <Link
                href="/contact"
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200",
                  isHighlight
                    ? "bg-neon-cyan text-bg-dark hover:bg-white shadow-lg shadow-neon-cyan/25"
                    : "border border-white/[0.1] bg-white/[0.04] text-white/70 hover:border-neon-cyan/25 hover:bg-neon-cyan/10 hover:text-white"
                )}
                style={{ borderRadius: "var(--btn-radius)" }}
              >
                {isHighlight ? "Get a Custom Quote" : "Contact Us"}
              </Link>
            </div>

            {isHighlight && (
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-neon-cyan/[0.08] blur-[50px]" aria-hidden />
            )}
          </article>
        );
      })}
    </Reveal>
  );
}
