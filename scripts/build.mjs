import { execSync } from "node:child_process";
import path from "node:path";
import { ensureSkeleton } from "./prebuild.mjs";

const patchPath = path.resolve("scripts/patch-fs.cjs").replaceAll("\\", "/");
const nodeOptions = `${process.env.NODE_OPTIONS || ""} --require "${patchPath}"`.trim();

const MAX_ATTEMPTS = 5;

execSync("node scripts/minify-boot.mjs", { stdio: "inherit" });

let built = false;
for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
  ensureSkeleton();
  try {
    execSync("next build --webpack", {
      stdio: "inherit",
      env: { ...process.env, NODE_OPTIONS: nodeOptions },
    });
    built = true;
    break;
  } catch (err) {
    if (attempt < MAX_ATTEMPTS) {
      console.warn(`\n[build retry] Next.js build attempt ${attempt} failed (likely Windows transient EPERM mkdir). Retrying (${attempt + 1}/${MAX_ATTEMPTS})...\n`);
    } else {
      console.error(`\n[build error] Next.js build failed after ${MAX_ATTEMPTS} attempts.\n`);
      process.exit(err.status ?? 1);
    }
  }
}

if (built) {
  execSync("node scripts/defer-chunks.mjs", { stdio: "inherit" });
}
