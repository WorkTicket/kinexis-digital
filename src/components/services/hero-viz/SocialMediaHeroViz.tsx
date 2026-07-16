"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

type Platform = { id: string; shortLabel: string; eng: string };

type Props = { platforms: Platform[] };

const days = ["M", "T", "W", "T", "F", "S", "S"];
const scheduled = [1, 3, 4, 6];

export default function SocialMediaHeroViz({ platforms }: Props) {
  return (
    <HeroVizContainer
      browserLabel="Content Calendar"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Engagement", value: "+847%", accent: "emerald" }]}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[6px] font-semibold text-muted/50">March 2026</span>
        <span className="text-[6px] text-neon-cyan">{platforms.length} platforms</span>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {days.map((d, i) => (
          <div key={`${d}-${i}`} className="text-center text-[5px] text-muted/40">
            {d}
          </div>
        ))}
      </div>
      <div className="mb-2 grid grid-cols-7 gap-0.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className={`flex h-5 items-center justify-center rounded-sm border ${
              scheduled.includes(i)
                ? "border-neon-cyan/25 bg-neon-cyan/[0.08]"
                : "border-subtle bg-white/[0.02]"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.03 }}
          >
            {scheduled.includes(i) && (
              <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan/60" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-auto flex gap-1">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="flex flex-1 flex-col items-center rounded border border-surface bg-white/[0.02] py-1"
          >
            <span className="text-[5px] text-muted/40">{p.shortLabel}</span>
            <span className="text-[7px] font-bold text-neon-cyan">{p.eng}</span>
          </div>
        ))}
      </div>
    </HeroVizContainer>
  );
}
