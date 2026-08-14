import type { Locale } from "./routing";

export type SpanishLocale = "es-ES" | "es-419";

export const SPANISH_LOCALES: SpanishLocale[] = ["es-ES", "es-419"];

export function isSpanishLocale(locale: Locale): locale is SpanishLocale {
  return locale === "es-ES" || locale === "es-419";
}

/** Legacy cookie / links that still use plain `es`. */
export function normalizeSpanishLocale(value: string | null | undefined): SpanishLocale | null {
  if (value === "es-ES" || value === "es-419") return value;
  if (value === "es") return "es-419";
  return null;
}

export function pickSpanish<T>(locale: Locale, spain: T, latam: T): T {
  if (locale === "es-ES") return spain;
  if (locale === "es-419") return latam;
  return latam;
}
