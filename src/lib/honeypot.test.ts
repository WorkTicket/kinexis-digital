import { describe, it, expect } from "vitest";
import { validateHoneypot } from "@/lib/honeypot";

describe("validateHoneypot", () => {
  it("blocks when honeypot field is filled", () => {
    const result = validateHoneypot({ _hp: "bot content" });
    expect(result.blocked).toBe(true);
    expect(result.reason).toBe("honeypot_filled");
  });

  it("does not block empty honeypot field", () => {
    expect(validateHoneypot({ _hp: "" }).blocked).toBe(false);
  });

  it("does not block when honeypot field is missing", () => {
    expect(validateHoneypot({}).blocked).toBe(false);
  });

  it("blocks submission if too fast", () => {
    const timestamp = Date.now(); // now = too fast
    const result = validateHoneypot({}, timestamp);
    expect(result.blocked).toBe(true);
    expect(result.reason).toBe("too_fast");
  });

  it("allows submission after minimum time", () => {
    const timestamp = Date.now() - 5000; // 5 seconds ago
    const result = validateHoneypot({}, timestamp);
    expect(result.blocked).toBe(false);
  });
});
