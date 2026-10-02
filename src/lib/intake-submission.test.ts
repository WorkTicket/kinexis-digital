import { describe, expect, it } from "vitest";
import { INTAKE_SECTIONS, eachIntakeField } from "@/content/client-intake";
import { formatIntakeMail, parseIntakeAnswers } from "@/lib/intake-submission";

const required = {
  companyName: "Acme Plumbing",
  primaryContact: "Jane Roe",
  email: "jane@acme.test",
  signature: "Jane Roe",
};

describe("parseIntakeAnswers", () => {
  it("keeps field ids unique", () => {
    const ids: string[] = [];
    eachIntakeField((field) => {
      if ("id" in field) ids.push(field.id);
    });
    expect(new Set(ids).size).toBe(ids.length);
    expect(INTAKE_SECTIONS).toHaveLength(12);
  });

  it("requires company, contact, email, and signature", () => {
    const result = parseIntakeAnswers({ ...required, signature: "  " });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/signature/i);
  });

  it("rejects an invalid email", () => {
    const result = parseIntakeAnswers({ ...required, email: "not-an-email" });
    expect(result.ok).toBe(false);
  });

  it("keeps answered questions and drops blanks", () => {
    const result = parseIntakeAnswers({
      ...required,
      projectReasons: ["Rank higher on Google", "Generate more leads or calls"],
      competitor1Name: "Rival Co",
      competitor1Url: "rival.example",
      visitorActions: ["Call us", "Request a quote", "Buy online", "Visit our location"],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/up to 3/i);

    const ok = parseIntakeAnswers({
      ...required,
      phone: "555-0100",
      projectReasons: ["Rank higher on Google"],
      competitor1Name: "Rival Co",
      competitor1Notes: "Faster response times",
      whatYouDo: "",
    });
    expect(ok.ok).toBe(true);
    if (!ok.ok) return;
    const mail = formatIntakeMail(ok.submission);
    expect(mail.subject).toContain("Acme Plumbing");
    expect(mail.text).toContain("Rank higher on Google");
    expect(mail.text).toContain("Rival Co");
    expect(mail.text).toContain("Faster response times");
    expect(mail.text).not.toContain("What does your business do?");
    expect(mail.rows).toContain("jane@acme.test");
    expect(ok.submission.phone).toBe("555-0100");
  });

  it("rejects selections that are not on the form", () => {
    const result = parseIntakeAnswers({
      ...required,
      projectReasons: ["Not a real option"],
    });
    expect(result.ok).toBe(false);
  });
});
