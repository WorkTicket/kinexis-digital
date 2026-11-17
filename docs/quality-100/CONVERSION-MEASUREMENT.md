# Conversion measurement

## Form completion semantics

In `boot.js`, conversion tracking occurs only in the `res.ok` branch after POST `/api/contact`; client-side invalid forms, network errors, 4xx/5xx, mail-unconfigured 503, and provider errors do not execute completion tracking. The API returns `{ok:true}` for the honeypot, so a bot that fills `_gotcha` can receive success but the browser returns before event dispatch. No analytics exception is thrown into the submit handler's delivery path.

Preview: GA4 receives `generate_lead` as the sole primary conversion and `preview_form_submit` as a diagnostic funnel event (`event_role=diagnostic`). The latter must not be marked as a key event or counted in lead totals. Meta receives one `Lead`. Audit: GA4 `audit_request`, Meta one `Lead` with `content_name=website_audit`. Contact, strategy call, intake, and site update submissions are not conversions unless specifically tagged (current tags found for preview/audit). Clicks, views, starts, plan selections, and checkout initiation are not completed sales leads.

## Deduplication and lead qualification

The form is now guarded by a `WeakSet` while a request is pending; a single successful HTTP response emits once, even if duplicate submit events occur while it is in flight. A failed response emits none; a later user-initiated retry that succeeds emits one primary conversion. Tracking calls are exception-isolated from delivery/UI. There is still no server idempotency key: distinct repeated submissions and ambiguous mail delivery can duplicate notifications, and true unique-lead deduplication is not claimed. Analytics does not send PII. No canonical link from contact email to qualified opportunity exists. Conferbot ledger upsert and temperature scoring are separate, feature-gated workflows; qualified status is not currently sent to analytics.

Do not add a CRM, infer qualification from form completion, or redefine qualification without owner approval. **Owner action:** set GA4 `generate_lead` as the single primary/key conversion; retain `preview_form_submit` as a non-key diagnostic until reporting compatibility is reviewed. Review Meta Events Manager custom conversion rules for duplicate counting; no live account settings were inspected or changed.

## Payment events

The funnel registry describes checkout callback events and invoice-paid thank-you event. These do not establish captured/settled payment merely by code presence. Keep payment integrity as audited in Phase 7; sandbox/live provider verification remains open.
