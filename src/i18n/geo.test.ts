import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import {
  detectLocaleFromLocation,
  getCookieLocale,
  resolveRequestLocale,
} from "./geo";

function makeRequest(
  headers: Record<string, string>,
  cookie?: string,
): NextRequest {
  const allHeaders = new Headers(headers);
  if (cookie) allHeaders.set("cookie", cookie);
  return new NextRequest("https://www.kinexisdigital.com/about", {
    headers: allHeaders,
  });
}

describe("detectLocaleFromLocation", () => {
  it("uses Spanish for Spain", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "ES" }))).toBe("es");
  });

  it("uses Spanish for Canary Islands and Ceuta/Melilla", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "IC" }))).toBe("es");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "EA" }))).toBe("es");
  });

  it("uses Spanish for Latin America", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "MX" }))).toBe("es");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "AR" }))).toBe("es");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "CO" }))).toBe("es");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "CL" }))).toBe("es");
  });

  it("uses English for the rest of the world", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "US" }))).toBe("en");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "BR" }))).toBe("en");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "GB" }))).toBe("en");
  });

  it("uses English when country is unknown", () => {
    expect(detectLocaleFromLocation(makeRequest({}))).toBe("en");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "XX" }))).toBe("en");
  });

  it("uses English for crawlers even from Spain", () => {
    expect(
      detectLocaleFromLocation(
        makeRequest({
          "cf-ipcountry": "ES",
          "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1)",
        }),
      ),
    ).toBe("en");
  });
});

describe("resolveRequestLocale", () => {
  it("lets the footer cookie override geo", () => {
    const request = makeRequest({ "cf-ipcountry": "ES" }, "NEXT_LOCALE=en");
    expect(getCookieLocale(request)).toBe("en");
    expect(resolveRequestLocale(request)).toBe("en");
  });

  it("falls back to geo when no cookie is set", () => {
    expect(resolveRequestLocale(makeRequest({ "cf-ipcountry": "ES" }))).toBe("es");
  });
});
