# Attribution audit

## Findings

- Marketing forms now carry consented first-touch `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, and external referrer origin/path into the contact notification. They are stored only in per-tab `sessionStorage` after analytics consent; click IDs additionally require ads consent. Withdrawal clears the attribution state. No persistent browser identifier or cookie was introduced.
- **Precedence:** the first valid occurrence of each field during the consented tab session wins; later navigations only fill fields not already captured. A parameter appearing more than once on one URL is omitted rather than arbitrarily choosing one. A direct visit is not synthesized as a campaign value. Without analytics consent, values are not stored or attached; without ads consent, Meta/Google click IDs are omitted.
- Referrer query and fragment are stripped and only external HTTP(S) origin/path is retained. Values are bounded and allowlisted client-side and independently sanitized server-side. Attribution is attached only to marked preview/audit flows; arbitrary client fields are not trusted, and the API rechecks consent cookie bits.
- Conferbot's extractor maps landing page, referrer, and UTM source/medium/campaign when supplied by the provider. It does not establish application-wide attribution, nor content/term/click-ID support; integration remains feature-gated and external delivery unverified.
- Consent UI separates analytics and ads. Attribution is now tab-scoped and consent-gated as described above; review the basis and lead-notification retention with the owner before release.
- Query parameters can be duplicated, malformed, conflicting, or sensitive. Existing form flow neither resolves nor forwards them, so it does not currently create query-string exposure in mail or public API logs. RUM deliberately strips query strings from paths.

## Coverage and remediation

Correction is covered by a mocked contact-route fixture for permitted/denied consent, click-ID gating, malformed/oversized values, and referrer query removal, plus Playwright first-touch navigation coverage. Do not treat client-submitted attribution as independently verified. Contact notification email is the existing lead sink; its retention/access policy remains an owner/operational matter, not verified here.
