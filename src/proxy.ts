import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contentLanguage, isMirrored, localeFromPath, LOCALE_HEADER, PATH_HEADER } from "@/lib/i18n";

const APEX = "kinexisdigital.com";
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

/** Canonicalize host and retired English URLs before handing the request on. */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
  const originalPath = request.nextUrl.pathname;
  const withoutEnglishPrefix = originalPath === "/en"
    ? "/"
    : originalPath.startsWith("/en/")
      ? originalPath.slice(3)
      : originalPath;
  const normalizeEnglishPath = originalPath === "/en" ||
    (originalPath.startsWith("/en/") && canNormalizeEnglishPath(withoutEnglishPrefix));
  const pathWithoutTrailingSlash = withoutEnglishPrefix === "/"
    ? "/"
    : withoutEnglishPrefix.replace(/\/+$/, "");
  const canonicalPath = normalizeEnglishPath
    ? (DIRECT_LEGACY_PATHS[pathWithoutTrailingSlash] ?? pathWithoutTrailingSlash)
    : originalPath;
  // Do not force local HTTP dev requests onto the production domain. The
  // forwarded protocol is commonly `http` in local preview environments.
  const isProductionHost = host === APEX || host === CANONICAL_HOST;
  const needsHttps = isProductionHost && forwardedProtocol === "http";
  if (host === APEX || needsHttps || canonicalPath !== originalPath) {
    const query = request.nextUrl.search;
    return NextResponse.redirect(`https://${CANONICAL_HOST}${canonicalPath}${query}`, 301);
  }
  const locale = localeFromPath(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATH_HEADER, request.nextUrl.pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", contentLanguage(locale));
  if (request.nextUrl.pathname.startsWith("/assets/")) {
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
    "/robots.txt",
    "/sitemap.xml",
  ],
};
