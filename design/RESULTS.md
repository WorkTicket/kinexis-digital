# Contractor offer redesign review

This draft restores a professional visual composition around the current Houston contractor offer. It keeps the corrected minimum term, guarantee, prices, UTF-8 strings and formatted legal dates from the base commit. It does not restore unsupported statistics, badges or testimonials. No deployment was performed.

## What changed

- Navy split hero with a fully localized illustrative website preview, yellow primary action and restrained cobalt accents.
- Accessible HTML pricing inspired by the owner's plan images; shared `/pay` content supplies prices, features and guarantee wording.
- Connected process icons without decorative 01/02/03 labels, consistent trade cards, offer assurance strip, guarantee, FAQ and closing action.
- Compact sticky navigation, shared Messenger/plans actions, theme-aware logos and a mobile contact bar that yields to cookie consent.
- Shorter contact presentation with accessible message/booking tabs; existing email requirement, endpoints, consent and conversion tracking preserved.
- Shared offer treatment on audit, website landing, web-design and plumbing pages; existing URLs and case-study redirects preserved.
- Reusable design tokens, optimized responsive AVIF preview images and an updated critical-CSS generator for the existing Cloudflare pipeline.

## Verification

`npm run build`, `npm run lint`, `npm run lint:design`, `npx tsc --noEmit` and `npm test` passed. ESLint reports 13 existing image-element warnings and zero errors. Vitest reports **71 files and 612 tests passed**.

Production-build browser checks passed in Chromium, Firefox and WebKit. Chromium covers all three locales in light/dark themes; checks cover widths 390, 768, 1280 and 1536, hero actions above the fold, mobile-menu focus restoration, pricing disclosures and keyboard contact tabs. Automated axe checks found **zero serious or critical issues** across all 13 scenarios. These are browser-engine checks, not physical iPhone/Android device certification. See [qa.json](after/qa.json).

The seven-page [before](baseline/seo.json) and [after](after/seo.json) snapshots are identical for titles, descriptions, canonicals, Open Graph, Twitter and JSON-LD. Sitemap/robots implementations and analytics/consent wiring were not changed. Locale mojibake tests remain passing; there are no visible owner placeholders in the new homepage.

No PayPal controls were clicked and no real forms were submitted. A mocked contact test verifies URL delivery through the existing message payload, attribution, Meta event ID and lead event. End-to-end delivery to the real backend remains untested under the owner's no-submission instruction.

## Screenshots

Full-page before/after captures at all four requested widths are committed in [baseline](baseline/) and [after](after/). Baseline covers six routes; after also covers the web-design and plumbing detail pages. The retired case-study route redirects to the homepage, and its captures represent that destination.

| Width | Before homepage | After homepage |
|---|---|---|
| 390 | [Before](baseline/home-390.png) | [After](after/home-390.png) |
| 768 | [Before](baseline/home-768.png) | [After](after/home-768.png) |
| 1280 | [Before](baseline/home-1280.png) | [After](after/home-1280.png) |
| 1536 | [Before](baseline/home-1536.png) | [After](after/home-1536.png) |

Also inspect [English desktop](after/home-en-light-1440-viewport.png) and [Spanish dark mobile](after/home-es-419-dark-390-viewport.png). Capture scripts disable animation and expand content-visibility for complete full-page documentation; production CSS retains its normal behavior.

## Performance and limits

Baseline measurements use the live Cloudflare site; after measurements use a local production Next server. This is a review comparison across different serving environments, not a claim of live or field improvement. The local server does not apply the Cloudflare worker's critical-CSS inlining and stylesheet deferral. Lighthouse retains the first-visit consent banner and uses simulated device/network throttling. Full compact reports: [baseline](baseline/lighthouse.md), [after](after/lighthouse.md).

The homepage mobile 90+ performance / LCP target remains unmet. Render-blocking shared CSS and late rendering of the consent banner dominate the local trace. Correcting the shared asset-loading/consent pipeline safely requires separate first-visit and Cloudflare-preview performance work; hiding consent or claiming a passing score would be misleading. No INP measurement is claimed: read-only Lighthouse supplies TBT, while INP requires interaction/field data. See the measured comparison below.

## Owner inputs and deliberate omissions

- TODO(owner): provide verified customer proof and publication permission before adding any testimonials, client results or people photography. None is rendered.
- TODO(owner): supply verified Google Business Profile, LinkedIn and review URLs before adding footer links.
- TODO(owner): confirm asset rights for any future photography beyond the existing repository and supplied plan references.
- A real audit sample and restored case-study template are omitted because there is no permissioned evidence and the current brief prohibits result claims.
- The existing phone number is retained; no Houston number was invented. Monthly terms and guarantee come from `/pay` and `/terms`, overriding historical plan examples.

See [DECISIONS.md](DECISIONS.md), [ASSETS.md](ASSETS.md) and [REFERENCES.md](REFERENCES.md) for scope, provenance and reference observations. The phase structure was used as checkpoints under the communicated full-redesign assumption; the owner did not answer the optional scope clarification.

## Measured comparison

Scores are Performance / Accessibility / Best Practices / SEO.

| Page | Device | Before scores | After scores | LCP before / after (s) | CLS before / after |
|---|---|---|---|---|---|
| home | mobile | 79 / 96 / 81 / 100 | 82 / 100 / 100 / 100 | 3.38 / 4.63 | 0.170 / 0.000 |
| home | desktop | 92 / 96 / 81 / 100 | 99 / 100 / 100 / 100 | 0.98 / 0.96 | 0.120 / 0.008 |
| services | mobile | 60 / 97 / 77 / 100 | 76 / 97 / 96 / 100 | 7.95 / 6.20 | 0.003 / 0.002 |
| services | desktop | 86 / 97 / 77 / 100 | 91 / 97 / 96 / 100 | 2.31 / 2.02 | 0.010 / 0.010 |
| case-study | mobile | 82 / 96 / 81 / 100 | 81 / 100 / 100 / 100 | 2.67 / 4.77 | 0.270 / 0.000 |
| case-study | desktop | 88 / 96 / 81 / 100 | 99 / 100 / 100 / 100 | 1.07 / 0.99 | 0.209 / 0.008 |
| contact | mobile | 43 / 97 / 81 / 100 | 85 / 100 / 100 / 100 | 5.74 / 4.18 | 0.000 / 0.002 |
| contact | desktop | 86 / 97 / 81 / 100 | 99 / 100 / 100 / 100 | 1.04 / 0.86 | 0.008 / 0.009 |
| audit | mobile | 67 / 97 / 81 / 100 | 83 / 100 / 100 / 100 | 7.16 / 4.41 | 0.000 / 0.004 |
| audit | desktop | 89 / 97 / 81 / 100 | 99 / 100 / 100 / 100 | 1.66 / 0.93 | 0.008 / 0.009 |
| website | mobile | 73 / 100 / 81 / 69 | 76 / 100 / 100 / 69 | 4.78 / 5.40 | 0.000 / 0.010 |
| website | desktop | 98 / 97 / 81 / 69 | 93 / 100 / 100 / 69 | 1.10 / 1.60 | 0.000 / 0.000 |
