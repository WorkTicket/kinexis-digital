# Conferbot bot setup (Kinexis AI Sales Consultant)

**Public Bot ID:** `6afa0edabbad567d637ee189` (not a secret)  
**Share link:** https://share.conferbot.com/c/eqkz5emr  
**Official snippet:** `ConferbotWidget("6afa0edabbad567d637ee189")`  
**Account plan:** FREE. Webhooks need Starter (~$19/mo). API needs Pro per owner dashboard. **Do not upgrade from the agent.**

## Brand casing

Use **Kinexis** / **Kinexis Digital** as the live site does. Do not invent “KINEXIS” in customer-facing widget copy.

## Locale / customData (when the widget is enabled)

Pass non-PII context only, for example:

- `source`: `kinexis-digital-site`
- `locale`: `en` | `es` | `es-ES` (from the current DocumentShell locale)
- `pathname`: current path

Do not put email, phone, IP, or pricing overrides in `customData`. Pricing answers must match `docs/CONTENT.md` and `src/i18n/prices.ts` (USD on `/` and `/es`; same numerals in euros on `/es-es`). Never invent FX rates or EUR-only packages.

## Owner steps (not done by the agent)

1. Confirm flow variables in Conferbot for structured lead fields (name, email, phone, business, consent).
2. Upgrade to Starter only when ready for webhooks (Phase 8+).
3. Register webhook URL after secrets and migration exist (see production-hardening Phase 5/8/9).
4. Keep `NEXT_PUBLIC_CONFERBOT_ENABLED` and `CONFERBOT_INTEGRATION_ENABLED` off until release approval.

## Privacy

Conferbot webhook payloads may include visitor IP, approximate location, ISP, and user agent. The site backend must strip those before storage. Prefer consent before loading the widget (cookie/consent pattern already on the site).
