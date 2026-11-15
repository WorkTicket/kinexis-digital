# Programme handoff

- **Phase:** 9 — Widget live on free plan; webhook backend still off
- **Status:** Owner enabled the public Conferbot widget on production. Agent docs the persistent `.env.production` path; does not deploy.
- **Deployed git:** `8b78de178a573dd0fe9abfbae02466ad55ee352f`
- **Worker version:** `19235f28-4018-4bbe-96c5-ecc0216b915c`
- **Rollback:** `87e26f40`

| Check | Result |
|---|---|
| Owner deploy with widget build flags | PASS → Worker `19235f28…` |
| `/`, `/es`, `/pay` | 200 |
| Client chunk includes public bot id | yes |
| CSP includes `cdn.conferbot.com` / `wdt.conferbot.com` | yes |
| `CONFERBOT_INTEGRATION_ENABLED` / `CONFERBOT_NOTIFY_ENABLED` | OFF (Starter required for webhooks) |
| Next production builds | use committed `.env.production` for widget flags |
| CI / `next dev` / e2e | widget stays off (CI sets `NEXT_PUBLIC_CONFERBOT_ENABLED=0`) |

Still owner-later: Conferbot Starter + webhook secret + register URL; LEAD_DB create/bind/`migrations-lead`; `CONFERBOT_INTEGRATION_ENABLED` / notify only with separate approval.
