import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Images are pre-encoded with explicit sizes and responsive variants.
      // next.config.ts disables the Next image optimizer for Cloudflare hosting.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([
    ".tmp-*/**",
    ".tmp-*",
    ".next/**",
    ".open-next/**",
    ".wrangler/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "cloudflare-env.d.ts",
  ]),
]);
