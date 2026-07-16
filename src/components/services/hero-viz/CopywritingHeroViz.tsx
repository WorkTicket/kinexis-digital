"use client";

import { m as motion } from "@/lib/framer";
import { SkeletonLine } from "./ServiceHeroVizParts";
import HeroVizContainer from "./HeroVizContainer";

const headlines = [
  { text: "Cut costs by 40%", score: 62 },
  { text: "Stop overpaying your suppliers", score: 91 },
  { text: "Supplier savings solution", score: 48 },
];

export default function CopywritingHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Headline Testing"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Winning Angle", value: "+91 score" }]}
    >
      <span className="mb-1 block text-[6px] uppercase tracking-wider text-muted/40">Headline variants</span>
      <div className="flex flex-col gap-1">
        {headlines.map((h, i) => {
          const best = h.score >= 90;
          return (
            <motion.div
              key={h.text}
              className={`flex items-center justify-between rounded border px-1.5 py-1 ${
                best ? "border-neon-cyan/30 bg-neon-cyan/[0.06]" : "border-surface bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.1 }}
            >
              <span className={`truncate text-[6px] ${best ? "font-semibold text-white/85" : "text-white/55"}`}>
                {best && <span className="mr-0.5 text-neon-cyan">✎</span>}
                {h.text}
              </span>
              <span
                className={`ml-1 shrink-0 text-[7px] font-mono font-bold ${
                  best ? "text-neon-cyan" : "text-muted/45"
                }`}
              >
                {h.score}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-2">
        <SkeletonLine className="mb-1 h-1" />
        <SkeletonLine width="lg" className="mb-1 h-1" />
        <SkeletonLine width="md" className="h-1" />
      </div>

      <div className="mt-auto flex items-center justify-between rounded border border-surface bg-white/[0.02] px-2 py-1">
        <span className="text-[6px] uppercase text-muted/50">Clarity</span>
        <span className="text-[8px] font-bold text-emerald-400">Grade 6 · Reads easy</span>
      </div>
    </HeroVizContainer>
  );
}
