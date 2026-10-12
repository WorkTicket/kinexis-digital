"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  LOCALE_CHOICE_COOKIE_NAME,
  LOCALE_COOKIE_MAX_AGE,
  locales,
  type Locale,
} from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className, withSeparator = false }: { className?: string; withSeparator?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    const secure = window.location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${LOCALE_CHOICE_COOKIE_NAME}=1; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure}`;
    router.push(pathname, { locale: next });
    router.refresh();
  };

  if (/^\/lp\/get-a-website\/?$/.test(pathname)) return null;

  return (
    <>
    <nav aria-label={t("label")} className={cn("site-footer__lang", className)}>
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          lang={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "site-footer__lang-btn",
            locale === loc && "site-footer__lang-btn--active",
          )}
          aria-current={locale === loc ? "true" : undefined}
        >
          {t(loc)}
        </button>
      ))}
    </nav>
    {withSeparator ? <span className="site-footer__bar-sep" aria-hidden /> : null}
    </>
  );
}
