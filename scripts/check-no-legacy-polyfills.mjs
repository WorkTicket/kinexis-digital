import fs from "node:fs";
import path from "node:path";

/**
 * Fail if Next's unconditional `polyfill-module` helpers leaked into client
 * chunks. Modern browserslist alone does not remove that import — see
 * next.config.ts webpack/turbopack aliases + src/lib/empty-polyfill-module.js.
 *
 * The separate `polyfills-*.js` nomodule bundle is expected and ignored
 * (modern browsers never download it).
 */
const chunksDir = path.join(process.cwd(), ".next", "static", "chunks");
const signatures = [
  '"trimStart"in String.prototype',
  "Array.prototype.flatMap=function",
  "Object.fromEntries||",
  "Object.hasOwn||",
  "Array.prototype.at||",
];

if (!fs.existsSync(chunksDir)) {
  console.error(`[check-no-legacy-polyfills] missing ${chunksDir} — run a Next build first`);
  process.exit(1);
}

const offenders = [];
for (const name of fs.readdirSync(chunksDir)) {
  if (!name.endsWith(".js") || name.startsWith("polyfills-")) continue;
  const file = path.join(chunksDir, name);
  if (!fs.statSync(file).isFile()) continue;
  const source = fs.readFileSync(file, "utf8");
  const hit = signatures.find((sig) => source.includes(sig));
  if (hit) offenders.push({ name, hit });
}

if (offenders.length) {
  console.error("[check-no-legacy-polyfills] legacy polyfill-module helpers found in client chunks:");
  for (const { name, hit } of offenders) {
    console.error(`  - ${name}: ${hit}`);
  }
  process.exit(1);
}

console.log("[check-no-legacy-polyfills] ok — no module polyfills in client chunks");
