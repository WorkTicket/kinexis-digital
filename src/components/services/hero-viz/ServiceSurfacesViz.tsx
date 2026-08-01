"use client";

import { useId, type ReactNode } from "react";
import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import { SkeletonLine } from "./ServiceHeroVizParts";

export type SurfaceVariant =
  | "browser"
  | "mobile"
  | "serp"
  | "map"
  | "stars"
  | "chart"
  | "bars"
  | "funnel"
  | "email"
  | "flow"
  | "video"
  | "social"
  | "calendar"
  | "doc"
  | "palette"
  | "gauge"
  | "cart"
  | "shield"
  | "adslot"
  | "cursor";

type CardProps = {
  children: ReactNode;
  chrome?: boolean;
  className?: string;
  delay?: number;
};

function Card({ children, chrome = true, className, delay = 0.2 }: CardProps) {
  return (
    <motion.div
      className={cn(
        "viz-frame group/card relative flex h-[210px] w-[240px] flex-col overflow-hidden rounded-[14px] border border-white/[0.1] bg-[linear-gradient(165deg,rgba(22,28,40,0.98)_0%,rgba(10,12,18,0.98)_100%)] p-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)_inset] transition-[border-color,box-shadow] duration-300 group-hover:border-neon-cyan/40 group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_28px_rgba(0,212,255,0.12)]",
        className,
      )}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {chrome && (
        <div className="mb-2.5 flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]/75" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]/75" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]/75" />
          <div className="ml-1 h-4 flex-1 rounded-md border border-white/[0.06] bg-black/30" />
        </div>
      )}
      {children}
    </motion.div>
  );
}

function NavBar() {
  return (
    <div className="mb-2 flex items-center justify-between border-b border-white/[0.06] pb-1.5">
      <div className="flex items-center gap-1.5">
        <div className="h-3.5 w-3.5 rounded bg-neon-cyan/25" />
        <SkeletonLine width="sm" className="h-1" />
      </div>
      <div className="flex gap-1">
        <div className="h-1 w-4 rounded-full bg-white/10" />
        <div className="h-1 w-4 rounded-full bg-white/10" />
        <div className="h-1 w-5 rounded-full bg-neon-cyan/30" />
      </div>
    </div>
  );
}

function ChartSurface({ delay }: { delay: number }) {
  const gradId = useId().replace(/:/g, "");
  return (
    <Card delay={delay}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[8px] font-semibold text-white/70">Performance</span>
        <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[7px] font-bold text-emerald-400">
          ▲ +38%
        </span>
      </div>
      <svg viewBox="0 0 180 100" className="flex-1" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="180" y2={y} stroke="rgba(255,255,255,0.05)" />
        ))}
        <polygon points="4,86 32,72 60,66 92,48 124,34 176,12 176,100 4,100" fill={`url(#${gradId})`} />
        <polyline
          points="4,86 32,72 60,66 92,48 124,34 176,12"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="176" cy="12" r="3.5" fill="#00d4ff" />
      </svg>
      <div className="mt-1 flex justify-between text-[6px] uppercase tracking-wider text-muted/40">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Now</span>
      </div>
    </Card>
  );
}

export default function ServiceSurfacesViz({
  variant,
  delay = 0.2,
}: {
  variant: SurfaceVariant;
  delay?: number;
}) {
  switch (variant) {
    case "browser":
      return (
        <Card delay={delay}>
          <div className="mb-2 flex items-center justify-between border-b border-white/[0.07] pb-2">
            <div className="flex items-center gap-1.5">
              <div className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-neon-cyan to-neon-blue text-[7px] font-black text-bg">
                B
              </div>
              <span className="text-[9px] font-semibold text-white/70">Brand</span>
            </div>
            <span className="rounded bg-neon-cyan/20 px-1.5 py-0.5 text-[8px] font-semibold text-neon-cyan">Contact</span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="text-[11px] font-bold leading-tight text-white/90">Websites that convert</div>
            <div className="text-[9px] text-white/40">Designed for leads, not looks.</div>
            <div className="mt-1 grid flex-1 grid-cols-3 gap-1.5">
              <div className="rounded-md bg-gradient-to-br from-neon-cyan/20 to-transparent" />
              <div className="rounded-md border border-white/[0.05] bg-white/[0.03]" />
              <div className="rounded-md border border-white/[0.05] bg-white/[0.03]" />
            </div>
            <div className="mt-auto flex gap-1.5">
              <div className="flex h-7 flex-1 items-center justify-center rounded-lg bg-neon-cyan text-[8px] font-bold uppercase tracking-wide text-bg shadow-[0_0_12px_rgba(0,212,255,0.25)]">
                Get a Quote
              </div>
              <div className="flex h-7 w-12 items-center justify-center rounded-lg border border-white/10 text-[8px] text-white/40">
                Demo
              </div>
            </div>
          </div>
        </Card>
      );

    case "mobile":
      return (
        <Card chrome={false} className="items-center justify-center" delay={delay}>
          <div className="flex h-full w-[88px] flex-col rounded-[16px] border-[2.5px] border-strong bg-black/40 p-1.5 shadow-inner">
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
            <div className="flex flex-1 flex-col gap-1.5 overflow-hidden rounded-[10px] bg-white/[0.03] p-1.5">
              <div className="h-10 rounded-md bg-neon-cyan/15" />
              <SkeletonLine className="h-1" />
              <SkeletonLine width="md" className="h-1" />
              <div className="mt-auto space-y-1">
                <div className="h-5 rounded-md bg-neon-cyan/25" />
                <div className="mx-auto h-0.5 w-8 rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        </Card>
      );

    case "serp":
      return (
        <Card delay={delay}>
          <div className="mb-2.5 flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-black/30 px-2.5 py-1.5">
            <span className="h-2 w-2 rounded-full border border-white/30" />
            <span className="text-[9px] text-white/45">your service near me</span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            {[
              { rank: "#1", title: "Best Local Service", url: "yoursite.com", top: true },
              { rank: "#2", title: "Competitor Listing", url: "competitor.com", top: false },
              { rank: "#3", title: "Another Result", url: "other.com", top: false },
            ].map((row) => (
              <div
                key={row.rank}
                className={cn(
                  "rounded-md border px-2 py-1.5",
                  row.top ? "border-neon-cyan/30 bg-neon-cyan/[0.07]" : "border-white/[0.05] bg-white/[0.02]",
                )}
              >
                <div className="mb-0.5 flex items-center gap-1.5">
                  {row.top && (
                    <span className="rounded bg-neon-cyan/20 px-1 text-[7px] font-black text-neon-cyan">{row.rank}</span>
                  )}
                  <span className={cn("truncate text-[9px] font-semibold", row.top ? "text-[#8ab4f8]" : "text-white/50")}>
                    {row.title}
                  </span>
                </div>
                <div className={cn("truncate text-[8px]", row.top ? "text-emerald-400/80" : "text-white/25")}>
                  {row.url}
                </div>
              </div>
            ))}
          </div>
        </Card>
      );

    case "map":
      return (
        <Card chrome={false} className="relative overflow-hidden" delay={delay}>
          <div className="absolute inset-0 opacity-25">
            {[20, 48, 76, 104, 132, 160].map((y) => (
              <div key={`h${y}`} className="absolute left-0 h-px w-full bg-white/15" style={{ top: y }} />
            ))}
            {[36, 80, 124, 168, 210].map((x) => (
              <div key={`v${x}`} className="absolute top-0 h-full w-px bg-white/15" style={{ left: x }} />
            ))}
          </div>
          <div className="absolute left-6 top-8 h-2 w-16 rounded-full bg-white/10" />
          <div className="absolute right-8 top-14 h-2 w-10 rounded-full bg-white/10" />
          <div className="relative m-auto flex flex-col items-center">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-cyan shadow-lg shadow-neon-cyan/40"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.25, type: "spring", stiffness: 260 }}
            >
              <span className="h-3.5 w-3.5 rounded-full bg-bg" />
            </motion.div>
            <div className="mt-2 rounded-md border border-neon-cyan/25 bg-bg/80 px-2 py-1 backdrop-blur-sm">
              <div className="text-[7px] font-bold text-white/90">Your Business</div>
              <div className="text-[6px] text-neon-cyan">Map Pack · #2</div>
            </div>
          </div>
          <span className="relative mt-auto text-center text-[7px] uppercase tracking-wider text-muted/50">
            Local pack · Top 3
          </span>
        </Card>
      );

    case "stars":
      return (
        <Card delay={delay}>
          <div className="flex flex-1 flex-col items-center justify-center gap-2.5">
            <div className="flex gap-1 text-lg leading-none text-amber-400">★★★★★</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white/90">4.9</span>
              <span className="text-[8px] text-muted/50">/ 5.0</span>
            </div>
            <div className="w-full space-y-1.5">
              {[
                { w: 92, label: "5" },
                { w: 68, label: "4" },
                { w: 28, label: "3" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-1.5">
                  <span className="w-2 text-[6px] text-muted/50">{row.label}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full bg-amber-400/70"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.w}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: delay + 0.2, duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <span className="text-[7px] text-muted/45">128 reviews this quarter</span>
          </div>
        </Card>
      );

    case "chart":
      return <ChartSurface delay={delay} />;

    case "bars":
      return (
        <Card delay={delay}>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-white/70">By channel</span>
            <span className="text-[7px] font-bold text-neon-cyan">Ranked</span>
          </div>
          <div className="flex flex-1 items-end justify-between gap-2 pt-2">
            {[
              { h: 42, label: "Org" },
              { h: 64, label: "Paid" },
              { h: 50, label: "Soc" },
              { h: 82, label: "Email" },
              { h: 96, label: "Ref" },
            ].map((bar, i) => (
              <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                <motion.div
                  className={cn("w-full rounded-t-md", i === 4 ? "bg-neon-cyan" : "bg-neon-cyan/30")}
                  initial={{ height: 0 }}
                  whileInView={{ height: bar.h }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + i * 0.06, duration: 0.45 }}
                />
                <span className="text-[5px] uppercase text-muted/40">{bar.label}</span>
              </div>
            ))}
          </div>
        </Card>
      );

    case "funnel":
      return (
        <Card delay={delay}>
          <div className="mb-1.5 text-[8px] font-semibold text-white/70">Conversion path</div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1.5">
            {[
              { w: 100, rate: "100%", label: "Visitors" },
              { w: 74, rate: "48%", label: "Engaged" },
              { w: 52, rate: "19%", label: "Leads" },
              { w: 30, rate: "6%", label: "Closed" },
            ].map((step, i) => (
              <motion.div
                key={step.label}
                className="flex h-7 items-center justify-between rounded-md border border-neon-cyan/20 bg-gradient-to-r from-neon-cyan/20 to-transparent px-2"
                style={{ width: `${step.w}%` }}
                initial={{ opacity: 0, scaleX: 0.7 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + i * 0.08 }}
              >
                <span className="text-[6px] text-white/60">{step.label}</span>
                <span className="text-[7px] font-mono font-bold text-neon-cyan">{step.rate}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      );

    case "email":
      return (
        <Card delay={delay}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-white/70">Inbox</span>
            <span className="text-[7px] font-bold text-emerald-400">42% open</span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            {[
              { accent: true, subject: true },
              { accent: false, subject: false },
              { accent: false, subject: false },
            ].map((row, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 rounded-md border px-2 py-1.5",
                  row.accent ? "border-neon-cyan/30 bg-neon-cyan/[0.07]" : "border-surface bg-white/[0.02]",
                )}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neon-cyan/15">
                  <svg viewBox="0 0 16 16" className="h-3 w-3 text-neon-cyan/80" fill="currentColor">
                    <path d="M1.5 3.5A1.5 1.5 0 0 1 3 2h10a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 13 14H3a1.5 1.5 0 0 1-1.5-1.5v-9Zm1.2.4 5.05 3.6a.5.5 0 0 0 .55 0l5.05-3.6H2.7Zm10.8 1.4-4.7 3.35a1.5 1.5 0 0 1-1.6 0L2.5 5.3v6.7c0 .28.22.5.5.5h10c.28 0 .5-.22.5-.5V5.3Z" />
                  </svg>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <SkeletonLine width="md" accent={row.accent} className="h-1" />
                  <SkeletonLine width="lg" className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      );

    case "flow":
      return (
        <Card delay={delay}>
          <div className="mb-1 text-[8px] font-semibold text-white/70">Automation</div>
          <div className="flex flex-1 flex-col items-center justify-center gap-0.5">
            {["Trigger", "Email", "Wait 2d", "Deal"].map((label, i) => (
              <div key={label} className="flex w-full flex-col items-center">
                <div
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md border px-2.5 py-1.5",
                    i === 0 || i === 3
                      ? "border-neon-cyan/40 bg-neon-cyan/[0.1]"
                      : "border-surface bg-white/[0.025]",
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      i === 0 || i === 3 ? "bg-neon-cyan shadow-sm shadow-neon-cyan/50" : "bg-white/25",
                    )}
                  />
                  <span className="text-[8px] text-white/75">{label}</span>
                  {(i === 0 || i === 3) && (
                    <span className="ml-auto text-[6px] font-bold uppercase text-neon-cyan/70">
                      {i === 0 ? "Start" : "Done"}
                    </span>
                  )}
                </div>
                {i < 3 && <div className="h-2 w-px bg-neon-cyan/35" />}
              </div>
            ))}
          </div>
        </Card>
      );

    case "video":
      return (
        <Card delay={delay}>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-black/50 to-neon-cyan/10">
            <div className="absolute inset-2 rounded border border-white/[0.04]" />
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neon-cyan shadow-lg shadow-neon-cyan/30"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.15, type: "spring" }}
            >
              <div className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-bg" />
            </motion.div>
            <div className="absolute bottom-2 left-2 right-2">
              <div className="mb-1 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[42%] rounded-full bg-neon-cyan" />
              </div>
              <div className="flex justify-between text-[6px] text-white/40">
                <span>0:48</span>
                <span>1:54</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <SkeletonLine width="md" className="h-1" />
            <span className="text-[8px] font-bold text-neon-cyan">1.2M</span>
          </div>
        </Card>
      );

    case "social":
      return (
        <Card delay={delay}>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue" />
            <div className="flex flex-1 flex-col gap-1">
              <SkeletonLine width="sm" className="h-1" />
              <span className="text-[6px] text-muted/45">Sponsored</span>
            </div>
            <span className="text-[8px] text-muted/30">···</span>
          </div>
          <div className="my-2 h-16 overflow-hidden rounded-lg bg-gradient-to-br from-neon-cyan/20 via-neon-cyan/5 to-transparent">
            <div className="flex h-full items-end p-2">
              <SkeletonLine width="md" className="h-1 bg-white/20" />
            </div>
          </div>
          <div className="mt-auto flex items-center gap-3 text-[8px]">
            <span className="font-semibold text-neon-cyan">♥ 2.4k</span>
            <span className="text-muted/50">💬 180</span>
            <span className="text-muted/50">↗ 96</span>
          </div>
        </Card>
      );

    case "calendar":
      return (
        <Card delay={delay}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-white/70">This week</span>
            <span className="text-[7px] text-neon-cyan">5 live</span>
          </div>
          <div className="mb-1.5 grid grid-cols-5 gap-1">
            {["M", "T", "W", "T", "F"].map((d, i) => (
              <span key={`${d}-${i}`} className="text-center text-[6px] text-muted/45">
                {d}
              </span>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-5 gap-1">
            {Array.from({ length: 15 }).map((_, i) => {
              const active = [1, 4, 7, 9, 12].includes(i);
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-md",
                    active ? "bg-neon-cyan/45 ring-1 ring-neon-cyan/30" : "bg-white/[0.04]",
                  )}
                />
              );
            })}
          </div>
        </Card>
      );

    case "doc":
      return (
        <Card delay={delay}>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-5 w-4 rounded-sm border border-neon-cyan/30 bg-neon-cyan/10" />
            <SkeletonLine width="md" accent className="h-1.5" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <SkeletonLine className="h-1" />
            <SkeletonLine width="lg" className="h-1" />
            <SkeletonLine className="h-1" />
            <SkeletonLine width="md" className="h-1" />
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              <div className="h-8 rounded-md border border-surface bg-white/[0.02]" />
              <div className="h-8 rounded-md border border-surface bg-white/[0.02]" />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-surface pt-2">
            <span className="text-[6px] uppercase tracking-wider text-muted/40">Readability</span>
            <span className="text-[7px] font-bold text-emerald-400">Clear</span>
          </div>
        </Card>
      );

    case "palette":
      return (
        <Card delay={delay}>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue text-[11px] font-black text-bg shadow-md shadow-neon-cyan/20">
              K
            </div>
            <div className="flex flex-col gap-1">
              <SkeletonLine width="md" className="h-1.5" />
              <span className="text-[6px] uppercase tracking-wider text-muted/40">Brand system</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {["#00d4ff", "#0099cc", "#0033aa", "#e8eef5", "#00b8d9"].map((c) => (
              <div
                key={c}
                className="h-9 flex-1 rounded-md border border-strong shadow-inner"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="mt-auto flex items-baseline gap-2.5 pt-3">
            <span className="text-base font-bold text-white/90">Aa</span>
            <span className="text-[8px] text-muted/55">The quick brown fox</span>
          </div>
        </Card>
      );

    case "gauge":
      return (
        <Card className="items-center justify-center" chrome={false} delay={delay}>
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#34d399"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={214}
                initial={{ strokeDashoffset: 214 }}
                whileInView={{ strokeDashoffset: 214 * 0.04 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-emerald-400">98</span>
              <span className="text-[6px] uppercase tracking-wider text-muted/40">score</span>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {["LCP", "INP", "CLS"].map((m) => (
              <span
                key={m}
                className="rounded border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[6px] font-bold text-emerald-400"
              >
                {m}
              </span>
            ))}
          </div>
          <span className="mt-2 text-[7px] uppercase tracking-wider text-muted/50">Core Web Vitals</span>
        </Card>
      );

    case "cart":
      return (
        <Card delay={delay}>
          <div className="mb-1.5 text-[8px] font-semibold text-white/70">Shopping</div>
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1 rounded-md border border-surface bg-white/[0.025] p-1.5">
                <div className="h-7 rounded bg-neon-cyan/12" />
                <SkeletonLine width="lg" className="h-1" />
                <span className="text-[7px] font-bold text-neon-cyan">${40 + i}9</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-neon-cyan/90 py-1.5 text-[7px] font-bold uppercase tracking-wide text-bg">
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
              <path d="M1 1.5h1.4l.4 1.2L4.2 9h7.3l1.8-5.5H4.1L3.6 2H1v1.5zm3.5 9a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm6.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
            </svg>
            Add to Cart
          </div>
        </Card>
      );

    case "shield":
      return (
        <Card className="items-center justify-center" chrome={false} delay={delay}>
          <svg viewBox="0 0 64 72" className="h-20 w-20">
            <path
              d="M32 4 L58 14 V36 C58 54 46 64 32 68 C18 64 6 54 6 36 V14 Z"
              fill="rgba(0,212,255,0.1)"
              stroke="#00d4ff"
              strokeWidth="2.5"
            />
            <motion.path
              d="M22 36 l7 8 l14 -17"
              fill="none"
              stroke="#34d399"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3, duration: 0.5 }}
            />
          </svg>
          <span className="mt-3 text-[8px] font-semibold text-white/70">Protected</span>
          <span className="mt-1 text-[7px] uppercase tracking-wider text-muted/50">Monitored · Backed up</span>
        </Card>
      );

    case "adslot":
      return (
        <Card delay={delay}>
          <div className="mb-2.5 flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-black/30 px-2.5 py-1.5">
            <span className="h-2 w-2 rounded-full border border-white/30" />
            <span className="text-[9px] text-white/45">buy now</span>
          </div>
          <div className="rounded-md border border-neon-cyan/30 bg-neon-cyan/[0.07] px-2 py-2">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="rounded-sm bg-neon-cyan/25 px-1 py-0.5 text-[7px] font-bold uppercase text-neon-cyan">
                Ad
              </span>
              <span className="truncate text-[9px] font-semibold text-[#8ab4f8]">Get a Free Quote Today</span>
            </div>
            <div className="text-[8px] leading-snug text-white/45">Trusted local pros · Same-day response</div>
            <div className="mt-1 text-[8px] text-emerald-400/80">www.yoursite.com</div>
          </div>
          <div className="mt-1.5 rounded-md border border-white/[0.05] bg-white/[0.02] px-2 py-1.5">
            <div className="truncate text-[9px] text-white/45">Organic result below</div>
            <div className="truncate text-[8px] text-white/25">competitor.com</div>
          </div>
          <span className="mt-auto pt-2 text-[8px] uppercase tracking-wider text-white/30">Top of results</span>
        </Card>
      );

    case "cursor":
      return (
        <Card delay={delay}>
          <NavBar />
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-2">
            <SkeletonLine width="md" className="h-1.5" />
            <div className="relative">
              <motion.div
                className="flex h-8 w-36 items-center justify-center rounded-lg bg-neon-cyan text-[8px] font-bold uppercase tracking-wide text-bg shadow-lg shadow-neon-cyan/25"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                Get Started
              </motion.div>
              <motion.svg
                viewBox="0 0 24 24"
                className="absolute -bottom-3 -right-3 h-6 w-6 drop-shadow"
                fill="white"
                initial={{ opacity: 0, x: 8, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.35 }}
              >
                <path d="M4 2 L4 18 L9 14 L12 21 L15 20 L12 13 L18 13 Z" />
              </motion.svg>
            </div>
            <span className="text-[7px] uppercase tracking-wider text-muted/40">One clear action</span>
          </div>
        </Card>
      );

    default:
      return <Card delay={delay}>{null}</Card>;
  }
}
