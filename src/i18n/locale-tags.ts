import type { Locale } from "./routing";

/** BCP 47 language tag for HTML lang. Spanish is Spain (es-ES). */
export function getHtmlLang(locale: Locale): string {
  return locale === "es" ? "es-ES" : "en";
}

/** Open Graph locale identifiers. */
export function getOgLocale(locale: Locale): string {
  return locale === "es" ? "es_ES" : "en_US";
}
