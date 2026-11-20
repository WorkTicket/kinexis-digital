# Phase 2 internal-link audit

Source graph: same-origin anchor targets extracted from 208 production HTML responses and stored per page in [`SEO-CRAWL.csv`](./SEO-CRAWL.csv). The crawler follows discovered HTML routes, records redirects, and checks image references. Query-bearing links are retained as requested URLs; canonical route comparisons normalize slash variants.

## Findings

- No sitemap page is orphaned in the crawled graph after normalizing `/` and trailing-slash variants.
- No same-origin HTML link target failed to resolve to a successful final response.
- The English `/blog` index had two links to retired Spanish-slug URLs; these incurred one 301 hop apiece. Both links have been removed by filtering those entries from English cards and the page's visible `ItemList` schema. A regression test checks that the old URLs do not return as internal links.
- The existing links from Spanish blog copy to the Spanish article remain intentional; no locale URL strategy was altered.
- Related commercial links are present in sampled English and Spanish article content, but this crawl is not a semantic relevance or anchor-text quality score. No artificial links were added.
- No evidence justified changing navigation, adding location pages, or mass-editing article links.

## Graph limitations

This is a rendered-HTML crawl, not a Search Console crawl or a weighted PageRank model. It does not assess external backlinks, JavaScript interactions requiring a user gesture, hidden navigation states, or whether an inbound link is contextually useful. `internal_links` contains literal same-origin anchor URLs, including query strings, to support independent graph analysis.
