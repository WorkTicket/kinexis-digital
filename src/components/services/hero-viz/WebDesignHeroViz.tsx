"use client";

import { m as motion } from "@/lib/framer";
import {
  FakeButton,
  FakeHeadline,
  FakeNav,
  FloatingBadge,
  HeroVizShell,
  HeroVizStage,
  MetricPill,
} from "./ServiceHeroVizParts";

/** Editorial graphic for web design — conversion-focused product mock. */
export default function WebDesignHeroViz() {
  return (
    <HeroVizShell>
      <HeroVizStage className="items-center">
        <motion.div
          className="viz-frame relative w-full max-w-[270px] overflow-hidden rounded-[14px] border border-neon-cyan/30 bg-[linear-gradient(165deg,rgba(22,28,40,0.98)_0%,rgba(10,12,18,0.98)_100%)] p-3 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="mb-2.5 flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
            <div className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
            <div className="h-2 w-2 rounded-full bg-[#28c840]/80" />
            <div className="ml-1 flex h-5 flex-1 items-center rounded-md border border-white/[0.06] bg-black/35 px-2">
              <span className="truncate text-[9px] text-white/35">yoursite.com</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.04] bg-white/[0.025] p-2.5">
            <FakeNav brand="Acme" />
            <FakeHeadline line1="Stop losing leads" line2="A site that books calls, not bounces." />
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="h-11 rounded-md bg-gradient-to-br from-neon-cyan/25 to-neon-cyan/5" />
              <div className="h-11 rounded-md border border-white/[0.05] bg-white/[0.03]" />
              <div className="h-11 rounded-md border border-white/[0.05] bg-white/[0.03]" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <FakeButton label="Book a Call" className="flex-1" />
              <MetricPill label="Conv." value="4.8%" accent="emerald" />
            </div>
          </div>
        </motion.div>

        <FloatingBadge label="PageSpeed" value="94/100" accent="emerald" delay={1.05} />
      </HeroVizStage>
    </HeroVizShell>
  );
}
