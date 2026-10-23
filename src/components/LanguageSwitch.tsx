import { switchHref, type Locale } from "@/lib/i18n";

const LANGS = [
  { locale: "en", hrefLang: "en-US", name: "English" },
  { locale: "es-419", hrefLang: "es", name: "Español · Latinoamérica" },
  { locale: "es-ES", hrefLang: "es-ES", name: "Español · España" },
] as const;

/** Full document links preserve the correct document language on navigation. */
export default function LanguageSwitch({ locale, path, label, className }: {
  locale: Locale;
  path: string;
  label: string;
  className?: string;
}) {
  const current = LANGS.find((item) => item.locale === locale)!;
  return (
    <details className={className ?? "footer-language"}>
      <summary aria-label={`${label}: ${current.name}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
        <span>{current.name}</span>
        <svg className="footer-language-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </summary>
      <nav aria-label={label}>
        <p>{label}</p>
        {LANGS.map((item) => (
          <a key={item.locale} href={switchHref(item.locale, path)} hrefLang={item.hrefLang}
            lang={item.hrefLang} data-set-lang={item.locale}
            aria-current={item.locale === locale ? "page" : undefined}>
            <span>{item.name}</span>
            {item.locale === locale && <span aria-hidden="true">✓</span>}
          </a>
        ))}
      </nav>
    </details>
  );
}
