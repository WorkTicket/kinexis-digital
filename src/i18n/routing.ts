import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  // Hreflang lives in Next.js metadata (buildPageMetadata). next-intl's Link
  // header alternates omit the locale prefix on x-default with localePrefix:
  // "always", which Ahrefs reads as duplicate/broken hreflang clusters.
  alternateLinks: false,
});
