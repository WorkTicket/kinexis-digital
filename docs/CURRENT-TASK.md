# CURRENT-TASK.md

## Goal
Improve homepage hero poster and section art image quality; fix scroll lock when video popups are open; deploy to live site.

## Status
complete

## Changed files
- src/components/HeroFilm.tsx - Updated poster srcset to 640/768/960 widths, sizes to responsive, dimensions to 960x540
- public/assets/video/kinexis-explainer-v5f-preview-poster.* - Replaced with 960x540 HQ versions
- public/assets/video/kinexis-explainer-v5f-preview-poster-640/768/960.* - New HQ variants (WebP + AVIF)
- public/assets/home/built-for-your-trade.* - Re-encoded at higher quality (quality 90 src / 85 variants)
- public/assets/home/google-reviews-handled.* - Re-encoded at higher quality
- public/assets/home/what-every-site-includes.* - Re-encoded at higher quality
- public/assets/js/boot.js - Fixed scroll lock: save/restore scroll position, apply overflow+position to html+body
- docs/CURRENT-TASK.md - Updated

## Completed
- Hero poster: 7.6KB → 27.7KB at full res (~3.6x quality improvement), mobile 640w stays at 17.4KB
- Section art sources re-encoded at higher WebP quality
- Scroll lock fixed for video/guarantee dialogs
- Committed and pushed to copy/differentiate branch
- Deployed to Cloudflare Workers (live site: kinexisdigital.com, www.kinexisdigital.com)
- All post-deploy checks passed (SEO, sitemap, IndexNow, 135 URLs)
- Typecheck and lint pass

## Unfinished
none

## Errors/blockers
none

## Next action
none

## Notes
- All assets use WebP + AVIF with responsive srcset; mobile hero poster under 20KB
- Scroll lock now applies position:fixed to body with saved scrollY to prevent background scroll during dialogs
- Version ID: 2cb548ea-038c-4ae0-b4fb-ada0bc590824
