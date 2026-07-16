"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const rows = [
  { label: "SEO", pct: 82, grade: "A" },
  { label: "Paid Ads", pct: 48, grade: "C" },
  { label: "Website", pct: 71, grade: "B" },
  { label: "Analytics", pct: 34, grade: "D" },
];

const gradeColor = (grade: string) =>
  grade === "A" ? "text-emerald-400" : grade === "D" ? "text-red-400/80" : "text-neon-cyan";

export default function MarketingAuditsHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Audit Scorecard"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Gaps Found", value: "14" }]}
    >
      <div className="mb-1.5 flex items-center justify-between border-b border-surface pb-1.5">
        <span className="text-[7px] uppercase tracking-wider text-muted/40">Overall</span>
        <span className="text-[11px] font-black text-neon-cyan">58/100</span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 + i * 0.09 }}
          >
            <span className="w-11 shrink-0 text-[6px] text-white/60">{r.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className={`h-full rounded-full ${r.grade === "D" ? "bg-red-400/60" : "bg-neon-cyan/70"}`}
                initial={{ width: "0%" }}
                animate={{ width: `${r.pct}%` }}
                transition={{ delay: 0.75 + i * 0.09, duration: 0.8 }}
              />
            </div>
            <span className={`w-3 shrink-0 text-[8px] font-bold ${gradeColor(r.grade)}`}>{r.grade}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center gap-1 rounded border border-neon-cyan/20 bg-neon-cyan/[0.05] px-2 py-1">
        <span className="text-[6px] uppercase text-muted/50">Priority fix</span>
        <span className="text-[7px] font-bold text-neon-cyan">Analytics tracking</span>
      </div>
    </HeroVizContainer>
  );
}
