# Phase 3 — International SEO audit

## Scope and URL policy

Audit date: 2026-11-17. Public English URLs remain unprefixed. LatAm/US Spanish remains under `/es`; `/es-es` is an approved permanent redirect alias to `/es`, not a separate indexable locale. English and `/es` pages use self-canonicals. `/es` uses HTML `lang="es"`; English uses `lang="en"`.

The generated `LANGUAGE-EQUIVALENCE.csv` contains 123 English route definitions, 81 Spanish route definitions (79 exact language pairs plus two Spanish-only blog pages), and an `/es-es` policy row. Of the 79 exact pairs, 77 are content pairs (70 indexable and seven noindex legal/client utility or unpublished industry routes) and two are translated checkout utilities. There are 42 intentionally unmirrored English paths.

## Hreflang and sitemap

- Rendered HTML on the 70 indexable content pairs uses reciprocal `en-US`, `es`, `es-US`, and `x-default` alternates. Seven noindex content pairs and the two Spanish checkout utilities are absent from the sitemap and have no hreflang alternates.
- Sitemap rows include the same language alternate set for indexable mirrored routes. English-only routes have no Spanish alternate.
- `/es-es` is not in the sitemap and redirects to `/es`; it has no separate indexable/canonical language identity.
- The two legacy Spanish-only posts (`/es/blog/pagina-web-para-plomeros` and `/es/blog/como-pedir-resenas-en-google`) remain Spanish-only. Their retired English slugs redirect to current related English pages; the active Spanish posts do not claim an English article equivalent. Their Spanish-only hreflang set intentionally has no `en-US`.
- Three former Spanish case-study detail URLs redirect to `/es/portfolio`, which is a general portfolio hub rather than an equivalent case study. This is an intentional fallback, not a Spanish case-study translation. The English case-study pages remain distinct.
- The remaining 39 Spanish candidate paths for intentionally unmirrored English routes return 404. Language switching falls back to the Spanish home rather than linking into these absent routes.

No broken destinations were found for the 79 active pairs; all return HTTP 200 and have matching canonical/locale signals. The legacy and portfolio fallbacks above are recorded separately rather than counted as equivalent pairs.

## Switching and indexability

The language switch keeps mirrored pages on their same-page equivalent. For the two Spanish-only legacy posts, the English link now points directly to the current related English content (plumbing industry page or current Google-review article), avoiding a hop through the retired English slug. Existing `/es/pay` and `/es/pay/thanks` switch back to their English utility routes while remaining noindex and outside sitemap/hreflang.

Indexability follows existing intent: the CSV records indexability route by route; the Spanish legal/client utility routes and both checkout utilities are noindex, and the locale alias redirects. During review, `/es/pay` was found missing its explicit noindex flag; this was fixed in source and is covered by a regression assertion. Sitemap membership remains limited to indexable URLs. Aggregate route counts include route definitions and aliases and should not be conflated with unique crawled URL rows.

## Validation and remaining considerations

- Generated route inventory against public HTML and sitemap using read-only GET requests.
- Checked status/redirect chains, canonical, robots, `html lang`, sitemap presence, and rendered hreflang values.
- Local Spanish mirror guard passed for 79 mirrored paths.
- Language-switch regression tests pass for both legacy Spanish articles and both translated checkout utilities in Chromium and mobile.
- `/es-es` regional wording/Euro helpers are retained in source for compatibility but are unreachable through the approved public redirect policy; public `/es` pricing is USD.

The crawler inspection is a point-in-time source audit, not a deployment or provider test. No production changes were made.
