"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const nodes = [
  { label: "New Lead", tag: "Trigger", active: true },
  { label: "Send Welcome", tag: "Email" },
  { label: "Wait 2 Days", tag: "Delay" },
  { label: "Deal Created", tag: "CRM", active: true },
];

export default function MarketingAutomationCrmHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Automation Flow"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Hands-off", value: "Auto-synced", accent: "emerald" }]}
    >
      <div className="flex flex-1 flex-col justify-center gap-0.5 px-1">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex flex-col items-center">
            <motion.div
              className={`flex w-full items-center justify-between rounded-md border px-2 py-1 ${
                n.active
                  ? "border-neon-cyan/35 bg-neon-cyan/[0.08]"
                  : "border-surface bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.12 }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${n.active ? "bg-neon-cyan" : "bg-white/25"}`}
                />
                <span className="text-[7px] font-medium text-white/75">{n.label}</span>
              </div>
              <span className="rounded-sm bg-white/[0.04] px-1 text-[5px] font-semibold uppercase text-muted/45">
                {n.tag}
              </span>
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                className="h-2 w-px bg-neon-cyan/30"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.68 + i * 0.12 }}
              />
            )}
          </div>
        ))}
      </div>
    </HeroVizContainer>
  );
}
