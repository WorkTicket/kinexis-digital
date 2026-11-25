# Phase 8 — Isolated staging and independent QA

**Date:** 2026-11-15  
**Branch:** `cursor/phase8-staging-qa-67c1`  
**Rule:** No production changes from the agent. Owner runs preview deploy and Conferbot Starter steps.

## Staging isolation checklist (owner)

1. Deploy preview only: `npm run deploy:preview` (never `npm run deploy` / `deploy:worker` for this phase).
2. Confirm `NEXT_PUBLIC_IS_PREVIEW=1` on the preview Worker.
3. Set `CONTACT_PREVIEW_TO` to a sink address listed in preview `send_email.allowed_destination_addresses`.
4. Leave production `CONTACT_TO` unset on preview.
5. Later (not required for flags-off ship): create preview `LEAD_DB` with a **real** id, add the binding under `env.preview` (`migrations_dir: "migrations-lead"`), apply `migrations-lead/0001_conferbot_lead_intel.sql` with `--env preview` only. Do not use placeholder ids.
6. Optional preview secrets (values never committed): `CONFERBOT_WEBHOOK_SECRET`, `CONFERBOT_EXPECTED_BOT_ID`. Keep `CONFERBOT_INTEGRATION_ENABLED=0` until webhook test is intentional.
7. PayPal on preview: sandbox API base + sandbox credentials only.

## Conferbot Starter upgrade (owner blocker — do not assume)

- FREE plan cannot register webhooks.
- Upgrade to Starter (~$19/mo) only when ready to test webhooks on **preview**.
- Register webhook URL: `https://preview.kinexisdigital.com/api/integrations/conferbot/webhook` first (not production).
- Events: `conversation.started`, `message.created`, `conversation.completed`, `response.created`, `response.updated`.
- Pro / API key: **not required** for MVP webhook path; skip unless owner needs API.

## Independent QA script (owner / agent on preview)

| Check | How | Expected |
|---|---|---|
| Preview noindex | View source / `robots` | noindex |
| Contact form | Submit on preview | Mail only to `CONTACT_PREVIEW_TO` or 503 if unset |
| Reviews notify | Submit review | Same preview sink rule |
| Widget flag off | Homepage | No `conferbot-js` script |
| Widget flag on (preview build var only) | After idle/input (reject cookies OK) | Script loads; launcher appears |
| Webhook unsigned | `POST` without signature | 401 (when integration enabled) |
| Webhook signed fixture | Local/preview with secret | 2xx; redacted rows; replay idempotent |
| PayPal unsigned webhook | Production smoke only if already live | 400 invalid headers (do not charge) |

## Agent verification this phase

| Command | Result |
|---|---|
| `npm run check` | PASS |
| Preview deploy | NOT RUN (owner) |
| Starter upgrade | NOT RUN (owner) |
| Live signed Conferbot delivery | NOT RUN |

## Hand-off

Phase 9 produces the release readiness pack and **stops for explicit release approval**.
