// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { TermsDocument } from "./TermsDocument";
import { getTermsContent } from "@/content/legal/terms";
import { renderTermsMarkdown } from "@/lib/legal-markdown";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ locale: _locale, prefetch: _prefetch, ...props }: Record<string, unknown>) => <a {...props} />,
}));

describe("/terms document", () => {
  it.each(["en", "es-419", "es-ES"] as const)("renders the complete %s document with working contents and completed business details", (locale) => {
    const doc = document.implementation.createHTMLDocument();
    doc.body.innerHTML = renderToStaticMarkup(<TermsDocument locale={locale} />);
    const { headings } = getTermsContent(locale);
    expect(doc.querySelector("h1")?.textContent).toContain(locale === "en" ? "Terms of Service" : "Términos del Servicio");
    expect(headings.filter(({ depth }) => depth === 2)).toHaveLength(31);
    expect(headings.filter(({ depth }) => depth === 3)).toHaveLength(3);
    for (const heading of headings) {
      expect(doc.getElementById(heading.id)?.textContent).toBe(heading.text);
      expect(doc.querySelector(`a[href="#${heading.id}"]`)).not.toBeNull();
    }
    for (const alias of ["guarantee", "cancellation", "edits"]) {
      expect(doc.getElementById(alias)).not.toBeNull();
    }
    expect(doc.querySelector(".terms-updated")?.textContent).toContain("2026");
    const source = readFileSync(`docs/legal/terms-of-service${locale === "en" ? "" : "_es"}.md`, "utf8");
    expect(getTermsContent(locale)).toEqual(renderTermsMarkdown(source));
    const placeholders = source.match(/\[[^\]\n]+\]/g) ?? [];
    expect(placeholders).toEqual([]);
    expect([...doc.querySelectorAll("mark")].map((mark) => mark.textContent)).toEqual(placeholders);
    expect(doc.body.textContent).not.toMatch(/DRAFT|BORRADOR|OWNER TO CONFIRM|ATTORNEY|ABOGADO|ACCOUNTANT|CONTADOR/);
    expect(doc.body.textContent).toContain("+1 (307) 500-3371");
    expect(doc.querySelector('article a[href="https://www.kinexisdigital.com/privacy"]')).not.toBeNull();
    expect(doc.querySelectorAll("article table")).toHaveLength(2);
    expect(doc.querySelectorAll("article ul ul").length).toBeGreaterThan(0);
    expect(doc.querySelector("article")?.textContent).not.toContain("Standard fine print");
  });
});
