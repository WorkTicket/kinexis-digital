import { describe, expect, it } from "vitest";
import { guardGoogleTrackingScript, shouldLoadGoogleTracking } from "./google-tracking";

describe("landing-page Google exclusion", () => {
  it.each(["/lp/get-a-website", "/en/lp/get-a-website", "/es-419/lp/get-a-website/", "/es-ES/lp/get-a-website"])("does not bootstrap Google on %s", (pathname) => {
    const executed: string[] = [];
    const bootstrap = new Function("location", "executed", guardGoogleTrackingScript("executed.push('Google');"));
    bootstrap({ pathname }, executed);
    expect(executed).toEqual([]);
    expect(shouldLoadGoogleTracking(pathname)).toBe(false);
  });
  it.each(["/", "/en", "/es-419/lp/google-ads-management", "/thank-you", "/lp/get-a-website-other"])("keeps tracking on %s", (pathname) => {
    const executed: string[] = [];
    new Function("location", "executed", guardGoogleTrackingScript("executed.push('Google');"))({ pathname }, executed);
    expect(executed).toEqual(["Google"]);
    expect(shouldLoadGoogleTracking(pathname)).toBe(true);
  });
});
