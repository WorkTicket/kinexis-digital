"use client";

import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  const switchLocale = (next: Locale) => {
    if (next === locale) return;
    router.push(pathname, { locale: next });
    router.refresh();
  };

  return (
    <nav aria-label={t("label")} className={cn("site-footer__lang", className)}>
      {locales.map((loc, index) => (
        <span key={loc} className="site-footer__lang-item">
          {index > 0 ? (
            <span className="site-footer__lang-sep" aria-hidden>
              /
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={cn(
              "site-footer__bar-link site-footer__lang-btn",
              locale === loc && "site-footer__lang-btn--active",
            )}
            aria-current={locale === loc ? "true" : undefined}
          >
            {t(loc)}
          </button>
        </span>
      ))}
    </nav>
  );
}
