# Decisions and constraints

| Decision | Status | Rationale / alternatives |
|---|---|---|
| Preserve the owner's uncommitted work as its own commit | Done | Restored from `tracked.patch` and `untracked/` onto `codex/production-hardening-v1` at `c43041d` and committed with no further edits in that commit. |
| No production deployment, migration, secret changes, or customer payment | Held | No production mutation was performed. Placeholder D1 ids must be replaced before any deploy. |
| Phase 0 E2E failures | Re-checked in Phase 1 | Mobile plan comparison now asserts the mobile card. Mobile nav passed. PayPal subscription UI fails closed without `NEXT_PUBLIC_PAYPAL_CLIENT_ID`; the SDK ready state was not claimed. Measurement tests stay skipped off production. |
| Invoice signing key | Implemented, values not set | New links use `v2.` HMAC and `INVOICE_LINK_SECRET` (minimum 32 UTF-8 bytes). `INVOICE_LINK_SECRET_PREVIOUS` is the rotation window. Optional `INVOICE_LINK_SECRET_PREVIOUS_UNTIL` ends it. No PayPal-secret fallback. |
| Transactional invoice/payment ledger | D1 implemented in code; database not provisioned | KV cannot transactionally update an invoice and insert a unique payment event. A single Durable Object would serialize every payment and still needs another index for global PayPal order and event uniqueness. A per-invoice Durable Object cannot enforce those global unique keys. D1 gives one SQL batch, conditional updates, and unique indexes, plus a migration file. `migrations/0001_invoice_payment_ledger.sql` was rehearsed on local SQLite only. |
| D1 cutover | Pending owner approval | Create empty production and preview databases, replace the placeholder ids, apply the migration only with approval, import `invoice:v1:*` from KV, then deploy. Keep KV until the observation window ends. Do not restore an old snapshot over payment events. |
| PayPal webhook verification and deduplication | Implemented. Sandbox forged signature returns FAILURE. Signed SUCCESS not observed | `POST /api/paypal/webhook` calls PayPal's verify API and stores the event id in the ledger. The sandbox webhook is registered. A forged signature was rejected by the sandbox verify API. A PayPal-signed SUCCESS needs a delivery, and the route is not deployed. |
| PayPal merchant identity | Checked against a sandbox order, value not stored in git | A created sandbox order's payee matched the supplied merchant id. The id is not written in the repo. |
| Sandbox evidence | PASS for create, capture, mismatch, and forged signatures. Signed webhook SUCCESS NOT RUN | Mocked output stays separate. Calls used `api-m.sandbox.paypal.com` only. |
| Commercial policy unchanged | Held | No pricing, package terms, chatbot, or customer-facing marketing copy changes. The staff invoice API error now says invoice storage is unavailable instead of naming KV. |
| Phase 2 proceeds under owner supersession | Done | Owner instructed finishing Phases 2–9 including chatbot without waiting. Earlier “Do not start Phase 2” is lifted for engineering PRs. Agent still does not merge to `main` (Workers Builds deploys production). |
| Reviews route tests use injectable Map KV | Done | Mirrors invoice `INVOICE_TEST_MEMORY`. Flag `REVIEWS_TEST_MEMORY=1` required. Production isolates never set it. |
| Conferbot folded into Phases 2–9 | Planned | See `phases/phase-chatbot-fold-in.md`. Prefer separate `LEAD_DB` D1. Flags off by default. Starter upgrade is an owner blocker; no agent upgrade. |
| Chatbot runtime deferred past Phase 2 | Held | Phase 2 only adds the harness pattern and the fold-in doc. Widget/webhook land in Phase 5. |
| Preview team mail uses CONTACT_PREVIEW_TO only | Done | `isPreviewSite()` never falls back to CONTACT_TO or SITE.email. Empty preview list fail-closes contact/review notify. |
| CI runs check:invoice-security | Done | Strengthens PR gate without claiming sandbox evidence. E2E stays out of CI for duration. |
