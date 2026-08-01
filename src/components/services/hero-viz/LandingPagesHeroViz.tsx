"use client";

import { m as motion } from "@/lib/framer";
import { FakeButton, FakeHeadline } from "./ServiceHeroVizParts";
import HeroVizContainer from "./HeroVizContainer";

export default function LandingPagesHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Landing Page"
      url="yoursite.com/offer"
      highlight
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Conversion", value: "12.4%", accent: "emerald" }]}
    >
      <div className="flex flex-1 flex-col items-center px-1 text-center">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <FakeHeadline line1="Get your free quote" line2="One page. One goal. No distractions." />
        </motion.div>

        <motion.div
          className="my-2.5 w-full space-y-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-4 rounded-md border border-white/[0.07] bg-white/[0.03]" />
          <div className="h-4 rounded-md border border-white/[0.07] bg-white/[0.03]" />
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, type: "spring" }}
        >
          <FakeButton label="Get My Free Quote" />
        </motion.div>

        <div className="mt-auto flex items-center gap-1.5 pt-2 text-[8px] uppercase tracking-wider text-white/35">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          No distractions · One goal
        </div>
      </div>
    </HeroVizContainer>
  );
}
