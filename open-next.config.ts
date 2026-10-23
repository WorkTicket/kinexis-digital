import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({});
config.buildCommand = "npm run build && node scripts/prepare-cloudflare-traces.mjs";
export default config;
