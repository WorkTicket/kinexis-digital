"use client";

import { m as motion } from "@/lib/framer";
import {
  FloatingBadge,
  FrameLabel,
  HeroVizShell,
  SkeletonBlock,
  SkeletonLine,
} from "./ServiceHeroVizParts";

export default function MetaAdsHeroViz() {
  return (
    <HeroVizShell>
      <div className="relative flex flex-col items-center">
        <motion.div
          className="w-[130px] overflow-hidden rounded-[1.1rem] border-2 border-white/[0.12] bg-[#0d1117] shadow-xl shadow-black/30"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-2 py-1">
            <span className="text-[6px] font-semibold text-muted/50">Instagram</span>
            <div className="flex gap-0.5">
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="h-1 w-1 rounded-full bg-white/20" />
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto px-2 py-1.5">
            {["Your Brand", "Ad 2", "Ad 3"].map((s, i) => (
              <div key={s} className="flex shrink-0 flex-col items-center gap-0.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full p-px ${
                    i === 0 ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" : "bg-white/10"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d1117] text-[6px]">
                    {i === 0 ? "★" : "·"}
                  </div>
                </div>
                <span className="max-w-[28px] truncate text-[5px] text-muted/40">{s}</span>
              </div>
            ))}
          </div>

          <div className="px-2 pb-2">
            <div className="mb-1 flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-neon-cyan/40 to-neon-blue/40" />
              <div className="flex-1">
                <SkeletonLine width="md" className="h-1" />
                <span className="text-[5px] text-muted/40">Sponsored</span>
              </div>
            </div>
            <SkeletonBlock className="mb-1 h-14 w-full !rounded-lg !bg-gradient-to-br !from-neon-cyan/15 !to-purple-500/10" />
            <SkeletonLine className="mb-1 h-1" />
            <SkeletonLine width="md" className="mb-1.5 h-1" />
            <div className="rounded-md bg-neon-cyan/15 py-1 text-center text-[6px] font-bold uppercase tracking-wider text-neon-cyan">
              Shop Now
            </div>
            <div className="mt-1 flex justify-between text-[6px] text-muted/50">
              <span>♥ 1.2k</span>
              <span className="font-bold text-neon-cyan">5.1x ROAS</span>
            </div>
          </div>
        </motion.div>

        <FrameLabel>Meta Feed Ad</FrameLabel>
        <FloatingBadge label="Reach" value="847K" position="top-right" delay={1.1} />
      </div>
    </HeroVizShell>
  );
}
