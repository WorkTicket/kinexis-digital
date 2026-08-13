import { locales, type Locale } from "@/i18n/routing";

const LOCALE_SET = new Set<string>(locales);

/** Paths that must never be rewritten. */
const SKIP_FIRST_SEGMENTS = new Set(["api", "assets", "_next", ".well-known"]);

/**
 * Keep internal hrefs unprefixed. Strip a leftover `/en` or `/es` prefix
 * from HTML content that was written against the old URL scheme.
 */
export function localizeHref(href: string, _locale: Locale): string {
  if (!href.startsWith("/")) return href;

  const [firstSegment = ""] = href.split("/").filter(Boolean);
  if (SKIP_FIRST_SEGMENTS.has(firstSegment) || firstSegment.startsWith("_")) return href;

  if (LOCALE_SET.has(firstSegment)) {
    const rest = href.replace(/^\/(en|es)(?=\/|$)/, "");
    return rest === "" ? "/" : rest;
  }

  return href;
}

/** Rewrite locale-prefixed internal hrefs in HTML fragments to unprefixed paths. */
export function localizeInternalLinks(html: string, locale: Locale): string {
  return html.replace(/href=(["'])(\/[^"'#?]*)\1/gi, (_match, quote: string, path: string) => {
    return `href=${quote}${localizeHref(path, locale)}${quote}`;
  });
}
