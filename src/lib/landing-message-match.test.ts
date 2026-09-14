import { describe, expect, it } from "vitest";
import {
  LANDING_HEADLINES,
  LANDING_MARKETS,
  resolveLandingMessage,
} from "@/lib/landing-message-match";

describe("resolveLandingMessage", () => {
  it("falls back to the default headline and market line", () => {
    const message = resolveLandingMessage();
    expect(message.headlineKey).toBe("build_business");
    expect(message.headlineLines).toEqual(LANDING_HEADLINES.build_business);
    expect(message.marketKey).toBe("default");
    expect(message.marketLine).toBe(LANDING_MARKETS.default);
  });

  it("maps approved utm_content to the grown-business headline", () => {
    const message = resolveLandingMessage({ utmContent: "business_grown" });
    expect(message.headlineKey).toBe("business_grown");
    expect(message.headlineLines).toEqual(LANDING_HEADLINES.business_grown);
    expect(message.marketLine).toBe(LANDING_MARKETS.default);
  });

  it("maps the Raleigh campaign to market copy without reading the raw value", () => {
    const message = resolveLandingMessage({
      utmCampaign: "raleigh_contractors",
      utmContent: "build_business",
    });
    expect(message.marketKey).toBe("raleigh");
    expect(message.marketLine).toBe(LANDING_MARKETS.raleigh);
    expect(message.marketLine).not.toContain("raleigh_contractors");
  });

  it("maps an approved market token", () => {
    expect(resolveLandingMessage({ market: "raleigh" }).marketKey).toBe(
      "raleigh",
    );
  });

  it("ignores arbitrary query values and never interpolates them", () => {
    const poison = "<script>alert(1)</script>";
    const message = resolveLandingMessage({
      utmContent: poison,
      utmCampaign: "boise-hack",
      market: poison,
    });
    expect(message.headlineKey).toBe("build_business");
    expect(message.marketKey).toBe("default");
    expect(JSON.stringify(message)).not.toContain(poison);
    expect(JSON.stringify(message)).not.toContain("boise-hack");
  });
});
