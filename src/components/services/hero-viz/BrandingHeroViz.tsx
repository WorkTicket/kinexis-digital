"use client";

import { m as motion } from "@/lib/framer";
import {
  BrowserFrame,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
  SkeletonLine,
} from "./ServiceHeroVizParts";

const palette = [
  { hex: "#00d4ff", name: "Primary" },
  { hex: "#0099cc", name: "Secondary" },
  { hex: "#ffffff", name: "Neutral" },
  { hex: "#0033aa", name: "Dark" },
  { hex: "#00b8d9", name: "Highlight" },
];

export default function BrandingHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <BrowserFrame label="Style Guide" delay={0.5} frameClassName="h-[165px] w-[220px]">
          <div className="mb-2 flex items-center gap-2 border-b border-white/[0.06] pb-2">
            <motion.div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.65, type: "spring" }}
            >
              <span className="text-xs font-black text-bg">K</span>
            </motion.div>
            <div className="flex-1">
              <SkeletonLine width="lg" className="mb-1 h-1.5" />
              <span className="text-[6px] uppercase tracking-widest text-muted/40">Logo Lockup</span>
            </div>
          </div>

          <span className="mb-1 block text-[6px] uppercase tracking-wider text-muted/40">Color Palette</span>
          <div className="mb-2 flex gap-1">
            {palette.map((c, i) => (
              <motion.div
                key={c.hex}
                className="flex flex-1 flex-col items-center gap-0.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.75 + i * 0.05 }}
              >
                <div className="h-6 w-full rounded-md border border-white/[0.08]" style={{ backgroundColor: c.hex }} />
                <span className="text-[4px] font-mono text-muted/40">{c.hex}</span>
              </motion.div>
            ))}
          </div>

          <span className="mb-1 block text-[6px] uppercase tracking-wider text-muted/40">Typography</span>
          <div className="mt-auto space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="w-10 text-[5px] text-muted/40">Display</span>
              <span className="text-sm font-bold text-white/90">Aa</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="w-10 text-[5px] text-muted/40">Body</span>
              <span className="text-[9px] text-muted/70">The quick brown fox</span>
            </div>
          </div>
        </BrowserFrame>

        <FloatingBadge label="Brand Kit" value="Complete" />
      </HeroVizStage>
    </HeroVizShell>
  );
}
