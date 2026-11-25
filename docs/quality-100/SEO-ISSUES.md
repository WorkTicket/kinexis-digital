# Phase 2 SEO issues

Production crawl captured 2026-11-17 by `scripts/crawl-seo.mjs`; complete row-level evidence is in [`SEO-CRAWL.csv`](./SEO-CRAWL.csv).

| ID | Severity | Evidence | Resolution / status |
| --- | --- | --- | --- |
| SEO-01 | Medium (fixed in branch) | The English `/blog` hub linked to `/blog/pagina-web-para-plomeros` and `/blog/como-pedir-resenas-en-google`, both returning 301. The former targets `/industries/plumbing`; the latter targets `/blog/how-to-ask-for-google-reviews-contractor`. | Excluded these retired EN entries from English cards and visible `ItemList` schema. Added Playwright regression. Redirects and Spanish mirrors are preserved. |
| SEO-02 | Informational | Five duplicate-title and description groups in raw URL results. Groups are `/` versus no trailing slash, contact URLs with `?plan=` variants (canonical is clean contact URL), and the two retired redirect aliases matching their destinations. | No conflicting indexable canonicals; no broad metadata fix warranted. |
| SEO-03 | Informational | `noindex` utility/legal routes and non-indexable industry/demo examples have no canonical. | Expected by current `pageMetadata` behavior and sitemap policy; not changed. |

## Severity totals

- Critical: **0**
- High: **0**
- Medium: **1 identified, fixed in branch** (SEO-01)
- Low open: **0**
- Informational observations: **2** (SEO-02 and SEO-03)

## Crawl totals

- Sitemap URLs: 150.
- Total requested URLs: 208, including 58 discoverable same-origin URLs (some query variants).
- Final non-200 responses: 0.
- Sitemap URLs redirecting: 0.
- Broken image references: 0.
- Broken internal HTML targets: 0 after following redirects; two avoidable internal redirect links are fixed in branch.
- Sitemap graph orphans: 0 after normalizing slash variants.
- Redirect loops / chains beyond one redirect: 0 observed.
- Accidental noindex or missing canonical on an indexable canonical route: 0 observed.

The duplicate signal counts are raw URL group counts and are not counts of duplicate indexable pages. No Search Console property data was available to assess Google-selected canonicals or actual index status.
