# Phase 2 structured-data validation

## Automated validation

`npm run check:structured-data https://www.kinexisdigital.com` passed **9/9** routes on 2026-11-17. It verified valid JSON-LD JSON, representative required types, and canonical organization IDs for homepage, pricing, FAQ, blog, case study, plumbing industry, portfolio, contact, and Spanish home.

The production crawl found no failed responses across the 208 sampled/crawled pages and recorded JSON-LD `@type` values in the crawl CSV. The checker is representative, not a full schema.org validator; type names alone do not prove every property's semantic validity.

## Visible-content review

- Organization / WebSite: shared brand identity and canonical site URLs are emitted through the existing schema components.
- BreadcrumbList: emitted on applicable nested/detail pages.
- Service and Offer data: existing service/plan claims were not edited; they remain grounded in page content.
- Article: case-study sample is visibly an article and passed JSON parsing/type checks.
- FAQPage: FAQ content is visible on sampled homepage, FAQ, and industry routes. No unsupported review ratings or fabricated aggregate ratings were introduced.
- Blog `ItemList`: fixed to reflect visible English blog cards by excluding the two redirected Spanish-slug entries. Spanish versions remain served at Spanish URLs.

No schema policy expansion or new claims were added. A third-party rich-result eligibility verdict and Google's interpretation require Search Console / Rich Results Test and are not asserted here.
