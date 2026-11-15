# Funnel & Connect events

Source of truth in code: [`src/lib/funnel-events.ts`](../src/lib/funnel-events.ts).

## Live on the marketing site (consent-gated)

| Event | Emitter |
|---|---|
| `preview_form_view` | `boot.js` when a lead form is ~40% visible |
| `preview_form_start` | `boot.js` first focus inside a lead form |
| `preview_form_submit` | `boot.js` after successful `/api/contact` |
| `generate_lead` | Same submit (legacy / Meta Lead companion) |
| `plan_selected` | `PayCheckout` plan radio |
| `checkout_started` | PayPal subscribe button click |
| `subscription_created` | PayPal `onApprove` |
| `purchase` | `/pay/thanks` via `CheckoutTrack` (invoice or subscription) |

Rules: no name, email, phone, or free-text in event parameters.

## Placeholders — KINEXIS Connect / ops (not emitted here)

| Event | When Connect should emit |
|---|---|
| `preview_delivered` | Preview email or link sent to the prospect |
| `preview_approved` | Customer approves the homepage preview |
| `missed_call_replied` | Missed-call SMS receives a reply |
| `appointment_booked` | Booking confirmed |

These remain documented for the portal; do not invent client-side fake firings.

## Consent

Undecided or rejected analytics consent → `track()` / `kinexis:track` no-ops (boot does not load GA). Ads consent separately gates Meta Pixel.
