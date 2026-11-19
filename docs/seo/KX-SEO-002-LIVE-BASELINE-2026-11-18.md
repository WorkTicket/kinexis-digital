# KX-SEO-002 live baseline

**Captured:** 2026-11-18  
**Scope:** Read-only production checks; 10 requested URLs, three HTTPS GETs each and three browser navigations each. No production changes were made.

## Ahrefs crawl findings

**FACT:** The authenticated Ahrefs project `Kinexisdigital` was available in the signed-in browser. Its November 18 crawl showed Health Score **100**, AI Discoverability **93**, Bot access **92**, and Machine readability **100**. The “Slow server response for AI crawlers” issue covered **70 of 155** URLs: 69 main-site URLs and one Connect homepage. This matches the submitted assignment's baseline examples (including homepage 6,945 ms, plumbing 3,757 ms, pricing 2,020 ms, and Connect 3,138 ms).

The complete Ahrefs-exported affected-URL list is tracked in `docs/seo/KX-SEO-002-AHREFS-SLOW-SERVER-2026-11-18.csv` (70 rows; export includes Ahrefs TTFB and load-time columns). In that export, the main-site TTFB median was **2,488 ms** (range 1,830–10,256 ms; p95 5,187 ms); the single Connect URL measured 3,138 ms. The crawl overview also showed 147 “Slow page” URLs, which is a separate Ahrefs issue and not interchangeable with the 70 slow-server-response URLs.

## Results

All 30 navigations returned HTTP 200. The browser runner reached Cloudflare POP `MIA`; this does not establish the runner's physical location. The reported TTFB is `PerformanceNavigationTiming.responseStart - requestStart`. Repeat navigations reused the same page/browser context, so they are not independent cold-cache samples.

| URL | TTFB, runs 1 / 2 / 3 (ms) | Median (ms) | Decoded HTML |
|---|---:|---:|---:|
| `https://www.kinexisdigital.com/` | 1025 / 200 / 180.9 | 200 | 831 KiB |
| `https://www.kinexisdigital.com/es` | 320.8 / 186 / 199.5 | 199.5 | 819 KiB |
| `https://www.kinexisdigital.com/pricing` | 412.2 / 191.2 / 144.5 | 191.2 | 787 KiB |
| `https://www.kinexisdigital.com/es/pricing` | 760.1 / 132 / 117.4 | 132 | 768 KiB |
| `https://www.kinexisdigital.com/industries/plumbing` | 862.4 / 157.7 / 128.3 | 157.7 | 722 KiB |
| `https://www.kinexisdigital.com/industries/landscaping` | 354.3 / 202.7 / 198.2 | 202.7 | 720 KiB |
| `https://www.kinexisdigital.com/case-studies/a1-property-services` | 393.1 / 208.3 / 175.2 | 208.3 | 653 KiB |
| `https://www.kinexisdigital.com/blog` | 354.6 / 217.2 / 178 | 217.2 | 831 KiB |
| `https://www.kinexisdigital.com/es/blog/pagina-web-para-plomeros` | 336.8 / 170.3 / 243 | 243 | 690 KiB |
| `https://connect.kinexisdigital.com/` | 1178.8 / 117.1 / 106.6 | 117.1 | 26 KiB |

Across browser navigation samples, median TTFB was 200 ms and p95 was 1025 ms. The first navigation per route had a median of 402.7 ms; the two subsequent navigations per route had a median of 188.6 ms. The separate direct-GET CSV shows overall median TTFB 183.5 ms (p95 1,655.6 ms); the 10 new-connection GETs had median 885.1 ms versus 174.1 ms for the 20 subsequent requests. “New connection” means a fresh client connection, not a verified cold server cache. Repeated requests were not guaranteed to reach the same Cloudflare POP or cache state.

For the nine `www` responses, decoded HTML ranged from 653–831 KiB, while encoded response bodies ranged from 86–103 KiB. This makes HTML payload/DOM and embedded framework data worth measuring in a controlled lab, but is not by itself proof of a user-visible performance defect or its cause.

## Response and collection notes

- Tracked direct-GET CSV: `docs/seo/KX-SEO-002-NODE-GET-TTFB-BASELINE-2026-11-18.csv` (30 rows; first fresh-connection sample and two following samples per URL, with DNS/connect/TLS, TTFB, total, transfer/body sizes, and response headers).
- Tracked browser-navigation CSV: `docs/seo/KX-SEO-002-BROWSER-TTFB-BASELINE-2026-11-18.csv` (30 rows; navigation timing fields and response headers).
- **FACT — production GA wiring:** the live homepage returned the first-party runtime config, but its GA measurement value did not match the required `G-…` format. The current `track()` guard therefore suppresses GA dispatch on production. Local browser tests can verify event construction with a test-only ID, but cannot verify production delivery under the current config.
- **FACT — GA4 Admin, read-only:** the signed-in `KINEXIS Digital` property listed four key events as enabled: `close_convert_lead`, `generate_lead`, `purchase`, and `qualify_lead`. Only `generate_lead` showed an active stream in the last 28 days. This does not meet the requested sole-key-event configuration. No Admin setting was changed; that requires separate owner approval.
- The observed responses included `Cache-Control: s-maxage=..., stale-while-revalidate=2592000`; `Age` and `CF-Cache-Status` were absent. This does not identify cache state.
- Every observed `CF-Ray` ended in `MIA`. Browser protocol negotiated HTTP/2 or HTTP/3. DNS/connect/TLS timing is zero on reused connections and should not be read as a new-connection measurement.
- **FACT — read-only live mobile Lighthouse (current production):** `/`, `/pricing`, `/portfolio`, and `/contact` scored respectively 0.98, 0.98, 0.91, and 1.00 for performance; accessibility 0.99/0.99/0.99/1.00; best practices 1.00 on all four; SEO 1.00 on all four. Each exceeds the repository’s configured mobile category budgets. This is a single lab run, not field/Core Web Vitals evidence, and does not explain the Ahrefs crawler TTFB issue.
- **Candidate validation:** `npm run build:worker` completed successfully on the remediation branch. Its preflight explicitly reported missing/invalid `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID`, then continued by repository design; no deployment/upload occurred. OpenNext emitted its Windows compatibility and experimental Node middleware warnings.
- **Inference:** the large gap between Ahrefs crawler-observed TTFB and these `MIA` runner samples could involve crawler geography, bot-specific behavior, request rate, or a variable serving/cache path. Existing evidence does not distinguish Worker execution from cache behavior, networking, or crawler conditions; no specific root cause is proven.
- These are production observations from one runner/session, not Lighthouse/Core Web Vitals, a geographic sample, or a controlled cold/warm cache test.
- No content, redirect, analytics, schema, or internal-link fix is claimed as verified by this timing exercise.

## Outstanding evidence and gates

- The 70-URL Ahrefs export is now available and tracked; its measurements remain crawler observations rather than independent repeat measurements.
- `CODING-PLAYBOOK.md`, `REPO-MAP.md`, `FAILURE-LOG.md`, `LESSONS-LOG.md`, and `ESTIMATE-LOG.md` were not found in the repository at baseline capture.
- Spanish copy changes remain subject to Copywriter approval. Connect findings beyond its measured homepage require its separate repository/owner.
- Production GA delivery and sole-key-event status need owner-approved configuration follow-up; do not send real test leads or change GA4 Admin during engineering QA.
- The candidate build succeeds, but tracking configuration remains a release blocker until an owner-approved value/decision is provided and measured delivery is verified.
- Production deployment remains out of scope absent explicit Colton approval for the specific release and a documented recovery path.
