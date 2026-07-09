# Design System Reference

One authoring path per UI concern. Extend primitives — do not fork styles at the page level.

| Concern | Canonical API |
|---|---|
| Sections | `pageSectionClasses()` + `<Section>` wrapper |
| Headers | `<SectionHeader>` |
| Cards | `<Card>` / `cardClasses()` / `<MetricCard>` |
| Buttons | `<Button>` / `buttonClasses()` |
| CTAs | `<SiteCTA>` (+ `<ServiceCTA>` on service pages) |
| Heroes | `HeroShell` \| `StaticHeroShell` \| `HeroArchetype` |
| Typography | `.type-hero` \| `.type-section` \| `.type-subheader` \| `.type-body` |
| Borders | `border-subtle` \| `border-surface` \| `border-strong` |
| Surfaces | `bg-surface-raised` \| `bg-surface-glass` |

## Hero routing

- **Homepage** → `HeroShell` (client, LCP-optimized)
- **SSR service pages** → `StaticHeroShell`
- **Hub/detail pages** → `HeroArchetype`
- **Contact** → `StaticHeroShell` compact
- **Blog/case study** → `StaticHeroShell` article variant

Shared hero text primitives: `src/components/ui/hero/HeroContent.tsx` (SSR) and `HeroContentMotion.tsx` (animated client heroes)

## Banned patterns

- Manual `section-title` / `section-label` / `section-subtitle` blocks
- Inline `rounded-2xl border border-surface bg-white/[0.0x]` on marketing cards
- Raw `text-xl font-bold` on marketing `h2`/`h3`
- Manual `section--data` / `section--proof` classes outside `Section.tsx`
- `.header-cta` / `.service-card` legacy CSS classes

Run `npm run lint:design` to catch regressions.
