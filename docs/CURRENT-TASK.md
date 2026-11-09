# CURRENT-TASK.md

## Goal
Ship batch: 5 EN blog posts + Google review link/QR tool.

## Status
implemented locally (not deployed)

## Completed
- Posts in `POSTS` + `EN_POST_CONTENT`:
  - `/blog/how-to-ask-for-google-reviews-contractor`
  - `/blog/missed-call-text-delayed-10dlc` (Website/Own It $97 text-back add-on; Lead System/Plus $1/mo + carrier)
  - `/blog/google-business-profile-vs-website`
  - `/blog/freelancer-vs-agency-vs-subscription-website`
  - `/blog/wix-vs-squarespace-vs-managed-website-contractors`
- Tool `/tools/google-review-link-qr` (client-only Place ID → writereview URL + PNG QR)
- Sitemap/pages registry, EN-only tool (unmirrored), GA `tool_generate`, form `source=review_qr_tool`
- Blog hero stills + 640/960 variants
- `npm run typecheck` + `npm run lint` pass

## Still open
- Spanish translations for the five new posts
- Deploy + Rich Results / GA4 DebugView check
- Optional: richer custom blog hero art (current stills are branded placeholders)

## Next action
Preview locally, then deploy when ready.
