# Dec 11 2026 acceptance checklist

Branch: `measurement-crm-lead-quality-2026-12`  
Base (live main): `315e362b` (boot `v=65` on www as of 2026-11-27)  
This branch bumps boot cache to `?v=67`.  
Tracking commit `e81907d` (v=66 pending queue): **not in this repo history** — **not carried over**. Reimplemented only what Prompt 4 needs (host gate, accepted marker, unified `generate_lead`, transaction_id, diagnostics).

| # | Item | Status | Notes |
| --- | --- | --- | --- |
| 1 | Production-only GA4 | PASS (code + docs) | Host allowlist in `boot.js`; `docs/GA4_SETUP.md`. Live network verify on www = NOT-TESTED until deploy |
| 2 | One `generate_lead` per accepted form | PASS (code + e2e contract) | Requires `{accepted:true}`; dedupe via in-flight + `transaction_id`. Unified behind this branch (revertible) |
| 2b | Double-click → one | PASS (e2e existing in-flight) | |
| 2c | Server error → zero | PASS (e2e) | |
| 2d | No PII in event params | PASS (e2e asserts) | |
| 3 | Diagnostic events not key | PASS (docs + e2e `event_role`) | Owner must mark only `generate_lead` key in GA4 Admin |
| 4 | Late-consent / race fixes (#3–#5) | NOT-TESTED / OFF | **Separate commit not landed** — default OFF until Colton OKs |
| 5 | Nov 17 / Nov 21 lead match | NOT-TESTED | `docs/LEAD_MATCH_2026-11.md` — needs Colton GA4 + inbox export |
| 6 | Lead storage map | PASS (docs) | `docs/LEAD_STORAGE_MAP.md` — email-only today |
| 7 | CRM schema + form payload fields | PASS (SQL prepared, unapplied) | `migrations/0002_crm_leads_2026-12.sql`. Qualify UI fields live on Prompt 3 branch; API accepts when posted |
| 8 | Lead-quality flags | PASS (unit script) | `npm run check:lead-quality`; `docs/LEAD_QUALITY_RULES.md` |
| 9 | Spam filtering | PASS (code + contact checks) | Honeypot kept; too-fast; disposable heuristic; Turnstile behind `TURNSTILE_ENABLED` default OFF |
| 10 | Weekly scorecard | PASS (fixture) | `node scripts/weekly-scorecard.mjs` |
| 11 | Homepage / LP / contact / audit / intake / strategy-call / SEO / ES forms live | NOT-TESTED | Live form tests need Colton approval + marked TEST records |
| — | Mobile `tel:` diagnostic only | PASS (code + e2e) | |
| — | Consent defaults unchanged | PASS | No consent model edits |
| — | Secrets / env in diff | PASS | Review before merge |
| — | Deploy | NOT-TESTED | **Stopped** — needs exact-SHA approval; use `npm run deploy:worker` only |

## Open questions for Colton

1. Approve unified `generate_lead` across all mapped forms (this branch)?
2. Approve late-consent / pending-queue commit (still OFF)?
3. Create Turnstile keys + set `TURNSTILE_ENABLED=1`?
4. CRM destination: apply D1 migration `0002` vs Excel/Command Center?
5. Exact SHA to deploy after review?
