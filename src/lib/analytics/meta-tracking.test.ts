import { describe, expect, it, vi } from "vitest";
import { guardMetaTrackingScript, shouldLoadMetaTracking } from "./meta-tracking";

function run(pathname: string, pending: unknown = null, cookie = "") {
  const calls: string[] = [];
  const execute = new Function("location", "window", "sessionStorage", "document", "calls", guardMetaTrackingScript("calls.push('Meta');"));
  execute({ pathname }, {}, { getItem: () => pending ? JSON.stringify(pending) : null }, { cookie }, calls);
  return calls;
}

describe("Meta funnel scope", () => {
  it.each(["/", "/en", "/services/web-design", "/contact", "/lp/google-ads-management"])("does not load Meta on %s", pathname => {
    expect(run(pathname)).toEqual([]);
    expect(shouldLoadMetaTracking(pathname)).toBe(false);
  });
  it.each(["/lp/get-a-website", "/en/lp/get-a-website/", "/es-419/lp/get-a-website", "/es-ES/lp/get-a-website"])("keeps landing tracking on %s", pathname => {
    expect(run(pathname)).toEqual(["Meta"]);
    expect(shouldLoadMetaTracking(pathname)).toBe(true);
  });
  it("keeps confirmation tracking only for a recent landing-page lead", () => {
    const pending = { landingSlug: "get-a-website", storedAt: Date.now() };
    expect(run("/thank-you", pending)).toEqual(["Meta"]);
    expect(shouldLoadMetaTracking("/thank-you", pending)).toBe(true);
    expect(run("/thank-you")).toEqual([]);
    expect(run("/thank-you", { ...pending, landingSlug: "seo" })).toEqual([]);
    expect(run("/thank-you", { ...pending, storedAt: Date.now() - 1800001 })).toEqual([]);
    const cookie = `kinexis-pending-conversion=${encodeURIComponent(JSON.stringify(pending))}`;
    expect(run("/es-ES/thank-you", null, cookie)).toEqual(["Meta"]);
  });
  it("suppresses events after navigating from the landing page to home", async () => {
    const fbq = vi.fn();
    vi.stubGlobal("window", { fbq, location: { pathname: "/" } });
    try {
      const { trackMetaPageView, trackMetaLead } = await import("./meta-pixel");
      expect(trackMetaPageView()).toBe(false);
      expect(trackMetaLead()).toBe(false);
      expect(fbq).not.toHaveBeenCalled();
    } finally { vi.unstubAllGlobals(); }
  });
});
