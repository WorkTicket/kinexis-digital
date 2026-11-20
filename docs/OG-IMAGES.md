# Social preview (OG) images

## Status

Dedicated **1200×630** WebP cards live in `public/og/`. Regenerate with:

```bash
npm run images:og
```

| Page | Share image |
|---|---|
| `/` | `/og/home.webp` |
| `/pricing` | `/og/pricing.webp` |
| `/portfolio` | `/og/portfolio.webp` |
| `/web-design` | `/og/web-design.webp` |
| `/seo-services` | `/og/seo-services.webp` |
| `/industries` | `/og/industries.webp` |
| `/about` | `/og/about.webp` |
| `/contact` | `/og/contact.webp` |
| `/audit` | `/og/audit.webp` |
| `/website-management` | `/og/website-management.webp` |
| `/faqs` | `/og/faqs.webp` |
| `/blog` | `/og/blog.webp` |
| `/reviews` | `/og/reviews.webp` |
| `/upgrades` | `/og/upgrades.webp` |
| `/services` | `/og/services.webp` |
| `/strategy-call` | `/og/strategy-call.webp` |
| `/tools/*` | `/og/tools.webp` |
| Industry pages | Trade-specific `*-social.jpg` artwork |
| Case studies | Live site screenshots |
| Blog posts | Article images |

Spanish mirrors use localized social artwork for page-art and industry pages; blog mirrors use localized article covers.

## Design notes

Cards use navy/cobalt panel + page headline + hero artwork. Sitewide fallback is `/og/home.webp` (`SITE.ogImage`).
