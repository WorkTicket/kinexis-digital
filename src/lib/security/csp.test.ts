import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  GOOGLE_SUPPORTED_DOMAINS,
  buildAssetContentSecurityPolicy,
  buildContentSecurityPolicy,
} from "./csp.mjs";

describe("buildContentSecurityPolicy", () => {
  it("allows Google Ads audience pixels on country Google domains", () => {
    const csp = buildContentSecurityPolicy();
    const imgSrc = csp.split("; ").find((part) => part.startsWith("img-src "));

    expect(imgSrc).toContain("https://www.google.com.co");
    expect(imgSrc).toContain("https://www.google.es");
    expect(imgSrc).toContain("https://www.google.ca");
    expect(imgSrc).toContain("https://www.google.com.mx");
    expect(imgSrc).toContain("https://www.google.co.uk");
  });

  it("lists every Google-supported domain as an https://www host", () => {
    expect(GOOGLE_SUPPORTED_DOMAINS).toContain("google.com.co");
    const csp = buildContentSecurityPolicy();
    for (const domain of GOOGLE_SUPPORTED_DOMAINS) {
      expect(csp).toContain(`https://www.${domain}`);
    }
  });

  it("keeps eval off in production and on in development", () => {
    expect(buildContentSecurityPolicy({ isDev: false })).not.toContain(
      "'unsafe-eval'",
    );
    expect(buildContentSecurityPolicy({ isDev: true })).toContain(
      "'unsafe-eval'",
    );
  });

  it("keeps the Cloudflare _headers CSP under the 2000-character line limit", () => {
    const headersPath = path.resolve(process.cwd(), "public/_headers");
    const headers = readFileSync(headersPath, "utf8");
    const match = headers.match(/^ {2}Content-Security-Policy: (.+)$/m);
    const assetCsp = buildAssetContentSecurityPolicy();
    expect(match?.[1]).toBe(assetCsp);
    expect(assetCsp.length).toBeLessThan(2000);
    expect(assetCsp).toContain("https://connect.facebook.net");
  });

  it("allows the Meta Pixel script, image, and graph hosts", () => {
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("https://connect.facebook.net");
    expect(csp).toContain("https://www.facebook.com");
    expect(csp).toContain("https://graph.facebook.com");
  });
});
