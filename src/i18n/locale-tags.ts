import type { Locale } from "./routing";

/** BCP 47 language tag for HTML lang. Spanish is neutral international (US + LatAm). */
export function getHtmlLang(locale: Locale): string {
  return locale === "es" ? "es" : "en";
}

/** Open Graph locale identifiers. */
export function getOgLocale(locale: Locale): string {
  return locale === "es" ? "es_419" : "en_US";
}
