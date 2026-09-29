import type { ServiceSlug } from "@/content/services";

export type ServiceVisual = {
  src: string;
  alt: string;
};

/** Bump when service stills are regenerated so Next/Image + browser caches refresh. */
const SERVICE_VISUAL_VERSION = "20260929e";

function serviceAsset(slug: string) {
  return `/assets/images/services/service-${slug}.webp?v=${SERVICE_VISUAL_VERSION}`;
}

export const serviceVisuals: Record<ServiceSlug, ServiceVisual> = {
  branding: {
    src: serviceAsset("branding"),
    alt: "Brand craft desk: logo construction grids, type specimen sheets, and ruler",
  },
  "web-design": {
    src: serviceAsset("web-design"),
    alt: "Web design desk craft: laptop wireframe with printed desktop and mobile layouts",
  },
  seo: {
    src: serviceAsset("seo"),
    alt: "SEO desk craft: laptop search wireframe with keyword matrix sheet",
  },
  "paid-media": {
    src: serviceAsset("paid-media"),
    alt: "Paid media desk craft: campaign calendar wireframe and media plan sheets",
  },
  "content-marketing": {
    src: serviceAsset("content-marketing"),
    alt: "Content marketing desk craft: editorial proofs and content calendar grid",
  },
};
