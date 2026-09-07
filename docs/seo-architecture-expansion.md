# Organic SEO Architecture Expansion — Phase 1

**Date:** 2026-09-06  
**Status:** Implementing  
**Rule:** Preserve every live high-value URL. Do not revive retired doorway or thin-service paths.

This document is the structural plan for expanding Kinexis Digital’s organic footprint around commercial intent (leads, calls, booked jobs) without cannibalizing the current foundation.

---

## 1. What already exists (do not disrupt)

### Live money pages (keep URLs, titles, and templates)

| URL | Role | Plan item it already covers |
|---|---|---|
| `/services` | Five-pillar hub | Commercial services index |
| `/services/web-design` | Flagship | Web Design Services, CRO / landing-page intent (retired slugs 301 here) |
| `/services/seo` | Flagship | SEO Services, Local SEO ( `/services/local-seo` 301s here) |
| `/services/paid-media` | Flagship | Google Ads + Meta Ads management |
| `/services/branding` | Flagship | Brand systems |
| `/services/content-marketing` | Flagship | Content / email / social |
| `/industries` | Industry hub | Category overview |
| `/industries/home-services` | Market page | Digital marketing for home service businesses |
| `/industries/ecommerce` | Market page | Ecommerce demand |
| `/case-studies/plumbing-company-growth` | Proof | Plumbing outcomes |
| `/case-studies/landscaping-company-growth` | Proof | Landscaping outcomes |
| `/case-studies/ecommerce-store-growth` | Proof | Ecommerce outcomes |

### High-intent content that already ranks-or-targets the plan

| URL | Plan item |
|---|---|
| `/blog/seo-pricing-guide` | How much does SEO cost for a small business |
| `/blog/seo-vs-google-ads` | SEO vs Google Ads for small businesses |
| `/blog/how-long-does-seo-take` | SEO timeline / “how long does local SEO take” |
| `/blog/website-conversion-optimization` | Improve website conversion rate |
| `/blog/local-seo-checklist` | Local SEO for service businesses |
| `/blog/local-business-growth-playbook` | How to get more customers from Google (adjacent) |

### Retired URLs that must stay 301 (do not revive)

| Retired URL | Destination | Why it stays retired |
|---|---|---|
| `/services/local-seo`, `/services/cro`, `/services/landing-pages`, `/services/google-ads`, `/services/meta-ads`, other long-tail service slugs | Flagship or `/services` | Thin variations of the five pillars; previously caused crawl waste |
| `/google-ads-vs-seo`, `/seo-vs-ppc`, `/local-seo-vs-google-ads`, `/wordpress-vs-webflow` | `/resources` | Root comparison URLs; canonical comparison lives in `/blog/*` |
| `/locations`, `/locations/*` | `/about` | Doorway location architecture |
| `/digital-marketing-agency` | `/about` | Duplicate of brand/about intent |
| `/pricing` | `/contact` | No public rate card; contact is the conversion path |
| `/industries/{hub-chapter}` except home-services + ecommerce | `/industries#{slug}` | Hub chapters, not standalone pages |
| Nested `/industries/home-services/{trade}` | `/industries/home-services` | Nested paths were collapsed; new trades use **sibling** URLs instead |

`/lp/*` remains **noindex** (paid landers), including `/lp/dallas-website-audit`. There is no `/dallas` page and no `/dallas` 301 — that URL never shipped.

---

## 2. Keyword scoring used for this phase

Scored 1–5 on buying intent, relevance, specificity, difficulty, revenue, and ability to show expertise. Only topics scoring **4+ on intent and revenue** were built now.

| Topic | Intent | Revenue | Build now? | Destination |
|---|---:|---:|---|---|
| Website design for plumbers | 5 | 5 | Yes | `/industries/plumbing` |
| SEO for plumbers | 5 | 5 | Yes | same page (section + links to `/services/seo`) |
| Landscaping / HVAC / roofing marketing | 5 | 5 | Yes | dedicated vertical pages |
| Small business website cost | 5 | 5 | Yes | `/blog/small-business-website-cost` |
| Why isn’t my website generating leads | 5 | 5 | Yes | blog |
| Website builder vs professional | 5 | 4 | Yes | blog (not `/wordpress-vs-webflow`) |
| Google Ads vs Facebook Ads local | 5 | 4 | Yes | blog (not retired comparison URLs) |
| Digital marketing agency Dallas | 4 | 4 | **No** | NAP is Wyoming (307). Do not create `/dallas`. Paid lander `/lp/dallas-website-audit` stays noindex for Dallas ad traffic and does not claim a Dallas office. |
| What is SEO / what is web design | 1 | 1 | No | — |
| SEO for dentists / lawyers / startups | 3 | 2 | No | Out of core market; would dilute home-services focus |
| Best CRM for plumbers | 2 | 2 | No | Thin “best tools” risk |
| `/services/small-business-web-design` | 4 | 4 | **No** | Would 301 under current service catch-all; cannibalizes `/services/web-design` |
| `/services/cro` revival | 4 | 4 | **No** | Explicit 301 to web design; CRO covered by blog + flagship |
| Contractors standalone | 4 | 4 | **No this phase** | `/industries#construction` already covers contractor / GC intent |

---

## 3. Structural changes in this phase

### New indexable URLs

| URL | Intent | Distinct from |
|---|---|---|
| `/industries/plumbing` | Digital marketing + site + SEO + ads for plumbers | Home-services hub (all trades) |
| `/industries/landscaping` | Same for landscaping / outdoor | Home-services hub |
| `/industries/hvac` | Same for HVAC seasonality | Home-services hub |
| `/industries/roofing` | Same for storm / insurance / exterior | Home-services hub |
| `/blog/small-business-website-cost` | Website pricing research | Web design service page (sells the work; this explains cost) |
| `/blog/website-not-generating-leads` | Problem: site gets visits, no leads | Conversion case-study article |
| `/blog/website-traffic-no-calls` | Problem: traffic, no phone | Adjacent but call-specific |
| `/blog/website-redesign-signs` | Redesign vs tolerate | Web design service page |
| `/blog/website-builder-vs-professional` | Builder vs custom | Retired `/wordpress-vs-webflow` |
| `/blog/google-ads-vs-facebook-ads` | Google vs Meta for local | `/blog/seo-vs-google-ads` (different comparison) |
| `/blog/more-leads-from-service-website` | Outcome: more leads from the site | Web design + CRO articles |

### Redirect / crawl changes

- `/industries/plumbing|landscaping|hvac|roofing` change from **301 → `/industries`** to **200** with unique content. These slugs were never standalone pages; they were unknown-slug catch-alls. Promoting them is safe.
- Nested `/industries/plumbing/:path+` 301s to the new parent (same pattern as home-services).
- No existing 200 URL is changed.
- No flagship service URL is split.

### Hub behavior

Verticals are **not** added as extra chapters on `/industries`. That hub stays the original 15 markets. Plumbing and siblings are linked from:

- `/industries/home-services` trade list
- Home-services chapter “focus areas” on the hub
- Nav + footer
- Related service / blog / case-study links

### Internal linking fixes (no new URLs)

- Resources “Google Ads vs SEO” pointed at `/google-ads-vs-seo` (301 loop back to `/resources`). Point it at `/blog/seo-vs-google-ads`.
- Cluster article parent links used `/services#seo` (hub hash) instead of `/services/seo` (money page). Point them at flagships.

---

## 4. Explicitly not built (later phases)

Wait for Search Console traction before expanding:

- Organic `/dallas` or other city pages (Wyoming NAP; do not imply a Dallas office)
- Additional Dallas variants (web design Dallas, SEO Dallas, Google Ads Dallas)
- HVAC/roofing/plumbing **problem** cluster (why isn’t my plumbing company on Google, plumbing website cost, etc.)
- Contractor standalone page
- New case-study URLs (existing three stay; rewrite only if we have new substantiated work)
- Informational “what is” content
- Scaled city or trade doorway pages

---

## 5. Success measures

Not keyword count. Watch in GSC + CRM:

- Organic clicks to the four verticals and the seven new guides
- Commercial queries: `website design for plumbers`, `seo for hvac companies`, `small business website cost`
- Organic consultation requests and calls from those landing pages
- No ranking drop on `/services/*` flagships or `/industries/home-services`
