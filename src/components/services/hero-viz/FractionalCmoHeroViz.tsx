"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const kpis = [
  { label: "Pipeline", value: "$1.4M", trend: "+22%" },
  { label: "CAC", value: "$310", trend: "-18%" },
  { label: "ROAS", value: "4.6x", trend: "+0.9" },
];

const channels = [
  { label: "Paid", pct: 70 },
  { label: "SEO", pct: 55 },
  { label: "Email", pct: 40 },
  { label: "Social", pct: 30 },
];

export default function FractionalCmoHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="CMO Dashboard"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Strategy", value: "On Track", accent: "emerald" }]}
    >
      <div className="mb-1.5 grid grid-cols-3 gap-1">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            className="rounded border border-surface bg-white/[0.02] p-1 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.09 }}
          >
            <div className="text-[8px] font-bold text-neon-cyan">{k.value}</div>
            <div className="text-[5px] uppercase text-muted/40">{k.label}</div>
            <div className="text-[5px] font-semibold text-emerald-400">{k.trend}</div>
          </motion.div>
        ))}
      </div>

      <span className="mb-1 block text-[6px] uppercase tracking-wider text-muted/40">Channel priority</span>
      <div className="flex flex-1 flex-col justify-center gap-1">
        {channels.map((c, i) => (
          <motion.div
            key={c.label}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 + i * 0.08 }}
          >
            <span className="w-8 shrink-0 text-[6px] text-white/55">{c.label}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan/80 to-neon-cyan/30"
                initial={{ width: "0%" }}
                animate={{ width: `${c.pct}%` }}
                transition={{ delay: 0.95 + i * 0.08, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </HeroVizContainer>
  );
}
