"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const modules = [
  { label: "Foundations", state: "done" },
  { label: "Paid Channels", state: "done" },
  { label: "Analytics & Reporting", state: "active" },
  { label: "Scaling Playbook", state: "todo" },
];

export default function TrainingWorkshopsHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Learning Path"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Team Certified", value: "Ready", accent: "emerald" }]}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[7px] uppercase tracking-wider text-muted/40">Progress</span>
        <span className="text-[8px] font-bold text-neon-cyan">62%</span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan/80 to-neon-cyan/40"
          initial={{ width: "0%" }}
          animate={{ width: "62%" }}
          transition={{ delay: 0.7, duration: 1 }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {modules.map((m, i) => (
          <motion.div
            key={m.label}
            className={`flex items-center gap-1.5 rounded border px-1.5 py-1 ${
              m.state === "active"
                ? "border-neon-cyan/30 bg-neon-cyan/[0.06]"
                : "border-surface bg-white/[0.02]"
            }`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 + i * 0.09 }}
          >
            <span
              className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full text-[6px] leading-none ${
                m.state === "done"
                  ? "bg-emerald-400/15 text-emerald-400"
                  : m.state === "active"
                    ? "bg-neon-cyan/20 text-neon-cyan"
                    : "bg-white/[0.05] text-muted/40"
              }`}
            >
              {m.state === "done" ? "✓" : m.state === "active" ? "▶" : i + 1}
            </span>
            <span
              className={`text-[6px] ${
                m.state === "todo" ? "text-white/45" : "font-medium text-white/75"
              }`}
            >
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </HeroVizContainer>
  );
}
