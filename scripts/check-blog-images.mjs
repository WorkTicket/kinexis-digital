import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

const source = await readFile("src/lib/content.ts", "utf8");
const posts = [...source.matchAll(/slug:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"/g)]
  .map(([, slug, image]) => ({ slug, image }));
const paths = new Map();
const hashes = new Map();
const errors = [];

for (const post of posts) {
  const priorPath = paths.get(post.image);
  if (priorPath) {
    errors.push(`Duplicate blog image path: ${priorPath} and ${post.slug} both use ${post.image}`);
  } else paths.set(post.image, post.slug);

  const file = path.join("public", post.image.replace(/^\/+/, ""));
  const digest = createHash("sha256").update(await readFile(file)).digest("hex");
  const priorHash = hashes.get(digest);
  if (priorHash) {
    errors.push(`Duplicate blog image content: ${priorHash} and ${post.slug} use identical image bytes`);
  } else hashes.set(digest, post.slug);
}

if (errors.length) throw new Error(errors.join("\n"));
console.log(`Blog image check passed: ${posts.length} posts use unique image paths and unique image files.`);
