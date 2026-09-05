import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: vi.fn(async () => ({ env: {} })),
}));
import {
  fbcFromFbclid,
  hashMetaUserValue,
  normalizeEmailForMeta,
  normalizePhoneForMeta,
  sanitizeMetaEventId,
  sanitizeMetaFbc,
  sanitizeMetaFbp,
} from "@/lib/analytics/meta-capi";

describe("Meta CAPI helpers", () => {
  it("normalizes email and phone the way Meta expects", () => {
    expect(normalizeEmailForMeta("  Maria@OakCliff.com ")).toBe(
      "maria@oakcliff.com",
    );
    expect(normalizePhoneForMeta("(214) 555-0100")).toBe("12145550100");
    expect(normalizePhoneForMeta("+1 214 555 0100")).toBe("12145550100");
  });

  it("hashes with sha256 hex", () => {
    expect(hashMetaUserValue("maria@oakcliff.com")).toHaveLength(64);
    expect(hashMetaUserValue("maria@oakcliff.com")).toBe(
      hashMetaUserValue("maria@oakcliff.com"),
    );
  });

  it("accepts Pixel event ids and cookie formats", () => {
    expect(sanitizeMetaEventId("Lead.abc-def-123456")).toBe(
      "Lead.abc-def-123456",
    );
    expect(sanitizeMetaEventId("nope")).toBeUndefined();
    expect(sanitizeMetaFbp("fb.1.1710000000.1234567890")).toBe(
      "fb.1.1710000000.1234567890",
    );
    expect(sanitizeMetaFbc("fb.1.1710000000.IwAR0testClick")).toBe(
      "fb.1.1710000000.IwAR0testClick",
    );
    expect(fbcFromFbclid("IwAR0testClick", 1710000000)).toBe(
      "fb.1.1710000000.IwAR0testClick",
    );
  });
});

describe("sendMetaCapiEvent", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    vi.stubEnv("META_CAPI_ACCESS_TOKEN", "test-token");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("no-ops without an access token", async () => {
    vi.stubEnv("META_CAPI_ACCESS_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({ email: "a@b.com" });
    expect(result.sent).toBe(false);
    expect(result.reason).toBe("missing_credentials");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      "Meta CAPI skipped: missing access token",
    );
    errorSpy.mockRestore();
  });

  it("posts a hashed Lead with event_id for Pixel dedupe", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "2080705549212381");
    vi.stubEnv("META_CAPI_ACCESS_TOKEN", "test-token");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const { sendMetaCapiEvent, hashMetaUserValue, normalizeEmailForMeta } =
      await import("@/lib/analytics/meta-capi");

    const result = await sendMetaCapiEvent({
      eventId: "Lead.abc-def-123456",
      email: "Maria@OakCliff.com",
      phone: "2145550100",
      fbp: "fb.1.1710000000.1234567890",
      fbclid: "IwAR0testClick",
      clientIp: "203.0.113.10",
      userAgent: "FBAN",
      eventSourceUrl: "/en/lp/dallas-website-audit",
      contentName: "dallas-website-audit",
      contentCategory: "landing-page",
    });

    expect(result.sent).toBe(true);
    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body)) as {
      data: Array<{
        event_name: string;
        event_id: string;
        event_source_url: string;
        user_data: {
          em: string[];
          ph: string[];
          fbp: string;
          fbc: string;
        };
      }>;
      access_token: string;
    };
    expect(body.access_token).toBe("test-token");
    expect(body.data[0].event_name).toBe("Lead");
    expect(body.data[0].event_id).toBe("Lead.abc-def-123456");
    expect(body.data[0].event_source_url).toContain("/en/lp/dallas-website-audit");
    expect(body.data[0].user_data.em[0]).toBe(
      hashMetaUserValue(normalizeEmailForMeta("Maria@OakCliff.com")),
    );
    expect(body.data[0].user_data.ph[0]).toBe(
      hashMetaUserValue("12145550100"),
    );
    expect(body.data[0].user_data.fbp).toBe("fb.1.1710000000.1234567890");
    expect(body.data[0].user_data.fbc).toContain("IwAR0testClick");
    expect(infoSpy).toHaveBeenCalledWith("Meta CAPI Lead sent");
    infoSpy.mockRestore();
  });

  it("still posts when the public pixel env is unset but a CAPI token exists", async () => {
    vi.resetModules();
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", undefined as unknown as string);
    vi.stubEnv("META_CAPI_ACCESS_TOKEN", "test-token");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({
      eventId: "Lead.abc-def-123456",
      email: "a@b.com",
    });
    expect(result.sent).toBe(true);
    expect(infoSpy).toHaveBeenCalledWith("Meta CAPI Lead sent");
    infoSpy.mockRestore();
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain("/2080705549212381/events");
  });
});
