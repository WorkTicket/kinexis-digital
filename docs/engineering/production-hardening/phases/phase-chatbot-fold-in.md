# Extra — Conferbot / Kinexis AI Sales Consultant fold-in

**Label:** Extra programme docs (not a separate numbered phase). Chatbot work is folded into Phases 2–9 below.  
**Bot (public):** “Kinexis AI Sales Consultant”, Bot ID `6afa0edabbad567d637ee189`, share `https://share.conferbot.com/c/eqkz5emr`, snippet `ConferbotWidget("6afa0edabbad567d637ee189")`.  
**Plan:** Conferbot FREE. Webhooks need Starter (~$19/mo). API needs Pro per owner dashboard. **Do not upgrade. Leave integration flags off. Record upgrade as owner blocker.**

## Map (kit phases → programme)

| Kit / deliverable | Programme phase | Notes |
|---|---|---|
| Audit / D1 decision / harness pattern | **2** (this PR: pattern only) | Prefer separate `LEAD_DB` D1; kit’s “no DB” claim is outdated (invoice D1 exists). |
| CI gates, preview email never alerts leads | **3** | Flags default off; preview sink for contact/lead mail. |
| Locale `customData`, bot setup doc, privacy copy notes | **4** | No pricing/EUR/terms changes. |
| Widget (flag off), CSP, consent, HMAC webhook, redaction, D1 migration file, lead score MVP, notification outbox MVP | **5** | Main implementation. Secret-verified webhook. Strip IP, location, ISP, user agent before storage. Dedupe keys from payload fields (no event ID). |
| Lazy / after-interaction load, Lighthouse, a11y vs cookie UI | **6** | Performance budget. |
| CONFERBOT docs, WORKFLOWS, DECISIONS | **7** | |
| Preview QA, owner Starter upgrade + webhook register | **8** | Owner actions; no agent upgrade. |
| Release checklist; flags stay off until approval | **9** | Stop for explicit release approval. |

## Deferred

- Full `/admin` command center and Cloudflare Access JWT (optional Phase 8 scaffold only if time; otherwise owner runbook).
- Conferbot REST API / Pro plan.
- Production flag flip, secrets, D1 create/migrate, live webhook registration, real lead emails.

## Hard rules (binding)

No production deploy, production secrets/DNS/migrations, live charges, real customer notifications, or paid plan upgrades by the agent. Prepare runbooks; list owner blockers. Never record secret values. Brand casing: “Kinexis” as the repo does.
