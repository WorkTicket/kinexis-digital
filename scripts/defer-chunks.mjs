import fs from "node:fs";
import path from "node:path";

// Post-build HTML patcher for OpenNext. Previously deferred Next/React chunks
// for Lighthouse; that raced boot.min.js and caused live hydration failures.
// Keep this file as a no-op stripper so cached HTML loses any old injects.
const root = path.join(process.cwd(), ".next", "server");
const openNextCache = path.join(process.cwd(), ".open-next", "cache");
const patchOpenNext = process.argv.includes("--opennext-cache");

const loaderRe = /<script id="kx-scripts">[\s\S]*?<\/script>/g;
const criticalRe = /<style id="kx-critical">[\s\S]*?<\/style>/g;

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
  // Disabled: delaying Next/React chunks until idle/input let boot.min.js
  // mutate the hero/nav DOM first, then hydration threw React #418/#423 and
  // remounted the whole tree. Ship framework scripts normally (like `next dev`).
  return html;
}

function transformHtml(html) {
  // Strip any previously injected defer loader / critical CSS from cached HTML.
  return deferLargeCss(
    deferChunkScripts(
      html
        .replace(loaderRe, "")
        .replace(criticalRe, ""),
    ),
  );
}

let changed = 0;

if (!patchOpenNext) {
  for (const file of walk(root, (name) => name.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    const next = transformHtml(html);
    if (next === html) continue;
    fs.writeFileSync(file, next);
    changed += 1;
  }
  console.log(`stripped legacy kx defer injects from ${changed} pages`);
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
    const next = transformHtml(data.html);
    if (next === data.html) continue;
    data.html = next;
    fs.writeFileSync(file, JSON.stringify(data));
    changed += 1;
  }
  console.log(`stripped legacy kx defer injects from ${changed} OpenNext cache entries`);
}
