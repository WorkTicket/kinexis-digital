import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
  LOCALE_COOKIE_NAME,
  getCookieLocale,
  isCrawlerRequest,
  localeCookieOptions,
  resolveRequestLocale,
} from "./i18n/geo";
import { routing, type Locale } from "./i18n/routing";
import { acceptLanguageHeader } from "./i18n/locale-tags";
import { resolveLegacyRedirect } from "./lib/legacy-redirects.mjs";

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = "www.kinexisdigital.com";
const APEX_HOST = "kinexisdigital.com";

const CRAWLER_PATHS = new Set(["/sitemap.xml", "/robots.txt", "/llms.txt"]);

const LOCALE_PREFIX_RE = /^\/(en|es-ES|es-419)(?=\/|$)/;

function getPathLocale(pathname: string): Locale | null {
  const match = pathname.match(LOCALE_PREFIX_RE);
  return match ? (match[1] as Locale) : null;
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
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.hash = hash ?? "";
  if (forceHttps) url.protocol = "https:";
  if (forceWww) url.host = WWW_HOST;
  return NextResponse.redirect(url, 301);
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

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const pathname = request.nextUrl.pathname;
  const isLocalHost = host === "localhost" || host === "127.0.0.1";
  const needsWww = host === APEX_HOST;

  if (!isLocalHost) {
    const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const isHttp =
      forwardedProto === "http" ||
      request.nextUrl.protocol === "http:" ||
      (() => {
        try {
          const cf = request.headers.get("cf-visitor");
          if (cf) return JSON.parse(cf).scheme === "http";
        } catch {
          /* ignore */
        }
        return false;
      })();

    if (isHttp || needsWww) {
      return buildRedirect(request, pathname, { forceHttps: true, forceWww: needsWww });
    }
  }

  if (CRAWLER_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const pathLocale = getPathLocale(pathname);
  const resolved = resolveLegacyRedirect(pathname);

  if (resolved) {
    const response = buildRedirect(request, resolved.path, {
      forceHttps: false,
      forceWww: false,
      hash: resolved.hash,
    });
    if (pathLocale) persistLocaleCookie(response, request, pathLocale);
    return response;
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
