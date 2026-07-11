"use client";

import { useRef, useState } from "react";
import { m as motion, useInView } from "@/lib/framer";
import {
  Activity,
  BarChart3,
  Mail,
  Monitor,
  MousePointerClick,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { ArchitectureNode } from "@/content/about";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { EASE_OUT as EASE } from "@/lib/motion-config";

type ConnectionData = {
  feeds: string[];
  how: string;
};

// How each spoke connects to the others in the system
const CONNECTIONS: Record<string, ConnectionData> = {
  SEO: {
    feeds: ["Paid Ads", "Web Design", "Analytics"],
    how: "Organic rankings build the audience Paid Ads retargets. Content drives landing page copy. Every visit flows into Analytics.",
  },
  "Paid Ads": {
    feeds: ["Web Design", "CRO", "Email"],
    how: "Ad traffic lands on your Web Design pages. CRO removes the friction that kills conversions. Email captures leads who didn't buy yet.",
  },
  "Web Design": {
    feeds: ["CRO", "Analytics"],
    how: "Every design decision gets tested by CRO. User behavior on every page reports back to Analytics to inform the next iteration.",
  },
  CRO: {
    feeds: ["Paid Ads", "Web Design"],
    how: "Higher conversion rates lower your Paid Ads cost-per-lead directly. Winning variants get rolled into the Web Design baseline.",
  },
  Email: {
    feeds: ["Analytics", "Paid Ads"],
    how: "Open and click data feeds Analytics for full-funnel attribution. Engaged segments become Paid Ads lookalike audiences.",
  },
};

const HUB_CONNECTIONS = ["SEO", "Paid Ads", "Web Design", "CRO", "Email"];

// Index-aligned with the `nodes` content array
const NODE_META: { icon: LucideIcon; subtitle: string; index: string; isHub?: boolean }[] = [
  { icon: Search,            subtitle: "Organic discovery",  index: "02" }, // 0 SEO
  { icon: BarChart3,         subtitle: "Paid acquisition",   index: "03" }, // 1 Paid Ads
  { icon: Monitor,           subtitle: "Conversion surface", index: "04" }, // 2 Web Design
  { icon: Activity,          subtitle: "Intelligence layer", index: "01", isHub: true }, // 3 Analytics
  { icon: MousePointerClick, subtitle: "Friction removal",   index: "05" }, // 4 CRO
  { icon: Mail,              subtitle: "Retention engine",   index: "06" }, // 5 Email
];

const BENTO: { nodeIndex: number; hub: boolean }[] = [
  { nodeIndex: 3, hub: true  }, // Analytics — col-span-2 row-span-2
  { nodeIndex: 0, hub: false }, // SEO
  { nodeIndex: 1, hub: false }, // Paid Ads
  { nodeIndex: 2, hub: false }, // Web Design
  { nodeIndex: 4, hub: false }, // CRO
  { nodeIndex: 5, hub: false }, // Email
];

// ─── Hub cell ────────────────────────────────────────────────────────────────

function HubCell({
  label,
  active,
  reducedMotion,
}: {
  label: string;
  active: boolean;
  reducedMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-neon-cyan/28 bg-gradient-to-br from-neon-cyan/[0.11] via-neon-cyan/[0.05] to-neon-blue/[0.05] p-7 shadow-[0_0_72px_-20px_rgba(0,212,255,0.45),inset_0_1px_0_rgba(0,212,255,0.12)] md:col-span-2 md:row-span-2 md:min-h-0 md:p-10 cursor-default"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.72, ease: EASE, delay: 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient glow */}
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon-cyan/[0.09] blur-[60px]"
          animate={active ? { opacity: [0.45, 0.85, 0.45] } : { opacity: 0 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          aria-hidden
        />
      )}

      {/* Pulse rings */}
      {!reducedMotion && active && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {(
            [
              { cls: "h-40 w-40 border-neon-cyan/[0.13]", dur: 3.2, delay: 0.7 },
              { cls: "h-64 w-64 border-neon-cyan/[0.07]", dur: 4.0, delay: 1.5 },
              { cls: "h-88 w-88 border-neon-cyan/[0.04]", dur: 5.0, delay: 2.4 },
            ] as const
          ).map((ring, i) => (
            <motion.span
              key={ring.cls}
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                ring.cls
              )}
              animate={{ opacity: [0.55, 0, 0.55], scale: [1, 1.07 + i * 0.025, 1] }}
              transition={{ duration: ring.dur, delay: ring.delay, repeat: Infinity, ease: "easeOut" }}
              aria-hidden
            />
          ))}
        </div>
      )}

      {/* Live indicator — visible only on hover */}
      <div className="relative flex items-end justify-end min-h-[1rem]">
        <span
          className={cn(
            "flex items-center gap-1.5 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative h-1.5 w-1.5 rounded-full bg-neon-cyan" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-neon-cyan/55">
            Active
          </span>
        </span>
      </div>

      {/* Icon + label + hover connections */}
      <div className="relative mt-auto flex flex-col gap-5">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute inset-0 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/[0.07]" />
          <span className="absolute inset-[7px] rounded-xl border border-neon-cyan/32 bg-neon-cyan/[0.13]" />
          <Activity className="relative h-5 w-5 text-neon-cyan" strokeWidth={1.5} />
        </div>

        <div>
          <h3 className="type-subheader gradient-text">{label}</h3>
          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/28">
            Intelligence Layer
          </p>
          <p className="mt-4 max-w-[22rem] text-sm leading-relaxed text-white/42">
            Every channel reports in. Every decision is data-informed.
          </p>
        </div>

        {/* Hover reveal — powered channels */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            hovered ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden min-h-0">
            <div className="pt-4 border-t border-neon-cyan/[0.15]">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neon-cyan/50 mb-2">
                Powers all channels
              </p>
              <div className="flex flex-wrap gap-1.5">
                {HUB_CONNECTIONS.map((name) => (
                  <span
                    key={name}
                    className="rounded-md bg-neon-cyan/[0.08] border border-neon-cyan/[0.18] px-2.5 py-1 text-[10px] font-semibold text-neon-cyan/75"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Spoke cell ───────────────────────────────────────────────────────────────

function SpokeCell({
  label,
  subtitle,
  icon: Icon,
  cellDelay,
  active,
}: {
  label: string;
  subtitle: string;
  icon: LucideIcon;
  cellDelay: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const conn = CONNECTIONS[label];

  return (
    <motion.div
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-surface bg-surface-base p-6 transition-[border-color,background-color,box-shadow] duration-500 hover:border-neon-cyan/22 hover:bg-neon-cyan/[0.025] hover:shadow-[0_0_40px_-16px_rgba(0,212,255,0.25)] cursor-default"
      initial={{ opacity: 0, scale: 0.93 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.55, ease: EASE, delay: cellDelay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-neon-cyan/[0.05] blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      {/* Active indicator — hover only */}
      <div className="relative flex justify-end min-h-[1rem] mb-1">
        <span
          className={cn(
            "flex items-center gap-1.5 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative h-1.5 w-1.5 rounded-full bg-neon-cyan" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-neon-cyan/55">
            Active
          </span>
        </span>
      </div>

      {/* Content */}
      <div className="relative mt-auto flex flex-col gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface bg-surface-glass transition-all duration-500 group-hover:border-neon-cyan/20 group-hover:bg-neon-cyan/[0.08]">
          <Icon
            className="h-4 w-4 text-neon-cyan/62 transition-colors duration-500 group-hover:text-neon-cyan/90"
            strokeWidth={1.75}
          />
        </span>
        <div>
          <p className="font-bold text-white/88">{label}</p>
          <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/26 transition-colors duration-500 group-hover:text-neon-cyan/48">
            {subtitle}
          </p>
        </div>

        {/* Hover reveal — how this service connects */}
        {conn && (
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              hovered ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="overflow-hidden min-h-0">
              <div className="pt-3 border-t border-surface">
                <p className="text-[10px] leading-relaxed text-white/40 mb-2.5">
                  {conn.how}
                </p>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/25 mb-1.5">
                  Feeds into
                </p>
                <div className="flex flex-wrap gap-1">
                  {conn.feeds.map((name) => (
                    <span
                      key={name}
                      className="rounded-md bg-neon-cyan/[0.07] border border-neon-cyan/[0.14] px-2 py-0.5 text-[10px] font-semibold text-neon-cyan/65"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

type Props = { nodes: ArchitectureNode[]; caption: string };

export default function AboutArchitectureMap({ nodes }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: "-60px" });

  const cellDelays = [0, 0.15, 0.23, 0.31, 0.39, 0.47];

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
    >
      {BENTO.map(({ nodeIndex, hub }, cellIndex) => {
        const node = nodes[nodeIndex];
        const meta = NODE_META[nodeIndex];
        const Icon = meta.icon;

        if (hub) {
          return (
            <HubCell
              key={node.label}
              label={node.label}
              active={active}
              reducedMotion={reducedMotion}
            />
          );
        }

        return (
          <SpokeCell
            key={node.label}
            label={node.label}
            subtitle={meta.subtitle}
            icon={Icon}
            cellDelay={cellDelays[cellIndex] ?? 0.3}
            active={active}
          />
        );
      })}
    </div>
  );
}
