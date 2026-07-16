"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

type Quarter = { quarter: string; impact: string };

type Props = { quarters: Quarter[] };

export default function GrowthConsultingHeroViz({ quarters }: Props) {
  const items = quarters.slice(0, 4);

  return (
    <HeroVizContainer
      browserLabel="Growth Roadmap"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Growth", value: "+280%", accent: "emerald" }]}
    >
      <div className="relative flex flex-1 flex-col justify-center px-1">
        <div className="absolute left-4 right-4 top-[38%] h-px bg-gradient-to-r from-neon-cyan/10 via-neon-cyan/40 to-neon-cyan/10" />
        <div className="relative flex items-start justify-between">
          {items.map((q, i) => (
            <motion.div
              key={q.quarter}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.1 }}
            >
              <div
                className={`mb-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  i === items.length - 1
                    ? "border-neon-cyan bg-neon-cyan/20"
                    : "border-neon-cyan/40 bg-[#0d1117]"
                }`}
              >
                <span className="text-[6px] font-bold text-neon-cyan">{i + 1}</span>
              </div>
              <span className="text-[6px] font-bold text-neon-cyan">{q.quarter}</span>
              <span className="mt-0.5 max-w-[40px] text-center text-[5px] leading-tight text-muted/50">
                {q.impact}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between rounded border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1">
        <span className="text-[6px] uppercase text-muted/50">Revenue Target</span>
        <span className="text-[9px] font-bold text-emerald-400">+280%</span>
      </div>
    </HeroVizContainer>
  );
}
