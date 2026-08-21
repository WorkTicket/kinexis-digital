# Google Ads Launch Checklist

The site ships conversion plumbing that **no-ops until env vars are set**. Fill them in, redeploy, then spend.

Deploy fails if Ads ID is set without `NEXT_PUBLIC_GADS_LABEL_LEAD` (see `scripts/check-ads-env.mjs`).

## What’s already built

- Consent Mode v2 + gtag (GA4 live: `G-Z8245BRX2L`)
- Form → thank-you conversions with Enhanced Conversions (email + optional phone)
- gclid / gbraid / wbraid + UTM + landing page capture into lead emails
- Dedicated landers: `/lp/google-ads-management`, `/lp/seo`, `/lp/local-seo`, `/lp/web-design`
- LP forms: name + email required; phone, website, details optional
- LP submits use the **audit** conversion path → `/thank-you/audit` (falls back to LEAD label if AUDIT unset)
- Contact form: name, email, company, phone, service, message
- Strategy-call booking fires booking conversion on submit **with email** for Enhanced Conversions
- Slim chrome + mobile sticky CTA on landers (offset above cookie banner while pending)
- Thank-you conversions fire after accept **or** reject (Consent Mode models when denied)
- Click-to-call tracking when `NEXT_PUBLIC_BUSINESS_PHONE` is set

## 1. Create conversion actions in Google Ads

In **Goals → Conversions → Summary → New conversion action**:

| Action | Type | Suggested name | Env var for label |
|---|---|---|---|
| Primary lead | Website → Submit lead form | `Lead — Form Submit` | `NEXT_PUBLIC_GADS_LABEL_LEAD` |
| Audit / LP review | Website → Submit lead form | `Lead — Audit Request` | `NEXT_PUBLIC_GADS_LABEL_AUDIT` |
| Phone call (optional) | Website → Click to call | `Lead — Call Click` | `NEXT_PUBLIC_GADS_LABEL_CALL` |
| Booking (optional) | Website → Submit / custom | `Lead — Booking` | `NEXT_PUBLIC_GADS_LABEL_BOOKING` |

For each website conversion:

1. Choose **Use Google tag** (not GTM).
2. Copy the **Conversion ID** (`AW-XXXXXXXXXX`) → `NEXT_PUBLIC_GOOGLE_ADS_ID`.
3. Copy each **Conversion label** into the matching `NEXT_PUBLIC_GADS_LABEL_*` var.
4. Enable **Enhanced conversions** (email) for form actions.
5. Set primary lead as **Primary** for bidding; audit can be primary for Search campaigns that land on `/lp/*`.

Destination URLs (backup signal — do **not** create a second action that would double-count):

- Contact / general lead: `https://www.kinexisdigital.com/thank-you`
- LP audit / review: `https://www.kinexisdigital.com/thank-you/audit`

LP conversions fire from `/thank-you/audit` via `gtag('event','conversion')` after a successful form submit. Contact message forms use `/thank-you`. Bookings fire on submit (not again on thank-you).

## 2. Set production secrets

Add these as **GitHub Actions secrets** (deploy workflow reads them) and/or Cloudflare build env:

```
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
NEXT_PUBLIC_GADS_LABEL_LEAD=xxxxxxxx
NEXT_PUBLIC_GADS_LABEL_AUDIT=xxxxxxxx
NEXT_PUBLIC_GADS_LABEL_CALL=xxxxxxxx   # only if publishing a phone number
NEXT_PUBLIC_GADS_LABEL_BOOKING=xxxxxxxx
NEXT_PUBLIC_BUSINESS_PHONE=+1XXXXXXXXXX  # optional — enables call CTAs + schema telephone
```

Redeploy after setting `NEXT_PUBLIC_*` values so they are baked into the client bundle.

## 3. Campaign final URLs

Use unprefixed paths. `/en/lp/*` 301s onto `/lp/*`.

| Campaign | Final URL |
|---|---|
| Google Ads management | `https://www.kinexisdigital.com/lp/google-ads-management` |
| SEO | `https://www.kinexisdigital.com/lp/seo` |
| Local SEO | `https://www.kinexisdigital.com/lp/local-seo` |
| Web design | `https://www.kinexisdigital.com/lp/web-design` |

Enable **auto-tagging** (`gclid`) in the Google Ads account settings.

Do **not** point Search ads at `/services/google-ads` — it 301s to `/services#paid-media`. Use `/lp/google-ads-management` instead.

## 4. Verify tags

1. Open an LP with Tag Assistant:  
   `https://www.kinexisdigital.com/lp/seo?gclid=test123`
2. Accept cookies → confirm Consent Mode grants `ad_storage`.
3. Submit the form → land on `/thank-you/audit`.
4. Confirm a `conversion` hit with `send_to: AW-…/label` (audit label, or lead if audit unset).
5. Fresh session → reject cookies → submit again → conversion still fires (cookieless / modeled).
6. Check the lead email includes **GCLID** / UTM / landing page rows when present.
7. Book a strategy call on `/contact` → confirm booking conversion includes Enhanced Conversions email.

## 5. Soft launch

1. One campaign → one LP (recommend `google-ads-management` or `seo`).
2. Confirm conversions in Ads within 24–48h (Recording → Verified).
3. Scale budget and clone for additional LPs.

## 6. Conversion UX notes

- LP forms: name + email required; phone / website / details optional (better Enhanced Conversions + sales context).
- Contact page: strategy-call booking or message form (company + phone collected).
- Cookie banner remains on landers (required for Consent Mode); sticky CTA lifts above it while pending.
- Phone CTAs appear only when `NEXT_PUBLIC_BUSINESS_PHONE` is set.
