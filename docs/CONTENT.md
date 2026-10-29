# CONTENT.md

## Brand
- Name: Kinexis Digital
- URL: `https://www.kinexisdigital.com` (see `SITE.url`)
- Phone: (307) 500-3371 (+13075003371)
- Email: hello@kinexisdigital.com
- Area served: United States
- Languages: English, Spanish

## Key messaging (from pages/site)
- Home: "Professional Web Design for Businesses | Kinexis Digital" - Fast, professional websites for US businesses, with a free homepage preview before choosing a plan.
- Plans/pricing: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, Own It at $1,497 (see `src/lib/pages.ts` pricing description). Every plan starts with free preview.
- Free audit, strategy call available.
- 60-day lead guarantee mentioned in FAQs/terms (do not invent specifics beyond what's in repo).

## Canonical pages
See `src/lib/pages.ts` for full metadata (titles/descriptions/indexable/priority). Key: home, services, web-design, seo-services, audit, pricing, contact, industries, portfolio, reviews, blog, faqs, about, terms, privacy.

## Copy rules
- Do not invent product claims, pricing, offers, guarantees, or features. Only use what's in repo (`src/lib/pages.ts`, `src/lib/content.ts`, `src/data/*`, components).
- Preserve the pragmatic messaging tone for business owners. Contractors and home-service businesses are important examples, not the only audience.
- For Spanish content, follow existing patterns in `src/app/es/*`, `src/app/es-es/*` and i18n.
- Announce bar controlled by `SITE.announce` in `src/lib/site.ts`.
- OG image: `SITE.ogImage` (`/OGimage-sm.webp`)

## Assets/copy locations
- Page copy often in route components under `src/app/`
- Shared copy in `src/lib/content.ts`, `src/lib/pages.ts`
- Industry content in `src/data/industries.ts`
- Portfolio in `src/data/portfolio.ts`
