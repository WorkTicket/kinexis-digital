# Programme handoff

- **Phase:** 9 — Release complete (flags off)
- **Status:** Owner deployed production; smoke recorded. Agent stopped unless asked.
- **Deployed git:** `8b78de178a573dd0fe9abfbae02466ad55ee352f` (stack tip #16)
- **Worker version:** `4e7ffb77-d236-47b8-a6c6-5a196add4f66`
- **Rollback:** `87e26f40`

| Check | Result |
|---|---|
| Owner `npm run deploy` (includes internal checks) | PASS |
| Pages `/`, `/es`, `/pay`, `/contact`, `/services`, `/pricing` (www + apex) | 200 |
| Unsigned PayPal webhook POST | 400 |
| Conferbot webhook (flags off) | 404 |
| Homepage HTML Conferbot references | none |
| `search:notify` / IndexNow | OK (131 URLs) |

Still owner-later (not this ship): LEAD_DB create/bind/`migrations-lead`, Conferbot Starter + secrets, any flag flip (separate written approval).
