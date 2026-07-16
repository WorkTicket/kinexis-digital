"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const segments = [
  { label: "Google", pct: 45, color: "#00d4ff" },
  { label: "PMax", pct: 25, color: "#0099cc" },
  { label: "Meta", pct: 20, color: "#007aa3" },
  { label: "Other", pct: 10, color: "#005f80" },
];

export default function PaidAdsOverviewHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Budget Allocation"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Blended ROAS", value: "4.1x" }]}
    >
      <div className="flex flex-1 items-center gap-3">
        <motion.div
          className="relative h-[72px] w-[72px] shrink-0 rounded-full"
          style={{
            background:
              "conic-gradient(#00d4ff 0% 45%, #0099cc 45% 70%, #007aa3 70% 90%, #005f80 90% 100%)",
          }}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <div className="absolute inset-[10px] flex flex-col items-center justify-center rounded-full bg-[#0d1117]">
            <span className="text-[14px] font-bold text-neon-cyan">4.1x</span>
            <span className="text-[5px] uppercase tracking-wider text-muted/50">ROAS</span>
          </div>
        </motion.div>
        <div className="flex flex-1 flex-col gap-1">
          {segments.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.07 }}
            >
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="flex-1 text-[7px] text-muted/60">{s.label}</span>
              <span className="text-[7px] font-mono text-neon-cyan">{s.pct}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </HeroVizContainer>
  );
}
