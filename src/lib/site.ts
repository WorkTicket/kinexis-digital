/** Production apex must always resolve to the www canonical host. */
function canonicalSiteUrl(raw: string) {
  const cleaned = raw.trim().replace(/\/$/, "");
  try {
    const url = new URL(cleaned);
    if (url.hostname === "kinexisdigital.com") url.hostname = "www.kinexisdigital.com";
    return url.origin;
  } catch {
    return cleaned || "https://www.kinexisdigital.com";
  }
}

// Edit these (or set env vars), then rebuild.
export const SITE = {
  name: "Kinexis Digital",
  url: canonicalSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kinexisdigital.com"),
  phone: "(307) 500-3371",
  phoneE164: "+13075003371",
  email: "hello@kinexisdigital.com",
  description: "Website plans for local businesses from $97/mo, with a free homepage preview, Google review requests, and optional missed-call text-back.",
  /** Public Search Console token already published on the live homepage. Env overrides it. */
  googleSiteVerification: "7uGCkyYE9LslqA7saQP7jpc0HrzVlVZvds1YX02sr6Q",
  social: {
    Facebook: "https://www.facebook.com/profile.php?id=61591998497960",
    "Facebook ES": "https://www.facebook.com/profile.php?id=61594479191212",
    YouTube: "https://www.youtube.com/@KinexisDigital",
    Trustpilot: "https://www.trustpilot.com/review/kinexisdigital.com",
  } as Record<string, string>,
  announce: { text: "Free homepage preview in 2 business days — no card, no obligation. Get yours →", href: "/contact" } as null | { text: string; href: string }, // set to null to hide
  areaServed: "United States",
  languages: ["English", "Spanish"] as const,
  clientPortalUrl: "https://portal.kinexisdigital.com/login",
  missedCallPortalUrl: "https://connect.kinexisdigital.com/",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL ?? "/assets/video/kinexis-explainer-v5f-sticker.mp4",
  ogImage: "/og/home.webp",
};
export const telHref = (p: string) => "tel:" + p.replace(/[^0-9+]/g, "");

/** Preview Worker / preview subdomain — never index, never emit a crawlable sitemap. */
export function isPreviewSite() {
  if (process.env.NEXT_PUBLIC_IS_PREVIEW === "1") return true;
  const url = SITE.url.toLowerCase();
  return url.includes("preview.kinexisdigital.com") || url.includes("kinexis-digital-preview");
}

/** Runtime host check (proxy headers). Covers custom domain + workers.dev preview. */
export function isPreviewHost(host: string | null | undefined) {
  const h = (host ?? "").split(":")[0]?.toLowerCase() ?? "";
  if (!h) return false;
  if (h === "preview.kinexisdigital.com") return true;
  return h.includes("kinexis-digital-preview") && h.endsWith(".workers.dev");
}

function normalizedHostname(host: string | null | undefined) {
  let value = (host ?? "").trim().toLowerCase();
  const bracketedIpv6 = value.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (bracketedIpv6) return bracketedIpv6[1];
  if (value.includes(":") && !value.includes("::")) value = value.slice(0, value.lastIndexOf(":"));
  return value;
}

/** Hosts used only by local and Workers preview runs must never canonicalize to production. */
export function isLocalOrPreviewHost(host: string | null | undefined) {
  const hostname = normalizedHostname(host);
  return hostname === "localhost"
    || hostname === "127.0.0.1"
    || hostname === "::1"
    || hostname === "preview.kinexisdigital.com"
    || hostname === "workers.dev"
    || hostname.endsWith(".workers.dev");
}

/** Preserve the production apex/www redirects, but trust local/preview host context first. */
export function shouldRedirectCanonicalHost(
  hostHeader: string | null | undefined,
  requestHostname: string | null | undefined,
  forwardedProtocol: string | null | undefined,
) {
  const hosts = [hostHeader, requestHostname].map(normalizedHostname).filter(Boolean);
  if (hosts.some(isLocalOrPreviewHost)) return false;
  return hosts.some((host) => host === "kinexisdigital.com"
    || (host === "www.kinexisdigital.com" && forwardedProtocol === "http"));
}

/** Bump when industry, audit, shared kit, or custom icons are replaced. /assets/* is cached for a year. */
export const KIT_ASSET_VERSION = "4";

export function kitSrc(path: string) {
  return `${path}?v=${KIT_ASSET_VERSION}`;
}
