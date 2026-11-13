# Graphical fixes and verification

## Fixed

- Replaced the dialog multiplication glyph with a centered SVG X. Close buttons have explicit stacking above video/iframe content and a visible keyboard focus outline.
- Scoped dialog and menu hover feedback to mouse-capable devices so touch does not retain hover colors. Dialog background feedback resets immediately on pointer exit.
- Removed the menu circles' 280ms delay and staggered link/button entrance animations. Circle feedback takes 80–100ms; the menu opens in 160–180ms and closes in 120–160ms. The burger ring, label, and bars use similarly short transitions.
- Added scrollable menu rows at short viewport heights instead of squeezing links into roughly 17px rows. Rows are at least 44px high, and the interaction handler permits scrolling inside an overflowing menu while holding the underlying page still.
- Kept video and guarantee close controls within the viewport in landscape. Long guarantee content scrolls inside its sheet.
- Fixed the Spanish review CTA overflowing at 320px by allowing button-row labels to wrap.
- Preserved the external interaction script and changed its loading strategy from idle loading to after hydration. Its URL is versioned to invalidate the long-lived static-asset cache.
- Corrected escaped MP4/WebM detection and fallback message newlines in the external script. Local media uses a native video element; external video URLs use an iframe.

## Verification

- Full Cloudflare production build passed.
- ESLint, TypeScript, JavaScript syntax, and Git whitespace checks passed.
- All 130 sitemap routes checked at 320px and 1440px: 260 browser page/viewport checks, zero document overflow or broken loaded images after font loading.
- Interaction checks passed in six Chromium configurations: 390px mouse, 390px touch, 320px touch, 844x390 landscape touch, 1440px desktop, and 390px with reduced motion.
- Checks exercised menu opening/closing, circles without delayed transitions, hover-out color reset, touch reset, landscape menu scrolling, the Industries submenu, desktop menu pointer exit, page navigation/current-page state, video and guarantee close-button hit testing, Escape dismissal, and repeated dialog opening.
- Both native video and iframe branches were checked. Native video pauses on close.

Third-party requests were blocked during the automated checks. External video playback and cross-browser rendering beyond Chromium are not certified by this check. The scan checks layout and loaded-image health; it does not prove the absence of every possible visual defect.

Evidence remains in ignored `.tmp-graphics-qa.cjs`, `.tmp-graphics-qa.json`, `.tmp-graphics-scan.cjs`, `.tmp-graphics-scan.json`, and `.tmp-graphics-build.log` files. Nothing was deployed.
