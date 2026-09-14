import { describe, expect, it } from "vitest";
import { ASYNC_CSS_BOOT_SCRIPT, CRITICAL_FIRST_PAINT_CSS } from "@/lib/critical-css";
import { getLcpImagePreload } from "@/lib/lcp-preload";

describe("critical first-paint CSS", () => {
  it("covers hero type and header chrome without pulling the full stylesheet", () => {
    expect(CRITICAL_FIRST_PAINT_CSS).toContain(".hero-enter-2");
    expect(CRITICAL_FIRST_PAINT_CSS).toContain(".site-header");
    expect(CRITICAL_FIRST_PAINT_CSS).toContain(".btn--primary");
    expect(CRITICAL_FIRST_PAINT_CSS).toContain(
      ".btn--link{background:none;border:0;color:var(--foreground);text-decoration:none}",
    );
    expect(CRITICAL_FIRST_PAINT_CSS.length).toBeLessThan(12_000);
  });

  it("schedules async stylesheet application after paint", () => {
    expect(ASYNC_CSS_BOOT_SCRIPT).toContain("data-kinexis-async");
    expect(ASYNC_CSS_BOOT_SCRIPT).toContain("requestAnimationFrame");
  });
});

describe("getLcpImagePreload", () => {
  it("does not preload the hidden homepage film on mobile", () => {
    expect(getLcpImagePreload("/")).toBeNull();
    expect(getLcpImagePreload("/en")).toBeNull();
  });

  it("preloads the website lander hero mockup photo", () => {
    expect(getLcpImagePreload("/lp/get-a-website")).toMatch(/lp\/a1-mobile/);
    expect(getLcpImagePreload("/en/lp/get-a-website")).toMatch(/lp\/a1-mobile/);
    expect(getLcpImagePreload("/es/lp/get-a-website")).toMatch(/lp\/a1-mobile/);
  });
});
