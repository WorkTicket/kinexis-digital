import chrome from "@/content/landing-chrome.generated.json";
import type { Locale } from "@/i18n/routing";

export function landingSlugFromPath(pathname: string): string | undefined {
  const match = pathname.match(/\/lp\/([^/?#]+)/);
  return match?.[1];
}

/** Paid landers and thank-you — no cookie bar over the form or confirmation. */
export function isCookieBannerExemptPath(pathname: string): boolean {
  return (
    /\/lp\//.test(pathname) ||
    /\/thank-you(\/|$)/.test(pathname) ||
    /(?:^|\/)intake\/?$/.test(pathname)
  );
}

export function getLandingChrome(
  pathname: string,
  locale: Locale = "en",
) {
  const slug = landingSlugFromPath(pathname);
  if (!slug) return null;
  const localized = chrome[locale];
  return localized[slug as keyof typeof localized] ?? null;
}
