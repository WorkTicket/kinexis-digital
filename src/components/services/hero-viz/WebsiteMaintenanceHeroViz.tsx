"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const checks = [
  { label: "Core updates", status: "Current" },
  { label: "Daily backup", status: "Done" },
  { label: "Security scan", status: "Clean" },
  { label: "Uptime monitor", status: "Live" },
];

export default function WebsiteMaintenanceHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Site Health"
      frameClassName="h-[165px] w-[220px]"
      badges={[{ label: "Response", value: "< 2h" }]}
    >
      <div className="mb-1.5 flex items-center justify-between border-b border-surface pb-1.5">
        <span className="text-[7px] uppercase tracking-wider text-muted/40">Uptime</span>
        <motion.span
          className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-400"
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          99.98%
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1">
        {checks.map((c, i) => (
          <motion.div
            key={c.label}
            className="flex items-center justify-between rounded border border-surface bg-white/[0.02] px-1.5 py-1"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 + i * 0.09 }}
          >
            <span className="text-[6px] text-white/60">{c.label}</span>
            <span className="flex items-center gap-1 text-[6px] font-semibold text-emerald-400">
              <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-emerald-400/15 text-[6px] leading-none">
                ✓
              </span>
              {c.status}
            </span>
          </motion.div>
        ))}
      </div>
    </HeroVizContainer>
  );
}
