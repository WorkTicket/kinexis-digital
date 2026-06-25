import type { Locale } from "./routing";

/** BCP 47 tags for HTML lang and hreflang (Spanish targets Latin America). */
export function getHtmlLang(locale: Locale): string {
  return locale === "es" ? "es-419" : locale;
}

export function getHrefLang(locale: Locale): string {
  return getHtmlLang(locale);
}
