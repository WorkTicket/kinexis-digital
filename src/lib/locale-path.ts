import { locales, type Locale } from "@/i18n/routing";

const LOCALE_SET = new Set<string>(locales);

/** Paths that must never receive a locale prefix. */
const SKIP_FIRST_SEGMENTS = new Set(["api", "assets", "_next", ".well-known"]);

/**
 * Prefix an internal path with the active locale when it lacks one.
 * Used for raw HTML content (blog bodies) where next-intl Link is unavailable.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;

  const [firstSegment = ""] = href.split("/").filter(Boolean);
  if (LOCALE_SET.has(firstSegment)) return href;
  if (SKIP_FIRST_SEGMENTS.has(firstSegment) || firstSegment.startsWith("_")) return href;

  return `/${locale}${href === "/" ? "" : href}`;
}

/** Rewrite unprefixed internal hrefs in HTML fragments to locale-prefixed paths. */
export function localizeInternalLinks(html: string, locale: Locale): string {
  return html.replace(/href=(["'])(\/[^"'#?]*)\1/gi, (_match, quote: string, path: string) => {
    return `href=${quote}${localizeHref(path, locale)}${quote}`;
  });
}
