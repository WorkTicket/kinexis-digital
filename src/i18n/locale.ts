import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "./routing";

export type LocaleParams = Promise<{ locale: string }>;

export async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return locale;
}
