# Conversion measurement

## Event contract (Prompt 4 / Dec 11)

| Event | Role | Key event? | When |
| --- | --- | --- | --- |
| `generate_lead` | Conversion | **Yes** (sole) | Server returned `{ok:true, accepted:true}` for a counted marketing form (`data-meta-form` mapped). Once per submission (`WeakSet` in-flight + `transaction_id`). |
| `preview_form_submit` | Diagnostic (`event_role=diagnostic`) | No | Accepted preview conversion |
| `audit_request` | Diagnostic (`event_role=diagnostic`) | No | Accepted audit conversion |
| `phone_tap` | Diagnostic (`event_role=diagnostic`) | No | `tel:` click — **not** a CRM lead; answered/qualified calls via CRM |
| Meta `Lead` | Ads | n/a | Ads consent + mapped form; browser Pixel + CAPI share `META_CONTENT_NAME_BY_FORM` |

### Allowed `generate_lead` params (no PII)

`form_id`, `page_path`, `source`, `landing_page`, `method`, `trade` (enum only), `inquiry_type` (enum), `transaction_id`.

Never send name, email, phone, business, city free-text, or other PII in analytics params. PII stays in CRM/email only.

### Form → inquiry_type

Unified `generate_lead` (this branch; revertible) covers homepage/LP preview, contact, audit, intake, strategy-call, footer, review-QR — any form with a Meta content-name map entry, after **accepted** delivery. `/update` remains excluded.

## Host gate

Production hostnames only: `kinexisdigital.com` / `www.kinexisdigital.com`. See `docs/GA4_SETUP.md`.

## Form completion semantics

Tracking runs only after `res.ok` **and** `body.accepted === true`. Honeypot, too-fast, disposable-email, and Turnstile (when enabled) responses are `{ok:true}` without `accepted` — UI may show thanks; **no** GA4/Meta lead, **no** mail. Client invalid forms, network errors, 4xx/5xx, mail-unconfigured 503, and provider errors emit no completion tracking.

The browser guards with a `WeakSet` while a request is pending. `kx_transaction_id` is posted for server/CRM dedupe. Distinct repeated submissions can still create multiple emails until CRM unique `dedupe_key` is applied (migration prepared, unapplied).

## Consent

US opt-in / geo logic is unchanged in this task (legal/product). Documented only — do not alter defaults here.

## Owner actions

1. GA4 Admin: mark **only** `generate_lead` as a key event.
2. Approve CRM migration before any production data write.
3. Approve Turnstile keys before `TURNSTILE_ENABLED=1`.
