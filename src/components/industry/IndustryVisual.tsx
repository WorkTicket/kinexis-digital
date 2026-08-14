import { LcpImage } from "@/components/ui/LcpImage";
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
      <LcpImage
        src={visual.thumb}
        alt={visual.alt}
        sizes={
          sizes ??
          "(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
        }
        quality={70}
        className={cn("ind-visual__img ind-visual__img--thumb", className)}
        priority={priority}
        width={720}
        height={480}
      />
    );
  }

  if (variant === "panel") {
    return (
      <LcpImage
        src={visual.src}
        alt={visual.alt}
        sizes={sizes ?? "(max-width: 1023px) 100vw, 58vw"}
        quality={70}
        className={cn("ind-visual__img ind-visual__img--panel", className)}
        priority={priority}
        width={1200}
        height={800}
      />
    );
  }

  return (
    <MediaFrame
      shot
      size="lg"
      className={cn("ind-visual", "ind-visual--hero", className)}
    >
      <LcpImage
        src={visual.src}
        alt={visual.alt}
        sizes={sizes ?? "(max-width: 767px) 100vw, 44vw"}
        quality={75}
        className="ind-visual__img"
        priority={priority}
        width={1200}
        height={800}
        mobileSrc={priority ? visual.thumb : undefined}
      />
    </MediaFrame>
  );
}
