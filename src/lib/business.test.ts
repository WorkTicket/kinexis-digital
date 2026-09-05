import { afterEach, describe, expect, it, vi } from "vitest";

describe("business phone", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults to the public Wyoming number when env is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUSINESS_PHONE", undefined as unknown as string);
    const { DEFAULT_BUSINESS_PHONE, getBusinessPhoneDisplay, getBusinessTelHref } =
      await import("@/lib/business");
    expect(DEFAULT_BUSINESS_PHONE).toBe("+13075003371");
    expect(getBusinessPhoneDisplay()).toBe("+1 (307) 500-3371");
    expect(getBusinessTelHref()).toBe("tel:+13075003371");
  });

  it("hides call CTAs when env is explicitly empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUSINESS_PHONE", "");
    const { getBusinessTelHref, businessProfile } = await import("@/lib/business");
    expect(businessProfile.phone).toBeUndefined();
    expect(getBusinessTelHref()).toBeNull();
  });

  it("formats a custom E.164 override", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUSINESS_PHONE", "+14165550199");
    const { formatBusinessPhone, getBusinessTelHref } = await import(
      "@/lib/business"
    );
    expect(formatBusinessPhone("+14165550199")).toBe("+1 (416) 555-0199");
    expect(getBusinessTelHref()).toBe("tel:+14165550199");
  });
});
