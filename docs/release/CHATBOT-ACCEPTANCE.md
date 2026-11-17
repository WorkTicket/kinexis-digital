# Conferbot acceptance

**Status: BLOCKED — Conferbot remains required for launch; isolated integration acceptance is pending.**

Fresh `npm run check` passed local Conferbot widget and webhook contract fixtures, including signature, redaction, idempotency, persistence fixture, partial-write retry and payload-size checks. This is not a live bot/D1 test.

**Current integration contract:** public widget flag and bot ID are present in local `.env.production`, and the production build guard checks that ID in Worker output. The code repo's [`CONFERBOT-BOT-SETUP.md`](../CONFERBOT-BOT-SETUP.md) says the account is on FREE and webhooks require Starter (historically approximately $19/month); the agent must not upgrade it. `CONFERBOT_INTEGRATION_ENABLED`, webhook secret, notification flag, and `LEAD_DB` are not configured locally; Wrangler explicitly omits `LEAD_DB`.

**Owner actions:** decide whether to authorize the paid Starter upgrade; provision a separate nonproduction bot/webhook, secret through secure storage, isolated preview `LEAD_DB` + migration, approved test notification sink, and dashboard access. Authorize an isolated conversation lifecycle test covering consent, create/update, duplicate/retry, persistence, notification, and failure recovery. Verify no customer or production destination is contacted. Keep the public widget enabled as approved; do not claim backend lead integration acceptance or silently disable the widget.
