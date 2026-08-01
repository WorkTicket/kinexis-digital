"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const palette = [
  { hex: "#00d4ff", name: "Primary" },
  { hex: "#0099cc", name: "Secondary" },
  { hex: "#e8eef5", name: "Neutral" },
  { hex: "#0033aa", name: "Dark" },
  { hex: "#00b8d9", name: "Accent" },
];

export default function BrandingHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Style Guide"
      url="brand.yoursite.com"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Brand Kit", value: "Complete" }]}
    >
      <div className="mb-2.5 flex items-center gap-2.5 border-b border-white/[0.07] pb-2.5">
        <motion.div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue shadow-[0_0_16px_rgba(0,212,255,0.25)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <span className="text-sm font-black text-bg">K</span>
        </motion.div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold text-white/90">Kinexis Digital</div>
          <span className="text-[8px] uppercase tracking-widest text-white/35">Logo Lockup</span>
        </div>
      </div>

      <span className="mb-1.5 block text-[8px] font-medium uppercase tracking-wider text-white/35">Color Palette</span>
      <div className="mb-2.5 flex gap-1.5">
        {palette.map((c, i) => (
          <motion.div
            key={c.hex}
            className="flex flex-1 flex-col items-center gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 + i * 0.05 }}
          >
            <div
              className="h-7 w-full rounded-md border border-white/10 shadow-inner"
              style={{ backgroundColor: c.hex }}
            />
            <span className="text-[7px] font-mono text-white/35">{c.hex}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex items-baseline gap-3 border-t border-white/[0.06] pt-2">
        <span className="text-base font-bold text-white/90">Aa</span>
        <span className="text-[10px] text-white/50">The quick brown fox jumps</span>
      </div>
    </HeroVizContainer>
  );
}
