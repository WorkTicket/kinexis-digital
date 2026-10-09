import { describe, expect, it } from "vitest";
import { parseUsdToCents } from "@/lib/payment-amount";

describe("parseUsdToCents", () => {
  it("parses whole dollars and cents", () => {
    expect(parseUsdToCents("40")).toBe(4000);
    expect(parseUsdToCents("1,250.50")).toBe(125050);
    expect(parseUsdToCents("$75,000")).toBe(7_500_000);
    expect(parseUsdToCents("1.5")).toBe(150);
  });

  it("rejects amounts outside the public range and junk text", () => {
    expect(parseUsdToCents("0.50")).toBeNull();
    expect(parseUsdToCents("75000.01")).toBeNull();
    expect(parseUsdToCents("12.345")).toBeNull();
    expect(parseUsdToCents("")).toBeNull();
    expect(parseUsdToCents("abc")).toBeNull();
  });
});
