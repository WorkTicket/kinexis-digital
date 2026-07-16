import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing, type Locale } from "./i18n/routing";
import { matchUnprefixedLegacyRedirect } from "./lib/legacy-redirects.mjs";

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = "www.kinexisdigital.com";
const APEX_HOST = "kinexisdigital.com";

const CRAWLER_PATHS = new Set(["/sitemap.xml", "/robots.txt", "/llms.txt"]);

const UNPREFIXED_LEGACY: Record<string, string> = {
  "/services/google-ads": "/en/services/ppc-management",
  "/pricing/google-ads": "/en/pricing/ppc-management",
  "/pricing/paid-ads": "/en/pricing/ppc-management",
  "/services/paid-ads": "/en/services/ppc-management",
};

const LOCALE_PREFIX_RE = /^\/(en|es)(\/|$)/;

function hasLocalePrefix(pathname: string): boolean {
  return LOCALE_PREFIX_RE.test(pathname);
}

function detectLocale(request: NextRequest): Locale {
  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (/\bes\b/.test(accept) || accept.includes("es-")) return "es";
  return routing.defaultLocale;
}

function buildRedirect(
  request: NextRequest,
  pathname: string,
  { forceHttps, forceWww }: { forceHttps: boolean; forceWww: boolean },
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  if (forceHttps) url.protocol = "https:";
  if (forceWww) url.host = WWW_HOST;
  return NextResponse.redirect(url, 301);
}

function localePrefixedPath(pathname: string, request: NextRequest): string {
  if (hasLocalePrefix(pathname)) return pathname;
  const locale = detectLocale(request);
  if (pathname === "/" || pathname === "") return `/${locale}`;
  return `/${locale}${pathname}`;
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const pathname = request.nextUrl.pathname;
  const isLocalHost = host === "localhost" || host === "127.0.0.1";
  const needsWww = host === APEX_HOST;

  // HTTPS enforcement — check first, before any other processing.
  // Uses x-forwarded-proto (set by Cloudflare) as the primary signal,
  // with request.nextUrl.protocol as fallback for non-Cloudflare environments.
  if (!isLocalHost) {
    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const isHttp =
      forwardedProto === "http" ||
      request.nextUrl.protocol === "http:" ||
      (() => {
        try {
          const cf = request.headers.get("cf-visitor");
          if (cf) return JSON.parse(cf).scheme === "http";
        } catch { /* ignore */ }
        return false;
      })();

    if (isHttp || needsWww) {
      return buildRedirect(request, pathname, { forceHttps: true, forceWww: needsWww });
    }
  }

  if (CRAWLER_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const legacyTarget =
    UNPREFIXED_LEGACY[pathname] ?? matchUnprefixedLegacyRedirect(pathname);
  if (legacyTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 301);
  }

  if (!isLocalHost && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}`;
    return NextResponse.rewrite(url);
  }

  if (!isLocalHost) {
    const targetPath = localePrefixedPath(pathname, request);
    if (targetPath !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = targetPath;
      return NextResponse.redirect(url, 301);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/sitemap.xml", "/robots.txt", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
