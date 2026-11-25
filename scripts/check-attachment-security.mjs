/**
 * SEC-03: magic-byte + extension/MIME agreement for contact attachments.
 */
import * as esbuild from "esbuild";
import { mkdtemp, writeFile, rm, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import assert from "node:assert/strict";

const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);

const dir = await mkdtemp(path.join(tmpdir(), "kinexis-attach-"));
const src = await readFile(path.join(root, "src/lib/request-security.ts"), "utf8");
const stripped = src.replace(/^import "server-only";\n?/m, "");
await writeFile(path.join(dir, "request-security.ts"), stripped, "utf8");
await writeFile(
  path.join(dir, "entry.ts"),
  `export { attachmentAllowed, detectAttachmentKind } from "./request-security.ts";\n`,
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

const { attachmentAllowed, detectAttachmentKind } = require(outfile);

function file(name, type, bytes) {
  return new File([bytes], name, { type });
}

const jpeg = file("photo.jpg", "image/jpeg", new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]));
const png = file(
  "shot.png",
  "image/png",
  new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]),
);
const pdf = file("quote.pdf", "application/pdf", new TextEncoder().encode("%PDF-1.4\n"));
const txt = file("notes.txt", "text/plain", new TextEncoder().encode("Hello contractor lead form\n"));
const gif = file("ok.gif", "image/gif", new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0, 0, 0, 0]));
const webp = file(
  "pic.webp",
  "image/webp",
  new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x10, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]),
);
const docx = file(
  "scope.docx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0, 0, 0]),
);
const doc = file(
  "legacy.doc",
  "application/msword",
  new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0, 0, 0, 0]),
);

assert.equal(detectAttachmentKind(new Uint8Array(await jpeg.arrayBuffer())), "jpeg");
assert.equal(await attachmentAllowed(jpeg), true);
assert.equal(await attachmentAllowed(png), true);
assert.equal(await attachmentAllowed(pdf), true);
assert.equal(await attachmentAllowed(txt), true);
assert.equal(await attachmentAllowed(gif), true);
assert.equal(await attachmentAllowed(webp), true);
assert.equal(await attachmentAllowed(docx), true);
assert.equal(await attachmentAllowed(doc), true);

assert.equal(
  await attachmentAllowed(file("fake.pdf", "application/pdf", new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))),
  false,
);
assert.equal(
  await attachmentAllowed(file("fake.png", "image/jpeg", new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))),
  false,
);
assert.equal(
  await attachmentAllowed(file("payload.pdf", "application/pdf", new Uint8Array([0x4d, 0x5a, 0x90, 0x00]))),
  false,
);
assert.equal(
  await attachmentAllowed(file("photo.exe", "image/jpeg", new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))),
  false,
);
assert.equal(await attachmentAllowed(file("empty.txt", "text/plain", new Uint8Array([]))), false);

// Empty MIME is allowed when extension + magic agree
assert.equal(
  await attachmentAllowed(file("photo.jpg", "", new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))),
  true,
);

console.log("Attachment security checks passed: magic bytes, MIME/extension agreement, spoof rejects.");
await rm(dir, { recursive: true, force: true });
