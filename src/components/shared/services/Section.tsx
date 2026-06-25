"use client";

import { cn } from "@/lib/utils";
import { pageSectionClasses } from "@/lib/page-section-surface";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  surfaceIndex: number;
  variant?: "default" | "dark" | "data" | "editorial" | "visual";
};

const variantClasses = {
  default: "",
  dark: "",
  data: "section--data",
  editorial: "section--editorial",
  visual: "section--visual",
};

export default function Section({ id, children, className, surfaceIndex, variant = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(pageSectionClasses(surfaceIndex), variantClasses[variant], className)}
      aria-labelledby={`${id}-heading`}
    >
      {children}
    </section>
  );
}
