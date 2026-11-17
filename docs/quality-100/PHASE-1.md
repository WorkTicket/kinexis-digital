# Phase 1 — Conversion audit and desktop performance diagnostics

**Date:** 2026-11-17  
**Source:** detached worktree at `3b606689ae9b27b78d3acb8a8a360b28aaa22a84`  
**Production changes, leads, analytics events, payments, or deployment:** none  
**Status:** code-level conversion fixes and diagnostics complete; provider delivery remains unverified

## 1. Changes

- Made conversion intent explicit on free-preview forms, including the slim preview form, contact page, Phoenix and get-a-website landing pages, and the QR-tool preview CTA.
- Website audit submissions now have a distinct `audit_request` event and Meta content name, and route to an audit-specific notification email subject.
- Preview events (`generate_lead`, `preview_form_submit`, and Meta `Lead` for a homepage preview) now fire only after a successful preview form response. Audit requests have their own event. Existing-client update and intake forms no longer produce preview view/start/submit events.
- Added mocked contact-delivery coverage for audit email routing and Playwright regressions for successful/failed preview submissions, audit conversion separation, and intake/update exclusions.
- Regenerated `public/assets/js/boot.min.js` from `boot.js`.
- No visual, pricing, or commercial changes.

## 2. Desktop Lighthouse investigation

Captured 12 production Lighthouse 13.6.0 runs: one mobile and two desktop runs each for `/`, `/pricing`, `/portfolio`, and `/contact`. The detailed per-run data is in [`performance-runs.json`](./performance-runs.json).

| Route | Mobile score / LCP | Desktop runs: score / LCP | Desktop FCP | Desktop TBT | Desktop CLS |
|---|---:|---:|---:|---:|---:|
| `/` | 97 / 2.20 s | 81, 82 / 2.17–2.23 s | 1.31–1.33 s | 129–167 ms | 0 |
| `/pricing` | 98 / 2.23 s | 83, 83 / 2.29 s | 1.37 s | 70–71 ms | 0 |
| `/portfolio` | 98 / 1.99 s | 80, 81 / 2.39 s | 1.32 s | 121–140 ms | 0 |
| `/contact` | 98 / 2.24 s | 84, 84 / 2.24 s | 1.28 s | 83–109 ms | 0 |

The baseline had desktop scores of 81–84; repeated diagnostics reproduce 80–84. The timing evidence does **not** show desktop LCP materially slower than mobile. Lighthouse 13.6 uses a much stricter desktop LCP scoring curve: p10 1,200 ms / median 2,400 ms, versus mobile p10 2,500 ms / median 4,000 ms. Thus LCP around 2.2–2.4 seconds is near the desktop median scoring point but well inside the mobile good range. This explains most of the score gap; it does not mean the desktop budget passes.

The LCP candidate is the homepage hero poster on `/` and the page-hero artwork on the other routes. Candidates have high fetch priority; observed resource-load delays were about 10–17 ms and downloads about 38–83 ms. Homepage breakdown in a representative trace was TTFB 206 ms, resource delay 10 ms, download 40 ms, and element render delay 260 ms. Desktop JavaScript evaluation was approximately 166–185 ms; TBT remained 70–167 ms and CLS was zero. No consent-gated third-party analytics requests were intentionally triggered.

**Performance decision:** no performance code or Lighthouse budget was changed. These traces do not support “compress the LCP image” as a diagnosis: the LCP assets are already promptly discovered and quickly transferred. A safe evidence-backed score improvement was not established, so no before/after performance gain is claimed. Desktop still fails the existing 0.85 score budget.

## 3. Conversion-path status

- **Free preview and campaign previews:** mocked browser submissions confirm preview events fire once on success and not on an error response.
- **Website audit:** mocked browser and SMTP-route tests confirm distinct conversion classification and an audit-specific subject.
- **Contact, pricing, phone CTAs:** contact uses the preview form; pricing routes users through the existing preview CTA. Existing phone-tap analytics remain unchanged. No phone call was placed.
- **Client intake and site update:** mocked browser submissions succeed without counting as new preview leads.
- **Conferbot:** existing flag-off and consent/launcher checks pass. Real lead lifecycle, storage, and notification delivery were not exercised; the widget remains disabled unless configured.
- **PayPal:** UI can be opened without payment; no sandbox API call, approval, capture, or live payment was performed.

## 4. Production analytics configuration (read-only)

Fetched rendered HTML from `/`, `/pricing`, `/portfolio`, and `/contact`: each returned HTTP 200 and contained syntactically valid GA4 and Meta Pixel configuration. IDs are deliberately not reproduced here. The public bundle uses consent predicates for analytics and ads; local E2E tests verify reject/undecided block tracking and analytics-only consent does not load Meta. No consent state was changed on production and no production tracking event was sent.

`src/components/DocumentShell.tsx` reads `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` at build time. The repository GitHub Actions workflow runs `npm run build:worker` without explicitly setting those variables, so the production artifact proves the live build received valid values but does not identify their management source. To verify the source and future build reliability, an owner with read-only access should inspect the Cloudflare Worker/Pages build environment and any external deployment workflow for these two variable names. Do not reveal or alter values during that check.

## 5. Provider test prerequisites (not run)

- **Email notification:** owner supplies an isolated preview/test Worker with a test-only `CONTACT_PREVIEW_TO` sink (or an approved `CONTACT_EMAIL` binding), known sender/provider configuration, and log access. Verify recipient isolation before sending a clearly labeled synthetic lead. No production inbox or real lead was used.
- **PayPal sandbox capture:** owner supplies sandbox-only `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_API_BASE=https://api-m.sandbox.paypal.com`, and explicit `PAYPAL_SANDBOX_CONFIRM=1`; use a sandbox buyer/account and approved sandbox order. The repository script can create a $1.00 sandbox order and its return URL references the public site, so the owner must approve an isolated callback/test environment and test-account impact before running it. Never use live API credentials.
- **Conferbot lifecycle:** owner provisions a non-production bot/webhook, `CONFERBOT_INTEGRATION_ENABLED=1`, test-only `CONFERBOT_WEBHOOK_SECRET`, expected bot ID, isolated `LEAD_DB` and its lead migration, and `CONFERBOT_NOTIFY_ENABLED=1` only with a preview notification sink. Agree on synthetic lifecycle events, duplicate/retry expectations, and log/cleanup access. No D1/production binding was enabled.

Each external test requires separate owner approval and isolated resources; none is implicitly authorized by this report.

## 6. Verification

- `npm run check`: passed (lint had 28 existing warnings, zero errors; typecheck and all scripted checks passed).
- `npm run check:invoice-security`: passed; PayPal HTTP interactions were mocked, sandbox not run.
- `npx playwright test`: 44 passed, 6 skipped. Skips are expected project/environment guards (mobile-only/Chromium-only cases and production measurement tests not run against production). Both desktop and mobile exercised the new conversion tests.
- Focused `npx playwright test e2e/smoke.spec.ts --project=chromium`: 14 passed, 1 expected mobile-only skip.
- Production read-only route/config inspection: 4/4 routes returned 200 and had valid analytics configuration.
- Not run: `npm run verify` because it includes `check-paypal-sandbox.mjs`, which can make external requests when credentials and its confirmation flag are present. No production build/deploy or production form/analytics/payment test was run.
- Local Playwright dev server emitted an existing Cloudflare Durable Object warning for `NEXT_CACHE_DO_QUEUE`; tests passed despite it.

## 7. Files and source revision

Application/test files changed:

- `src/components/Form.tsx`, `src/components/PreviewBar.tsx`
- `src/app/(en)/audit/page.tsx`, `src/app/(en)/contact/page.tsx`
- `src/app/(en)/lp/get-a-website/page.tsx`, `src/app/(en)/lp/phoenix-preview/page.tsx`
- `src/app/(en)/tools/google-review-link-qr/page.tsx`
- `src/app/api/contact/route.ts`, `src/lib/funnel-events.ts`
- `public/assets/js/boot.js`, `public/assets/js/boot.min.js`
- `scripts/check-contact-delivery.mjs`, `e2e/smoke.spec.ts`

Evidence/handoff: `docs/quality-100/performance-runs.json`, `docs/quality-100/PHASE-1.md`, `docs/quality-100/handoffs/PHASE-1.md`.

**Commit:** none created. Work remains uncommitted in the isolated detached worktree at source SHA `3b606689ae9b27b78d3acb8a8a360b28aaa22a84`; the original checkout was not modified.

## 8. Phase 2 handoff

Continue conversion-path review with consent-safe production verification only if separately approved. First obtain owner approval and isolated resources for email, PayPal sandbox, and Conferbot lifecycle evidence. Keep desktop performance open: pursue the stricter desktop LCP target only with new trace evidence or field CWV data; do not lower budgets or claim an unmeasured optimization. Continue remaining Phase 0 backlog (dependency triage, skipped-test classification, accessibility/SEO coverage) as separately scheduled. Do not deploy or change Cloudflare settings from this worktree.
