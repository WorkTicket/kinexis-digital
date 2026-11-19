/**
 * Scope B funnel events — marketing site.
 *
 * status:
 * - live: emitted from this repo (consent-gated where analytics)
 * - placeholder: reserved for KINEXIS Connect / ops workflows (not emitted here yet)
 */

export const FUNNEL_EVENTS = {
  preview_form_view: {
    status: "live",
    source: "boot.js IntersectionObserver on form[data-conversion=preview]",
  },
  preview_form_start: {
    status: "live",
    source: "boot.js focusin on form[data-conversion=preview]",
  },
  preview_form_submit: {
    status: "live",
    source: "boot.js after successful /api/contact; diagnostic funnel event, not a primary conversion",
  },
  generate_lead: {
    status: "live",
    source: "boot.js; canonical GA4 primary conversion after successful preview submit",
  },
  audit_request: {
    status: "live",
    source: "boot.js after successful website-audit form submission",
  },
  plan_selected: {
    status: "live",
    source: "PayCheckout radio change → kinexis:track",
  },
  checkout_started: {
    status: "live",
    source: "PayCheckout PayPal onClick → kinexis:track",
  },
  subscription_created: {
    status: "live",
    source: "PayCheckout PayPal onApprove → kinexis:track",
  },
  purchase: {
    status: "live",
    source: "pay/thanks invoice paid → CheckoutTrack",
  },
  preview_delivered: {
    status: "placeholder",
    source: "Connect / ops when preview email or link is sent",
  },
  preview_approved: {
    status: "placeholder",
    source: "Connect / ops when customer approves preview",
  },
  missed_call_replied: {
    status: "placeholder",
    source: "Connect when missed-call SMS gets a reply",
  },
  appointment_booked: {
    status: "placeholder",
    source: "Connect when a booking is confirmed",
  },
} as const;

export type FunnelEventName = keyof typeof FUNNEL_EVENTS;
