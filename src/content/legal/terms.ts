import { readFileSync } from "node:fs";
import path from "node:path";
import { Marked, Renderer } from "marked";
import type { Locale } from "@/i18n/routing";

export type TermsHeading = { id: string; text: string; depth: number };

/** Published fragments are a contract: retain these aliases if headings change. */
const SECTION_ALIASES: Record<number, string> = { 7: "cancellation", 9: "edits", 10: "guarantee" };

export function termsSlug(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "")
    .toLowerCase().replace(/[^a-z0-9\s-]/g, "")
    .trim().replace(/[\s-]+/g, "-");
}

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Only repository-owned Markdown is accepted; raw HTML is displayed as text. */
export function renderTermsMarkdown(source: string) {
  let title = "";
  const headings: TermsHeading[] = [];
  const ids = new Map<string, number>();
  function headingId(text: string) {
    const slug = termsSlug(text);
    const count = ids.get(slug) ?? 0;
    ids.set(slug, count + 1);
    return count ? `${slug}-${count + 1}` : slug;
  }
  const parser = new Marked({
    gfm: true,
    breaks: true,
    async: false,
    renderer: {
      html({ text }) { return escapeHtml(text); },
      heading(token) {
        if (token.depth === 1) {
          title = token.text;
          return "";
        }
        const id = headingId(token.text);
        if (token.depth > 1 && !/⚠/.test(token.text)) {
          headings.push({ id, text: token.text, depth: token.depth });
        }
        const number = Number(token.text.match(/^(\d+)\./)?.[1]);
        const alias = token.depth === 2 ? SECTION_ALIASES[number] : undefined;
        return `${alias ? `<span id="${alias}" class="terms-anchor" aria-hidden="true"></span>` : ""}<h${token.depth} id="${id}">${this.parser.parseInline(token.tokens)}</h${token.depth}>\n`;
      },
      paragraph(token) {
        // The supplied §10 subsection titles use bold rather than Markdown #s.
        // Promote their existing text without changing any wording.
        const first = token.tokens[0];
        if (first?.type === "strong" && /^10\.[123]\s/.test(first.text)) {
          const id = headingId(first.text);
          headings.push({ id, text: first.text, depth: 3 });
          const rest = this.parser.parseInline(token.tokens.slice(1));
          return `<h3 id="${id}">${this.parser.parseInline(first.tokens ?? [])}</h3>${rest.trim() ? `<p>${rest}</p>` : ""}\n`;
        }
        return `<p>${this.parser.parseInline(token.tokens)}</p>\n`;
      },
      table(token) {
        return `<div class="terms-table" tabindex="0" role="region" aria-label="${token.header.length > 2 ? "Plans / Planes" : "Key terms / Lo esencial"}">${Renderer.prototype.table.call(this, token)}</div>`;
      },
    },
    extensions: [{
      name: "legalPlaceholder",
      level: "inline",
      start(src) { return src.indexOf("["); },
      tokenizer(src) {
        const match = /^\[[^\]\n]+\]/.exec(src);
        if (match) return { type: "legalPlaceholder", raw: match[0], text: match[0] };
      },
      renderer(token) { return `<mark class="terms-placeholder">${escapeHtml(token.text)}</mark>`; },
    }],
  });
  const html = parser.parse(source) as string;
  return { title, html, headings };
}

export function getTermsContent(locale: Locale) {
  const filename = locale === "en" ? "terms-of-service.md" : "terms-of-service_es.md";
  const source = readFileSync(path.join(process.cwd(), "docs/legal", filename), "utf8");
  return renderTermsMarkdown(source);
}
