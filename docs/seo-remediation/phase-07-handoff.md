# Phase 7 Handoff — Metadata & HTML

**Prepared:** 2026-07-02  
**Prior phase:** [phase-06-report.md](./phase-06-report.md) (COMPLETE — deploy + Ahrefs re-crawl recommended before Phase 7 production validation)  
**Playbook:** Enterprise SEO Remediation Playbook v3 — Phase 7  
**Branch:** Continue on `seo/phase-02-url-architecture` or create `seo/phase-07-metadata`

---

## Phase 7 objective

Titles, meta descriptions, H1s, and the `<html lang>` attribute are correct and unique on every indexable page.

**Audit first.** Phase 7 is likely a mix of verify-and-document (HTML lang, possibly duplicate titles from stale Ahrefs) and targeted copy fixes (short meta descriptions). Do not bulk-rewrite without checking live HTML first.

---

## Phases 1–6 carry-forward

| Phase | Status | Relevance to Phase 7 |
|---|---|---|
| Phase 2 | Deployed | URL architecture stable; metadata paths use locale-prefixed routes |
| Phase 3 | Complete | 378/378 canonical pass — do not modify |
| Phase 4 | Complete | Hreflang + **HTML lang already correct on production** (`en` / `es-419`) — see verify-and-document note below |
| Phase 5 | Complete | Lead-magnet stays `noindex, nofollow`; meta on those pages out of indexable scope |
| Phase 6 | Complete | Internal links fixed locally; **deploy before production metadata audit** |

**Human decisions locked (no reversals):**
- Lead-magnet: keep `noindex, nofollow` (Phase 5 Option A)
- Hreflang: keep 3-tag sets including on lead-magnet (Phase 4)
- Canonical / indexability / internal links: do not touch

---

## Ahrefs baseline (Phase 7 scope only)

| Ahrefs issue | Rows (Jul 1 export) | Indexable | Expected Phase 7 outcome |
|---|---:|---|---|
| Meta description too short | 132 (90 + 42) | 90 prioritize | **Real fixes** — rewrite to 120–155 chars, page-specific |
| HTML lang attribute invalid | 190 | 190 | **Likely verify-and-document** — fixed with Phase 4 hreflang deploy; Ahrefs stale |
| Duplicate title tag | Not in export folder | — | Live audit first; playbook warning |
| Duplicate meta description | Not in export folder | — | Live audit first |
| Missing / multiple H1 | Not in export folder | — | Live audit first |

### Ahrefs exports (Phase 7)

| File | Issue |
|---|---|
| `ahrefs-export/kinexisdigital_01-jul-2026_meta-description-t_2026-07-02_16-43-12.csv` | Meta too short — **indexable (90 rows)** ← prioritize |
| `ahrefs-export/kinexisdigital_01-jul-2026_meta-description-t_2026-07-02_16-43-03.csv` | Meta too short — not indexable (42 rows) |
| `ahrefs-export/kinexisdigital_01-jul-2026_meta-description-t_2026-07-02_16-42-54.csv` | Meta too short — HTTP duplicate rows (stale) |
| `ahrefs-export/kinexisdigital_01-jul-2026_html-lang-attribut_2026-07-02_16-43-55.csv` | HTML lang invalid (190) |

**Row parsing:** Use row-start URL (`^0,(https?:…`)`; ignore embedded URLs in multiline columns.

---

## Pre-flight signals (investigate before coding)

### 1. HTML lang — likely already fixed (Phase 4)

Production layout sets lang via `getHtmlLang()`:

```69:69:src/app/[locale]/layout.tsx
    <html lang={getHtmlLang(locale as Locale)} className={`${ubuntu.variable}`}>
```

```4:6:src/i18n/locale-tags.ts
export function getHtmlLang(locale: Locale): string {
  return locale === "es" ? "es-419" : locale;
}
```

Phase 4 report: Ahrefs flagged `es` vs `es-419` conflict when **duplicate hreflang tags** existed (5 tags/page). Live production now has 3 clean tags + consistent `es-419` on `/es/` pages. Phase 1 live crawl: `html_lang_invalid: 0`.

**Expected outcome:** verify-and-document unless live audit finds regressions.

### 2. Meta description too short — real work (132 rows)

Ahrefs threshold ≈ **120 characters** (playbook target: **120–155**). Code defines but does **not enforce** a minimum:

```15:15:src/lib/metadata.ts
export const META_DESCRIPTION_MIN = 50;
```

`normalizeMetaDescription()` only **truncates** to max (155); it never pads or rejects short input.

**High-volume template offenders (from Ahrefs samples):**

| Pattern | Example | Length | Source |
|---|---|---:|---|
| Location city/service | `"KINEXIS provides seo for Austin, Texas. Local strategy and measurable results."` | ~78–92 | `src/app/[locale]/locations/[city]/[service]/page.tsx` |
| Pricing subpages | `"Transparent ppc pricing with clear tiers…"` | ~94 | Pricing metadata generators |
| Industry category hubs | `"Local lead generation, service-area SEO…"` | ~87–99 | Industry index pages |
| Legal | `/terms` | ~79–88 | Static metadata |
| Comparison pages (es) | `"Compara Google Ads y SEO…"` | ~50–59 | Comparison page metadata |

**Fix approach:** Page-specific copy in content/metadata files — not template padding. Location pages need unique local proof per city+service; industry hubs need category-specific value props.

### 3. Duplicate titles / meta / H1 — audit required

No dedicated Ahrefs CSV in export folder for duplicate titles or H1 issues. Playbook lists them as warnings.

**H1 implementation:** `HeroArchetype` renders a single `<motion.h1>` for page heroes. Audit for:
- Pages without `HeroArchetype` (blog body-only, edge layouts)
- Multiple heroes or section titles promoted to `<h1>`
- Client-only pages that might render duplicate headings after hydration

**Duplicate meta risk:** Industry category pages share identical EN/ES descriptions in Ahrefs samples (e.g. healthcare hub same text both locales) — may trigger duplicate meta warnings even when length is OK.

---

## Key code paths (start here)

| File | Role |
|---|---|
| `src/lib/metadata.ts` | `buildPageMetadata()`, `normalizeMetaTitle()`, `normalizeMetaDescription()`, constants |
| `src/lib/static-page-metadata.ts` | Hub pages: about, blog, contact, case studies, services |
| `src/lib/service-metadata.ts` | Service page titles/descriptions |
| `src/app/[locale]/layout.tsx` | Root `<html lang>` |
| `src/i18n/locale-tags.ts` | `getHtmlLang()`, `getHrefLang()` |
| `src/app/[locale]/locations/[city]/[service]/page.tsx` | **Templated short location meta** |
| `src/app/[locale]/locations/[city]/page.tsx` | City hub metadata |
| `src/app/[locale]/pricing/[slug]/page.tsx` | Pricing metadata |
| `src/app/[locale]/blog/[slug]/page.tsx` | Blog post meta from excerpt/body |
| `src/content/pricing/pricing-pages.ts` | Pricing copy source |
| `src/content/locations/location-details.ts` | Local market copy (extend for meta) |
| `src/components/ui/HeroArchetype.tsx` | Primary H1 renderer |

**Reuse patterns from prior audits:**
- `scripts/phase5-indexability-audit.mjs` — sitemap crawl, CSV output, Ahrefs diff
- `scripts/phase6-internal-links-audit.mjs` — pathname-normalized URL handling

---

## Phase 7 tasks (playbook)

1. **Live metadata audit** — crawl sitemap; extract title, meta description length, H1 count, `<html lang>` per URL
2. **Meta description too short (90 indexable)** — rewrite to 120–155 chars; genuinely descriptive; mirror `en`/`es`
3. **Meta description too short (42 not indexable)** — fix if quick; lower priority
4. **HTML lang invalid (190)** — diff live vs Ahrefs; document if Phase 4 fix held
5. **Duplicate titles / duplicate meta / H1** — live audit; fix template-level causes
6. **Optional:** Wire `META_DESCRIPTION_MIN` into `buildPageMetadata()` as dev-time warning or build check (do not auto-pad)

---

## Definition of done

Produce `docs/seo-remediation/phase-07-report.md` with:

- Files modified
- Issues fixed by Ahrefs issue name
- Intentional/documented items (HTML lang stale, HTTP duplicate rows)
- Remaining issues + reasons
- Validation tool output (not claims)
- Blockers for human review

**Suggested deliverables:**

| File | Purpose |
|---|---|
| `scripts/phase7-metadata-audit.mjs` | Title, description length, H1 count, html lang, duplicates |
| `docs/seo-remediation/phase-07-audit.csv` | One row per sitemap URL |
| `docs/seo-remediation/phase-07-validation.json` | Tool output |

**Validation commands:**

```bash
npm run build
node scripts/phase7-metadata-audit.mjs https://www.kinexisdigital.com
# Compare against Ahrefs meta-description + html-lang exports
```

---

## Stop conditions

- Do **not** start Phase 8 (structured data) in the same pass
- Do **not** change canonicals, hreflang, sitemap, robots, or internal links
- Do **not** pad short descriptions with filler to hit character count
- Do **not** change `es-419` to bare `es` unless live audit proves `es-419` is wrong (Phase 4 locked consistency with hreflang)

---

## Do NOT touch (out of scope)

| Issue | Phase |
|---|---|
| Structured data errors (123) | Phase 8 |
| Sitemap / IndexNow (378) | Phase 9 |
| Slow page / CWV (34) | Phase 10 |
| Canonical / hreflang / indexability | Phases 3–5 ✓ |
| Internal links | Phase 6 ✓ |

---

## Likely outcome split

| Issue | Expected Phase 7 outcome |
|---|---|
| Meta description too short (90 indexable) | **Real fixes** — location template + pricing + industry/comparison pages |
| Meta description too short (42 not indexable) | Fix opportunistically or document |
| HTML lang invalid (190) | **Verify-and-document** — production already `en` / `es-419` |
| Duplicate title / meta / H1 | **Audit first** — may be zero on live crawl; no Ahrefs export to cross-ref |

---

## Priority fix order (if no business URL list supplied)

1. **Location service pages** (~64 URLs × 2 locales) — replace generic template in `[city]/[service]/page.tsx` with `location-details` or per-city/service copy
2. **Pricing subpages** — expand descriptions in pricing metadata / `pricing-pages.ts`
3. **Industry category hubs + comparison pages** — especially ES comparison pages at 50–59 chars
4. **Legal/terms** — low SEO priority but quick wins
5. **HTML lang** — audit only unless live fails

---

## References

| Doc | Purpose |
|---|---|
| [phase-06-report.md](./phase-06-report.md) | Phase 6 completion + deploy note |
| [phase-05-report.md](./phase-05-report.md) | Indexability / lead-magnet |
| [phase-04-report.md](./phase-04-report.md) | HTML lang + hreflang stale evidence |
| [phase-01-ahrefs-crossref.md](./phase-01-ahrefs-crossref.md) | Ahrefs row counts |
| [playbook-extracted.txt](./playbook-extracted.txt) | Phase 7 section |

**Bottom line:** Ahrefs shows 132 short-meta rows + 190 HTML-lang rows, but HTML lang is likely stale (Phase 4 fixed root cause). Phase 7 real work is **rewriting short meta descriptions** starting with the location-service template and 90 indexable Ahrefs URLs — audit live production first, then fix at the template/content layer, not with character-count padding.
