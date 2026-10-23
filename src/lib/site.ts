// Edit these (or set env vars), then rebuild.
export const SITE = {
  name: "Kinexis Digital",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kinexisdigital.com").replace(/\/$/, ""),
  phone: "(307) 500-3371",
  phoneE164: "+13075003371",
  email: "hello@kinexisdigital.com",
  description: "Website design, SEO, and website management for service businesses across the United States. Kinexis Digital turns searches into calls.",
  /** Public Search Console token already published on the live homepage. Env overrides it. */
  googleSiteVerification: "7uGCkyYE9LslqA7saQP7jpc0HrzVlVZvds1YX02sr6Q",
  social: {
    Facebook: "https://www.facebook.com/profile.php?id=61591998497960",
    "Facebook ES": "https://www.facebook.com/profile.php?id=61594479191212",
    YouTube: "https://www.youtube.com/@KinexisDigital",
  } as Record<string, string>,
  announce: { text: "Free homepage preview first — no card, no obligation. See the four plans →", href: "/pricing" } as null | { text: string; href: string }, // set to null to hide
  areaServed: "United States",
  languages: ["English", "Spanish"] as const,
  updated: "2026-10-22",
  clientPortalUrl: process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL ?? "",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL ?? "/assets/video/kinexis-explainer-v5e-sticker.mp4",
  ogImage: "/OGimage-sm.webp",
};
export const telHref = (p: string) => "tel:" + p.replace(/[^0-9+]/g, "");

/** Bump when industry, audit, or shared kit SVGs are replaced. /assets/* is cached for a year. */
export const KIT_ASSET_VERSION = "2";

export function kitSrc(path: string) {
  return `${path}?v=${KIT_ASSET_VERSION}`;
}
