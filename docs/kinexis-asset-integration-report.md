# KINEXIS Asset Package — Integration Report

**Status:** Integrated and verified locally. Not deployed.  
**Branch:** `feat/design-collection-agency`  
**Date:** 2026-10-20  
**Source package:** `C:\Users\Slay3r\Downloads\KINEXIS-Assets`  
**Integration brief:** `C:\Users\Slay3r\Downloads\KINEXIS-Assets\docs\OPENCODE-INTEGRATION.md`

---

## 1. What was integrated

The supplied KINEXIS concept package now drives a complete website-design funnel inside the existing Kinexis Digital Next.js site:

1. **Homepage** — six featured concepts, package illustrations, and a link to the full collection.
2. **Gallery** — `/website-designs` with search, trade filters, style filters, result counts, and an empty state.
3. **Detail pages** — 32 stable routes at `/website-designs/<slug>` using the real package screenshots, logo, and device mockup.
4. **Contact handoff** — `/contact?design=<slug>` keeps the selected concept visible and submits the slug with the existing form payload.
5. **Static demos** — 32 editable concept demos under `/assets/kinexis/designs/<slug>.html`, kept `noindex,nofollow` and demo-only.

The package was treated as an asset and reference collection, not as a replacement repository. No CMS, dependency upgrade, route deletion, or deployment was introduced.

---

## 2. Source and provenance

### 2.1 Copied asset set

The package `public/` contents were copied into `public/assets/kinexis/` without replacing the site's existing `public/` directory.

| Measure | Value |
|---|---:|
| Files copied | 369 |
| Total size | 78,451,405 bytes (≈74.8 MiB) |
| WebP images | 239 |
| SVG logos/icons | 91 |
| HTML concept demos | 32 |
| TTF font files | 3 |
| MP4 files | 2 |
| Shared CSS | 1 |
| Font license | 1 |

Per folder:

| Folder | Files | Size |
|---|---:|---:|
| `previews/` | 160 | 57.7 MiB |
| `photos/` | 26 | 8.7 MiB |
| `illustrations/` | 40 | 0.7 MiB |
| `logos/` | 32 | <0.1 MiB |
| `icons/` | 36 | <0.1 MiB |
| `graphics/` | 18 | 1.5 MiB |
| `social/` | 12 | 1.2 MiB |
| `designs/` | 33 | 0.3 MiB |
| `fonts/` | 4 | 1.8 MiB |
| `brand/` | 3 | 0.2 MiB |
| `backgrounds/` | 3 | <0.1 MiB |
| `video/` | 2 | 2.7 MiB |

The two MP4 files (`design-collection-showcase.mp4`, `oakline-scroll-preview.mp4`) were copied with the package but are not referenced by the integrated pages. They are not loaded by the site or the static demos.

### 2.2 Source notes carried forward

From the package's `docs/SOURCES-AND-USAGE.md`:

- Concept layouts, fictional trade logos, icons, illustrations, backgrounds, device frames, and social compositions were created for this brief.
- The package does not copy 180 Sites artwork, logos, testimonials, client work, layouts, or copy.
- The 26 photographs are AI-generated illustrative concept imagery. They are not verified client work and must not be presented as completed projects.
- The 32 trade names are fictional demonstration identities. No trademark clearance or client relationship is implied.
- The existing KINEXIS wordmarks and Colton portrait are user-supplied brand inputs. The existing KINEXIS logo, favicon, and palette remain the site brand.
- DejaVu fonts are bundled for the static concept demos. Their license is retained at `public/assets/kinexis/fonts/LICENSE.txt`.
- Package screenshots were rendered from the supplied HTML/CSS with WeasyPrint. They are deterministic layout exports, not AI-generated page screenshots. The package did not include a Chromium browser test; browser QA was performed during this integration.

### 2.3 Catalog data

The package `designs.json` became `src/content/kinexis-designs.json` with:

- stable IDs and slugs preserved;
- trade and trade-key values preserved;
- layout style, palette, headline, intro, and services preserved;
- concept status preserved;
- asset paths rewritten to `/assets/kinexis/...`;
- intrinsic image dimensions recorded for every preview asset;
- the six homepage-featured designs marked explicitly.

---

## 3. Concept mapping

All 32 concepts are available in the gallery and have a static detail route across the three locale variants. “Featured” marks the six shown on the homepage.

| # | Concept | Slug | Trade | Style | Featured | Static demo |
|---:|---|---|---|---|:---:|---|
| 01 | Oakline | `oakline` | Landscaping | editorial | Yes | `/assets/kinexis/designs/oakline.html` |
| 02 | Blueforge | `blueforge` | Plumbing | utility | Yes | `/assets/kinexis/designs/blueforge.html` |
| 03 | Current | `current` | Electrical | technical | Yes | `/assets/kinexis/designs/current.html` |
| 04 | Ridgeway | `ridgeway` | Roofing | bold | Yes | `/assets/kinexis/designs/ridgeway.html` |
| 05 | Northair | `northair` | HVAC | airy | Yes | `/assets/kinexis/designs/northair.html` |
| 06 | Goodhand | `goodhand` | Handyman | warm | Yes | `/assets/kinexis/designs/goodhand.html` |
| 07 | Juniper | `juniper` | Remodeling | studio | — | `/assets/kinexis/designs/juniper.html` |
| 08 | Fieldwork | `fieldwork` | Lawn & irrigation | sport | — | `/assets/kinexis/designs/fieldwork.html` |
| 09 | Clearwater | `clearwater` | Pressure washing | utility | — | `/assets/kinexis/designs/clearwater.html` |
| 10 | Haven | `haven` | House cleaning | airy | — | `/assets/kinexis/designs/haven.html` |
| 11 | Brightpane | `brightpane` | Window cleaning | editorial | — | `/assets/kinexis/designs/brightpane.html` |
| 12 | Softstep | `softstep` | Carpet cleaning | warm | — | `/assets/kinexis/designs/softstep.html` |
| 13 | Liftgate | `liftgate` | Garage doors | technical | — | `/assets/kinexis/designs/liftgate.html` |
| 14 | Haulday | `haulday` | Junk removal | sport | — | `/assets/kinexis/designs/haulday.html` |
| 15 | Solidform | `solidform` | Concrete | studio | — | `/assets/kinexis/designs/solidform.html` |
| 16 | Homeguard | `homeguard` | Pest control | utility | — | `/assets/kinexis/designs/homeguard.html` |
| 17 | Canopy | `canopy` | Tree care | editorial | — | `/assets/kinexis/designs/canopy.html` |
| 18 | Afterglow | `afterglow` | Outdoor lighting | cinema | — | `/assets/kinexis/designs/afterglow.html` |
| 19 | Stillwater | `stillwater` | Pool service | airy | — | `/assets/kinexis/designs/stillwater.html` |
| 20 | Freshcoat | `freshcoat` | Painting | warm | — | `/assets/kinexis/designs/freshcoat.html` |
| 21 | Mirrorfinish | `mirrorfinish` | Auto detailing | cinema | — | `/assets/kinexis/designs/mirrorfinish.html` |
| 22 | Workwell | `workwell` | Commercial cleaning | technical | — | `/assets/kinexis/designs/workwell.html` |
| 23 | Lumen | `lumen` | Holiday lighting | cinema | — | `/assets/kinexis/designs/lumen.html` |
| 24 | Stonehaven | `stonehaven` | Concrete coatings | bold | — | `/assets/kinexis/designs/stonehaven.html` |
| 25 | Wrap District | `wrapdistrict` | Vehicle wraps | bold | — | `/assets/kinexis/designs/wrapdistrict.html` |
| 26 | Form & Focus | `dojo` | Martial arts | sport | — | `/assets/kinexis/designs/dojo.html` |
| 27 | Kindred | `kindred` | Pet waste removal | warm | — | `/assets/kinexis/designs/kindred.html` |
| 28 | Clearview | `clearview` | Dental | airy | — | `/assets/kinexis/designs/clearview.html` |
| 29 | Elm House | `elmhouse` | Real estate | studio | — | `/assets/kinexis/designs/elmhouse.html` |
| 30 | Daylight | `daylight` | Photography | editorial | — | `/assets/kinexis/designs/daylight.html` |
| 31 | Noble Route | `blacklane` | Luxury transport | cinema | — | `/assets/kinexis/designs/blacklane.html` |
| 32 | Brightday | `brightday` | Events & foam parties | sport | — | `/assets/kinexis/designs/brightday.html` |

Notes:

- Slugs are preserved from the package even where the concept brand differs (`dojo` → Form & Focus, `blacklane` → Noble Route).
- All 32 trade keys are distinct. The gallery copy uses “32 trades.”
- Layout styles are nine families: editorial, utility, technical, bold, airy, warm, studio, sport, and cinema.

---

## 4. Asset placement and path repair

### 4.1 Live-site images

| Use | Asset |
|---|---|
| Gallery card | `previews/<slug>-card.webp` |
| Compact phone preview | `previews/<slug>-mobile-top.webp` |
| Detail desktop preview | `previews/<slug>-desktop.webp` |
| Detail mobile preview | `previews/<slug>-mobile.webp` |
| Device mockup | `previews/<slug>-mockup.webp` |
| Concept logo | `logos/<slug>.svg` |
| Homepage hero | `graphics/hero-showcase-transparent.webp` |
| Illustrations | `illustrations/*.svg` |

Every preview record carries `src`, `width`, and `height`. Gallery cards use crops, not full-page exports; full exports render only when selected on a detail page. All collection imagery is lazy-loaded except the homepage hero.

### 4.2 Static demos

The demos remain static HTML rather than being rewritten as React routes.

- Paths changed from `../public/...` to `/assets/kinexis/...`.
- Package links to the missing `../index.html` became `/website-designs`.
- Shared styles live at `public/assets/kinexis/designs/design.css`.
- DejaVu fonts and their license are scoped to the demo directory.
- Every demo retains `<meta name="robots" content="noindex,nofollow">`.
- Every demo retains a fictional-business notice.
- Each form calls `event.preventDefault()` and displays a demo-only completion message. No demo form has an `action` or `method`, and no demo code writes to storage or calls `fetch`, `XMLHttpRequest`, or `sendBeacon`.
- No demo loads an external script, font, or image.
- The demo nav now collapses at 900px so the longer package navigation does not overflow tablet widths.

The static demo option was chosen from the two approaches allowed by the integration brief. It keeps the supplied layouts editable and avoids duplicating 32 page implementations in React.

---

## 5. Changed routes and surfaces

| Route / surface | Type | Change |
|---|---|---|
| `/` | Homepage | Six featured concepts, package showcase and illustrations, “32 designs” copy, link to full collection. Existing services, markets, client work, plans, and contact sections preserved. |
| `/website-designs` | Gallery | Server-rendered grid of 32 concepts, GET search (`?q=`), trade filter (`?trade=`), style filter (`?style=`), counts, active-filter labels, reset, empty state. |
| `/website-designs/<slug>` | Detail ×32 | Real card, desktop, mobile, logo, and mockup assets; concept label; palette; features; services; customization notes; related designs; demo and contact CTAs. |
| `/contact?design=<slug>` | Contact | Selected design card, default message tab, preserved selection, slug included in the existing payload. |
| `/api/contact` | API | Validates the optional design slug, resolves it server-side, and adds a “Starting design” row to the contact email. Existing origin check, rate limit, honeypot, validation, and mail provider retained. |
| `/assets/kinexis/designs/*.html` | Static demos ×32 | Path repair, repaired collection links, 900px nav breakpoint, `noindex,nofollow`, demo-only forms. |
| `/sitemap.xml` | Sitemap | All 32 design detail URLs added with design last-modified dates. |
| `/llms.txt`, route registry | Discovery | Collection route registered alongside the existing site routes. |

No existing routes were deleted.

### 5.1 Locale behavior

The site uses `localePrefix: "never"` with a locale cookie and geo detection. Public URLs stay unprefixed, so:

- `/es-419/website-designs` resolves to the canonical `/website-designs` while the `es-419` locale remains active.
- The gallery search form deliberately has no `action`; submitting it keeps the current canonical path and the active locale.
- The final check submitted `plumbing` from the Spanish gallery and landed on `/website-designs?q=plumbing` with `html lang="es-419"`, one result, and the Spanish title/H1 intact.
- All new gallery, detail, contact, filter, empty-state, and conversion labels are localized in EN, `es-419`, and `es-ES`.
- Concept demo copy remains English and is disclosed as English on the localized gallery.

---

## 6. What was preserved

- Next.js App Router and Tailwind-based styling.
- Existing KINEXIS logo, favicon, cobalt/navy/yellow palette, and brand fonts.
- Existing form backend, origin/CSRF check, rate limit, honeypot, validation, and mail provider.
- Existing analytics and cookie-consent behavior. No personal information is sent to analytics; the design slug is not treated as personal data.
- Existing locale architecture and message catalogs.
- Existing Cloudflare-oriented build path and static generation.
- Existing `/lp/get-a-website` campaign route, ad parameters, and tracking.
- Existing verified client scope for A1 Property Services and Preferred Plumbing. The package concepts were not added to client work.
- Existing plan and offer configuration. Package pricing was not merged in.

---

## 7. Verification

### 7.1 Static checks

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Pass |
| `npm test` | Pass — 607 tests across 68 files |
| `npm run lint` | Pass — 0 errors, 18 warnings (existing `<img>` advisories, including package-image views) |
| `npm run build` | Pass — 361 static pages generated |
| Cloudflare/static compatibility | Build path retained; no new runtime dependency or server-only feature added |

### 7.2 Browser QA

Run with Chromium, reduced motion enabled, and consent accepted.

- **20 page loads** across `/`, `/website-designs`, `/website-designs/oakline`, `/contact?design=oakline`, and `/assets/kinexis/designs/oakline.html` at 360, 390, 768, and 1440px.
- **Zero horizontal overflow** at every width.
- **Zero console errors and zero page errors.**
- **Zero same-origin request failures.** External analytics/Google requests were blocked in the test environment and are not site failures.
- **All 32 concept demos:** HTTP 200, `noindex,nofollow`, a demo-only form, no transmission/storage code, no external resources, no broken images, no overflow.
- **43 filter checks:** all 32 designs for “all,” one card per trade, empty state for an invalid trade, and style counts matching the catalog.
- **Search checks:** `plumbing` → 1, `commercial cleaning` → 1, `editorial` → 4, nonsense → empty state.
- **Contact flow:** `/contact?design=oakline` shows Oakline, opens the message tab, and keeps the design card above the form.
- **Detail tabs:** ArrowRight moved selection from the desktop tab to the mobile tab.
- **Mobile action bar:** hidden with the menu open and while consent is pending; detail links preserve the slug.
- **Gallery mobile first card:** at 360px the card starts at y=677 with 104px visible above the fixed bar at y=781; at 390px it starts at y=655 with 127px visible. The compact mobile hero keeps the search and both filter menus above the fold.
- **Spanish locale:** 32 cards, 43 filter links, Spanish UI, no overflow; search preserved `lang="es-419"`.
- **Image checks:** all package images render with `width`, `height`, and `alt`; no broken images. The only rendered images without width/height attributes are two pre-existing homepage case-study cards using `next/image` fill.
- **Reduced motion:** the scripted run used `prefers-reduced-motion: reduce`; agency transitions and transforms are disabled.

### 7.3 Evidence

- QA script: `.tmp-final-32-qa.mjs`
- Raw measurements: `.tmp-final-32-qa.json`
- Full-page screenshots: `screenshots/agency-final-32/{home,gallery,detail,contact,concept}-{360,390,768,1440}.png`
- Viewport crops: `gallery-top.png`, `gallery-top-768.png`, `home-top.png`, `detail-top.png`, `concept-768-top.png`

### 7.4 Verification boundaries

- No live email was sent. Delivery still depends on the configured mail environment.
- No physical iOS or Android device was tested.
- No Lighthouse run was performed; no performance score is claimed.
- Invalid `?design=<slug>` values fall back to the normal contact form instead of a 404.
- The static demos were browser-checked after path repair. The package's own export note says the original previews were produced with WeasyPrint and were not browser-tested at package time.
- No deployment was performed.

---

## 8. Unconfirmed terms and claims

The package `offer-config.json` remains intentionally unapproved:

```json
{
  "monthly": { "approved": false, "price": null, "setupFee": null, "minimumTermMonths": null },
  "upfront": { "approved": false, "startingPrice": null },
  "guarantee": null,
  "deliveryTimeline": null,
  "callbackWindow": null
}
```

No package price, discount, minimum term, ownership transfer, cancellation fee, edit allowance, hosting term, guarantee, or timeline was imported into public copy.

The site's own confirmed offer remains in `src/config/website-offer.ts`. Unconfirmed site fields remain `null`:

- launch timeline;
- buyout price;
- cancellation fee;
- ownership terms on monthly plans;
- unlimited edits;
- guaranteed rankings;
- guaranteed leads;
- warranty months.

Public fallbacks remain “confirmed in writing,” “ask before starting,” and explicit “No” answers for ranking, lead, and revenue guarantees.

No fabricated or unverifiable material was added:

- no testimonials, review counts, ratings, or badges;
- no numerical result claims or before/after metrics;
- no certifications or awards;
- no claim that the 32 concept brands are clients;
- no “no templates” absolute; the copy describes starting directions plus a custom path;
- no package term presented as approved.

Legacy claim issues outside the redesigned surfaces are documented in `docs/agency-website-redesign-report.md`.

---

## 9. Needed real customer material

Before a concept is used for a real business, the following must be supplied and approved:

1. **Business identity** — legal business name, approved logo, brand colors, and trademark/name clearance for any concept identity that will be adopted.
2. **Approved photography** — real project photos with usage permission, or licensed stock imagery. The package photography is illustrative only.
3. **Verified business details** — service area, phone number, email, hours, license/insurance details where relevant, and emergency-service policy.
4. **Approved offer and legal terms** — monthly price, setup fee, minimum term, page count, update allowance, hosting, ownership, cancellation, buyout, warranty, and launch timeline.
5. **Real proof** — client-approved testimonials, reviews, ratings, case studies, and result figures with written substantiation. None may be inferred from the concepts.
6. **Policies** — privacy policy, terms, accessibility statement, and any trade-specific disclaimers reviewed for the client's jurisdiction.
7. **Localization review** — native review of the Spanish UI copy and a decision on translating the 32 English concept demos.
8. **Email delivery test** — a live contact submission against the production mail configuration.
9. **Device and performance QA** — physical iOS/Android testing and a Lighthouse or equivalent performance run before launch.

---

## 10. File map

Primary integration files:

- `public/assets/kinexis/` — 369 package files.
- `src/content/kinexis-designs.json` — generated catalog with rewritten paths and dimensions.
- `src/content/designs.ts` — typed catalog, filters, localized labels, and page copy.
- `src/app/[locale]/website-designs/page.tsx` — gallery.
- `src/app/[locale]/website-designs/[slug]/page.tsx` — detail pages.
- `src/app/[locale]/page.tsx` — homepage featured designs and illustrations.
- `src/app/[locale]/contact/page.tsx` — selected-design contact state.
- `src/app/api/contact/route.ts` — slug validation and email row.
- `src/components/designs/` — cards, images, preview tabs, mobile bar, analytics delegation.
- `src/components/page/PageHero.tsx` — stacked detail heading support.
- `src/components/Footer.tsx` — collection links.
- `src/styles/routes/agency.css` — gallery, detail, homepage, and mobile-bar styles.
- `messages/en.json`, `messages/es-419.json`, `messages/es-ES.json` — localized UI copy.
- `src/app/sitemap.ts`, `src/lib/sitemap-last-modified.ts` — design URLs in the sitemap.
- `docs/agency-website-redesign-report.md` — broader redesign report.

Supporting evidence:

- `.tmp-final-32-qa.mjs`
- `.tmp-final-32-qa.json`
- `screenshots/agency-final-32/`

**Deployment status:** not deployed.
