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

## Widget logo + profile photo

Appearance (launcher icon + in-chat avatar) is controlled in the **Conferbot dashboard**, not by the site embed. Repo hosts the brand files for upload:

| Use in Conferbot | File in repo | After production deploy |
|---|---|---|
| Profile / chat avatar (robot thumbs-up) | `public/assets/conferbot/profile.jpg` (also `.webp`) | `https://www.kinexisdigital.com/assets/conferbot/profile.jpg` |
| Logo / launcher bubble (K mark) | `public/assets/conferbot/logo.jpg` (also `.webp`) | `https://www.kinexisdigital.com/assets/conferbot/logo.jpg` |

**Owner action (required for the live widget to show these):** Conferbot → bot `6afa0edabbad567d637ee189` → **Publish → Widget Settings** (or Customize) → upload the profile photo and logo / bubble icon. Changes apply to the embedded widget without a site redeploy. Prefer uploading the local JPG/PNG from this repo if the dashboard rejects remote URLs.

## Mobile proactive greeting (dashboard only)

The embed API (`ConferbotWidget(botId, embedType, options?)`) only accepts `user` / `customData`. There is **no** site-side switch to hide the proactive welcome/greeting bubble on mobile. Turn that greeting **off for mobile viewports in the Conferbot dashboard** (Customize / proactive prompts / device visibility). Keep the launcher. Site CSS only hides the whole widget host while `html.consent-open` (cookie banner).

## Owner steps (not done by the agent)

1. Upload widget logo + profile photo (see above).
2. Confirm flow variables in Conferbot for structured lead fields (name, email, phone, business, consent).
3. Upgrade to Starter only when ready for webhooks (Phase 8+).
4. Register webhook URL after secrets and migration exist (see production-hardening Phase 5/8/9).
5. Widget public flag is already on in production; keep `CONFERBOT_INTEGRATION_ENABLED` / `CONFERBOT_NOTIFY_ENABLED` off until Starter + approval.

## Privacy

Conferbot webhook payloads may include visitor IP, approximate location, ISP, and user agent. The site backend must strip those before storage. The public widget is a functional chat feature: it loads for every visitor on public pages (not gated on analytics cookie consent). `customData` stays free of PII (`source`, `locale`, `pathname` only).
