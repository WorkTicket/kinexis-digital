import Image from "next/image";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { IndustrySlug } from "@/content/industries";
import { industryVisuals } from "@/content/industry-visuals";
import { cn } from "@/lib/cn";

type IndustryVisualProps = {
  slug: IndustrySlug;
  /**
   * hero — detail page stage (framed full still)
   * panel — hub atlas / large cards (full still, edge-to-edge)
   * thumb — compact preview cards
   */
  variant?: "hero" | "panel" | "thumb";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Editorial still for an industry — mirrors ServiceVisual language.
 */
export function IndustryVisual({
  slug,
  variant = "hero",
  className,
  priority = false,
  sizes,
}: IndustryVisualProps) {
  const visual = industryVisuals[slug];

  if (variant === "thumb") {
    return (
      <Image
        src={visual.thumb}
        alt=""
        fill
        sizes={
          sizes ??
          "(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
        }
        quality={90}
        className={cn("ind-visual__img ind-visual__img--thumb", className)}
        priority={priority}
      />
    );
  }

  if (variant === "panel") {
    return (
      <Image
        src={visual.src}
        alt=""
        fill
        sizes={sizes ?? "(max-width: 1023px) 100vw, 58vw"}
        quality={100}
        className={cn("ind-visual__img ind-visual__img--panel", className)}
        priority={priority}
      />
    );
  }

  return (
    <MediaFrame
      shot
      size="lg"
      className={cn("ind-visual", "ind-visual--hero", className)}
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes={sizes ?? "(max-width: 767px) 100vw, 44vw"}
        quality={100}
        className="ind-visual__img"
        priority={priority}
      />
    </MediaFrame>
  );
}
