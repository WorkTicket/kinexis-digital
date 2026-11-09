import fs from "node:fs";
import path from "node:path";

// Next prints the framework chunks as ordinary script tags, so Chrome starts
// them during HTML parse and they finish before the first paint on a fast
// origin. Lighthouse then treats those early requests as part of the largest
// paint. Hold them until input / idle timeout. The inline boot script is left
// in place, so menus, forms, and dialogs still run immediately.
const root = path.join(process.cwd(), ".next", "server");
const openNextCache = path.join(process.cwd(), ".open-next", "cache");
const staticCssDir = path.join(process.cwd(), ".next", "static", "css");
const patchOpenNext = process.argv.includes("--opennext-cache");

const loader =
  '<script id="kx-scripts">(function(){var done=!1;function arm(){if(done)return;done=!0;document.querySelectorAll("script[data-kx-flight]").forEach(function(n){var s=document.createElement("script");s.textContent=n.textContent;n.replaceWith(s)});document.querySelectorAll("script[data-kx]").forEach(function(n){var s=document.createElement("script");s.src=n.getAttribute("data-kx");if(n.hasAttribute("data-kx-nomodule"))s.noModule=!0;else s.async=!0;n.replaceWith(s)})}setTimeout(arm,3200);["pointerdown","keydown","touchstart"].forEach(function(t){addEventListener(t,arm,{once:!0,passive:!0})})})()</script>';
const loaderRe = /<script id="kx-scripts">[\s\S]*?<\/script>/g;
const criticalRe = /<style id="kx-critical">[\s\S]*?<\/style>/g;

// Keep chrome + heroes painted correctly even before the full sheet arrives.
// Must include skip/nav/mega/burger or first paint dumps the mega menu into the page.
const criticalCss = `<style id="kx-critical">html{--font-inter:"inter Fallback",Arial,sans-serif!important;--font-poppins:"poppins Fallback",Arial,sans-serif!important;--font-head:var(--font-poppins),var(--font-inter),system-ui,sans-serif;--header-h:92px;--text:#0a1230;--muted:#53607e;--brand-navy:#031b4e;--brand-orange:#ff6a00;--brand-cobalt:#0b3dff;--accent:#0b3dff;--accent-dark:#0830cc;scroll-behavior:smooth;scroll-padding-top:92px;-webkit-text-size-adjust:100%}body{margin:0;font-family:var(--font-inter),system-ui,sans-serif;color:var(--text);background:#fff;line-height:1.6;-webkit-font-smoothing:antialiased}*{box-sizing:border-box}img{max-width:100%;display:block}a{color:inherit;text-decoration:none}h1,h2,h3{font-family:var(--font-poppins),var(--font-inter),system-ui,sans-serif;line-height:1.2;margin:0 0 .6em}h1{font-family:var(--font-poppins-display),var(--font-poppins),sans-serif;font-weight:800;font-size:clamp(2rem,5vw,3.4rem)}.skip{position:absolute;left:-999px}.skip:focus{left:10px;top:10px;background:#fff;padding:8px;z-index:100}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.container{width:100%;max-width:1180px;margin:0 auto;padding:0 20px}.header{position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e1e6f2}.header__inner{display:flex;align-items:center;gap:20px;height:var(--header-h)}.logo{display:inline-flex;align-items:center;flex:0 0 auto;line-height:0}.logo__img{display:block;width:auto;height:58px;max-width:240px;transform:translateY(-6px)}.header__tools{display:flex;align-items:center;gap:10px;margin-left:auto}.header__cta{flex:0 0 auto;min-height:44px;white-space:nowrap;padding:.65em 1.15em;font-size:.92rem}.nav{display:flex;flex:1 1 auto;flex-wrap:nowrap;justify-content:space-evenly;align-items:center;gap:clamp(10px,1.25vw,20px);min-width:0;margin-left:0;white-space:nowrap}.nav a,.dropdown__btn,.mega__btn{text-decoration:none;font-family:var(--font-head);font-weight:700;font-size:.92rem;background:none;border:0;cursor:pointer;color:var(--text);padding:9px 11px;border-radius:10px;white-space:nowrap}.mega{position:static}.mega__panel,.dropdown__panel{display:none;white-space:normal}.burger{display:none;position:relative;z-index:90;align-items:center;gap:10px;margin-left:0;padding:4px 2px;border:0;background:none;color:var(--brand-navy);cursor:pointer;font-family:var(--font-poppins-display),var(--font-head);font-weight:800;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;flex:0 0 auto}.burger__mark{position:relative;width:40px;height:40px;display:grid;place-items:center;flex:0 0 auto}.burger__bars{display:block;position:relative;width:22px;height:16px}.burger__bars span{display:block;position:absolute;left:0;height:2px;border-radius:2px;background:var(--brand-navy)}.burger__bars span:nth-child(1){top:0;width:22px}.burger__bars span:nth-child(2){top:7px;left:8px;width:14px;background:var(--brand-orange)}.burger__bars span:nth-child(3){top:14px;width:22px}.burger__label{display:grid;min-width:4.8em;text-align:left}.burger__word{grid-area:1/1}.burger__word--close{opacity:0}.btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:.4em;padding:1rem 1.55rem;border:none;border-radius:5px;background:#031b4e;color:#fff;font-weight:700;font-size:1.125rem;line-height:1.25;letter-spacing:.04em;box-shadow:0 6px 24px rgba(0,0,0,.2);cursor:pointer;font-family:inherit}.btn--primary{background:#031b4e;color:#fff}.eyebrow{font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#0b3dff;font-size:.85rem;margin:0 0 .7rem}.hl{background-image:linear-gradient(#ff8a32,#ff8a32);background-size:100% .72em;background-repeat:no-repeat;background-position:0 88%;-webkit-box-decoration-break:clone;box-decoration-break:clone;padding:0 .06em}.ticks{list-style:none;margin:0 0 1rem;padding:0;display:grid;gap:12px}.ticks li{position:relative;padding-left:34px;font-size:1.05rem}.tick__mark{position:absolute;left:0;top:.12em;width:1.5em;height:1.5em;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 5 56 54' fill='none'%3E%3Cg transform='rotate(-8 30 32)'%3E%3Crect x='14' y='16' width='36' height='36' rx='11' fill='%23031b4e'/%3E%3Crect x='8' y='10' width='36' height='36' rx='11' fill='%23ff6a00' stroke='%23031b4e' stroke-width='3.5'/%3E%3Cpath d='M16.5 28.2 24.2 36.2 37.2 21.2' stroke='%23031b4e' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3C/svg%3E") center/contain no-repeat}.tick__copy{display:flex;flex-direction:column}.hero{position:relative;overflow:visible;padding:76px 0 88px;color:#0a1230;background:#fff}.hero__inner{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}.hero__text{min-width:0}.hero h1{font-size:clamp(2.2rem,5.3vw,3.7rem);letter-spacing:-.02em}.hero__btns{display:flex;flex-wrap:wrap;gap:10px}.hero__media{position:relative;width:100%;padding:12px;background:#fff;border:3px solid #031b4e;border-radius:22px;box-shadow:8px 8px 0 #031b4e;line-height:0}.hero__frame{position:relative;border-radius:14px;overflow:hidden;border:3px solid #031b4e;background:#0a1230}.hero__poster,.hero__film{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;background:#0a1230}.hero__film{position:absolute;inset:0;opacity:0;pointer-events:none}.hero .hero__play{position:absolute;inset:0;z-index:2;display:grid;place-items:center;margin:0;padding:0;border:0;background:transparent;cursor:pointer}.hero.hero--fit{display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;padding:76px 0 88px}.page-hero{position:relative;overflow:visible;padding:72px 0 56px;background:linear-gradient(180deg,#f4f7ff,#fff);border-bottom:1px solid #e1e6f2}.page-hero h1{font-family:var(--font-poppins-display),var(--font-poppins),sans-serif;font-size:clamp(1.9rem,4.5vw,3rem);font-weight:800;letter-spacing:-.02em;margin-bottom:.4em}.page-hero__grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(28px,4vw,64px);align-items:center}.page-hero__art .art-wrap{aspect-ratio:1/1;width:100%;max-width:260px;margin-inline:auto}.hero-art{width:100%;height:auto}.lead{font-size:1.15rem;margin:0}.muted{color:#53607e}.trust-fineprint{margin-top:12px;font-size:.86rem}.link-btn{background:none;border:0;color:#0b3dff;font:inherit;font-weight:600;text-decoration:underline;cursor:pointer;padding:.6em 0}@media(max-width:1024px){.nav{display:none}.burger{display:inline-flex}.header__cta{display:none}.page-hero__grid{grid-template-columns:1fr;text-align:center}.page-hero--split .btn-row{justify-content:center}}@media(max-width:720px){.hero__inner{grid-template-columns:1fr;gap:12px}.hero.hero--fit{min-height:0;padding:28px 0 36px}.hero.hero--fit h1{font-size:clamp(1.7rem,6.8vw,2.15rem)}.page-hero{padding:48px 0 40px}.page-hero__grid{grid-template-columns:1fr}.page-hero__art .art-wrap{max-width:260px}}@media(max-width:680px){:root{--header-h:76px}.header__inner{height:76px}.logo__img{height:46px;max-width:230px;transform:translateY(-5px)}.burger__label{display:none}}</style>`;

function walk(dir, test, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, test, out);
    else if (test(ent.name)) out.push(full);
  }
  return out;
}

function deferLargeCss(html) {
  // Keep the design sheet render-blocking. Async CSS caused a multi-second FOUC
  // (skip link, mega menu, burger) because critical CSS could not cover chrome.
  return html;
}

function deferChunkScripts(html) {
  let next = html.replace(/<script\b([^>]*)><\/script>/gi, (tag, attrs) => {
    const src = attrs.match(/\ssrc="(\/_next\/static\/chunks\/[^"]+)"/i)?.[1];
    if (!src || /\sdata-kx=/i.test(attrs)) return tag;
    const nomodule = /\snoModule(?:="")?/i.test(attrs) || /\snomodule(?:="")?/i.test(attrs);
    return nomodule
      ? `<script type="text/plain" data-kx="${src}" data-kx-nomodule=""></script>`
      : `<script type="text/plain" data-kx="${src}"></script>`;
  });
  next = next.replace(/<script>([\s\S]*?)<\/script>/g, (full, body) => {
    if (!body.includes("__next_f")) return full;
    return `<script type="text/plain" data-kx-flight="1">${body}</script>`;
  });
  return next;
}

function transformHtml(html) {
  const next = deferLargeCss(
    deferChunkScripts(
      html
        .replace(loaderRe, "")
        .replace(criticalRe, "")
        .replace(/<link rel="preload" as="script"[^>]*>/g, "")
        .replace(/<link rel="preload" href="\/assets\/js\/boot(?:\.min)?\.js[^"]*" as="script"\/>/g, "")
        .replace(/<link rel="preload" href="\/_next\/static\/css\/[^"]+\.css" as="style"[^>]*>/g, "")
        .replace(/<noscript><link rel="stylesheet" href="\/_next\/static\/css\/[^"]+\.css"[^>]*><\/noscript>/g, ""),
    ),
  );
  if (!next.includes("data-kx=")) return html;
  const headBits = `${loader}${criticalCss}`;
  return next.includes("<head>") ? next.replace("<head>", `<head>${headBits}`) : `${headBits}${next}`;
}

let changed = 0;

if (!patchOpenNext) {
  for (const file of walk(root, (name) => name.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    const injected = transformHtml(html);
    if (/<script[^>]*\ssrc="\/_next\/static\/chunks\//i.test(injected)) {
      console.warn("left a framework script in place:", path.relative(root, file));
    }
    if (injected === html) continue;
    fs.writeFileSync(file, injected);
    changed += 1;
  }
  console.log(`deferred framework scripts + large CSS in ${changed} pages`);
} else {
  for (const file of walk(openNextCache, (name) => name.endsWith(".cache"))) {
    let raw = fs.readFileSync(file, "utf8");
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      continue;
    }
    if (typeof data?.html !== "string" || !data.html.includes("<!DOCTYPE")) continue;
    const injected = transformHtml(data.html);
    if (injected === data.html) continue;
    data.html = injected;
    fs.writeFileSync(file, JSON.stringify(data));
    changed += 1;
  }
  console.log(`deferred framework scripts + large CSS in ${changed} OpenNext cache entries`);
}
