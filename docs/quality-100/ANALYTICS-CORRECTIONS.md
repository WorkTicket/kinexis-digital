# Analytics corrections — implementation record

## Conversion event contract

| Form | GA4 primary | GA4 diagnostic | Meta | Success only |
|---|---|---|---|---|
| Free preview | `generate_lead` (sole key-event candidate) | `preview_form_submit` (`event_role=diagnostic`, non-key) | one `Lead`, `content_name=homepage_preview` | yes |
| Website audit | `audit_request` | — | one `Lead`, `content_name=website_audit` | yes |
| Contact / strategy call | none | existing click events only | existing telephone contact only | not counted as form conversion |
| Client intake / update | none | none | none | excluded |

`generate_lead` and the diagnostic event keep their established names for compatibility; only one is intended as the primary preview conversion. The browser suppresses concurrent submission events while the request is in flight. It cannot deduplicate distinct submissions or recover whether an ambiguous network/mail retry was already delivered.

Tracking dispatch and provider exceptions are isolated from successful form UI/delivery. Local Playwright mocks verify one primary conversion after success, zero after failure, retry behavior, and independent GA4/Meta semantics.

**Owner action:** in GA4 Admin, mark `generate_lead` as the sole primary/key preview conversion and ensure `preview_form_submit` is not key. Review existing Meta custom conversions for rules that might count duplicate events. No live analytics account was accessed.

## Attribution contract

- First valid occurrence of each allowlisted field is preserved within the current tab session; later routes only fill absent fields.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` and external referrer origin/path require analytics consent.
- `fbclid` and `gclid` additionally require advertising consent.
- Duplicate query values are omitted. Direct traffic is not invented. Referrer query and fragment are removed.
- Values are length/character bounded in the browser and independently validated at `/api/contact`; duplicate multipart values are rejected. Attribution is attached only when exact `kx_conversion=preview|audit` is present and accepted by server-side consent validation.
- Withdrawal removes tab-session attribution. No persistent visitor identifier or new cookie is created.
- Attribution is added to the existing lead notification, not a new database/CRM. Email retention and access controls remain operational owner matters.

## Consent lifecycle

Application guards are authoritative before every event dispatch. GA4 sets Consent Mode defaults before configuration, disables automatic page views, updates storage/ad signals on preference changes, and emits explicit page views once. Meta uses `fbq('consent','grant'|'revoke')` when consent changes. Libraries remain loaded after withdrawal because removing script tags cannot undo initialization; vendor consent controls plus app guards stop future app-originated collection. Already transmitted requests are irreversible.

No live endpoint was contacted. In browser tests, GA4/Meta scripts were aborted and test IDs used. Production vendor-side consent behavior remains unverified.

## RUM data contract

`web-vitals` 6.2.3 computes LCP/INP/CLS with lifecycle and soft-navigation support. LCP/INP values are milliseconds; CLS is unitless. TTFB/FCP are supplementary. Records contain bounded metric name/value/id/navigation type and route pathname only; no query, fragment, user ID, cookie, user-agent, or viewport classification. Approximately 20% are sampled; import is deferred until after hydration and skipped for unsampled visitors. RUM remains first-party and consent-independent under the existing policy.

Unit fixtures verify mapping/deduplication fields, query stripping, local-route protection, invalid values, and endpoint parsing. They are not production field CWV. Lighthouse remains lab data; Cloudflare retention and representative field collection require separate verification.

## Files and local evidence

Application code: `public/assets/js/boot.js`, generated `public/assets/js/boot.min.js`, `src/app/api/contact/route.ts`, `src/lib/marketing-attribution.ts`, `src/lib/funnel-events.ts`, `src/components/Rum.tsx`, `src/lib/rum-report.ts`, `src/components/Boot.tsx`, `src/components/DocumentShell.tsx`.

Regression evidence: `e2e/smoke.spec.ts`, `scripts/check-contact-delivery.mjs`, `scripts/check-analytics-corrections.mjs`, `scripts/check-rum.mjs`. Full pass/failure counts and limitations are in `PHASE-8-1.md`.
