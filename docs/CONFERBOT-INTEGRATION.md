# Conferbot integration contract (Kinexis Digital)

Backend-only contract for the Phase 5 webhook. The React widget is separate and stays flag-off until release approval.

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

- Binding: `LEAD_DB` (separate from `INVOICE_DB`). Placeholder ids in `wrangler.jsonc` — **owner creates DBs**.
- Migration: `migrations/0002_conferbot_lead_intel.sql` — apply to `LEAD_DB` only.
- Local tests: `LEAD_TEST_MEMORY=1` + injectable SQLite adapter (never set in production).

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
