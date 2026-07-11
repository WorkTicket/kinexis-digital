"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
} from "./ServiceHeroVizParts";

const results = [
  { name: "Your Business", rating: "4.9", top: true },
  { name: "Competitor A", rating: "4.4" },
  { name: "Competitor B", rating: "4.1" },
];

export default function LocalSeoHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Local Map Pack" delay={0.5} frameClassName="h-[165px] w-[220px]">
          <div className="flex flex-1 gap-1.5">
            <div className="relative w-[42%] overflow-hidden rounded border border-surface bg-white/[0.02]">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
                <div className="absolute left-6 top-0 h-full w-px bg-white/[0.06]" />
                <div className="absolute left-0 top-3 h-px w-full bg-white/[0.06]" />
                <div className="absolute left-0 top-8 h-px w-full bg-white/10" />
              </div>
              <motion.div
                className="absolute left-1/2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neon-cyan"
                initial={{ scale: 0, y: -8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bg" />
              </motion.div>
              <motion.div
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/40"
                animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              {results.map((r, i) => (
                <motion.div
                  key={r.name}
                  className={`flex items-center gap-1 rounded border px-1 py-1 ${
                    r.top ? "border-neon-cyan/30 bg-neon-cyan/[0.06]" : "border-surface bg-white/[0.02]"
                  }`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <span
                    className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full text-[6px] font-bold ${
                      r.top ? "bg-neon-cyan text-bg" : "bg-white/10 text-muted/50"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`truncate text-[6px] ${r.top ? "font-semibold text-white/85" : "text-white/55"}`}>
                      {r.name}
                    </div>
                    <div className="flex items-center gap-0.5 text-[5px] text-amber-400">
                      ★ <span className="text-muted/50">{r.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between rounded border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1">
            <span className="text-[6px] uppercase text-muted/50">Map Pack</span>
            <span className="text-[8px] font-bold text-emerald-400">Top 3 · Local</span>
          </div>
        </BrowserFrame>

        <FloatingBadge label="Calls" value="+64%" accent="emerald" />
      </HeroVizStage>
    </HeroVizShell>
  );
}
