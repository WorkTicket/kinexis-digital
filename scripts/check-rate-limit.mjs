/**
 * SEC-02: sliding-window rate limit against in-memory KV.
 */
import * as esbuild from "esbuild";
import { mkdtemp, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const dir = await mkdtemp(path.join(tmpdir(), "kinexis-rate-"));

process.env.REVIEWS_TEST_MEMORY = "1";

const rateSrc = (await readFile(path.join(root, "src/lib/rate-limit.ts"), "utf8"))
  .replace(/^import "server-only";\n?/m, "")
  .replace("@/lib/reviews-test-kv", "./reviews-test-kv.ts");
const kvSrc = (await readFile(path.join(root, "src/lib/reviews-test-kv.ts"), "utf8"))
  .replace(/^import "server-only";\n?/m, "")
  .replace(/getCloudflareContext[\s\S]*?from "@opennextjs\/cloudflare";\n?/m, "");

// Stub Cloudflare context import away from rate-limit
const rateStripped = rateSrc
  .replace(/import \{ getCloudflareContext \} from "@opennextjs\/cloudflare";\n?/, "")
  .replace(/try \{\n\s*const env = getCloudflareContext\(\)\.env as ReviewsEnv;\n\s*return env\.REVIEWS \?\? null;\n\s*\} catch \{\n\s*return null;\n\s*\}/, "return null;");

await writeFile(path.join(dir, "reviews-test-kv.ts"), kvSrc, "utf8");
await writeFile(path.join(dir, "rate-limit.ts"), rateStripped, "utf8");
await writeFile(
  path.join(dir, "entry.ts"),
  `export { isRateLimited } from "./rate-limit.ts";
export { setReviewsTestKv, createMemoryReviewsKv } from "./reviews-test-kv.ts";\n`,
  "utf8",
);

const outfile = path.join(dir, "check.cjs");
await esbuild.build({
  entryPoints: [path.join(dir, "entry.ts")],
  outfile,
  bundle: true,
  platform: "node",
  format: "cjs",
  packages: "bundle",
  logLevel: "silent",
  absWorkingDir: dir,
});

const { isRateLimited, setReviewsTestKv, createMemoryReviewsKv } = require(outfile);
const kv = createMemoryReviewsKv();
setReviewsTestKv(kv);

// Window 2s, max 2 hits
assert.equal(await isRateLimited("contact", "198.51.100.1", 2, 2), false);
assert.equal(await isRateLimited("contact", "198.51.100.1", 2, 2), false);
assert.equal(await isRateLimited("contact", "198.51.100.1", 2, 2), true);

// Different IP not limited
assert.equal(await isRateLimited("contact", "198.51.100.2", 2, 2), false);

// Empty IP: contact fails open; checkout fails closed
assert.equal(await isRateLimited("contact", "", 60, 1), false);
assert.equal(await isRateLimited("checkout", "", 60, 1), true);

// After window expires, allow again
await new Promise((r) => setTimeout(r, 2100));
assert.equal(await isRateLimited("contact", "198.51.100.1", 2, 2), false);

console.log("Rate limit checks passed: sliding window, per-IP isolation, empty-IP policy, window expiry.");
await rm(dir, { recursive: true, force: true });
