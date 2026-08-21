# Performance Optimization — Agent Handoff

**Prior chat:** [PSI 95+ LCP work](b532d619-5c11-4ac6-9bca-fbd867901c90)

**Goal (current):** **95+ PSI mobile and desktop** on every template (warm median of 3). Stretch 100 is not the gate.
**Site:** `https://www.kinexisdigital.com` (OpenNext → Cloudflare Workers). Canonical URLs are **unprefixed** (`/`, not `/en`). Apex 301s to www and inflates LCP ~780ms — always audit `www`.

**Live production version (last measured):** `f15a3ed4-34fa-4412-998c-b0ad3801cbd9`
That deploy has **`experimental.inlineCss: false`**. CSS ships as two render-blocking files (~1.3 KB + ~229 KB uncompressed globals/Tailwind).

**Working tree:** all of this session's perf work is **uncommitted** (HEAD `98842db7` is unrelated). Nothing has been committed. `next.config.mjs` currently has `inlineCss: true` again — **that flip was not deployed or measured**. Do not treat the working-tree config as live.

---

## TL;DR — start here

1. **Re-measure live first** (Worker warm, median of 3) before changing `inlineCss` again. Homepage **98** and industry **96** mobile looked locked on live. Contact **93** / services **88** in the last batch may be PSI flakes — an earlier inlineCss-off batch had contact **97** / services **96**.
2. **The remaining constraint is CSS delivery, not JS.** TBT/CLS are fine. Shared mobile FCP is ~1.95s on every template (CSS parse floor). Homepage/industry LCP was element **render delay**, then HTML size when CSS was inlined (~935 KB uncompressed document).
3. **Do not toggle `inlineCss` as a binary “fix”.** It trades image-LCP pages against text-LCP pages. The real lock for all 95+ is a **small critical CSS inline + async rest**, or shrinking/splitting `globals.css`.
4. **Do not repeat the failed experiments** listed below (industry still below the fold, hiding industry visual, `react-dom` `preload()`, `headers()` in the locale layout).
5. **Do not audit `/services/seo`.** It **308s to `/services#seo`**. Use `/services` for the hub.

Everything below “Historical (Phases 1–2)” is older context. Heroes are now `HomeHero` / `IndustryHero` / `PageHero`, not `StaticHeroShell`. Old URLs used `/en/...`. Old scores are stale.

---

## Last measured PSI (warm medians of 3)

### Confirm batch on live `f15a3ed4` (`inlineCss` OFF + film hide + paint cuts)

| Template | Mobile | Desktop |
|---|---|---|
| Homepage | **98** (97/98/98), LCP ~2.1s | 99 |
| Industry `/industries/ecommerce` | **96** (96/96/96), LCP ~2.4s | 99 |
| Contact | **93** (93/93/75), LCP ~2.85s | 100 |
| Services hub | **88** (88/88/97), LCP ~3.45s | 98 |

Blog was **96 / 100** on an earlier same-architecture batch, not re-run in this confirm.

### Earlier same-architecture batch (also `inlineCss` OFF + film hide; industry still eager)

| Template | Mobile | Desktop |
|---|---|---|
| Homepage | **96** (96/97/96), LCP ~2.4s | 100 |
| Services hub | **96** (89/98/96) | 100 |
| Contact | **97** | 100 |
| Industry ecommerce | **94** (94/94/94), LCP ~2.85s | 100 |
| Blog post | **96** | 100 |

Desktop is comfortably 95+. Variance is real (±300–500ms LCP, occasional 75/66 flakes). Treat medians, not single runs.

### User-reported starting point (before this session’s CSS-split / film-hide work)

| Template | Mobile | Desktop |
|---|---|---|
| Homepage | 91 (LCP ~3.0s) | 98 |
| Services hub | 95 | 97 |
| Contact | 97 | 100 |
| Industry ecommerce | 89 (LCP ~3.4s) | 99 |
| Blog post | 96 | 100 |

---

## The `inlineCss` tradeoff (do not ignore)

Measured, not guessed:

| Config | Homepage mobile | Industry mobile | Contact mobile | Services mobile |
|---|---|---|---|---|
| `inlineCss: true` (935 KB HTML, LCP preload after the `<style>` blob) | 91–94 | 89–93 | **97** | **95** |
| `inlineCss: false` (HTML ~243 KB; CSS files; LCP image can start in parallel) | **98** | **96** | 93 or 97 | 88 or 96 |

- **Inlining** helps **text-LCP** pages (contact, services): no stylesheet RTT, FCP ~2.0s.
- **Splitting** helps **image-LCP** pages (homepage poster / industry still): image download is not blocked behind parsing 935 KB of HTML. Shared FCP is then the large CSS parse (~229 KB).
- **Never measured together:** `inlineCss: true` **plus** mobile `.hero-film-media { display: none }`. Hypothesis: homepage LCP becomes the H1, so inlining might restore contact/services without tanking homepage. Industry still has an image LCP and may fall back to ~94. Working tree currently has this combo; **it is not live**.

**Correct long-term fix (if toggling is not enough):** tiny critical CSS in `<head>` (header, hero type, buttons) + load the rest with `media="print" onload="this.media='all'"` (or split blog/contact/resources/industry chunks out of `globals.css`). Next does not support per-route `inlineCss`.

---

## Ordered next actions

1. Warm + full 5-template median on **current live** (do not deploy first):

```bash
curl -s -o NUL https://www.kinexisdigital.com/
curl -s -o NUL https://www.kinexisdigital.com/services
curl -s -o NUL https://www.kinexisdigital.com/contact
curl -s -o NUL https://www.kinexisdigital.com/industries/ecommerce
curl -s -o NUL https://www.kinexisdigital.com/blog/seo-pricing-guide

node scripts/psi-check.mjs 3 https://www.kinexisdigital.com/ https://www.kinexisdigital.com/services https://www.kinexisdigital.com/contact https://www.kinexisdigital.com/industries/ecommerce https://www.kinexisdigital.com/blog/seo-pricing-guide
```

2. If contact + services medians are **≥95** with `inlineCss` still off: **stop. Goal met.** Keep the working-tree `inlineCss: true` from going live, or revert that config line to match live.
3. If they are still below 95: either
   - **A.** Deploy the untested combo (`inlineCss: true` + film hide) and measure all 5. Expect industry to be the risk.
   - **B (better).** Leave CSS split, add a small critical-CSS path / cut `globals.css`. That is the lever that can satisfy both image-LCP and text-LCP pages.
4. Gate visual/paint cuts at `@media (max-width: 1023px)` so desktop stays put. Deploys need manual approval: `npm run deploy`.

---

## Do not repeat

- **Industry still below the fold** (`min-height: 100svh` on copy-col) + `priority={false}`: the lazy image at the fold became LCP → industry **86**, desktop LCP worse. Reverted. Keep the still visible and `priority`.
- **`display: none` on `.industry-hero__visual` on mobile:** hid content, did not lock 95+. Reverted.
- **`react-dom` `preload()`** in `src/app/[locale]/page.tsx` and industry `page.tsx`: **does not emit a `<head>` link in production HTML**. Keep real `<link rel="preload">` in `HomeHero` / `IndustryHero` / `LcpImage`.
- **`headers()` in the locale layout:** kills SSG. Do not.
- **Lazy-load above-the-fold industry stills.**
- **Audit `/services/seo`.** 308 → `/services#seo`.
- **Measure a cold Worker.** After deploy, `curl` each URL once, then medians.

---

## What shipped and should stay

Uncommitted in the working tree; live `f15a3ed4` already includes most of this (except the latest `inlineCss: true` revert).

| Area | What |
|---|---|
| Hero video | Poster-only on mobile (`shouldLoadVideo` + CSS `.hero-film-media { display: none }` at ≤1023px). Desktop loads **2.2 MB** MP4 after idle (`scheduleIdleOrScroll`). Was 11.6 MB + `preload=auto`. Poster: `/assets/video/hero-open-v2-poster-sm.webp`. |
| Framer | Off the critical path. CSS `Reveal` / `Card`. Framer **not** in `[locale]/layout.tsx`. `HomeClients` CSS fades. Homepage First Load JS **172 → 145 KB**. |
| WebGL | Gesture-gated (`SignalPlaneMount`). Industry / case study use static CSS mesh only. |
| Contact booking | Click-to-load in `ContactIntake` (`hydrateBook` / `hydrateMessage`). Killed TBT ~650ms + CLS from skeleton swap. Review UX if scores are already 95+. |
| Mobile paint budget | End of `src/app/globals.css` `@media (max-width: 1023px)` so it wins source order: **no `backdrop-filter`** on header frost / chrome / cookie / outline btn; solid `--chrome-fallback`; simpler `.hero-film-scrim`; hide `.hero-atmosphere__fade`, mesh blobs, non-film `.hero-atmosphere`. |
| Industry CSS | `IndustryHero` no longer imports `page-stages.css` (~3500 lines). Split-grid rules live in `globals.css`. `PageBreadcrumb` extracted so industry does not pull `PageHero` → page-stages. `PageHero` / `CaseStudyHero` / `ServiceProgramChapter` still import page-stages. |
| LCP images | `decoding="sync"` on `HeroFilm` poster and `LcpImage` priority path. Mobile-first `<picture>` (`src={mobileSrc}`, desktop via `<source min-width: 768px>`). Explicit `<link rel="preload">` in heroes. Bypass `/_next/image` on priority stills (Worker Sharp hop delayed LCP). |
| Other | `content-visibility: auto` on `.chapter:not(.page-hero):not(.case-hero)`; `contain: paint` on `.hero-atmosphere`; `BrandLogo` `fetchPriority="low"`; `HomeServices` images `loading="lazy"`. Cookie banner blur gated to `min-width: 1024px`. |

**New files:** `src/lib/lcp-preload.ts`, `src/lib/schedule-idle-or-scroll.ts`, `src/components/page/PageBreadcrumb.tsx`.

---

## Stack / architecture (current)

- Next.js 15.5.x App Router + next-intl, `@opennextjs/cloudflare`.
- Heroes: homepage → `HomeHero` + `HeroFilm`; industry → `IndustryHero` + `LcpImage`; other pages → `PageHero` / `CaseStudyHero`.
- Fonts: local `KinexisDisplay` / `KinexisText` in `[locale]/layout.tsx`, `display: "optional"`. Display font preloaded; text font not.
- CWV: LCP ≤ 2500ms, INP ≤ 200ms, CLS ≤ 0.1. PSI 95 ≈ LCP needs to sit ~2.5s with headroom.
- `.next/` build artifacts may appear huge in git — ignore; only `src/`, configs, `scripts/` matter for this work.
- `npm run deploy` = opennext build + Cloudflare deploy (needs approval here).

### Measurement

```bash
# LCP element + TTFB / load delay / load duration / render delay
node scripts/psi-lcp.mjs https://www.kinexisdigital.com/industries/ecommerce mobile
node scripts/psi-diagnose.mjs https://www.kinexisdigital.com/contact mobile
```

Needs `GOOGLE_PSI_API_KEY` in `.env.local` (scripts load it).

---

# Historical (Phases 1–2 and early Phase 3)

> Scores, live version IDs, `/en/...` URLs, and `StaticHeroShell` references below are from earlier sessions. Use them as background on JS/TBT work only. Do not execute the old Phase 3 plan as written — paint cuts, film hide, and CSS-split experiments already landed.

## Phase 1 — CSS reveal + service pages as server components (deployed, VALIDATED)

**Live version:** `6fa24878-6fb0-48a8-9343-35bbb3fe81a8`

The single biggest structural lever. Replaced framer-motion `whileInView` reveals on
static content with a pure-CSS, zero-JS reveal, and turned the service template from one
big `"use client"` boundary into server-rendered HTML with small interactive islands.

| File | Change |
|---|---|
| `src/app/globals.css` | Added `.reveal` / `.reveal-stagger` — CSS scroll-timeline reveal. Content is always visible in SSR (no `opacity:0` trap); animation is a **desktop-only** (`min-width:1024px`) enhancement gated on `prefers-reduced-motion: no-preference` + `@supports (animation-timeline: view())`. Mobile is fully static → no JS on the critical path. Only opacity/transform animate → CLS 0. |
| `src/components/ui/Reveal.tsx` | **New** server component (`as`, `stagger` props). No `"use client"`, no framer. |
| `ResultsSection`, `ProofSection`, `WhyKinexisSection`, `ServiceSection`, `ServicePageVisualization`, `ServicePricingTeaser` | Dropped `"use client"` + framer-motion; now static server components using `<Reveal>`. `Card animated` islands inside `ServiceSection` replaced with `cardClasses()` divs (CSS hover). |
| `src/components/services/service-hero-visualizations.tsx` | Removed `"use client"` so the viz map is server-importable (dynamic client leaves unchanged). |
| `src/components/services/ServicePage.tsx` | **Removed `"use client"`** → server component. Direct-imports the now-server sections; keeps `dynamic()` only for real client leaves (AnswerBlock, ComparisonTable, ServiceCTA, ServiceFAQSection, RelatedLinks, DeviceMockups). |
| `scripts/psi-lcp.mjs` | **New** — prints the LCP element + LCP timing breakdown (TTFB / load delay / load duration / render delay) for one URL. `node scripts/psi-lcp.mjs <url> [mobile|desktop]`. |

**Measured (median of 3, post-deploy):**
| Page (mobile) | Before | After | TBT before → after |
|---|---|---|---|
| Service SEO | 92 / LCP 2.7s | **96** (95/96/96) / LCP ~2.4–2.7s | 240ms → **53ms** |
| Service web-design | — | **98** (98/98/98) / LCP 2.4s | — → **0ms** |

Desktop service SEO ~96–100, web-design 100. CLS 0.000 everywhere. **Approach proven: TBT crushed, no CLS/SEO regression.**

### Remaining ceiling on service = LCP render delay (not JS)
`psi-lcp.mjs` on `/services/seo` mobile: LCP element is **text**, breakdown = TTFB **13ms** + element **render delay ~1931ms**, TBT only 59ms, no image load phase. So the last ~200–300ms to 100 is **above-the-fold paint cost / Speed Index** (hero decorative layers), shared across every template's hero shell — a finer lever than the JS work. web-design clears 2.5s; SEO sits right at the edge (~96–97).

## Phase 2 — roll the CSS-reveal recipe to remaining templates (DEPLOYED + VALIDATED)

**Live version:** `4af70b4f-232d-403c-b22e-15cbce2c267c`

Mechanical rollout of the Phase-1 pattern (`<Reveal>` / `.reveal-stagger`, drop framer `whileInView`, keep content visible in SSR) to the templates that still shipped framer scroll-reveals. `npm run build` green (346 pages, types valid).

### Measured result (post-deploy)
**Warm median PSI** (3 runs each, Worker warmed, version `4af70b4f`):

| Page (mobile) | Score (runs) | LCP | TBT | CLS |
|---|---|---|---|---|
| Homepage | **88** (84/88/91) | 3331ms | 27ms | 0.000 |
| Industry detail (saas) | **83** (64/83/84) | 4099ms | 12ms | 0.000 |
| Blog posts | **82** (82/82/76) | 4156ms | 153ms | 0.000 |
| Pricing SEO | **67** (67/67/64) | 4081ms | 32ms | 0.400* |
| Service SEO | **79** (79/34/79) | 4531ms | 181ms | 0.000 |

Desktop medians: homepage 95, industry 79, blog 77, pricing 80, service 77 — with intermittent CLS 0.400 flakes on industry/pricing/service (same PSI noise pattern; warm single-runs on service/pricing were 0.000).

\*Pricing mobile CLS 0.400 on all 3 runs — worth a targeted `psi-diagnose.mjs` pass before Phase 3; may be a real layout issue on that template, not just variance.

**TBT is crushed and CLS is mostly clean — the JS side is done.** Warm single-run diagnostics (`scripts/psi-diagnose.mjs`, new):
- `services/seo` mobile: **TBT 21ms**, CLS **0.000**, TTFB 17ms (LCP 3256ms — see below)
- `pricing/seo` desktop: **TBT 61ms**, CLS **0.000**, TTFB 9ms (LCP 850ms)
- Batch medians (mobile TBT): homepage 26ms, industries 15ms, blog 86ms, pricing 12ms, services 21ms — all comfortably under budget.

> ⚠️ **The first post-deploy batch showed CLS 0.400 on service-mobile and pricing-desktop and scores as low as 58/77. That was a flake + cold-Worker artifact, NOT a regression.** Re-measured warm, both pages report CLS 0.000 with **zero** `layout-shift-elements`, TTFB <20ms, and healthy scores. Lesson (already in this doc): after a deploy the Worker is cold — TTFB spikes and inflates LCP/score. **Warm the Worker (hit each URL once) before trusting numbers, and always take medians.**

### Files converted — see table below (SectionHeader is the universal lever)

**Biggest lever: `SectionHeader`.** Converted from `"use client"` + framer to a server component using `<Reveal stagger>`. It's rendered on essentially every section of every template, so this removes framer-motion from the section-header reveal path site-wide in one change. (The `blurFadeUp`/`popUp` per-child variants collapse to the shared fade-up cascade — acceptable, desktop-only enhancement.) `viewportMargin` prop retained on the type for call-site compatibility (now a no-op).

| File | Change |
|---|---|
| `src/components/ui/SectionHeader.tsx` | **Server component** now; `<Reveal stagger>` instead of framer. Usable in both server and client trees (no `"use client"`). |
| `src/components/sections/WhyKinexis.tsx` | Server component; items wrapped in `<Reveal stagger>`. |
| `src/components/sections/TrustSignals.tsx` | Server component; grid wrapped in `<Reveal>`. `AnimatedCounter` stays a client island. |
| `src/components/sections/TrustedProcess.tsx` | Server component; timeline steps in `<Reveal stagger>`. |
| `src/components/sections/FeaturedResults.tsx` | Server component; dropped `useMemo`, `useTranslations` works in RSC. `OutcomeComparison` (data-viz) now a direct import but still a client leaf/own chunk. Articles in `<Reveal stagger>`. |
| `src/components/sections/FAQSection.tsx` | Server component; native `<details>` disclosure, items in `<Reveal stagger>`. |
| `src/components/sections/seo/DeliverablesSection.tsx` | Server component; sticky header + items in `<Reveal>`/`<Reveal stagger>`. |
| `src/components/sections/seo/comparisons/{ContrastComparison,ProgressionComparison,ImpactComparison}.tsx` | Server components; framer reveals → `<Reveal>` / `<Reveal stagger>`. (These render on service + industry comparison blocks.) |
| `src/components/blog/BlogPostFeed.tsx` | Server component; each card is a self-timelined `<Reveal as="article">`. |
| `src/components/pages/pricing/{PricingTiersSection,PricingTrustStrip,PricingIncludedSection}.tsx` | Server components; framer reveals → `<Reveal>`. |

### Deliberately left as framer client islands (not simple reveals)
- **`Card.tsx` / `CardFamily.tsx`** — the `animated` path also carries a `whileTap` **press** interaction (tactile scale). Widely-used primitive; converting deserves its own validated pass (replace `whileTap` with CSS `active:` scale). Framer is globally deferred, so this isn't on the critical path.
- **`Philosophy.tsx`** — genuinely interactive (tooltip `useState`, click handlers) + animated pipeline width bars.
- **DataViz** (`OutcomeComparison`, `ResultsTrajectoryChart`, `Testimonials`, page-client width/`pathLength` bar animations) — these are real data-viz animations, not entrance reveals. Leave on framer.
- Other page clients still using `whileInView` on genuinely-interactive content: `AboutPageClient`, `PricingPageClient`/`PricingHubPageClient` (carousel/width bars), `CaseStudyDetailPageClient`, `ServicesHubClient`, service `*PageClient` bars. Evaluate case-by-case in a follow-up.

### Phase 2 leftover backlog (optional, low priority — not blocking 100)
These still import framer but are **not on the critical path** (framer is globally deferred to idle/scroll). Convert opportunistically, each behind its own build+measure:
- `Card.tsx` / `CardFamily.tsx` — replace `whileTap` press with CSS `active:scale-[0.982]`, then route `animated` through `<Reveal>`. Highest reach of the leftovers.
- `AboutPageClient`, `CaseStudyDetailPageClient`, `ServicesHubClient`, `PricingPageClient`/`PricingHubPageClient`, service `*PageClient` — mix of simple reveals (convertible) and genuine width/`pathLength` data-viz (leave).
- `Philosophy.tsx` — leave (interactive tooltips + pipeline bars).

---

# ⭐ Phase 3 — historical plan (paint cuts already shipped)

**Superseded.** Mobile paint budget, film hide, mesh hide, and CSS-split experiments already landed — see the current section at the top of this file. Do not re-run this plan as a todo list.

**This was the remaining lever after Phase 2.** TBT and CLS were no longer the constraint. The binding constraint site-wide is now **mobile LCP / FCP / Speed Index**, and its root cause is the hero's stacked decorative paint under PSI's mobile throttling (4× CPU, slow 4G).

### The diagnosis (measured, not guessed)
- `psi-lcp.mjs` on `/services/seo` mobile: LCP element is **text**, breakdown ≈ TTFB 13ms + **render delay ~1900ms**, no image load, TBT trivial. LCP is gated purely on *when the above-the-fold paint settles*.
- Warm mobile FCP is **~2.0s on every template** (homepage 1981ms, services 2131ms, industries 1981ms) with TTFB <20ms. Identical FCP across unrelated pages ⇒ a **shared** first-paint cost, i.e. the hero shell, not any one page's content.
- Fonts are **not** the cause: Ubuntu via `next/font/google` with `display: "optional"` + `preload` (`src/app/[locale]/layout.tsx`). CSS is inlined (`inlineCss`), so no render-blocking stylesheet.
- ⇒ The ~2s is main-thread **paint/raster of the hero decorative layers** under throttling.

### The shared culprit: three stacked full-bleed layers behind every hero
Every hero (`StaticHeroShell.tsx` + homepage `HeroShell.tsx`) renders three absolutely-positioned decorative layers before the LCP text, defined in `src/components/ui/HeroShellDecorations.tsx` + `src/styles/components/hero-decorative.css`:
1. **`HeroGradientBg`** → `.hero-gradient-animated__orb`: **three** stacked `radial-gradient` ellipses. (Animation already correctly gated to desktop.)
2. **`HeroThemeBackdrop`** → `.hero-backdrop__pattern--{theme}`: grid/dot/mesh `background-image` (some with SVG data-URIs) plus a **`mask-image: radial-gradient(...)`**. Masks + layered gradients are expensive to raster on mobile GPUs.
3. **`HeroBgGlow`**: a `blur-[140px]` element **plus** a full-bleed `bg-gradient-to-b`. A 140px blur over a large box is the single most expensive raster here.

All three paint full-viewport, above the fold, on mobile — before the largest text can be considered "painted/stable". That's the ~1.9s render delay.

### Phase 3 plan (mobile-gated, desktop untouched)
Do these **behind `@media (max-width: 1023px)`** so the desktop design is byte-for-byte unchanged (same pattern already proven with the orb animation gate). Measure each with `psi-lcp.mjs` + `psi-diagnose.mjs` before/after on `/services/seo` (worst text-LCP) and one industry-detail page.

1. **Kill/shrink the 140px blur on mobile.** Replace `HeroBgGlow`'s `blur-[140px]` with a pre-blurred static radial-gradient (no `filter: blur`) under `max-width:1023px`, or drop the blurred orb entirely on mobile and keep only the cheap `bg-gradient-to-b`. Expected the biggest single SI/FCP win. 
2. **Drop the mask on mobile.** `mask-image` on `.hero-backdrop__pattern--*` forces an extra compositing pass. On mobile, either remove the pattern layer or render a flat low-opacity gradient instead of the masked grid/SVG.
3. **Collapse `HeroGradientBg`'s 3 radial-gradients to 1** on mobile (or reuse the same flat gradient as #1). Three large radials each cost raster time.
4. **Add `content-visibility`/`contain` where safe** is already done for `.page-section`; consider `contain: paint` on the hero decorative wrapper so their raster can't force extra work outside the hero box.

**Guardrails (unchanged):** animate opacity/transform only; keep all hero *text* in SSR (already true — that's why Phase 1 worked); pair any `content-visibility` with `contain-intrinsic-size: auto`; never ship `opacity:0` above the fold. Desktop visuals must not change — gate everything at `max-width:1023px`.

### Acceptance target for "consistently 100"
Be honest with the stakeholder about what's achievable (this is real, not hedging):
- **Desktop: already at/near 100** (91–98 median; mostly LCP<1.1s, TBT<90ms). After Phase 3 desktop should sit at a comfortable 98–100.
- **Mobile: target median 100 with headroom.** PSI mobile has ±300–500ms LCP variance plus occasional Google-side 500/502 flakes and cold-Worker spikes. The realistic, defensible goal is **100 at the median of ≥3 warm runs, with enough LCP headroom (LCP ≤ ~2.2s) that normal variance rarely dips a run below 100.** "Literally 100 on every single run forever" is not something any real site can guarantee, and the first-batch CLS-0.400 flake in this session is a concrete example of why medians — not single runs — are the metric.

### Measurement protocol (do this every Phase 3 cycle)
```bash
npm run deploy                      # manual approval; Worker is COLD after this
# warm it so TTFB isn't measured cold:
curl -s -o NUL -w "%{http_code}\n" https://kinexisdigital.com/en/services/seo   # x each URL
node scripts/psi-lcp.mjs   https://kinexisdigital.com/en/services/seo mobile     # LCP element + render-delay breakdown
node scripts/psi-diagnose.mjs https://kinexisdigital.com/en/services/seo mobile  # CLS culprits + LCP el + TTFB (new this session)
node scripts/psi-check.mjs 3 <the 5 template URLs>                               # medians — the authoritative call
```
Representative URLs used this session: `/en`, `/en/industries/technology/saas`, `/en/blog/posts`, `/en/pricing/seo`, `/en/services/seo`.

## Earlier session changes (all deployed)

### Global wins
| File | Change | Why |
|---|---|---|
| `next.config.mjs` | `experimental.inlineCss: true` | Removes render-blocking `<link rel=stylesheet>`; cut mobile FCP. Confirmed: no render-blocking resources in LH reports now. |
| `src/styles/components/hero-decorative.css` | Gated `.hero-gradient-animated__orb` `heroGradientDrift` animation to `min-width:1024px` + `prefers-reduced-motion: no-preference` | **Big Speed Index win.** A continuous above-the-fold animation ran on mobile and kept the viewport from "settling", inflating SI site-wide. |
| `src/app/globals.css` | Added `content-visibility: auto; contain-intrinsic-size: auto 600px;` to `.page-section` | Lets the browser skip layout/paint for off-screen sections so the hero paints first. `contain-intrinsic-size: auto` remembers real heights → **CLS stayed 0.000** in audits. |
| `src/components/providers/FramerMotionShell.tsx` | Rewrote to defer the Framer Motion provider (~27–40 KiB chunk) until idle/scroll on **all** pages (was homepage-only) | SSR hero paints without waiting on FM. Uses new `src/lib/schedule-idle-or-scroll.ts`. |
| `src/lib/schedule-idle-or-scroll.ts` | **New** shared util (requestIdleCallback + scroll fallback) | Extracted from `HomeDeferredSections`; both now share it. |

### Per-template / component wins
| File | Change |
|---|---|
| `src/components/pages/ContactForm.tsx` (**new**) | Client island — only the interactive form hydrates. |
| `src/components/pages/ContactPageClient.tsx` | Now a **server component**; static sidebar/steps render as HTML. Desktop 70→100, mobile 3.3s→~1.8–2.2s. |
| `src/components/pages/SolutionPageClient.tsx` | Was `"use client"` but 100% static → **server component**. Desktop 58→100. |
| `src/components/pages/IndustryDetailClient.tsx` | Removed unnecessary `"use client"` (no hooks/motion). |
| `src/app/[locale]/digital-marketing-agency/page.tsx` + `AgencyHubPageClient.tsx` | Moved hero out of the dynamically-imported client component into `StaticHeroShell` (SSR). LCP text no longer waits on JS. |
| `src/components/sections/seo/AnswerBlock.tsx` | **Removed hydration-gated `opacity:0` reveal.** It sat right under the hero on industry-detail pages, became the LCP element, and rendered invisible until FM loaded (~3.3s). Now static/visible in SSR → industry-detail mobile LCP dropped ~3.4s → ~2.4s. |
| `src/components/shared/services/Section.tsx` | Removed `"use client"` (pure presentational). |
| `src/components/shared/services/ProcessSection.tsx`, `ServicePricingTeaser.tsx` | Removed `"use client"` (no client features). |
| `src/components/shared/services/ServiceOverview.tsx`, `DeliverablesSection.tsx` | Rewrote as **static** (dropped framer-motion scroll reveals) — content-first, visible in SSR. |
| `src/components/services/ServicePage.tsx` | `ServiceOverview`, `WhyKinexisSection`, `DeliverablesSection`, `ServiceSection` now `dynamic()`-imported to shrink the initial client chunk. |

### New tooling (scripts/)
- `scripts/lh-summarize.mjs` — prints score/LCP/FCP/TBT/CLS/SI + top opportunities from every saved LH report in `docs/seo-remediation/phase-10-lighthouse/`.
- `scripts/lh-lcp-detail.mjs [templateFilter...]` — LCP element, render-blocking, key requests per report.
- `scripts/psi-check.mjs <runs> <url...>` — runs PSI N times per URL, reports **median** mobile+desktop. **Use this to beat variance.** Needs `GOOGLE_PSI_API_KEY` in `.env.local` (already loaded).

---

## Latest measured results (medians where available)

**Median PSI check** (post AnswerBlock fix, 2 runs each URL — most reliable recent snapshot):

| Template | Mobile score / LCP | Desktop | Notes |
|---|---|---|---|
| Solution | **99 / 1.8s** pass | pass | |
| Contact | **99 / 2.3s** pass | pass | |
| Blog post | **97 / 2.1s** pass | pass | |
| Industry detail | **96 / 2.4s** pass | 54–99 (variance) | AnswerBlock fix landed; desktop TBT spike (1571ms) was PSI variance |
| Homepage | ~95–98 pass | 91–93 pass | |
| **Service (SEO)** | **92 / ~2.7s** | 85–97 (variance) | **Only consistent mobile holdout** — dynamic-import batch confirmed insufficient |
| Service heavy (PPC) | 97 pass | 97 pass | |
| Agency hub | 97–99 pass | 98–100 pass | |
| Pricing | 94–96 pass | 100 pass | |

**Earlier audit runs (context):**
- Audit 1 (post FM-defer, `4689301c`): 6/7 mobile CWV pass; industry_detail ~3.4s was sole real failure.
- Audit 2 (post content-visibility, `136cc621`): noisier; multiple PSI 500/502 flakes; 4 mobile failures mostly variance.

**CLS is 0.000 everywhere** — the content-visibility change did not regress layout stability.

---

## Remaining work to reach 100

### 1. Service pages — mobile ~92 (highest priority)
Mobile LCP ~2.7s, TBT ~240ms. Median PSI confirmed the dynamic-import batch did **not** close the gap. The `ServicePage` client tree is still the heaviest. Options (in order of safety):
- Convert remaining always-visible service sections off framer-motion to static/CSS: `WhyKinexisSection.tsx` still uses `useMotionVariants` + `whileInView`. `ServicePageVisualization.tsx` wraps section graphics with `initial="hidden"` (opacity:0 in SSR). `ProofSection`, `ResultsSection`, `ServiceSection` are dynamic but still client+motion.
- **Do NOT** hide below-fold service content behind a JS-gated placeholder — service pages need full section HTML in SSR for SEO. (An attempt at `ServicePageDeferred` was reverted for exactly this reason.)

### 2. Migrate scroll-reveals from framer-motion → CSS (biggest structural lever)
Many section components animate via `m` from `@/lib/framer` + `useMotionVariants()` (`fadeUp`/`stagger`) with `whileInView`. This is the bulk of remaining client JS/TBT. Replace with CSS `@keyframes` + `animation-timeline: view()` (or an `IntersectionObserver` one-liner that toggles a class). Pattern already proven safe on `AnswerBlock`, `ServiceOverview`, `DeliverablesSection`. Candidates: everything in `src/components/shared/services/` and `src/components/sections/` that imports `@/lib/framer`.
- **Guardrail:** keep the "hidden" state out of SSR opacity:0 unless it's below the fold, or you'll recreate the AnswerBlock LCP problem.
- **Guardrail:** respect `prefers-reduced-motion`.

### 3. Investigate desktop TBT spikes
Some desktop runs show TBT 300–1571ms on service/industry pages (very run-dependent). Likely hero-viz SVG components or a heavy synchronous chunk. Use `scripts/lh-lcp-detail.mjs` + `mainthread-work-breakdown` / `bootup-time` audits to localize.

### 4. Shared JS budget
First Load JS shared ≈ 106 KB; largest chunks `4bd1b696` (~54KB) and `1255` (~47KB). Worth a `ANALYZE=true npm run build` (bundle analyzer is wired in `next.config.mjs`) to see what's in the shared graph.

---

## How to work this loop

```bash
# 1. make change  2. verify build (also type-checks)
npm run build

# 3. lint the files you touched (use ReadLints tool)

# 4. deploy (requires manual approval in this env)
npm run deploy

# 5. measure medians (beats PSI variance) — 3 runs each
node scripts/psi-check.mjs 3 <urls...>

# Full formal audit (mobile+desktop, all 9 templates, saves JSON) — slow (~8-13 min):
npm run audit:phase10        # writes docs/seo-remediation/phase-10-*.{csv,json} + lighthouse/*.json
node scripts/lh-summarize.mjs # then summarize the saved reports
```

## Guardrails / "don't break the site"
- CLS is currently perfect (0.000). Any new reveal/animation must not reintroduce layout shift — pair `content-visibility` with `contain-intrinsic-size: auto`, and animate `opacity`/`transform` only.
- Keep full page content in SSR HTML for SEO. Islands are fine for *interactive* widgets (forms, menus); don't island-ize static content.
- Framer Motion is deferred globally now — components that used `initial="hidden"`/`whileInView` still work (FM loads on idle/scroll), but anything that renders `opacity:0` in SSR and is **above the fold** will hurt LCP. Audit for that pattern before shipping.
- Deploys are the only way to measure (no reliable local Lighthouse throttling set up here). Batch changes to minimize deploy cycles.
