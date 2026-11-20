# Phase 9.2 — Performance and release-gate closure

**Starting commit:** `fdd01516c852b9471ffaca79905b998be7e00365`
**Branch:** `phase-1/conversion-handoff`
**Disposition:** Phase 9.2 engineering investigation complete; production release remains blocked. No push, merge, deployment, production configuration change, live-provider test, or Phase 10 work was performed.

## Results

- Verified the requested starting HEAD, branch and clean worktree before changes.
- Rebuilt the optimized site: **297 routes**; CSS-inlining and legacy-polyfill guards passed.
- Captured full Chrome trace artifacts and LHRs for all four routes in mobile and desktop form factors. This exposed a desktop benchmark configuration error: the desktop run inherited Lighthouse's mobile simulation throttle (150ms RTT, ~1.6Mbps, 4× CPU, mobile Android UA). On the same build/server, the corrected explicit desktop profile (40ms RTT, 10Mbps, 1× CPU) scored **1.00 on all four routes twice**. `scripts/lighthouse-budget.mjs` now specifies this profile; desktop budget remains **.85**.
- The final corrected official budget runs on the finished build: mobile home **.94/.94**, pricing **.93/.93**, portfolio **.92/.92**, contact **.95/.95**; desktop all four routes **1.00/1.00**. Mobile release target remains **.95**, so home/pricing/portfolio fail. The budget runner's mobile floor remains .85; the separate .95 mobile release gate was not changed.
- Performance finding: the former desktop score deficit was a test-environment configuration artifact, not evidence of a desktop rendering bottleneck. The multi-second LCP metric is Lighthouse's simulated result; the recorded trace shows local observed LCP at roughly **100–204ms**. For the remaining mobile misses, unused-JavaScript and Style & Layout estimates are leads only, not proof of a safe component-level fix. No product performance optimization was retained. See `PERFORMANCE-ROOT-CAUSE.md` and `PERFORMANCE-BEFORE-AFTER.md`.
- Captured the actual A1 homepage from `https://a1pslandscape.com/` at **1280 CSS px / DPR 2**, producing a genuine **2560×20446** full-page image. No upscaling was used. The tall capture is stored in the ignored local audit directory; the committed public master is a same-dimension JPEG because WebP/AVIF maximum image dimensions cannot represent this full height. Responsive WebP/AVIF and card derivatives were regenerated. A1 display permission remains owner-gated.
- `npm run check`: PASS; 28 pre-existing lint warnings, no errors. This includes typecheck, Spanish mirror (79 paths), SEO ownership, analytics, commercial and relevant local guards.
- `npm run check:invoice-security`: PASS; all offline invoice/security/reconciliation fixtures passed. PayPal HTTP was mocked; the sandbox was not run.
- `npm run build`: PASS; 297 generated routes.
- Final two full Playwright runs used separate fresh servers, one worker: **68 passed, 6 expected skips, 0 failed** each. Parallel runs earlier exhibited isolated timing flakes (consent banner and consent reacceptance); immediate and final serial reruns passed. No retries were introduced into the test suite.
- `npm run check:structured-data`: **9/9** representative page types pass.
- Final local sitemap/crawl: **205 URLs** (150 sitemap + 55 discovered), **0 failed URLs**, **0 broken image references**. The previously successful committed exhaustive SEO evidence is preserved.
- `npm audit --omit=dev`: **0 vulnerabilities**. Full `npm audit`: **21 vulnerabilities** (12 moderate, 9 high, 0 critical); recommended `--force` remediation includes breaking downgrades and was not applied.
- The Phase 9.1 Windows smoke-runner exit `3221226505` remains a separate intermittent runner issue. This phase did not retry-loop it; independent exhaustive crawl and structured-data verification passed.

## Remaining release blockers and recommendation

The desktop performance gate passes under the corrected desktop profile; the mobile performance gate is still red on three routes, and the full dependency graph has high/moderate advisories. The remaining owner/external gates include manual WCAG 2.2 AA review, field CWV access/retention, GA4 key-event and Meta dataset/conversion verification, controlled lead-delivery receipt, approved PayPal sandbox, Conferbot/D1 lifecycle, client evidence and A1 screenshot permission, commercial billing/guarantee decisions, Spanish native editorial review, and Cloudflare KV operational/rate-limit review. See `RELEASE-GATE-STATUS.md` and `RELEASE-GATE-MATRIX.csv`.

**Recommendation:** Do not authorize Phase 10 or production release yet. The next performance action is a controlled cold/warm mobile simulation study with trace/source-map attribution for the modeled LCP, not another speculative optimization. Review the remaining gates and this evidence before authorizing any subsequent phase.
