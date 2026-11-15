# Social preview (OG) images

## Status (verification phase)

| Page | Current share image | Ideal dedicated OG (1200×630) |
|---|---|---|
| `/` | Interim: `/assets/heroes/01-homepage-960.webp` | Outstanding: `public/og/home.webp` |
| `/pricing` | Interim: `/assets/heroes/06-pricing-960.webp` | Outstanding: `public/og/pricing.webp` |
| `/portfolio` | Interim: `/assets/heroes/02-portfolio-960.webp` | Outstanding: `public/og/portfolio.webp` |
| `/web-design` | Interim: `/assets/heroes/07-web-design-960.webp` | Outstanding: `public/og/web-design.webp` |
| `/seo-services` | Interim: `/assets/heroes/08-local-seo-960.webp` | Outstanding: `public/og/seo-services.webp` |
| `/industries` | Interim: homepage hero 960 | Outstanding: `public/og/industries.webp` |
| `/industries/plumbing` | Interim: `/assets/industries/plumbing/hero-960.webp` | Outstanding: trade-specific share card |
| `/industries/hvac` | Interim: industry hero-960 | Outstanding |
| `/industries/landscaping` | Interim: industry hero-960 | Outstanding |
| `/industries/roofing` | Interim: industry hero-960 | Outstanding |
| Case studies | Live site screenshots (already page-specific) | Optional polish only |
| Blog posts | Article images (already page-specific) | Done |

## Why interim

Hero files are square (~1:1). Dedicated OG art should be **1200×630** with brand + page headline for link previews. Interim heroes improve uniqueness vs the single sitewide `OGimage-sm.webp` fallback.

## Remaining production art work

1. Design 1200×630 WebP (and AVIF optional) for the rows marked Outstanding.
2. Place under `public/og/`.
3. Point `PAGES.*.ogImage` (and industry metadata) at those files.
4. Re-run a share debugger spot-check (Facebook / X / LinkedIn).

This is **not** a deploy blocker for the verification phase; interim images are wired.
