import type { NextRequest } from "next/server";
import {
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
  const spanish = normalizeSpanishLocale(value);
  if (spanish) return spanish;
  return null;
}

export function getRequestCountry(request: NextRequest): string | null {
  const header =
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("x-country-code");
  if (!header) return null;
  const code = header.trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return null;
  return code;
}

/** Spain → es-ES. Spanish-speaking LatAm → es-419. Everywhere else → English. */
export function detectLocaleFromLocation(request: NextRequest): Locale {
  if (isCrawlerRequest(request)) return DEFAULT_LOCALE;
  const country = getRequestCountry(request);
  if (country && SPAIN_COUNTRY_CODES.has(country)) return "es-ES";
  if (country && LATAM_COUNTRY_CODES.has(country)) return "es-419";
  return DEFAULT_LOCALE;
}

/** Footer cookie wins over geo. */
export function resolveRequestLocale(request: NextRequest): Locale {
  return getCookieLocale(request) ?? detectLocaleFromLocation(request);
}

export function localeCookieOptions(secure: boolean) {
  return {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax" as const,
    secure,
  };
}
