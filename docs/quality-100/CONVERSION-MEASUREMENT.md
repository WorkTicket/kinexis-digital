# Conversion measurement

## Form completion semantics

In `boot.js`, conversion tracking occurs only in the `res.ok` branch after POST `/api/contact`; client-side invalid forms, network errors, 4xx/5xx, mail-unconfigured 503, and provider errors do not execute completion tracking. The API returns `{ok:true}` for the honeypot, so a bot that fills `_gotcha` can receive success but the browser returns before event dispatch. No analytics exception is thrown into the submit handler's delivery path.

Preview: GA4 receives `generate_lead` plus `preview_form_submit`; these are two event records for one response. `generate_lead` is documented as legacy alias in `funnel-events.ts`. Meta receives one `Lead`. Audit: GA4 `audit_request`, Meta `Lead`. Contact, strategy call, intake, and site update submissions are not conversions unless specifically tagged (current tags found for preview/audit). Clicks, views, starts, plan selections, and checkout initiation are not completed sales leads.

## Deduplication and lead qualification

Button disabling is applied while the client request is pending and restored in `finally`; a single successful HTTP response emits once. No request idempotency key or server-side deduplication was found in `/api/contact`, which sends notification email and returns success. Repeated submissions/retries can therefore deliver multiple notifications and count as multiple conversions. Analytics cannot identify unique people because PII is not sent. No canonical link from contact email to qualified opportunity exists. Conferbot ledger upsert and temperature scoring are separate, feature-gated workflows; qualified status is not currently sent to analytics.

Do not add a CRM, infer qualification from form completion, or redefine qualification without owner approval. Select one GA4 preview event as canonical in reporting and retain the alias only for compatibility until reporting impact is assessed.

## Payment events

The funnel registry describes checkout callback events and invoice-paid thank-you event. These do not establish captured/settled payment merely by code presence. Keep payment integrity as audited in Phase 7; sandbox/live provider verification remains open.
