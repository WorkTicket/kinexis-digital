import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PENDING_CONVERSION_KEY } from "@/lib/analytics/pending-conversion";

function memorySession() {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => {
      store.clear();
    },
    get length() {
      return store.size;
    },
    key: (i: number) => [...store.keys()][i] ?? null,
  };
}

function cookieJar() {
  const cookies = new Map<string, string>();
  return {
    get cookie() {
      return [...cookies.entries()]
        .map(([name, value]) => `${name}=${value}`)
        .join("; ");
    },
    set cookie(value: string) {
      const [pair] = value.split(";");
      const eq = pair.indexOf("=");
      if (eq < 0) return;
      const name = pair.slice(0, eq).trim();
      const raw = pair.slice(eq + 1).trim();
      if (value.includes("Max-Age=0")) {
        cookies.delete(name);
        return;
      }
      cookies.set(name, raw);
    },
  };
}

describe("createMetaEventId", () => {
  it("prefixes the event name", async () => {
    const { createMetaEventId } = await import(
      "@/lib/analytics/pending-conversion"
    );
    expect(createMetaEventId("Lead").startsWith("Lead.")).toBe(true);
  });
});

describe("pending conversion storage", () => {
  beforeEach(() => {
    vi.stubGlobal("window", { sessionStorage: memorySession() });
    vi.stubGlobal("document", cookieJar());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("round-trips through sessionStorage", async () => {
    const {
      stashPendingConversion,
      peekPendingConversion,
      consumePendingConversion,
    } = await import("@/lib/analytics/pending-conversion");

    stashPendingConversion({
      type: "lead",
      email: "a@b.com",
      conversionAlreadyFired: true,
      metaEvent: "Lead",
    });
    const peeked = peekPendingConversion();
    expect(peeked?.email).toBe("a@b.com");
    expect(consumePendingConversion()?.email).toBe("a@b.com");
    expect(peekPendingConversion()).toBeNull();
  });

  it("reads from a cookie when sessionStorage is empty", async () => {
    const { peekPendingConversion } = await import(
      "@/lib/analytics/pending-conversion"
    );
    const payload = {
      type: "lead",
      email: "cookie@b.com",
      storedAt: Date.now(),
    };
    document.cookie = `${PENDING_CONVERSION_KEY}=${encodeURIComponent(JSON.stringify(payload))}; Path=/`;
    expect(peekPendingConversion()?.email).toBe("cookie@b.com");
  });
});

describe("claimMetaEventFire", () => {
  beforeEach(() => {
    vi.stubGlobal("window", { sessionStorage: memorySession() });
    vi.stubGlobal("document", cookieJar());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("allows the first claim and blocks the second", async () => {
    const { claimMetaEventFire } = await import(
      "@/lib/analytics/pending-conversion"
    );
    expect(claimMetaEventFire("Lead.abc")).toBe(true);
    expect(claimMetaEventFire("Lead.abc")).toBe(false);
  });
});

describe("READ_PENDING_CONVERSION_JS", () => {
  it("falls back to the first-party cookie", async () => {
    const { READ_PENDING_CONVERSION_JS } = await import(
      "@/lib/analytics/pending-conversion"
    );
    expect(READ_PENDING_CONVERSION_JS).toContain(PENDING_CONVERSION_KEY);
    expect(READ_PENDING_CONVERSION_JS).toContain("document.cookie");
  });
});
