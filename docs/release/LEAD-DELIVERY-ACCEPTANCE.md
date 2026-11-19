# Lead delivery acceptance

**Status: PARTIAL — owner confirmed receipt of nine uniquely labeled preview emails; browser form validation and all-provider lifecycle checks remain separate.**

The owner confirmed that each of the nine preview test messages arrived once, outside spam, from `hello@kinexisdigital.com`, with its fields intact. They were sent to the isolated preview Worker and recipient; no production form or pixel event was used. Tests exercised `/api/contact` with these source paths and IDs:

- `/` — `KDTEST-home-preview-1794951378517-1`
- `/contact` — `KDTEST-contact-1794951378517-2`
- `/audit` — `KDTEST-audit-1794951378517-3`
- `/lp/get-a-website` — `KDTEST-landing-main-1794951378517-4`
- `/lp/phoenix-preview` — `KDTEST-landing-phoenix-1794951378517-5`
- `/es/contact` — `KDTEST-spanish-1794951796257-1`
- `/strategy-call` — `KDTEST-booking-1794951796257-2`
- `/intake` — `KDTEST-intake-1794951796257-3`
- `/update` — `KDTEST-site-update-1794951796257-4`

The preview API returned 200 for all nine. Cloudflare Email provider message IDs were captured in server logs for the last four only; the first five succeeded but their IDs were not logged. A sixth attempt was correctly rate-limited (429) and was not sent. Preview mail routing has since been restored to empty `CONTACT_PREVIEW_TO` and fail-closed; the test recipient was not committed. A future change now records Cloudflare Email acceptance and its provider message ID without logging lead PII.

The UI routes homepage preview, contact, audit, campaign/landing, Spanish mirror, and booking/calendar submissions through `/api/contact`; `IntakeForm` also uses that endpoint for existing-client updates. Conferbot's free widget remains widget-only; its webhook/site-D1/notification integration is deferred. Mocked checks cover validation, routing, attachments, honeypot, failure and preview isolation; browser form validation, duplicate/failure recovery, and full lifecycle acceptance remain. Do not submit to production or send analytics events without separate authorization.
