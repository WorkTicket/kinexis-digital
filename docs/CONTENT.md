# CONTENT.md

## Brand
- Name: Kinexis Digital
- URL: `https://www.kinexisdigital.com` (see `SITE.url`)
- Phone: (307) 500-3371 (+13075003371)
- Email: hello@kinexisdigital.com
- Area served: United States
- Languages: English, Spanish

## Key messaging (from pages/site)
- Home title: "Website Plans From $97/mo for Local Businesses | Kinexis Digital". Offer: website plans for local businesses from $97/mo, free homepage preview first (no card), Google review requests on Lead System/Plus, optional missed-call text-back. Prefer “website plan(s)” / “from $97/mo” over “monthly website(s).” Never say text-back is included for free — it is optional. On Lead System/Plus, describe only $1/mo second tracking number (if used) + carrier rates. Mention $97/mo only as a Website/Own It add-on.
- Primary CTA everywhere: "Get My Free Preview" → `/contact`. Secondary: "See Plans & Pricing". Tertiary text: "Book a call" + phone.
- Form button: "Show Me My Free Homepage". Trust: "No card required. We reply fast. 😊" Preview delivery: "Free preview in 2 business days." Launch: after you approve the preview and send the content we need, the site typically goes live in **5 business days** (confirmed in writing). Lead forms collect name, email/phone, business name, business type + city, and optional current website. Prefer “your business” over “your trade” in customer-facing copy (form field name may still be `trade`).
- Plans/pricing: Website at $97/mo, Lead System at $197/mo, Plus at $297/mo, Own It at $1,497. Pricing page owns cost/intent searches.
- Custom design upgrade: one-time upgrade off a template direction; priced at **industry-standard rates** and quoted in writing (no fixed dollar amount on-site). Paid audit dollar amount still TBD — do not invent.
- Industry pages own "[trade] website" searches. Free audit is a secondary path for people who already have a site.
- Billing: monthly plans are month-to-month. Cancel anytime; site stays live through the paid period, then hosting ends unless buyout (written one-time **$1,497** purchase of site files) or move to Own It before the paid period ends. Guarantees: 60-day lead (Lead System/Plus; waive 3rd/4th charges); 30-day money-back on every plan. Missed-call text-back is optional and needs a dedicated business phone line. Lead System/Plus: $1/mo second tracking number if used + carrier rates. Website/Own It add-on: $97/mo. Carrier approval usually 10–15 days; not guaranteed. Pricing fine print lives in `PLAN_TERM_GROUPS` / `PLAN_TEXTBACK_FOOTNOTE` in `src/lib/content.ts`. Do not invent testimonials.

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
