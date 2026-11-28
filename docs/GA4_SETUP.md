# GA4 setup — production-only measurement (Prompt 4 / Dec 11)

## FACT — production property ID

- Live production Measurement ID (Nov 25 2026 audit / search-preflight): `G-Z8245BRX2L`
- Injected via `window.__KINEXIS_CFG__.ga` from `Boot.tsx` (build-time env). Never log env values.

## Production hostname allowlist

`boot.js` loads GA4 and emits `gtag` events only when:

- `location.hostname` is `kinexisdigital.com` or `www.kinexisdigital.com`, **or**
- Playwright sets `window.__KINEXIS_ALLOW_ANALYTICS_HOST__ = true` (test-only; never ship that flag in production HTML)

Localhost, loopback, preview hosts, and `*.workers.dev` do **not** load gtag.js and do **not** send hits.

### Acceptance check

1. Open `http://localhost:…` with analytics consent → Network: no `googletagmanager.com/gtag/js` and no `google-analytics.com` collect.
2. Open a Workers preview / non-www host the same way → no GA hit.
3. On `https://www.kinexisdigital.com` with consent + interaction → gtag loads and hits are sent.

## Historical www-only exploration (optional)

If older property data mixed hosts, create a GA4 exploration/filter limited to hostname `www.kinexisdigital.com` (and apex if needed). Document the exploration name in the weekly scorecard when used.

## Key events (owner action in GA4 Admin)

| Event | Role | Mark as key event? |
| --- | --- | --- |
| `generate_lead` | Conversion — one per accepted form | **Yes** (sole key lead event) |
| `preview_form_submit` | Diagnostic (`event_role=diagnostic`) | No |
| `audit_request` | Diagnostic | No |
| `phone_tap` | Diagnostic — not a CRM lead | No |

## Consent

US opt-in / geo consent behavior is a legal-product choice. **This task does not change consent defaults.** See `docs/quality-100/CONSENT-VERIFICATION.md` and `ANALYTICS-CORRECTIONS.md`.
