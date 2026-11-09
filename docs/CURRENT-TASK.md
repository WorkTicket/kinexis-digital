# CURRENT-TASK.md

## Goal
Site-wide speed optimization (LCP/TTFB/JS) without changing design, visuals, or animations.

## Status
done (local) — `npm run typecheck` and `npm run lint` pass. Hero derivatives regenerated via `npm run images:heroes`.

## Changed files (this pass)
- Perf: locale `revalidate`, `IndustryHeroArt`, capped industry 480/768/960 stills, portfolio card 640-only srcSets
- JS: `LanguageSwitch` → server; dynamic islands (pay/calendar/review form); minified `boot.min.js` (+ build minify step)
- Config/docs: `next.config.ts` removeConsole, eslint ignore for boot.min, `DECISIONS.md`, `Boot.tsx` v=20

## Completed
- Stop industry pages from offering multi-hundred-KB master WebP as LCP candidates
- ISR cache window on all locale layouts for OpenNext KV interception
- Cut client hydration on chrome (language switch) and defer heavy route islands
- Ship ~40% smaller interaction boot script

## Unfinished
1. Deploy + spot-check industry heroes, menu/reveal animations, and pay/calendar pages
2. Optional: full `npm run build` + lighthouse audit (`scripts/audit-lighthouse.mjs`) against preview

## Next action
Deploy, then smoke-test homepage film fade-in, industry LCP art, and Spanish route JS weight.
