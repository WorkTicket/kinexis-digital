# KINEXIS Digital — Website

Bare-bones project scaffold for the KINEXIS Digital marketing site. This is
a starting structure, not a finished build — folders, configs, and stubbed
components are in place so a dev agent can start writing real code without
guessing where things go.

## Read these first, in order

1. `docs/DEV_INSTRUCTIONS.md` — brand positioning, tech stack, and what
   "premium" actually means for this build.
2. `docs/BRAND_GUIDELINES.md` — colors, typography, logo usage.
3. `docs/SITE_MAP.md` — every page, every section, what goes in each.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Structure at a glance

```
public/assets/        → logos, images, icons (logos already in place)
src/app/               → Next.js App Router pages
src/components/layout/ → Header, Footer, Navigation
src/components/sections/ → Homepage sections (Hero, CTASection, etc.)
src/components/ui/    → Reusable primitives (Button, Card, AnimatedCounter)
src/lib/sanity/        → CMS client + queries
sanity/                → Placeholder for the Sanity Studio project
docs/                  → All planning docs for this build
```

Every stubbed file has a comment at the top describing exactly what it
should contain — that's the brief, not boilerplate to delete.
