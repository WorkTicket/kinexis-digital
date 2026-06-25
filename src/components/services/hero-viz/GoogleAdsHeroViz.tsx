"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
  SkeletonLine,
} from "./ServiceHeroVizParts";

export default function GoogleAdsHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Google Search" delay={0.5} frameClassName="h-[175px] w-[210px]">
          <div className="mb-1.5 flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1">
            <div className="flex gap-px">
              {"Google".split("").map((c, i) => (
                <span key={i} className="text-[6px] font-bold text-neon-cyan/70">
                  {c}
                </span>
              ))}
            </div>
            <SkeletonLine width="lg" className="h-1 flex-1" />
          </div>

          <motion.div
            className="mb-1 rounded-lg border border-neon-cyan/30 bg-neon-cyan/[0.06] p-1.5"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="mb-1 flex items-center gap-1">
              <span className="rounded border border-neon-cyan/40 bg-neon-cyan/10 px-1 text-[5px] font-bold uppercase text-neon-cyan">
                Ad
              </span>
              <div className="h-1 w-12 rounded-full bg-emerald-400/30" />
            </div>
            <SkeletonLine width="lg" className="mb-0.5 h-1.5" />
            <SkeletonLine width="md" className="mb-1 h-1" />
            <div className="grid grid-cols-2 gap-0.5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="rounded border border-neon-cyan/15 bg-neon-cyan/[0.06] py-0.5 text-center text-[5px] text-neon-cyan/70">
                  Link {n}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mb-1 rounded border border-white/[0.04] bg-white/[0.02] p-1 opacity-40">
            <div className="mb-0.5 h-1 w-14 rounded-full bg-white/10" />
            <SkeletonLine width="md" className="h-1" />
          </div>

          <div className="mt-auto flex gap-1">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1 rounded border border-white/[0.06] bg-white/[0.02] p-1">
                <div className="mb-0.5 h-4 w-full rounded bg-white/[0.04]" />
                <SkeletonLine width="sm" className="h-0.5" />
              </div>
            ))}
          </div>
        </BrowserFrame>

        <FloatingBadge label="CTR" value="6.8%" />
        <FloatingBadge label="Position" value="1.2" position="bottom-left" delay={1.3} />
      </HeroVizStage>
    </HeroVizShell>
  );
}
