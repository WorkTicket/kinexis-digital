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
  it("uses Spain Spanish for Spain", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "ES" }))).toBe("es-ES");
  });

  it("uses Spain Spanish for Canary Islands and Ceuta/Melilla", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "IC" }))).toBe("es-ES");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "EA" }))).toBe("es-ES");
  });

  it("uses LatAm Spanish for Latin America", () => {
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "MX" }))).toBe("es-419");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "AR" }))).toBe("es-419");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "CO" }))).toBe("es-419");
    expect(detectLocaleFromLocation(makeRequest({ "cf-ipcountry": "CL" }))).toBe("es-419");
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
  it("lets an explicit footer choice override geo", () => {
    const request = makeRequest(
      { "cf-ipcountry": "CO" },
      "NEXT_LOCALE=en; NEXT_LOCALE_CHOICE=1",
    );
    expect(getCookieLocale(request)).toBe("en");
    expect(resolveRequestLocale(request)).toBe("en");
  });

  it("uses LatAm Spanish in Colombia even if an automatic English cookie is set", () => {
    const request = makeRequest({ "cf-ipcountry": "CO" }, "NEXT_LOCALE=en");
    expect(resolveRequestLocale(request)).toBe("es-419");
  });

  it("reads the country from the Cloudflare request object", () => {
    const request = makeRequest({});
    Object.defineProperty(request, "cf", { value: { country: "CO" } });
    expect(resolveRequestLocale(request)).toBe("es-419");
  });

  it("uses LatAm Spanish from the browser language when the country is missing", () => {
    expect(
      resolveRequestLocale(makeRequest({ "accept-language": "es-CO,es;q=0.9" })),
    ).toBe("es-419");
  });

  it("falls back to geo when no cookie is set", () => {
    expect(resolveRequestLocale(makeRequest({ "cf-ipcountry": "ES" }))).toBe("es-ES");
    expect(resolveRequestLocale(makeRequest({ "cf-ipcountry": "MX" }))).toBe("es-419");
  });

  it("maps legacy es cookie to LatAm Spanish outside Spain", () => {
    expect(getCookieLocale(makeRequest({}, "NEXT_LOCALE=es"))).toBe("es-419");
    expect(getCookieLocale(makeRequest({ "cf-ipcountry": "MX" }, "NEXT_LOCALE=es"))).toBe(
      "es-419",
    );
  });

  it("maps legacy es cookie in Spain to Spain Spanish", () => {
    expect(getCookieLocale(makeRequest({ "cf-ipcountry": "ES" }, "NEXT_LOCALE=es"))).toBe(
      "es-ES",
    );
  });
});
