# Next phases plan (Engineering Audit #2 + SEO)

**Status:** Execution in progress. GSC + Ahrefs (DR 9) folded in. **Tech-0** includes owner-approved P1–P4 outcomes where this repo can act.  
**Sources:** Engineering Audit #2; GSC export; Ahrefs Free (DR only); [`docs/seo/CONTENT-PLAN.md`](../seo/CONTENT-PLAN.md).  
**Hard rules:** no agent deploys; no prod DB migrations / secrets / paid upgrades without approval; no delete of live indexable content without gate; no pricing/terms **figure** changes; never invent volumes/KD/CPC.

---

## 0. Repo verification (current truth)

| Item | Status |
|---|---|
| Release gates / Spanish / SEC-03 / SEC-02 / SEC-01 blocker / T5 | Done (#31–#36) |
| Connect in this repo? | **No** — `WorkTicket/kinexis-connect` + Worker `kinexis-connect` |
| BIMI in this repo? | **No** — Cloudflare Pages `kinexis-card` |

---

## 1. Master tracker

| ID | Item | Status |
|---|---|---|
| N1–N5 | Eng P1/P2 (gates, Spanish, SEC-03/02, SEC-01 blocker) | Done |
| N6 | PayPal sandbox | Blocked on creds |
| **I1** | Cloudflare Always Use HTTPS | **Owner dashboard** |
| **I2–I5** | Dead case studies 301 + homepage/pricing/local-SEO meta | In this PR |
| **I6** | Connect robots + noindex app routes | **Connect repo** (approved; not this PR) |
| **P1** | noindex BIMI | **Pages `kinexis-card`** (approved; not this PR) |
| **P2** | 301 `/es-es/*` → `/es/*` | In this PR |
| **P3** | painting + remodeling live | In this PR |
| **P4** | Connect homepage stays indexable | Approved — Connect repo |
| S1 | T5 redesign checklist | Done (#36) |
| S2–S3 | T6 / T7 new articles | After Tech-0 merge |
| S4–S5 | Trade rewrites + GBP/local SEO expand | After Tech-0 |
| S6 | Painting + remodeling | **This PR** |
| S7 | Research | After Ahrefs upgrade / more GSC |

---

## 2. Phased execution

### Phase Tech-0 (this PR + owner out-of-repo)
1. Owner: Always Use HTTPS.  
2. This PR: I2–I5, P2, P3.  
3. Owner/other repos: BIMI Pages noindex; Connect robots/noindex (homepage OK).  

### Phase G — SEO content after Tech-0
T6 → T7 → trade rewrite batches → GBP/local SEO expand.

---

## 3. Owner gates still open

| Gate | Action |
|---|---|
| G-DEPLOY | Manual www deploy after merge |
| G-HTTPS | Cloudflare Always Use HTTPS |
| G-BIMI | Redeploy `kinexis-card` Pages with noindex + robots (Allow `/bimi/`) |
| G-CONNECT | Ship robots/noindex in `kinexis-connect` (no deploy from this agent) |

---

## 4. Acceptance (this PR)

- [x] Three dead case studies (+ `/en/`) 301 → `/portfolio`
- [x] Homepage title leads with Kinexis Digital
- [x] `/pricing` owns contractor website cost (title/meta/H1)
- [x] Local SEO article retitled for checklist intent
- [x] `/es-es` and `/es-es/*` 301 → `/es` / `/es/:path*` (legacy maps one-hop to `/es`)
- [x] painting + remodeling `status: "live"` (sitemap, nav, EN+ES copy)
- [ ] CI green before merge
- BIMI / Connect: documented locations only (not this Worker)

---

## 5. Out of scope

Agent deploys; LEAD_DB migrate; live PayPal; inventing KD/volume; flipping pool-care / window-cleaning / yard-care off hold.
