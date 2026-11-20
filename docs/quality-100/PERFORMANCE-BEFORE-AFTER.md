# Phase 9.2 — Before / after record

## Controlled Lighthouse comparison

Both measurements use one optimized `next start` build on localhost, Lighthouse **13.6.0**, Chromium **159.0.8154.6**, the repository's mobile and desktop viewports, simulated throttling, and unchanged budgets (mobile 0.95; desktop 0.85). Each result is the mean-compatible pair of sequential route runs from the same build/server; no score or metric has been selectively omitted.

| Route | Mobile before (runs 1/2) | Mobile final (explicit runs 1/2) | Desktop old harness (mobile throttle) | Desktop corrected profile (runs 1/2) |
|---|---:|---:|---:|---:|
| `/` | .94 / .94 | .94 / .94 | .76 / .76 | 1.00 / 1.00 |
| `/pricing` | .93 / .93 | .93 / .93 | .76 / .76 | 1.00 / 1.00 |
| `/portfolio` | .92 / .92 | .92 / .92 | .75 / .75 | 1.00 / 1.00 |
| `/contact` | .95 / .95 | .95 / .95 | .80 / .80 | 1.00 / 1.00 |

The mobile before/final pairs use the same mobile simulation; all scores are stable and three routes remain below the .95 release gate. The former desktop pair was **not a valid desktop-condition benchmark**: its LHRs show inherited mobile emulation (150ms RTT, ~1.6Mbps, 4× CPU). The final desktop pair uses the corrected explicit profile (40ms RTT, 10Mbps, 1× CPU). The 1.00 desktop results are a measurement-protocol correction, not an application optimization or a directly comparable performance gain. Budget thresholds remain .85 in the runner and .95 for the mobile release gate.

### Metric ranges, first post-change run

| Factor | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|
| Mobile simulation, four routes | 1.23–1.46s | 2.56–3.32s | 37–78ms | 0 |
| Desktop explicit profile, four routes | 0.29–0.37s | 0.65–0.71s | low; all performance scores 1.00 | 0 |

The corrected final output is retained under `.audit/phase92/desktop-corrected-run-{1,2}.txt` and `.audit/phase92/mobile-corrected-run-{1,2}.txt`. Full LHRs and traces are under `.audit/phase92/traces/`; the explicit desktop diagnostic LHRs are under `.audit/phase92/desktop-config/`. These are ignored local diagnostics, not committed artifacts.

## Controlled implementation change

**Change:** Captured the live A1 site at a CSS viewport of 1280px and DPR 2. Playwright produced a genuine **2560×20446** full-page PNG. The capture was encoded as a 2560px-wide JPEG master (height exceeds WebP/AVIF maximum image dimensions) and new responsive WebP/AVIF plus card derivatives. Updated A1 intrinsic dimensions and generalized extension handling in the portfolio variant helpers; the 1600px AVIF candidate and JPEG original are offered at their real widths.

**Reason:** Phase 9.1's authentic master was 1041px wide, below the requested high-density requirement. Upscaling was explicitly rejected.

**Verification:** Production build passed; mobile Lighthouse scores are stable and have no demonstrated A1-related change; desktop corrected-profile scores are 1.00 twice. Full local crawl reports 205 URLs, 0 failed URLs, and 0 broken image references. Full Playwright runs after asset/helper changes are recorded in Phase 9.2 status.

## Performance changes retained

**No product optimization.** One test-harness correction was made: the desktop Lighthouse budget now specifies desktop throttling explicitly. No product feature was removed, no quality was reduced, and no Lighthouse threshold was changed.
