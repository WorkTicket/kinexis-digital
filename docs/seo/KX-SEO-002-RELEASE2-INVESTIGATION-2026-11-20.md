# KX-SEO-002 Release 2 — TTFB investigation

**Status:** TTFB investigation supporting the local Release 2 candidate; not
deployed. No production serving or cache behavior was changed. The HTML/CSS
candidate and current validation are summarized in
`KX-SEO-002-RELEASE2-REPORT-2026-11-20.md`.
**Branch:** `release/2-performance-html`

## Evidence

### FACT — historical crawler and direct-GET data

- The November 18 Ahrefs export contains 70 slow-server-response URLs. The 69
  `www.kinexisdigital.com` entries have a reported median TTFB of 2,488 ms
  (range 1,830–10,256 ms; p95 5,187 ms); the one Connect URL reports 3,138 ms.
- The November 18 direct-GET report contains 30 requests across ten routes. Its
  original report cautions that requests were not controlled for Cloudflare POP
  or cache state, so it did not establish a cause.

### FACT — November 20 read-only direct GETs

`KX-SEO-002-NODE-GET-TTFB-RELEASE2-2026-11-20.csv` records three sequential GETs
per route: one new TCP/TLS connection and two requests eligible to reuse it.
All 30 responses were HTTP 200. Across all requests the median TTFB was 163.85 ms
and p95 was 485.7 ms. The ten new-connection requests had median 389.95 ms
(range 187.4–744.6 ms); the 20 reused-connection requests had median 151.2 ms
(range 124.2–186.3 ms). These timings are from one client/network vantage point
and are not a controlled cold-versus-warm edge-cache experiment.

The sample responses included `s-maxage` directives, but `Age` and
`CF-Cache-Status` were empty. Therefore the data does not establish whether
these responses were cache hits, misses, or served from an upstream cache.

### FACT — Ahrefs user-agent spot check

`KX-SEO-002-UA-AHREFSBOT-2026-11-20.csv` records 12 GETs to four representative
main-site URLs using the literal user-agent string
`AhrefsBot/7.0 (+http://ahrefs.com/robot/)`. All returned HTTP 200. Reused
connection TTFB median was 153.6 ms (range 144.4–161.0 ms); the four
new-connection samples ranged from 274.7 to 351.1 ms. This is a user-agent
comparison only—not a request from Ahrefs infrastructure, and not proof that
Ahrefs' crawl path behaves the same.

### FACT — checked-in build characteristics

The optimized Next.js build completed successfully and reports the sampled
marketing routes as statically prerendered with one-day revalidation. The build
also reports Next CSS inlined on 285/289 generated pages with no blocking
stylesheet links. This establishes build output characteristics, not production
Worker execution time.

## Assessment

- **INFERENCE:** The large difference between historical Ahrefs TTFB and this
  client-side sample suggests the delay is not consistently reproduced from
  this network vantage point. Possible causes include crawler-specific route,
  geography, transient origin/edge load, or measurement/cache-state differences;
  the current evidence cannot distinguish them.
- **INFERENCE:** Sequential connection reuse correlates with lower measured TTFB
  here, but it does not isolate server processing time or prove an edge-cache
  effect.
- **FACT:** Several sampled pages have large decoded HTML bodies (about
  668–854 KiB in this run). **INFERENCE:** This may affect total transfer time,
  but this measurement does not show it causes the reported Ahrefs TTFB.
- **DECISION:** No Worker TTFB or shared HTML-cache change is justified by this
  evidence. The separate CSS/HTML-weight change in the Release 2 report is
  based on directly measured duplicated CSS bytes, not on these TTFB samples.
  Transactional and personalized response handling remains unchanged.

## Method and limitations

The reusable read-only collector is `scripts/measure-public-ttfb.mjs`. Default
run:

```sh
node scripts/measure-public-ttfb.mjs docs/seo/KX-SEO-002-NODE-GET-TTFB-RELEASE2-2026-11-20.csv
```

It requests each of ten representative routes over HTTPS, records timing,
response-size, connection, and response-header fields, and writes CSV. A new
connection is not synonymous with an empty Cloudflare cache. The user-agent
spot check uses the same collector with `--urls=` and `--user-agent=` options.
No cache-busting query parameter was added.

The requested `CODING-PLAYBOOK.md`, `REPO-MAP.md`, `FAILURE-LOG.md`,
`LESSONS-LOG.md`, `ESTIMATE-LOG.md`, and Agent Board were not found in the
repository. Independent QA has not been obtained. Production release remains
gated on specific explicit approval and a confirmed recovery path.
