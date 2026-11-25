# Phase 5 responsive matrix

## Method

Captured the actual locally rendered Next.js pages (not mockups) in headless Chromium at widths **320, 375, 390, 768, 1024, 1440, and 1920 CSS px**. Heights were 900px. The main matrix covers 13 representative routes: homepage, pricing, contact, website audit, Phoenix preview landing, plumbing industry/service page, portfolio, case study, blog index, blog article, Spanish home, Spanish pricing, and payment. Consent-open homepage states were also captured at 390 and 1440px. Post-fix snapshots are under ignored `.audit/phase5/screens/`; before-state comparisons for the two fixed regressions were recaptured from the same rendered production pages with the original affected CSS values reapplied, under `.audit/phase5/screens/before/`.

## Results

| Route family / representative routes | 320 | 375 | 390 | 768 | 1024 | 1440 | 1920 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Homepage `/` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Pricing `/pricing` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Contact `/contact` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Website audit `/audit` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Phoenix `/lp/phoenix-preview` | Pass* | Pass | Pass | Pass | Pass | Pass | Pass |
| Industry `/industries/plumbing` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Portfolio `/portfolio` | Pass* | Pass* | Pass* | Pass | Pass | Pass | Pass |
| Case study `/case-studies/preferred-plumbing` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Blog index `/blog` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Blog article `/blog/website-mistakes-that-cost-you-calls` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Spanish home `/es` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Spanish pricing `/es/pricing` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Payment `/pay` | Pass | Pass | Pass | Pass | Pass | Pass | Pass |

`*` Initial overflow found and fixed: Phoenix CTA/header at 320px; portfolio live-card intrinsic width at 320, 375, and 390px. Post-fix captures and automated page-width scans pass.

## State and quality notes

- 91 route-width page loads returned HTTP 200; two consent-open states also rendered successfully.
- Post-fix scan: no horizontal document/body overflow, broken images, unnamed controls, or uncaught page errors across the selected route-width matrix.
- Consent-open screenshots are separate state captures; they are not additional route families.
- Width scan is representative, not an exhaustive audit of all 121 English `200` routes or all route translations.
- The initial visual bounds heuristic also reported the intentionally off-canvas skip link before focus and screenshot-frame contents clipped by their own image frames. These did not produce page-level horizontal scrolling or visible defects in the rendered screenshots.

Screenshots are browser evidence, not generated art. Their ignored local paths are listed in `.audit/phase5/responsive-matrix.json`; they are intentionally not committed due to the large capture set.
