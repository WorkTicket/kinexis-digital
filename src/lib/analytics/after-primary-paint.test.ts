import { afterEach, describe, expect, it, vi } from "vitest";
import { afterPrimaryPaint } from "./after-primary-paint";

afterEach(() => vi.unstubAllGlobals());

function browser(decode: () => Promise<unknown>) {
  vi.stubGlobal("document", { querySelector: () => ({ decode }) });
  vi.stubGlobal("requestAnimationFrame", (callback: () => void) => { callback(); return 1; });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.stubGlobal("window", {
    requestIdleCallback: (callback: () => void) => { callback(); return 1; },
    cancelIdleCallback: vi.fn(),
  });
}

describe("analytics after the primary paint", () => {
  it("still enables tracking if the hero image fails to decode", async () => {
    browser(() => Promise.reject(new Error("image unavailable")));
    const enable = vi.fn();
    afterPrimaryPaint(enable);
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(enable).toHaveBeenCalledOnce();
  });

  it("cancels pending library work when navigating out before image decoding finishes", async () => {
    let resolve!: () => void;
    browser(() => new Promise<void>(done => { resolve = done; }));
    const enable = vi.fn();
    const cancel = afterPrimaryPaint(enable);
    cancel();
    resolve();
    await new Promise(done => setTimeout(done, 0));
    expect(enable).not.toHaveBeenCalled();
  });
});
