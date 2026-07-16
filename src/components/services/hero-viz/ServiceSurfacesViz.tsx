import type { ReactNode } from "react";
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

function Card({ children, chrome = true, className }: { children: ReactNode; chrome?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[170px] w-[210px] flex-col rounded-xl border-2 border-strong bg-[#0d1117] p-2.5 shadow-xl shadow-black/30 transition-colors duration-300 group-hover:border-neon-cyan/30",
        className,
      )}
    >
      {chrome && (
        <div className="mb-2 flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-400/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-green-400/40" />
          <div className="ml-1 h-1.5 flex-1 rounded-full bg-white/[0.06]" />
        </div>
      )}
      {children}
    </div>
  );
}

export default function ServiceSurfacesViz({ variant }: { variant: SurfaceVariant }) {
  switch (variant) {
    case "browser":
      return (
        <Card>
          <div className="flex flex-1 flex-col gap-1.5">
            <SkeletonLine width="lg" />
            <SkeletonLine width="md" />
            <div className="mt-auto flex gap-1.5">
              <div className="h-6 flex-1 rounded bg-neon-cyan/15" />
              <div className="h-6 w-10 rounded bg-white/[0.05]" />
            </div>
          </div>
        </Card>
      );

    case "mobile":
      return (
        <Card chrome={false} className="items-center justify-center">
          <div className="flex h-full w-[74px] flex-col rounded-[12px] border-2 border-strong bg-black/30 p-1.5">
            <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-white/15" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="h-8 rounded bg-neon-cyan/10" />
              <SkeletonLine />
              <SkeletonLine width="md" />
              <div className="mt-auto h-4 rounded bg-neon-cyan/20" />
            </div>
          </div>
        </Card>
      );

    case "serp":
      return (
        <Card>
          <div className="mb-2 flex items-center gap-1 rounded-full border border-surface bg-white/[0.03] px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full border border-muted/40" />
            <SkeletonLine width="md" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded border px-1.5 py-1",
                  i === 0 ? "border-neon-cyan/25 bg-neon-cyan/[0.05]" : "border-surface bg-white/[0.02]",
                )}
              >
                <div className="mb-1 flex items-center gap-1">
                  {i === 0 && <span className="text-[7px] font-bold text-neon-cyan">#1</span>}
                  <SkeletonLine width="md" accent={i === 0} />
                </div>
                <SkeletonLine width="lg" />
              </div>
            ))}
          </div>
        </Card>
      );

    case "map":
      return (
        <Card chrome={false} className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            {[16, 40, 64, 88, 112, 136].map((y) => (
              <div key={`h${y}`} className="absolute left-0 h-px w-full bg-white/10" style={{ top: y }} />
            ))}
            {[30, 70, 110, 150, 190].map((x) => (
              <div key={`v${x}`} className="absolute top-0 h-full w-px bg-white/10" style={{ left: x }} />
            ))}
          </div>
          <div className="relative m-auto flex h-9 w-9 items-center justify-center rounded-full bg-neon-cyan shadow-lg shadow-neon-cyan/30">
            <span className="h-3 w-3 rounded-full bg-bg" />
          </div>
          <span className="relative mt-auto text-center text-[7px] uppercase tracking-wider text-muted/50">
            Map Pack · Top 3
          </span>
        </Card>
      );

    case "stars":
      return (
        <Card>
          <div className="flex flex-1 flex-col items-center justify-center gap-2">
            <div className="flex gap-1 text-base leading-none text-amber-400">★★★★★</div>
            <div className="text-xl font-black text-white/90">4.9</div>
            <div className="flex w-full flex-col gap-1">
              {[90, 70, 50].map((w, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-[6px] text-muted/40">★</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-amber-400/60" style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      );

    case "chart":
      return (
        <Card>
          <div className="mb-1 flex items-center justify-between">
            <SkeletonLine width="sm" />
            <span className="text-[7px] font-bold text-emerald-400">▲ +38%</span>
          </div>
          <svg viewBox="0 0 180 90" className="flex-1" preserveAspectRatio="none">
            {[22, 45, 68].map((y) => (
              <line key={y} x1="0" y1={y} x2="180" y2={y} stroke="rgba(255,255,255,0.05)" />
            ))}
            <polyline
              points="4,78 36,64 68,58 100,40 132,30 176,10"
              fill="none"
              stroke="#00d4ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon points="4,78 36,64 68,58 100,40 132,30 176,10 176,90 4,90" fill="url(#surfGrad)" opacity="0.25" />
            <defs>
              <linearGradient id="surfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </Card>
      );

    case "bars":
      return (
        <Card>
          <div className="mb-2 flex items-end justify-between gap-1.5 pt-2">
            {[40, 62, 48, 78, 92].map((h, i) => (
              <div
                key={i}
                className={cn("flex-1 rounded-t", i === 4 ? "bg-neon-cyan" : "bg-neon-cyan/25")}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between border-t border-surface pt-1.5">
            <span className="text-[6px] uppercase text-muted/40">By channel</span>
            <span className="text-[8px] font-bold text-neon-cyan">Ranked</span>
          </div>
        </Card>
      );

    case "funnel":
      return (
        <Card>
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            {[100, 74, 52, 32].map((w, i) => (
              <div
                key={i}
                className="flex h-6 items-center justify-center rounded-sm border border-neon-cyan/15 bg-gradient-to-r from-neon-cyan/15 to-transparent"
                style={{ width: `${w}%` }}
              >
                <span className="text-[6px] font-mono font-bold text-neon-cyan">
                  {["100%", "48%", "19%", "6%"][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      );

    case "email":
      return (
        <Card>
          <div className="flex flex-1 flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-1.5 rounded border px-1.5 py-1.5",
                  i === 0 ? "border-neon-cyan/25 bg-neon-cyan/[0.05]" : "border-surface bg-white/[0.02]",
                )}
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neon-cyan/10 text-[8px] text-neon-cyan/70">
                  ✉
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <SkeletonLine width="md" accent={i === 0} />
                  <SkeletonLine width="lg" />
                </div>
                {i === 0 && <span className="text-[6px] font-bold text-emerald-400">42%</span>}
              </div>
            ))}
          </div>
        </Card>
      );

    case "flow":
      return (
        <Card>
          <div className="flex flex-1 flex-col items-center justify-center gap-0.5">
            {["Trigger", "Email", "Wait", "Deal"].map((label, i) => (
              <div key={label} className="flex w-full flex-col items-center">
                <div
                  className={cn(
                    "flex w-full items-center gap-1.5 rounded-md border px-2 py-1",
                    i === 0 || i === 3
                      ? "border-neon-cyan/35 bg-neon-cyan/[0.08]"
                      : "border-surface bg-white/[0.02]",
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", i === 0 || i === 3 ? "bg-neon-cyan" : "bg-white/25")} />
                  <span className="text-[7px] text-white/70">{label}</span>
                </div>
                {i < 3 && <div className="h-1.5 w-px bg-neon-cyan/30" />}
              </div>
            ))}
          </div>
        </Card>
      );

    case "video":
      return (
        <Card>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded bg-black/40">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-cyan/90">
              <div className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-bg" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div className="h-full w-[42%] bg-neon-cyan" />
            </div>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <SkeletonLine width="md" />
            <span className="text-[7px] font-bold text-neon-cyan">1.2M</span>
          </div>
        </Card>
      );

    case "social":
      return (
        <Card>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue" />
            <div className="flex flex-1 flex-col gap-1">
              <SkeletonLine width="sm" />
              <SkeletonLine width="md" />
            </div>
          </div>
          <div className="my-1.5 h-12 rounded bg-neon-cyan/10" />
          <div className="mt-auto flex items-center gap-3 text-[8px] text-muted/50">
            <span className="text-neon-cyan">♥ 2.4k</span>
            <span>💬 180</span>
            <span>↗ 96</span>
          </div>
        </Card>
      );

    case "calendar":
      return (
        <Card>
          <div className="mb-1 flex justify-between">
            {["M", "T", "W", "T", "F"].map((d, i) => (
              <span key={i} className="w-[18%] text-center text-[6px] text-muted/40">
                {d}
              </span>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-5 gap-1">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded",
                  [1, 4, 7, 9, 12].includes(i) ? "bg-neon-cyan/40" : "bg-white/[0.04]",
                )}
              />
            ))}
          </div>
        </Card>
      );

    case "doc":
      return (
        <Card>
          <SkeletonLine width="lg" accent />
          <div className="mt-2 flex flex-1 flex-col gap-1.5">
            <SkeletonLine />
            <SkeletonLine width="lg" />
            <SkeletonLine />
            <SkeletonLine width="md" />
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-surface pt-1.5">
            <span className="text-[6px] uppercase text-muted/40">Readability</span>
            <span className="text-[7px] font-bold text-emerald-400">Clear</span>
          </div>
        </Card>
      );

    case "palette":
      return (
        <Card>
          <div className="mb-2 flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue text-[10px] font-black text-bg">
              K
            </div>
            <SkeletonLine width="md" />
          </div>
          <div className="flex gap-1.5">
            {["#00d4ff", "#0099cc", "#0033aa", "#ffffff", "#00b8d9"].map((c) => (
              <div key={c} className="h-8 flex-1 rounded border border-strong" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="mt-auto flex items-baseline gap-2 pt-2">
            <span className="text-sm font-bold text-white/90">Aa</span>
            <span className="text-[8px] text-muted/60">The quick brown fox</span>
          </div>
        </Card>
      );

    case "gauge":
      return (
        <Card className="items-center justify-center" chrome={false}>
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#34d399"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={214}
                strokeDashoffset={214 * 0.04}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-lg font-black text-emerald-400">98</span>
              <span className="text-[6px] uppercase tracking-wider text-muted/40">score</span>
            </div>
          </div>
          <span className="mt-2 text-[7px] uppercase tracking-wider text-muted/50">Core Web Vitals</span>
        </Card>
      );

    case "cart":
      return (
        <Card>
          <div className="grid flex-1 grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1 rounded border border-surface bg-white/[0.02] p-1">
                <div className="h-6 rounded bg-neon-cyan/10" />
                <SkeletonLine width="lg" />
                <span className="text-[6px] font-bold text-neon-cyan">$4{i}9</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1 rounded bg-neon-cyan/90 py-1 text-[7px] font-bold uppercase text-bg">
            🛒 Add to Cart
          </div>
        </Card>
      );

    case "shield":
      return (
        <Card className="items-center justify-center" chrome={false}>
          <svg viewBox="0 0 64 72" className="h-16 w-16">
            <path
              d="M32 4 L58 14 V36 C58 54 46 64 32 68 C18 64 6 54 6 36 V14 Z"
              fill="rgba(0,212,255,0.08)"
              stroke="#00d4ff"
              strokeWidth="2.5"
            />
            <path d="M22 36 l7 8 l14 -17" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="mt-2 text-[7px] uppercase tracking-wider text-muted/50">Protected · Monitored</span>
        </Card>
      );

    case "adslot":
      return (
        <Card>
          <div className="mb-2 flex items-center gap-1 rounded-full border border-surface bg-white/[0.03] px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full border border-muted/40" />
            <SkeletonLine width="md" />
          </div>
          <div className="rounded border border-neon-cyan/25 bg-neon-cyan/[0.05] px-1.5 py-1.5">
            <div className="mb-1 flex items-center gap-1">
              <span className="rounded-sm bg-neon-cyan/20 px-1 text-[5px] font-bold uppercase text-neon-cyan">Ad</span>
              <SkeletonLine width="md" accent />
            </div>
            <SkeletonLine width="lg" />
          </div>
          <div className="mt-1.5 flex flex-col gap-1 rounded border border-surface bg-white/[0.02] px-1.5 py-1.5">
            <SkeletonLine width="md" />
            <SkeletonLine width="lg" />
          </div>
          <span className="mt-auto pt-1.5 text-[6px] uppercase tracking-wider text-muted/40">Top of results</span>
        </Card>
      );

    case "cursor":
      return (
        <Card>
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-2">
            <SkeletonLine width="md" />
            <div className="relative">
              <div className="flex h-7 w-32 items-center justify-center rounded-lg bg-neon-cyan/90 text-[8px] font-bold uppercase text-bg">
                Get Started
              </div>
              <svg viewBox="0 0 24 24" className="absolute -bottom-3 -right-2 h-5 w-5" fill="white">
                <path d="M4 2 L4 18 L9 14 L12 21 L15 20 L12 13 L18 13 Z" />
              </svg>
            </div>
            <span className="text-[6px] uppercase tracking-wider text-muted/40">One clear action</span>
          </div>
        </Card>
      );

    default:
      return <Card>{null}</Card>;
  }
}
