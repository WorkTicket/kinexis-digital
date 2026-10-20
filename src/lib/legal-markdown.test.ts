import { describe, expect, it } from "vitest";
import { getTermsContent } from "@/content/legal/terms";
import { renderTermsMarkdown } from "@/lib/legal-markdown";

describe("supplied legal documents", () => {
  it.each(["en", "es-419", "es-ES"] as const)("renders complete terms and privacy for %s without draft notes", locale => {
    for (const privacy of [false, true]) {
      const doc = getTermsContent(locale, privacy);
      expect(doc.html).toContain("PayPal");
      expect(doc.html).not.toMatch(/\{\{|\[|\]|ATTORNEY|ABOGADO|BORRADOR|DRAFT|Stripe/);
      expect(doc.html).not.toContain("Mailing address:");
      expect(doc.html).not.toContain("Dirección postal:");
      expect(doc.headings.length).toBeGreaterThan(10);
    }
    const terms = getTermsContent(locale);
    expect(terms.html).toContain('href="/privacy"');
    expect(terms.html).toContain("HELP");
    expect(terms.html).toContain("STOP");
    expect(terms.headings.some(h => h.text.startsWith("30."))).toBe(true);
  });
  it("escapes raw HTML in repository documents", () => {
    expect(renderTermsMarkdown("# Test\n\n<script>alert(1)</script>").html).not.toContain("<script>");
  });
});
