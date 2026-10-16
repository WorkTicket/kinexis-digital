import { beforeEach, describe, it, expect, vi } from "vitest";

const emailEnv = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn(async () => ({ env: emailEnv.value })),
}));

import {
  wrapKinexisEmailHtml,
  emailRow,
  emailMessageRow,
  sendKinexisMail,
  getRecipientEmails,
} from "@/lib/email";

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

describe("getRecipientEmails", () => {
  it("falls back to the default inbox for empty or comma-only values", () => {
    expect(getRecipientEmails("")).toEqual(["hello@kinexisdigital.com"]);
    expect(getRecipientEmails("   ")).toEqual(["hello@kinexisdigital.com"]);
    expect(getRecipientEmails(" , ")).toEqual(["hello@kinexisdigital.com"]);
  });

  it("splits and trims a comma-separated list", () => {
    expect(getRecipientEmails(" a@x.com , b@y.com ")).toEqual(["a@x.com", "b@y.com"]);
  });
});

describe("sendKinexisMail", () => {
  const payload = {
    fromName: "KINEXIS Digital Leads",
    replyTo: "lead@example.com",
    subject: "New Lead",
    title: "New Lead Captured",
    rows: "",
    text: "text",
  };

  beforeEach(() => {
    emailEnv.value = {};
  });

  it("fails closed with send_failed when the transport rejects", async () => {
    const send = vi.fn().mockRejectedValue(new Error("destination address not allowed"));
    emailEnv.value = {
      EMAIL: { send },
      CONTACT_TO_EMAIL: "hello@kinexisdigital.com",
      CONTACT_FROM_EMAIL: "forms@kinexisdigital.com",
    };
    await expect(sendKinexisMail(payload, "Test")).resolves.toEqual({
      ok: false,
      reason: "send_failed",
    });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ to: "hello@kinexisdigital.com", replyTo: "lead@example.com" }),
    );
  });

  it("reports sent true on success", async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    emailEnv.value = {
      EMAIL: { send },
      CONTACT_TO_EMAIL: "hello@kinexisdigital.com",
      CONTACT_FROM_EMAIL: "forms@kinexisdigital.com",
    };
    await expect(sendKinexisMail(payload, "Test")).resolves.toEqual({ ok: true, sent: true });
  });
});
