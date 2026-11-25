import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contentLanguage, isMirrored, localeFromPath, LOCALE_HEADER, PATH_HEADER } from "@/lib/i18n";
import { isPreviewHost, shouldRedirectCanonicalHost } from "@/lib/site";

const CANONICAL_HOST = "www.kinexisdigital.com";

// These are the legacy paths most likely to be requested with the retired
// /en/ prefix. Resolve them here so host, locale and legacy cleanup never
// become a redirect chain.
const DIRECT_LEGACY_PATHS: Record<string, string> = {
  "/services/landing-pages": "/web-design",
};

function canNormalizeEnglishPath(path: string) {
  if (path === "/") return true;
  if (DIRECT_LEGACY_PATHS[path]) return true;
  return isMirrored(path);
}

function withoutTrailingSlash(path: string) {
  if (path === "/" || path === "") return "/";
  return path.replace(/\/+$/, "") || "/";
}

/** Year-long cache is for hashed files and images, not HTML pages. */
function immutableAsset(path: string) {
  return path.startsWith("/assets/")
    || path.startsWith("/_next/static/")
    || /^\/(?:blog|portfolio)\/[^/]+\.(?:webp|avif|png|jpe?g|gif|svg|ico)$/i.test(path)
    || /^\/favicon-\d+\.webp$/.test(path)
    || path === "/apple-icon.png";
}

/** Canonicalize host and retired English URLs before handing the request on. */
export function proxy(request: NextRequest) {
  const hostHeader = request.headers.get("host");
  const requestHostname = request.nextUrl.hostname;
  const host = (hostHeader?.split(":")[0] || requestHostname).toLowerCase();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
  const productionHostRedirect = shouldRedirectCanonicalHost(hostHeader, requestHostname, forwardedProtocol);
  const originalPath = request.nextUrl.pathname;
  const withoutEnglishPrefix = originalPath === "/en" || originalPath === "/en/"
    ? "/"
    : originalPath.startsWith("/en/")
      ? originalPath.slice(3)
      : originalPath;
  const pathWithoutTrailingSlash = withoutTrailingSlash(withoutEnglishPrefix);
  const normalizeEnglishPath = originalPath === "/en" || originalPath === "/en/" ||
    (originalPath.startsWith("/en/") && canNormalizeEnglishPath(pathWithoutTrailingSlash));
  const canonicalPath = normalizeEnglishPath
    ? (DIRECT_LEGACY_PATHS[pathWithoutTrailingSlash] ?? pathWithoutTrailingSlash)
    : pathWithoutTrailingSlash;
  if (productionHostRedirect || canonicalPath !== originalPath) {
    const query = request.nextUrl.search;
    if (productionHostRedirect) {
      return NextResponse.redirect(`https://${CANONICAL_HOST}${canonicalPath}${query}`, 301);
    }
    const localHost = request.headers.get("host") ?? request.nextUrl.host;
    const protocol = request.nextUrl.protocol === "https:" ? "https" : "http";
    return NextResponse.redirect(`${protocol}://${localHost}${canonicalPath}${query}`, 301);
  }
  const locale = localeFromPath(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATH_HEADER, request.nextUrl.pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", contentLanguage(locale));
  // Edge country for cookie-banner geo (avoids a critical-path /cdn-cgi/trace fetch).
  const country = (request.headers.get("cf-ipcountry") || "").toUpperCase();
  if (/^[A-Z]{2}$/.test(country) && country !== "XX" && country !== "T1") {
    response.cookies.set("kx_country", country, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
  }
  if (isPreviewHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  if (immutableAsset(request.nextUrl.pathname)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
  }
  return response;
}

export const config = {
  // Paths with a dot skip the first pattern, which would leave the crawl
  // files on the apex host. List them so they 308 to www with everything else.
  matcher: [
    "/((?!_next/static|_next/image|.*\\..*).*)",
    "/assets/:path*",
    "/blog/:path*",
    "/portfolio/:path*",
    "/robots.txt",
    "/sitemap.xml",
  ],
};
