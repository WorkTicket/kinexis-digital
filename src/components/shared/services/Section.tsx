import { cn } from "@/lib/utils";
import { pageSectionClasses } from "@/lib/page-section-surface";
import type { ReactNode } from "react";

import type { PageSectionTone } from "@/lib/page-section-surface";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  surfaceIndex: number;
  compact?: boolean;
  tone?: PageSectionTone | "cta";
  variant?: "default" | "dark" | "data" | "editorial" | "visual" | "proof";
  /**
   * Progressive CSS entrance (view-timeline). Off by default so Framer Reveal
   * sections do not double-animate. Opt in for static sections without Reveal.
   */
  motion?: boolean | "fade";
};

const variantClasses: Record<string, string> = {
  default: "",
  dark: "",
  data: "section--data",
  editorial: "section--editorial",
  visual: "section--visual",
  proof: "section--proof",
};

export default function Section({
  id,
  children,
  className,
  surfaceIndex,
  compact,
  tone,
  variant,
  motion = false,
}: SectionProps) {
  const motionClass =
    motion === true
      ? "motion-section"
      : motion === "fade"
        ? "motion-section motion-section--fade"
        : "";

  return (
    <section
      id={id}
      className={cn(
        pageSectionClasses(surfaceIndex, { compact, tone }),
        variant ? variantClasses[variant] : "",
        motionClass,
        className,
      )}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </section>
  );
}
