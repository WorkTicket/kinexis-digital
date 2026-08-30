# Google Ads Launch Checklist

The Google tag (`AW-18409243306`) starts downloading from the first inline `<head>` script. The **Submit lead form (1)** event snippet is in the document `<head>` and fires on `/thank-you` and `/thank-you/audit` page load as `AW-18409243306/AtDSCIa1--ccEKqFm8pE`. Real form submits also fire that conversion immediately, then skip a second hit on thank-you.

## What’s already built

- Consent Mode v2 + gtag (GA4 live: `G-Z8245BRX2L`)
- Google Ads event snippet in `<head>` (page-load conversion on `/thank-you*`)
- Form → thank-you conversions with Enhanced Conversions (email + optional phone)
- Thank-you conversions fire on page load without waiting for a cookie-banner click (Consent Mode still sends cookieless / modeled pings when denied or pending)
- gclid / gbraid / wbraid + UTM + landing page capture into lead emails
- Dedicated landers: `/lp/google-ads-management`, `/lp/seo`, `/lp/local-seo`, `/lp/web-design`
- LP forms: name + email required; phone, website, details optional (web-design LP requires website URL)
- LP submits use the **audit** conversion path → `/thank-you/audit` (falls back to LEAD label if AUDIT unset)
- `/lp/web-design` is the Search final URL for web design/development: message-matched H1, on-page form, site samples, process, no service-page exit
- Contact form: name, email, company, phone, service, message
- Strategy-call booking fires booking conversion on submit **with email** for Enhanced Conversions
- Slim chrome + mobile sticky CTA on landers (offset above cookie banner while pending)
- Click-to-call tracking when `NEXT_PUBLIC_BUSINESS_PHONE` is set

## 1. Create conversion actions in Google Ads

In **Goals → Conversions → Summary → New conversion action**:

| Action | Type | Suggested name | Env var for label |
|---|---|---|---|
| Primary lead | Website → Submit lead form | `Lead — Form Submit` | `NEXT_PUBLIC_GADS_LABEL_LEAD` |
| Audit / LP review | Website → Submit lead form | `Lead — Audit Request` | `NEXT_PUBLIC_GADS_LABEL_AUDIT` |
| Google web-design lander | Website → Submit lead form | `Lead — Web design (Google)` | `NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN` |
| Meta web-design lander | Website → Submit lead form | `Lead — Web design (Facebook)` | `NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN` |
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

LP conversions fire from `/thank-you/audit` via the page-load event snippet. Contact message forms use `/thank-you`. Bookings fire on submit (not again on thank-you).

## 2. Set production secrets

Add these as **GitHub Actions secrets** (deploy workflow reads them) and/or Cloudflare build env:

```
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18409243306
NEXT_PUBLIC_GADS_LABEL_LEAD=AtDSCIa1--ccEKqFm8pE
NEXT_PUBLIC_GADS_LABEL_AUDIT=xxxxxxxx
NEXT_PUBLIC_GADS_LABEL_LP_WEB_DESIGN=xxxxxxxx
NEXT_PUBLIC_GADS_LABEL_LP_FACEBOOK_WEB_DESIGN=xxxxxxxx
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

1. View source on any page and confirm `gtag/js?id=AW-18409243306` plus  
   `gtag('event', 'conversion', {'send_to': 'AW-18409243306/AtDSCIa1--ccEKqFm8pE'})`.
2. Open `/thank-you` in Tag Assistant — the conversion event should fire on page load.
3. Open an LP with Tag Assistant:  
   `https://www.kinexisdigital.com/lp/seo?gclid=test123`
4. Submit the form → land on `/thank-you/audit` → confirm `send_to: AW-…/AtDSCIa1--ccEKqFm8pE` (or the audit label if set).
5. Fresh session → leave the cookie banner untouched → submit again → conversion still fires (cookieless / modeled).
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
