import type { Locale } from "./routing";

/** ISO 639-1 language code for HTML lang (Ahrefs / Google require valid codes only). */
export function getHtmlLang(locale: Locale): string {
  return locale;
}

/** ISO 639-1 language code for hreflang alternates (must match HTML lang). */
export function getHrefLang(locale: Locale): string {
  return locale;
}
