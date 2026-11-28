# Lead storage map (Prompt 4 item 6) — discover first

Labels: **FACT** / **INFERENCE** / **ASSUMPTION**.

## Data flow (text)

```
Browser form[data-lead]
  → POST multipart /api/contact
      → honeypot / too-fast / disposable / optional Turnstile gates
          (neutral {ok:true}, no accepted, no mail)
      → rate limit (hashed IP via existing contact limiter)
      → sendMail (SMTP Gmail or FORM_ENDPOINT forward)
          → staff inbox(es) from CONTACT_TO / CONTACT_PREVIEW_TO
      → on sent: { ok:true, accepted:true, transaction_id? }
  → browser: if accepted + counted meta form → GA4 generate_lead (no PII)
             + diagnostic events; Meta Lead if ads consent
```

## FACT — where submissions land today

| Path | Storage | Fields | Dedupe |
| --- | --- | --- | --- |
| `/api/contact` success | **Email only** via nodemailer SMTP (`GMAIL_*`) or optional `FORM_ENDPOINT` forward | All non-file form keys + sanitized attribution lines + landing page / dedupe key when present | In-flight client `WeakSet`; server rate-limit; **no durable CRM upsert** |
| Honeypot / spam gates | Nowhere | — | Returns `{ok:true}` without `accepted` |
| Conferbot (separate) | Feature-gated D1/ledger (`conferbot-ledger`) when integration enabled | Chat-extracted fields + temperature score | Ledger upsert — **not** the website form CRM |
| Invoice ledger D1 | Payments only | Invoices / payment_events | Unrelated to marketing forms |

**FACT:** There is no production table today that stores every website form as a CRM row.

**INFERENCE:** Staff treat the contact inbox (+ Conferbot when on) as the working lead list.

**ASSUMPTION:** Intended CRM for Dec 11 is either (a) new `crm_leads` D1 table in `migrations/0002_crm_leads_2026-12.sql` (prepared, **not applied**), or (b) Excel / lead-engine / Command Center import of the same columns. Do **not** run `build_crm.py --force`.

## Gaps vs Prompt 4 item 7 required fields

Missing durable store for: first source, first landing page, full UTM set, inquiry type enum, trade/city/state split, has-website + URL, start timeline, decision-maker, qualified/booked/held/won-lost, cash/MRR/hours, consent flag, dedupe key uniqueness across retries.

Email body can carry many of these once forms post them (Prompt 3 qualify fields + boot attribution). Schema SQL is prepared for Colton approval before any apply.
