import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing, type Locale } from "./i18n/routing";
import { matchUnprefixedLegacyRedirect } from "./lib/legacy-redirects.mjs";

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = "www.kinexisdigital.com";
const APEX_HOST = "kinexisdigital.com";

/** Crawler discovery files — canonical host only (Phase 9). */
const CRAWLER_PATHS = new Set(["/sitemap.xml", "/robots.txt"]);

/** Unprefixed legacy URLs → final locale-prefixed 200 destination (single hop). */
const UNPREFIXED_LEGACY: Record<string, string> = {
  "/services/cro": "/en/services/funnels",
  "/pricing/cro": "/en/pricing/funnels",
};

const LOCALE_PREFIX_RE = /^\/(en|es)(\/|$)/;

function hasLocalePrefix(pathname: string): boolean {
  return LOCALE_PREFIX_RE.test(pathname);
}

function isInsecureRequest(request: NextRequest): boolean {
  const cfVisitor = request.headers.get("cf-visitor");
  if (cfVisitor) {
    try {
      const parsed = JSON.parse(cfVisitor) as { scheme?: string };
      if (parsed.scheme === "http") return true;
    } catch {
      /* ignore malformed Cf-Visitor */
    }
  }

  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwarded === "http") return true;

  return request.nextUrl.protocol === "http:";
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

/** Map unprefixed paths to locale-prefixed canonical paths. */
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
  const needsHttps = !isLocalHost && isInsecureRequest(request);

  if (CRAWLER_PATHS.has(pathname) && !isLocalHost && (needsWww || needsHttps)) {
    return buildRedirect(request, pathname, { forceHttps: true, forceWww: needsWww });
  }

  if (CRAWLER_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const legacyTarget =
    UNPREFIXED_LEGACY[pathname] ?? matchUnprefixedLegacyRedirect(pathname);
  if (legacyTarget) {
    return buildRedirect(request, legacyTarget, { forceHttps: needsHttps, forceWww: needsWww });
  }

  // Serve locale home at `/` with 200 (rewrite) — avoids Ahrefs 3XX on www root.
  if (!isLocalHost && pathname === "/" && !needsWww && !needsHttps) {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}`;
    return NextResponse.rewrite(url);
  }

  if (!isLocalHost) {
    const targetPath = localePrefixedPath(pathname, request);
    const pathChanged = targetPath !== pathname;
    if (needsWww || needsHttps || pathChanged) {
      return buildRedirect(request, targetPath, {
        forceHttps: needsHttps,
        forceWww: needsWww,
      });
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/sitemap.xml", "/robots.txt", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
