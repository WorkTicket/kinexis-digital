"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
} from "./ServiceHeroVizParts";

const tabs = ["Search", "Shop", "Display", "Social"];
const channels = [
  { label: "Google", spend: 45 },
  { label: "Meta", spend: 20 },
  { label: "LinkedIn", spend: 10 },
  { label: "Microsoft", spend: 25 },
];

export default function PpcManagementHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Campaign Manager" delay={0.5} frameClassName="h-[165px] w-[220px]">
          <div className="mb-1 flex gap-0.5">
            {tabs.map((tab, i) => (
              <div
                key={tab}
                className={`rounded px-1 py-0.5 text-[5px] font-semibold uppercase ${
                  i === 0 ? "bg-neon-cyan/20 text-neon-cyan" : "bg-white/[0.04] text-muted/40"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
          <div className="relative flex flex-1 flex-col justify-center gap-1.5">
            {channels.map((ch, i) => (
              <motion.div
                key={ch.label}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-neon-cyan/25 bg-neon-cyan/[0.08] text-[6px] font-bold text-neon-cyan">
                  {ch.label.charAt(0)}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/40 to-transparent" />
                <span className="text-[7px] font-mono text-muted/50">{ch.spend}%</span>
              </motion.div>
            ))}
            <motion.div
              className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-cyan/30 bg-neon-cyan/[0.08]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.0, type: "spring" }}
            >
              <span className="text-[7px] font-bold text-neon-cyan">4.0x</span>
            </motion.div>
          </div>
        </BrowserFrame>

        <FloatingBadge label="Channels" value="4 Active" position="bottom-left" delay={1.2} />
      </HeroVizStage>
    </HeroVizShell>
  );
}
