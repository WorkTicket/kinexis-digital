import { cn } from "@/lib/utils";

/** Alternating section tone after a page hero — matches the home page rhythm. */
export type PageSectionTone = "default" | "elevated";

export function pageSectionTone(surfaceIndex: number): PageSectionTone {
  return surfaceIndex % 2 === 0 ? "elevated" : "default";
}

export function pageSectionClasses(
  surfaceIndex: number,
  options?: { tone?: PageSectionTone | "cta"; className?: string },
): string {
  const tone = options?.tone ?? pageSectionTone(surfaceIndex);

  if (tone === "cta") {
    return cn("page-section page-section--cta", options?.className);
  }

  return cn("page-section", tone === "elevated" && "page-section--elevated", options?.className);
}
