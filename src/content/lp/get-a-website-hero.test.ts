import { describe, expect, it } from "vitest";
import { getLandingPage } from "@/content/registry/landing-pages";

/** Mirrors the browser's srcset pick: smallest candidate >= sizes × DPR. */
function pickCandidate(sizes: string, viewport: number, dpr: number, widths: number[]) {
  const clause = sizes
    .split(",")
    .map(part => part.trim())
    .find(part => {
      const media = part.match(/\(max-width:\s*(\d+)px\)/);
      return !media || viewport <= Number(media[1]);
    });
  if (!clause) throw new Error(`No sizes clause matched: ${sizes}`);
  const value = clause.replace(/\(max-width:\s*\d+px\)\s*/, "");
  const cssPx = evaluateSize(value, viewport);
  const needed = cssPx * dpr;
  return widths.find(width => width >= needed);
}

function evaluateSize(value: string, viewport: number): number {
  const calc = value.match(/^calc\(\s*([\d.]+)vw\s*-\s*([\d.]+)rem\s*\)$/);
  if (calc) return (viewport * Number(calc[1])) / 100 - Number(calc[2]) * 16;
  const token = value.match(/^([\d.]+)(px|rem|vw)$/);
  if (!token) throw new Error(`Unsupported sizes value: ${value}`);
  const amount = Number(token[1]);
  if (token[2] === "rem") return amount * 16;
  if (token[2] === "vw") return (viewport * amount) / 100;
  return amount;
}

describe("get-a-website hero device image", () => {
  it.each(["en", "es-419", "es-ES"] as const)(
    "serves the 640w file to a Pixel 7 on %s",
    locale => {
      const sizes = getLandingPage("get-a-website", locale)?.heroDevices?.sizes;
      expect(sizes).toBeTruthy();
      expect(sizes).toContain("(max-width: 640px) 200px");
      // Pixel 7: 412 CSS px viewport at DPR 2.625 → 525px needed → 640w wins.
      expect(pickCandidate(sizes!, 412, 2.625, [640, 960, 1440, 2048])).toBe(640);
    },
  );

  it("keeps a larger candidate for tablets", () => {
    const sizes = getLandingPage("get-a-website", "en")!.heroDevices!.sizes!;
    expect(pickCandidate(sizes, 900, 2, [640, 960, 1440, 2048])).toBeGreaterThan(640);
  });
});
