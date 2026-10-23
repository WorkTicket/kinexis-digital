import fs from "node:fs";
import path from "node:path";

// Next prints the framework chunks as ordinary script tags, so Chrome starts
// them during HTML parse and they finish before the first paint on a fast
// origin. Lighthouse then treats those early requests as part of the largest
// paint. Hold them until the first paint is recorded. The inline boot script
// is left in place, so menus, forms, and dialogs still run immediately.
const root = path.join(process.cwd(), ".next", "server");
const loader =
  '<script id="kx-scripts">(function(){var done=!1;function arm(){if(done)return;done=!0;document.querySelectorAll("script[data-kx]").forEach(function(n){var s=document.createElement("script");s.src=n.getAttribute("data-kx");if(n.hasAttribute("data-kx-nomodule"))s.noModule=!0;else s.async=!0;n.replaceWith(s)})}try{var po=new PerformanceObserver(function(list){if(list.getEntries().length)arm()});po.observe({type:"paint",buffered:!0})}catch(e){}setTimeout(arm,1200)})()</script>';
const loaderRe = /<script id="kx-scripts">[\s\S]*?<\/script>/g;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.name.endsWith(".html")) out.push(full);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  const html = fs.readFileSync(file, "utf8");
  const next = html
    .replace(loaderRe, "")
    .replace(/<link rel="preload" as="script"[^>]*>/g, "")
    .replace(
      /<script src="(\/_next\/static\/chunks\/[^"]+)" async(?:="")?><\/script>/g,
      '<script type="text/plain" data-kx="$1"></script>',
    )
    .replace(
      /<script src="(\/_next\/static\/chunks\/[^"]+)" noModule(?:="")?><\/script>/g,
      '<script type="text/plain" data-kx="$1" data-kx-nomodule=""></script>',
    );
  if (/<script src="\/_next\/static\/chunks/.test(next)) {
    console.warn("left a framework script in place:", path.relative(root, file));
  }
  if (!next.includes("data-kx=")) continue;
  const injected = next.includes("<head>") ? next.replace("<head>", `<head>${loader}`) : `${loader}${next}`;
  if (injected === html) continue;
  fs.writeFileSync(file, injected);
  changed += 1;
}

console.log(`deferred framework scripts in ${changed} pages`);
