# DESIGN-SYSTEM.md

## Brand style
Sticker/cartoon aesthetic: hard shadows, navy/orange/cobalt palette, bold typography, custom illustrations. Follow existing patterns in `src/app/globals.css`.

## Colors (from globals.css)
CSS variables in `:root`:
- `--bg: #ffffff`, `--bg-tint: #f4f7ff`
- `--text: #0a1230` (navy-black), `--copy: #243049`, `--muted: #53607e`
- `--border: #e1e6f2`
- `--accent: #0b3dff` (electric cobalt), `--accent-dark: #0828c4`, `--accent-soft: #e9eeff`, `--accent-2: #00c2ff`
- `--warm: #ff6a00` (CTA orange), `--warm-light: #ff7a3d`, `--warm-hot: #ef4c09`, `--warm-dark: #e84a0a`, `--warm-ink: #0a1230`
- `--brand-cobalt: var(--accent)`, `--brand-orange: #ff6a00`, `--brand-navy: #031b4e`
- `--on-dark: #bfe9ff`, `--hl: #ff8a32`
- `--ok: #0f8a4d`, `--no: #5f6b7a`, `--star: #a16207`, `--star-on-dark: #ffd166`, `--danger: #e11d48`

Tailwind theme aliases (inline): `accent`, `accent-dark`, `accent-soft`, `tint`, `muted`, `line`, `brand-cobalt/orange/navy`, etc. Use established utilities where possible.

## Typography
Fonts loaded via `next/font/local`:
- `--font-inter` (Inter, 100-900) - body
- `--font-poppins` (600/700) - headings
- `--font-poppins-display` (800) - display/H1
- Fallback tracking handled for font swap. 
Headings use `font-family: var(--font-head)`; H1 uses display face.

## Spacing/radius/shadows
- `--radius: 14px`, `--radius-brand`
- `--shadow: 0 6px 24px rgba(10,18,48,.08)`
- `--shadow-sticker: 4px 4px 0 rgba(3,27,78,.22)`, `--shadow-sticker-on-dark: 6px 6px 0 rgba(0,0,0,.42)` — hard navy offset (`6px 6px 0 var(--brand-navy)`) reserved for conversion shells (footer CTA, form-shell, cal-shell)
- Max width `--max: 1180px` (`.container`)

## Buttons (sticker style)
`.btn` base: 3px navy border, orange fill, hard 4px shadow, press animation (translate 2px, shadow none). Variants: `.btn--primary/.btn--warm`, `.btn--ghost/.btn--light` (different poses). Focus visible with cobalt outline. See globals.css for details.

## Components/patterns
- Sticker checkmarks via SVG data URIs (`--check-sticker`)
- Hero with film/poster, play button sticker
- Cards, grids, comparison table, reviews rail, trade/index lists, FAQ details, forms
- Decorative illustrations via `ArtDecor`/`Illustration` in `components/artwork.tsx`, positioned with CSS
- Animations minimal; respect `prefers-reduced-motion`

## Responsive
Breakpoints used: ~520px, ~560px, ~640px, ~680px, ~720px, ~860px, ~1020px, ~1180px. Mobile layouts prioritized.

## Assets
Heroes in `public/assets/kinexis/heroes/`, decorative in `public/assets/kinexis/decorative/`, icons/illustrations in `public/assets/kinexis/`. Logos in `public/assets/logos/`. See `src/components/ui.tsx` `Art`/`ArtDecor`.
