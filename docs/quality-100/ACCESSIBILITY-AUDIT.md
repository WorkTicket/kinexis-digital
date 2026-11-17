# Phase 5 accessibility audit

## Automated

Lighthouse accessibility (local dev build, Lighthouse 13.6, mobile emulation 390×844, one run per route):

| Route | Score |
|---|---:|
| `/` | 1.00 |
| `/pricing` | 1.00 |
| `/contact` | 1.00 |
| `/portfolio` | 1.00 |
| `/lp/phoenix-preview` | 1.00 |
| `/es` | 1.00 |

This is a useful automated sample, not a WCAG 2.2 AA certification. It does not cover every WCAG criterion, state, route, browser, assistive technology, or third-party component.

The rendered 13-route by seven-width matrix found no unnamed visible controls after accounting for linked-image `alt` text, no broken images, no uncaught browser page errors, and no page-level overflow after fixes.

## Targeted manual browser checks

| Check | Result |
|---|---|
| Skip navigation | EN and ES skip links are first in the keyboard sequence and target `#content`; main landmark is present. |
| Landmarks and headings | One `main` landmark and one visible H1 were confirmed on sampled home, contact, audit, pricing, and payment pages. Full heading-outline review was not performed. |
| Document language | `lang="en"` on English samples and `lang="es"` on `/es` and `/es/contact`. |
| Form labels | Visible labels associate with representative preview and audit fields in English and Spanish. Required fields and autocomplete values were checked on contact. |
| Locale switching | English and Spanish controls provide working locale home/same-route destinations on sampled pages; every mirror was not tested. |
| Keyboard navigation | Skip link is reachable first. Consent opens with focus in the dialog, Tab and Shift+Tab stay within its controls, Escape rejects optional categories, closes it, and focuses the preferences launcher. |
| Consent accessible semantics | Dialog has `role="dialog"`, `aria-modal="true"`, and an accessible title; preferences use a labeled group and labeled checkboxes. |
| Visible focus | Lighthouse passed its sampled accessibility audits; focused consent controls and skip navigation were verified in Chromium. Site-wide focus appearance was not manually inspected control-by-control. |
| Touch targets | No visible contact-form controls below 24×24 CSS px were found in the sampled DOM scan. Payment UI includes native radio/checkbox controls around 18×18px; verify effective target spacing and WCAG 2.2 target-size exceptions manually. |
| Conferbot | Existing fixture verifies launcher positioning, not the real third-party widget’s accessible name, keyboard behavior, or screen-reader output. |

## Fix made

The cookie consent panel had modal ARIA but no keyboard focus management. It now moves focus into the panel when opened, loops keyboard focus within visible panel controls, treats Escape as reject (no optional tracking), and focuses the preferences launcher on close. `e2e/responsive-regressions.spec.ts` covers entry, containment, Escape, and safe rejection.

## Not established / follow-up

- No NVDA, JAWS, VoiceOver, TalkBack, or other assistive-technology testing.
- No complete WCAG 2.2 AA manual criterion-by-criterion assessment.
- Contrast and non-text contrast need manual verification with approved color pairs, especially subtle borders, disabled states, and controls.
- No 200%/400% browser zoom, text-only resizing, or mobile orientation audit.
- Dynamic form announcements and all client/server error, loading, and success states were not exhaustively reviewed. Existing conversion tests cover mock delivery failure/success behavior but do not replace screen-reader testing.
- Payment-provider and live chatbot interfaces were not tested against external providers.

**Conclusion:** automated and targeted checks found no critical remaining keyboard/label defect in the sampled first-party flows after the consent fix. WCAG 2.2 AA conformance is not certified; manual testing remains a release follow-up.
