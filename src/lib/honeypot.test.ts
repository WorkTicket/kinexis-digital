import { describe, it, expect } from "vitest";
import { validateHoneypot } from "@/lib/honeypot";

describe("validateHoneypot", () => {
  const validTs = () => Date.now() - 5000;

  it("blocks when honeypot field is filled", () => {
    const result = validateHoneypot({ _hp: "bot content" }, validTs());
    expect(result.blocked).toBe(true);
    expect(result.reason).toBe("honeypot_filled");
  });

  it("does not block empty honeypot field", () => {
    expect(validateHoneypot({ _hp: "" }, validTs()).blocked).toBe(false);
  });

  it("does not block when honeypot field is missing if timing is valid", () => {
    expect(validateHoneypot({}, validTs()).blocked).toBe(false);
  });

  it("blocks when the timing field is missing", () => {
    const result = validateHoneypot({});
    expect(result.blocked).toBe(true);
    expect(result.reason).toBe("too_fast");
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

  it("allows a client clock five minutes ahead", () => {
    expect(validateHoneypot({ _hp: "" }, Date.now() + 300000).blocked).toBe(false);
  });

  it("blocks 1000ms and allows 10000ms", () => {
    expect(validateHoneypot({}, Date.now() - 1000).blocked).toBe(true);
    expect(validateHoneypot({}, Date.now() - 10000).blocked).toBe(false);
  });

  it("keeps the floor low enough for fast humans but blocks instant posts", () => {
    // ~1.8s passes (autofill + quick submit), ~1.2s is an instant post.
    expect(validateHoneypot({}, Date.now() - 1800).blocked).toBe(false);
    expect(validateHoneypot({}, Date.now() - 1200).blocked).toBe(true);
  });
});
