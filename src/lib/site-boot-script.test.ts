import { describe, expect, it } from "vitest";
import { COOKIE_PENDING_CRITICAL_CSS, COOKIE_PREFLIGHT_SCRIPT } from "@/lib/site-boot-script";

describe("COOKIE_PREFLIGHT_SCRIPT", () => {
  it("tags Facebook/Instagram in-app browsers and reads consent from cookies", () => {
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("in-app-browser");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("in-app-instagram");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("kinexis-cookie-consent=(accepted|rejected)");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("dallas-website-audit");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("lp-chrome");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("\\/lp\\/");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("thank-you");
  });
});

describe("COOKIE_PENDING_CRITICAL_CSS", () => {
  it("reserves extra bottom space in in-app browsers", () => {
    expect(COOKIE_PENDING_CRITICAL_CSS).toContain("in-app-browser");
    expect(COOKIE_PENDING_CRITICAL_CSS).toContain("padding-bottom:11rem");
    expect(COOKIE_PENDING_CRITICAL_CSS).not.toContain("html.lp-chrome.cookie-pending");
  });
});
