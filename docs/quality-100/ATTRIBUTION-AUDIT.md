# Attribution audit

## Findings

- Marketing form submissions do not read or preserve UTM source/medium/campaign/content/term, `fbclid`, `gclid`, or referrer. `Form.tsx` renders only the explicit lead fields/hidden caller-provided fields; `boot.js` constructs `FormData` and posts it unchanged. `/api/contact` relays submitted fields in the notification body but has no canonical attribution parser/model.
- The conversion event uses the current path as `page_path` and form data `source`/`landing_page` where present. No persistent first-touch/last-touch capture or cross-page propagation was found. No default direct attribution is fabricated.
- Conferbot's extractor maps landing page, referrer, and UTM source/medium/campaign when supplied by the provider. It does not establish application-wide attribution, nor content/term/click-ID support; integration remains feature-gated and external delivery unverified.
- Consent UI separates analytics and ads. No consent-dependent campaign storage exists because no marketing form attribution storage exists. Do not add browser persistence or transmit advertising click identifiers until consent basis, retention, and recipient are approved.
- Query parameters can be duplicated, malformed, conflicting, or sensitive. Existing form flow neither resolves nor forwards them, so it does not currently create query-string exposure in mail or public API logs. RUM deliberately strips query strings from paths.

## Coverage and remediation

No attribution defect was changed in this phase. A safe follow-up should agree on first-touch versus last-touch, permitted consent states, allowlisted parameter lengths/character set, referrer origin/path handling, and notification retention; then use deterministic fixtures for missing, duplicate, conflicting, malformed, and oversized values. Do not trust attribution submitted by a client as verified campaign data. No client identifiers are emitted into public logs by the inspected path.
