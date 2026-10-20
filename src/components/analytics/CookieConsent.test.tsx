// @vitest-environment jsdom
import type { ReactNode } from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CookieConsentProvider } from "./CookieConsent";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/pay",
  Link: ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => <a href={href} className={className}>{children}</a>,
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.documentElement.classList.remove("cookie-pending");
});

describe("cookie banner layout reservation", () => {
  it("tracks the banner height when its content wraps and cleans up on unmount", () => {
    localStorage.clear();
    let height = 280;
    let resize!: () => void;
    const disconnect = vi.fn();
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ height }) as DOMRect);
    vi.stubGlobal("ResizeObserver", class {
      constructor(callback: () => void) { resize = callback; }
      observe = vi.fn();
      disconnect = disconnect;
    });
    const { unmount } = render(<CookieConsentProvider><footer><button type="button">Español</button></footer></CookieConsentProvider>);
    expect(document.documentElement).toHaveClass("cookie-pending");
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-height")).toBe("280px");
    height = 380;
    act(() => resize());
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-height")).toBe("380px");
    expect(screen.getByRole("button", { name: "Español" })).toBeVisible();
    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(document.documentElement.style.getPropertyValue("--cookie-banner-height")).toBe("");
  });
});
