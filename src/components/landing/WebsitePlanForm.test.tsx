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
function fill() {
  fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText(/^Phone/), { target: { value: "(919) 555-1234" } });
  fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "Alex@EXAMPLE.COM" } });
}
function currentForm() { return document.querySelector("form")!; }

describe("website project form (single step)", () => {
  it("offers only name, phone, email and the optional budget/timeline chips", () => {
    const { container } = setup();
    const inputs = [...container.querySelectorAll('input:not([name="_hp"]):not([type="radio"])')];
    expect(inputs.map(input => input.getAttribute("name"))).toEqual(["name", "phone", "email"]);
    expect([...container.querySelectorAll('input[type="radio"]')].map(input => input.getAttribute("name")))
      .toEqual(["lp-plan-budget", "lp-plan-budget", "lp-plan-budget", "lp-plan-timeline", "lp-plan-timeline", "lp-plan-timeline"]);
    expect(screen.queryByLabelText(/Business name/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Current website/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Step \d of/)).not.toBeInTheDocument();
  });

  it("submits with only name, phone and email filled, keeping every POST key", async () => {
    setup(); fill(); fireEvent.submit(currentForm());
    await waitFor(() => expect(mocks.audit).toHaveBeenCalledTimes(1));
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(body).toEqual({ name: "Alex", email: "Alex@example.com", phone: "+19195551234", businessName: "", website: "", websiteRequired: false, budget: "", timeline: "", role: "", industry: "", websiteStatus: "None", service: expect.any(String), source: "landing-page", landingSlug: "get-a-website", auditType: expect.any(String), metaEventId: "Lead.unit-test-123", _hp: "", _ts: expect.any(Number), utm_source: "test" });
    expect(mocks.funnel).toHaveBeenCalledWith("form_submit_success", { budget_given: "no", timeline_given: "no" });
    expect(mocks.funnel).not.toHaveBeenCalledWith("form_step1_complete", expect.anything());
    expect(mocks.funnel).not.toHaveBeenCalledWith("form_step2_view", expect.anything());
  });

  it("sends the chosen budget and timeline as yes", async () => {
    setup(); fill();
    fireEvent.click(screen.getByRole("radio", { name: "$500–$1,999" }));
    fireEvent.click(screen.getByRole("radio", { name: "Next 30 days" }));
    fireEvent.submit(currentForm());
    await waitFor(() => expect(mocks.audit).toHaveBeenCalledTimes(1));
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(body.budget).toBe("$500–$1,999");
    expect(body.timeline).toBe("Next 30 days");
    expect(mocks.funnel).toHaveBeenCalledWith("form_submit_success", { budget_given: "yes", timeline_given: "yes" });
  });

  it("summarizes the three missing fields and focuses the first", async () => {
    setup();
    fireEvent.submit(currentForm());
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 3 things:");
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a 10-digit phone number, like (919) 555-1234.")).toBeInTheDocument();
    expect(screen.getByText("Enter an email like name@company.com.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(/^Name/)).toHaveFocus());
    expect(fetch).not.toHaveBeenCalled();
    expect(mocks.funnel).toHaveBeenCalledWith("form_validation_error", expect.objectContaining({ form_step: "1", error_fields: "f_name|f_contact_b|f_contact_a", error_count: "3" }));
  });

  it.each([["Name", "Enter your name."], ["Phone", "Enter a 10-digit phone number, like (919) 555-1234."], ["Email", "Enter an email like name@company.com."]] as const)("blocks submit and focuses %s when missing", async (label, message) => {
    setup(); fill();
    fireEvent.change(screen.getByLabelText(new RegExp(`^${label}`)), { target: { value: "" } });
    fireEvent.submit(currentForm());
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 1 things:");
    expect(screen.getByText(message)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText(new RegExp(`^${label}`))).toHaveFocus());
    expect(fetch).not.toHaveBeenCalled();
  });

  it("keeps budget and timeline optional and lets a chip unselect", () => {
    setup();
    const budget = screen.getByRole("radio", { name: "$500–$1,999" });
    fireEvent.click(budget); expect(budget).toBeChecked();
    fireEvent.click(budget); expect(budget).not.toBeChecked();
    const timeline = screen.getByRole("radio", { name: "Next 30 days" });
    fireEvent.click(timeline); expect(timeline).toBeChecked();
    fireEvent.click(timeline); expect(timeline).not.toBeChecked();
    expect(mocks.funnel).toHaveBeenCalledWith("form_start", expect.objectContaining({ landingSlug: "get-a-website" }));
  });

  it("keeps values on failed validation", async () => {
    setup();
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Alex" } });
    fireEvent.click(screen.getByRole("radio", { name: "$500–$1,999" }));
    fireEvent.submit(currentForm());
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 2 things:");
    await waitFor(() => expect(screen.getByLabelText(/^Phone/)).toHaveFocus());
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Alex");
    expect(screen.getByRole("radio", { name: "$500–$1,999" })).toBeChecked();
  });

  it.each(["(919) 555-1234", "+1 919 555 1234", "9195551234"])("formats %s on blur", raw => {
    setup(); const phone = screen.getByLabelText(/^Phone/);
    fireEvent.change(phone, { target: { value: raw } }); fireEvent.blur(phone);
    expect(phone).toHaveValue("(919) 555-1234"); expect(phone).toHaveAttribute("aria-invalid", "false");
  });

  it("moves focus on Enter and only lets email submit a complete form", () => {
    setup();
    const name = screen.getByLabelText(/^Name/);
    fireEvent.change(name, { target: { value: "Alex" } });
    fireEvent.keyDown(name, { key: "Enter" });
    expect(screen.getByLabelText(/^Phone/)).toHaveFocus();
    fireEvent.keyDown(screen.getByLabelText(/^Phone/), { key: "Enter" });
    expect(screen.getByLabelText(/^Email/)).toHaveFocus();
    const blocked = fireEvent.keyDown(screen.getByLabelText(/^Email/), { key: "Enter" });
    expect(blocked).toBe(false);
    expect(screen.getByRole("alert")).toHaveTextContent("Please fix 2 things:");
    expect(fetch).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/^Phone/), { target: { value: "9195551234" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "alex@example.com" } });
    const allowed = fireEvent.keyDown(screen.getByLabelText(/^Email/), { key: "Enter" });
    expect(allowed).toBe(true);
  });

  it("sends one request on double submit", () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));
    setup(); fill();
    fireEvent.submit(currentForm()); fireEvent.submit(currentForm());
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(currentForm()).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Sending…" })).toBeDisabled();
  });

  it.each([500, 429, "network"])("preserves values and allows retry after %s", async status => {
    if (status === "network") vi.mocked(fetch).mockRejectedValue(new Error("offline"));
    else vi.mocked(fetch).mockResolvedValue({ ok: false, status, json: async () => ({}) } as Response);
    setup(); fill(); fireEvent.submit(currentForm());
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(status === 429 ? "Too many attempts." : "Something went wrong on our side"));
    expect(screen.getByRole("link", { name: "Call +1 (307) 500-3371" })).toHaveAttribute("href", "tel:+13075003371");
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Alex");
    expect(currentForm().querySelector('button[type="submit"]')).not.toBeDisabled();
    expect(mocks.funnel).toHaveBeenCalledWith("form_submit_error", { landingSlug: "get-a-website", form_step: "1", status: String(status) });
    expect(mocks.audit).not.toHaveBeenCalled();
  });

  it("shows a server field error and focuses it", async () => {
    vi.mocked(fetch).mockResolvedValue({ ok: false, status: 400, json: async () => ({ field: "phone", error: "Check this phone." }) } as Response);
    setup(); fill(); fireEvent.submit(currentForm());
    await waitFor(() => expect(screen.getByText("Check this phone.")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByLabelText(/^Phone/)).toHaveFocus());
    expect(screen.getByLabelText(/^Phone/)).toHaveValue("(919) 555-1234");
  });

  it("tracks a view once including tall forms and abandons once with codes", () => {
    setup();
    act(() => { observed([{ isIntersecting: true, intersectionRatio: .25, intersectionRect: { height: 400 }, rootBounds: { height: 667 } }] as IntersectionObserverEntry[], {} as IntersectionObserver); });
    act(() => { observed([{ isIntersecting: true, intersectionRatio: .75, intersectionRect: { height: 500 }, rootBounds: { height: 667 } }] as IntersectionObserverEntry[], {} as IntersectionObserver); });
    expect(mocks.funnel.mock.calls.filter(([name]) => name === "form_view")).toHaveLength(1);
    fireEvent.click(screen.getByRole("radio", { name: "$500–$1,999" }));
    fireEvent(window, new Event("pagehide")); fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel.mock.calls.filter(([name]) => name === "form_abandon")).toEqual([["form_abandon", { landingSlug: "get-a-website", form_step: "1", step: "1", last_field: "f_budget", filled_count: "1" }]]);
  });

  it("abandons once across visibilitychange and pagehide", () => {
    setup();
    fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel).not.toHaveBeenCalledWith("form_abandon", expect.anything());
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Alex" } });
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel.mock.calls.filter(([name]) => name === "form_abandon")).toHaveLength(1);
  });

  it("does not abandon a successful lead", async () => {
    setup(); fill(); fireEvent.submit(currentForm());
    await waitFor(() => expect(mocks.audit).toHaveBeenCalled());
    fireEvent(window, new Event("pagehide"));
    expect(mocks.funnel).not.toHaveBeenCalledWith("form_abandon", expect.anything());
  });

  it("renders the same single-step layout in Spanish", () => {
    mocks.locale = "es-419";
    const { container } = setup();
    expect(screen.getByText("¿Dónde te llamamos?")).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nombre/)).toBeRequired();
    expect(screen.getByLabelText(/^Teléfono/)).toBeRequired();
    expect(screen.getByLabelText(/^Correo electrónico/)).toBeRequired();
    expect([...container.querySelectorAll('input:not([name="_hp"]):not([type="radio"])')].map(input => input.getAttribute("name"))).toEqual(["name", "phone", "email"]);
    expect(screen.queryByText(/Paso \d de/)).not.toBeInTheDocument();
  });
});
