# Next phases plan (Engineering Audit #2 + SEO)

**Status:** Plan only — docs PR. Execution follows in separate one-item PRs.  
**Sources:** Owner Engineering Audit #2 (2026-11-15); owner SEO validation findings; repo truth checked on `main` at plan authoring (`44308f7e` lineage).  
**SEO detail:** [`docs/seo/CONTENT-PLAN.md`](../seo/CONTENT-PLAN.md) (tracker T1–T15, briefs, writing standard).  
**Hard rules (unchanged):** no real payments (PayPal **sandbox** OK if creds available); no production DB migrations / secret changes / paid upgrades without **owner approval**; no delete / noindex / redirect of content; no pricing, terms, or guarantee changes; keep the stack; no destructive git; never claim tests passed unless they did; **deploys stay manual on the owner PC** — agents do not deploy.

---

## 0. Repo verification (current truth)

| Audit claim | Verified on `main`? | Evidence |
|---|---|---|
| Invoice D1 migration applied in production | **Yes (historical)** | `docs/engineering/production-hardening/PHASE1-PRODUCTION-SETUP.md`: migration `0001` applied to prod `kinexis-invoice-ledger` (`077c8e46-…`) and preview (`5a474f5a-…`). `wrangler.jsonc` binds those real ids + `migrations_dir: "migrations"`. |
| LEAD_DB provisioned / lead migrations applied | **No** | Binding intentionally omitted from `wrangler.jsonc`; schema only in `migrations-lead/`. `FINAL-REPORT.md` / `HANDOFF.md`: create + bind + apply is **owner-later**. **Owner-approval gate** before any prod lead migration. |
| `deploy-production.mjs` lacks e2e + post-deploy verify | **Yes** | Steps today: `check` → `build:worker` → `deploy:worker` → `search:notify`. No `test:e2e`, no `verify:prod`. |
| `verify:prod` / `test:e2e` scripts exist | **Yes** | `package.json`: `test:e2e` = Playwright; `verify:prod` = smoke-routes + structured-data + lighthouse-budget against live www. |
| CI runs e2e | **No** | `.github/workflows/ci.yml`: `check`, `check:invoice-security`, `build:worker` only. |
| Spanish `/es` homepage comparison still partly English | **Yes** | `SpanishSite` Home passes translated headings into `PlanCompare`, but `PlanCompare` still renders English `PLAN_COMPARISON` / `OWNERSHIP_COMPARE` from `plans-catalog.ts` (e.g. “Professional custom website”, “Monthly commitment”, mobile hint default, “Own It vs monthly…” body). |
| Spanish `/es/pricing` comparison / terms | **Mostly Spanish**; checkout bridge still English | Pricing table/terms/hint are translated in `SpanishSite` Pricing. Bridge still says checkout is in English (`La caja está en inglés.`); `/pay` `PayCheckout.tsx` UI is English-only. |
| SEC-01 CSP `script-src 'unsafe-inline'` | **Still accurate** | `next.config.ts` CSP string includes `script-src 'self' 'unsafe-inline'` (+ GTM, Meta, PayPal, Conferbot hosts). |
| SEC-02 rate limit = single-key KV cooldown, fail-open | **Still accurate** | `src/lib/rate-limit.ts`: one KV key per bucket+IP; missing KV → allow; empty IP → allow; KV errors → deny. |
| SEC-03 attachment = MIME **or** extension | **Still accurate** | `attachmentAllowed` in `src/lib/request-security.ts` — no magic-byte check. |
| Conferbot mobile launcher vs sticky bar | **Fixed in source** | PR #28 merged (`25764f71`). Live deploy still owner-manual. |
| SEO CONTENT-PLAN | **Landed** | PR #29 → `docs/seo/CONTENT-PLAN.md`. |

**Do not re-apply invoice D1 migrations.** LEAD_DB work stays behind an owner gate.

---

## 1. Master tracker

| ID | Item | Phase | Owner gate? | Acceptance criteria (summary) | Status |
|---|---|---|---|---|---|
| N0 | This plan + SEO CONTENT-PLAN linked | Docs | No | Docs merged; no publish/delete/redirect | In progress |
| N1a | Release gates: `test:e2e` before deploy | Eng P1 | No (CI add if reliable) | `deploy-production.mjs` runs e2e before `deploy:worker`; fails closed on e2e fail | In progress |
| N1b | Release gates: `verify:prod` after deploy | Eng P1 | No | Post-deploy non-destructive `verify:prod` in deploy script | In progress |
| N1c | CI: add `test:e2e` if reliable | Eng P1 | Soft | Green on PR; chromium-only in CI; full suite on deploy script | In progress |
| N1d | Confirm D1 prod state in docs (no migrate) | Eng P1 | **Yes** if any migrate | Docs only unless owner approves new DBs | Planned (verify-only) |
| N2 | Full Spanish `/es` homepage + pricing comparison + terms + checkout UI | Eng P1 | No pricing changes | Natural LATAM Spanish; **prices/figures unchanged**; no English comparison leftovers on `/es` and `/es/pricing`; checkout strings Spanish on `/es` path or documented bilingual pay page | In progress |
| N3 | SEC-03 magic-byte attachment validation | Eng P2 | No | Magic bytes + extension/MIME agreement; reject mismatches; size/count limits kept; tests | In progress |
| N4 | SEC-02 proper rate limiting + tests | Eng P2 | Soft (DO binding) | Sliding window / token bucket with atomic coordination; tests; fail-closed policy documented | Planned |
| N5 | SEC-01 nonce-based CSP | Eng P2 | **Yes** if third parties break | Nonce CSP **only if** GTM, Meta Pixel, PayPal, Conferbot still work; else document blocker | Planned |
| N6 | PayPal SANDBOX checkout + webhook evidence | Eng P1 | Soft (creds) | Sandbox run if creds present; else prepare steps and report missing creds — **no live charges** | Planned / blocked on creds |
| S1–S3 | 3 new SEO articles (CONTENT-PLAN T5–T7) | SEO 1 | Publish soft | One PR per article (or batched only if owner prefers); human writing standard; sitemap after publish approval | Planned |
| S4 | Trade cost/pages rewrites (batches) | SEO 2 | No delete | Batched PRs per CONTENT-PLAN briefs; similarity drop; no noindex/redirect | Planned |
| S5 | GBP + local SEO plumber expansions | SEO 2 | No | CONTENT-PLAN T8–T9 | Planned |
| S6 | Painting + remodeling industry landings | SEO 3 | Soft (portfolio assets) | Match existing industry pattern; internal links | Planned |
| S7 | Research backlog | SEO 4 | **Data gate** | Only after GSC + KW export | Blocked on owner data |

Legend: **Owner gate** = stop and get explicit approval before production mutate / publish / paid upgrade / secret / migration.

---

## 2. Phased execution order (work PRs)

### Phase A — Docs (this PR)
Ship `NEXT-PHASES-PLAN.md` + ensure `CONTENT-PLAN.md` is the SEO source of truth. Merge when CI green. **No code behavior change.**

### Phase B — Release gates (item a) — **first engineering PR after docs**
1. Update `scripts/deploy-production.mjs`:
   - After `check` (or as dedicated step): `npm run test:e2e` (local Playwright against built/dev server per existing config).
   - After successful `deploy:worker` (+ search notify or before notify — prefer **after** deploy so verify hits live): `npm run verify:prod` (non-destructive).
2. Evaluate CI: install Playwright browsers; run `test:e2e` on PRs **if** the suite is stable without secrets. If `invoice-payment-integrity` / `production-audit` need prod URL or secrets, scope CI to reliable smoke subset and document the rest as release-only.
3. Acceptance: script order documented in `WORKFLOWS.md`; CI green; no deploy from agent.

### Phase C — Spanish localization (item b)
1. Localize `PlanCompare` / `OwnershipCompare` data paths for `es` / `es-419` (LATAM), or pass full Spanish matrices from `SpanishSite` so homepage/pricing comparison strings are Spanish.
2. Translate remaining English leftovers called out by audit (comparison labels, ownership body, mobile hint).
3. Checkout UI (`PayCheckout.tsx` and related): Spanish strings when locale is Spanish **or** Spanish entry to `/pay` with `lang`/copy switch — **pricing figures unchanged**.
4. Terms already largely Spanish on `/es/pricing`; spot-check `/es/terms` for English remnants.
5. Acceptance: manual or Playwright assert key Spanish strings on `/es` and `/es/pricing`; no USD figure changes.

### Phase D — SEC-03 (item c)
1. Magic-byte signatures for allowed types (PDF, JPEG, PNG, GIF, WEBP, HEIC/HEIF if feasible, DOCX/ZIP compound carefully, TXT).
2. Require extension **and** content agreement (reject MIME/extension mismatch).
3. Keep size/count limits; unit/integration tests for reject paths.
4. Acceptance: forged MIME with wrong bytes rejected; honest files accepted.

### Phase E — SEC-02 (item d)
1. Replace single-key cooldown with sliding window or token bucket.
2. Prefer Durable Object (or equivalent atomic) coordination — **owner gate** if new Cloudflare paid resource / binding.
3. Tests for limit hit, window expiry, missing IP policy (document fail-open vs closed).
4. Acceptance: tests green; behavior documented in DECISIONS.

### Phase F — SEC-01 (item e)
1. Prototype nonce-based CSP without breaking GTM, Meta Pixel, PayPal, Conferbot.
2. Verify each third party (automated where possible + documented manual checklist).
3. If any breaks and cannot be fixed without unsafe-inline: **stop**, document blocker, keep current CSP.
4. Acceptance: either nonce CSP live in source with verification notes, or written blocker — no silent break.

### Phase G — SEO publish track (item f) — after / interleaved once Eng P1 gates land
Follow `CONTENT-PLAN.md` order:
1. Three new articles (T5 → T6 → T7), one PR each preferred.
2. Trade rewrites in batches (cost batch(es), pages batch(es)).
3. GBP + local SEO expansions.
4. Painting / remodeling landings.
5. Research only after owner data (CONTENT-PLAN §10).

**Never invent volumes, KD, or CPC.**

### Phase H — Sandbox PayPal (parallel when creds exist)
Prepare / run SANDBOX checkout + webhook evidence. If sandbox creds unavailable to the agent: document exact prep steps and stop — **no live PayPal**.

---

## 3. Owner-approval gates (explicit)

| Gate | When | What owner must approve |
|---|---|---|
| G-DEPLOY | Always | Manual `npm run deploy` from owner PC; agents only report merge SHAs |
| G-D1-LEAD | Before LEAD_DB create/bind/migrate | Production/preview D1 ids + migration apply |
| G-D1-INVOICE | Before any further invoice schema change | New migration (0001 already applied — do not re-run casually) |
| G-SECRETS | Before `wrangler secret put` | Any production secret change / rotation |
| G-PAID | Before paid Cloudflare/Conferbot upgrades | Billing impact |
| G-CSP | If SEC-01 risks third parties | Shipping nonce CSP vs documenting blocker |
| G-DO | If SEC-02 needs new Durable Object / paid binding | Resource create |
| G-PUBLISH | Before treating SEO drafts as live marketing push | Soft-publish of new/rewritten articles (code can merge; owner confirms go-live messaging) |
| G-DATA | Before Phase 4 research / rewrite prioritization by traffic | GSC + KW tool exports |

---

## 4. Per-item acceptance criteria (detail)

### N1a / N1b / N1c — Release gates
- [ ] `deploy-production.mjs` invokes `test:e2e` and exits non-zero on failure **before** `deploy:worker`.
- [ ] After deploy, invokes `verify:prod` (smoke + structured data + lighthouse budget) non-destructively; failure surfaces clearly (prefer fail the script so owner notices).
- [ ] CI either runs a reliable e2e subset or documents why full suite stays release-only.
- [ ] `docs/WORKFLOWS.md` updated; no agent deploy.

### N2 — Spanish
- [ ] `/es` homepage plan comparison + ownership block: Spanish labels/cells (LATAM voice).
- [ ] `/es/pricing`: comparison + terms remain Spanish; remove needless English leftovers.
- [ ] Checkout UI strings Spanish for Spanish locale path; **dollar amounts and plan prices unchanged**.
- [ ] Writing: natural Latin-American Spanish, not machine-calque.

### N3 — SEC-03
- [ ] Magic-byte validation implemented + tested.
- [ ] Mismatch MIME/extension/bytes → reject.
- [ ] Existing size/count limits preserved.

### N4 — SEC-02
- [ ] Atomic / coordinated limiter (not single boolean key).
- [ ] Tests cover allow/deny/window.
- [ ] Policy for missing KV/IP documented; prefer safer defaults than silent unlimited.

### N5 — SEC-01
- [ ] Either nonce CSP with GTM/Meta/PayPal/Conferbot verified, **or** blocker doc with repro.
- [ ] No unverified claim that third parties “should” work.

### SEO (see CONTENT-PLAN)
- [ ] Ownership map + cannibalization guard respected (`/pricing` owns generic contractor cost).
- [ ] Similarity + rewrite briefs used; human writing standard + review checklist.
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
- Content delete / noindex / redirect.
- Stack rewrite.
- Inventing SEO volumes / KD / CPC.
- `/es-es` indexing (stays noindex unless owner decides otherwise).
