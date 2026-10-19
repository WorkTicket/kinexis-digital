import type { Locale } from "@/i18n/routing";
import { getTermsContent } from "@/content/legal/terms";
import { TermsLanguageSwitch } from "./TermsLanguageSwitch";
import "@/styles/routes/terms.css";

export function TermsDocument({ locale }: { locale: Locale }) {
  const spanish = locale !== "en";
  const { title, html, headings } = getTermsContent(locale);
  return (
    <main className="terms-page" lang={spanish ? "es" : "en"}>
      <div className="terms-document">
        <TermsLanguageSwitch spanish={spanish} />
        <p className="terms-updated">{spanish ? "Última actualización: 19 de octubre de 2026" : "Last updated: October 19, 2026"}</p>
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
        <article aria-label={spanish ? "Términos del Servicio" : "Terms of Service"} className="terms-copy" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
