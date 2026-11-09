# CONTENT.md

## Brand
- Name: Kinexis Digital
- URL: `https://www.kinexisdigital.com` (see `SITE.url`)
- Phone: (307) 500-3371 (+13075003371)
- Email: hello@kinexisdigital.com
- Area served: United States
- Languages: English, Spanish

## Key messaging (from pages/site)
- Home title: "Website Plans From $97/mo for Local Businesses | Kinexis Digital". Offer: website plans for local businesses from $97/mo, free homepage preview first (no card), missed-call text-back, Google review requests. Prefer “website plan(s)” / “from $97/mo” over “monthly website(s).”
- Primary CTA everywhere: "Get My Free Preview" → `/contact`. Secondary: "See Plans & Pricing". Tertiary text: "Book a call" + phone.
- Form button: "Show Me My Free Homepage". Trust: "No card required. We reply fast. 😊" Preview delivery: "Free preview in 2 business days." Lead forms collect name, email/phone, business name, trade + city, and optional current website.
- Plans/pricing: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, Own It at $1,497. Pricing page owns cost/intent searches.
- Industry pages own "[trade] website" searches. Free audit is a secondary path for people who already have a site.
- Billing: monthly plans are month-to-month (no 3-month minimum). Cancel anytime; site stays live through the paid period, then hosting ends unless buyout (written one-time purchase of site files) or move to Own It before the paid period ends. Guarantees: 60-day lead (Lead System/Plus; waive 3rd/4th charges); 30-day money-back on every plan. Missed-call text-back is an optional add-on requiring a dedicated business phone line; second tracking number $1/mo; carrier messaging rates may apply; activation subject to carrier approval (typically 10–15 days; not guaranteed). Pricing fine print lives in `PLAN_TERM_GROUPS` / `PLAN_TEXTBACK_FOOTNOTE` in `src/lib/content.ts`. Do not invent testimonials.

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
