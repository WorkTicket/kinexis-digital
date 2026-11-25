import Script from "next/script";
import { ENGLISH_FALLBACK_PATHS, SPANISH_UTILITY_PATHS, switchHref, type Locale } from "@/lib/locale-core";

const LANGS = [
  { locale: "en" as const, hrefLang: "en-US", name: "English" },
  { locale: "es-419" as const, hrefLang: "es", name: "Español" },
];

/**
 * Server markup only. The locale home is a safe SSR fallback; boot.js upgrades
 * links to the mirrored same-page URL after hydration/navigation.
 */
export default function LanguageSwitch({
  locale,
  label,
  className,
  mirroredPaths,
}: {
  locale: Locale;
  label: string;
  className?: string;
  /** Server-computed English paths that have a Spanish page. */
  mirroredPaths: readonly string[];
}) {
  const current = LANGS.find((item) => item.locale === locale) ?? LANGS[0];
  // Build-time / no-JS fallback: locale homes.
  const fallbackPath = locale === "en" ? "/" : "/es";
  const mirrorJson = JSON.stringify(mirroredPaths);
  const fallbackJson = JSON.stringify(ENGLISH_FALLBACK_PATHS);
  const utilityJson = JSON.stringify(SPANISH_UTILITY_PATHS);
  return (
    <>
      <details className={className ?? "footer-language"} data-lang-switch="">
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
            <a
              key={item.locale}
              href={switchHref(item.locale, fallbackPath, mirroredPaths)}
              hrefLang={item.hrefLang}
              lang={item.hrefLang}
              data-set-lang={item.locale}
              data-lang-locale={item.locale}
              aria-current={item.locale === locale ? "page" : undefined}
            >
              <span>{item.name}</span>
              {item.locale === locale && <span aria-hidden="true">✓</span>}
            </a>
          ))}
        </nav>
      </details>
      <Script
        id="kinexis-language-mirrors"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__KINEXIS_MIRRORS__=${mirrorJson.replace(/</g, "\\u003c")};window.__KINEXIS_ENGLISH_FALLBACKS__=${fallbackJson.replace(/</g, "\\u003c")};window.__KINEXIS_SPANISH_UTILITY_PATHS__=${utilityJson.replace(/</g, "\\u003c")}`,
        }}
      />
    </>
  );
}
