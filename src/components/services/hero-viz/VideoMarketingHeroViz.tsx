"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

type Props = { labels: string[] };

const clipColors = ["bg-neon-cyan/30", "bg-neon-blue/25", "bg-purple-500/20"];

export default function VideoMarketingHeroViz({ labels }: Props) {
  const clips = labels.slice(0, 3);

  return (
    <HeroVizContainer
      browserLabel="Video Editor"
      frameClassName="h-[175px] w-[220px]"
      badges={[{ label: "Export", value: "4K" }]}
    >
      <div className="relative mb-1.5 flex aspect-video items-center justify-center overflow-hidden rounded-md border border-surface bg-gradient-to-br from-neon-cyan/5 to-neon-blue/5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/25 bg-black/40"
        >
          <svg className="ml-0.5 h-3 w-3 text-white/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 text-[5px] font-mono text-white/60">
          02:34
        </span>
        <motion.span
          className="absolute left-1 top-1 flex items-center gap-0.5 rounded bg-red-500/20 px-1 py-px text-[5px] font-bold uppercase text-red-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ● Rec
        </motion.span>
      </div>

      <div className="relative mb-1 flex h-6 items-end gap-0.5 rounded border border-surface bg-white/[0.02] p-0.5">
        {clips.map((label, i) => (
          <motion.div
            key={label}
            className={`flex-1 rounded-sm ${clipColors[i]}`}
            style={{ height: `${50 + i * 18}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.75 + i * 0.08 }}
          />
        ))}
        <motion.div
          className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-neon-cyan"
          animate={{ left: ["15%", "75%", "15%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="flex h-3 items-end gap-px">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-neon-cyan/15"
            style={{ height: `${25 + Math.sin(i * 0.6) * 15 + ((i * 3) % 12)}%` }}
          />
        ))}
      </div>
    </HeroVizContainer>
  );
}
