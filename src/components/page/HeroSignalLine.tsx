import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Hero line 2 (Clay formula): lead words stay foreground, only the last word
 * is electric blue. Example: signal "we do." → "we" + blue "do."
 */
export function HeroSignalLine({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { lead, last } = splitLastWord(text);
  if (!last) return null;

  return (
    <span className={cn("hero-line hero-signal-line block", className)}>
      <span className="hero-line__text">
        {lead ? <span className="text-foreground">{lead} </span> : null}
        <span className="text-[color:var(--hero-signal)]">{last}</span>
      </span>
    </span>
  );
}

/** Inline variant for compact mastheads (blog, etc.). */
export function HeroSignalInline({ text }: { text: string }): ReactNode {
  const { lead, last } = splitLastWord(text);
  if (!last) return null;
  return (
    <>
      {lead ? `${lead} ` : null}
      <span className="text-[color:var(--hero-signal)]">{last}</span>
    </>
  );
}

function splitLastWord(text: string): { lead: string; last: string } {
  const parts = text.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { lead: "", last: "" };
  if (parts.length === 1) return { lead: "", last: parts[0]! };
  return {
    lead: parts.slice(0, -1).join(" "),
    last: parts[parts.length - 1]!,
  };
}
