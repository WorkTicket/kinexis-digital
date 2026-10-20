import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("locale encoding", () => {
  const directory = resolve(import.meta.dirname, "../../messages");
  it.each(readdirSync(directory).filter(name => name.endsWith(".json")))("keeps every string in %s free of mojibake", name => {
    const messages = JSON.parse(readFileSync(resolve(directory, name), "utf8"));
    const check = (value: unknown, path: string) => {
      if (typeof value === "string") expect(value, path).not.toMatch(/[\u00c3\u00c2]/);
      else if (value && typeof value === "object") for (const [key, child] of Object.entries(value)) check(child, `${path}.${key}`);
    };
    check(messages, name);
  });
  it("keeps component copy free of mojibake", () => {
    const directory = resolve(import.meta.dirname, "../components");
    for (const file of readdirSync(directory, { recursive: true })) {
      if (/\.(tsx?|json)$/.test(file.toString())) expect(readFileSync(resolve(directory, file.toString()), "utf8"), file.toString()).not.toMatch(/[\u00c3\u00c2]/);
    }
  });
});
