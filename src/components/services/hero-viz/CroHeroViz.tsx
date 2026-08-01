"use client";

import { m as motion } from "@/lib/framer";
import { FakeButton, FakeHeadline, HeroVizShell, MiniPanel } from "./ServiceHeroVizParts";

type Props = { variantLabel: string };

export default function CroHeroViz({ variantLabel }: Props) {
  return (
    <HeroVizShell>
      <div className="relative w-full max-w-[270px]">
        <div className="mb-2.5 flex items-center justify-center gap-2">
          <MiniPanel label={`${variantLabel} A`} value="1.2%" delay={0.45}>
            <FakeHeadline line1="Generic CTA" line2="Buried below the fold" />
            <div className="mt-2 flex h-7 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/[0.02] text-[8px] text-white/30">
              Checkout
            </div>
          </MiniPanel>

          <motion.div
            className="flex h-8 w-8 shrink-0 flex-col items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(165deg,rgba(22,28,40,0.98),rgba(10,12,18,0.98))] shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <span className="text-[8px] font-bold text-white/45">VS</span>
          </motion.div>

          <MiniPanel label={`${variantLabel} B`} value="2.8%" highlight delay={0.5}>
            <FakeHeadline line1="Clear offer" line2="One action above fold" />
            <FakeButton label="Checkout ✓" className="mt-2 h-7 text-[8px]" />
          </MiniPanel>
        </div>

        <motion.div
          className="viz-frame flex items-center justify-between rounded-xl border border-white/[0.1] bg-[linear-gradient(165deg,rgba(22,28,40,0.98),rgba(10,12,18,0.98))] px-3.5 py-2.5 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.55)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="text-center">
            <div className="text-[8px] uppercase tracking-wider text-white/35">Lift</div>
            <div className="text-[12px] font-black text-emerald-400">+133%</div>
          </div>
          <div className="h-7 w-px bg-white/[0.08]" />
          <div className="text-center">
            <div className="text-[8px] uppercase tracking-wider text-white/35">Confidence</div>
            <div className="text-[12px] font-black text-neon-cyan">98.4%</div>
          </div>
          <div className="h-7 w-px bg-white/[0.08]" />
          <div className="rounded-full bg-neon-cyan px-2.5 py-1 text-[8px] font-bold uppercase tracking-wide text-bg shadow-[0_0_12px_rgba(0,212,255,0.3)]">
            Winner B
          </div>
        </motion.div>
      </div>
    </HeroVizShell>
  );
}
