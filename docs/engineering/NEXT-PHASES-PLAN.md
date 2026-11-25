# Next phases plan (Engineering Audit #2 + SEO)

**Status:** Execution in progress. GSC + Ahrefs (DR 9) folded in. **Tech-0** ships owner-approved indexing work in this marketing repo.  
**Sources:** Engineering Audit #2; GSC export; Ahrefs Free (DR only); [`docs/seo/CONTENT-PLAN.md`](../seo/CONTENT-PLAN.md).  
**SEC-01 blocker:** [`docs/engineering/SEC-01-CSP-NONCE-BLOCKER.md`](./SEC-01-CSP-NONCE-BLOCKER.md).  
**Hard rules:** no agent deploys; no prod DB migrations / secrets / paid upgrades without approval; no delete of live indexable content without gate; no pricing/terms **figure** changes; never invent volumes/KD/CPC.

---

## 0. Repo verification (current truth)

| Item | Status |
|---|---|
| Invoice D1 / LEAD_DB | Invoice applied historically — do not re-apply; LEAD_DB owner-later |
| Release gates / CI e2e | Done (#31) |
| Spanish `/es` commercial + checkout | Done (#32) |
| SEC-03 / SEC-02 | Done (#33 / #34) |
| SEC-01 nonce CSP | **Blocked** (#35) — see blocker doc |
| Conferbot lift / SEO T5 | Done (#28 / #36) |
| Connect in this repo? | **No** — `WorkTicket/kinexis-connect` + Worker `kinexis-connect` |
| BIMI in this repo? | **No** — Cloudflare Pages `kinexis-card` |

---

## 1. Master tracker

| ID | Item | Status |
|---|---|---|
| N1–N5 | Eng P1/P2 (gates, Spanish, SEC-03/02, SEC-01 blocker) | Done |
| N6 | PayPal sandbox | Blocked on creds |
| **I1** | Cloudflare Always Use HTTPS | **Owner dashboard** |
| **I2–I5** | Dead case studies 301 + homepage/pricing/local-SEO meta | In #37 |
| **I6** | Connect robots + noindex app routes | **Connect repo** (approved; not this PR) |
| **P1** | noindex BIMI | **Pages `kinexis-card`** (approved; not this PR) |
| **P2** | 301 `/es-es/*` → `/es/*` | In #37 |
| **P3** | painting + remodeling live | In #37 |
| **P4** | Connect homepage stays indexable | Approved — Connect repo |
| S1 | T5 redesign checklist | Done (#36) |
| S2–S3 | T6 / T7 new articles | After Tech-0 merge (see #44/#45) |
| S4–S5 | Trade rewrites + GBP/local SEO expand | After Tech-0 |
| S6 | Painting + remodeling | **#37** |
| S7 | Research | After Ahrefs upgrade / more GSC |

---

## 2. Phased execution

### Phase Tech-0 (#37 + owner out-of-repo)
1. Owner: Always Use HTTPS.  
2. #37: I2–I5, P2, P3.  
3. Owner/other repos: BIMI Pages noindex; Connect robots/noindex (homepage OK).  

### Phase G — SEO content after Tech-0
T6 → T7 → trade rewrite batches → GBP/local SEO expand.  
Ownership map + cannibalization guard: `src/data/keyword-ownership.ts` + `npm run check:seo-ownership`.

---

## 3. Owner gates still open

| Gate | Action |
|---|---|
| G-DEPLOY | Manual www deploy after merge |
| G-HTTPS | Cloudflare Always Use HTTPS |
| G-BIMI | Redeploy `kinexis-card` Pages with noindex + robots (Allow `/bimi/`) |
| G-CONNECT | Ship robots/noindex in `kinexis-connect` |

---

## 4. Acceptance (#37)

- [x] Three dead case studies (+ `/en/`) 301 → `/portfolio`
- [x] Homepage title leads with Kinexis Digital
- [x] `/pricing` owns contractor website cost (title/meta/H1)
- [x] Local SEO article retitled for checklist intent
- [x] `/es-es` and `/es-es/*` 301 → `/es` / `/es/:path*`
- [x] painting + remodeling `status: "live"`
- [ ] CI green before merge
- BIMI / Connect: documented locations only

---

## 5. Out of scope

Agent deploys; LEAD_DB migrate; live PayPal; inventing KD/volume; flipping pool-care / window-cleaning / yard-care off hold.
