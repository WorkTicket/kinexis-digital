"use client";

import { m as motion } from "@/lib/framer";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function HeroVizShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex h-[220px] w-full items-center justify-center", className)}>{children}</div>;
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
      initial={initial ?? { opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={animate ?? { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={transition ?? { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BrowserChrome({ className }: { className?: string }) {
  return (
    <div className={cn("mb-1.5 flex gap-1", className)}>
      <div className="h-1.5 w-1.5 rounded-full bg-red-400/40" />
      <div className="h-1.5 w-1.5 rounded-full bg-yellow-400/40" />
      <div className="h-1.5 w-1.5 rounded-full bg-green-400/40" />
      <div className="ml-1 h-1.5 flex-1 rounded-full bg-white/[0.06]" />
    </div>
  );
}

export function SkeletonLine({ width = "full", className }: { width?: "full" | "lg" | "md" | "sm"; className?: string }) {
  const w =
    width === "lg" ? "w-[70%]" : width === "md" ? "w-[55%]" : width === "sm" ? "w-[40%]" : "w-full";
  return <div className={cn("h-1.5 rounded-full bg-white/10", w, className)} />;
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("rounded bg-neon-cyan/10", className)} />;
}

type BrowserFrameProps = {
  children: ReactNode;
  label?: string;
  delay?: number;
  className?: string;
  frameClassName?: string;
  highlight?: boolean;
  interactive?: boolean;
};

export function BrowserFrame({
  children,
  label,
  delay = 0.5,
  className,
  frameClassName,
  highlight = false,
  interactive = false,
}: BrowserFrameProps) {
  return (
    <MotionWrap delay={delay} className={cn("flex shrink-0 flex-col items-center", className)}>
      <div
        className={cn(
          "rounded-xl border-2 bg-[#0d1117] p-2 shadow-xl shadow-black/30",
          highlight ? "border-neon-cyan/30 shadow-neon-cyan/10" : "border-strong",
          interactive && "hero-viz-interactive",
          frameClassName ?? "h-[130px] w-[180px]",
        )}
      >
        <BrowserChrome />
        <div
          className={cn(
            "flex flex-col gap-1 overflow-hidden rounded-lg p-1.5 transition-colors duration-300",
            highlight ? "bg-neon-cyan/[0.04]" : "bg-white/[0.02]",
            interactive && "group-hover:bg-neon-cyan/[0.04]",
          )}
          style={{ height: "calc(100% - 16px)" }}
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
          "border-2 bg-[#0d1117] shadow-lg",
          highlight ? "border-neon-cyan/30 shadow-neon-cyan/10 shadow-xl" : "border-strong",
          interactive && "hero-viz-interactive",
          isMobile ? "rounded-[10px] p-1" : "rounded-[8px] p-1.5",
          frameClassName ?? (isMobile ? "h-[100px] w-[52px]" : "h-[90px] w-[68px]"),
        )}
      >
        <div className={cn("mx-auto rounded-full bg-white/10", isMobile ? "mb-1 h-1 w-6" : "mb-1 h-0.5 w-3")} />
        <div
          className={cn(
            "flex flex-col gap-0.5 rounded-md bg-white/[0.03] p-1 transition-colors duration-300",
            interactive && "group-hover:bg-neon-cyan/[0.04]",
            isMobile ? "h-[calc(100%-12px)]" : "h-[calc(100%-10px)]",
          )}
        >
          {children}
        </div>
      </div>
      {label && <FrameLabel>{label}</FrameLabel>}
    </MotionWrap>
  );
}

export function FrameLabel({ children }: { children: ReactNode }) {
  return <span className="mt-1 text-[7px] uppercase tracking-wider text-muted/40">{children}</span>;
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
    "top-right": "right-2 top-2",
    "top-left": "left-2 top-2",
    "bottom-left": "left-2 bottom-6",
    "bottom-right": "right-2 bottom-6",
  }[position];

  const accentClass =
    accent === "emerald" ? "border-emerald-400/25 text-emerald-400" : "border-neon-cyan/20 text-neon-cyan";

  return (
    <MotionWrap
      delay={delay}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "absolute rounded-lg border bg-bg/90 px-2 py-1.5 shadow-lg backdrop-blur-sm",
        pos,
        accentClass,
      )}
    >
      <div className="text-[7px] uppercase tracking-wider text-muted/50">{label}</div>
      <div className={cn("text-[10px] font-bold", accent === "emerald" ? "text-emerald-400" : "text-neon-cyan")}>
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
          "overflow-hidden rounded-xl border-2 border-strong bg-[#0d1117] p-2 shadow-xl shadow-black/30",
          frameClassName ?? "h-[130px] w-[180px]",
        )}
      >
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
      initial={{ opacity: 0, y: 20 }}
      className={cn(
        "flex-1 overflow-hidden rounded-xl border-2 bg-[#0d1117] shadow-lg",
        highlight ? "border-neon-cyan/30 shadow-neon-cyan/10" : "border-strong",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b px-2 py-1.5",
          highlight ? "border-neon-cyan/15 bg-neon-cyan/[0.04]" : "border-surface bg-white/[0.02]",
        )}
      >
        <span
          className={cn(
            "text-[8px] font-bold uppercase tracking-wider",
            highlight ? "text-neon-cyan/80" : "text-muted/50",
          )}
        >
          {label}
        </span>
        {value && (
          <span className={cn("text-[9px] font-bold", highlight ? "text-neon-cyan" : "text-muted/60")}>{value}</span>
        )}
      </div>
      <div className="space-y-1.5 p-2">{children}</div>
    </MotionWrap>
  );
}
