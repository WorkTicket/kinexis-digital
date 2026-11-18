import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const raw = readFileSync(resolve(root, ".dev.vars"), "utf8");
const env = Object.fromEntries(
  raw
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1)];
    }),
);

const url = `${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/ki_sessions?select=id&limit=1`;
const res = await fetch(url, {
  headers: {
    apikey: env.SUPABASE_SECRET_KEY,
    authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
  },
});
const body = await res.text();
console.log(`status=${res.status}`);
console.log(`body=${body}`);
if (!res.ok) process.exit(1);
