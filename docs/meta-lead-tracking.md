# Meta server-side lead tracking

The `/lp/get-a-website` form submits to `/api/lead`. After successful lead email
handling, the API sends a Meta Conversions API `Lead` for pixel `2080705549212381`.
Email and phone are SHA-256 hashed. The payload includes the browser event ID
for Pixel deduplication, available `_fbp` / `_fbc` attribution, IP, user agent,
and landing URL. Failed validation and email delivery errors do not send events.
Meta delivery failure is logged without rejecting the captured lead.

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
