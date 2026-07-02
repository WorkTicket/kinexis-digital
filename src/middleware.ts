import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing, type Locale } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const WWW_HOST = "www.kinexisdigital.com";
const APEX_HOST = "kinexisdigital.com";

/** Unprefixed legacy URLs → final locale-prefixed 200 destination (single hop). */
const UNPREFIXED_LEGACY: Record<string, string> = {
  "/services/cro": "/en/services/funnels",
  "/pricing/cro": "/en/pricing/funnels",
};

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
  { forceHttps, forceWww }: { forceHttps: boolean; forceWww: boolean }
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  if (forceHttps) url.protocol = "https:";
  if (forceWww) url.host = WWW_HOST;
  return NextResponse.redirect(url, 301);
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  const pathname = request.nextUrl.pathname;
  const isLocalHost = host === "localhost" || host === "127.0.0.1";
  const needsWww = host === APEX_HOST;
  const needsHttps = !isLocalHost && isInsecureRequest(request);

  const legacyTarget = UNPREFIXED_LEGACY[pathname];
  if (legacyTarget) {
    return buildRedirect(request, legacyTarget, { forceHttps: needsHttps, forceWww: needsWww });
  }

  if (needsWww || needsHttps) {
    let targetPath = pathname;
    // Collapse apex root redirect chain: apex → www/en in one hop (not apex → www → /en).
    if (needsWww && (pathname === "/" || pathname === "")) {
      targetPath = `/${detectLocale(request)}`;
    }
    return buildRedirect(request, targetPath, { forceHttps: needsHttps, forceWww: needsWww });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
