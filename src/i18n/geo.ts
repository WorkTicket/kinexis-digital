import type { NextRequest } from "next/server";
import {
  LOCALE_CHOICE_COOKIE_NAME,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
  type Locale,
} from "./routing";
import { normalizeSpanishLocale } from "./spanish";

const DEFAULT_LOCALE: Locale = "en";

export { LOCALE_COOKIE_NAME, LOCALE_COOKIE_MAX_AGE };

/** Spain, Canary Islands, Ceuta & Melilla. */
const SPAIN_COUNTRY_CODES = new Set(["ES", "IC", "EA"]);

/** Spanish-speaking Latin America + Caribbean. */
const LATAM_COUNTRY_CODES = new Set([
  "MX",
  "GT",
  "SV",
  "HN",
  "NI",
  "CR",
  "PA",
  "CU",
  "DO",
  "PR",
  "CO",
  "VE",
  "EC",
  "PE",
  "BO",
  "PY",
  "CL",
  "AR",
  "UY",
]);

const CRAWLER_UA_RE =
  /googlebot|google-inspectiontool|adsbot-google|bingbot|slurp|duckduckbot|baiduspider|yandex(?:bot|images)|facebookexternalhit|twitterbot|linkedinbot|applebot|gptbot|chatgpt-user|claudebot|anthropic-ai|ccbot|bytespider|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|chrome-lighthouse|lighthouse/i;

export function isCrawlerRequest(request: NextRequest): boolean {
  const ua = request.headers.get("user-agent") ?? "";
  return CRAWLER_UA_RE.test(ua);
}

export function getCookieLocale(request: NextRequest): Locale | null {
  const value = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (value === "en") return "en";
  // Pre-split `es` cookie: Spain stays Spain Spanish, everyone else LatAm.
  if (value === "es") {
    const country = getRequestCountry(request);
    return country && SPAIN_COUNTRY_CODES.has(country) ? "es-ES" : "es-419";
  }
  const spanish = normalizeSpanishLocale(value);
  if (spanish) return spanish;
  return null;
}

type RequestWithCf = NextRequest & { cf?: { country?: string } };

export function getRequestCountry(request: NextRequest): string | null {
  const fromCf = (request as RequestWithCf).cf?.country;
  const header =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("x-country-code") ||
    fromCf;
  if (!header) return null;
  const code = header.trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return null;
  return code;
}

function localeFromAcceptLanguage(request: NextRequest): Locale | null {
  const header = request.headers.get("accept-language");
  if (!header) return null;
  const first = header.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("es-es")) return "es-ES";
  if (first.startsWith("es")) return "es-419";
  return null;
}

/** Spain → es-ES. Spanish-speaking LatAm → es-419. Everywhere else → English. */
export function detectLocaleFromLocation(request: NextRequest): Locale {
  if (isCrawlerRequest(request)) return DEFAULT_LOCALE;
  const country = getRequestCountry(request);
  if (country && SPAIN_COUNTRY_CODES.has(country)) return "es-ES";
  if (country && LATAM_COUNTRY_CODES.has(country)) return "es-419";
  if (!country) return localeFromAcceptLanguage(request) ?? DEFAULT_LOCALE;
  return DEFAULT_LOCALE;
}

/** True after someone picks a language in the footer. */
export function hasExplicitLocaleChoice(request: NextRequest): boolean {
  return request.cookies.get(LOCALE_CHOICE_COOKIE_NAME)?.value === "1";
}

/**
 * A footer choice wins. Otherwise location wins, including over an automatic
 * English cookie from a visit where the country was missing.
 */
export function resolveRequestLocale(request: NextRequest): Locale {
  if (hasExplicitLocaleChoice(request)) {
    return getCookieLocale(request) ?? detectLocaleFromLocation(request);
  }
  return detectLocaleFromLocation(request);
}

export function localeCookieOptions(secure: boolean) {
  return {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax" as const,
    secure,
  };
}
