import type { Locale } from "@/i18n/routing";
import { getTermsContent } from "@/content/legal/terms";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import "@/styles/routes/terms.css";
import { TERMS_EFFECTIVE_DATE, PRIVACY_EFFECTIVE_DATE } from "@/config/business-identity";

export function TermsDocument({ locale, privacy = false }: { locale: Locale; privacy?: boolean }) {
  const spanish = locale !== "en";
  const { title, html, headings } = getTermsContent(locale, privacy);
  const date = new Date(`${privacy ? PRIVACY_EFFECTIVE_DATE : TERMS_EFFECTIVE_DATE}T12:00:00Z`).toLocaleDateString(spanish ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  return (
    <main className="terms-page" lang={spanish ? "es" : "en"}>
      <div className="terms-document">
        <LanguageSwitcher />
        <p className="terms-updated">{spanish ? "Última actualización: " : "Last updated: "}{date}</p>
        <div className="terms-copy"><h1>{title}</h1></div>
        <nav aria-label={spanish ? "Índice" : "Table of contents"} className="terms-toc">
          <h2>{spanish ? "Índice" : "Table of contents"}</h2>
          <ul>
            {headings.map(({ id, text, depth }) => (
              <li key={id} className={depth === 3 ? "terms-toc-subsection" : undefined}>
                <a href={`#${id}`}>{text}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article aria-label={title} className="terms-copy" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
