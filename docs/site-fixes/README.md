# Legal, consent, intake and footer fixes

Implemented directly on `main`, as requested. The initial implementation was reviewed without publishing; a later instruction authorized committing, pushing and deploying the local build. The separate demo-site project and the pre-existing changes to `instructions.txt` were preserved. Critical CSS is regenerated from the reviewed production build for deployment.

## Changes

- Terms and Privacy use the supplied English and Spanish documents, including PayPal billing and the SMS clauses. Draft instructions and bracket notes are removed before rendering. Both Spanish locales share the supplied Spanish wording. The legal pages use the same document layout and table of contents.
- Business identity lives in `src/config/business-identity.ts`. Phone overrides through `NEXT_PUBLIC_BUSINESS_PHONE` still work. Contact, footer, intake, legal pages and schema use the shared identity. Schema no longer publishes a Canadian address; the service area is Houston, TX and the United States. Existing phone copy now reads the shared formatter.
- Meta starts revoked before initialization and only grants after acceptance. Google Consent Mode defaults to denied globally, Clarity loads after acceptance, and GPC rejects consent unless the visitor explicitly accepts afterwards. Footer Cookie settings reopens the banner. Website CAPI callers require the accepted-consent cookie; CRM event delivery was left unchanged.
- Intake now has Quick start and optional Before launch sections, localized for English and Spanish using usted. It requires business/owner contact details, trade, plan and signature, with conditional trade-license requirements and the roofing notice. Logo/photos use text/email checkboxes because the existing integration has no file-upload support. SMS consent is optional and initially unchecked. The existing `/api/intake` payload envelope, honeypot and email delivery remain; older keys remain optional. Email records include consent, server timestamp, consent version/text, page URL, locale and a server-stamped Central-time signature date.
- Footer positioning, service/trade links and shared preview CTAs follow the brief. Trades without existing pages are shown without invented links.
- Generic locale-prefix redirects now run in middleware so `/es/terms`, `/es/privacy` and `/es/intake` save an explicit Spanish choice. Config-level generic redirects were removed to avoid conflicts with internal locale rewrites. Legal/intake metadata includes hreflang alternates.
- ESLint excludes the unrelated nested demo-site project, including its generated build output.

## Main files

- `src/config/business-identity.ts`, `src/lib/business.ts`, `src/lib/schema.ts`, `src/content/contact.ts`
- `src/content/legal/documents.json`, `src/content/legal/terms.ts`, `src/lib/legal-markdown.ts`, `src/components/page/TermsDocument.tsx`, `src/styles/routes/terms.css`
- `src/app/[locale]/{terms,privacy,intake}/page.tsx`
- `src/content/contractor-intake.ts`, `src/components/intake/ClientIntakeForm.tsx`, `src/lib/intake-submission.ts`, `src/app/api/intake/route.ts`, `src/styles/components/client-intake.css`
- `src/lib/analytics/{consent,conversion-snippet,meta-pixel,server-consent,events,landing-funnel}.ts`
- `src/components/analytics/{CookieConsent,CookieSettings,AnalyticsScripts,ThankYouConversion}.tsx`, `cloudflare/gtag-wrapper.js`
- `src/app/api/{lead,contact,booking,meta-contact}/route.ts`
- `src/components/Footer.tsx`, locale message files, `src/middleware.ts`, `src/lib/legacy-redirects.mjs`, `src/lib/metadata.ts`
- Landing copy/phone formatter consumers and shared brand casing; supporting tests, dependency files, lint configuration and `scripts/check-site-fixes.mjs`

## Validation

- `npm ci --no-audit --no-fund` passed.
- `npm test`: **610 tests passed across 61 files**, including legal rendering, default-revoked Pixel/GPC behavior, intake validation/consent records, business identity and mocked API delivery.
- `npm run lint`: passed with zero errors; 13 existing image-element warnings remain.
- `npx tsc --noEmit`: passed; the final production builds also completed their type checks.
- `npm run build` passed; the final `npx opennextjs-cloudflare build` rebuilt Next.js and successfully bundled the worker after the routing changes.
- Only one non-test source declaration contains the default phone digits. No public legal placeholders, old payment-provider wording or incorrect brand casing remain. Legacy casing strings used to normalize metadata and a design-reference comment are not public copy.
- Read-only browser checks and screenshots use `scripts/check-site-fixes.mjs`. It blocks every external request, every `/api/` request and every non-GET request. It checks all three pages in all three locales, desktop/mobile overflow, conditional license fields, optional SMS consent, language buttons, Spanish redirects and the Pixel consent queue. See `browser-checks.json` for the final result.
- Final browser run passed: 12 screenshots, all locale/consent checks successful, and zero POST attempts. The production queue begins revoked, grants after Accept, and Cookie settings reopens the banner for rejection. A legacy CSS rule hiding the landing-page banner was removed.
- Intake header follow-up: replaced the text brand link with the existing white logo and a two-option English / Español switch. Verified the logo, both switch directions, and layout at 320, 390 and 1440px without submitting the form. Intake screenshots were refreshed.

**No forms were submitted, no live API POSTs were made, and no Meta test events were sent.** API tests invoke handlers with mocked email and Meta delivery only. Browser QA does not click any submit button.

## Screenshots

| Page | English desktop | English mobile | Spanish desktop | Spanish mobile |
| --- | --- | --- | --- | --- |
| Terms | [View](screenshots/terms-en-desktop.png) | [View](screenshots/terms-en-mobile.png) | [View](screenshots/terms-es-419-desktop.png) | [View](screenshots/terms-es-419-mobile.png) |
| Privacy | [View](screenshots/privacy-en-desktop.png) | [View](screenshots/privacy-en-mobile.png) | [View](screenshots/privacy-es-419-desktop.png) | [View](screenshots/privacy-es-419-mobile.png) |
| Intake | [View](screenshots/intake-en-desktop.png) | [View](screenshots/intake-en-mobile.png) | [View](screenshots/intake-es-419-desktop.png) | [View](screenshots/intake-es-419-mobile.png) |

## Owner follow-ups before publication

- Set `LEGAL_OPERATOR_NAME` when confirmed. The operator sentence is hidden while empty.
- Set `MAILING_ADDRESS` when confirmed. Its public line is hidden while empty. The brief requests email/phone contact for privacy requests and treats the postal address needed for commercial email as a separate owner follow-up; attorney review should confirm the final identity/contact wording.
- Swap the default number to the Houston number, or use the existing environment override.
- Set `PRIVACY_EFFECTIVE_DATE` to the actual publication date if publication happens after October 19, 2026.
- Obtain attorney review of both legal documents and the pending business/tax/dispute details from the supplied drafts. No attorney approval is implied by removing draft annotations from the rendered pages.
- No draft PR was created because the later instruction explicitly required work on `main`. All changes remain available locally for review.
