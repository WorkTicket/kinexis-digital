"use client";

import { m as motion } from "@/lib/framer";
import { FakeButton, FloatingBadge, FrameLabel, HeroVizShell } from "./ServiceHeroVizParts";

export default function MetaAdsHeroViz() {
  return (
    <HeroVizShell>
      <div className="relative flex flex-col items-center">
        <motion.div
          className="viz-frame w-[148px] overflow-hidden rounded-[1.35rem] border border-white/[0.12] bg-[linear-gradient(165deg,rgba(22,28,40,0.98)_0%,rgba(10,12,18,0.98)_100%)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_28px_rgba(0,212,255,0.1)]"
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5">
            <span className="text-[9px] font-semibold text-white/60">Instagram</span>
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/25" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto px-2.5 py-2">
            {["Your Brand", "Ad 2", "Ad 3"].map((s, i) => (
              <div key={s} className="flex shrink-0 flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full p-[1.5px] ${
                    i === 0 ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" : "bg-white/15"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d1117] text-[8px] font-bold text-white/70">
                    {i === 0 ? "★" : "·"}
                  </div>
                </div>
                <span className="max-w-[36px] truncate text-[7px] text-white/35">{s}</span>
              </div>
            ))}
          </div>

          <div className="px-2.5 pb-2.5">
            <div className="mb-1.5 flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue" />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-semibold text-white/80">Your Brand</div>
                <span className="text-[7px] text-white/35">Sponsored</span>
              </div>
            </div>
            <div className="mb-1.5 h-16 overflow-hidden rounded-lg bg-gradient-to-br from-neon-cyan/25 via-purple-500/15 to-transparent">
              <div className="flex h-full items-end p-2">
                <span className="text-[8px] font-semibold text-white/70">Summer Sale</span>
              </div>
            </div>
            <FakeButton label="Shop Now" className="h-6 text-[8px]" />
            <div className="mt-1.5 flex justify-between text-[8px]">
              <span className="text-white/45">♥ 1.2k</span>
              <span className="font-bold text-neon-cyan">5.1x ROAS</span>
            </div>
          </div>
        </motion.div>

        <FrameLabel>Meta Feed Ad</FrameLabel>
        <FloatingBadge label="Reach" value="847K" position="top-right" delay={1.05} />
      </div>
    </HeroVizShell>
  );
}
