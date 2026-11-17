# Phase 8 — Analytics, attribution, and real-user monitoring

**Status:** Local audit complete; no push, merge, deployment, production data access, or live-provider test.  
**Branch/base:** `phase-1/conversion-handoff` / `85afffbf25c7204bc2901bb0d9f8364b44270b80`

## Executive result

No duplicate analytics library was added. GA4 and Meta Pixel are implemented in `public/assets/js/boot.js`; IDs come from build-time `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` in `src/components/DocumentShell.tsx`. Their presence/configuration is not proof of collection at a provider. No live provider request or account was inspected. Nonessential analytics starts only after the respective consent flag; Meta also waits for interaction or its 45-second timer. Consent changes arm trackers but do not unload already-loaded scripts or revoke their cookies.

Preview and audit conversions are emitted only after `/api/contact` returns success. A preview emits both `generate_lead` (legacy alias) and `preview_form_submit` to GA4, plus `Lead` to Meta. An audit emits `audit_request` and Meta `Lead`. This means two GA4 event names describe one preview completion; do not sum them as separate leads. Failed responses do not emit those completion events. Contact/update/intake forms without the explicit `data-conversion` tags are not counted by these completion branches. Client-side button disabling limits accidental repeats within one submission, but there is no server idempotency key: a deliberate retry/new submission can create another delivered message and conversion.

Attribution is incomplete for marketing forms: the browser does not append UTM/click IDs/referrer to the contact submission. Conferbot separately extracts `landingPage`, `referrer`, `utmSource`, `utmMedium`, and `utmCampaign`, but its integration is flag-gated and provider delivery is not established. RUM is first-party, sampled, and consent-independent per existing policy; its INP/CLS aggregation is not a standards-compliant page-level Web Vitals implementation. These are escalated rather than silently treated as verified.

## Inventory and verification

See `ANALYTICS-EVENT-INVENTORY.csv`, `CONVERSION-MEASUREMENT.md`, `ATTRIBUTION-AUDIT.md`, `CONSENT-VERIFICATION.md`, and `RUM-AUDIT.md`. Existing funnel registry is `src/lib/funnel-events.ts`. Build-time IDs are empty unless provided; no credentials were read. No production traffic, logs, analytics accounts, external sinks, or provider state were queried.

## Verification

- `npm run check`: passed; 28 existing lint warnings, no errors. Includes contact delivery mocks, Conferbot checks, and `check:rum`.
- `npm run check:invoice-security`: passed; PayPal HTTP mocked; sandbox not run.
- `npm run test:e2e -- --workers=4`: **60 passed, 6 skipped, 0 failed**. Existing tests verified preview/audit success-only events, internal intake/update exclusion, undecided/reject consent, analytics-only isolation, and consent behavior on mobile. The live-ID measurement-delivery test was skipped; no provider request was sent.
- `npm run build`: passed; 297 static pages generated. Existing local Durable Object warning appeared.
- No dedicated attribution regression test exists; attribution is presently absent. No changes were made to application behavior, so no new app test was added.

Tests/build are local and mocked; they do not prove production provider collection or live delivery.

## Open findings and gates

- **High priority for measurement:** campaign attribution is absent from `/api/contact` lead payloads; multi-page attribution is not implemented. Preserve privacy/consent policy before adding it.
- **Measurement accuracy:** `generate_lead` and `preview_form_submit` are aliases for one preview; dashboards must select one canonical conversion.
- **Reliability:** no idempotency/deduplication for repeated successful contact submissions; analytics alone cannot establish unique people or qualified opportunities.
- **RUM:** custom observer events are not equivalent to field-standard LCP/INP/CLS; Cloudflare log collection/retention and real-user data remain unverified.
- **External validation:** GA4/Meta delivery, consent-mode behavior at each vendor, email lead delivery, and Conferbot production delivery remain unverified.
- Preserve all release blockers: desktop/mobile Lighthouse budgets; A1 genuine screenshot recapture; manual WCAG 2.2 AA; production field CWV; PayPal sandbox; lead delivery and Conferbot; owner decisions on billing and guarantees; review/portfolio evidence; 13 moderate full-tree advisories; KV rate-limit limitations.

No code correction was made: attribution changes require a clear decision on consent basis, retention, and whether campaign data should be sent to email delivery; RUM correction requires selecting/approving a measurement definition. Phase 9 remains pending review and separate authorization.

**Exact final commit:** pending local commit.
