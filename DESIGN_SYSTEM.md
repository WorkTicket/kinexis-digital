# Design System Reference

One authoring path per UI concern. Extend primitives — do not fork styles at the page level.

Full source: [`src/design-system/README.md`](src/design-system/README.md)

| Concern | Canonical API |
|---|---|
| Sections | `pageSectionClasses()` + `<Section>` wrapper |
| Headers | `<SectionHeader>` |
| Cards | `<Card>` / `cardClasses()` / `<MetricCard>` |
| Buttons | `<Button>` / `buttonClasses()` |
| CTAs | `<SiteCTA>` (+ `<ServiceCTA>` on service pages) |
| Heroes | `HeroShell` \| `StaticHeroShell` \| `HeroArchetype` |
| Hero text | `HeroLabel` \| `HeroTitle` \| `HeroSubtitle` — SSR in `HeroContent.tsx`, motion in `HeroContentMotion.tsx` |
| Typography | `.type-hero` \| `.type-section` \| `.type-subheader` \| `.type-body` |
| Borders | `border-subtle` \| `border-surface` \| `border-strong` |
| Surfaces | `bg-surface-raised` \| `bg-surface-glass` |

## Hero routing

- **Homepage** → `HeroShell` (SSR, LCP-optimized)
- **SSR service pages** → `StaticHeroShell`
- **Hub/detail pages** → `HeroArchetype` (client, archetype-driven)
- **Contact** → `StaticHeroShell` compact variant
- **Blog/case study** → `StaticHeroShell` article variant

## Section wrapper

Prefer `<Section id="…" surfaceIndex={n}>` over raw `<section className={pageSectionClasses(…)}>`.
Pair with `<SectionHeader headingId="…-heading" />` for `aria-labelledby`.

## Banned patterns

- Manual `section-title` / `section-label` / `section-subtitle` blocks
- Inline `rounded-2xl border border-surface bg-white/[0.0x]` on marketing cards
- Raw `text-xl font-bold` on marketing `h2`/`h3`
- Manual `section--data` / `section--proof` classes outside `Section.tsx`
- `.header-cta` / `.service-card` legacy CSS classes

Run `npm run lint:design` to catch regressions.
