import { ServiceVisual } from "@/components/page/ServiceVisual";
import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

type ServiceLaneArtProps = {
  slug: ServiceSlug;
  className?: string;
  priority?: boolean;
};

/**
 * Mix-lane preview — editorial still for each service.
 */
export function ServiceLaneArt({ slug, className, priority = false }: ServiceLaneArtProps) {
  return (
    <div
      aria-hidden
      className={cn("svc-lane-art", `svc-lane-art--${slug}`, className)}
    >
      <ServiceVisual slug={slug} variant="lane" priority={priority} />
    </div>
  );
}
