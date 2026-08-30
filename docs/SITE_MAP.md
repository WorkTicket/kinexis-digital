# Site Map — KINEXIS Digital

Live routes, purpose, and how pages are composed. Content lives in TypeScript modules under `src/content/`. Media at `/assets/**` is deployed out of band (the root `assets/` folder is gitignored).

## Global chrome

- **Skip link:** “Skip to content” → `#main-content`
- **Header:** logo, nav (Work, Clients, Services, Industries, About, Blog, Resources), Contact
- **Footer:** CTA band, nav, industries, email, legal
- **Cookie banner:** accept / reject non-essential (GA, Ads, Clarity)

## Pages

| Route | Purpose |
|---|---|
| `/` | Trust and demand: hero, certifications, services, results, process, FAQ, explore, CTA |
| `/services` | Five-pillar hub. Flagships also live at `/services/seo`, `/services/paid-media`, `/services/web-design`. |
| `/industries` | Hub of industry chapters. Standalone pages: `/industries/home-services`, `/industries/ecommerce`. Other slugs 301 to hub anchors. |
| `/case-studies` | Index of published work |
| `/case-studies/landscaping-company-growth` | A1 Property Services |
| `/case-studies/plumbing-company-growth` | Preferred Plumbing |
| `/case-studies/ecommerce-store-growth` | Manos Creativas (`/case-studies/saas-platform-growth` 301s here) |
| `/about` | Method, operators, signals, architecture, FAQ |
| `/audit` | Interactive marketing scorecard → `/thank-you/audit` |
| `/blog` | Featured + recent + topics |
| `/blog/posts` | Full archive |
| `/blog/[slug]` | Article (organization-authored) |
| `/blog/category/[slug]` | Topic index |
| `/resources` | Toolkit and internal guides |
| `/contact` | Book a call / send a message (`#contact-form` opens the message tab) |
| `/thank-you` | Post-submit confirmation (noindex) |
| `/thank-you/audit` | Audit-request confirmation (noindex) |
| `/lp/seo`, `/lp/local-seo`, `/lp/web-design`, `/lp/google-ads-management` | Paid campaign landers (noindex). Forms post to `/api/lead`. |
| `/privacy`, `/terms` | Legal |

## Retired URLs (301)

`/pricing`, `/lead-magnet`, `/solutions`, `/locations`, `/team`, `/clients`, `/digital-marketing-agency`, comparison pages, long-tail `/services/[slug]` (hub anchors; flagships exempt), nested `/industries/:category/:sub`, `/en/*`, `/es/*` prefixes. Bare `/lp` goes to `/contact`; slug LPs stay.

## Not in sitemap

`/thank-you`, `/thank-you/audit`, `/lp/*`, `/api/*`, redirect-only service and industry slugs.
