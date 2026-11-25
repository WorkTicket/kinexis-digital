import { access, cp, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Next traces the CJS entry, but OpenNext's middleware bundler uses the package's
// ESM export. Include that tree in both the trace and standalone copy. OpenTelemetry
// 1.10 moved it from build/esm to dist, so support both package layouts.
const tracePath = path.resolve(".next/server/middleware.js.nft.json");
const trace = JSON.parse(await readFile(tracePath, "utf8"));
const packageRoot = path.resolve("node_modules/@opentelemetry/api");
const roots = ["build/esm", "dist"];
const relativeRoot = await roots.reduce(async (found, candidate) => {
  const current = await found;
  if (current) return current;
  try {
    await access(path.join(packageRoot, candidate));
    return candidate;
  } catch {
    return "";
  }
}, Promise.resolve(""));
if (!relativeRoot) throw new Error("Unsupported @opentelemetry/api package layout.");
const source = path.join(packageRoot, relativeRoot);
const destination = path.resolve(".next/standalone/node_modules/@opentelemetry/api", relativeRoot);
const entries = await readdir(source, { recursive: true, withFileTypes: true });
const files = entries.filter(entry => entry.isFile() && /\.(?:m?js|json)$/.test(entry.name)).map(entry =>
  path.relative(path.dirname(tracePath), path.join(entry.parentPath, entry.name)).replaceAll(path.sep, "/")
);
trace.files = [...new Set([...trace.files, ...files])];
// Hashes are optional and no longer cover the expanded list. Existing symlink
// indexes stay valid because new files are appended without reordering.
delete trace.fileHashes;
await cp(source, destination, { recursive: true });
await writeFile(tracePath, JSON.stringify(trace));
console.log(`Prepared ${files.length} OpenTelemetry ESM files for Cloudflare middleware.`);
