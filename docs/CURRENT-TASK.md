# CURRENT-TASK.md

## Goal
Rebuild `/web-design` as a design-process page (direction → assets → 2-day preview → revisions → plan), with EN + Spanish mirrors and image placeholders for new art.

## Status
code complete locally — drop in final illustrations when ready

## Changed files
- `src/app/web-design/page.tsx` — process-led sections, plans, industries, CTA → `/contact`
- `src/lib/content.ts` — `DESIGN_PROCESS_STEPS`, refreshed `WEB_FAQS`
- `src/lib/pages.ts` — web-design title/description
- `src/i18n/SpanishSite.tsx` — `WebDesign` + PAGE_META mirror
- `src/app/globals.css` — `.design-process` sticker grid
- `docs/CURRENT-TASK.md` — this file

## Completed
- Process steps, what-to-send cards, preview/revisions MediaSplit, plans band, industries, FAQ, closing CTA
- Spanish `/es` and `/es-es` structure matched
- Temporary art wired with existing assets

## Image placeholders (replace later)
1. **Hero** — still using `Art` `web-design` (`07-web-design`); optional new process-hero if desired
2. **What to send** — IconCards use kit icons `preview`, `built-for-your-trade`, `better-design`; swap for custom illustrations when ready
3. **Preview & revisions** — MediaSplit uses `Art` `process` (`04-process`); replace with dedicated preview/revision artwork
4. After new heroes land in `public/assets/heroes/`, register names in `ui.tsx` `ArtName`/`HERO_FILES` and run `npm run images:heroes`

## Unfinished
- Final custom illustrations for the three slots above
- Visual QA in browser at `/web-design`, `/es/web-design`, `/es-es/web-design`

## Errors/blockers
none

## Next action
Create/drop final page art for the placeholder slots, wire paths, then spot-check mobile + desktop.
