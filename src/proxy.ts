import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { contentLanguage, localeFromPath, LOCALE_HEADER, PATH_HEADER } from "@/lib/i18n";

const APEX = "kinexisdigital.com";
const CANONICAL_HOST = "www.kinexisdigital.com";

/** Send the apex host to www, and label each URL with the language of that URL. */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host === APEX) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
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
