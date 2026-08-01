"use client";

import { m as motion } from "@/lib/framer";
import HeroVizContainer from "./HeroVizContainer";

const findings = [
  {
    id: "1",
    severity: "Critical",
    severityClass: "text-red-400/90 bg-red-400/10 border-red-400/25",
    title: "Double-counted conversions",
    impact: "CPL inflated 2.1×",
  },
  {
    id: "2",
    severity: "High",
    severityClass: "text-amber-400/90 bg-amber-400/10 border-amber-400/25",
    title: "Call tracking not in CRM",
    impact: "38% leads unattributed",
  },
  {
    id: "3",
    severity: "Med",
    severityClass: "text-neon-cyan/90 bg-neon-cyan/10 border-neon-cyan/25",
    title: "Meta spend vs pipeline",
    impact: "Cut $4.2k/mo waste",
  },
];

export default function MarketingAuditsHeroViz() {
  return (
    <HeroVizContainer
      browserLabel="Audit Findings"
      url="audit.kinexis / Q2 review"
      frameClassName="h-[185px] w-[255px]"
      badges={[{ label: "Priority fixes", value: "3", accent: "cyan" }]}
    >
      <div className="mb-1.5 flex items-center justify-between border-b border-white/[0.06] pb-1.5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[7px] font-semibold uppercase tracking-wider text-white/55">
            Evidence-based review
          </span>
          <span className="text-[6px] text-muted/40">Tracking · Channels · Funnel · Spend</span>
        </div>
        <div className="rounded border border-neon-cyan/25 bg-neon-cyan/[0.06] px-1.5 py-0.5 text-right">
          <div className="text-[6px] uppercase text-muted/45">Impact ranked</div>
          <div className="text-[9px] font-black text-neon-cyan">P0 → P2</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1">
        {findings.map((f, i) => (
          <motion.div
            key={f.id}
            className="flex items-start gap-1.5 rounded-md border border-white/[0.05] bg-white/[0.02] px-1.5 py-1"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.1 }}
          >
            <span className="mt-px w-3 shrink-0 text-[7px] font-bold text-white/35">{f.id}</span>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-1">
                <span
                  className={`rounded border px-1 py-px text-[5px] font-bold uppercase tracking-wide ${f.severityClass}`}
                >
                  {f.severity}
                </span>
                <span className="truncate text-[7px] font-semibold text-white/80">{f.title}</span>
              </div>
              <span className="text-[6px] text-muted/50">{f.impact}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between rounded border border-neon-cyan/20 bg-neon-cyan/[0.05] px-2 py-1">
        <span className="text-[6px] uppercase tracking-wider text-muted/50">Next action</span>
        <span className="text-[7px] font-bold text-neon-cyan">Validate GA4 events first</span>
      </div>
    </HeroVizContainer>
  );
}
