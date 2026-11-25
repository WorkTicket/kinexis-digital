# Phase 9.2 — Release-gate status

**Disposition:** Not release-ready. The desktop Lighthouse gate passes after correcting the benchmark's inherited mobile throttle; three mobile routes remain below the .95 release target, and full-tree dependency vulnerabilities remain. Several required gates are owner-, provider-, accessibility-reviewer-, or production-environment dependent. This is not authorization for Phase 10, provider activity, or deployment.

## Engineering findings

| Gate | Status | Evidence / next action |
|---|---|---|
| Production build and type/lint | PASS | `npm run build`: 297 routes; CSS-inlining and no-legacy-polyfill guards pass. `npm run check`: pass; 28 existing lint warnings, 0 errors. |
| Invoice security | PASS | `npm run check:invoice-security`: all offline invoice/payment/security fixtures pass. PayPal HTTP is mocked; no sandbox order was run. |
| Playwright | PASS, with intermittent parallel flake noted | Two final, separate fresh-server runs at one worker: each 68 passed, 6 expected skips, 0 failures. Earlier four-worker attempts each exposed a different transient timing failure; both passed on immediate rerun, then the final serial pair passed. Keep as a flakiness risk, not a product regression finding. |
| SEO ownership / Spanish mirror | PASS | Included in `npm run check`: ownership guard passes (42 intents, 48 posts); Spanish mirror passes 79 paths. |
| Structured data | PASS | `npm run check:structured-data`: 9/9 representative page types pass. |
| Local sitemap and exhaustive crawl | PASS | Final post-build crawl: 205 URLs, comprising 150 sitemap URLs and 55 discovered URLs; 0 failed URLs and 0 broken image references. Existing committed Phase 9 SEO crawl evidence remains preserved. |
| Lighthouse budgets | PARTIAL | Final runs on the same build/server: mobile `/` .94/.94, `/pricing` .93/.93, `/portfolio` .92/.92, `/contact` .95/.95 against the .95 mobile release gate; desktop is 1.00 on all four routes in both runs against .85. The old .75–.80 desktop scores came from missing desktop throttle settings; the benchmark now uses explicit 40ms/10Mbps/1× CPU desktop simulation. Runner floor remains .85; the stricter .95 mobile release gate is unchanged and remains enforced here. |
| Full dependency audit | FAIL | `npm audit`: 21 vulnerabilities (12 moderate, 9 high, 0 critical). Proposed force fixes include breaking framework/adapter downgrades; do not force. |
| Production dependency audit | PASS | `npm audit --omit=dev`: 0 vulnerabilities. |
| Case-study screenshot sources | PASS, scoped owner permission recorded | The 2026-11-21 PDF's “after” captures for Manos Creativas Bynmw, Preferred Plumbing Solutions, and A1 Property Services are approved for public Kinexis Digital website use under those names. The three responsive image sets were replaced and the shared asset version bumped. No “before” concepts, performance claims, testimonials, or other-channel use is approved by this scope. |
| Smoke route runner | OPEN, non-blocking to current crawl | Phase 9.1's separate Windows smoke-runner process exited `3221226505`. The exhaustive crawl and structured-data checks passed; do not retry-loop the crashing runner. Investigate runner/runtime separately if needed for release CI. |

## Remaining owner / external release requirements

- **Accessibility reviewer:** complete manual WCAG 2.2 AA review, including screen reader, contrast, keyboard, zoom/reflow, and form announcements. Automated axe/proxy checks are not certification.
- **Analytics owner:** confirm `generate_lead` is the sole GA4 key event after controlled submission; verify correct Meta Pixel/dataset and custom-conversion rules in the owner's account; decide Google Ads destination/conversion intent. No provider account configuration was changed here.
- **Operations / lead delivery:** verify the previously authorized isolated test reached only the intended test sink and that no customer was contacted. No new lead was submitted in Phase 9.2.
- **Finance / owner:** authorize isolated PayPal sandbox verification and confirm merchant/webhook configuration; approve billing timing and guarantee qualifications.
- **Operations:** provision and verify isolated Conferbot/D1 lifecycle; review Cloudflare KV rate-limit concurrency and missing-binding behavior.
- **Owner / client:** screenshot permission for the three supplied “after” captures is recorded with its scope; confirm any separate permission needed for other client/review evidence or broader channels.
- **Analytics / privacy:** establish production field Core Web Vitals reporting, consent/legal review, and retention/access policy.
- **Spanish editor:** certify native-language content and localized commercial/legal wording.

The full owner, status, evidence and verification register is `RELEASE-GATE-MATRIX.csv`.

## Recommendation

Do not start Phase 10 or release. A focused mobile trace/model investigation should next target the remaining three mobile scores; do not treat the prior desktop deficit as an application defect. Separately, owners should clear account, evidence, consent, legal/commercial and external-provider gates. Engineering should track compatible dependency updates without forced breaking downgrades. Reassess release only after review of those results.
