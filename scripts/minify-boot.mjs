// Minifies public/assets/js/boot.js → boot.min.js and conferbot.js → conferbot.min.js
import { readFileSync, writeFileSync } from "node:fs";
import { transformSync } from "esbuild";

function minify(srcPath, outPath) {
  const src = readFileSync(srcPath, "utf8");
  const { code } = transformSync(src, { minify: true, target: "es2019", legalComments: "none" });
  writeFileSync(outPath, code);
  console.log(`${outPath} ${src.length} → ${code.length} bytes`);
}

minify("public/assets/js/boot.js", "public/assets/js/boot.min.js");
minify("public/assets/js/conferbot.js", "public/assets/js/conferbot.min.js");
