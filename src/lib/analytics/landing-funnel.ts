/**
 * Landing-page funnel events. These are measurement only.
 * Meta Lead is never fired from here — Lead stays on confirmed submit.
 */

export type LandingFunnelEvent =
  | "cta_click"
  | "form_start"
  | "form_step1_complete"
  | "form_step2_view"
  | "form_validation_error"
  | "form_abandon"
  | "case_study_view";

export type LandingFunnelParams = {
  landingSlug?: string;
  placement?: string;
  step?: string;
  fields?: string;
  client?: string;
};

function canTrackGa(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

function canTrackMetaCustom(): boolean {
  return typeof window !== "undefined" && typeof window.fbq === "function";
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

  if (canTrackGa()) {
    window.gtag!("event", event, payload);
  }

  if (canTrackMetaCustom()) {
    window.fbq!("trackCustom", event, payload);
  }
}
