import { describe, expect, it } from "vitest";
import { PRODUCTION_GOOGLE_ADS_ID, PRODUCTION_GADS_LABEL_LEAD } from "@/lib/analytics/ads-config";
import {
  GDPR_CONSENT_REGIONS,
  buildEarlyGoogleTagHtml,
  buildGtagInitScript,
  buildGtagLoaderSnippet,
  buildLeadConversionSnippet,
  getGtagScriptSrcId,
} from "@/lib/analytics/conversion-snippet";
import { PENDING_CONVERSION_KEY } from "@/lib/analytics/pending-conversion";

const LIVE_SEND_TO = `${PRODUCTION_GOOGLE_ADS_ID}/${PRODUCTION_GADS_LABEL_LEAD}`;

describe("buildLeadConversionSnippet", () => {
  it("emits Google's Submit lead form event snippet", () => {
    const snippet = buildLeadConversionSnippet(LIVE_SEND_TO);

    expect(snippet).toContain(
      `gtag('event', 'conversion', {'send_to': '${LIVE_SEND_TO}'});`,
    );
    expect(snippet).toContain("thank-you");
    expect(snippet).toContain(PENDING_CONVERSION_KEY);
    expect(snippet).toContain("conversionAlreadyFired");
    expect(snippet).toContain("_dbg=");
    expect(snippet).toContain("user_data");
  });

  it("rejects malformed send_to values", () => {
    expect(buildLeadConversionSnippet("G-XXXX/label")).toBe("");
    expect(buildLeadConversionSnippet("AW-123")).toBe("");
    expect(buildLeadConversionSnippet("")).toBe("");
  });
});

describe("buildEarlyGoogleTagHtml", () => {
  it("puts a real gtag.js script src first for Tag Assistant", () => {
    const html = buildEarlyGoogleTagHtml(PRODUCTION_GOOGLE_ADS_ID, "G-Z8245BRX2L");
    expect(html.startsWith(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${PRODUCTION_GOOGLE_ADS_ID}"></script>`,
    )).toBe(true);
    expect(html).toContain("gtag('config','G-Z8245BRX2L')");
    expect(html).toContain(
      `gtag('config','${PRODUCTION_GOOGLE_ADS_ID}',{allow_enhanced_conversions:true})`,
    );
    expect(html).toContain("url_passthrough");
    expect(html).toContain("ads_data_redaction");
    expect(html).toContain("region:[");
    expect(html).toContain("'GB'");
    expect(html).toContain(
      "gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'})",
    );
  });

  it("rejects malformed Ads IDs", () => {
    expect(buildEarlyGoogleTagHtml("not-a-tag")).toBe("");
  });
});

describe("buildGtagInitScript", () => {
  it("denies consent only in GDPR regions and grants elsewhere", () => {
    const init = buildGtagInitScript(PRODUCTION_GOOGLE_ADS_ID, "G-Z8245BRX2L");
    expect(init).toContain("wait_for_update:500,region:[");
    for (const region of GDPR_CONSENT_REGIONS) {
      expect(init).toContain(`'${region}'`);
    }
    expect(init.indexOf("denied")).toBeLessThan(init.indexOf("granted"));
  });
});

describe("getGtagScriptSrcId", () => {
  it("prefers the Ads ID so the conversion linker loads", () => {
    expect(getGtagScriptSrcId("AW-18409243306", "G-Z8245BRX2L")).toBe(
      "AW-18409243306",
    );
    expect(getGtagScriptSrcId(undefined, "G-Z8245BRX2L")).toBe("G-Z8245BRX2L");
    expect(getGtagScriptSrcId("nope", "also-nope")).toBeUndefined();
  });
});

describe("buildGtagLoaderSnippet", () => {
  it("injects gtag.js for the Ads ID immediately", () => {
    expect(buildGtagLoaderSnippet(PRODUCTION_GOOGLE_ADS_ID)).toContain(
      `https://www.googletagmanager.com/gtag/js?id=${PRODUCTION_GOOGLE_ADS_ID}`,
    );
  });

  it("rejects malformed tag IDs", () => {
    expect(buildGtagLoaderSnippet("not-a-tag")).toBe("");
  });
});

describe("isGdprConsentRegion", () => {
  it("matches EEA/UK/CH country codes and ignores unknown or empty values", async () => {
    const { isGdprConsentRegion } = await import(
      "@/lib/analytics/conversion-snippet"
    );
    expect(isGdprConsentRegion("ES")).toBe(true);
    expect(isGdprConsentRegion("gb")).toBe(true);
    expect(isGdprConsentRegion("US")).toBe(false);
    expect(isGdprConsentRegion("MX")).toBe(false);
    expect(isGdprConsentRegion(undefined)).toBe(false);
  });
});
