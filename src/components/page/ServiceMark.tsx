import { LcpImage } from "@/components/ui/LcpImage";
import type { HomeServiceSlug } from "@/content/home-services";
import { serviceVisuals } from "@/content/service-visuals";

/** Editorial plate for a service detail hero. */
export function ServiceMark({ slug }: { slug: HomeServiceSlug }) {
  const visual = serviceVisuals[slug];
  return (
    <div className="hub-stage">
      <div className="hub-stage__still">
        <LcpImage
          src={visual.src}
          alt={visual.alt}
          sizes="(max-width: 1023px) 100vw, 34rem"
          quality={90}
          priority
          width={1200}
          height={750}
        />
      </div>
    </div>
  );
}
