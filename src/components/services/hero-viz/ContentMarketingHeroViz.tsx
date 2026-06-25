"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
  SkeletonLine,
} from "./ServiceHeroVizParts";

type Props = { labels: { id: string; vizLabel: string }[] };

export default function ContentMarketingHeroViz({ labels }: Props) {
  const title = labels[0]?.vizLabel ?? "Article";

  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="CMS Editor" delay={0.5} frameClassName="h-[165px] w-[220px]">
          <div className="flex flex-1 gap-1.5">
            <div className="flex w-5 shrink-0 flex-col gap-1 border-r border-white/[0.06] pr-1 pt-0.5">
              {["B", "M", "E", "S"].map((icon, i) => (
                <div
                  key={icon}
                  className={`flex h-4 w-4 items-center justify-center rounded text-[6px] font-bold ${
                    i === 0 ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted/30"
                  }`}
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col">
              <SkeletonLine width="lg" className="mb-1 h-2" />
              <span className="mb-1.5 text-[5px] uppercase tracking-wider text-muted/40">{title}</span>
              <SkeletonLine className="mb-1 h-1" />
              <SkeletonLine width="lg" className="mb-1 h-1" />
              <SkeletonLine width="md" className="mb-1 h-1" />
              <SkeletonLine width="lg" className="mb-2 h-1" />
              <motion.div
                className="mt-auto self-start rounded bg-emerald-500/20 px-2 py-0.5 text-[6px] font-bold uppercase text-emerald-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Publish
              </motion.div>
            </div>
          </div>
        </BrowserFrame>

        <FloatingBadge label="Content" value="Draft Ready" position="bottom-left" delay={1.2} />
      </HeroVizStage>
    </HeroVizShell>
  );
}
