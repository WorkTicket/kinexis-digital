import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es-ES", "es-419"] as const;
export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // Public URLs stay unprefixed (`/about`). Locale is a cookie + geo rewrite.
  localePrefix: "never",
  // Cookie still drives the footer toggle. Middleware injects geo before this runs
  // so Accept-Language never overrides location on a first visit.
  localeDetection: true,
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  },
  alternateLinks: false,
});
