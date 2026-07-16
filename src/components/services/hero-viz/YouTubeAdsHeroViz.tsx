"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

export default function YouTubeAdsHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Video Campaign"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "View-Through", value: "31%", accent: "emerald" }]}
    >
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded bg-black/40">
        <motion.div
          className="flex h-7 w-7 items-center justify-center rounded-full bg-neon-cyan/90"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <div className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-bg" />
        </motion.div>

        <motion.div
          className="absolute bottom-1 right-1 rounded border border-white/20 bg-black/70 px-1 py-0.5 text-[6px] font-semibold text-white/70"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          Skip Ad ▷
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-neon-cyan"
            initial={{ width: "0%" }}
            animate={{ width: "38%" }}
            transition={{ delay: 0.8, duration: 1.4 }}
          />
        </div>
      </div>

      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {[
          { k: "Views", v: "1.2M" },
          { k: "VTR", v: "31%" },
          { k: "CPV", v: "$0.03" },
        ].map((m, i) => (
          <motion.div
            key={m.k}
            className="rounded border border-surface bg-white/[0.02] p-1 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.08 }}
          >
            <div className="text-[8px] font-bold text-neon-cyan">{m.v}</div>
            <div className="text-[5px] uppercase text-muted/40">{m.k}</div>
          </motion.div>
        ))}
      </div>
    </HeroVizContainer>
  );
}
