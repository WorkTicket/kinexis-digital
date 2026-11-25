# Phase 8.1 — Analytics corrections and verification

**Branch:** `phase-1/conversion-handoff`  
**Base:** `87da1441e4e6cc29ad5e8fba3f057e3931207dc5`  
**Status:** Corrections complete and locally verified. No push, merge, deployment, production data access, or live analytics events.

## Outcome

All four Phase 8 findings were corrected or explicitly dispositioned with deterministic regression evidence. Changes preserve separate analytics/ads consent, existing contact delivery, security controls, performance safeguards, and established event names. No real GA4/Meta request or account configuration was used.

## Finding dispositions

### 1. One primary preview conversion — corrected

- **Before/root cause:** successful preview emitted both `generate_lead` and `preview_form_submit` with no role distinction, so reporting could count both as primary leads.
- **Correction:** `generate_lead` is the canonical primary conversion. `preview_form_submit` remains for funnel compatibility with `event_role=diagnostic`; `src/lib/funnel-events.ts` and this report identify it as non-key. Only one `Lead` is sent to Meta. GA page views are now explicit with automatic config page views disabled to avoid duplication.
- **Files:** `public/assets/js/boot.js`, generated `public/assets/js/boot.min.js`, `src/components/Boot.tsx` (cache version), `src/lib/funnel-events.ts`, `e2e/smoke.spec.ts`, `scripts/check-analytics-corrections.mjs`.
- **Evidence:** Playwright tests cover failed response, concurrent duplicate submit, later successful retry (two POST attempts, one primary conversion), audit-vs-preview distinction, client update/intake exclusion, and exactly one GA4 primary and Meta Lead for preview.
- **Residual/external action:** confirm in GA4 Admin that only `generate_lead` is a key event; leave `preview_form_submit` non-key. Inspect Meta Events Manager custom conversions for any duplicate counting. No account settings changed or inspected.

### 2. First-touch attribution — corrected with consent bounds

- **Before/root cause:** no marketing-form capture or submission of UTM, click IDs, or referrer.
- **Correction:** first valid occurrence per field is captured in tab-scoped `sessionStorage` only after analytics consent; UTM and external referrer require analytics consent, `fbclid`/`gclid` require both analytics and ads consent. Withdrawal clears the stored values. Values are allowlisted, bounded, stripped of referrer query/fragment, and attached only to preview/audit submissions. `/api/contact` enforces the consent cookie, exact form classification, duplicate-field rejection, and server-side validation before adding attribution to the existing lead notification.
- **Files:** `public/assets/js/boot.js`, `public/assets/js/boot.min.js`, `src/lib/marketing-attribution.ts`, `src/app/api/contact/route.ts`, `scripts/check-contact-delivery.mjs`, `scripts/check-analytics-corrections.mjs`, `e2e/smoke.spec.ts`.
- **Evidence:** mocked route fixtures cover consent granted/denied, ads-only click-ID gating, malformed/oversized values, duplicate multipart fields, referrer query stripping, and omitted untrusted fields. Playwright verifies tab-session attribution survives a page navigation and drops duplicated UTM and unconsented click IDs.
- **Residual:** blocked browser storage means only current-page data can be used; there is no cross-session attribution. Contact email is the existing lead sink; notification access/retention was not inspected. Client-supplied attribution is not independently verified.

### 3. Consent withdrawal — corrected at app and vendor-control layers

- **Before/root cause:** application event guards checked current cookie consent, but already-loaded vendors received no revocation/update.
- **Correction:** GA4 receives Consent Mode default-denied then current granted state, and on every preference change receives updated analytics/ad storage and ads personalization/user-data states. Meta Pixel receives supported grant/revoke commands. Application dispatch remains independently guarded; denied consent clears tab attribution. Automatic GA page views are disabled and explicit once-per-route page views avoid double initialization. Scripts are not removed because removal cannot undo initialization or cancel completed requests.
- **Files:** `public/assets/js/boot.js`, generated `public/assets/js/boot.min.js`, `e2e/smoke.spec.ts`, `scripts/check-analytics-corrections.mjs`, `docs/quality-100/CONSENT-VERIFICATION.md`.
- **Evidence:** mocked Playwright verifies no undecided/rejected load, independent analytics-only behavior, withdrawal after both trackers initialized, no subsequent app events, vendor revoke/denied commands, reacceptance without duplicate init/page view, and reload after withdrawal without tracker script requests. GA and Meta provider scripts are aborted; no test event reaches a live account.
- **Residual:** events/requests already transmitted cannot be recalled. Provider account-side consent behavior was not verified. This client gate is not a legal determination.

### 4. Page-level Web Vitals — corrected with maintained library

- **Before/root cause:** custom event-timing duration was labeled INP and individual layout shifts were labeled CLS, without interaction/session-window aggregation.
- **Correction:** added `web-vitals` 6.2.3 and replaced the custom `public/assets/js/rum.js` observer with `src/components/Rum.tsx`, which dynamically imports the library only for the sampled 20% after hydration. `onINP`, `onCLS`, and `onLCP` use library lifecycle semantics and soft-navigation reporting; TTFB/FCP remain supplementary. `src/lib/rum-report.ts` maps metric IDs, units, navigation type and same-origin pathname only; query/hash are excluded, duplicates are suppressed, and telemetry exceptions cannot break the page.
- **Files:** `package.json`, `package-lock.json`, removed `public/assets/js/rum.js`, `src/components/Rum.tsx`, `src/lib/rum-report.ts`, `src/components/DocumentShell.tsx`, `src/components/Boot.tsx`, `src/lib/rum.ts`, `scripts/check-rum.mjs`, `docs/engineering/RUM.md`, `docs/DECISIONS.md`, `docs/quality-100/PERFORMANCE-BASELINE.md`.
- **Evidence:** automated fixtures assert the library API is available, controlled LCP/INP/CLS values map to bounded payloads, soft-navigation URL queries are removed, foreign navigation URLs cannot override local route, invalid metrics are rejected, and endpoint payload validation remains strict.
- **Residual:** local fixtures validate the library/report boundary, not production field values. Cloudflare collection, retention and representativeness remain unknown. Existing policy sends first-party RUM independently of analytics/ads consent and needs owner/privacy confirmation. Lighthouse is lab measurement and remains separate.

## Performance and preservation

No third-party SDK was added; `web-vitals` is a small runtime dependency dynamically imported after hydration and only for sampled visitors. GA4/Meta remain consent-delayed. Production build and the existing full Playwright suite pass; no Lighthouse budget was changed or claimed passing. Contact delivery continues to use the existing `/api/contact` flow. No CRM, provider, payment, schema, commercial term, or production binding was changed.

## Verification

- `npm run check`: passed; 28 pre-existing lint warnings, zero errors. Includes new analytics and RUM checks.
- `npm run check:invoice-security`: passed; PayPal HTTP mocked, sandbox not run.
- Targeted analytics/consent Playwright: **10 passed**.
- Full `npm run test:e2e -- --workers=4`: **68 passed, 6 skipped, 0 failed** (74 total). Six skips are existing conditional/project skips, including live-ID analytics delivery when test IDs are unavailable.
- `npm run build`: passed; 297 pages generated. Existing local Durable Object warning remains.
- `npm run check:spanish-mirror` and `npm run check:seo-ownership`: passed.
- `git diff --check`: passed before final commit.

All verification uses local fixtures or mocked/aborted providers. No test conversion was sent to GA4 or Meta. No production event or field CWV was inspected.

## Remaining release gates

Carry forward unchanged: desktop Lighthouse below 0.85; mobile Lighthouse below 0.95 on sampled routes; genuine A1 screenshot recapture; manual WCAG 2.2 AA; production field CWV unknown; PayPal sandbox pending; live lead delivery/Conferbot pending; live GA4/Meta verification pending; owner decisions on billing/guarantee; review/portfolio evidence; 13 moderate full dependency advisories; KV rate-limit operational limits.

**Phase 9 readiness:** recommend review of Phase 8.1 and owner-side GA4/Meta conversion configuration. Do not begin automatically; Phase 9 and release remain unauthorized.

**Exact final local commit:** provided in the completion response.
