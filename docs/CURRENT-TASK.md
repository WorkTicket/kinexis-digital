# CURRENT-TASK.md

## Goal
Improve homepage hero poster and section art image quality without breaking speed optimizations.

## Status
complete

## Changed files
- src/components/HeroFilm.tsx - Updated poster srcset to 640/768/960 widths, sizes to responsive, dimensions to 960x540
- public/assets/video/kinexis-explainer-v5f-preview-poster.* - Replaced with 960x540 HQ versions (webp 27.7KB, avif 20.5KB)
- public/assets/video/kinexis-explainer-v5f-preview-poster-640.* - HQ 640x360 variants (webp 17.4KB, avif 12.5KB)
- public/assets/video/kinexis-explainer-v5f-preview-poster-768.* - New HQ 768x432 variants (webp 21.8KB, avif 15.1KB)
- public/assets/video/kinexis-explainer-v5f-preview-poster-960.* - New HQ 960x540 variants (webp 27.7KB, avif 20.5KB)
- public/assets/home/built-for-your-trade.* - Re-encoded at quality 90/85 (src 377KB, variants 38-174KB)
- public/assets/home/google-reviews-handled.* - Re-encoded at quality 90/85 (src 141KB, variants 18-77KB)
- public/assets/home/what-every-site-includes.* - Re-encoded at quality 90/85 (src 235KB, variants 26-113KB)

## Completed
- Extracted high-quality frame from source video (960x540) for hero poster
- Generated WebP/AVIF poster variants at 640/768/960 widths
- Updated HeroFilm.tsx responsive srcset, sizes, and intrinsic dimensions
- Re-encoded all three homepage section art source images at higher WebP quality (90 src / 85 variants)
- Regenerated responsive variants (640/768/1120) at higher quality
- Typecheck and lint pass

## Unfinished
none

## Errors/blockers
none

## Next action
none

## Notes
- Hero poster: 7.6KB → 27.7KB at full res (~3.6x quality improvement), mobile 640w stays at 17.4KB
- Section art sources: 948KB-1.6MB → 141KB-377KB at higher quality (more efficient encoding)
- All assets use WebP + AVIF with responsive srcset for speed
- AVIF variants ~25-30% smaller than WebP for modern browsers
