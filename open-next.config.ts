import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

// KV + DO queue keeps ISR/fetch cache warm on Workers. Cache interception skips
// booting NextServer for cached HTML, which is the main TTFB win on Lighthouse.
const config = defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
  enableCacheInterception: true,
});
config.buildCommand = "npm run build && node scripts/prepare-cloudflare-traces.mjs";
export default config;
