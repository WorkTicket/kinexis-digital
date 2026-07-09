"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
} from "./ServiceHeroVizParts";

const vitals = [
  { label: "LCP", value: "1.1s" },
  { label: "INP", value: "68ms" },
  { label: "CLS", value: "0.02" },
];

// Circumference of an r=22 circle ~= 138. Show ~97% filled.
const CIRC = 138;

export default function WebsiteSpeedHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Core Web Vitals" delay={0.5} frameClassName="h-[165px] w-[220px]">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
              <svg viewBox="0 0 52 52" className="h-full w-full -rotate-90">
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <motion.circle
                  cx="26"
                  cy="26"
                  r="22"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  initial={{ strokeDashoffset: CIRC }}
                  animate={{ strokeDashoffset: CIRC * 0.03 }}
                  transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-sm font-black text-emerald-400">98</span>
                <span className="text-[5px] uppercase tracking-wider text-muted/40">score</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              {vitals.map((v, i) => (
                <motion.div
                  key={v.label}
                  className="flex items-center justify-between rounded border border-surface bg-white/[0.02] px-1.5 py-1"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <span className="text-[6px] uppercase tracking-wider text-muted/50">{v.label}</span>
                  <span className="text-[8px] font-mono font-bold text-neon-cyan">{v.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-1 text-center text-[6px] uppercase tracking-wider text-muted/40">
            Passed · all thresholds green
          </div>
        </BrowserFrame>

        <FloatingBadge label="Load Time" value="-2.4s" accent="emerald" />
      </HeroVizStage>
    </HeroVizShell>
  );
}
