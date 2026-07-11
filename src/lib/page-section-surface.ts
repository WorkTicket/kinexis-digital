import { cn } from "@/lib/utils";

/** Alternating section tone after a page hero — matches the home page rhythm. */
export type PageSectionTone = "default" | "elevated";

/** Sections rendered by ServiceSeoSections after the hero. */
export const SERVICE_SEO_SECTION_COUNT = 5;

export type PillarSectionContent = {
  internalLinks?: unknown[];
};

export function getServicePillarSectionCount(content: PillarSectionContent): number {
  return content.internalLinks && content.internalLinks.length > 0 ? 6 : 5;
}

/** First surfaceIndex for custom sections after ServiceSeoSections + ServicePillarSections. */
export function servicePageCustomStart(pillarContent: PillarSectionContent): number {
  return SERVICE_SEO_SECTION_COUNT + getServicePillarSectionCount(pillarContent);
}

export function pageSectionTone(surfaceIndex: number): PageSectionTone {
  return surfaceIndex % 2 === 0 ? "elevated" : "default";
}

export function pageSectionClasses(
  surfaceIndex: number,
  options?: { tone?: PageSectionTone | "cta"; compact?: boolean; className?: string },
): string {
  const tone = options?.tone ?? pageSectionTone(surfaceIndex);

  if (tone === "cta") {
    return cn("page-section page-section--cta", options?.compact && "page-section--compact", options?.className);
  }

  return cn(
    "page-section",
    tone === "elevated" && "page-section--elevated",
    options?.compact && "page-section--compact",
    options?.className,
  );
}
