import type { ServiceSlug } from "@/content/services";

export type ServiceVisual = {
  src: string;
  alt: string;
};

/** Bump when service stills are regenerated so Next/Image + browser caches refresh. */
const SERVICE_VISUAL_VERSION = "20260811c";

function serviceAsset(slug: string) {
  return `/assets/images/services/service-${slug}.webp?v=${SERVICE_VISUAL_VERSION}`;
}

export const serviceVisuals: Record<ServiceSlug, ServiceVisual> = {
  branding: {
    src: serviceAsset("branding"),
    alt: "Brand foundation graphic with mark construction, type specimen, and color system",
  },
  "web-design": {
    src: serviceAsset("web-design"),
    alt: "Desktop and mobile wireframe mockups showing a responsive site layout",
  },
  seo: {
    src: serviceAsset("seo"),
    alt: "Search results graphic with the top ranking result highlighted",
  },
  "paid-media": {
    src: serviceAsset("paid-media"),
    alt: "Ad creative cards on a targeting reticle with campaign outcome icons",
  },
  "content-marketing": {
    src: serviceAsset("content-marketing"),
    alt: "Editorial document layout with a discover, create, distribute process rail",
  },
};
