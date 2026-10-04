import { describe, expect, it } from "vitest";
import { CRITICAL_FIRST_PAINT_CSS } from "@/lib/critical-css";
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
});

describe("getLcpImagePreload", () => {
  it("does not preload the hidden homepage film on mobile", () => {
    expect(getLcpImagePreload("/")).toBeNull();
    expect(getLcpImagePreload("/en")).toBeNull();
  });

  it("does not preload a device mockup on the contractor lander", () => {
    expect(getLcpImagePreload("/lp/get-a-website")).toBeNull();
    expect(getLcpImagePreload("/en/lp/get-a-website")).toBeNull();
    expect(getLcpImagePreload("/es/lp/get-a-website")).toBeNull();
  });
});
