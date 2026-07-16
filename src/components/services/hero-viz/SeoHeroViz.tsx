"use client";

import { m as motion } from "@/lib/framer";
import { SkeletonLine } from "./ServiceHeroVizParts";
import HeroVizContainer from "./HeroVizContainer";

type Props = { labels: Record<string, string> };

const keywords = [
  { pos: 1, change: "+4" },
  { pos: 3, change: "+2" },
  { pos: 5, change: "+7" },
  { pos: 8, change: "+1" },
];

export default function SeoHeroViz({ labels }: Props) {
  return (
    <HeroVizContainer
      browserLabel="Search Console"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Landscaping Co.", value: "4.8X", accent: "emerald" }]}
    >
      <div className="mb-1 grid grid-cols-[1fr_28px_28px] gap-1 border-b border-surface pb-1">
        <span className="text-[6px] uppercase tracking-wider text-muted/40">Keyword</span>
        <span className="text-[6px] uppercase tracking-wider text-muted/40 text-center">Pos</span>
        <span className="text-[6px] uppercase tracking-wider text-muted/40 text-center">Δ</span>
      </div>
      {keywords.map((row, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-[1fr_28px_28px] items-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65 + i * 0.08 }}
        >
          <SkeletonLine width={i % 2 === 0 ? "lg" : "md"} className="h-1" />
          <span className="text-center text-[8px] font-mono font-bold text-neon-cyan">#{row.pos}</span>
          <span className="text-center text-[7px] font-bold text-emerald-400">{row.change}</span>
        </motion.div>
      ))}
      <div className="mt-auto flex items-center justify-between rounded border border-neon-cyan/15 bg-neon-cyan/[0.04] px-2 py-1">
        <span className="text-[6px] text-muted/50">{labels.rankings ?? "Rankings"}</span>
        <span className="text-[8px] font-bold text-neon-cyan">Avg #4.2</span>
      </div>
    </HeroVizContainer>
  );
}
