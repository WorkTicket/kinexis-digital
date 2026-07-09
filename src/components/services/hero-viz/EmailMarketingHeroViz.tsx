"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
  SkeletonLine,
} from "./ServiceHeroVizParts";

type SequenceItem = { day: string; open: string };

type Props = { sequence: SequenceItem[] };

export default function EmailMarketingHeroViz({ sequence }: Props) {
  const items = sequence.slice(0, 3);

  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Email Sequence" delay={0.5} frameClassName="h-[165px] w-[220px]">
          <div className="flex flex-1 gap-1.5">
            <div className="flex w-[38%] flex-col gap-1 border-r border-surface pr-1">
              {items.map((s, i) => (
                <motion.div
                  key={s.day}
                  className={`rounded border px-1 py-1 ${i === 0 ? "border-neon-cyan/25 bg-neon-cyan/[0.06]" : "border-surface bg-white/[0.02]"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                >
                  <div className="flex items-center gap-1">
                    {i === 0 && <div className="h-1 w-1 rounded-full bg-neon-cyan" />}
                    <SkeletonLine width="md" className="h-1 flex-1" />
                  </div>
                  <span className="text-[5px] text-muted/40">{s.day}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-1 flex-col">
              <div className="mb-1 flex items-center justify-between">
                <SkeletonLine width="lg" className="h-1.5" />
                <span className="text-[7px] font-bold text-neon-cyan">{items[0]?.open ?? "42%"}</span>
              </div>
              <SkeletonLine className="mb-1 h-1" />
              <SkeletonLine width="lg" className="mb-1 h-1" />
              <SkeletonLine width="md" className="mb-2 h-1" />
              <div className="mt-auto rounded border border-neon-cyan/20 bg-neon-cyan/10 py-1 text-center text-[6px] font-bold uppercase text-neon-cyan">
                CTA Button
              </div>
            </div>
          </div>
        </BrowserFrame>

        <FloatingBadge label="Open Rate" value="42%" accent="emerald" />
      </HeroVizStage>
    </HeroVizShell>
  );
}
