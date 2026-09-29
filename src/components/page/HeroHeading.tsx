import type { ReactNode } from "react";
import {
  HeroSignalInline,
  HeroSignalLine,
} from "@/components/page/HeroSignalLine";
import { cn } from "@/lib/cn";

/**
 * Agency hero heading — avoids orphan stacks like "What" / "we do."
 * Short phrases render as one line (last word in signal blue).
 * Two lines only when both lines carry real weight.
 */
export function composeHeroHeading(
  title: string,
  signal?: string | null,
): { mode: "single" | "stack"; full: string; title: string; signal: string } {
  const t = title.trim();
  const s = (signal ?? "").trim();
  const full = s ? `${t} ${s}`.replace(/\s+/g, " ").trim() : t;
  const titleWords = t.split(/\s+/).filter(Boolean).length;
  const signalWords = s.split(/\s+/).filter(Boolean).length;
  const titleIsClause = titleWords >= 3 || /[.!?]$/.test(t);
  const stack = Boolean(s && titleIsClause && signalWords >= 2);

  return {
    mode: stack ? "stack" : "single",
    full,
    title: t,
    signal: s,
  };
}

type HeroHeadingProps = {
  title: string;
  signal?: string | null;
  className?: string;
  /** When true, always stack title / signal as two lines (rare). */
  forceStack?: boolean;
};

export function HeroHeading({
  title,
  signal,
  className,
  forceStack = false,
}: HeroHeadingProps): ReactNode {
  const composed = composeHeroHeading(title, signal);
  const mode = forceStack && composed.signal ? "stack" : composed.mode;

  if (mode === "stack") {
    return (
      <>
        <span className={cn("hero-line", className)}>
          <span className="hero-line__text">{composed.title}</span>
        </span>
        <HeroSignalLine text={composed.signal} />
      </>
    );
  }

  return (
    <span className={cn("hero-line", className)}>
      <span className="hero-line__text">
        <HeroSignalInline text={composed.full} />
      </span>
    </span>
  );
}
