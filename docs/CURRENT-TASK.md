# CURRENT-TASK.md

## Goal
EN 41/41 long-form + native Spanish blogs (LatAm USD / Spain EUR).

## Status
Complete.

## Currency (binding)
- `/es` (es-419): USD published figures
- `/es-es` (es-ES): same numerals in euros via `src/i18n/prices.ts` (`toSpainEuros`, `spanishPlans({ currency: "eur" })`)

## Done
- EN 41/41: legacy Spanish-slug posts + pillars/cost/pages long-form
- LatAm Spanish: `es-cost-bodies.ts`, `es-pages-bodies.ts`, `es-pillars.ts`, `es-pillars-more.ts` → `posts-es.ts` (41 posts)
- MORE guides deepened (~1.5k–3k; batch-A pillars ~2.8k–4.7k); already merged via `Object.values(ES_PILLAR_POSTS_MORE)`
- Spain: plan chrome + blog `esPostForLocale` euros + `spainizeData`
- CONTENT.md + DECISIONS.md lock euro display rule (same numerals, not FX book)

## Next action
None for this pass.
