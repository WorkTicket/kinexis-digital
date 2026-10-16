// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "../../../messages/en.json";
import es from "../../../messages/es-419.json";
import { getLandingPage } from "@/content/registry/landing-pages";
import { getWebsitePlanFormPage } from "@/lib/website-plan-form-page";
import { WebsitePlanForm } from "./WebsitePlanForm";

const mocks = vi.hoisted(() => ({ funnel: vi.fn(), lead: vi.fn(), audit: vi.fn(), locale: "en" }));
vi.mock("next-intl", () => ({ useLocale: () => mocks.locale, useTranslations: () => (key: string, args?: Record<string, string | number>) => {
  let value: unknown = (mocks.locale === "en" ? en : es).a11y.websiteLeadForm;
  for (const part of key.split(".")) value = (value as Record<string, unknown>)[part];
  return String(value).replace(/\{(\w+)\}/g, (_, field) => String(args?.[field]));
} }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("next/dynamic", () => ({ default: () => () => <div>Calendar</div> }));
vi.mock("@/lib/analytics/landing-funnel", async importOriginal => ({ ...await importOriginal<typeof import("@/lib/analytics/landing-funnel")>(), trackLandingFunnel: mocks.funnel }));
vi.mock("@/lib/analytics/events", () => ({ trackLead: mocks.lead, trackAuditLead: mocks.audit, trackCallClick: vi.fn() }));
vi.mock("@/lib/analytics/click-ids", () => ({ getAttributionPayload: () => ({ utm_source: "test" }) }));
vi.mock("@/lib/analytics/pending-conversion", () => ({ createMetaEventId: () => "Lead.unit-test-123", stashPendingConversion: vi.fn() }));
let observed: IntersectionObserverCallback;
beforeEach(() => {
  vi.clearAllMocks(); mocks.locale = "en";
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));
  vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => setTimeout(() => fn(0), 0));
  vi.stubGlobal("IntersectionObserver", class { constructor(callback: IntersectionObserverCallback) { observed = callback; } observe() {} disconnect() {} });
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function setup() {
  const page = getWebsitePlanFormPage(getLandingPage("get-a-website", mocks.locale as "en" | "es-419")!);
  return render(<section id="lp-form"><WebsitePlanForm page={page} /></section>);
}
function choose() {
  for (const label of ["Owner", "Roofing", "$500–$1,999", "Next 30 days"]) {
    fireEvent.click(screen.getByRole("radio", { name: label }));
  }
}
function next() { fireEvent.click(screen.getByRole("button", { name: /Next: where/ })); }
function contact() {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText(/^Phone/), { target: { value: "(919) 555-1234" } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "Alex@EXAMPLE.COM" } });
}
function currentForm() { return document.querySelector("form")!; }

describe("website project form", () => {
  it("requires four choices, summarizes errors and focuses the first radio", async () => {
    setup(); next();
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 4 things:");
    await waitFor(() => expect(screen.getAllByRole("radio")[0]).toHaveFocus());
    expect(fetch).not.toHaveBeenCalled();
    expect(mocks.funnel).toHaveBeenCalledWith("form_validation_error", expect.objectContaining({ form_step: "1", error_fields: "f_role|f_work|f_budget|f_timeline", error_count: "4", fields: "f_role|f_work|f_budget|f_timeline" }));
  });
  it("flags only unpicked groups and clears errors on correction", () => {
    setup(); next();
    fireEvent.click(screen.getByRole("radio", { name: "Owner" }));
    fireEvent.click(screen.getByRole("radio", { name: "Roofing" })); next();
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 2 things:");
    expect(screen.queryByText("Choose your role.")).not.toBeInTheDocument();
    expect(screen.queryByText("Choose the type of work.")).not.toBeInTheDocument();
    expect(screen.getByText("Choose a budget range.")).toBeInTheDocument();
  });
  it("moves focus on Enter in name and email without sending an incomplete form", async () => {
    setup(); choose(); next();
    const name = screen.getByLabelText(/^Name/);
    fireEvent.change(name, { target: { value: "Alex" } });
    fireEvent.keyDown(name, { key: "Enter" });
    expect(screen.getByLabelText(/^Phone/)).toHaveFocus();
    fireEvent.keyDown(screen.getByLabelText(/^Email/), { key: "Enter" });
    expect(screen.getByLabelText(/Business name/)).toHaveFocus();
    expect(fetch).not.toHaveBeenCalled();
    await waitFor(() => expect(mocks.funnel).toHaveBeenCalledWith("form_step2_view", { landingSlug: "get-a-website" }));
  });
  it("keeps values on failed validation and Back/Continue", async () => {
    setup(); choose(); next();
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Alex" } });
    fireEvent.submit(currentForm());
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 2 things:");
    await waitFor(() => expect(screen.getByLabelText(/^Phone/)).toHaveFocus());
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByRole("radio", { name: "Owner" })).toBeChecked(); next();
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Alex");
  });
  it.each(["(919) 555-1234", "+1 919 555 1234", "9195551234"])("formats %s on blur", raw => {
    setup(); choose(); next(); const phone = screen.getByLabelText(/^Phone/);
    fireEvent.change(phone, { target: { value: raw } }); fireEvent.blur(phone);
    expect(phone).toHaveValue("(919) 555-1234"); expect(phone).toHaveAttribute("aria-invalid", "false");
  });
  it("validates touched fields and clears fixed errors", () => {
    setup(); choose(); next(); const phone = screen.getByLabelText(/^Phone/);
    fireEvent.change(phone, { target: { value: "555-1234" } }); fireEvent.blur(phone);
    expect(phone).toHaveAttribute("aria-invalid", "true");
    fireEvent.change(phone, { target: { value: "9195551234" } }); expect(phone).toHaveAttribute("aria-invalid", "false");
  });
  it.each([["", "None"], ["example.com", "Outdated"]])("derives websiteStatus for %s and preserves all POST keys", async (site, status) => {
    setup(); choose(); next(); contact();
    fireEvent.change(screen.getByLabelText(/Current website/), { target: { value: site } });
    fireEvent.submit(currentForm());
    await waitFor(() => expect(mocks.audit).toHaveBeenCalledTimes(1));
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(body).toEqual({ name: "Alex", email: "Alex@example.com", phone: "+19195551234", businessName: "", website: site, websiteRequired: false, budget: "$500–$1,999", timeline: "Next 30 days", role: "Owner", industry: "Roofing", websiteStatus: status, service: expect.any(String), source: "landing-page", landingSlug: "get-a-website", auditType: expect.any(String), metaEventId: "Lead.unit-test-123", _hp: "", _ts: expect.any(Number), utm_source: "test" });
  });
  it("sends one request on double submit", async () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));
    setup(); choose(); next(); contact();
    fireEvent.submit(currentForm()); fireEvent.submit(currentForm());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(currentForm()).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
  });
  it.each([500, 429, "network"])("preserves values and allows retry after %s", async status => {
    if (status === "network") vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    else vi.mocked(fetch).mockResolvedValue({ ok: false, status, json: async () => ({}) } as Response);
    setup(); choose(); next(); contact(); fireEvent.submit(currentForm());
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(status === 429 ? "Too many attempts." : "Something went wrong on our side"));
    expect(screen.getByRole("link", { name: "Call +1 (307) 500-3371" })).toHaveAttribute("href", "tel:+13075003371");
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Alex");
    expect(currentForm().querySelector('button[type="submit"]')).not.toBeDisabled();
    expect(mocks.funnel).toHaveBeenCalledWith("form_submit_error", { landingSlug: "get-a-website", form_step: "2", status: String(status) });
    expect(mocks.audit).not.toHaveBeenCalled();
  });
  it("shows a server field error and focuses it", async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 400, json: async () => ({ field: "phone", error: "Check this phone." }) } as Response);
    setup(); choose(); next(); contact(); fireEvent.submit(currentForm());
    await waitFor(() => expect(screen.getByText("Check this phone.")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByLabelText(/^Phone/)).toHaveFocus());
    expect(screen.getByLabelText(/^Phone/)).toHaveValue("(919) 555-1234");
  });
  it("tracks a view once including tall forms and abandons once with codes", () => {
    setup();
    act(() => { observed([{ isIntersecting: true, intersectionRatio: .25, intersectionRect: { height: 400 }, rootBounds: { height: 667 } }] as IntersectionObserverEntry[], {} as IntersectionObserver); });
    act(() => { observed([{ isIntersecting: true, intersectionRatio: .75, intersectionRect: { height: 500 }, rootBounds: { height: 667 } }] as IntersectionObserverEntry[], {} as IntersectionObserver); });
    expect(mocks.funnel.mock.calls.filter(([name]) => name === "form_view")).toHaveLength(1);
    fireEvent.click(screen.getByRole("radio", { name: "Owner" }));
    fireEvent(window, new Event("pagehide")); fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel.mock.calls.filter(([name]) => name === "form_abandon")).toEqual([["form_abandon", { landingSlug: "get-a-website", form_step: "1", step: "1", last_field: "f_role", filled_count: "1" }]]);
  });

  it("abandons once across visibilitychange and pagehide", () => {
    setup();
    fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel).not.toHaveBeenCalledWith("form_abandon", expect.anything());
    fireEvent.click(screen.getByRole("radio", { name: "Owner" }));
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel.mock.calls.filter(([name]) => name === "form_abandon")).toHaveLength(1);
  });

  it("does not abandon a successful lead", async () => {
    setup(); choose(); next(); contact(); fireEvent.submit(currentForm());
    await waitFor(() => expect(mocks.audit).toHaveBeenCalled());
    fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel).not.toHaveBeenCalledWith("form_abandon", expect.anything());
  });

  it("renders the same optional fields and order in Spanish", () => {
    mocks.locale = "es-419";
    const { container } = setup();
    expect(screen.getByText("Cuéntanos sobre tu proyecto")).toBeInTheDocument();
    for (const field of ["role", "industry", "budget", "timeline"]) fireEvent.click(container.querySelector(`#lp-plan-${field} input`)!);
    fireEvent.click(screen.getByRole("button", { name: "Siguiente: ¿dónde te llamamos?" }));
    expect(screen.getByText("¿Dónde te llamamos?")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre del negocio (opcional)")).not.toBeRequired();
    expect(screen.getByLabelText("Sitio web actual (opcional)")).not.toBeRequired();
    expect([...container.querySelectorAll('input:not([name="_hp"])')].map(input => input.getAttribute("name"))).toEqual(["name", "phone", "email", "businessName", "website"]);
  });
});
