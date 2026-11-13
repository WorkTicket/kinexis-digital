/**
 * Assert every MIRROR_PATHS entry has Spanish coverage:
 * - static paths ⊆ SPANISH_STATIC_META_PATHS
 * - /industries/{slug} → industry exists
 * - /blog/{slug} → Spanish post body exists
 */
import * as esbuild from "esbuild";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const toPosix = (value) => value.split(path.sep).join("/");

const entrySource = `
import { MIRROR_PATHS } from "@/lib/locale-path";
import { SPANISH_STATIC_META_PATH_SET } from "@/i18n/spanish-static-paths";
import { getIndustry } from "@/data/industries";
import { esPost } from "@/i18n/posts-es";

const missing = [];
for (const route of MIRROR_PATHS) {
  if (route.startsWith("/industries/") && route !== "/industries") {
    const slug = route.slice("/industries/".length);
    if (!getIndustry(slug)) missing.push(route + " (missing industry)");
    continue;
  }
  if (route.startsWith("/blog/") && route !== "/blog") {
    const slug = route.slice("/blog/".length);
    if (!esPost(slug)) missing.push(route + " (missing Spanish post)");
    continue;
  }
  if (!SPANISH_STATIC_META_PATH_SET.has(route)) {
    missing.push(route + " (missing PAGE_META / SPANISH_STATIC_META_PATHS)");
  }
}

if (missing.length) {
  console.error("Spanish mirror coverage gaps:");
  for (const item of missing) console.error(" -", item);
  process.exit(1);
}
console.log("Spanish mirror coverage OK (" + MIRROR_PATHS.length + " paths).");
`;

const dir = await mkdtemp(path.join(tmpdir(), "kinexis-mirror-"));
const entryFile = path.join(dir, "entry.ts");
const outfile = path.join(dir, "check.cjs");

try {
  await writeFile(entryFile, entrySource, "utf8");
  await esbuild.build({
    entryPoints: [entryFile],
    outfile,
    bundle: true,
    platform: "node",
    format: "cjs",
    packages: "bundle",
    logLevel: "silent",
    absWorkingDir: root,
    alias: {
      "@": toPosix(path.join(root, "src")),
    },
  });
  require(outfile);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await rm(dir, { recursive: true, force: true });
}
