# Conferbot acceptance

**Status: WIDGET-ONLY SCOPE — backend integration deferred by owner; widget provider acceptance remains unverified.**

Fresh `npm run check` passed local Conferbot widget and webhook contract fixtures, including signature, redaction, idempotency, persistence fixture, partial-write retry and payload-size checks. This is not a live bot/D1 test.

**Owner decision (2026-11-17):** keep the existing free-plan widget enabled; do not buy Starter. Webhook, site-side lead persistence in D1, and business notification delivery from chatbot conversations are not launch requirements under this decision. The widget may still store conversations in Conferbot's own service; that behavior, data retention, and notification settings have not been verified.

**Local evidence:** the public widget flag/bot ID are present in `.env.production`; the production build guard checks the ID in Worker output. Local widget and consent contract checks pass, but no live Conferbot account/bot test was performed. The backend integration flag, webhook secret, notification flag, and `LEAD_DB` remain unset/unbound.

**Remaining owner actions:** verify the live widget loads and its flows match approved business copy in the Conferbot dashboard; confirm the provider's transcript storage, retention/deletion, consent wording, and notification behavior with read-only access. Do not enable webhooks, create/bind `LEAD_DB`, or claim site-side persistence/notification acceptance unless the owner later authorizes the paid plan and backend scope.
