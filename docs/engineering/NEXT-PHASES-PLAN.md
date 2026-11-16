# Next phases plan (Engineering Audit #2 + SEO)

**Status:** Execution in progress. GSC + Ahrefs (DR 9) folded into SEO plan (2026-11-15). **Technical indexing (Tech-0) ahead of trade rewrites.**  
**Sources:** Owner Engineering Audit #2; GSC Performance export (sc-domain, ~16 mo); Ahrefs Free (DR only); [`docs/seo/CONTENT-PLAN.md`](../seo/CONTENT-PLAN.md).  
**Hard rules (unchanged):** no real payments (PayPal **sandbox** OK if creds available); no production DB migrations / secret changes / paid upgrades without **owner approval**; no delete / noindex / redirect of **live indexable** content without approval (404 repairs OK when approved); no pricing, terms, or guarantee figure changes; keep the stack; no destructive git; never claim tests passed unless they did; **deploys stay manual on the owner PC** — agents do not deploy. **Never invent volumes, KD, or CPC.**

---

## 0. Repo verification (current truth)

| Audit claim | Status | Evidence |
|---|---|---|
| Invoice D1 migration applied in production | **Yes (historical)** | `PHASE1-PRODUCTION-SETUP.md`; do not re-apply |
| LEAD_DB provisioned | **No** | Owner-later gate |
| Release gates (`test:e2e` + `verify:prod` in deploy) | **Done** | #31 → `889f774b` |
| Spanish `/es` comparison + checkout | **Done** | #32 → `b6f6ed55` |
| SEC-03 magic bytes | **Done** | #33 → `6f0f6bbc` |
| SEC-02 sliding-window rate limit | **Done** | #34 → `967dcf7e` |
| SEC-01 nonce CSP | **Blocked** | #35 → `a4f0abaa`; `SEC-01-CSP-NONCE-BLOCKER.md` |
| Conferbot launcher lift | **Done** | #28 |
| SEO CONTENT-PLAN | **Landed + GSC/Ahrefs update** | #29; Tech-0 fold-in this PR |
| SEO T5 redesign checklist | **Done** | #36 → `7967dc3d` |
| Connect portal in this repo? | **No** | URL only in `site.ts` (`missedCallPortalUrl`) — noindex work is Connect-app owner |

---

## 1. Master tracker

| ID | Item | Phase | Owner gate? | Status |
|---|---|---|---|---|
| N0 | Plan + CONTENT-PLAN linked | Docs | No | Done (#30) |
| N1a–c | Release gates + CI e2e | Eng P1 | Soft | Done (#31) |
| N1d | D1 prod state docs (no migrate) | Eng P1 | **Yes** if migrate | Verify-only |
| N2 | Spanish `/es` commercial + checkout | Eng P1 | No price changes | Done (#32) |
| N3 | SEC-03 magic-byte attachments | Eng P2 | No | Done (#33) |
| N4 | SEC-02 sliding-window rate limit | Eng P2 | Soft (DO) | Done (#34) |
| N5 | SEC-01 nonce CSP | Eng P2 | **Yes** if break | **Blocked** (#35) |
| N6 | PayPal SANDBOX evidence | Eng P1 | Soft (creds) | Planned / blocked on creds |
| **I1** | Cloudflare **Always Use HTTPS** (HTTP→HTTPS; stop Pingora 500s) | **Tech-0** | **Yes — dashboard** | **Owner action** |
| **I2** | 301 dead case studies → `/portfolio` | **Tech-0** | No (404 repair) | In this PR |
| **I3** | Homepage title leads with **Kinexis Digital** | **Tech-0** | No | In this PR |
| **I4** | `/pricing` owns **contractor website cost** (title/meta/H1) | **Tech-0** | No | In this PR |
| **I5** | Local SEO article retitled for **local SEO checklist** | **Tech-0** | No | In this PR |
| **I6** | Connect: robots + noindex `/login`, `/signup`, dashboard | **Tech-0** | Connect repo | **Not in this repo** |
| **P1** | Propose: noindex `bimi.kinexisdigital.com` | Gate | **Yes** | Needs approval |
| **P2** | Propose: 301 `/es-es/*` → `/es/*` | Gate | **Yes** | Needs approval |
| **P3** | Propose: painting + remodeling off `hold` | Gate | **Yes** | Needs approval (= S6) |
| **P4** | Propose: Connect homepage as search landing vs noindex | Gate | **Yes** | Needs approval |
| S1 | SEO T5 redesign checklist | SEO 1 | Soft publish | Done (#36) |
| S2 | SEO T6 choose designer | SEO 1 | Soft publish | Planned (**after Tech-0**) |
| S3 | SEO T7 quote form | SEO 1 | Soft publish | Planned (**after Tech-0**) |
| S4 | Trade cost/pages rewrites | SEO 2 | No delete | Planned (**after Tech-0**) |
| S5 | GBP + local SEO plumber expansions | SEO 2 | No | Planned |
| S6 | Painting + remodeling landings | SEO 3 | **P3** | Blocked on approval |
| S7 | Research backlog | SEO 4 | Ahrefs upgrade / more GSC | Partial — GSC in; Ahrefs DR-only |

Legend: **Owner gate** = stop and get explicit approval before production mutate / publish / paid upgrade / secret / migration / indexing policy change.

---

## 2. Phased execution order

### Phase Tech-0 — Indexing & on-page (**before trade rewrites**)
1. **Owner (Cloudflare dashboard):** enable **Always Use HTTPS** (or HTTP→HTTPS 301 Redirect Rule) so `http://kinexisdigital.com` / `http://www…` stop returning **500** at Pingora. Confirm: `curl -I http://…` → 301 to HTTPS www. **Agents cannot change this from the Worker repo.**
2. **Code (this PR):** I2–I5 — 301 three dead case-study 404s (+ `/en/` via `localized`) → `/portfolio`; brand-led homepage title/meta; pricing owns “contractor website cost”; local SEO checklist retitle. Natural human copy.
3. **Connect app (separate repo):** I6 — `robots.txt` Disallow `/login`, `/signup`, dashboard; `noindex` those routes. **Do not** noindex Connect marketing `/` without **P4**.
4. **Proposals only (P1–P4):** wait for owner before BIMI noindex, `/es-es` → `/es`, painting/remodeling live, Connect homepage search treatment.

### Phase A–F — Engineering (complete / blocked)
Release gates → Spanish → SEC-03 → SEC-02 → SEC-01 blocker → sandbox PayPal when creds exist. See §0.

### Phase G — SEO content (**after Tech-0**)
1. Finish Phase 1 articles: **T6** → **T7** (T5 done).
2. Trade cost/pages rewrites in batches (CONTENT-PLAN §5).
3. GBP + local SEO expansions (T8–T9).
4. Painting / remodeling landings **only after P3**.
5. Research only after Ahrefs upgrade or Keyword Planner + fresh GSC.

### Phase H — Sandbox PayPal (parallel when creds exist)
No live charges.

---

## 3. Owner-approval gates (explicit)

| Gate | When | What owner must approve |
|---|---|---|
| G-DEPLOY | Always | Manual deploy from owner PC |
| G-HTTPS | Tech-0 I1 | Cloudflare Always Use HTTPS (dashboard) |
| G-BIMI | P1 | noindex / robots on `bimi.kinexisdigital.com` |
| G-ES-ES | P2 | 301 `/es-es/*` → `/es/*` |
| G-INDUSTRY | P3 | Flip painting + remodeling `hold` → `live` |
| G-CONNECT-HOME | P4 | Connect `/` as search landing vs noindex/301 |
| G-CONNECT-APP | I6 | robots/noindex on Connect app routes (Connect repo) |
| G-D1-LEAD | Before LEAD_DB | Create/bind/migrate |
| G-D1-INVOICE | Before further invoice schema | New migration |
| G-SECRETS | Before `wrangler secret put` | Any prod secret change |
| G-PAID | Before paid upgrades | Ahrefs / Cloudflare / Conferbot billing |
| G-CSP | If revisiting SEC-01 | Shipping nonce CSP vs blocker |
| G-DO | If SEC-02 needs new DO | Resource create |
| G-PUBLISH | Soft-publish messaging | New/rewritten articles go-live messaging |
| G-DATA | Research prioritization | Further GSC coverage lists / paid KW tool |

---

## 4. Per-item acceptance (SEO Tech-0 + content)

### I1 — Always Use HTTPS (owner)
- [ ] `curl -I http://kinexisdigital.com/` and `http://www…` → **301** to HTTPS www (not 500).
- [ ] Optional: GSC URL Inspection recrawl on one former HTTP URL.

### I2–I5 — Code PR
- [ ] `/case-studies/ecommerce-store-growth`, `saas-platform-growth`, `dental-practice-local-seo` (+ `/en/` variants) **301** → `/portfolio`.
- [ ] Homepage title starts with **Kinexis Digital**; meta natural.
- [ ] `/pricing` title, meta, and H1 explicitly speak to **contractor website cost**; prices unchanged.
- [ ] `/blog/local-seo-get-found-get-called` title/seoTitle/excerpt target **local SEO checklist** naturally.
- [ ] CI green; no deploy from agent.

### I6 — Connect (out of repo)
- [ ] App routes noindex + robots disallow; marketing homepage untouched until P4.

### P1–P4 — Proposals
- [ ] Explicit owner yes/no before any implementation PR.

### SEO content (CONTENT-PLAN)
- [ ] Ownership map + cannibalization guard (`/pricing` owns generic contractor cost).
- [ ] Human writing standard; no invented KD/volume/CPC.
- [ ] No delete / noindex / redirect of live indexable URLs without gate.

---

## 5. Reporting cadence

After **each** execution PR merges:
1. PR link + merge SHA.
2. What changed / tests run (only claim what ran).
3. Whether owner action is needed (deploy, Cloudflare HTTPS, Connect, P1–P4, Ahrefs).
4. Next item ID from the tracker.

Ready-to-deploy SHAs are listed for the owner; **agents do not deploy**.

---

## 6. Out of scope / deferred

- Production deploy from agents.
- LEAD_DB create/bind/migrate (owner).
- Live PayPal charges.
- Pricing / terms / guarantee **figure** changes (meta/H1 copy that names published prices OK).
- Content delete / noindex / redirect of **live indexable** URLs without gate.
- Stack rewrite.
- Inventing SEO volumes / KD / CPC.
- BIMI / `/es-es` / Connect homepage / painting+remodeling until P1–P4 approved.
- Cloudflare Always Use HTTPS from code (dashboard only — I1).
