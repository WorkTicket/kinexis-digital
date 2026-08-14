import type { Locale } from "./routing";
import { isSpanishLocale } from "./spanish";

export function getHtmlLang(locale: Locale): string {
  if (locale === "es-ES") return "es-ES";
  if (locale === "es-419") return "es-419";
  return "en";
}

export function getOgLocale(locale: Locale): string {
  if (locale === "es-ES") return "es_ES";
  if (locale === "es-419") return "es_419";
  return "en_US";
}

export function acceptLanguageHeader(locale: Locale): string {
  if (locale === "es-ES") return "es-ES,es;q=1.0";
  if (locale === "es-419") return "es-419,es;q=1.0";
  return "en-US,en;q=1.0";
}

export function schemaLanguage(locale: Locale): string {
  return isSpanishLocale(locale) ? getHtmlLang(locale) : "en";
}
