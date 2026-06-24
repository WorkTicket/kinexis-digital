# Brand Guidelines — KINEXIS Digital

## Color palette

| Role        | Name         | Hex       | Usage notes |
|-------------|--------------|-----------|-------------|
| Primary     | Deep Navy    | `#0F172A` | Headlines, header/footer backgrounds, primary buttons |
| Secondary   | Neon Cyan    | `#00f5ff` | Primary accent, icons, interactive elements |
| Accent      | Neon Blue    | `#0088ff` | Secondary gradient partner, deep accents |
| Background  | Dark         | `#05060a` | Default page background |
| Text        | White        | `#FFFFFF` | Body copy |

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

## Tone

Confident, strategic, results-oriented. Write like a firm that handles
serious budgets — specific claims and real numbers, not generic enthusiasm
("we are passionate about marketing" is the kind of line to avoid
everywhere, including the About page).
