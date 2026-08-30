import { describe, expect, it } from "vitest";
import { isWebsiteValue } from "@/lib/website-url";

describe("isWebsiteValue", () => {
  it("accepts hostnames and http(s) URLs", () => {
    expect(isWebsiteValue("example.com")).toBe(true);
    expect(isWebsiteValue("www.example.com")).toBe(true);
    expect(isWebsiteValue("https://example.com/path")).toBe(true);
    expect(isWebsiteValue("  https://shop.example.co.uk  ")).toBe(true);
  });

  it("rejects empty, local, and malformed values", () => {
    expect(isWebsiteValue("")).toBe(false);
    expect(isWebsiteValue("nope")).toBe(false);
    expect(isWebsiteValue("example")).toBe(false);
    expect(isWebsiteValue("javascript:alert(1)")).toBe(false);
    expect(isWebsiteValue("https://localhost")).toBe(false);
  });
});
