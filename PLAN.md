# Kinexis Digital: Website Design Upgrade Plan (for Codex)

Goal: make kinexisdigital.com look and convert like a professional agency site, aimed at home-service contractors and ecommerce owners who decide in seconds, mostly on a phone.

## How to use this file

1. Save this file in the repo root as `PLAN.md`.
2. Copy section 0 into `AGENTS.md` so every Codex session follows the same rules.
3. Run one phase per Codex session. Start each with: `Read PLAN.md and AGENTS.md. Do Phase N only. Do not start Phase N+1.`
4. Review screenshots and the summary at the end of each phase before starting the next.

---

## 0. Ground rules (put these in AGENTS.md)

- Inspect the repo before changing anything. Keep the existing stack and build tooling. Do not introduce a new framework.
- Never invent content. No made-up testimonials, client logos, statistics, awards, team members, or partner badges. Where real content is missing, insert a visible placeholder in the form `TODO(owner): ...` and list it in the phase summary.
- Preserve: URLs and slugs, `<title>` and meta descriptions, canonical tags, Open Graph and Twitter tags, structured data, the English / Español (LatAm) / Español (España) language switch, cookie consent behavior, analytics and ad tags, and the `?v=` cache-busting on assets.
- Support both light and dark logos and any existing theme behavior.
- Performance targets on mobile: LCP under 2.5 s, CLS under 0.1, INP under 200 ms. Images in WebP or AVIF with explicit width and height. No autoplay video heavier than 1.5 MB. No WebGL or heavy animation libraries.
- Accessibility: WCAG 2.2 AA contrast, visible focus states, full keyboard navigation, `prefers-reduced-motion` respected, real headings in order, alt text on meaningful images.
- Every phase ends with: build passes, lint passes, Lighthouse run (mobile and desktop) with scores noted, screenshots at 390, 768, 1280 and 1536 px wide, and a short change summary plus the list of `TODO(owner)` items.
- Strings must go through the existing translation mechanism. Do not hardcode English into templates that are localized.

## 1. Audit of the current homepage

Based on the live homepage text and markup. I could not view rendered visuals, so Phase 1 starts with screenshots to judge spacing, type scale and imagery before any redesign.

**Already working**
- Clear promise ("Digital marketing that compounds") and a results-first angle (leads and revenue, not vanity metrics).
- Sensible section order: services, selected work, process, industries, FAQ, closing CTA.
- Case studies with a headline multiplier and timeframe; a written audit offer; month-to-month terms.
- Three-language support, light/dark logos, versioned assets, cookie consent.

**Gaps to fix**
1. **Mixed positioning.** The hero and meta say "home services and ecommerce, one program." The footer says "Websites that bring calls for Houston contractors. Free homepage preview, $0 down, live in 7 days," and lists services (missed-call text-back, Google review requests) that are not in the main services section. The phone number is a 307 area code. Visitors cannot tell what the core offer is. Pick one lead story and make everything else support it.
2. **Thin proof.** Three case studies show multipliers (2.8x, 2.4x, 2.4x) but no baseline numbers (except one), no client quotes, no faces, no logos, no testimonials, and no team or founder presence. For a small agency this is the biggest trust gap.
3. **Partner badge strip.** Eight "Partner/Certified" badges (Google Ads, Meta, HubSpot, Microsoft, LinkedIn, Semrush, TikTok, Google Analytics). Each one must be verifiably true and linkable. Unverifiable badges hurt more than no badges.
4. **Abstract hero visual.** Illustrated "plates" and a rotating word ticker explain little. Strong agency heroes show proof (a results panel, a real site screenshot, a before/after).
5. **Uneven industries section.** Only the first industry shows a photo; the rest are text-only.
6. **Competing CTAs.** "Get my free preview," "Send a message," "See the work," "Audit," and a "Book a call" in the meta description. One primary and one secondary CTA, used consistently.
7. **Thin footer proof and social.** Only Facebook is linked. No Google Business Profile, LinkedIn, or review links.
8. **Pricing is hidden.** Pricing exists on the landing page (`/lp/get-a-website#pricing`) but nothing on the homepage signals price level.

## 2. Reference sites and what to borrow

These are described from published roundups and directory profiles, not hand-inspected. Before Phase 2, open each one at mobile and desktop width and note one or two concrete patterns.

| Site | Why it is useful | Borrow | Avoid |
|---|---|---|---|
| KlientBoost (klientboost.com) | High-contrast, modular layout; animated charts tie KPIs to tactics | A results/KPI visual in or just below the hero; modular section rhythm | Dense in-your-face density; Kinexis audience is less technical |
| HigherVisibility (highervisibility.com) | Clean grid, metrics placed where they guide the eye, understated credibility | Metric strip placement; calm, professional grid | Generic corporate feel |
| Disruptive Advertising (disruptiveadvertising.com) | Results-first, high contrast, prominent risk-reversal guarantee, audit offer | A visible guarantee/terms block; audit as a headline offer | Hero video production cost |
| MeanPug (meanpug.com) | Instantly clear niche (law firms), bold accent color, custom illustrations, personality with polish | Niche clarity in the first screen; one signature accent and consistent illustration style | Pug-specific mascot idea; Kinexis needs its own personality |
| Chuckwalla Digital (chuckwalladigital.com) | Same niche as Kinexis (home-service contractors); local-first positioning, outcome-titled case studies ("Page One in 60 Days...") | Outcome-first case study titles; local and press credibility; contractor-specific language | Small-agency template look |
| Hook Agency (hookagency.com) | Direct competitor in the contractor niche | Competitive benchmark for page structure and offers | Copying copy or layout |
| Made by Many, Upperquad, Dogstudio, DD.NYC | Award-style motion, animated case studies, cinematic heroes | Only subtle ideas: hover reveals on case studies, restrained scroll transitions | WebGL, full-screen video, exploratory navigation. They hurt speed and clarity for a conversion-driven contractor audience |

General patterns across the strongest agency sites: a first screen that says who it is for and what it delivers, proof within one scroll, case studies with real numbers, a small number of CTAs repeated at intervals, and distinct art direction rather than a template.

## 3. Design direction

**Concept: "Credible, bold, data-first."** Looks like a modern performance agency, not a creative studio. Proof and clarity beat decoration.

**Tokens (define as CSS variables or the existing theme file; adjust after Phase 1 review)**
- Primary: keep the existing cobalt `#0066ff`. Add a darker shade for hover/pressed, a very light tint for backgrounds, and one warm accent used only for small highlights (for example numbers or the "free preview" badge).
- Neutrals: a 9-step gray scale. Dark sections use near-black navy, not pure black.
- Type: one display face and one text face, self-hosted, variable fonts, `font-display: swap`. Options to evaluate: Inter Tight, Geist, or Plus Jakarta Sans. Fluid type scale with `clamp()`. Display headings tight and heavy, body 16 to 18 px at 1.5 to 1.6 line height.
- Spacing: 8 px base scale. Section padding 80 to 120 px desktop, 56 to 72 px mobile. Max content width around 1200 px.
- Shape: one corner radius family (for example 12 and 20 px). Soft layered shadows, used sparingly.
- Motion: 150 to 250 ms ease-out for hovers and reveals; one reveal-on-scroll pattern site-wide; disable under `prefers-reduced-motion`.

**Page rhythm (homepage, top to bottom)**
1. Header (sticky): logo, 4 nav items, phone, primary CTA.
2. Hero: promise, one-line audience, primary and secondary CTA, proof panel.
3. Proof strip: 3 to 4 real numbers.
4. Services: 5 cards, consistent iconography.
5. Selected work: large case study cards with baseline to result numbers.
6. Testimonials or quotes (once real ones exist).
7. Process: Audit, Build, Run.
8. Offer and terms: month-to-month, free preview, guarantee (only what the owner confirms).
9. Industries: consistent photo or illustration for every card.
10. FAQ.
11. Closing CTA and footer.

## 4. Phases

### Phase 1: Baseline and foundations

**Goal:** know what exists, then put a design system under it without changing how the page looks yet.

**Tasks**
- Inventory the stack, templates, components, CSS approach, and where translations live.
- Capture before-screenshots of the homepage, services, a case study, contact, audit, and the `/lp/get-a-website` page at 390, 768, 1280, 1536 px. Save to `design/baseline/`.
- Run Lighthouse (mobile and desktop) on those pages and save the scores to `design/baseline/lighthouse.md`.
- Create the token file (colors, type scale, spacing, radii, shadows, motion) and refactor existing styles to use it where low-risk.
- Self-host the chosen fonts, preload only the critical weight.
- Write `design/DECISIONS.md` listing every choice and the reason.

**Acceptance:** no visible regression; tokens in place; baseline screenshots and scores committed; build and lint pass.

**Codex prompt**
```
Read PLAN.md and AGENTS.md. Do Phase 1 only. Inspect the repo and report the stack, then capture baseline screenshots and Lighthouse scores, introduce the design token file, and self-host fonts. Do not change layouts or copy. End with the summary and TODO(owner) list.
```

### Phase 2: Header, hero, and CTA system

**Goal:** a first screen that says who it is for, what they get, and what to do next, with proof visible immediately.

**Tasks**
- Sticky header that shrinks on scroll: logo, Services, Work, Industries, About, phone, one primary button. Clean mobile menu with large tap targets.
- Hero: left column with headline, one-sentence audience line, primary CTA ("Get my free preview") and secondary CTA ("See the work"). Right column: a proof panel built from one real case study (baseline to result, timeframe, small chart), clearly labeled with the client and timeframe. No fake dashboards.
- Under the CTAs: 2 or 3 short terms that the site already states (for example "Month to month," "No lock-in," "Free homepage preview"). Use only what the owner confirms in `TODO(owner)`.
- Replace the word ticker with something that earns its space, or remove it.
- Define one CTA component with primary, secondary, and text-link variants. Use the same wording sitewide.
- Mobile: sticky bottom bar with Call and Free Preview buttons that does not cover content or the cookie banner.

**Acceptance:** hero fits above the fold at 390 x 844 and 1440 x 900; LCP image or panel is optimized; one primary CTA wording used everywhere; keyboard and screen reader checks pass.

**Codex prompt**
```
Read PLAN.md and AGENTS.md. Do Phase 2 only. Rebuild the header and hero per section 4, Phase 2, using the tokens from Phase 1. Use a real case study for the proof panel and mark anything unverified with TODO(owner). Keep all translations working. End with before/after screenshots at 390, 768, 1280 and 1536 px and Lighthouse scores.
```

### Phase 3: Proof

**Goal:** make trust the strongest part of the site.

**Tasks**
- Proof strip below the hero with 3 or 4 real numbers (source: existing case studies; show baseline to result where available).
- Case study cards: larger format, outcome-first title (for example "2.4x emergency calls in 8 months"), industry tag, baseline to result, screenshot of the site or ads built, link to the full case. Hover reveal for the extra line, no heavy animation.
- Testimonials component: quote, name, role, company, optional photo. Ship it with `TODO(owner)` placeholders if no real quotes exist, and hide the section from production output until real ones are added.
- Partner badge strip: keep only badges the owner confirms, each linking to the verification page where possible. Make the strip static or very slow marquee that pauses on hover and respects reduced motion.
- Optional: "About" teaser with a real photo of the founder or team.

**Acceptance:** every number on the page traces to a case study or an owner-confirmed source; no placeholder text visible in production build; badge list matches the owner-confirmed list.

**Codex prompt**
```
Read PLAN.md and AGENTS.md. Do Phase 3 only. Build the proof strip, upgraded case study cards, testimonials component, and badge strip. Pull numbers only from existing case study pages. Anything missing becomes TODO(owner) and must not render in production. List each number with its source in the summary.
```

### Phase 4: Services, process, industries, offer

**Goal:** make the middle of the page scannable and consistent.

**Tasks**
- Services: five cards with consistent icon style, one-line outcome, three bullets, link. Replace the "plate" illustrations with a single consistent icon or illustration set (draw originals; no stock lookalikes of other agencies' art).
- Process: a clear three-step visual with connecting line, numbers, and one concrete deliverable per step.
- Offer and terms block: free preview, month to month, what happens in the first 30 days, and the guarantee only if the owner confirms the exact wording.
- Industries: same card format for all six (photo or illustration, one-line pain point, three sub-services). Source real or properly licensed images; log licenses in `design/ASSETS.md`.
- Resolve the footer mismatch: align footer services and tagline with the chosen positioning (see owner decisions).

**Acceptance:** all cards share one component; no section mixes photo and text-only cards; footer and hero tell the same story.

**Codex prompt**
```
Read PLAN.md and AGENTS.md. Do Phase 4 only. Standardize the services, process, industries and offer sections as described, and align footer copy with the positioning decision recorded in design/DECISIONS.md. Do not invent guarantees or terms; use TODO(owner) where unconfirmed.
```

### Phase 5: Conversion pages

**Goal:** the pages people land on after a CTA click look like the same company.

**Tasks**
- Contact: short form (name, phone or email, website URL, what you need), reassurance line about reply time, phone and email beside it. Inline validation, clear success state, no layout shift.
- Audit page: explain exactly what the written brief contains, show a sample (blurred or redacted real example, only with permission), one form.
- `/lp/get-a-website` and the pricing section: same header, tokens, and CTA wording as the homepage; pricing in a simple comparison layout; remove any style drift.
- Service and industry pages: apply the same section components and add a proof block at the top.
- Case study template: summary sidebar (client, industry, timeframe, services, key numbers), then story, then CTA.

**Acceptance:** one visual language across all pages; forms work with existing backend and consent; thank-you or confirmation tracking events still fire.

**Codex prompt**
```
Read PLAN.md and AGENTS.md. Do Phase 5 only. Apply the new components to contact, audit, /lp/get-a-website, one service page, one industry page, and the case study template. Do not change form endpoints or tracking events. Verify form submission end to end and report how.
```

### Phase 6: Motion, polish, QA

**Goal:** finish quality and prove it.

**Tasks**
- Add the single reveal-on-scroll pattern and small hover states. Nothing animates continuously except what is paused by `prefers-reduced-motion`.
- Tune images: responsive `srcset`, lazy-load below the fold, correct dimensions.
- Dark mode pass (if the site supports it): contrast, shadows, logos.
- Cross-browser check (Chrome, Safari, Firefox; iOS Safari and Android Chrome widths).
- Accessibility audit (axe or equivalent) with zero critical or serious issues.
- Lighthouse: aim for 90+ on Performance, Accessibility, Best Practices, SEO on mobile for the homepage.
- Verify SEO invariants: titles, descriptions, canonicals, OG images, structured data, sitemap and robots unchanged or improved.
- Final screenshots to `design/after/` and a comparison table in `design/RESULTS.md`.

**Acceptance:** targets from section 0 met; no console errors; before/after documented.

**Codex prompt**
```
Read PLAN.md and AGENTS.md. Do Phase 6 only. Add motion and polish, optimize images, run accessibility and Lighthouse checks, verify SEO invariants, and write design/RESULTS.md with before/after screenshots and scores. Fix anything below the targets in section 0 or explain why it cannot be fixed.
```

## 5. Decisions and inputs needed from you (owner)

1. **Lead positioning.** Choose one: (a) home-service contractors in Houston with a free homepage preview, $0 down, live in 7 days; or (b) home services and ecommerce as a full program. Everything else should support the choice. Update the phone number and footer to match.
2. **Real proof.** For each case study: baseline and result numbers, a client quote with permission to name them, a screenshot of the site or campaign, and a photo of the client or team if possible.
3. **Badges.** Confirm which of the eight partner badges you can verify, with the link to each verification page. Remove the rest.
4. **Terms and guarantee.** Exact wording for month-to-month, the free preview, and any guarantee. Do not publish a guarantee you have not confirmed.
5. **People.** A founder or team photo and short bio for an About teaser.
6. **Pricing signal.** Whether to show starting prices on the homepage.
7. **Assets.** Brand files, any existing photography, and licenses for any stock imagery.
8. **Social and reviews.** Links to Google Business Profile, LinkedIn, and review pages to add to the footer.

## 6. Definition of done

- One clear positioning story from hero to footer.
- Proof visible within the first scroll and repeated through the page, with every number traceable to a source.
- One CTA wording and one component set across all pages.
- Mobile Lighthouse 90+ on Performance, Accessibility, Best Practices, and SEO for the homepage; Core Web Vitals within targets.
- No `TODO(owner)` text visible in production.
- `design/RESULTS.md` shows before and after.

## Current owner brief and conflict resolution (2026-10-20)

The accompanying owner instructions override outdated suggestions in the historical audit and phases above:

- Draft PR only. No deployment. Do not click PayPal buttons or submit forms. Validate forms with existing mocked tests only.
- Restore the earlier professional visual direction; do not revert the corrected prices, terms, UTF-8 strings, or legal dates.
- Lead positioning is Houston contractors, not ecommerce or a general agency program.
- Required English hero: "Websites for Houston contractors. $0 down, $197/mo." Required subhead: "We build your new homepage first, free. Love it? Launch with $0 down."
- Hero CTAs: "Message us on Messenger" → https://m.me/1342631805590605 and "See plans" → /pay.
- Plans mirror /pay: Website $97/mo; Lead System $197/mo (Most popular); Plus (bilingual) $297/mo; Own It $1,497 one-time.
- Monthly plans: 3-month minimum from launch, then month-to-month; price locked 24 months; domain renewal included according to /pay and /terms.
- Process: message your trade; 10-minute call then free homepage preview within 2 business days; approve and subscribe on launch day.
- Guarantee must match /pay and /terms §10.2: no tracked lead triggers waiver of the 3rd and 4th charges and drops the minimum. Preserve all eligibility conditions.
- Required FAQ term: "3-month minimum from launch, then month-to-month. Cancel anytime after that by text, email or Messenger." All answers must agree with /terms.
- No testimonials, case-study result statistics, or partner claims anywhere. Never restore old badge strips or unsupported multipliers, even if present in older commits.
- Spanish: "$0 de entrada" and "Perfil de Negocio de Google". Do not add "Hablamos español" to Spanish pages.
- Preserve correct UTF-8 and the test rejecting U+00C3 and U+00C2 in locale strings.
- Terms date: "October 19, 2026" / "19 de octubre de 2026", using the privacy date formatter.
- No contradictory no-contract / no-lock-in claims.
- Supplied references: `public/assets/Plan image assets/` in the owner's original checkout. These are five branded pricing posters, not testimonials, evidence of results, or website screenshots. Recreate plan information as accessible localized HTML; do not embed English-only pricing graphics in Spanish pages.
- Professional, distinctive art direction. No decorative 01 / 02 / 03 / 04 numbering and no plain, repetitive card-only design.
- Preserve the actual existing self-hosted fonts unless a verified improvement justifies changing them.
- No owner placeholders in production. Keep missing-content requests in design documentation until supplied and approved.
