import Image from "next/image";
import { MediaFrame } from "@/components/ui/MediaFrame";
import type { ServiceSlug } from "@/content/services";
import { serviceVisuals } from "@/content/service-visuals";
import { cn } from "@/lib/cn";

type ServiceVisualProps = {
  slug: ServiceSlug;
  /** Hero slot vs mix-lane preview */
  variant?: "hero" | "lane";
  className?: string;
  priority?: boolean;
};

/**
 * Editorial still for a service — replaces CSS product stages.
 */
export function ServiceVisual({
  slug,
  variant = "hero",
  className,
  priority = false,
}: ServiceVisualProps) {
  const visual = serviceVisuals[slug];
  const isLane = variant === "lane";

  return (
    <MediaFrame
      shot={!isLane}
      size={isLane ? "sm" : "lg"}
      className={cn(
        "svc-visual",
        isLane ? "svc-visual--lane" : "svc-visual--hero",
        className,
      )}
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        sizes={
          isLane
            ? "(max-width: 1023px) 100vw, 32vw"
            : "(max-width: 767px) 100vw, 44vw"
        }
        className="svc-visual__img"
        priority={priority}
      />
    </MediaFrame>
  );
}
