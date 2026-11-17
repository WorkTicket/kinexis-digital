# Phase 9 — End-to-end verification

**Scope:** local build, mock fixtures, and local browser only. No push, merge, deployment, production configuration change, real lead, analytics event, PayPal charge, or production webhook.

## Full funnel and regression results

The latest revision was tested twice with `npm run test:e2e -- --workers=4`. Each invocation started a fresh Playwright-owned `next dev` server on port 3100 (`reuseExistingServer: false`):

| Run | Outcome | Browser projects | Skips |
|---|---|---|---|
| 1 | **68 passed, 0 failed** | Chromium + mobile | 6 expected |
| 2 | **68 passed, 0 failed** | Chromium + mobile | 6 expected |

The six skips per run have code-level reasons: two mobile-only tests are skipped in Chromium; two Chromium-only resize tests are skipped in mobile; and the measurement-delivery test is skipped in both projects when local build-time GA4/Meta IDs are absent. They are not retry-masked failures. Playwright config has retries disabled outside CI; local runs did not set CI.

Covered browser behavior includes homepage/pricing, mobile navigation, preview and audit form success/failure, retry after failed response, duplicate-submit suppression, tracking-failure isolation, analytics-only consent, withdrawal/reacceptance, consent reload, Spanish route/switch smoke, portfolio imagery, invoice guard pages, chat flag-off, and 320px regressions.

### Conversion funnel outcomes

- **Direct visit:** no source/campaign is synthesized. Local direct-route behavior is covered only by normal page/form journeys; a separate direct-attribution assertion is not present.
- **Paid-ad query attribution:** duplicated UTM source is omitted, first valid campaign persists across navigation in an analytics-consented tab, and click IDs are omitted without ads consent. Server fixtures validate all UTM fields/click IDs/referrer bounds and consent gates.
- **English/Spanish:** EN preview and audit submit flows have browser conversion assertions. Spanish pages, document language, mirror paths and representative form/route rendering pass; a complete Spanish conversion submission is not separately exercised.
- **Desktop/mobile:** all funnel E2E tests execute in Chromium and mobile projects; local responsive matrix separately checks 13 representative routes at seven widths.
- **Reject/accept:** rejected/undecided states block trackers; acceptance and tracker withdrawal/reacceptance behavior are mocked with vendor requests aborted.
- **Invalid/network/provider failures:** API route tests cover invalid data, SMTP failure/missing configuration and non-success responses. Browser preview failure emits no completed conversion; successful retry emits exactly one primary conversion.
- **Duplicate submits:** concurrent submit events during one request are suppressed. Distinct later submissions are intentionally not globally deduplicated and server idempotency is absent.
- **Notification failure:** mocked transport proves failure response rather than success; no live mailbox was used.
- **Tracking failure:** mocked throwing GA/Meta calls do not prevent the successful form UI from completing.

No mocked route or provider fixture is evidence of actual inbox delivery, production attribution, GA4/Meta collection, Conferbot delivery or production CWV.

## Security and reliability

`npm run check:invoice-security` passed. Scripts were inspected as local fixture checks before relying on them: PayPal service tests replace provider HTTP with a queue fetcher; route tests use `globalThis.fetch` stubs and an in-memory invoice ledger; invoice KV import uses local Miniflare/SQLite; reconciliation is pure fixtures. No sandbox, remote D1/KV, charge, or real webhook was run.

- Invoice token signing/rotation, client-amount rejection, expiry and stored currency/status checks passed.
- PayPal order/capture association, exact USD minor units, merchant, currency and completion validators passed.
- Route tests cover admin authorization failure, malformed token, invoice/order mismatch, signature verification failure, replay/idempotency and failure-state handling.
- Conferbot HMAC rejection, duplicate event handling, redaction, event persistence order, injected partial D1 write failure, 503 retry, and successful retry passed in `check:conferbot`.
- Rate-limit fixtures passed for per-IP window, expiry and missing-IP policy. They do not model concurrent KV consistency or live Cloudflare bindings.
- Missing optional binding behavior is only partially exercised: invoice storage failure and contact missing-mail configuration are covered. Production Cloudflare binding presence/absence is not tested against a Worker environment; Conferbot `LEAD_DB` remains unbound in checked configuration.

No live deployment configuration, external provider, secrets, or production data was changed.

## SEO, localization and route coverage

- `npm run check:spanish-mirror`: 79 mirror paths pass.
- `npm run check:seo-ownership`: 42 intents, eight forbidden slugs, 48 posts pass.
- `npm run check:structured-data`: 9/9 representative page types pass.
- `npm run smoke -- http://127.0.0.1:3113`: **152/152** local endpoints passed (150 unique sitemap entries plus robots/sitemap endpoints).
- Build generated 297 route outputs. Static/dynamic distinctions and intentional noindex/utility routes remain as configured.
- A fresh full `crawl-seo.mjs` attempt against the local production server terminated in the Windows Node process with exit code `3221226505` before producing a report. It did not modify SEO strategy or committed crawl evidence. As a result, this phase does not claim a fresh exhaustive page-by-page internal-link/orphan/canonical/hreflang audit. Prior Phase 2/3 crawl evidence remains historical.

## Accessibility and responsive evidence

The actual optimized local build was rendered in Chromium and viewport screenshots were captured for 13 routes × seven widths (320, 375, 390, 768, 1024, 1440, 1920), plus consent-open states at 390 and 1440: 93 screenshots under ignored `.audit/phase9/screens/`. The matrix had 91 HTTP-200 route/width loads, zero horizontal overflow, zero broken rendered images and zero uncaught page errors. A simple input-name heuristic counted hidden honeypot/attribution metadata on audit/Phoenix; source inspection confirmed visible controls use wrapping labels, so these are not reported as visible-field defects.

Consent keyboard trap/Escape restoration and representative Spanish/EN forms have automated coverage. Automated tests and screenshots do **not** certify WCAG 2.2 AA. Screen-reader announcements, contrast, zoom/reflow at 200–400%, orientation and full assistive-technology use remain manual gates.

Screenshot/browser JSON evidence is intentionally ignored and not committed; the committed inventory records the measurement method and status.

## Cross-phase systems still unverified

- Email/Mailgun/Gmail lead delivery and notification retention.
- Conferbot account/widget lifecycle, webhook from the real provider, and D1 delivery.
- GA4 key-event setting, Meta custom-conversion rules, consent behavior at provider accounts, live collection.
- PayPal sandbox approval/capture/webhook and production merchant/webhook registration.
- Cloudflare production binding availability and KV concurrency behavior.
- Representative production RUM values/retention and Search Console field CWV.
- Owner sign-off on billing timing, guarantee qualifications, review permissions and portfolio evidence.
