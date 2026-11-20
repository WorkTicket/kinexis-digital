# release/cosmetic-merge-2: merge audit (2026-11-18)

Base: `release/cosmetic-merge` @ 066010c1. That is `phase-1/meta-lead-map` 0ac446a5, which is live, plus
`phase-1/conversion-handoff` 354ebbaa, footer link ordering 217f113d, and the Windows preview fixes and E2E updates.

## 9476f41e (origin/seo/high-intent-depth): "Polish footer and forms, fix button hover..."
- This commit is in a separate history. Release history starts at the squashed `0f9354a3 Initial commit` (2026-11-13).
  That snapshot already contains 9476f41e's work: the DocumentShell/locale layouts, es and es-es not-found pages,
  sitemap and legacy redirects, chrome strings, FacebookChooser, the footer/header restructure, and SITE_CONTENT_UPDATED
  (newer value, 2026-11-12).
- The hunks that still differ were revised later in the release line and should not be reapplied:
  - Button hover fix: release registers `--btn-fill` through `CSS.registerProperty` in DocumentShell. That replaces the
    old `@property` approach.
  - Footer sizing and glow: later footer passes, plus 217f113d.
  - Contact and LP copy: the 354ebbaa contact inquiry redesign supersedes it.
  - "Trade and city" field: removed on purpose in 79d253bf.
  - boot.js `generate_lead` and `gtag` calls: release analytics and consent own these. Not touched.
- Result: nothing cherry-picked. Reapplying it would roll back newer code.

## e71be0c1 (origin/wip/main-cosmetic-2026-11-18)
- Its parent c43041d7 is already in release. The image and UI work was restored in bb415d65 (2026-11-17) and then
  retuned by later perf commits (fdd01516, 13ffa2af). Release is ahead: PORTFOLIO_ASSET_VERSION 41 vs 34, and
  STILL_VERSION 26 vs 15.
- All 711 binary/text files differ from both the WIP commit and its parent. Release holds the newer encodes, so the
  WIP images were not taken.
- Code hunks already present or superseded: contact split layout (354ebbaa contact-aside), hero "Prefer to talk?"
  line, mobile plan-compare E2E, script lint cleanups, smoke-routes baseOrigin, and the /lp/phoenixpreview redirect.
- Not taken, perf-only and out of step with release encodes: 720w hero intermediates (01-homepage and 07-web-design
  720 avif/webp, HERO_INTERMEDIATE_WIDTHS, new sizes strings) and HeroFilm `preloadPoster` opt-in.
- Excluded by instruction: `intelligence/`, `docs/engineering/`, and the intelligence CURRENT-TASK.md rewrite.

## Cookie preferences button (cobalt cookie)
- Already in release through 354ebbaa: a 48x48 SVG with #0b3dff fill and #061d79 chips, and `.consent-fab` using
  `--brand-cobalt`. Verified on the preview deploy.

## Image references
- All 64 literal image paths in src/data/portfolio.ts and src/lib/image-sources.ts exist.
- All 32 portfolio projects have the webp, 320, 640, card, card-400/480/800, and devices variants.
