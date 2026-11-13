// Minifies public/assets/js/boot.js → public/assets/js/boot.min.js
import { readFileSync, writeFileSync } from "node:fs";
import { transformSync } from "esbuild";

const src = readFileSync("public/assets/js/boot.js", "utf8");
const { code } = transformSync(src, { minify: true, target: "es2019", legalComments: "none" });
writeFileSync("public/assets/js/boot.min.js", code);
console.log(`boot.min.js ${src.length} → ${code.length} bytes`);
