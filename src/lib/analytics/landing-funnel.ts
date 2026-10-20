import { readStoredConsent } from "@/lib/analytics/consent";
/**
 * Landing-page funnel events. These are measurement only.
 * Meta Lead is never fired from here — Lead stays on confirmed submit.
 */
import { isMetaTrackingPath } from "@/lib/analytics/meta-tracking";

export type LandingFunnelEvent =
  | "cta_click"
  | "form_start"
  | "form_step1_complete"
  | "form_step2_view"
  | "form_validation_error"
  | "form_abandon"
  | "form_view"
  | "form_submit_error"
  | "form_submit_success"
  | "case_study_view";

export type LandingFunnelParams = {
  landingSlug?: string;
  placement?: string;
  step?: string;
  fields?: string;
  client?: string;
  form_step?: string;
  error_fields?: string;
  error_count?: string;
  last_field?: string;
  filled_count?: string;
  status?: string;
  budget_given?: string;
  timeline_given?: string;
};

// Codes only: never send entered values, names, email addresses or phone numbers.
export const LEAD_FIELD_CODES = {
  role: "f_role", industry: "f_work", budget: "f_budget", timeline: "f_timeline",
  name: "f_name", phone: "f_contact_b", email: "f_contact_a",
  businessName: "f_business", website: "f_site_url",
} as const;

function canTrackGa(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function canTrackMetaCustom(): boolean {
  return readStoredConsent() === "accepted" && typeof window !== "undefined" && isMetaTrackingPath(window.location.pathname) && typeof window.fbq === "function";
}

/** GA4 + optional Meta custom event. Safe to call from CTA/form instrumentation. */
export function trackLandingFunnel(
  event: LandingFunnelEvent,
  params: LandingFunnelParams = {},
): void {
  if (typeof window === "undefined") return;

  const payload: Record<string, string> = {};
  if (params.landingSlug) payload.landing_page = params.landingSlug;
  if (params.placement) payload.placement = params.placement;
  if (params.step) payload.step = params.step;
  if (params.fields) payload.fields = params.fields;
  if (params.client) payload.client = params.client;
  for (const key of ["form_step", "error_fields", "error_count", "last_field", "filled_count", "status", "budget_given", "timeline_given"] as const) {
    if (params[key] !== undefined) payload[key] = params[key];
  }

  if (canTrackGa()) {
    try {
      window.gtag!("event", event, event === "form_abandon" ? { ...payload, transport_type: "beacon" } : payload);
    } catch { /* Measurement must never block a form. */ }
  }

  if (canTrackMetaCustom()) {
    try {
      window.fbq!("trackCustom", event, payload);
    } catch { /* Measurement must never block a form. */ }
  }
}
