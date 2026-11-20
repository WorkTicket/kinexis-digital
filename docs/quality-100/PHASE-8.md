# Phase 8 — Analytics, attribution, and real-user monitoring

**Status:** Audit completed; the four findings were corrected in Phase 8.1. No push, merge, deployment, production data access, or live-provider test.
**Branch/base:** `phase-1/conversion-handoff` / `85afffbf25c7204bc2901bb0d9f8364b44270b80`

## Executive result

No duplicate analytics library was added. GA4 and Meta Pixel are implemented in `public/assets/js/boot.js`; IDs come from build-time `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` in `src/components/DocumentShell.tsx`. Their presence/configuration is not proof of collection at a provider. No live provider request or account was inspected. Nonessential analytics starts only after the respective consent flag; Meta also waits for interaction or its 45-second timer. Withdrawal now sends vendor-supported consent updates and blocks application dispatch; scripts are not unloaded because removing them cannot cancel prior requests.

Preview and audit conversions are emitted only after `/api/contact` returns success. Phase 8.1 designates `generate_lead` as the sole primary GA4 preview conversion; `preview_form_submit` remains a diagnostic funnel event and must be non-key in GA4. Meta emits one `Lead`. An audit emits `audit_request` and Meta `Lead`. Failed responses do not emit completion events. Contact/update/intake forms without explicit conversion tags are not counted. The browser blocks concurrent duplicate submits; an explicit new submission remains a new lead and ambiguous delivery retries are not server-idempotent.

Consented marketing form attribution now uses first valid value per field during the tab session, with query/fragment-stripped external referrer and click-ID consent gates. `/api/contact` validates the submitted values and consent before including them in the existing lead notification. Conferbot remains separate and flag-gated. RUM now uses the maintained `web-vitals` reporters for LCP/INP/CLS with soft-navigation context; field collection and retention remain unverified.

## Inventory and verification

See `ANALYTICS-EVENT-INVENTORY.csv`, `CONVERSION-MEASUREMENT.md`, `ATTRIBUTION-AUDIT.md`, `CONSENT-VERIFICATION.md`, and `RUM-AUDIT.md`. Existing funnel registry is `src/lib/funnel-events.ts`. Build-time IDs are empty unless provided; no credentials were read. No production traffic, logs, analytics accounts, external sinks, or provider state were queried.

## Verification

- `npm run check`: passed; 28 existing lint warnings, no errors. Includes contact delivery mocks, Conferbot checks, and `check:rum`.
- `npm run check:invoice-security`: passed; PayPal HTTP mocked; sandbox not run.
- `npm run test:e2e -- --workers=4`: **60 passed, 6 skipped, 0 failed**. Existing tests verified preview/audit success-only events, internal intake/update exclusion, undecided/reject consent, analytics-only isolation, and consent behavior on mobile. The live-ID measurement-delivery test was skipped; no provider request was sent.
- `npm run build`: passed; 297 static pages generated. Existing local Durable Object warning appeared.
- Phase 8.1 added mocked contact-route attribution fixtures, client attribution/navigation and duplicate-submit Playwright checks, tracker withdrawal/reacceptance tests, and RUM library/metric mapping fixtures.

Tests/build are local and mocked; they do not prove production provider collection or live delivery.

## Open findings and gates

- **Owner action:** configure GA4 `generate_lead` as the primary/key preview conversion and keep `preview_form_submit` non-key; inspect any existing Meta custom conversion rules. No analytics account was changed.
- **Residual reliability:** client-side in-flight duplicates are blocked; server-side idempotency is absent for distinct retries, and analytics cannot establish unique people or qualification.
- **RUM:** code uses standards-based library calculations; Cloudflare retention/collection and representative production field CWV remain unverified.
- **External validation:** GA4/Meta delivery, consent-mode behavior at each vendor, email lead delivery, and Conferbot production delivery remain unverified.
- Preserve all release blockers: desktop/mobile Lighthouse budgets; A1 genuine screenshot recapture; manual WCAG 2.2 AA; production field CWV; PayPal sandbox; lead delivery and Conferbot; owner decisions on billing and guarantees; review/portfolio evidence; 13 moderate full-tree advisories; KV rate-limit limitations.

Corrections and evidence are recorded in `PHASE-8-1.md` and `ANALYTICS-CORRECTIONS.md`. Consent basis is implemented consistently with the existing distinct analytics/ads controls; operational retention of notification email and consent-independent first-party RUM still require owner/privacy review. Phase 9 remains pending review and separate authorization.

**Exact final commit:** pending local commit.
