"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
  SkeletonLine,
} from "./ServiceHeroVizParts";

export default function LandingPagesHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Landing Page" delay={0.5} highlight frameClassName="h-[165px] w-[220px]">
          <div className="flex flex-1 flex-col items-center px-1 text-center">
            <motion.div
              className="mb-1.5 h-1.5 w-[70%] rounded-full bg-white/20"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            />
            <SkeletonLine width="md" className="mb-2 h-1" />

            <motion.div
              className="mb-2 flex w-full flex-col gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              <div className="h-3 rounded border border-surface bg-white/[0.03]" />
              <div className="h-3 rounded border border-surface bg-white/[0.03]" />
            </motion.div>

            <motion.div
              className="mb-2 flex h-5 w-full items-center justify-center rounded bg-neon-cyan/90 text-[7px] font-bold uppercase text-bg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.05, type: "spring" }}
            >
              Get My Free Quote
            </motion.div>

            <div className="mt-auto flex items-center gap-1 text-[5px] uppercase tracking-wider text-muted/40">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              No distractions · One goal
            </div>
          </div>
        </BrowserFrame>

        <FloatingBadge label="Conversion" value="12.4%" accent="emerald" />
        <FloatingBadge label="Bounce" value="-38%" position="bottom-left" delay={1.3} />
      </HeroVizStage>
    </HeroVizShell>
  );
}
