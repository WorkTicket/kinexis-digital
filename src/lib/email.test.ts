import { describe, it, expect } from "vitest";
import { wrapKinexisEmailHtml, emailRow, emailMessageRow } from "@/lib/email";

describe("wrapKinexisEmailHtml", () => {
  it("renders title escaped", () => {
    const html = wrapKinexisEmailHtml('<h1>Test</h1>', "");
    expect(html).toContain("&lt;h1&gt;Test&lt;/h1&gt;");
  });

  it("includes KINEXIS Digital branding", () => {
    const html = wrapKinexisEmailHtml("Test", "");
    expect(html).toContain("KINEXIS Digital");
    expect(html).toContain("kinexisdigital.com");
  });

  it("renders rows in the table", () => {
    const html = wrapKinexisEmailHtml("Test", "<tr><td>data</td></tr>");
    expect(html).toContain("<tr><td>data</td></tr>");
  });

  it("escapes footer HTML when provided", () => {
    const html = wrapKinexisEmailHtml("Test", "", "<script>alert('xss')</script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("omits footer section when no footer provided", () => {
    const html = wrapKinexisEmailHtml("Test", "");
    expect(html).not.toContain("margin-top:32px");
  });
});

describe("emailRow", () => {
  it("escapes label and value", () => {
    const row = emailRow("Name", '<b>John</b>');
    expect(row).toContain("&lt;b&gt;John&lt;/b&gt;");
  });

  it("renders mailto link when link is true", () => {
    const row = emailRow("Email", "john@example.com", true);
    expect(row).toContain("mailto:john@example.com");
  });
});

describe("emailMessageRow", () => {
  it("converts newlines to <br/>", () => {
    const row = emailMessageRow("line1\nline2");
    expect(row).toContain("line1<br/>line2");
  });

  it("escapes HTML in message", () => {
    const row = emailMessageRow("<b>bold</b>");
    expect(row).toContain("&lt;b&gt;bold&lt;/b&gt;");
  });
});
