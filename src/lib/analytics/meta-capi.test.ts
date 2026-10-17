import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
    expect(hashMetaUserValue("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    expect(hashMetaUserValue("maria@oakcliff.com")).toHaveLength(64);
    expect(hashMetaUserValue("maria@oakcliff.com")).toBe(
      hashMetaUserValue("maria@oakcliff.com"),
    );
  });

  it("builds fbc with a millisecond timestamp", () => {
    expect(fbcFromFbclid("click123", 1710000000000)).toBe("fb.1.1710000000000.click123");
    expect(sanitizeMetaEventId("QualifiedLead.abc-def-123456")).toBe("QualifiedLead.abc-def-123456");
  });

  it("accepts Pixel event ids and cookie formats", () => {
    expect(sanitizeMetaEventId("Lead.abc-def-123456")).toBe(
      "Lead.abc-def-123456",
    );
    expect(sanitizeMetaEventId("Contact.abc-def-123456")).toBe(
      "Contact.abc-def-123456",
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
    vi.mocked(getCloudflareContext).mockResolvedValue({ env: {} } as Awaited<ReturnType<typeof getCloudflareContext>>);
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
      firstName: " Maria ",
      lastName: " Garcia ",
      fbp: "fb.1.1710000000.1234567890",
      fbclid: "IwAR0testClick",
      clientIp: "203.0.113.10",
      userAgent: "FBAN",
      eventSourceUrl: "/en/lp/get-a-website",
      contentName: "get-a-website",
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
    expect(body.data[0].event_source_url).toContain("/en/lp/get-a-website");
    expect(body.data[0].user_data.em[0]).toBe(
      hashMetaUserValue(normalizeEmailForMeta("Maria@OakCliff.com")),
    );
    expect(body.data[0].user_data.ph[0]).toBe(
      hashMetaUserValue("12145550100"),
    );
    expect(body.data[0].user_data.fbp).toBe("fb.1.1710000000.1234567890");
    expect(body.data[0].user_data.fbc).toContain("IwAR0testClick");
    expect(body.data[0].user_data).toMatchObject({
      fn: [hashMetaUserValue("maria")],
      ln: [hashMetaUserValue("garcia")],
      external_id: [hashMetaUserValue("maria@oakcliff.com")],
      client_ip_address: "203.0.113.10",
      client_user_agent: "FBAN",
    });
    expect(body.data[0]).toHaveProperty("action_source", "website");
    expect(infoSpy).toHaveBeenCalledWith("Meta CAPI Lead sent");
    infoSpy.mockRestore();
  });

  it("includes value and currency in Lead custom_data", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({
      eventId: "Lead.abc-def-123456",
      contentName: "get-a-website",
      value: 0,
      currency: "USD",
    });

    expect(result.sent).toBe(true);
    const body = JSON.parse(
      (fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string,
    ) as { data: Array<{ custom_data: Record<string, unknown> }> };
    expect(body.data[0].custom_data).toEqual({
      content_name: "get-a-website",
      value: 0,
      currency: "USD",
    });
    infoSpy.mockRestore();
  });

  it("reads the token and test code from Cloudflare runtime secrets", async () => {
    vi.stubEnv("META_CAPI_ACCESS_TOKEN", "");
    vi.stubEnv("META_CAPI_TEST_EVENT_CODE", "");
    vi.mocked(getCloudflareContext).mockResolvedValue({
      env: { META_CAPI_ACCESS_TOKEN: "worker-token", META_CAPI_TEST_EVENT_CODE: "TEST123" },
    } as Awaited<ReturnType<typeof getCloudflareContext>>);
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    expect((await sendMetaCapiEvent({ email: "lead@example.com" })).sent).toBe(true);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.access_token).toBe("worker-token");
    expect(body.test_event_code).toBe("TEST123");
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

  it("logs status plus Meta error message, code and fbtrace_id on non-OK", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({
        error: {
          message: "Invalid parameter",
          code: 100,
          fbtrace_id: "AbCdEf123",
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({
      eventId: "Lead.abc-def-123456",
      email: "a@b.com",
    });

    expect(result.sent).toBe(false);
    expect(result.reason).toBe("http_error");
    expect(errorSpy).toHaveBeenCalledWith(
      "Meta CAPI HTTP 400: Invalid parameter, code 100, fbtrace_id AbCdEf123",
    );
    const logged = errorSpy.mock.calls.flat().join(" ");
    expect(logged).not.toContain("test-token");
    expect(logged).not.toContain("a@b.com");
    errorSpy.mockRestore();
  });

  it("logs events_received on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ events_received: 1, fbtrace_id: "AbCdEf123" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({ email: "lead@example.com" });

    expect(result.sent).toBe(true);
    expect(infoSpy).toHaveBeenCalledWith("Meta CAPI Lead sent events_received=1");
    infoSpy.mockRestore();
  });

  it("marks TEST MODE when a test code is set", async () => {
    vi.stubEnv("META_CAPI_TEST_EVENT_CODE", "TEST123");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ events_received: 1 }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({ email: "lead@example.com" });

    expect(result.sent).toBe(true);
    expect(infoSpy).toHaveBeenCalledWith(
      "Meta CAPI Lead sent (TEST MODE) events_received=1",
    );
    infoSpy.mockRestore();
  });

  it("distinguishes a timeout from a network error", async () => {
    const timeout = new Error("The operation was aborted due to timeout");
    timeout.name = "TimeoutError";
    const fetchMock = vi.fn().mockRejectedValue(timeout);
    vi.stubGlobal("fetch", fetchMock);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({ email: "lead@example.com" });

    expect(result.sent).toBe(false);
    expect(result.reason).toBe("network");
    expect(errorSpy).toHaveBeenCalledWith(
      "Meta CAPI request failed: timeout after 2500ms",
    );
    errorSpy.mockRestore();
  });

  it("reports a network error when fetch rejects", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError("fetch failed"));
    vi.stubGlobal("fetch", fetchMock);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendMetaCapiEvent } = await import("@/lib/analytics/meta-capi");
    const result = await sendMetaCapiEvent({ email: "lead@example.com" });

    expect(result.sent).toBe(false);
    expect(result.reason).toBe("network");
    expect(errorSpy).toHaveBeenCalledWith(
      "Meta CAPI request failed: network error",
    );
    errorSpy.mockRestore();
  });
});
