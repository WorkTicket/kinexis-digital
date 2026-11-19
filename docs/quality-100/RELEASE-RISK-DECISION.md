# Release-risk decision after Phase 9.2

**Assessment date:** 2026-11-17  
**Reviewed HEAD:** `351ed618e60fb0c99f48e0e324abe97c7860d0f1` on `phase-1/conversion-handoff`  
**Disposition:** Do not start Phase 10 or release. This is a risk assessment, not authorization for provider activity or deployment.

## Decision summary

- **Dependency security:** Full `npm audit` reports 21 advisories (12 moderate, 9 high, 0 critical). The nine high package entries are transitive manifestations of one picomatch advisory, not nine distinct vulnerabilities. Both affected picomatch copies are reachable from development tooling; the production-only audit reports zero vulnerabilities. No compatible published fix was available at review time, so no dependency change was justified.
- **Production exposure:** No known vulnerable package path was identified in the production dependency tree. The confirmed high-severity exposure is to local lint/type-analysis and CI/build-tool processes that consume untrusted pattern input, not demonstrated deployed request handling. Production-only audit cleanliness is not a guarantee against unknown or future issues.
- **Performance:** Desktop is 100 on all four routes. Mobile is home 94, pricing 93, portfolio 92, contact 95. Simulated mobile LCP is approximately 2.94–3.32 seconds; production field Core Web Vitals (CWV) are unavailable. No component-level defect has been confirmed as the cause of the remaining score gap.
- **Mobile decision required:** Keep the 95-point gate unless the owner explicitly approves the time-limited exception in Option B below. No exception is assumed here.
- **Phase 10:** Not cleared. Production release blockers remain across lead delivery, analytics/privacy, commercial and evidence permissions, accessibility, field CWV, and provider/Cloudflare operations. The owner must also decide the mobile gate disposition.

## Dependency security assessment

The assessment used the complete `npm audit` JSON and `npm explain` paths from the reviewed lockfile, plus `npm audit --omit=dev`. npm listed nine high-severity package entries, all attributable to **GHSA-fc5q-39xc-vjpf / CVE-2026-112366**, a ReDoS in picomatch through 4.0.7 triggered by single-branch repeated extglob patterns.

| Affected package / version | Vulnerable path | Context and reachability | Fix and residual risk |
|---|---|---|---|
| `picomatch@2.3.2` | `eslint-config-next@16.4.6` → `@next/eslint-plugin-next@16.4.6` → `fast-glob@3.3.1` → `micromatch@4.0.8` → picomatch | Development dependency used by ESLint. The Next ESLint plugin calls `fast-glob` to resolve configured Next root directories; the vulnerable matcher is potentially reachable when linting processes attacker-controlled or otherwise untrusted glob patterns. It is not in the production dependency tree. | No patched picomatch 2.x release was published (`npm view picomatch@2.3.3` returned 404). GitHub advisory lists no patched version; proposed upstream fix PR #237 remained open at review. npm's suggested `eslint-config-next@14.2.35` remediation is a major downgrade and was rejected. |
| `picomatch@4.0.7` | `eslint-config-next@16.4.6` → `eslint-import-resolver-typescript@3.10.1` → `tinyglobby@0.2.17` → `picomatch@4.0.7`; also `eslint-config-next` → `typescript-eslint@8.72.0` → `@typescript-eslint/parser` / `typescript-estree@8.72.0` → `tinyglobby@0.2.17` → picomatch | Development lint/type-analysis tooling. `tinyglobby` functions are used to match TypeScript project/include patterns. Pattern-processing reachability exists in those tools, but no deployed route or production runtime path was found. | No patched picomatch 4.x release was published (`npm view picomatch@4.0.8` returned 404). npm reports a generic fix for some transitive package rows, but no compatible fix resolving this advisory was identified. |

Other high rows (`@next/eslint-plugin-next`, `eslint-config-next`, `fast-glob`, `micromatch`, `fdir`, `tinyglobby`, and `@typescript-eslint/typescript-estree`) are npm's affected/dependency-path roll-up for the same underlying advisory; they are not separate high CVEs. The nine-row count must not be interpreted as nine independent high findings.

**Recommendation:** Do not force an override or downgrade framework dependencies. Keep untrusted pattern input out of local/CI lint and type-analysis configuration; use reviewed source and pull requests. Recheck the advisory and package tree when upstream publishes a compatible fix, then update in a separate tested change. The complete tree still has moderate advisories (notably glob/minimatch); track and triage those separately. Full audit remains a dependency-hygiene concern, but the evidence does not establish a production vulnerability.

## Mobile performance decision

Phase 9.2's corrected, explicit desktop Lighthouse profile scored 100/100 on all four routes in both final runs. The unchanged mobile method scored `/` 94, `/pricing` 93, `/portfolio` 92, `/contact` 95, against the established 95 release gate. Modeled mobile LCP is approximately 2.94–3.32 seconds. No production RUM/Search Console field CWV data is available. Saved traces and the root-cause review identify investigation leads, not a confirmed component-level defect; no targeted code fix is currently justified. Preserve the Lighthouse methodology, runner floor, and 95-point target.

Choose one option explicitly; **neither is selected by this assessment**:

- **A — Retain the 95 gate.** Continue focused, trace-backed remediation for the three failing routes and rerun the same mobile profile. Do not perform broad speculative optimization. Release remains blocked until all four routes meet the gate, or the owner separately changes the decision.
- **B — Owner-approved, time-limited exception.** The owner may authorize release with home/pricing/portfolio below 95 only after confirming that no material user-facing defect is demonstrated. Record the named approver, rationale, scope, monitoring owner, and a dated remediation deadline. Collect production field CWV at representative p75 over an adequate period, monitor errors/conversion and user-facing performance, and revisit the exception by its deadline. This exception does not waive other release gates or certify CWV.

## Provider and production verification — procedures only

No provider tests or production mutations were performed. Perform these only with owner authorization and isolated/test accounts where applicable:

1. **GA4 `generate_lead`:** In property `542906196`, use an approved labeled preview submission in a controlled test session. Confirm `generate_lead` appears in Realtime/DebugView with the expected measurement ID and parameters; inspect key-event configuration read-only and confirm `generate_lead` is the sole key event. Leave `preview_form_submit` and `audit_request` non-key unless the owner separately selects a goal. Record event receipt and property/date; do not change account settings without approval.
2. **Meta Pixel and dataset:** With the owner's authorized Meta Business account, identify the dataset actually used by campaigns (do not rely on the “Kinexis Reviews” label). In Events Manager, confirm Pixel `2080705549212381` / the campaign dataset receives the approved test `Lead`; inspect ad account `235075765`, event matching, and custom-conversion rules read-only. Browser transport response alone is not account receipt or attribution evidence. Do not use another person's logged-in session.
3. **Controlled lead delivery:** First inspect the provider/test-sink log for the already authorized labeled preview submission and verify destination, receipt, and that no real customer was contacted. Do not resubmit until the owner authorizes it. If a new test is approved, use a clearly labeled synthetic lead and isolated sink; verify message delivery, routing, and absence of production/customer delivery.
4. **PayPal sandbox:** Obtain Finance/owner approval, sandbox credentials, a test buyer, and isolated callback/webhook URLs. Create and approve a sandbox order, capture it through the application callback, and verify webhook signature handling and expected invoice/payment-ledger state transitions, including duplicate/retry behavior. Never use live credentials or capture a live payment for this check.
5. **Conferbot webhook and D1:** Provision a nonproduction bot, isolated secret and `LEAD_DB`, and apply the approved migration only to that test database. Send signed synthetic create, update, duplicate, retry, invalid-signature, and partial-failure events. Verify idempotency and persisted state in the isolated D1 database; confirm no production bot or database is targeted. `LEAD_DB` is not present in the checked-in Wrangler bindings.
6. **Production field CWV:** Obtain approved read-only access to production RUM and/or Search Console. Confirm collection scope, consent basis, sampling and retention; collect representative real-user p75 LCP/INP/CLS across routes and device classes for an adequate window. Document sample sizes, dates, route coverage, and uncertainty. Do not substitute Lighthouse simulation for field evidence.
7. **Cloudflare KV rate limiting:** In a nonproduction Worker/namespace, verify configured bindings and exercise a controlled per-IP/window request sequence, including boundary, concurrent, KV error, and missing-binding cases. Record whether limits are consistent and whether failure is open/closed. Review production binding/observability configuration read-only; do not load-test or mutate production without separate authorization. KV get/put is non-atomic and must not be treated as an authentication control.

## Owner decisions and release classification

“Release blocker” here means the decision/evidence must be resolved before production release; it does not prevent unrelated planning work. Items explicitly labeled post-release may be deferred only with owner acceptance and a dated follow-up.

| Decision | Evidence / owner action | Classification |
|---|---|---|
| Website ownership terms | Approve and reconcile monthly-plan ownership and `Own It` site-file/hosting terms with the actual commercial arrangement. | **Release blocker** for offering/checkout claims. |
| Billing timing | Resolve checkout’s “first charge when you subscribe” versus terms’ launch-day start; approve consistent language. | **Release blocker** before accepting paid subscriptions. |
| Guarantee qualifications | Approve whether checkout summary plus linked terms adequately states eligibility, good standing, exclusions, pause/cancellation, and tracking-interference qualifications. | **Release blocker** before selling the guarantee. |
| Testimonial and screenshot permissions | Confirm written permission and accurate attribution for each review and portfolio/client asset, including the A1 screenshot. | **Release blocker** for each unapproved claim/asset; remove or withhold it if permission is absent. |
| Spanish commercial wording | Native-editor/owner approval of translated pricing, billing, guarantee, privacy, and legal wording. | **Release blocker** for publishing/soliciting in the affected Spanish market; otherwise may be deferred only by withholding that market's commercial flow. |
| Privacy and analytics retention | Approve consent/legal basis, vendor behavior, RUM collection, access, sampling, and retention. | **Release blocker** for enabling the affected tracking/RUM; unrelated pages may launch only if tracking is disabled or approved controls are in place. |
| Accessibility sign-off | Accessibility reviewer to complete manual WCAG 2.2 AA evaluation (keyboard, screen reader, contrast, zoom/reflow, form announcements). Existing axe/proxy results are not certification. | **Release blocker** for a claim of conformance; obtain review before general release as a launch quality gate. |
| Mobile gate | Owner selects Option A or explicitly approves Option B with terms above. | **Release blocker** to release disposition; no exception is implied. |

## Gate disposition and next decision

Preserve Phase 9.2's accepted SEO crawl, screenshot, and regression evidence. The matrix is amended only to clarify that the high finding is one development-tooling advisory and that the production-only audit is clean; the overall full-tree audit remains failed pending upstream fixes.

**Phase 10 cannot safely begin under the current authorization and evidence.** This review does not authorize it. First obtain the mobile-gate decision and clear applicable release blockers; complete the approved external verification procedures and accessibility/commercial/privacy reviews. No deployment, provider test, production mutation, push, or merge was performed as part of this assessment.
