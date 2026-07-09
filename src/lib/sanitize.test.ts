import { describe, it, expect } from "vitest";
import { escapeHtml, escapeHtmlWithBreaks } from "@/lib/sanitize";

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("A & B")).toBe("A &amp; B");
  });

  it("escapes < and >", () => {
    expect(escapeHtml("<script>alert('xss')</script>")).toBe(
      "&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;",
    );
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's a test")).toBe("it&#39;s a test");
  });

  it("passes safe text through unchanged", () => {
    expect(escapeHtml("Hello, world!")).toBe("Hello, world!");
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });
});

describe("escapeHtmlWithBreaks", () => {
  it("converts newlines to <br/> after escaping HTML", () => {
    expect(escapeHtmlWithBreaks("line1\nline2")).toBe("line1<br/>line2");
  });

  it("escapes HTML and converts newlines", () => {
    expect(escapeHtmlWithBreaks("<b>bold</b>\n<i>italic</i>")).toBe(
      "&lt;b&gt;bold&lt;/b&gt;<br/>&lt;i&gt;italic&lt;/i&gt;",
    );
  });
});
