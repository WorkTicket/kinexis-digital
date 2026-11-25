/**
 * Fail if any industry problems[] or services[] section repeats an icon key,
 * or if two cards in the same section (or across both sections on one page)
 * resolve to the same icon file bytes. Also requires EN/ES icon keys to match.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const iconsDir = path.join(root, "public/assets/kinexis/icons");
const enPath = path.join(root, "src/data/industries.ts");
const esPath = path.join(root, "src/i18n/industries-es.ts");

/** @param {string} name */
function iconContentHash(name) {
  for (const ext of ["webp", "svg", "png"]) {
    const file = path.join(iconsDir, `${name}.${ext}`);
    if (existsSync(file)) {
      return createHash("sha256").update(readFileSync(file)).digest("hex");
    }
  }
  return null;
}

/**
 * @param {string} label
 * @param {string[]} keys
 */
function assertDistinctIcons(label, keys) {
  assert.ok(keys.length > 0, `${label}: expected icons`);
  assert.equal(keys.length, new Set(keys).size, `${label}: repeated icon key(s): ${keys.join(", ")}`);

  /** @type {Map<string, string[]>} */
  const byHash = new Map();
  for (const key of keys) {
    const hash = iconContentHash(key);
    assert.ok(hash, `${label}: missing icon asset for "${key}"`);
    const list = byHash.get(hash) ?? [];
    list.push(key);
    byHash.set(hash, list);
  }
  for (const [, names] of byHash) {
    assert.equal(names.length, 1, `${label}: identical icon artwork shared by ${names.join(", ")}`);
  }
}

/**
 * @param {string} text
 * @param {"en" | "es"} kind
 * @returns {Map<string, { problems: string[]; services: string[] }>}
 */
function parseIndustryIcons(text, kind) {
  /** @type {Map<string, { problems: string[]; services: string[] }>} */
  const out = new Map();

  if (kind === "en") {
    const parts = text.split(/(\{\s*\n\s*slug:\s*"[^"]+")/);
    for (let i = 1; i < parts.length; i += 2) {
      const header = parts[i];
      const body = parts[i + 1] ?? "";
      const slug = /slug:\s*"([^"]+)"/.exec(header)?.[1];
      if (!slug) continue;
      out.set(slug, sectionIcons(body));
    }
    return out;
  }

  const parts = text.split(/(^  (?:"[a-z0-9-]+"|[a-z0-9]+): \{)/m);
  for (let i = 1; i < parts.length; i += 2) {
    const header = parts[i];
    const body = parts[i + 1] ?? "";
    const match = /^  (?:"([a-z0-9-]+)"|([a-z0-9]+)): \{/.exec(header);
    const slug = match?.[1] || match?.[2];
    if (!slug) continue;
    out.set(slug, sectionIcons(body));
  }
  return out;
}

/** @param {string} body */
function sectionIcons(body) {
  const problemsBody = /problems:\s*\[(.*?)\]/s.exec(body)?.[1] ?? "";
  const servicesBody = /services:\s*\[(.*?)\]/s.exec(body)?.[1] ?? "";
  const problems = [...problemsBody.matchAll(/icon:\s*"([^"]+)"/g)].map((m) => m[1]).slice(0, 3);
  const services = [...servicesBody.matchAll(/icon:\s*"([^"]+)"/g)].map((m) => m[1]).slice(0, 3);
  return { problems, services };
}

const en = parseIndustryIcons(readFileSync(enPath, "utf8"), "en");
const es = parseIndustryIcons(readFileSync(esPath, "utf8"), "es");

assert.ok(en.size > 0, "expected EN industries");
assert.deepEqual([...en.keys()].sort(), [...es.keys()].sort(), "EN/ES industry slug sets must match");

for (const [slug, sections] of en) {
  assertDistinctIcons(`${slug} problems`, sections.problems);
  assertDistinctIcons(`${slug} services`, sections.services);
  assertDistinctIcons(`${slug} page (problems+services)`, [...sections.problems, ...sections.services]);

  const esSections = es.get(slug);
  assert.ok(esSections, `missing ES industry ${slug}`);
  assert.deepEqual(esSections.problems, sections.problems, `${slug}: ES problems icons must match EN`);
  assert.deepEqual(esSections.services, sections.services, `${slug}: ES services icons must match EN`);
}

console.log(`Industry icons OK (${en.size} industries, EN+ES).`);
