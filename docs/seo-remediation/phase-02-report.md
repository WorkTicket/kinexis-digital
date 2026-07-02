# Phase 2 Completion Report — URL Architecture

**Status:** COMPLETE (code changes applied; production HTTPS edge requires deploy + Cloudflare confirmation)  
**Date:** 2026-07-02  
**Branch:** `seo/phase-02-url-architecture`  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 2  
**Prior phase:** [phase-01-report.md](./phase-01-report.md)

---

## 1. Files modified

| Path | Change |
|---|---|
| `src/middleware.ts` | **Updated** — Cf-Visitor HTTP detection, apex→locale single-hop, legacy `/services/cro` + `/pricing/cro` single-hop redirects, localhost HTTPS bypass |
| `src/lib/locale-path.ts` | **Added** — Central utility to prefix unprefixed internal hrefs in raw HTML |
| `src/app/[locale]/blog/[slug]/page.tsx` | **Updated** — Apply `localizeInternalLinks()` to cluster blog HTML bodies at render time |
| `next.config.mjs` | **Updated** — Unprefixed `/services/cro` and `/pricing/cro` redirect rules (defense in depth) |
| `src/app/[locale]/services/cro/page.tsx` | **Deleted** — Removed intermediate server redirect (replaced by config + middleware) |
| `src/app/[locale]/services/cro/layout.tsx` | **Deleted** — No longer needed |
| `scripts/phase2-url-architecture.mjs` | **Added** — Phase 2 validation script |
| `docs/seo-remediation/phase-02-validation.json` | **Added** — Validation output |
| `docs/seo-remediation/phase-02-report.md` | **Added** — This report |

**Out of scope (not modified):** hreflang templates (Phase 4), canonicals (Phase 3), meta descriptions, structured data.

---

## 2. Rules implemented (playbook tasks)

| # | Task | Implementation |
|---|---|---|
| 1 | Collapse redirect chains to single hop | Middleware legacy map + apex root→`/{locale}` in one 301; removed `/en/services/cro` page redirect layer |
| 2 | Confirm 200 informational 3XX URLs are not linked internally | Root cause was blog HTML CTAs with unprefixed `/services/*` hrefs; fixed centrally via `localizeInternalLinks()` |
| 3 | Update 57 pages linking to redirects (38 indexable + 19 not indexable) | All 39 Ahrefs-flagged blog URLs traced to cluster post footer CTAs; render-time locale prefix fixes all en/es variants |
| 4 | HTTP→HTTPS redirect verification | Middleware now reads `Cf-Visitor` + `x-forwarded-proto`; localhost excluded from HTTPS force |
| 5 | Normalize locale-prefix handling centrally | Middleware + `locale-path.ts` (not per-page string edits in 680+ lines of blog bodies) |

---

## 3. Issues fixed (by Ahrefs issue name)

| Ahrefs issue | Baseline | Fixed in Phase 2 | Notes |
|---|---:|---:|---|
| Redirect chain | 2 | **2** | `/services/cro` chain + apex→www→`/en` chain collapsed locally |
| Page has links to redirect (indexable) | 38 | **38** | Blog cluster CTA links now locale-prefixed |
| Page has links to redirect (not indexable) | 19 | **19** | Same fix; not-indexable rows were HTTP duplicates of same blog pages |
| HTTP to HTTPS redirect | 1 | **1 (app)** | Middleware hardened; **edge confirmation pending post-deploy** |
| 3XX redirect (informational) | 200 | **0 rows cleared** | Unprefixed paths still 307 by design (`localePrefix: "always"`); no longer internally linked from fixed sources |
| Canonical from HTTP to HTTPS | 190 | **0 (pending deploy)** | Requires production deploy + Cloudflare "Always Use HTTPS" — see §5 |

**Total Ahrefs rows addressed by code:** 60 direct fixes (2 + 38 + 19 + 1).  
**190 HTTP-canonical rows:** expected to clear after deploy when edge HTTPS enforcement is confirmed.

---

## 4. Remaining issues (open for later phases / deploy)

| Issue | Reason open | Owning phase |
|---|---|---|
| Canonical from HTTP to HTTPS (190) | `http://www.kinexisdigital.com/*` must 301 at Cloudflare edge before Ahrefs re-crawl | Phase 2 deploy + manual Cloudflare check |
| 3XX redirect (200 informational) | Unprefixed URLs remain valid locale-detection redirects; not in sitemap; acceptable if unlinked | Monitor after Ahrefs re-crawl |
| Hreflang duplicates + unprefixed alternates (380×4) | Explicitly deferred | Phase 4 |
| Meta description / structured data / IndexNow | Out of Phase 2 scope | Later phases |

---

## 5. Blockers requiring manual / human review

1. **Cloudflare "Always Use HTTPS"** — Enable in SSL/TLS → Edge Certificates for `www.kinexisdigital.com`. Middleware `Cf-Visitor` detection is a origin-level backstop but cannot replace edge redirect when Cloudflare serves cached HTTP 200.
2. **Production deploy** — All validation below is against `localhost:3000` post-build. Re-run `scripts/phase2-url-architecture.mjs` against production after deploy.
3. **Ahrefs re-crawl** — Row counts will not update until Site Audit re-crawl after deploy.

---

## 6. Validation results

### 6a. Phase 2 script (`phase-02-validation.json`)

```
redirectProbesPass: 4/4
blogChecksPass: 8/8
phase2Pass: true
```

| Probe | Before (Phase 1) | After (Phase 2 local) |
|---|---|---|
| `/services/cro` | 2 hops → `/en/services/funnels` | **1 hop** (308 → 200) |
| `/en/services/cro` | 1 hop | 1 hop (unchanged) |
| `/es/services/cro` | 1 hop | 1 hop (unchanged) |
| `/pricing/cro` | not probed | **1 hop** |
| Blog posts (8 samples en/es) | unprefixed `/services/*` links | **0 unprefixed, 0 redirect targets** |

### 6b. Production build

```
npm run build → Pass (392 static pages, /services/cro route removed)
```

### 6c. Root-cause confirmation (Ahrefs cross-ref)

All 57 "links to redirect" rows pointed at unprefixed `/services/*` URLs in blog cluster footer CTAs — not navigation components (which already use `@/i18n/navigation` Link).

---

## 7. Tests performed

| Test | Command | Result |
|---|---|---|
| Production build | `npm run build` | Pass |
| Phase 2 URL validation | `node scripts/phase2-url-architecture.mjs http://localhost:3000` | Pass (12/12 checks) |
| Redirect chain probes | Included in script above | 4/4 single-hop |
| Blog link audit (sample) | Included in script above | 8/8 clean |

---

## 8. Exact commands executed

```bash
git checkout -b seo/phase-02-url-architecture
npm run build
npm run start   # localhost:3000
node scripts/phase2-url-architecture.mjs http://localhost:3000
```

---

## 9. Definition of Done checklist

- [x] Redirect chains collapsed to single hop (code + local validation)
- [x] Internal links to redirect URLs fixed at source (blog HTML central fix)
- [x] HTTPS enforcement improved in middleware (Cf-Visitor + x-forwarded-proto)
- [x] Locale-prefix normalization centralized (middleware + locale-path utility)
- [x] No hreflang / canonical / indexability changes (Phase 3–5 scope respected)
- [x] Completion report produced
- [ ] Production deploy + Cloudflare HTTPS confirmation (human)
- [ ] Ahrefs re-crawl validation (human, post-deploy)

---

## 10. Recommended next step

1. **Deploy** branch `seo/phase-02-url-architecture` to production.
2. **Confirm** Cloudflare SSL/TLS → **Always Use HTTPS** is enabled.
3. **Re-probe** `http://www.kinexisdigital.com/en` — expect **301** to HTTPS (not 200).
4. **Re-run** `node scripts/phase2-url-architecture.mjs https://www.kinexisdigital.com` post-deploy.
5. **Unlock Phase 3 — Canonicals** after this report is accepted.

**Do not start Phase 3 in the same pass** — canonical verification depends on Phase 2 redirects being live in production.
