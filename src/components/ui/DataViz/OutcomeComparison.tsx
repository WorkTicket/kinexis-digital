"use client";

import { m as motion } from "@/lib/framer";

type Props = {
  before: number;
  after: number;
  unit: string;
  beforeLabel?: string;
  afterLabel?: string;
  multiplierLabel?: string;
  duration?: string;
  className?: string;
};

function formatMetric(value: number, unit: string) {
  if (unit.includes("$")) {
    return value >= 10 || value % 1 !== 0 ? `${value}K` : `${value}K`;
  }
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function formatUnit(unit: string) {
  return unit.replace(/^\$/, "").trim();
}

export default function OutcomeComparison({
  before,
  after,
  unit,
  beforeLabel = "Before",
  afterLabel = "After",
  multiplierLabel,
  duration,
  className = "",
}: Props) {
  const max = after * 1.05;
  const beforePct = (before / max) * 100;
  const afterPct = (after / max) * 100;
  const unitLabel = formatUnit(unit);
  const computedMultiplier =
    multiplierLabel ??
    (after > before
      ? after / before >= 10
        ? `${Math.round(after / before)}X`
        : `${(after / before).toFixed(1).replace(/\.0$/, "")}X`
      : undefined);

  return (
    <div className={className}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 md:gap-5">
        {/* Before */}
        <motion.div
          className="relative overflow-hidden rounded-xl border border-red-500/10 bg-gradient-to-br from-red-950/40 to-red-950/10 px-4 py-5 md:px-5 md:py-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-400/60">
            {beforeLabel}
          </span>
          <p className="mt-3 text-2xl font-bold text-red-300/80 md:text-3xl">
            {formatMetric(before, unit)}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-red-400/40">{unitLabel}</p>
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-red-500/5 blur-2xl" />
        </motion.div>

        {/* Multiplier bridge */}
        <div className="flex flex-col items-center justify-center gap-2 px-1">
          {computedMultiplier && (
            <motion.span
              className="rounded-full border border-neon-cyan/25 bg-neon-cyan/10 px-3 py-1 text-xs font-bold text-neon-cyan"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {computedMultiplier}
            </motion.span>
          )}
          <motion.svg
            viewBox="0 0 24 24"
            className="h-5 w-5 text-white/25 md:h-6 md:w-6"
            fill="none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        {/* After */}
        <motion.div
          className="relative overflow-hidden rounded-xl border border-neon-cyan/20 bg-gradient-to-br from-neon-cyan/10 to-blue-500/5 px-4 py-5 md:px-5 md:py-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neon-cyan/70">
            {afterLabel}
          </span>
          <p className="mt-3 text-2xl font-bold text-white md:text-3xl">
            {formatMetric(after, unit)}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-neon-cyan/50">{unitLabel}</p>
          <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-neon-cyan/10 blur-2xl" />
        </motion.div>
      </div>

      {/* Proportional scale, not a time series */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          <span>Relative scale</span>
          {duration && <span className="text-muted/50">{duration}</span>}
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[10px] text-red-400/50">
              <span>{beforeLabel}</span>
              <span>{formatMetric(before, unit)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-500/40 to-red-400/20"
                initial={{ width: 0 }}
                whileInView={{ width: `${beforePct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-[10px] text-neon-cyan/60">
              <span>{afterLabel}</span>
              <span>{formatMetric(after, unit)}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.04]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-blue-500/60"
                initial={{ width: 0 }}
                whileInView={{ width: `${afterPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
