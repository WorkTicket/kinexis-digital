import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ChapterLeadLayout = "stack" | "split" | "rail";

type Props = {
  eyebrow: string;
  title: ReactNode;
  headingId?: string;
  dek?: ReactNode;
  children?: ReactNode;
  className?: string;
  headingClassName?: string;
  dekClassName?: string;
  /** Composition variant — break the default stacked lead metronome. */
  layout?: ChapterLeadLayout;
};

export function ChapterLead({
  eyebrow,
  title,
  headingId,
  dek,
  children,
  className,
  headingClassName,
  dekClassName,
  layout = "stack",
}: Props) {
  return (
    <header
      className={cn(
        "chapter-lead",
        layout !== "stack" && `chapter-lead--${layout}`,
        className,
      )}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2
        id={headingId}
        className={cn("chapter-lead__heading", headingClassName)}
      >
        {title}
      </h2>
      {dek ? (
        <p className={cn("chapter-lead__dek", dekClassName)}>{dek}</p>
      ) : null}
      {children ? (
        <div className="chapter-lead__actions">{children}</div>
      ) : null}
    </header>
  );
}
