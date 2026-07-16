"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

type Stage = { label: string };

const rates = ["100%", "64%", "12%", "9%", "3.2%", "1.8%"];
const widths = [100, 82, 64, 48, 32, 24];

type Props = { stages: Stage[] };

export default function FunnelsHeroViz({ stages }: Props) {
  const items = stages.slice(0, 6);

  return (
    <HeroVizContainer
      browserLabel="Conversion Funnel"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "CVR", value: "1.8%", accent: "emerald" }]}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-0.5 py-1">
        {items.map((stage, i) => (
          <motion.div
            key={stage.label}
            className="relative flex h-5 items-center justify-between rounded-sm border border-neon-cyan/15 bg-gradient-to-r from-neon-cyan/10 to-transparent px-2"
            style={{ width: `${widths[i]}%` }}
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6 + i * 0.08 }}
          >
            <span className="truncate text-[6px] font-medium text-white/70">{stage.label}</span>
            <span className="text-[7px] font-mono font-bold text-neon-cyan">{rates[i]}</span>
            {i < items.length - 1 && (
              <div className="absolute -bottom-1 left-1/2 h-1 w-px -translate-x-1/2 bg-neon-cyan/30" />
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-1 text-center text-[6px] uppercase tracking-wider text-muted/40">
        Visitors → Leads → Customers
      </div>
    </HeroVizContainer>
  );
}
