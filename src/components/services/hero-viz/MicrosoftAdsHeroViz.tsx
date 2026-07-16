"use client";

import { m as motion } from "@/lib/framer";
import { SkeletonLine } from "./ServiceHeroVizParts";
import HeroVizContainer from "./HeroVizContainer";

export default function MicrosoftAdsHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Search Network"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Less Competition", value: "More Reach" }]}
    >
      <div className="mb-1.5 flex items-center gap-1 rounded-full border border-surface bg-white/[0.03] px-2 py-1">
        <div className="grid h-2.5 w-2.5 shrink-0 grid-cols-2 gap-px">
          <span className="rounded-[1px] bg-neon-cyan/80" />
          <span className="rounded-[1px] bg-neon-cyan/40" />
          <span className="rounded-[1px] bg-neon-cyan/40" />
          <span className="rounded-[1px] bg-neon-cyan/80" />
        </div>
        <SkeletonLine width="md" className="h-1" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="rounded border border-neon-cyan/20 bg-neon-cyan/[0.05] px-1.5 py-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <div className="mb-0.5 flex items-center gap-1">
              <span className="rounded-sm bg-neon-cyan/20 px-1 text-[5px] font-bold uppercase text-neon-cyan">
                Ad
              </span>
              <SkeletonLine width="md" className="h-1 flex-1 bg-neon-cyan/25" />
            </div>
            <SkeletonLine className="h-1" />
          </motion.div>
        ))}
        <motion.div
          className="rounded border border-surface bg-white/[0.02] px-1.5 py-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
        >
          <SkeletonLine width="md" className="mb-0.5 h-1" />
          <SkeletonLine className="h-1" />
        </motion.div>
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1">
        <span className="text-[6px] uppercase text-muted/50">Avg. CPC</span>
        <span className="text-[9px] font-bold text-emerald-400">-32% vs Google</span>
      </div>
    </HeroVizContainer>
  );
}
