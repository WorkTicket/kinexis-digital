// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";
import { getContactContent } from "@/content/contact";

const mocks = vi.hoisted(() => ({ trackLead: vi.fn() }));
vi.mock("@/i18n/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/lib/analytics/events", () => ({ trackLead: mocks.trackLead }));
vi.mock("@/lib/analytics/click-ids", () => ({ getAttributionPayload: () => ({ gclid: "test-click" }) }));
vi.mock("@/lib/analytics/pending-conversion", () => ({ createMetaEventId: () => "test-lead", stashPendingConversion: vi.fn() }));
vi.mock("@/lib/in-app-browser", () => ({ navigateAfterSubmit: vi.fn() }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

describe("short contact form", () => {
  it("keeps the existing endpoint and lead event while including the optional URL in the message", async () => {
    // In-memory fetch only: never submits to the live site or an external service.
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const content = getContactContent("en");
    const { container } = render(<ContactForm content={content} />);
    fireEvent.change(screen.getByLabelText(/Full Name/), { target: { value: "Example Owner" } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: "owner@example.invalid" } });
    fireEvent.change(screen.getByLabelText(content.websiteLabel), { target: { value: "https://example.invalid" } });
    fireEvent.change(screen.getByLabelText(content.messageLabel), { target: { value: "A plumbing website in Houston." } });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(content.confirmFlash));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/contact");
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.message).toContain("https://example.invalid");
    expect(payload.message).toContain("A plumbing website in Houston.");
    expect(payload.gclid).toBe("test-click");
    expect(payload.metaEventId).toBe("test-lead");
    expect(mocks.trackLead).toHaveBeenCalledWith(expect.objectContaining({ formType: "contact", metaEventId: "test-lead" }));
  });
});
