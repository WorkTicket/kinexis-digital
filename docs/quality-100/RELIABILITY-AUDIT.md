# Reliability and failure-recovery audit

## Verified controls

- PayPal and outbound verification requests use 15-second abort timeouts; contact providers and Cloudflare mail binding failures are caught and logged without logging message contents or credentials.
- Invoice checkout requires durable invoice/order association; browser capture only reports paid after the payment ledger transition. Webhook storage failure returns 503 to permit provider retry.
- D1 invoice ledger operations use conditional updates, unique keys, and batches. Existing reconciliation fixtures cover missing/mismatched capture/order/event states; remote reconciliation remains owner-only.
- Public forms have bounded fields/files and validation, rate-limit buckets and user-safe failure messages. Public API responses use `Cache-Control: no-store`.
- Preview contact/review mail is isolated from production recipients; an empty preview recipient list blocks mail.
- Conferbot webhook requires feature flag + secret + bot ID, redacts selected visitor identifiers before storage, and persists events/conversations/messages/leads to a separate optional D1 binding. Notifications are gated and outbox-keyed.

## Finding fixed — retry was acknowledged before durable processing

Previously `webhook_events.processing_status='processed'` was stored before conversation, message, lead, and activity writes. A later storage error returned HTTP 503, but the event's unique key caused the provider retry to take the duplicate fast path and return 200 without retrying the missing work. The persisted `processed` status therefore did not mean processing was complete.

The route now first records `received`. A duplicate `processed` event returns 200; an event still `received` is reprocessed through idempotent upserts. Conversation/message/lead/activity failures now produce 503; only after downstream work succeeds does the route set `processed`. The injected failure regression confirms the first delivery receives 503 with event state `received`, and the retry reaches 200 and `processed`.

## Playwright ownership/readiness

Phase 6.1 moved the default URL to port 3100 but retained `reuseExistingServer: true`, leaving stale-listener reuse possible. The config now sets `reuseExistingServer: false`. Playwright launches the configured `npm run dev -- --port 3100` process and waits for its URL; it must own that subprocess. A controlled pre-existing listener test failed explicitly with “http://localhost:3100 is already used” and exit 1 rather than running against the listener. Full suite passed against the test-owned instance: 60 passed, 6 skipped, 0 failed.

Workers are `fullyParallel: false` (tests share ordered browser projects but not a shared browser context). Test fixtures use isolated in-memory KV/D1 adapters; no persistent production fixture was found in the checks run.

## Residual reliability risks

- KV rate limiting is a sliding-window read then write, not an atomic counter. Under concurrent requests it may admit excess hits. Missing KV intentionally fails open for contact/review/RUM in local/missing-binding contexts; sensitive checkout/admin buckets fail closed when IP is absent but `isRateLimited` returns false if KV itself is absent. The application still requires invoice capabilities/admin secret, so rate limiting is an abuse mitigation, not authorization. Cloudflare edge/WAF limits and correct KV binding should be reviewed by the operator.
- Conferbot's outbox is durable/idempotent, but this repository has no scheduled dispatcher/retry worker. Failed notification rows need operational/manual handling; code presence does not prove the integration or mail delivery is active.
- `request.text()` / `request.formData()` parsing happens before the post-read byte check when `Content-Length` is absent. Declared oversized requests are rejected early; underlying Cloudflare platform request limits provide another bound. A streaming read cap could further reduce memory exposure but requires runtime-compatible route changes and was not necessary to demonstrate the fixed failure.
- Error logs are structured and mostly omit PII. Generic `logApiError` includes provider `Error.message`; current inspected call sites do not pass request payloads, but upstream error messages should continue to be treated as potentially sensitive.
- Durable Object binding warning appears in local dev: `NEXT_CACHE_DO_QUEUE` is configured but the local Worker harness does not export `DOQueueHandler`. It is a local development warning; no production behavior claim is made.
- No external-provider outage or live email failure was induced. Offline deterministic tests are not proof of production recovery.
