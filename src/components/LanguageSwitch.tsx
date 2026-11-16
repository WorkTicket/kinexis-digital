import { switchHref, type Locale } from "@/lib/locale-core";

const LANGS = [
  { locale: "en" as const, hrefLang: "en-US", name: "English" },
  { locale: "es-419" as const, hrefLang: "es", name: "Español" },
];

/**
 * Server markup only. Href targets are patched before paint by an inline script
 * (and again in boot.js on navigation) so static pages stay static — no
 * `usePathname` client island in the footer.
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
  // Build-time / no-JS fallback: locale homes. Inline script rewrites to the
  // mirrored same-page URL from location.pathname.
  const fallbackPath = locale === "en" ? "/" : "/es";
  const mirrorJson = JSON.stringify(mirroredPaths);
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
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var M=${mirrorJson};window.__KINEXIS_MIRRORS__=M;function en(p){if(p==="/es"||p==="/es-es")return"/";if(p.indexOf("/es-es/")===0)return p.slice(6)||"/";if(p.indexOf("/es/")===0)return p.slice(3)||"/";return p||"/"}function withLoc(loc,p){var e=en(p);if(loc==="en")return e;return e==="/"? "/es":"/es"+e}function hrefFor(loc,p){var e=en(p);return withLoc(loc,M.indexOf(e)>=0?e:"/")}var path=location.pathname;document.querySelectorAll("[data-lang-switch] a[data-lang-locale]").forEach(function(a){var loc=a.getAttribute("data-lang-locale");if(loc)a.setAttribute("href",hrefFor(loc,path))})})()`,
        }}
      />
    </>
  );
}
