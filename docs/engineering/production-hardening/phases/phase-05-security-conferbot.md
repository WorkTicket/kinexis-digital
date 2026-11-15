# Phase 5 — Security / Conferbot

**Date:** 2026-11-15  
**Branch:** `cursor/phase5-security-conferbot-67c1`  
**Scope:** Webhook HMAC, redaction, D1 lead schema, lead scoring MVP, notification outbox MVP, CSP allowlist, consent-gated lazy widget (flag off).

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
| Widget after analytics consent + idle/input | Third-party script; respects cookie banner; 45s/first input like boot.js. |
| Flat `src/lib/conferbot-*.ts` modules | Match invoice Web Crypto + injectable DB pattern. |

## Findings

1. Kit Phase 0 “no D1” claim is obsolete — invoice D1 already exists; Conferbot uses a second binding.
2. Conferbot payloads have no event id — `provider_event_key` is derived (see `docs/CONFERBOT-INTEGRATION.md`).
3. `x-webhook-timestamp` is unsigned — not used as a security control.
4. Widget mounts from DocumentShell; inert unless `NEXT_PUBLIC_CONFERBOT_ENABLED=1`, then only after analytics consent + first input / 45s.
5. Placeholder `LEAD_DB` ids (`…00c1` / `…00c2`) must be replaced before any Worker deploy that needs persistence.

## Verification (this phase)

| Command | Result |
|---|---|
| `npm run check:conferbot` | PASS (webhook suite + widget contract) |
| `npm run check` | PASS |
| `npm run typecheck` | PASS |
| `npm run test:e2e` | NOT RUN (Phase 6 browser) |
| `npm run build:worker` | NOT RUN this pass (run before PR if time) |
| Production deploy | NOT RUN |

## Owner blockers

- Create prod + preview `LEAD_DB` D1 databases; replace wrangler placeholders; apply `0002`.
- Starter plan (~$19) + webhook secret + register URL (preview first). Do not assume upgrade.
- Pro only if Conferbot API is required (MVP uses webhooks only).
- Set secrets via `wrangler secret put` (never commit values).
- Decide scoring rules marked `OWNER_DECISION_REQUIRED`.
- Explicit approval before flipping integration / notify / public widget flags.
