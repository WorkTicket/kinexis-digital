# Brand Guidelines — KINEXIS Digital

## Color palette

| Role        | Name         | Hex       | Tailwind token    | Usage notes |
|-------------|--------------|-----------|-------------------|-------------|
| Background  | BG           | `#05060a` | `bg`              | Default page background |
| Background  | BG Dark      | `#030408` | `bg-dark`         | Elevated section backgrounds |
| Background  | BG Secondary | `#0a0b12` | `bg-secondary`    | Card / panel backgrounds |
| Accent      | Neon Cyan    | `#00d4ff` | `neon-cyan`       | Primary accent, CTAs, icons, interactive elements |
| Accent      | Neon Blue    | `#0099cc` | `neon-blue`       | Gradient partner, deep accents |
| Surface     | Charcoal     | `#111827` | `charcoal`        | Card borders, hover states |
| Surface     | Dark Gray    | `#1f2937` | `dark-gray`       | Subtle dividers |
| Text        | White        | `#ffffff` | —                 | Body copy, headings |

> **Single source of truth:** All hex values live in the `BRAND` constant in
> `tailwind.config.ts`. Update them there; `globals.css` CSS variables
> sync automatically via `theme()` references.

These are already wired into `tailwind.config.ts` as `neon-cyan`, `neon-blue`,
and `bg`.

## Typography

- **Body:** Ubuntu — loaded via `next/font/google` as `--font-ubuntu`.

## Logo usage

Two logo files are provided in `public/assets/logos/`:

- `KINEXIS_logo_full.png` — full lockup (mark + "KINEXIS Digital"
  wordmark). Use in the header, footer, and anywhere there's enough width.
- `KINEXIS_icon_logo.png` — mark only. Use
  for favicons, social avatars, mobile nav when space is tight, and as a
  loading/watermark element.

**Do:**
- Maintain clear space around the mark — don't let text or UI elements
  crowd it.
- Use on dark backgrounds, where the contrast is cleanest.

**Don't:**
- Don't recolor the mark outside the brand palette.
- Don't stretch or distort the aspect ratio.
- Don't place it over busy photography without a solid or scrim background
  behind it.

## Typography System

| Role        | CSS Class         | Scale                          |
|-------------|-------------------|--------------------------------|
| Hero H1     | `.type-hero`      | clamp(2.5rem → 4rem) desktop   |
| Section H2  | `.type-section`   | clamp(1.875rem → 3rem)         |
| Subheader H3| `.type-subheader` | clamp(1.375rem → 2rem)         |
| Body        | `.type-body`      | 1rem / line-height 1.7         |
| Body Large  | `.type-body-lg`   | clamp(1.0625rem → 1.125rem)    |
| Label/Badge | `.section-label`  | 0.75rem / uppercase / tracked  |

Do not use arbitrary `text-*` sizes for headings. Always use the type scale classes.

## Spacing Scale

Spacing tokens live in `:root` in `globals.css`:

| Token                    | Value                        | Purpose |
|--------------------------|------------------------------|---------|
| `--space-section`        | 4.5rem                       | Section padding (mobile) |
| `--space-section-md`     | 6rem                         | Section padding (tablet) |
| `--space-section-lg`     | 7.5rem                       | Section padding (desktop) |
| `--space-block`          | clamp(3rem, 5vw, 4rem)       | Between major content blocks |
| `--space-element`        | clamp(1rem, 2.5vw, 2rem)     | Between elements within a block |
| `--space-eyebrow-heading`| 1rem                         | Badge → heading gap |
| `--space-heading-subheading` | clamp(1rem, 2vw, 1.5rem) | Heading → description gap |
| `--space-subheading-cta` | 2rem                         | Description → CTA gap |

Use `.section-padding` / `.section-padding-sm` classes; never set `py-*` on sections directly.

## Content Width System

| CSS Class              | Max-Width                  | Use For |
|------------------------|----------------------------|---------|
| `.container-site`      | 1280px                     | All page containers |
| `.section-header`      | 42rem (`--section-header-max`) | Badge + heading + description block |
| `.section-text-width`  | 42rem                      | Standalone text intro |
| `.hero-text-width`     | min(100%, 34rem)           | Hero copy block (split layout) |
| `.cta-width`           | 48rem (`--subtitle-width`) | CTA headline + subtitle |
| `.prose-readable`      | 42rem (`--readable-width`) | Long-form article prose |

## Section Header Pattern

Every section intro should follow:

```jsx
<SectionHeader
  badge="Optional Label"    // rendered as .section-label
  title="Section Heading"   // rendered as h2 .section-title
  description="A cohesive 50–90 word paragraph that communicates one
               complete idea. Natural flow. No stacked sentences."
/>
```

Never write custom heading implementations inside sections. Always use `<SectionHeader>`.

## CTA System

**Primary CTA:** "Book a Strategy Call" → `/contact`
**Secondary CTA:** "View Our Work" → `/case-studies`

Both CTAs should appear together on:
- Homepage hero
- All service page heroes (via `ServiceHero`)
- Homepage bottom CTA section

Service-specific CTAs (e.g. "Get Your SEO Roadmap") may be used as the primary
label in service page heroes but must still be accompanied by the secondary CTA.

## Copy Standards

### Paragraph requirements

- **Hero supporting text:** 70–140 words, one cohesive paragraph
- **Section introductions:** 50–90 words, one cohesive paragraph
- **Card descriptions:** 15–35 words
- **CTA supporting text:** 25–60 words

### Avoid these patterns

- Stacked single sentences masquerading as paragraphs
- Three consecutive short sentences on separate lines
- Starting paragraphs with "Rankings matter. Content matters."
- Clichés: "In today's digital landscape", "game-changing", "seamlessly integrate", "unlock your potential"

### Good paragraph example

> We focus on the keywords most likely to generate qualified leads and revenue,
> prioritizing opportunities based on business impact rather than search volume
> alone. By combining search intent research, competitor analysis, and ongoing
> optimization, we build campaigns designed to create sustainable long-term growth.

## Tone

Confident, strategic, results-oriented. Write like a firm that handles
serious budgets — specific claims and real numbers, not generic enthusiasm
("we are passionate about marketing" is the kind of line to avoid
everywhere, including the About page).
