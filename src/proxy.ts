import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contentLanguage, localeFromPath, LOCALE_HEADER, PATH_HEADER } from "@/lib/i18n";

const APEX = "kinexisdigital.com";
const CANONICAL_HOST = "www.kinexisdigital.com";

// These are the legacy paths most likely to be requested with the retired
// /en/ prefix. Resolve them here so host, locale and legacy cleanup never
// become a redirect chain.
const DIRECT_LEGACY_PATHS: Record<string, string> = {
  "/services/landing-pages": "/web-design",
};

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
  const pathWithoutTrailingSlash = withoutEnglishPrefix === "/"
    ? "/"
    : withoutEnglishPrefix.replace(/\/+$/, "");
  const canonicalPath = DIRECT_LEGACY_PATHS[pathWithoutTrailingSlash] ?? pathWithoutTrailingSlash;
  const needsHttps = forwardedProtocol === "http";
  if (host === APEX || needsHttps || canonicalPath !== originalPath) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    url.pathname = canonicalPath;
    return NextResponse.redirect(url, 301);
  }
  const locale = localeFromPath(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATH_HEADER, request.nextUrl.pathname);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", contentLanguage(locale));
  return response;
}

export const config = {
  // Paths with a dot skip the first pattern, which would leave the crawl
  // files on the apex host. List them so they 308 to www with everything else.
  matcher: [
    "/((?!_next/static|_next/image|.*\\..*).*)",
    "/robots.txt",
    "/sitemap.xml",
  ],
};
