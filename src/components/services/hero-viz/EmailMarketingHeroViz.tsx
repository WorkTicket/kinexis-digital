"use client";

import { m as motion } from "@/lib/framer";
import { FakeButton } from "./ServiceHeroVizParts";
import HeroVizContainer from "./HeroVizContainer";

type SequenceItem = { day: string; open: string };

type Props = { sequence: SequenceItem[] };

export default function EmailMarketingHeroViz({ sequence }: Props) {
  const items = sequence.slice(0, 3);
  const subjects = ["Welcome aboard", "Quick tip inside", "Your next step"];

  return (
    <HeroVizContainer
      browserLabel="Email Sequence"
      url="mail.yoursite.com"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Open Rate", value: "42%", accent: "emerald" }]}
    >
      <div className="flex flex-1 gap-2">
        <div className="flex w-[40%] flex-col gap-1.5 border-r border-white/[0.06] pr-2">
          {items.map((s, i) => (
            <motion.div
              key={s.day}
              className={
                i === 0
                  ? "rounded-md border border-neon-cyan/30 bg-neon-cyan/[0.08] px-1.5 py-1.5"
                  : "rounded-md border border-white/[0.05] bg-white/[0.02] px-1.5 py-1.5"
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <div className="flex items-center gap-1">
                {i === 0 && <div className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />}
                <span className={`truncate text-[8px] ${i === 0 ? "font-semibold text-white/80" : "text-white/45"}`}>
                  {subjects[i] ?? "Email"}
                </span>
              </div>
              <span className="text-[7px] text-white/30">{s.day}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-white/85">{subjects[0]}</span>
            <span className="text-[9px] font-bold text-neon-cyan">{items[0]?.open ?? "42%"}</span>
          </div>
          <div className="mb-1 text-[8px] leading-relaxed text-white/40">
            Thanks for joining. Here&apos;s what happens next.
          </div>
          <div className="mb-1 h-1 w-full rounded-full bg-white/10" />
          <div className="mb-1 h-1 w-[80%] rounded-full bg-white/[0.07]" />
          <FakeButton label="Get Started" className="mt-auto h-6 text-[8px]" />
        </div>
      </div>
    </HeroVizContainer>
  );
}
