"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const vitals = [
  { label: "LCP", value: "1.1s" },
  { label: "INP", value: "68ms" },
  { label: "CLS", value: "0.02" },
];

const CIRC = 138;

export default function WebsiteSpeedHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Core Web Vitals"
      url="pagespeed.web.dev"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Load Time", value: "-2.4s", accent: "emerald" }]}
    >
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <svg viewBox="0 0 52 52" className="h-full w-full -rotate-90">
            <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4.5" />
            <motion.circle
              cx="26"
              cy="26"
              r="22"
              fill="none"
              stroke="#34d399"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              initial={{ strokeDashoffset: CIRC }}
              animate={{ strokeDashoffset: CIRC * 0.03 }}
              transition={{ duration: 1.3, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-base font-black text-emerald-400">98</span>
            <span className="text-[7px] uppercase tracking-wider text-white/35">score</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          {vitals.map((v, i) => (
            <motion.div
              key={v.label}
              className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1.5"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75 + i * 0.1 }}
            >
              <span className="text-[8px] font-medium uppercase tracking-wider text-white/45">{v.label}</span>
              <span className="text-[10px] font-mono font-bold text-neon-cyan">{v.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-2 text-center text-[8px] font-medium uppercase tracking-wider text-emerald-400/70">
        Passed · all thresholds green
      </div>
    </HeroVizContainer>
  );
}
