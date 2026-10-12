import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

const html = await fs.readFile(".next/server/app/en/lp/get-a-website.html", "utf8");
const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
if (!stylesheets.length) throw new Error("Landing page stylesheets were not found in the production build");

const firstPaintMarkup = [html.match(/<html\b[^>]*>/)?.[0], html.match(/<body\b[^>]*>/)?.[0],
  html.match(/<header\b[^>]*class="site-header[^]*?<\/header>/)?.[0],
  html.match(/<section\b[^>]*class="lp-web-hero[^]*?<\/section>/)?.[0]].join("");
const classes = new Set([...firstPaintMarkup.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)));
for (const name of ["site-shell", "flex", "min-h-full", "flex-1", "flex-col", "lp-web", "pb-24", "lg:pb-0", "skip-link"]) classes.add(name);
const utilitySelectors = [...classes].map((name) => `.${name.replace(/[^a-zA-Z0-9_-]/g, "\\$&")}`);

function criticalSelector(selector) {
  if (/\.lp-web-(?!hero|outcomes|proofstrip)[\w-]+/.test(selector)) return false;
  return /(?:^html\.lp-chrome(?:\s+body)?$|\.lp-web(?:\W|$)|\.lp-web-hero|\.lp-web-outcomes|\.lp-web-proofstrip|\.site-header|\.site-shell|\.shell(?:\W|$)|\.brand-logo|\.btn(?:\W|__)|\.skip-link|\.phone-mark|\.whatsapp-link|\.__variable_|\.__className_)/.test(selector)
    || !selector.includes(".");
}

let css = "";
for (const href of new Set(stylesheets)) {
  const root = postcss.parse(await fs.readFile(path.join(".next", href.replace(/^\/_next\//, "")), "utf8"));
  root.walkComments((node) => node.remove());
  root.walkRules((rule) => {
    // Keep only utilities used by the initial viewport, plus animation definitions.
    let ancestor = rule.parent;
    let utilityLayer = false;
    while (ancestor) {
      if (ancestor.type === "atrule" && ancestor.name.includes("keyframes")) return;
      if (ancestor.type === "atrule" && ancestor.name === "layer" && ancestor.params === "utilities") utilityLayer = true;
      ancestor = ancestor.parent;
    }
    if (utilityLayer) {
      const selectors = postcss.list.comma(rule.selector).filter((selector) => utilitySelectors.some((utility) => selector.startsWith(utility) && !/[\w-]/.test(selector[utility.length] ?? "")));
      if (!selectors.length) rule.remove();
      else rule.selector = selectors.join(",");
      return;
    }
    const selectors = postcss.list.comma(rule.selector).filter(criticalSelector);
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(",");
  });
  root.walkAtRules((rule) => {
    if (rule.nodes && !rule.nodes.length) rule.remove();
  });
  root.walkDecls((decl) => {
    decl.value = decl.value.replace(/url\((['"]?)\.\.\/media\//g, "url($1/_next/static/media/");
  });
  css += root.toString();
}
const imagePreloads = [...html.matchAll(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g)]
  .map((match) => match[0])
  .filter((tag) => /\/(hero-devices|colton-wehr-face)/.test(tag))
  .join("");
await fs.writeFile("cloudflare/website-critical-css.generated.js", `// Generated from the production CSS by scripts/generate-landing-critical-css.mjs.\nexport const WEBSITE_CRITICAL_CSS = ${JSON.stringify(css)};\nexport const WEBSITE_PRELOAD_HTML = ${JSON.stringify(imagePreloads)};\n`);
console.log(`Landing first-paint CSS: ${(Buffer.byteLength(css) / 1024).toFixed(1)} KiB`);

const homeHtml = await fs.readFile(".next/server/app/en.html", "utf8");
const homeMarkup = [homeHtml.match(/<html\b[^>]*>/)?.[0], homeHtml.match(/<body\b[^>]*>/)?.[0],
  homeHtml.match(/<header\b[^>]*class="site-header[^]*?<\/header>/)?.[0],
  homeHtml.match(/<section\b[^>]*class="hero-shell[^]*?<\/section>/)?.[0]].join("");
const homeClasses = new Set([...homeMarkup.matchAll(/class="([^"]+)"/g)].flatMap(match => match[1].split(/\s+/)));
for (const name of ["site-shell", "flex", "min-h-full", "flex-1", "flex-col", "skip-link"]) homeClasses.add(name);
const homeSelectors = [...homeClasses].map(name => `.${name.replace(/[^a-zA-Z0-9_-]/g, "\\$&")}`);
const homeSheets = [...homeHtml.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map(match => match[1]);
let homeCss = "";
for (const href of new Set(homeSheets)) {
  const root = postcss.parse(await fs.readFile(path.join(".next", href.replace(/^\/_next\//, "")), "utf8"));
  root.walkComments(node => node.remove());
  root.walkRules(rule => {
    let ancestor = rule.parent;
    while (ancestor) {
      if (ancestor.type === "atrule" && ancestor.name.includes("keyframes")) return;
      ancestor = ancestor.parent;
    }
    const selectors = postcss.list.comma(rule.selector).filter(selector =>
      !selector.includes(".")
      || /\.(?:hero-|site-header|brand-logo|theme-toggle|btn(?:\W|__)|__variable_|__className_)/.test(selector)
      || homeSelectors.some(classSelector => {
        const index = selector.indexOf(classSelector);
        return index !== -1 && !/[\w-]/.test(selector[index + classSelector.length] ?? "");
      }));
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(",");
  });
  root.walkAtRules(rule => { if (rule.nodes && !rule.nodes.length) rule.remove(); });
  root.walkDecls(decl => { decl.value = decl.value.replace(/url\((['"]?)\.\.\/media\//g, "url($1/_next/static/media/"); });
  homeCss += root.toString();
}
await fs.appendFile("cloudflare/website-critical-css.generated.js", `export const HOME_CRITICAL_CSS = ${JSON.stringify(homeCss)};\n`);
console.log(`Homepage first-paint CSS: ${(Buffer.byteLength(homeCss) / 1024).toFixed(1)} KiB`);
