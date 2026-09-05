/**
 * First-viewport CSS inlined in <head>. Production stylesheets are loaded
 * async (see cloudflare/gtag-wrapper.js) so this is what paints LCP text.
 * Keep it small: tokens, chrome, hero type, primary button.
 */
export const CRITICAL_FIRST_PAINT_CSS = [
  "html{height:100%;background-color:var(--background,#fff);color:var(--foreground,#000)}",
  "html{color-scheme:light}",
  "html[data-theme=dark]{color-scheme:dark}",
  "body{height:100%;background:var(--background,#fff);min-height:100%;display:flex;flex-direction:column;font-family:var(--font-text),system-ui,sans-serif;font-size:18px;line-height:1.6;letter-spacing:.005em;-webkit-font-smoothing:antialiased;color:var(--foreground,#000)}",
  ":root{--background:#fff;--foreground:#000;--muted:#525252;--hero-signal:#0066ff;--accent:#0066ff;--chrome-fallback:rgba(255,255,255,.92);--chrome-glass-border:rgba(0,0,0,.08);--chrome-highlight:inset 0 1px 0 rgba(255,255,255,.55);--radius-sm:.5rem;--radius-md:.625rem;--radius-lg:.75rem;--radius-control:var(--radius-md);--site-header-h:calc(4.5rem + env(safe-area-inset-top,0px))}",
  "html[data-theme=dark]{--background:#000;--foreground:#fff;--muted:#a3a3a3;--chrome-fallback:rgba(0,0,0,.92);--chrome-glass-border:rgba(255,255,255,.14);--chrome-highlight:inset 0 1px 0 rgba(255,255,255,.14)}",
  "@media(min-width:1024px){:root{--site-header-h:calc(5rem + env(safe-area-inset-top,0px))}}",
  ".site-shell{position:relative;width:100%;min-width:0;padding-top:var(--site-header-h);display:flex;flex:1 1 auto;flex-direction:column}",
  ".site-header{position:fixed;top:0;left:0;right:0;z-index:50;background:transparent}",
  ".site-header.site-header--hidden,.site-header__frost.site-header__frost--hidden{top:calc(-1 * var(--site-header-h));pointer-events:none}",
  ".site-header__frost{position:fixed;top:0;left:0;right:0;z-index:49;height:var(--site-header-h);pointer-events:none;background-color:var(--chrome-fallback);border-bottom:1px solid var(--chrome-glass-border);box-shadow:var(--chrome-highlight)}",
  ".site-header__bar{display:flex;align-items:center;height:4.5rem;max-width:none;padding-inline:max(1.25rem,env(safe-area-inset-left,0px)) max(1.25rem,env(safe-area-inset-right,0px))}",
  "@media(min-width:1024px){.site-header__bar{height:5rem}}",
  ".site-header__logo img{height:1.5rem;width:auto}",
  ".brand-logo--on-dark{display:none}",
  "html[data-theme=dark] .brand-logo--on-light{display:none}",
  "html[data-theme=dark] .brand-logo--on-dark{display:block}",
  ".shell{margin-inline:auto;width:100%;max-width:100rem;padding-inline:max(1.25rem,env(safe-area-inset-left,0px)) max(1.25rem,env(safe-area-inset-right,0px))}",
  ".shell--cinema{max-width:112rem}",
  ".page-hero,.hero-shell{position:relative;display:flex;flex-direction:column}",
  ".hero-shell--film{min-height:100svh}",
  ".hero-stage{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;padding-top:clamp(2.75rem,5.5vh,4.75rem);padding-bottom:clamp(6.5rem,16vh,11rem)}",
  ".hero-copy{position:relative;z-index:3;max-width:min(52rem,100%);text-align:center;margin-inline:auto}",
  "@media(min-width:768px){.hero-copy{text-align:left;margin-inline:0}}",
  ".hero-enter-2{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:clamp(2.75rem,7.5vw + .15rem,6.75rem);font-weight:700;line-height:.92;letter-spacing:-.045em;text-wrap:balance;color:var(--foreground)}",
  ".hero-lede{max-width:min(36rem,100%);color:var(--muted);text-wrap:pretty}",
  ".hero-brand{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:clamp(.8125rem,1.1vw,.9375rem);font-weight:700;letter-spacing:.28em;text-transform:uppercase}",
  ".hero-enter,.hero-enter-1,.hero-enter-2,.hero-enter-3,.hero-enter-4,.hero-enter-4b,.hero-enter-5{opacity:1}",
  ".hero-film-media{display:none}",
  "@media(min-width:1024px){.hero-film-media{display:block;position:absolute;inset:0;width:100%;height:100%;object-fit:cover}}",
  ".btn{display:inline-flex;align-items:center;justify-content:center;gap:.625rem;border:1px solid transparent;border-radius:var(--radius-control);font-weight:700;text-decoration:none;cursor:pointer}",
  ".btn--primary{background:var(--accent);color:#fff;border-color:var(--accent)}",
  ".btn--xl{min-height:3.85rem;padding:1.15rem 2.25rem;font-size:1.0625rem;border-radius:var(--radius-lg)}",
  ".btn--header{height:2.25rem;padding-inline:1rem;font-size:.8125rem;border-radius:var(--radius-sm)}",
  ".btn--link{background:none;border:0;color:var(--foreground);text-decoration:none}",
  ".hero-cta-row{display:flex;flex-direction:column;gap:1.5rem;width:100%;max-width:34rem}",
  "@media(min-width:768px){.hero-cta-row{flex-direction:row;align-items:center;max-width:none}}",
  ".flex{display:flex}.flex-col{flex-direction:column}.items-center{align-items:center}.ml-auto{margin-left:auto}.hidden{display:none}.relative{position:relative}.shrink-0{flex-shrink:0}",
  "@media(min-width:1024px){.lg\\:block{display:block}.lg\\:flex{display:flex}.lg\\:hidden{display:none}}",
  ".text-foreground{color:var(--foreground)}.text-muted{color:var(--muted)}.font-bold{font-weight:700}",
  "html.cookie-pending body{padding-bottom:6.5rem}",
].join("");

/** After first paint, force async stylesheets to apply if onload did not. */
export const ASYNC_CSS_BOOT_SCRIPT =
  "(function(){var a=function(){document.querySelectorAll('link[data-kinexis-async]').forEach(function(l){l.media='all'})};if('requestAnimationFrame'in window)requestAnimationFrame(function(){requestAnimationFrame(a)});else setTimeout(a,0)})();";
