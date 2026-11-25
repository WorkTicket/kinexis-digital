# Conferbot integration contract (Kinexis Digital)

Backend-only contract for the Phase 5 webhook. The free-plan React widget is a separate feature and is currently enabled through the production public flags. Owner decision (2026-11-17): launch with the current free widget only; do not purchase Starter or enable webhook/D1 persistence/notifications for this launch. This defers the backend contract below and does not imply that chat leads reach the site database or business notification inbox.

## Endpoint

`POST /api/integrations/conferbot/webhook`

- Cross-site by design — **do not** apply `rejectCrossSite`.
- Auth: bare hex HMAC-SHA256 of the **raw** body in `x-webhook-signature` (Web Crypto).
- Expected bot id: `CONFERBOT_EXPECTED_BOT_ID` (defaults to public id `6afa0edabbad567d637ee189`).
- Feature gate: `CONFERBOT_INTEGRATION_ENABLED=1` **and** non-empty `CONFERBOT_WEBHOOK_SECRET`.

## Status policy

| Condition | Status |
|---|---|
| Integration flag off / secret missing | **503** `unavailable` (retries resume after enable) |
| Body over `MAX_BODY_BYTES` (256_000) | **413** |
| Bad / missing / non-hex signature | **401** |
| Invalid JSON after valid signature | **400** |
| Wrong bot id or unsupported event (signed) | **200** `ignored` |
| Durable persist success / duplicate | **200** |
| Storage unavailable | **503** |

## Idempotency (`provider_event_key`)

| Event | Key |
|---|---|
| `message.created` | `message:<message.id>` |
| `conversation.started` | `started:<chatSessionId>` |
| `conversation.completed` | `completed:<chatSessionId>` |
| `response.created` | `rcreated:<responseId>` |
| `response.updated` | `rupdated:<responseId>:<sha256 hex of raw body>` |

Unique on `(provider, provider_event_key)` in `webhook_events`.

## Privacy redaction (before persist/log)

Strip: `visitor.ip`, `visitor.location` (entire object), `visitor.isp`, `visitor.device.userAgent`.

## Storage

- Binding: `LEAD_DB` (separate from `INVOICE_DB`). **Not present in `wrangler.jsonc` until the owner creates real DBs and adds the binding** (placeholder ids were removed — they break `wrangler` / OpenNext deploys).
- Migration: `migrations-lead/0001_conferbot_lead_intel.sql` — apply to `LEAD_DB` only (`migrations_dir` for invoices stays `migrations/` so lead schema is never applied to `INVOICE_DB`).
- Local tests: `LEAD_TEST_MEMORY=1` + injectable SQLite adapter (never set in production).
- Runtime without the binding: webhook stays fail-closed while flags are off; with integration on and no DB, handlers treat storage as unavailable (no silent write to `INVOICE_DB`).

## Notifications

- Outbox rows for `HOT` / `QUALIFIED` / `handoff` with idempotency keys `hot:<lead_id>`, `qualified:<lead_id>`, `handoff:<conversation_id>`.
- Send only when `CONFERBOT_NOTIFY_ENABLED=1` **and** integration on, via `contactEmailBinding` + `contactRecipients`.
- Respects preview `CONTACT_PREVIEW_TO` / `contactDeliveryBlocked`. Default notify **OFF**.

## Checks

```bash
npm run check:conferbot
```

Included in `npm run check:route-integration`.

## Brand

Use **Kinexis** / **Kinexis Digital**. Public bot id is not a secret.
