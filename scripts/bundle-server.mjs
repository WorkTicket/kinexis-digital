import { build } from "esbuild";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

export async function bundleServer(entry, outfile) {
  await build({
    entryPoints: [entry],
    absWorkingDir: process.cwd(),
    bundle: true,
    format: "esm",
    platform: "node",
    outfile,
    external: ["next", "next/*"],
    plugins: [{
      name: "server-bundle",
      setup(esbuild) {
        esbuild.onResolve({ filter: /^@\// }, (args) => {
          const base = resolve("src", args.path.slice(2));
          for (const ext of [".ts", ".tsx", ".js", ".mjs"]) {
            if (existsSync(base + ext)) return { path: base + ext };
          }
          return { path: `${base}.ts` };
        });
        esbuild.onResolve({ filter: /^server-only$/ }, () => ({ path: "server-only", namespace: "stub" }));
        esbuild.onResolve({ filter: /^@opennextjs\/cloudflare$/ }, () => ({ path: "cloudflare", namespace: "stub" }));
        esbuild.onLoad({ filter: /.*/, namespace: "stub" }, (args) => {
          if (args.path === "cloudflare") {
            return {
              contents: "export function getCloudflareContext(){ throw new Error('no cloudflare context'); }",
              loader: "js",
            };
          }
          return { contents: "export {}", loader: "js" };
        });
      },
    }],
  });
  return import(`${pathToFileURL(resolve(outfile)).href}?v=${Date.now()}`);
}
