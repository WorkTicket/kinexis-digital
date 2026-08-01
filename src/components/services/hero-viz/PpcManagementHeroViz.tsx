"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const tabs = ["Search", "Shop", "Display", "Social"];
const channels = [
  { label: "Google", spend: 45 },
  { label: "Meta", spend: 20 },
  { label: "LinkedIn", spend: 10 },
  { label: "Microsoft", spend: 25 },
];

export default function PpcManagementHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Campaign Manager"
      url="ads.google.com"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Channels", value: "4 Active", position: "bottom-left", delay: 1.15 }]}
    >
      <div className="mb-2 flex gap-1">
        {tabs.map((tab, i) => (
          <div
            key={tab}
            className={`rounded-md px-1.5 py-1 text-[8px] font-semibold uppercase tracking-wide ${
              i === 0 ? "bg-neon-cyan/20 text-neon-cyan" : "bg-white/[0.04] text-white/35"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="relative flex flex-1 flex-col justify-center gap-2">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.label}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 + i * 0.08 }}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neon-cyan/30 bg-neon-cyan/[0.1] text-[8px] font-bold text-neon-cyan">
              {ch.label.charAt(0)}
            </div>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan/80 to-neon-cyan/30"
                initial={{ width: 0 }}
                animate={{ width: `${ch.spend * 1.8}%` }}
                transition={{ delay: 0.75 + i * 0.08, duration: 0.5 }}
              />
            </div>
            <span className="w-7 text-right text-[9px] font-mono text-white/50">{ch.spend}%</span>
          </motion.div>
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neon-cyan/40 bg-bg/90 shadow-[0_0_20px_rgba(0,212,255,0.25)] backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0, type: "spring" }}
        >
          <span className="text-[9px] font-black text-neon-cyan">4.0x</span>
        </motion.div>
      </div>
    </HeroVizContainer>
  );
}
