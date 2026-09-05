import { describe, expect, it, vi, afterEach } from "vitest";
import {
  getInAppBrowserKind,
  IN_APP_BROWSER_PREFLIGHT_SCRIPT,
  isInAppBrowser,
  navigateAfterSubmit,
} from "@/lib/in-app-browser";

const INSTAGRAM_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 192.168.1.2.111";
const FACEBOOK_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/10.0.2.2.111;]";
const FACEBOOK_ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/10.0.2.2.111;]";
const SAFARI_IOS =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";

describe("isInAppBrowser", () => {
  it("detects Instagram, Facebook iOS, and Facebook Android WebViews", () => {
    expect(isInAppBrowser(INSTAGRAM_IOS)).toBe(true);
    expect(isInAppBrowser(FACEBOOK_IOS)).toBe(true);
    expect(isInAppBrowser(FACEBOOK_ANDROID)).toBe(true);
    expect(isInAppBrowser(SAFARI_IOS)).toBe(false);
  });
});

describe("getInAppBrowserKind", () => {
  it("labels Instagram vs Facebook", () => {
    expect(getInAppBrowserKind(INSTAGRAM_IOS)).toBe("instagram");
    expect(getInAppBrowserKind(FACEBOOK_IOS)).toBe("facebook");
    expect(getInAppBrowserKind(FACEBOOK_ANDROID)).toBe("facebook");
    expect(getInAppBrowserKind(SAFARI_IOS)).toBeNull();
  });
});

describe("IN_APP_BROWSER_PREFLIGHT_SCRIPT", () => {
  it("tags html for Facebook and Instagram UAs", () => {
    expect(IN_APP_BROWSER_PREFLIGHT_SCRIPT).toContain("in-app-browser");
    expect(IN_APP_BROWSER_PREFLIGHT_SCRIPT).toContain("in-app-instagram");
    expect(IN_APP_BROWSER_PREFLIGHT_SCRIPT).toContain("in-app-facebook");
    expect(IN_APP_BROWSER_PREFLIGHT_SCRIPT).toContain("Instagram");
  });
});

describe("navigateAfterSubmit", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses a full page load inside Meta in-app browsers", () => {
    const assign = vi.fn();
    const push = vi.fn();
    vi.stubGlobal("window", { location: { assign } });
    vi.stubGlobal("navigator", { userAgent: INSTAGRAM_IOS });

    navigateAfterSubmit("/thank-you", { push });

    expect(assign).toHaveBeenCalledWith("/thank-you");
    expect(push).not.toHaveBeenCalled();
  });

  it("uses the app router outside in-app browsers", () => {
    const assign = vi.fn();
    const push = vi.fn();
    vi.stubGlobal("window", { location: { assign } });
    vi.stubGlobal("navigator", { userAgent: SAFARI_IOS });

    navigateAfterSubmit("/thank-you", { push });

    expect(push).toHaveBeenCalledWith("/thank-you");
    expect(assign).not.toHaveBeenCalled();
  });
});
