# Phase 5 — Security / Conferbot backend

**Date:** 2026-11-15  
**Branch:** `cursor/phase5-security-conferbot-67c1`  
**Scope:** Webhook HMAC, redaction, D1 lead schema, lead scoring MVP, notification outbox MVP, CSP allowlist. Widget UI is out of scope (separate agent).

## Decisions

| Decision | Rationale |
|---|---|
| Separate `LEAD_DB` binding (placeholder ids) | Isolate chat/lead load from payment ledger. Owner creates real D1 databases. |
| Migration `0002` for LEAD_DB only | Do not apply lead tables to `INVOICE_DB` unless owner accepts colocation fallback. |
| Integration flag fail-closed with **503** | Conferbot retries after enable; avoids silent drain while building. |
| Wrong bot / unsupported signed → **200 ignored** | Avoids vendor auto-disable after consecutive failures. |
| No `rejectCrossSite` on webhook | Conferbot delivers cross-site; auth is HMAC + bot id + flag. |
| Notify default OFF (`CONFERBOT_NOTIFY_ENABLED`) | No accidental team mail; still enqueues outbox when leads qualify. |
| Owner-decision scoring weights award 0 | Budget floor / service fit / business verification not invented. |
| Flat `src/lib/conferbot-*.ts` modules | Match assignment layout; mirror invoice Web Crypto + injectable DB pattern. |

## Findings

1. Kit Phase 0 “no D1” claim is obsolete — invoice D1 already exists; Conferbot uses a second binding.
2. Conferbot payloads have no event id — `provider_event_key` is derived (see `docs/CONFERBOT-INTEGRATION.md`).
3. `x-webhook-timestamp` is unsigned — not used as a security control.
4. Widget / `NEXT_PUBLIC_CONFERBOT_ENABLED` not implemented on this branch.
5. Placeholder `LEAD_DB` ids (`…00c1` / `…00c2`) must be replaced before any Worker deploy that needs persistence.

## Verification (this phase)

| Command | Result |
|---|---|
| `npm run check:conferbot` | PASS (signature, redact, event-key, scoring, flag-off 503, bad sig 401, bad json 400, wrong bot ignored, idempotency ×3, oversize 413) |
| `npm run typecheck` | PASS |
| Production deploy | NOT RUN (hard rule) |

## Owner blockers

- Create prod + preview `LEAD_DB` D1 databases; replace wrangler placeholders; apply `0002`.
- Starter plan + webhook secret + register URL (preview first).
- Set `CONFERBOT_WEBHOOK_SECRET` / expected bot id via `wrangler secret put` (never commit).
- Decide scoring rules currently marked `OWNER_DECISION_REQUIRED`.
- Explicit approval before flipping integration / notify / public widget flags.
