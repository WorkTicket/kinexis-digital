"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

type Props = { labels: Record<string, string> };

const results = [
  { rank: 1, title: "Landscaping Services Near You", url: "a1property.com", lift: "+4" },
  { rank: 3, title: "Lawn Care & Maintenance", url: "a1property.com/lawn", lift: "+2" },
  { rank: 5, title: "Commercial Landscaping", url: "a1property.com/commercial", lift: "+7" },
];

export default function SeoHeroViz({ labels }: Props) {
  return (
    <HeroVizContainer
      browserLabel="Search Results"
      url="google.com/search"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Landscaping Co.", value: "2.8X", accent: "emerald" }]}
    >
      <div className="mb-2 flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/30 px-2.5 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full border border-white/25" />
        <span className="text-[9px] text-white/45">landscaping near me</span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {results.map((row, i) => (
          <motion.div
            key={row.title}
            className={
              i === 0
                ? "rounded-md border border-neon-cyan/30 bg-neon-cyan/[0.07] px-2 py-1.5"
                : "rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-1.5"
            }
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.08 }}
          >
            <div className="mb-0.5 flex items-center gap-1.5">
              <span className="text-[8px] font-black text-neon-cyan">#{row.rank}</span>
              <span className="truncate text-[9px] font-semibold text-[#8ab4f8]">{row.title}</span>
              <span className="ml-auto text-[8px] font-bold text-emerald-400">{row.lift}</span>
            </div>
            <div className="truncate text-[8px] text-emerald-400/80">{row.url}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded-md border border-neon-cyan/20 bg-neon-cyan/[0.05] px-2 py-1">
        <span className="text-[8px] text-white/40">{labels.rankings ?? "Rankings"}</span>
        <span className="text-[10px] font-bold text-neon-cyan">Avg #3.0</span>
      </div>
    </HeroVizContainer>
  );
}
