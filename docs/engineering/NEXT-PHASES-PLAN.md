# Next phases plan (Engineering Audit #2 + SEO)

**Status:** Living tracker (docs refresh). Engineering Audit #2 P1/P2 items N1–N5 are closed in source (N5 as documented blocker). Remaining: N6 sandbox PayPal; SEO T6+ and later CONTENT-PLAN work.  
**Sources:** Owner Engineering Audit #2 (2026-11-15); owner SEO validation findings; GSC findings (16‑month Performance export); Ahrefs findings (Free plan — DR only). Repo truth re-checked on `main` at `7967dc3d` (after #36).  
**SEO detail:** [`docs/seo/CONTENT-PLAN.md`](../seo/CONTENT-PLAN.md) (tracker T1–T16, briefs, writing standard).  
**SEC-01 blocker:** [`docs/engineering/SEC-01-CSP-NONCE-BLOCKER.md`](./SEC-01-CSP-NONCE-BLOCKER.md).  
**Hard rules (unchanged):** no real payments (PayPal **sandbox** OK if creds available); no production DB migrations / secret changes / paid upgrades without **owner approval**; no delete / noindex / redirect of content; no pricing, terms, or guarantee changes; keep the stack; no destructive git; never claim tests passed unless they did; **deploys stay manual on the owner PC** — agents do not deploy.

---

## 0. Repo verification (current truth)

| Audit claim | Verified on `main`? | Evidence |
|---|---|---|
| Invoice D1 migration applied in production | **Yes (historical)** | `docs/engineering/production-hardening/PHASE1-PRODUCTION-SETUP.md`: migration `0001` applied to prod `kinexis-invoice-ledger` (`077c8e46-…`) and preview (`5a474f5a-…`). `wrangler.jsonc` binds those real ids + `migrations_dir: "migrations"`. **Do not re-apply.** |
| LEAD_DB provisioned / lead migrations applied | **No** | Binding intentionally omitted from `wrangler.jsonc`; schema only in `migrations-lead/`. Create + bind + apply is **owner-later**. |
| `deploy-production.mjs` lacks e2e + post-deploy verify | **Resolved (#31)** | Order now: `check` → `test:e2e` → `build:worker` → `deploy:worker` → `search:notify` → `verify:prod`. Documented in `docs/WORKFLOWS.md`. |
| `verify:prod` / `test:e2e` scripts exist | **Yes** | `package.json`: `test:e2e` = Playwright; `verify:prod` = smoke-routes + structured-data + lighthouse-budget against live www. |
| CI runs e2e | **Yes (#31)** | `.github/workflows/ci.yml`: `check`, `check:invoice-security`, `build:worker`, Playwright **chromium** only. Full desktop+mobile suite stays on the owner deploy path. |
| Spanish `/es` homepage comparison still partly English | **Resolved (#32)** | `SpanishSite` passes `ES_PLAN_COMPARISON` into `PlanCompare`; ownership labels localized; `/es/pay` + `PayCheckout` `locale="es"`. |
| Spanish `/es/pricing` comparison / terms / checkout | **Resolved (#32)** | Pricing table/terms Spanish; checkout no longer English-only for `/es` path. **Prices/figures unchanged.** |
| SEC-01 CSP `script-src 'unsafe-inline'` | **Still present; blocker documented (#35)** | `next.config.ts` still includes `'unsafe-inline'`. Acceptance met via [`SEC-01-CSP-NONCE-BLOCKER.md`](./SEC-01-CSP-NONCE-BLOCKER.md) — do not ship nonce CSP without GTM/Meta/PayPal/Conferbot matrix + owner G-CSP. |
| SEC-02 rate limit = single-key KV cooldown | **Resolved (#34)** | `src/lib/rate-limit.ts`: sliding window with hit timestamps; per-bucket limits; empty-IP policy documented; DO upgrade remains owner gate. |
| SEC-03 attachment = MIME **or** extension | **Resolved (#33)** | `attachmentAllowed` now async: extension allowlist + magic-byte kind + MIME agreement. |
| Conferbot mobile launcher vs sticky bar | **Fixed in source** | PR #28 (`25764f71`). Live deploy still owner-manual. |
| SEO CONTENT-PLAN | **Landed** | PR #29 → `docs/seo/CONTENT-PLAN.md`. T5 article merged #36 (`7967dc3d`). |

**Do not re-apply invoice D1 migrations.** LEAD_DB work stays behind an owner gate.

---

## 1. Master tracker

| ID | Item | Phase | Owner gate? | Acceptance criteria (summary) | Status |
|---|---|---|---|---|---|
| N0 | This plan + SEO CONTENT-PLAN linked | Docs | No | Docs merged; no publish/delete/redirect | **Done** (#29, #30; refresh this PR) |
| N1a | Release gates: `test:e2e` before deploy | Eng P1 | No | `deploy-production.mjs` runs e2e before `deploy:worker`; fails closed on e2e fail | **Done** (#31 → `889f774b`) |
| N1b | Release gates: `verify:prod` after deploy | Eng P1 | No | Post-deploy non-destructive `verify:prod` in deploy script | **Done** (#31) |
| N1c | CI: add `test:e2e` if reliable | Eng P1 | Soft | Green on PR; chromium-only in CI; full suite on deploy script | **Done** (#31) |
| N1d | Confirm D1 prod state in docs (no migrate) | Eng P1 | **Yes** if any migrate | Docs only unless owner approves new DBs | **Done** (verify-only; §0) |
| N2 | Full Spanish `/es` homepage + pricing comparison + terms + checkout UI | Eng P1 | No pricing changes | Natural LATAM Spanish; **prices/figures unchanged**; Spanish checkout on `/es` path | **Done** (#32 → `b6f6ed55`) |
| N3 | SEC-03 magic-byte attachment validation | Eng P2 | No | Magic bytes + extension/MIME agreement; reject mismatches; size/count limits kept; tests | **Done** (#33 → `6f0f6bbc`) |
| N4 | SEC-02 proper rate limiting + tests | Eng P2 | Soft (DO binding) | Sliding window with tests; fail policy documented; DO optional later | **Done** (#34 → `967dcf7e`) |
| N5 | SEC-01 nonce-based CSP | Eng P2 | **Yes** if third parties break | Nonce CSP **only if** third parties verified; else document blocker | **Blocked / accepted as blocker** (#35 → `a4f0abaa`) |
| N6 | PayPal SANDBOX checkout + webhook evidence | Eng P1 | Soft (creds) | Sandbox run if creds present; else prepare steps — **no live charges** | Planned / blocked on creds |
| S1 | SEO article T5 redesign checklist | SEO 1 | Publish soft | Human writing standard; sitemap after publish approval | **Done in source** (#36 → `7967dc3d`); soft-publish / deploy owner |
| S2–S3 | SEO articles T6–T7 | SEO 1 | Publish soft | One PR per article preferred | Planned (next) |
| S4 | Trade cost/pages rewrites (batches) | SEO 2 | No delete | Batched PRs per CONTENT-PLAN briefs; similarity drop | Planned |
| S5 | GBP + local SEO plumber expansions | SEO 2 | No | CONTENT-PLAN T8–T9 (+ GSC B3 title if still open) | Planned |
| S6 | Painting + remodeling industry landings | SEO 3 | Soft (portfolio assets) | Flip `hold` → `live`; internal links | Planned |
| S7 | Research backlog | SEO 4 | **Data gate** | GSC brief exists; KW volumes / Ahrefs Site Explorer still blocked on plan | **Partial** — see CONTENT-PLAN T14 |

Legend: **Owner gate** = stop and get explicit approval before production mutate / publish / paid upgrade / secret / migration.

---

## 2. Phased execution order (work PRs)

### Phase A — Docs — **Done** (#29, #30; refresh this PR)
Ship / maintain `NEXT-PHASES-PLAN.md` + `CONTENT-PLAN.md` as sources of truth. **No code behavior change** on docs-only PRs.

### Phase B — Release gates — **Done** (#31)
`deploy-production.mjs`: `check` → `test:e2e` → `build:worker` → `deploy:worker` → `search:notify` → `verify:prod`. CI runs chromium e2e. Documented in `WORKFLOWS.md`.

### Phase C — Spanish localization — **Done** (#32)
`ES_PLAN_COMPARISON` / ownership strings on `/es`; `/es/pay` + Spanish `PayCheckout`. Prices unchanged.

### Phase D — SEC-03 — **Done** (#33)
Magic-byte + extension + MIME agreement on contact attachments.

### Phase E — SEC-02 — **Done** (#34)
Sliding-window KV limiter. Durable Object upgrade remains **G-DO** if concurrency requires it.

### Phase F — SEC-01 — **Blocker documented** (#35)
Keep `'unsafe-inline'` until middleware/Worker nonce + third-party matrix + **G-CSP**. See `SEC-01-CSP-NONCE-BLOCKER.md`.

### Phase G — SEO publish track — **In progress**
Follow `CONTENT-PLAN.md` order:
1. ~~T5 redesign checklist~~ (#36 in source; owner deploy / soft-publish).
2. T6 choose a designer → T7 quote form (next).
3. Optional GSC metadata pass (CONTENT-PLAN T16 / GSC B1–B4) can interleave — titles only, no new money URLs.
4. Trade rewrites in batches (cost, then pages).
5. GBP + local SEO expansions (include plumber troubleshooting; local SEO checklist title per GSC B3).
6. Painting / remodeling landings (`hold` → `live`).
7. Research only after KW tool data (Ahrefs currently Free — DR 9.0 only).

**Never invent volumes, KD, or CPC.**

### Phase H — Sandbox PayPal (parallel when creds exist)
Prepare / run SANDBOX checkout + webhook evidence. If sandbox creds unavailable: document prep steps and stop — **no live PayPal**.

---

## 3. Owner-approval gates (explicit)

| Gate | When | What owner must approve |
|---|---|---|
| G-DEPLOY | Always | Manual `npm run deploy` from owner PC; agents only report merge SHAs |
| G-D1-LEAD | Before LEAD_DB create/bind/migrate | Production/preview D1 ids + migration apply |
| G-D1-INVOICE | Before any further invoice schema change | New migration (0001 already applied — do not re-run casually) |
| G-SECRETS | Before `wrangler secret put` | Any production secret change / rotation |
| G-PAID | Before paid Cloudflare/Conferbot/Ahrefs upgrades | Billing impact |
| G-CSP | Before shipping nonce CSP | Preview experiment + third-party matrix vs keeping blocker |
| G-DO | If SEC-02 needs Durable Object binding | Resource create |
| G-PUBLISH | Before treating SEO drafts as live marketing push | Soft-publish of new/rewritten articles (code can merge; owner confirms go-live messaging) |
| G-DATA | Before Phase 4 research / rewrite prioritization by **volume/KD** | KW tool export (GSC Performance already summarized in owner GSC findings) |

---

## 4. Per-item acceptance criteria (detail)

### N1a / N1b / N1c — Release gates
- [x] `deploy-production.mjs` invokes `test:e2e` and exits non-zero on failure **before** `deploy:worker`.
- [x] After deploy, invokes `verify:prod` (smoke + structured data + lighthouse budget) non-destructively; failure fails the script.
- [x] CI runs chromium e2e; full suite documented as release-only.
- [x] `docs/WORKFLOWS.md` updated; no agent deploy.

### N2 — Spanish
- [x] `/es` homepage plan comparison + ownership block: Spanish labels/cells (LATAM voice).
- [x] `/es/pricing`: comparison + terms Spanish.
- [x] Checkout UI strings Spanish for `/es/pay`; **dollar amounts and plan prices unchanged**.
- [x] Writing: natural Latin-American Spanish path (Spain `/es-es` remains separate / noindex).

### N3 — SEC-03
- [x] Magic-byte validation implemented + tested.
- [x] Mismatch MIME/extension/bytes → reject.
- [x] Existing size/count limits preserved.

### N4 — SEC-02
- [x] Sliding-window limiter (not single boolean key).
- [x] Tests cover allow/deny/window.
- [x] Policy for missing KV/IP documented; DO upgrade gated.

### N5 — SEC-01
- [x] Blocker doc with repro / next steps (`SEC-01-CSP-NONCE-BLOCKER.md`); CSP unchanged until G-CSP.
- [ ] Nonce CSP live with GTM/Meta/PayPal/Conferbot verified *(deferred)*.

### SEO (see CONTENT-PLAN)
- [x] Ownership map + cannibalization guard documented (`/pricing` owns generic contractor cost).
- [x] Similarity + rewrite briefs + writing standard landed.
- [x] T5 article in source (#36).
- [ ] T6–T7, rewrites, GBP/local, painting/remodeling landings.
- [ ] No delete / noindex / redirect without separate owner decision after GSC.

---

## 5. Reporting cadence

After **each** execution PR merges:
1. PR link + merge SHA.
2. What changed / tests run (only claim what ran).
3. Whether owner action is needed (deploy, secrets, data export, approval gate).
4. Next item ID from the tracker.

Ready-to-deploy SHAs are listed for the owner; **agents do not deploy**.

---

## 6. Out of scope / deferred

- Production deploy from agents.
- LEAD_DB create/bind/migrate (owner).
- Live PayPal charges.
- Pricing / terms / guarantee copy changes.
- Content delete / noindex / redirect (incl. GSC coverage proposals that change indexing — separate owner ticket).
- Stack rewrite.
- Inventing SEO volumes / KD / CPC.
- `/es-es` indexing (stays noindex unless owner decides otherwise).
- Shipping nonce CSP without G-CSP + verification matrix.
- Cloudflare Always Use HTTPS / HTTP→HTTPS edge fix (GSC A1) — infrastructure on owner Cloudflare zone, not an app PR in this tracker.
