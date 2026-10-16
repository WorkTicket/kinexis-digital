import { describe, expect, it } from "vitest";
import { formatPhoneForDisplay, isValidEmail, LEAD_LIMITS, LEAD_MESSAGES, normalizeEmail, normalizePhone, validateLeadStep1, validateLeadStep2 } from "./lead-validation";
import { hashMetaUserValue, normalizePhoneForMeta } from "./analytics/meta-capi";

describe("lead phone normalization", () => {
  it.each(["(919) 555-1234", "919.555.1234", "919 555 1234", "9195551234", "+1 (919) 555-1234", "1-919-555-1234", "+19195551234", "+1 919-555-1234"])("normalizes %s without changing CAPI hash", raw => {
    expect(normalizePhone(raw)).toEqual({ e164: "+19195551234" });
    expect(hashMetaUserValue(normalizePhoneForMeta(raw))).toBe(hashMetaUserValue(normalizePhoneForMeta("+19195551234")));
  });
  it.each(["919555123", "29195551234", "letters", "", "555-1234", "+1234567890123456"])("rejects %s", raw => expect(normalizePhone(raw)).toBeNull());
  it.each(["9195551234 x123", "9195551234 ext 123"])("preserves extensions: %s", raw => expect(normalizePhone(raw)).toEqual({ e164: "+19195551234", ext: "123" }));
  it.each(["+442079460958", "+57 300 123 4567", "+33123456789", "+612345678"])("accepts international %s", raw => expect(normalizePhone(raw)?.e164).toBe(raw.replace(/ /g, "")));
  it("formats US display and retains international numbers", () => {
    expect(formatPhoneForDisplay("+19195551234")).toBe("(919) 555-1234");
    expect(formatPhoneForDisplay("+442079460958")).toBe("+442079460958");
  });
});
describe("lead email normalization", () => {
  it.each([[' Name@COMPANY.COM ', 'Name@company.com'], ['<Name@COMPANY.COM>', 'Name@company.com'], ['"Name@COMPANY.COM"', 'Name@company.com'], ['Name@COMPANY.COM.', 'Name@company.com']])("normalizes %s", (raw, expected) => {
    expect(normalizeEmail(raw)).toBe(expected); expect(isValidEmail(raw)).toBe(true);
  });
  it.each(["", "name@company", "name@company.c", "na me@company.com", "name@ company.com", `${"a".repeat(250)}@co.com`])("rejects %s", raw => expect(isValidEmail(raw)).toBe(false));
});
const choices = { role: "owner", industry: "roofing", budget: "500-1999", timeline: "30-days" };
const contact = { name: "Alex", email: "Alex@example.com", phone: "9195551234", businessName: "", website: "" };
describe("shared lead validators", () => {
  it.each(["role", "industry", "budget", "timeline"] as const)("requires %s", field => expect(validateLeadStep1({ ...choices, [field]: "" })).toEqual({ [field]: LEAD_MESSAGES[field] }));
  it.each(["name", "phone", "email"] as const)("requires %s", field => expect(validateLeadStep2({ ...contact, [field]: "" })).toEqual({ [field]: LEAD_MESSAGES[field] }));
  it("accepts complete choices and empty optional fields", () => {
    expect(validateLeadStep1(choices)).toEqual({}); expect(validateLeadStep2(contact)).toEqual({});
    expect(validateLeadStep2({ ...contact, website: "example.com" })).toEqual({});
    expect(validateLeadStep2({ ...contact, website: "bad" })).toEqual({ website: LEAD_MESSAGES.website });
  });
  it.each(["role", "industry", "budget", "timeline"] as const)("enforces %s length", field => expect(validateLeadStep1({ ...choices, [field]: "a".repeat(LEAD_LIMITS[field] + 1) })[field]).toBe(LEAD_MESSAGES[field]));
  it.each(["name", "businessName", "phone", "website"] as const)("enforces %s length", field => expect(validateLeadStep2({ ...contact, [field]: "a".repeat(LEAD_LIMITS[field] + 1) })[field]).toBe(LEAD_MESSAGES[field]));
});
