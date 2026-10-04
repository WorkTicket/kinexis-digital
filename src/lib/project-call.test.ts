import { describe, expect, it } from "vitest";
import { qualifiesForProjectCall } from "@/lib/project-call";

describe("qualifiesForProjectCall", () => {
  it("shows the calendar to owners and managers starting within 3 months", () => {
    expect(qualifiesForProjectCall("owner", "30-days")).toBe(true);
    expect(qualifiesForProjectCall("partner", "1-3-months")).toBe(true);
    expect(qualifiesForProjectCall("manager", "30-days")).toBe(true);
  });

  it("hides the calendar from employees and people who are only researching", () => {
    expect(qualifiesForProjectCall("employee", "30-days")).toBe(false);
    expect(qualifiesForProjectCall("owner", "researching")).toBe(false);
    expect(qualifiesForProjectCall("manager", "researching")).toBe(false);
    expect(qualifiesForProjectCall("employee", "researching")).toBe(false);
  });
});
