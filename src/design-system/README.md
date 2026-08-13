# Design System Reference

One authoring path per UI concern. Extend primitives — do not fork styles at the page level.

| Concern | Canonical API |
|---|---|
| Sections | `pageSectionClasses()` + `<Section>` wrapper |
| Headers | `<SectionHeader>` |
| Cards | `<Card>` / `cardClasses()` / `<MetricCard>` |
| Buttons | `<Button>` / `buttonClasses()` |
| CTAs | `<PageCTA>` |
| Heroes | `PageHero` / homepage `HeroFilm` |
| Typography | `.type-hero` \| `.type-section` \| `.type-subheader` \| `.type-body` |
| Borders | `border-subtle` \| `border-surface` \| `border-strong` |
| Surfaces | `bg-surface-raised` \| `bg-surface-glass` |

## Hero routing

- **Homepage** → `HeroFilm` / homepage hero stack
- **Marketing pages** → `PageHero`
- **Blog / case study** → page-specific headers under `components/blog` and case-study layouts

Shared page chrome: `src/components/page/` (`PageHero`, `PageCTA`, etc.)

## Banned patterns

- Manual `section-title` / `section-label` / `section-subtitle` blocks
- Inline `rounded-2xl border border-surface bg-white/[0.0x]` on marketing cards
- Raw `text-xl font-bold` on marketing `h2`/`h3`
- Manual `section--data` / `section--proof` classes outside `Section.tsx`
- `.header-cta` / `.service-card` legacy CSS classes

Run `npm run lint:design` to catch regressions.
