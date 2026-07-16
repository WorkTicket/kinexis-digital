"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

type Props = { metrics: { shortLabel: string; value: number; suffix?: string }[] };

const linePoints = "4,52 28,44 52,38 76,28 100,18 124,12";

export default function AnalyticsHeroViz({ metrics }: Props) {
  return (
    <HeroVizContainer
      browserLabel="GA4 Dashboard"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Real-time", value: "Active", accent: "emerald" }]}
    >
      <div className="flex flex-1 gap-1.5">
        <div className="flex w-6 shrink-0 flex-col gap-1 border-r border-surface pr-1">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`h-1.5 rounded-sm ${n === 1 ? "bg-neon-cyan/30" : "bg-white/[0.06]"}`} />
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[6px] text-muted/40">Sessions</span>
            <motion.span
              className="flex items-center gap-0.5 text-[7px] font-bold text-emerald-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Live
            </motion.span>
          </div>
          <svg viewBox="0 0 128 56" className="mb-1 h-[52px] w-full" fill="none">
            {[0, 1, 2].map((i) => (
              <line key={i} x1="0" y1={14 + i * 18} x2="128" y2={14 + i * 18} stroke="rgba(255,255,255,0.04)" />
            ))}
            <motion.polyline
              points={linePoints}
              stroke="#00d4ff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
            />
          </svg>
          <div className="mt-auto grid grid-cols-2 gap-1">
            {metrics.slice(0, 4).map((m) => (
              <div key={m.shortLabel} className="rounded border border-surface bg-white/[0.02] p-1 text-center">
                <div className="text-[8px] font-bold text-neon-cyan">
                  {m.value}
                  {m.suffix ?? ""}
                </div>
                <div className="text-[5px] uppercase text-muted/40">{m.shortLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HeroVizContainer>
  );
}
