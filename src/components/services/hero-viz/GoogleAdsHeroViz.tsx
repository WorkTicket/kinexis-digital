"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

export default function GoogleAdsHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Google Search"
      url="google.com/search"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "CTR", value: "6.8%" }]}
    >
      <div className="mb-2 flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/30 px-2.5 py-1.5">
        <span className="text-[9px] font-bold tracking-tight text-neon-cyan/80">Google</span>
        <span className="text-[9px] text-white/45">emergency plumber near me</span>
      </div>

      <motion.div
        className="mb-1.5 rounded-md border border-neon-cyan/30 bg-neon-cyan/[0.07] px-2 py-2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-1 flex items-center gap-1.5">
          <span className="rounded-sm bg-neon-cyan/25 px-1 py-0.5 text-[7px] font-bold uppercase text-neon-cyan">
            Ad
          </span>
          <span className="truncate text-[9px] font-semibold text-[#8ab4f8]">24/7 Emergency Plumbing</span>
        </div>
        <div className="text-[8px] leading-snug text-white/45">Same-day service · Licensed & insured</div>
        <div className="mt-1 text-[8px] text-emerald-400/80">www.yourplumbing.com</div>
      </motion.div>

      <motion.div
        className="rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
      >
        <div className="truncate text-[9px] text-white/45">Organic plumbing directory</div>
        <div className="truncate text-[8px] text-white/25">directory.example.com</div>
      </motion.div>

      <div className="mt-auto pt-2 text-center text-[8px] uppercase tracking-wider text-white/30">
        Paid · Top of page
      </div>
    </HeroVizContainer>
  );
}
