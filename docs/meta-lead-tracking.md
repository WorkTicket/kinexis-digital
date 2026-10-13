# Meta server-side lead tracking

The `/lp/get-a-website` form submits to `/api/lead`. After successful lead email
handling, the API sends a Meta Conversions API `Lead` for pixel `2080705549212381`.
Email and phone are SHA-256 hashed. The payload includes the browser event ID
for Pixel deduplication, available `_fbp` / `_fbc` attribution, IP, user agent,
and landing URL. Failed validation and email delivery errors do not send events.
Meta delivery failure is logged without rejecting the captured lead.

Lead match data also includes hashed first/last name (split from the collected
full name) and a stable external ID derived from normalized email. Browser
advanced matching already supplies email and phone. Lead deduplication IDs
remain unchanged.

Owners with a budget starting at $500 and a timeline of Next 30 days or
1–3 months also produce a server-only `QualifiedLead` with a separate UUID
and the same match data. Partner/manager/employee and researching responses
do not qualify.

UTM source, medium, campaign and content persist in session storage with a
first-party cookie fallback and travel in submissions and both email formats.
Notifications go through Cloudflare Email Sending to `hello@kinexisdigital.com`
(`CONTACT_TO_EMAIL`); there is no separate lead database in this route.

## Production setup

Generate an access token for this pixel in Meta Events Manager under
Settings > Conversions API. Store it as a server secret for the `kinexis-digital`
Cloudflare Worker, using the dashboard or this interactive command:

```powershell
npx wrangler secret put META_CAPI_ACCESS_TOKEN
```

Never place the token in a `NEXT_PUBLIC_` variable, source code, or chat.
For local testing, use `META_CAPI_ACCESS_TOKEN` in `.env.local`.

Deploy the code with the project's normal deployment workflow. To verify in
Events Manager > Test Events, temporarily set its test code:

```powershell
npx wrangler secret put META_CAPI_TEST_EVENT_CODE
```

Submit a valid form on the landing page and confirm a server `Lead` appears with
the same event ID as its browser event. Calendar confirmation separately sends
`Schedule`. Remove the test code after verification:

```powershell
npx wrangler secret delete META_CAPI_TEST_EVENT_CODE
```

Check Worker logs for `Meta CAPI Lead sent`, missing credentials, or HTTP/network
errors. A successful form response alone does not prove Meta accepted the event.
