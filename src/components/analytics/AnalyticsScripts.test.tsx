// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/lp/get-a-website",
}));

vi.mock("next/script", () => ({
  default: ({ id, src }: { id?: string; src?: string }) => (
    <span data-testid={id} data-id={id} data-src={src} />
  ),
}));

vi.mock("@/components/analytics/CookieConsent", () => ({
  useCookieConsent: () => ({ consent: "accepted", ready: true }),
}));

import AnalyticsScripts from "./AnalyticsScripts";

describe("AnalyticsScripts Meta pixel library", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    window.history.replaceState({}, "", "/lp/get-a-website");
    window.fbq = Object.assign(vi.fn(), { queue: [] as unknown[] }) as unknown as NonNullable<
      Window["fbq"]
    >;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    delete (window as { fbq?: unknown }).fbq;
  });

  it("loads fbevents.js without waiting on hero paint, rAF, or idle", () => {
    render(<AnalyticsScripts />);

    // The gate used to keep this null until the hero decoded and the browser
    // hit two animation frames plus an idle callback. It must now render as
    // soon as the early fbq queue exists.
    const library = screen.getByTestId("meta-pixel-library");
    expect(library).toHaveAttribute(
      "data-src",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
    expect(screen.getAllByTestId("meta-pixel-library")).toHaveLength(1);
  });

  it("does not double-load when the worker early head already fetched fbevents.js", () => {
    const early = document.createElement("script");
    early.src = "https://connect.facebook.net/en_US/fbevents.js";
    early.async = true;
    document.head.appendChild(early);

    render(<AnalyticsScripts />);

    expect(screen.queryByTestId("meta-pixel-library")).toBeNull();
    early.remove();
  });
});
