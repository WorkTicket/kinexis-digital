import { cp, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Next traces the CJS entry, but OpenNext's middleware bundler uses the package's
// "module" condition. Include that ESM tree in both the trace and standalone copy.
const tracePath = path.resolve(".next/server/middleware.js.nft.json");
const trace = JSON.parse(await readFile(tracePath, "utf8"));
const source = path.resolve("node_modules/@opentelemetry/api/build/esm");
const destination = path.resolve(".next/standalone/node_modules/@opentelemetry/api/build/esm");
const entries = await readdir(source, { recursive: true, withFileTypes: true });
const files = entries.filter(entry => entry.isFile() && /\.(?:js|json)$/.test(entry.name)).map(entry =>
  path.relative(path.dirname(tracePath), path.join(entry.parentPath, entry.name)).replaceAll(path.sep, "/")
);
trace.files = [...new Set([...trace.files, ...files])];
// Hashes are optional and no longer cover the expanded list. Existing symlink
// indexes stay valid because new files are appended without reordering.
delete trace.fileHashes;
await cp(source, destination, { recursive: true });
await writeFile(tracePath, JSON.stringify(trace));
console.log(`Prepared ${files.length} OpenTelemetry ESM files for Cloudflare middleware.`);
