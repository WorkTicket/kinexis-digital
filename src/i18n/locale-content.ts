import type { Locale } from "./routing";

/** Build a full locale map; Spain falls back to LatAm when omitted. */
export function localeContent<T>(content: {
  en: T;
  "es-419": T;
  "es-ES"?: T;
}): Record<Locale, T> {
  const spain = content["es-ES"] ?? content["es-419"];
  return {
    en: content.en,
    "es-419": content["es-419"],
    "es-ES": spain,
  };
}

export function getLocaleContent<T>(
  map: Record<Locale, T>,
  locale: Locale,
  fallback: Locale = "en",
): T {
  return map[locale] ?? map[fallback];
}
