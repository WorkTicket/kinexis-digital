"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Premium stage — bloom atmosphere + taller canvas for readable detail. */
export function HeroVizShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("hero-viz-shell relative flex h-[260px] w-full items-center justify-center", className)}>
      <div className="hero-viz-bloom pointer-events-none absolute inset-[16%] rounded-full opacity-45" aria-hidden />
      {children}
    </div>
  );
}

export function HeroVizStage({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative flex w-full items-end justify-center gap-2", className)}>{children}</div>;
}

type MotionWrapProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  initial?: { opacity?: number; y?: number; x?: number; scale?: number };
  animate?: { opacity?: number; y?: number; x?: number; scale?: number };
  transition?: { duration?: number; delay?: number; type?: string };
};

function MotionWrap({ children, className, delay = 0.5, initial, animate, transition }: MotionWrapProps) {
  return (
    <motion.div
      className={className}
      initial={initial ?? { opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={animate ?? { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={transition ?? { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BrowserChrome({ className, url }: { className?: string; url?: string }) {
  return (
    <div className={cn("mb-2 space-y-1.5", className)}>
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-[#ff5f57]/80 shadow-[0_0_6px_rgba(255,95,87,0.35)]" />
        <div className="h-2 w-2 rounded-full bg-[#febc2e]/80 shadow-[0_0_6px_rgba(254,188,46,0.3)]" />
        <div className="h-2 w-2 rounded-full bg-[#28c840]/80 shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
        <div className="ml-1.5 flex h-5 flex-1 items-center rounded-md border border-white/[0.06] bg-black/35 px-2">
          <span className="truncate text-[9px] text-white/35">{url ?? "kinexisdigital.com"}</span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonLine({
  width = "full",
  accent,
  className,
}: {
  width?: "full" | "lg" | "md" | "sm";
  accent?: boolean;
  className?: string;
}) {
  const w = width === "lg" ? "w-[72%]" : width === "md" ? "w-[55%]" : width === "sm" ? "w-[38%]" : "w-full";
  return (
    <div
      className={cn(
        "h-1.5 rounded-full",
        accent
          ? "bg-gradient-to-r from-neon-cyan/40 to-neon-cyan/10"
          : "bg-gradient-to-r from-white/14 to-white/[0.05]",
        w,
        className,
      )}
    />
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-br from-neon-cyan/18 via-neon-cyan/[0.06] to-transparent",
        className,
      )}
    />
  );
}

/** Readable site nav strip for mock interiors. */
export function FakeNav({ brand = "Brand", className }: { brand?: string; className?: string }) {
  return (
    <div className={cn("mb-2 flex items-center justify-between border-b border-white/[0.07] pb-2", className)}>
      <div className="flex items-center gap-1.5">
        <div className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-neon-cyan to-neon-blue text-[7px] font-black text-bg">
          {brand.charAt(0)}
        </div>
        <span className="text-[9px] font-semibold text-white/75">{brand}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[8px] text-white/30">Work</span>
        <span className="text-[8px] text-white/30">About</span>
        <span className="rounded bg-neon-cyan/20 px-1.5 py-0.5 text-[8px] font-semibold text-neon-cyan">Contact</span>
      </div>
    </div>
  );
}

export function FakeHeadline({
  line1 = "Grow faster",
  line2,
  className,
}: {
  line1?: string;
  line2?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="text-[11px] font-bold leading-tight text-white/90">{line1}</div>
      {line2 ? <div className="text-[10px] leading-snug text-white/45">{line2}</div> : null}
    </div>
  );
}

export function FakeButton({
  label = "Get Started",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-7 items-center justify-center rounded-lg bg-neon-cyan text-[9px] font-bold uppercase tracking-wide text-bg shadow-[0_0_16px_rgba(0,212,255,0.25)]",
        className,
      )}
    >
      {label}
    </div>
  );
}

export function MetricPill({
  label,
  value,
  accent = "cyan",
  className,
}: {
  label: string;
  value: string;
  accent?: "cyan" | "emerald";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-2 py-1 text-center",
        accent === "emerald"
          ? "border-emerald-400/25 bg-emerald-400/10"
          : "border-neon-cyan/25 bg-neon-cyan/10",
        className,
      )}
    >
      <div className="text-[7px] uppercase tracking-wider text-muted/50">{label}</div>
      <div
        className={cn(
          "text-[11px] font-black tabular-nums",
          accent === "emerald" ? "text-emerald-400" : "text-neon-cyan",
        )}
      >
        {value}
      </div>
    </div>
  );
}

const frameBase =
  "viz-frame relative overflow-hidden rounded-[14px] border bg-[linear-gradient(165deg,rgba(22,28,40,0.98)_0%,rgba(10,12,18,0.98)_100%)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)_inset]";

type BrowserFrameProps = {
  children: ReactNode;
  label?: string;
  delay?: number;
  className?: string;
  frameClassName?: string;
  highlight?: boolean;
  interactive?: boolean;
  url?: string;
};

export function BrowserFrame({
  children,
  label,
  delay = 0.5,
  className,
  frameClassName,
  highlight = false,
  interactive = false,
  url,
}: BrowserFrameProps) {
  return (
    <MotionWrap delay={delay} className={cn("flex shrink-0 flex-col items-center", className)}>
      <div
        className={cn(
          frameBase,
          "p-2.5",
          highlight
            ? "border-neon-cyan/40 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_32px_rgba(0,212,255,0.12)]"
            : "border-white/[0.1]",
          interactive && "hero-viz-interactive",
          frameClassName ?? "h-[150px] w-[210px]",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <BrowserChrome url={url} />
        <div
          className={cn(
            "flex flex-col gap-1.5 overflow-hidden rounded-lg border border-white/[0.04] p-2 transition-colors duration-300",
            highlight ? "bg-neon-cyan/[0.045]" : "bg-white/[0.025]",
            interactive && "group-hover:bg-neon-cyan/[0.05]",
          )}
          style={{ height: "calc(100% - 32px)" }}
        >
          {children}
        </div>
      </div>
      {label && <FrameLabel>{label}</FrameLabel>}
    </MotionWrap>
  );
}

type DeviceFrameProps = {
  children: ReactNode;
  label?: string;
  variant?: "mobile" | "tablet";
  delay?: number;
  className?: string;
  frameClassName?: string;
  highlight?: boolean;
  interactive?: boolean;
};

export function DeviceFrame({
  children,
  label,
  variant = "mobile",
  delay = 0.8,
  className,
  frameClassName,
  highlight = false,
  interactive = false,
}: DeviceFrameProps) {
  const isMobile = variant === "mobile";
  return (
    <MotionWrap delay={delay} className={cn("flex shrink-0 flex-col items-center", className)}>
      <div
        className={cn(
          frameBase,
          highlight
            ? "border-neon-cyan/40 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_28px_rgba(0,212,255,0.12)]"
            : "border-white/[0.12]",
          interactive && "hero-viz-interactive",
          isMobile ? "rounded-[18px] p-1.5" : "rounded-[14px] p-2",
          frameClassName ?? (isMobile ? "h-[120px] w-[62px]" : "h-[105px] w-[78px]"),
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div
          className={cn(
            "mx-auto rounded-full bg-white/15",
            isMobile ? "mb-1.5 h-1 w-7" : "mb-1 h-0.5 w-4",
          )}
        />
        <div
          className={cn(
            "flex flex-col gap-1 overflow-hidden rounded-[10px] border border-white/[0.04] bg-black/25 p-1.5 transition-colors duration-300",
            interactive && "group-hover:bg-neon-cyan/[0.04]",
            isMobile ? "h-[calc(100%-22px)]" : "h-[calc(100%-14px)]",
          )}
        >
          {children}
        </div>
        {isMobile ? (
          <div className="mx-auto mt-1 h-0.5 w-8 rounded-full bg-white/20" />
        ) : null}
      </div>
      {label && <FrameLabel>{label}</FrameLabel>}
    </MotionWrap>
  );
}

export function FrameLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.14em] text-white/35">
      {children}
    </span>
  );
}

type FloatingBadgeProps = {
  label: string;
  value: string;
  position?: "top-right" | "top-left" | "bottom-left" | "bottom-right";
  accent?: "cyan" | "emerald";
  delay?: number;
};

export function FloatingBadge({
  label,
  value,
  position = "top-right",
  accent = "cyan",
  delay = 1.2,
}: FloatingBadgeProps) {
  const pos = {
    "top-right": "right-1 top-1",
    "top-left": "left-1 top-1",
    "bottom-left": "left-1 bottom-5",
    "bottom-right": "right-1 bottom-5",
  }[position];

  return (
    <MotionWrap
      delay={delay}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "absolute z-10 rounded-lg border px-2.5 py-1.5 bg-bg/90",
        accent === "emerald"
          ? "border-emerald-400/25 text-emerald-400"
          : "border-neon-cyan/25 text-neon-cyan",
        pos,
      )}
    >
      <div className="text-[8px] font-medium uppercase tracking-wider text-muted/60">{label}</div>
      <div
        className={cn(
          "text-[12px] font-bold tabular-nums",
          accent === "emerald" ? "text-emerald-400" : "text-neon-cyan",
        )}
      >
        {value}
      </div>
    </MotionWrap>
  );
}

export function PanelShell({
  children,
  label,
  delay = 0.5,
  className,
  frameClassName,
}: {
  children: ReactNode;
  label?: string;
  delay?: number;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <MotionWrap delay={delay} className={cn("flex shrink-0 flex-col items-center", className)}>
      <div
        className={cn(
          frameBase,
          "border-white/[0.1] p-2.5",
          frameClassName ?? "h-[150px] w-[210px]",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {children}
      </div>
      {label && <FrameLabel>{label}</FrameLabel>}
    </MotionWrap>
  );
}

export function MiniPanel({
  children,
  label,
  value,
  highlight = false,
  delay = 0.5,
}: {
  children: ReactNode;
  label: string;
  value?: string;
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <MotionWrap
      delay={delay}
      initial={{ opacity: 0, y: 16 }}
      className={cn(
        frameBase,
        "flex-1",
        highlight
          ? "border-neon-cyan/40 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.5),0_0_24px_rgba(0,212,255,0.1)]"
          : "border-white/[0.1]",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b px-2.5 py-2",
          highlight ? "border-neon-cyan/20 bg-neon-cyan/[0.06]" : "border-white/[0.06] bg-white/[0.03]",
        )}
      >
        <span
          className={cn(
            "text-[9px] font-bold uppercase tracking-wider",
            highlight ? "text-neon-cyan" : "text-white/45",
          )}
        >
          {label}
        </span>
        {value && (
          <span className={cn("text-[10px] font-bold", highlight ? "text-neon-cyan" : "text-white/55")}>
            {value}
          </span>
        )}
      </div>
      <div className="space-y-1.5 p-2.5">{children}</div>
    </MotionWrap>
  );
}
