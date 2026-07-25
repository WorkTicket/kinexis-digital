# Google Ads Launch Checklist

Use this after deploying the Google Ads readiness work. The site ships conversion plumbing that **no-ops until env vars are set** — fill them in before spending.

## 1. Create conversion actions in Google Ads

In **Goals → Conversions → Summary → New conversion action**:

| Action | Type | Suggested name | Env var for label |
|---|---|---|---|
| Primary lead | Website → Submit lead form | `Lead — Form Submit` | `NEXT_PUBLIC_GADS_LABEL_LEAD` |
| Audit request | Website → Submit lead form | `Lead — Audit Request` | `NEXT_PUBLIC_GADS_LABEL_AUDIT` |
| Phone call (optional) | Website → Click to call | `Lead — Call Click` | `NEXT_PUBLIC_GADS_LABEL_CALL` |
| Booking click (optional) | Website → Page view / custom | `Lead — Booking Click` | `NEXT_PUBLIC_GADS_LABEL_BOOKING` |

For each website conversion:

1. Choose **Use Google tag** (not GTM).
2. Copy the **Conversion ID** (`AW-XXXXXXXXXX`) → `NEXT_PUBLIC_GOOGLE_ADS_ID`.
3. Copy each **Conversion label** into the matching `NEXT_PUBLIC_GADS_LABEL_*` var.
4. Enable **Enhanced conversions** (email) for form actions.
5. Set primary lead as **Primary** for bidding; audit can be secondary or primary depending on offer.

Optional destination URLs (backup signal, same conversion action — do **not** create a second action that would double-count):

- Lead: `https://www.kinexisdigital.com/en/thank-you`
- Audit: `https://www.kinexisdigital.com/en/thank-you/audit`

Conversions fire from the thank-you page via `gtag('event','conversion')` after a successful form submit.

## 2. Set production secrets / env

Cloudflare Workers / Pages (or `.env.local` for staging):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_LABEL_LEAD=xxxxxxxx
NEXT_PUBLIC_GADS_LABEL_AUDIT=xxxxxxxx
NEXT_PUBLIC_GADS_LABEL_CALL=xxxxxxxx   # only if publishing a phone number
NEXT_PUBLIC_GADS_LABEL_BOOKING=xxxxxxxx
NEXT_PUBLIC_BUSINESS_PHONE=+1XXXXXXXXXX  # optional — enables call CTAs
NEXT_PUBLIC_BOOKING_URL=https://cal.com/...  # optional — enables booking CTAs
```

Redeploy after setting `NEXT_PUBLIC_*` values so they are baked into the client bundle.

## 3. Campaign final URLs

Always use **locale-prefixed** paths so middleware does not 301:

| Campaign | Final URL |
|---|---|
| Google Ads management | `https://www.kinexisdigital.com/en/lp/google-ads-management` |
| SEO | `https://www.kinexisdigital.com/en/lp/seo` |
| Local SEO | `https://www.kinexisdigital.com/en/lp/local-seo` |
| Web design | `https://www.kinexisdigital.com/en/lp/web-design` |

Enable **auto-tagging** (`gclid`) in the Google Ads account settings.

Do **not** point Search ads at `/services/google-ads` — it 301s to `/services/ppc-management`. Use `/en/lp/google-ads-management` instead.

## 4. Verify tags

1. Open an LP with Tag Assistant / Ads preview:  
   `https://www.kinexisdigital.com/en/lp/seo?gclid=test123`
2. Accept cookies → confirm Consent Mode updates grant `ad_storage`.
3. Submit the form with a test email → land on `/en/thank-you`.
4. Confirm a `conversion` hit with `send_to: AW-…/label` in the network panel or Tag Assistant.
5. Reject cookies on a fresh session → confirm ads storage stays denied and `url_passthrough` still preserves `gclid` in the URL where applicable.
6. Check the lead email includes **GCLID** / UTM rows when present.

## 5. CSP sanity check

Conversion pixels must not be blocked. After deploy:

1. Submit a test lead with DevTools → Network / Console open.
2. Confirm no CSP violations for `googleadservices.com`, `doubleclick.net`, or `www.google.com`.
3. If `report-uri` (report-uri.com) shows new Google Ads blocks, update both:
   - `next.config.mjs` security headers
   - `public/_headers`

## 6. AdsBot crawlability

`/robots.txt` should include an explicit `AdsBot-Google` allow group. Landing pages are `noindex` via metadata (not robots disallow) so quality checks can crawl them without indexing.

## 7. Soft launch

1. Start with one campaign → one LP (recommend `google-ads-management` or `seo`).
2. Confirm conversions in Ads within 24–48h (status: Recording / Unverified → Verified).
3. Only then scale budget and clone the pattern for additional LPs.

## 8. Optional contact channels

Phone and booking CTAs render **only** when env vars are set. Provide:

- `NEXT_PUBLIC_BUSINESS_PHONE` (E.164 preferred)
- `NEXT_PUBLIC_BOOKING_URL` (Cal.com / Calendly / etc.)

Then create matching conversion actions and labels so click-to-call / booking are measurable.
