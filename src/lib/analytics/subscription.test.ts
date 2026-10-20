// @vitest-environment jsdom
import { beforeEach, expect, it, vi } from "vitest";
import { trackSubscription } from "./subscription";
import { readStoredConsent } from "./consent";
vi.mock("./consent", () => ({ readStoredConsent: vi.fn() }));
beforeEach(() => { sessionStorage.clear(); window.gtag = vi.fn(); window.fbq = Object.assign(vi.fn(), { queue: [], loaded: true, version: "2.0", push: vi.fn() }) as unknown as NonNullable<typeof window.fbq>; });
it("requires accepted consent and a valid ID", () => {
  for (const consent of [null, "rejected"] as const) { vi.mocked(readStoredConsent).mockReturnValue(consent); trackSubscription("website", "I-TEST123456"); }
  vi.mocked(readStoredConsent).mockReturnValue("accepted"); trackSubscription("website", "invalid");
  expect(window.gtag).not.toHaveBeenCalled(); expect(window.fbq).not.toHaveBeenCalled();
});
it("sends plan value once per ID even on refresh", () => {
  vi.mocked(readStoredConsent).mockReturnValue("accepted");
  trackSubscription("leadSystem", "I-TEST123456"); trackSubscription("leadSystem", "I-TEST123456");
  expect(window.gtag).toHaveBeenCalledTimes(2);
  expect(window.fbq).toHaveBeenCalledExactlyOnceWith("track", "Subscribe", { value: 197, currency: "USD" }, { eventID: "I-TEST123456" });
});
