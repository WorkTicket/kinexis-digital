import type { ServiceSlug } from "@/content/services";

export type ServiceVisual = {
  src: string;
  alt: string;
};

/** Bump when service stills are regenerated so Next/Image + browser caches refresh. */
const SERVICE_VISUAL_VERSION = "20261010ll";

function serviceAsset(slug: string) {
  return `/assets/images/services/service-${slug}.webp?v=${SERVICE_VISUAL_VERSION}`;
}

/** Black / #0066ff brand plates for home, services hub, and service detail. */
export const serviceVisuals: Record<ServiceSlug, ServiceVisual> = {
  branding: {
    src: serviceAsset("branding"),
    alt: "Branding plate: cobalt mark, construction grid, and type system",
  },
  "web-design": {
    src: serviceAsset("web-design"),
    alt: "Web design plate: desktop and phone layout with a #0066ff conversion path",
  },
  seo: {
    src: serviceAsset("seo"),
    alt: "SEO plate: search board with #0066ff ranking cues",
  },
  "paid-media": {
    src: serviceAsset("paid-media"),
    alt: "Paid media plate: campaign cards with #0066ff targeting accents",
  },
  "content-marketing": {
    src: serviceAsset("content-marketing"),
    alt: "Content marketing plate: editorial page with #0066ff signal marks",
  },
};
