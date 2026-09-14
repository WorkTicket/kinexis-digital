import { describe, expect, it } from "vitest";
import { isAppLocale } from "./locale";

describe("isAppLocale", () => {
  it("accepts the three public locales", () => {
    expect(isAppLocale("en")).toBe(true);
    expect(isAppLocale("es-ES")).toBe(true);
    expect(isAppLocale("es-419")).toBe(true);
  });

  it("rejects leftover prefixes and junk paths that 500d in Search Console", () => {
    expect(isAppLocale("es")).toBe(false);
    expect(isAppLocale("mo")).toBe(false);
    expect(isAppLocale("fr")).toBe(false);
    expect(isAppLocale("en-US")).toBe(false);
  });
});
