# COMPONENTS.md

## Core UI components (src/components)
- `Header.tsx`, `Footer.tsx` - Site chrome
- `ui.tsx` - Shared primitives: `Art`, `ArtDecor`, `PageHero`, `MediaSplit`, `Section`, `CtaBand`, `IconCard`, `ServiceCard`, `ReviewCard`, `Faq`, `Compare`, `Shots`, `Prose`, `HL/Phrase` exports
- `artwork.tsx` - `Icon`, `Illustration` components
- `mark.tsx` - Highlighting utilities
- `ShotFrame.tsx` - Portfolio shots
- `HeroFilm.tsx` - Homepage hero film
- `HomeBands.tsx` - Homepage sections
- `ReviewsSection.tsx`, `UnifiedReviewCard.tsx`, `FacebookReviews.tsx`, `TrustpilotReviews.tsx`, `SiteReviewForm.tsx` - Reviews (one card format for site + Trustpilot + Facebook)
- `IndustryGrid.tsx`, `IndustryAudit.tsx` - Industries
- `PlanOffer.tsx`, `PricingCta.tsx`, `MobilePlanComparison.tsx` - Pricing/offers
- `BookingCalendar.tsx`, `SiteAudit.tsx` - Audits/booking
- `Form.tsx` - Forms
- `InvoicePay.tsx`, `PayCheckout.tsx` - Payments
- `HeaderMenu.tsx`, `LanguageSwitch.tsx` - Navigation/i18n
- `FooterGate.tsx`, `DialogHost.tsx`, `ScrollUi.tsx`, `Boot.tsx`, `SafeImage.tsx`, `DeferredImg.tsx`, `Filterable.tsx`, `Stepper.tsx`, `JsonLd.tsx`, `ProjectCard.tsx`, `GuaranteeBadge.tsx`, `SpanishPlanSticker.tsx`

## When to reuse
- Use `PageHero` for page headers (split with `Art` or text-only). Prefer `Art` with approved `ArtName` from `ui.tsx`.
- Use `Section` for consistent padding/tint/decor.
- Use `CtaBand` for CTAs.
- Use `Faq` for FAQs.
- Use `Compare` with `COMPARE_ROWS` from `@/lib/content` when comparing.
- Use `Art`/`ArtDecor`/`Icon`/`Illustration` for visuals - don't inline large SVGs unless necessary.
- Use existing card patterns from `globals.css`/components.

## Data sources
- `src/data/industries.ts`, `src/data/portfolio.ts` - Content data
- `src/lib/content.ts` - Shared content (compare rows, etc.)
- `src/lib/projects.ts` - Portfolio projects
- `src/lib/pages.ts` - Page metadata

## Patterns to follow
- Follow sticker/button patterns from globals.css
- Use path alias `@/*`
- Preserve accessibility (focus states, aria labels)
- Images: use `Art`/`DeferredImg`/`SafeImage` as appropriate; `next/image` is unoptimized
- i18n: use helpers from `@/lib/i18n` and chrome from `@/i18n/chrome`
