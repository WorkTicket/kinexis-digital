# Dev Instructions — KINEXIS Digital

## Brand positioning

> "Measured growth. Strategic authority. Modern digital performance."

KINEXIS Digital is a premium growth partner for businesses with serious budgets —
not a flashy neon agency, not generic corporate blue. Think boutique
consulting firm meets modern SaaS company.

**Name meaning** (useful context, not something to put on the site
verbatim): "KINEXIS" represents the intersection of kinetic energy and exponential growth.
Together: building brands that move fast and scale through sustainable growth.

**Visual direction:** premium, clean, confident, strategic, data-driven.
**Avoid:** cartoon trees, tech-startup gradients, anything that reads as an
AI-generated template.

## Tech stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS (brand colors already wired into
  `tailwind.config.ts`)
- **Animation:** Framer Motion — used for animated counters, smooth page
  transitions, subtle parallax (only where it actually improves the
  experience, not everywhere)
- **Icons:** Lucide
- **CMS:** Sanity (headless) — see `sanity/README.md` and
  `src/lib/sanity/`
- **Hosting:** Vercel is the natural fit for this stack (not yet configured)

## What makes this feel like a $10,000 site (not effects — discipline)

- Strong messaging — every section should sell something, not just describe
- Real case studies with real numbers — numbers build trust, vague claims
  don't
- Generous whitespace, consistently applied
- Consistent typographic scale — no ad-hoc font sizes
- Real photography where possible, not stock photos
- 90+ PageSpeed score — this is a hard requirement, not a nice-to-have

## Site structure

Full page-by-page breakdown with section specs lives in `docs/SITE_MAP.md`.
Quick summary:

1. **Homepage** — Hero, Trusted Process (4 steps), Services Overview,
   Featured Results, Why KINEXIS, final CTA
2. **Services** — overview page + 5 individual service pages (Website
   Design, SEO, Google Ads, Local SEO, Branding), each with Benefits /
   Process / FAQ / CTA
3. **Case Studies** — index + individual case study pages (Problem /
   Strategy / Solution / Results)
4. **About** — Mission, Values, Process, Philosophy. Not "we are
   passionate" copy — actually explain the philosophy.
5. **Blog** — SEO content engine, categorized (SEO, Web Design, Marketing,
   Google Business Profile, Local Business Growth)
6. **Contact** — form, Calendly embed, direct email

## Premium feature checklist

- [ ] Interactive statistics — animated counters (`AnimatedCounter`
      component is stubbed in `src/components/ui/`)
- [ ] Smooth page transitions (Framer Motion)
- [ ] Subtle parallax, used sparingly
- [ ] Dark mode is optional — if added, the deep navy background should be
      the dark-mode base, not pure black
- [ ] Forms wired to a real provider (Resend or similar — see
      `.env.example`)
- [ ] Calendly embed for "Book Consultation" CTAs

## Content model (for Sanity schemas)

At minimum, define schemas for:

- **Case Study** — title, client/industry, problem, strategy, solution,
  results (before/after metrics), featured image, slug
- **Blog Post** — title, category, author, body (Portable Text), cover
  image, published date, slug
- **Service** — title, slug, summary, benefits, process steps, FAQ items

## Notes for whoever builds this

- Logos are already in `public/assets/logos/` — full lockup and icon-only
  mark, both transparent PNG.
- Every component and page file in this scaffold has a comment describing
  exactly what content/sections it needs. Treat those comments as the spec,
  not as placeholder text to delete without reading.
- Stick to the cyan gradient palette — the palette is
  intentionally restrained.
