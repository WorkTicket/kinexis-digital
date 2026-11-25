# Production readiness — October 22, 2026

The identified code and packaging blockers are fixed. The rebuilt Worker passes local production checks. Nothing was deployed; live email delivery and payment transactions remain untested.

## Fixes

- Cloudflare packaging now includes OpenTelemetry's ESM files in the middleware trace and standalone output. OpenTelemetry is an explicit dependency. Deployment, upload, and preview commands use a full adapter build.
- Payment query parameters are read on the server. Client components receive the selected plan and invoice status without synchronously setting state in mount effects.
- Booking availability uses a clock state refreshed every minute instead of calling Date.now during render.
- Lint excludes scratch files; unused imports/props are removed and sticker alt text is explicit. The Next image-optimizer recommendation is disabled intentionally because this project disables that optimizer and serves pre-encoded images. React correctness and accessibility rules remain enabled.
- Hero benefit text wraps on mobile. Hero buttons use shrinkable grid columns and wrapped labels, fixing overflow at both 390px and 320px.
- Contact delivery supports the existing production Gmail secrets, TLS, timeouts, buffered attachments, and both CONTACT_TO and CONTACT_TO_EMAIL recipient settings. Mailgun and endpoint delivery remain supported.
- Without PAYPAL_CLIENT_SECRET, the payment page offers a contact link for a secure invoice payment link instead of a checkout form that cannot complete. Adding that secret enables invoice checkout.

## Final validation

| Check | Result |
| --- | --- |
| Full Cloudflare production build | Pass; Worker generated |
| Lint | Pass; zero warnings/errors |
| TypeScript | Pass |
| Mocked contact delivery | Pass; no email sent |
| Workers-runtime sitemap routes | 130 passed |
| Referenced static assets | 327 passed |
| Invalid contact/invoice submissions | Expected 400 responses |
| Unknown page and legacy redirect | Expected 404 and 308 responses |
| Representative mobile/desktop browser loads | 18 passed; no overflow, broken loaded images, or JavaScript page exceptions |
| English and both Spanish homepages | 18 additional checks at 320, 375, 390, 640, 768, and 1440px; no horizontal overflow |
| Payment selection | All four plans and invalid-plan fallback passed |
| Missing invoice-secret UI | Payment-link fallback verified |
| Git whitespace check | Pass |

Browser checks block third-party requests. Contact regression checks use a mocked SMTP transport and cover recipient settings, booking/update subjects, attachments, invalid input, honeypot handling, SMTP failure, and missing configuration. Run npm run check:contact to repeat them.

## Production configuration verified

- Read-only Cloudflare metadata confirms Gmail secret names and CONTACT_TO_EMAIL on the active Worker. Secret values were not retrieved or exposed. The PayPal invoice server secret is absent.
- The active production version checked was be48f6a8-f31e-4e67-bb26-d931024298b8. Its compatibility date is 2025-04-01; the repository uses 2026-10-01 and was tested in the matching local Workers runtime.
- The live apex homepage redirects to the canonical www host with 301. The canonical homepage, robots.txt, and sitemap.xml returned 200 with X-Content-Type-Options: nosniff.
- Live responses did not expose X-Frame-Options. The repository sets DENY; live headers must be checked after deployment because the active version predates these changes.

## Remaining release verification

After deployment, verify real contact/booking delivery to the intended inbox and PayPal subscription approval using the approved account workflow. No email was sent, no payment was created, and nothing was deployed during this task. Invoice checkout remains on the payment-link fallback until the PayPal server secret is supplied.

Local ignored evidence includes .tmp-final-cloudflare.log, .tmp-fixed-worker.log, .tmp-readiness-routes.json, .tmp-readiness-browser.json, and read-only Worker metadata files. The contact regression check is retained in scripts/check-contact-delivery.mjs.
