import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing, type Locale } from "./i18n/routing";
import { matchUnprefixedLegacyRedirect } from "./lib/legacy-redirects.mjs";

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = "www.kinexisdigital.com";
const APEX_HOST = "kinexisdigital.com";

const CRAWLER_PATHS = new Set(["/sitemap.xml", "/robots.txt", "/llms.txt"]);

const UNPREFIXED_LEGACY: Record<string, string> = {
  "/services/cro": "/en/services/funnels",
  "/pricing/cro": "/en/pricing/funnels",
  "/pricing/google-ads": "/en/pricing/ppc-management",
  "/pricing/paid-ads": "/en/pricing/ppc-management",
};

const LOCALE_PREFIX_RE = /^\/(en|es)(\/|$)/;

const isDev = process.env.NODE_ENV === "development";

const CSP_REPORT_URI = "https://kinexisdigital.report-uri.com/r/d/csp/enforce";

function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

function buildCsp(nonce: string): string {
  const evalSrc = isDev ? " 'unsafe-eval'" : "";
  const scriptHosts = [
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://www.clarity.ms",
    "https://static.cloudflareinsights.com",
  ].join(" ");
  const connectHosts = [
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://*.google-analytics.com",
    "https://www.googletagmanager.com",
    "https://analytics.google.com",
    "https://www.clarity.ms",
    "https://*.clarity.ms",
    "https://cloudflareinsights.com",
  ].join(" ");

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${evalSrc} ${scriptHosts}`,
    `script-src-elem 'self' 'nonce-${nonce}'${evalSrc} ${scriptHosts}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self' data:",
    `connect-src 'self' ${connectHosts}`,
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    `report-uri ${CSP_REPORT_URI}`,
  ].join("; ");
}

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

  const nonce = generateNonce();
  request.headers.set("x-csp-nonce", nonce);

  if (!isLocalHost && pathname === "/" && !needsWww && !needsHttps) {
    const url = request.nextUrl.clone();
    url.pathname = `/${detectLocale(request)}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Security-Policy", buildCsp(nonce));
    return response;
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

  const response = intlMiddleware(request);
  if (response.status >= 200 && response.status < 300) {
    response.headers.set("Content-Security-Policy", buildCsp(nonce));
  }
  return response;
}

export const config = {
  matcher: ["/sitemap.xml", "/robots.txt", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
