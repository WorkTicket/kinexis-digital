"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const results = [
  { name: "Your Business", rating: "4.9", top: true },
  { name: "Competitor A", rating: "4.4" },
  { name: "Competitor B", rating: "4.1" },
];

export default function LocalSeoHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Local Map Pack"
      url="google.com/maps"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Calls", value: "+64%", accent: "emerald" }]}
    >
      <div className="flex flex-1 gap-2">
        <div className="relative w-[44%] overflow-hidden rounded-lg border border-white/[0.06] bg-[radial-gradient(circle_at_40%_45%,rgba(0,212,255,0.12),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-3 top-0 h-full w-px bg-white/15" />
            <div className="absolute left-8 top-0 h-full w-px bg-white/10" />
            <div className="absolute left-0 top-4 h-px w-full bg-white/10" />
            <div className="absolute left-0 top-10 h-px w-full bg-white/15" />
          </div>
          <motion.div
            className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neon-cyan shadow-[0_0_16px_rgba(0,212,255,0.55)]"
            initial={{ scale: 0, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.65, type: "spring" }}
          >
            <span className="h-2 w-2 rounded-full bg-bg" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/50"
            animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          {results.map((r, i) => (
            <motion.div
              key={r.name}
              className={
                r.top
                  ? "flex items-center gap-1.5 rounded-md border border-neon-cyan/35 bg-neon-cyan/[0.08] px-1.5 py-1.5"
                  : "flex items-center gap-1.5 rounded-md border border-white/[0.05] bg-white/[0.02] px-1.5 py-1.5"
              }
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <span
                className={
                  r.top
                    ? "flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neon-cyan text-[8px] font-bold text-bg"
                    : "flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[8px] font-bold text-white/45"
                }
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className={`truncate text-[9px] ${r.top ? "font-semibold text-white/90" : "text-white/55"}`}>
                  {r.name}
                </div>
                <div className="flex items-center gap-0.5 text-[8px] text-amber-400">
                  ★ <span className="text-white/40">{r.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between rounded-md border border-emerald-400/25 bg-emerald-400/[0.08] px-2.5 py-1.5">
        <span className="text-[8px] uppercase tracking-wider text-white/45">Map Pack</span>
        <span className="text-[10px] font-bold text-emerald-400">Top 3 · Local</span>
      </div>
    </HeroVizContainer>
  );
}
