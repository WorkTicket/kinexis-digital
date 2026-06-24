import type { Locale } from "@/i18n/routing";

export function getLocalizedContent<T>(content: Record<Locale, T>, locale: Locale): T {
  return content[locale] ?? content.en;
}
