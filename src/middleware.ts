import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  LOCALE_COOKIE_NAME,
  detectLocaleFromLocation,
  getCookieLocale,
  isCrawlerRequest,
  localeCookieOptions,
  resolveRequestLocale,
} from "./i18n/geo";
import { routing, type Locale } from "./i18n/routing";
import { acceptLanguageHeader } from "./i18n/locale-tags";
import {
  LOCALE_PREFIX_RE,
  resolveLegacyRedirect,
} from "./lib/legacy-redirects.mjs";

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = "www.kinexisdigital.com";
const APEX_HOST = "kinexisdigital.com";

const CRAWLER_PATHS = new Set(["/sitemap.xml", "/robots.txt", "/llms.txt"]);

function getPathLocale(pathname: string, request: NextRequest): Locale | null {
  const match = pathname.match(LOCALE_PREFIX_RE);
  if (!match) return null;
  const raw = match[1];
  if (/^en$/i.test(raw)) return "en";
  if (/^es-ES$/i.test(raw)) return "es-ES";
  if (/^es-419$/i.test(raw)) return "es-419";
  if (/^es$/i.test(raw)) {
    return detectLocaleFromLocation(request) === "es-ES" ? "es-ES" : "es-419";
  }
  return null;
}

function buildRedirect(
  request: NextRequest,
  pathname: string,
  {
    forceHttps,
    forceWww,
    hash,
  }: { forceHttps: boolean; forceWww: boolean; hash?: string },
): NextResponse {
  // Use WHATWG URL so NextURL cannot keep a trailing slash on the destination.
  const dest = new URL(request.url);
  dest.pathname = pathname || "/";
  dest.hash = hash ? `#${hash}` : "";
  if (forceHttps) dest.protocol = "https:";
  if (forceWww) dest.host = WWW_HOST;
  return NextResponse.redirect(dest, 301);
}

function withRequestLocale(request: NextRequest, locale: Locale): NextRequest {
  const headers = new Headers(request.headers);
  const parts = (headers.get("cookie") ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith(`${LOCALE_COOKIE_NAME}=`));
  parts.push(`${LOCALE_COOKIE_NAME}=${locale}`);
  headers.set("cookie", parts.join("; "));
  headers.set("accept-language", acceptLanguageHeader(locale));
  return new NextRequest(request, { headers });
}

function persistLocaleCookie(response: NextResponse, request: NextRequest, locale: Locale) {
  if (isCrawlerRequest(request)) return response;
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const secure = host !== "localhost" && host !== "127.0.0.1";
  response.cookies.set(LOCALE_COOKIE_NAME, locale, localeCookieOptions(secure));
  return response;
}

function isHttpRequest(request: NextRequest): boolean {
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwardedProto === "http") return true;
  if (request.nextUrl.protocol === "http:") return true;
  try {
    const cf = request.headers.get("cf-visitor");
    if (cf) return JSON.parse(cf).scheme === "http";
  } catch {
    /* ignore */
  }
  return false;
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const pathname = request.nextUrl.pathname;
  const isLocalHost = host === "localhost" || host === "127.0.0.1";
  const needsWww = !isLocalHost && host === APEX_HOST;
  const needsHttps = !isLocalHost && isHttpRequest(request);
  const pathLocale = getPathLocale(pathname, request);
  const resolved = resolveLegacyRedirect(pathname);

  if (needsHttps || needsWww || resolved) {
    const response = buildRedirect(request, resolved?.path ?? pathname, {
      forceHttps: needsHttps || needsWww,
      forceWww: needsWww,
      hash: resolved?.hash,
    });
    if (pathLocale) persistLocaleCookie(response, request, pathLocale);
    return response;
  }

  if (CRAWLER_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const hadCookie = Boolean(getCookieLocale(request));
  const locale = resolveRequestLocale(request);
  const localizedRequest = withRequestLocale(request, locale);
  const response = intlMiddleware(localizedRequest);

  if (!hadCookie) persistLocaleCookie(response, request, locale);
  return response;
}

export const config = {
  matcher: ["/sitemap.xml", "/robots.txt", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
