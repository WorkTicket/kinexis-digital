vi.mock("@/lib/analytics/consent", async (importOriginal) => ({ ...await importOriginal<typeof import("@/lib/analytics/consent")>(), readStoredConsent: () => "accepted" }));
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LEAD_FIELD_CODES, trackLandingFunnel, type LandingFunnelEvent } from "./landing-funnel";

beforeEach(() => {
  window.history.replaceState({}, "", "/en/lp/get-a-website");
  window.gtag = vi.fn(); window.fbq = Object.assign(vi.fn(), { queue: [], loaded: true, version: "2.0", push: vi.fn() }) as unknown as NonNullable<Window["fbq"]>;
});
afterEach(() => { delete window.gtag; delete window.fbq; });

describe("custom landing funnel events", () => {
  it.each<LandingFunnelEvent>(["cta_click", "form_start", "form_step1_complete", "form_step2_view", "form_validation_error", "form_abandon", "form_view", "form_submit_error", "form_submit_success", "case_study_view"])("sends %s as a custom event only", event => {
    const params = { landingSlug: "get-a-website", form_step: "1", step: "1", fields: "f_budget", error_fields: "f_budget", error_count: "1", last_field: "f_contact_a", filled_count: "3", status: "500", budget_given: "yes", timeline_given: "no" };
    trackLandingFunnel(event, params);
    const payload = { ...params, landing_page: params.landingSlug } as Record<string, string>;
    delete payload.landingSlug;
    expect(window.gtag).toHaveBeenCalledWith("event", event, event === "form_abandon" ? { ...payload, transport_type: "beacon" } : payload);
    expect(window.fbq).toHaveBeenCalledExactlyOnceWith("trackCustom", event, payload);
    expect(window.fbq).not.toHaveBeenCalledWith("track", expect.anything(), expect.anything());
    const raw = JSON.stringify(vi.mocked(window.fbq!).mock.calls);
    for (const personal of ["@", "9195551234", "Alex", "email", "phone"]) expect(raw).not.toContain(personal);
  });
  it("uses the documented field codes", () => {
    expect(LEAD_FIELD_CODES).toEqual({ role: "f_role", industry: "f_work", budget: "f_budget", timeline: "f_timeline", name: "f_name", phone: "f_contact_b", email: "f_contact_a", businessName: "f_business", website: "f_site_url" });
  });
  it("isolates tracking failures", () => {
    window.gtag = vi.fn(() => { throw new Error("blocked"); });
    expect(() => trackLandingFunnel("form_view", { landingSlug: "get-a-website" })).not.toThrow();
    expect(window.fbq).toHaveBeenCalledWith("trackCustom", "form_view", { landing_page: "get-a-website" });
  });
});
