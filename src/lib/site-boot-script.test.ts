import { describe, expect, it } from "vitest";
import { COOKIE_PENDING_CRITICAL_CSS, COOKIE_PREFLIGHT_SCRIPT } from "@/lib/site-boot-script";
import { buildMetaPixelInitScript, buildMetaConversionSnippet } from "@/lib/analytics/meta-pixel";

describe("COOKIE_PREFLIGHT_SCRIPT", () => {
  it("tags Facebook/Instagram in-app browsers and reads consent from cookies", () => {
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("in-app-browser");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("in-app-instagram");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("kinexis-cookie-consent=(accepted|rejected)");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("get-a-website");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("lp-chrome");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("\\/lp\\/");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("thank-you");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("intake-page");
    expect(COOKIE_PREFLIGHT_SCRIPT).toContain("intake");
  });
});

describe("COOKIE_PENDING_CRITICAL_CSS", () => {
  it("reserves extra bottom space in in-app browsers", () => {
    expect(COOKIE_PENDING_CRITICAL_CSS).toContain("in-app-browser");
    expect(COOKIE_PENDING_CRITICAL_CSS).toContain("padding-bottom:11rem");
    expect(COOKIE_PENDING_CRITICAL_CSS).not.toContain("html.lp-chrome.cookie-pending");
  });
});

describe("early Meta consent", () => {
  function queue(choice: string | null, gpc = false, override = false) {
    const browser = {} as { fbq: { queue: Array<ArrayLike<unknown>> } };
    const script = buildMetaPixelInitScript("123456789", { loadScript: false, defaultConsent: "grant" });
    new Function("window", "document", "localStorage", "navigator", `with(window){${script}}`)(browser,
      { cookie: override ? "kinexis-gpc-override=accepted" : "" },
      { getItem: () => choice }, { globalPrivacyControl: gpc });
    return browser.fbq.queue.map(args => Array.from(args));
  }
  it.each([null, "rejected"])("revokes before init without acceptance (%s)", choice => {
    const calls = queue(choice);
    expect(calls[0]).toEqual(["consent", "revoke"]);
    expect(calls).not.toContainEqual(["consent", "grant"]);
  });
  it("grants only for stored acceptance", () => {
    expect(queue("accepted")).toContainEqual(["consent", "grant"]);
  });
  it("honors GPC until a later explicit acceptance", () => {
    expect(queue("accepted", true)).not.toContainEqual(["consent", "grant"]);
    expect(queue("accepted", true, true)).toContainEqual(["consent", "grant"]);
  });
  it("does not fire a thank-you conversion without acceptance", () => {
    const calls: unknown[][] = [];
    new Function("fbq", "location", "document", "localStorage", buildMetaConversionSnippet("123456789"))(
      (...args: unknown[]) => calls.push(args), { pathname: "/thank-you" }, { cookie: "" }, { getItem: () => null });
    expect(calls).toEqual([["consent", "revoke"]]);
  });
});
