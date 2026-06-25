"use client";

import { m as motion } from "@/lib/framer";
import {
  HeroVizShell,
  MiniPanel,
  SkeletonLine,
} from "./ServiceHeroVizParts";

type Props = { variantLabel: string };

export default function CroHeroViz({ variantLabel }: Props) {
  return (
    <HeroVizShell>
      <div className="relative w-full max-w-[240px]">
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <MiniPanel label={`${variantLabel} A`} value="1.2%" delay={0.5}>
            <SkeletonLine width="lg" />
            <SkeletonLine width="md" />
            <div className="mt-2 flex h-7 items-center justify-center rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02]">
              <span className="text-[6px] text-muted/40">Checkout</span>
            </div>
          </MiniPanel>

          <motion.div
            className="flex h-7 w-7 shrink-0 flex-col items-center justify-center rounded-full border-2 border-white/[0.1] bg-[#0d1117] shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.65, type: "spring" }}
          >
            <span className="text-[6px] font-bold text-muted/50">VS</span>
          </motion.div>

          <MiniPanel label={`${variantLabel} B`} value="2.8%" highlight delay={0.55}>
            <SkeletonLine width="lg" className="bg-white/15" />
            <SkeletonLine width="md" />
            <div className="mt-2 flex h-7 items-center justify-center rounded-lg border border-neon-cyan/25 bg-neon-cyan/15">
              <span className="text-[6px] font-bold text-neon-cyan">Checkout ✓</span>
            </div>
          </MiniPanel>
        </div>

        <motion.div
          className="flex items-center justify-between rounded-xl border-2 border-white/[0.08] bg-[#0d1117] px-3 py-2 shadow-lg"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
        >
          <div className="text-center">
            <div className="text-[6px] uppercase text-muted/40">Lift</div>
            <div className="text-[10px] font-bold text-emerald-400">+133%</div>
          </div>
          <div className="h-6 w-px bg-white/[0.06]" />
          <div className="text-center">
            <div className="text-[6px] uppercase text-muted/40">Confidence</div>
            <div className="text-[10px] font-bold text-neon-cyan">98.4%</div>
          </div>
          <div className="h-6 w-px bg-white/[0.06]" />
          <div className="rounded-full bg-neon-cyan px-2 py-0.5 text-[6px] font-bold uppercase text-bg">Winner B</div>
        </motion.div>
      </div>
    </HeroVizShell>
  );
}
