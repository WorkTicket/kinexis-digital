// Edit these (or set env vars), then rebuild.
export const SITE = {
  name: "Kinexis Digital",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kinexisdigital.com").replace(/\/$/, ""),
  phone: "(307) 500-3371",
  phoneE164: "+13075003371",
  email: "hello@kinexisdigital.com",
  description: "Website plans for local businesses from $97/mo, with a free homepage preview, missed-call text-back, and Google review requests.",
  /** Public Search Console token already published on the live homepage. Env overrides it. */
  googleSiteVerification: "7uGCkyYE9LslqA7saQP7jpc0HrzVlVZvds1YX02sr6Q",
  social: {
    Facebook: "https://www.facebook.com/profile.php?id=61591998497960",
    "Facebook ES": "https://www.facebook.com/profile.php?id=61594479191212",
    YouTube: "https://www.youtube.com/@KinexisDigital",
  } as Record<string, string>,
  announce: { text: "Free homepage preview in 2 business days — no card, no obligation. Get yours →", href: "/contact" } as null | { text: string; href: string }, // set to null to hide
  areaServed: "United States",
  languages: ["English", "Spanish"] as const,
  clientPortalUrl: "https://portal.kinexisdigital.com/login",
  missedCallPortalUrl: "https://connect.kinexisdigital.com/",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL ?? "/assets/video/kinexis-explainer-v5f-sticker.mp4",
  ogImage: "/OGimage-sm.webp",
};
export const telHref = (p: string) => "tel:" + p.replace(/[^0-9+]/g, "");

/** Bump when industry, audit, shared kit, or custom icons are replaced. /assets/* is cached for a year. */
export const KIT_ASSET_VERSION = "4";

export function kitSrc(path: string) {
  return `${path}?v=${KIT_ASSET_VERSION}`;
}
