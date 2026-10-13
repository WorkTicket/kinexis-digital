import { describe, expect, it } from "vitest";
import { isQualifiedLead } from "./qualified-lead";

describe("QualifiedLead rules", () => {
  it.each([
    ["Owner", "$500–$1,999", "Next 30 days", true],
    ["owner", "500-1999", "1-3-months", true],
    ["Owner", "$5,000+", "1–3 months", true],
    ["owner", 500, "1-3 months", true],
    ["owner", 499, "Next 30 days", false],
    ["Partner", "$2,000–$4,999", "Next 30 days", false],
    ["owner", 500, "Just researching", false],
    ["owner", "unknown", "Next 30 days", false],
    ["owner", 500, "4-6 months", false],
    [undefined, undefined, undefined, false],
  ])("qualifies %s / %s / %s: %s", (role, budget, timeline, expected) => {
    expect(isQualifiedLead(role, budget, timeline)).toBe(expected);
  });
});
