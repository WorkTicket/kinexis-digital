import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

export function useLocalizedContent<T>(content: Record<Locale, T>): T {
  const locale = useLocale() as Locale;
  return content[locale] ?? content.en;
}
