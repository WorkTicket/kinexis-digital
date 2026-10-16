import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

const html = await fs.readFile(".next/server/app/en/lp/get-a-website.html", "utf8");
const buildId = (await fs.readFile(".next/BUILD_ID", "utf8")).trim();
const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map((match) => match[1]);
if (!stylesheets.length) throw new Error("Landing page stylesheets were not found in the production build");

const firstPaintMarkup = [html.match(/<html\b[^>]*>/)?.[0], html.match(/<body\b[^>]*>/)?.[0],
  html.match(/<header\b[^>]*class="site-header[^]*?<\/header>/)?.[0],
  html.match(/<section\b[^>]*class="lp-web-hero[^]*?<\/section>/)?.[0],
  html.match(/<section\b[^>]*class="lp-web-proofstrip[^]*?<\/section>/)?.[0]].join("");
const classes = new Set([...firstPaintMarkup.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/)));
for (const name of ["site-shell", "flex", "min-h-full", "flex-1", "flex-col", "lp-web", "pb-24", "lg:pb-0", "skip-link"]) classes.add(name);
for (const name of ["lp-chrome", "cookie-pending", "site-header__frost", "site-header--hidden", "site-header__frost--hidden"]) classes.add(name);
const utilitySelectors = [...classes].map((name) => `.${name.replace(/[^a-zA-Z0-9_-]/g, "\\$&")}`);

function criticalSelector(selector, usedClasses) {
  // Check every class, not just a shared ancestor such as .shell or .lp-web.
  // Otherwise entire offscreen sections and retired hero designs get inlined.
  const names = [...selector.matchAll(/\.((?:\\.|[\w-])+)/g)]
    .map(match => match[1].replace(/\\(.)/g, "$1"));
  return names.every(name => usedClasses.has(name));
}

function trimAnimations(root) {
  const animations = [];
  root.walkDecls(/^animation(?:-name)?$/, decl => animations.push(decl.value));
  root.walkAtRules(/keyframes$/, rule => {
    if (!animations.some(value => value.split(/[\s,]+/).includes(rule.params))) rule.remove();
  });
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
    const selectors = postcss.list.comma(rule.selector).filter(selector => criticalSelector(selector, classes));
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(",");
  });
  trimAnimations(root);
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
let textFontPreload = "";
postcss.parse(css).walkAtRules("font-face", rule => {
  const declarations = Object.fromEntries(rule.nodes.filter(node => node.type === "decl").map(node => [node.prop, node.value]));
  if (declarations["font-family"] !== "kinexisText" || declarations["font-weight"] !== "400") return;
  const href = declarations.src?.match(/url\(["']?([^"')]+)/)?.[1];
  if (href) textFontPreload = `<link rel="preload" as="font" href="${href}" type="font/woff2" crossorigin="anonymous">`;
});
if (!textFontPreload) throw new Error("The primary text font was not found in the critical CSS");
await fs.writeFile("cloudflare/website-critical-css.generated.js", `// Generated from the production CSS by scripts/generate-landing-critical-css.mjs.\nexport const WEBSITE_CRITICAL_CSS = ${JSON.stringify(css)};\nexport const WEBSITE_PRELOAD_HTML = ${JSON.stringify(imagePreloads)};\n`);
console.log(`Landing first-paint CSS: ${(Buffer.byteLength(css) / 1024).toFixed(1)} KiB`);
await fs.appendFile("cloudflare/website-critical-css.generated.js", `export const WEBSITE_BUILD_ID = ${JSON.stringify(buildId)};\n`);

const homeHtml = await fs.readFile(".next/server/app/en.html", "utf8");
const homeMarkup = [homeHtml.match(/<html\b[^>]*>/)?.[0], homeHtml.match(/<body\b[^>]*>/)?.[0],
  homeHtml.match(/<header\b[^>]*class="site-header[^]*?<\/header>/)?.[0],
  homeHtml.match(/<section\b[^>]*class="hero-shell[^]*?<\/section>/)?.[0]].join("");
const homeClasses = new Set([...homeMarkup.matchAll(/class="([^"]+)"/g)].flatMap(match => match[1].split(/\s+/)));
for (const name of ["site-shell", "flex", "min-h-full", "flex-1", "flex-col", "skip-link"]) homeClasses.add(name);
for (const name of ["cookie-pending", "site-header__frost", "site-header--hidden", "site-header__frost--hidden"]) homeClasses.add(name);
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
    let utilityLayer = false;
    for (let parent = rule.parent; parent; parent = parent.parent) {
      if (parent.type === "atrule" && parent.name === "layer" && parent.params === "utilities") utilityLayer = true;
    }
    const selectors = postcss.list.comma(rule.selector).filter(selector => utilityLayer
      ? homeSelectors.some(utility => selector.startsWith(utility) && !/[\w-]/.test(selector[utility.length] ?? ""))
      : criticalSelector(selector, homeClasses));
    if (!selectors.length) rule.remove();
    else rule.selector = selectors.join(",");
  });
  trimAnimations(root);
  root.walkAtRules(rule => { if (rule.nodes && !rule.nodes.length) rule.remove(); });
  root.walkDecls(decl => { decl.value = decl.value.replace(/url\((['"]?)\.\.\/media\//g, "url($1/_next/static/media/"); });
  homeCss += root.toString();
}
await fs.appendFile("cloudflare/website-critical-css.generated.js", `export const HOME_CRITICAL_CSS = ${JSON.stringify(homeCss)};\nexport const TEXT_FONT_PRELOAD_HTML = ${JSON.stringify(textFontPreload)};\n`);
console.log(`Homepage first-paint CSS: ${(Buffer.byteLength(homeCss) / 1024).toFixed(1)} KiB`);
