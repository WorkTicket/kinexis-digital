# Phase 5 visual regressions

## Fixed findings

| Finding | Before evidence | Root cause | Change | After evidence |
|---|---|---|---|---|
| `/portfolio` body width 434px at 320/375px and 436px at 390px, with 420px live cards | `.audit/phase5/screens/before/portfolio-{320,375,390}.jpg`; computed card width 420px against container widths 292–358px | Live card wrapper had an intrinsic minimum from `content-visibility` intrinsic sizing; the one-column grid track could not shrink | Use a zero-minimum grid track and constrain live wrappers to `width:100%; min-width:0` | `.audit/phase5/screens/portfolio-{320,375,390}.jpg` after fix; all three live cards use available width and `scrollWidth <= viewport` |
| `/lp/phoenix-preview` body width 336px at 320px; preview CTA extended to x=336 in the initial scan | `.audit/phase5/screens/before/phoenix-preview-320.jpg`; initial header CTA bounds x=245–336 | Phone and CTA cluster exceeded the logo/header space at the smallest breakpoint | At <=360px, reduce only landing header gaps/logo height/phone and CTA type/padding; preserve both phone and CTA links | `.audit/phase5/screens/phoenix-preview-320.jpg` after fix; CTA ends at or before x=306, with no body/document overflow |

## Verified not to be defects

- Blog index image-only article links were heuristically labeled “unnamed.” Each contains an image with non-empty article-title `alt`; the audit heuristic now uses that accessible name.
- Skip links appear offscreen until keyboard focus by design.
- Industry screenshot link geometry extends beyond the image viewport, but the screenshot card clips its own image; no page-level overflow or visible text/CTA clipping was found.

## Comparison limits

Before-state comparisons were re-rendered from the same production pages with the original affected CSS declarations reapplied; after-state screenshots are unmodified production renders. Both sets are actual browser screenshots, not mockups. The files are in ignored `.audit/phase5/screens/` and are not committed. No pixel-diff threshold was used; confirmation combined rendered screenshots, computed element bounds, browser document/body `scrollWidth`, and regression assertions. See the production Lighthouse comparison in `PHASE-5.md`; Phase 4 release gates remain open.
