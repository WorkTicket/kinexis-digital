import { L } from "./_links";

export const body = `<p>Random tweaks waste traffic and confuse stakeholders. A structured A/B testing framework prioritizes ideas, documents hypotheses, enforces sample discipline, and connects winners to revenue. Without that structure, teams chase noise, stop tests early, and argue about what "worked" last month.</p>
<p>A SaaS marketing team ran twelve tests in a quarter but only two reached significance. We introduced ICE scoring, mandatory hypothesis docs, and fixed minimum run times. Test velocity dropped slightly, but win rate doubled and documented learnings fed into messaging across ads and email. Quality beat quantity.</p>
<h2>Hypothesis-Driven Testing</h2>
<p>Every test starts with: <strong>Because we observed X, we believe Y will cause Z metric to improve.</strong> Observations come from analytics, heatmaps, support tickets, or sales calls. Vague "let's try blue" hypotheses belong at the bottom of the backlog.</p>
<h3>Success Metrics and Guardrails</h3>
<p>Pick one primary metric: conversion rate, revenue per visitor, lead quality score. Define guardrails: bounce rate, average order value, form error rate. A test that lifts signups but tanks lead quality is a loss.</p>
<h2>ICE Prioritization</h2>
<p>Score ideas on <strong>Impact</strong> (how much the metric could move), <strong>Confidence</strong> (evidence strength), and <strong>Ease</strong> (implementation cost). Sort by ICE score, not loudest opinion in the room. Re-score after major site changes.</p>
<h3>What Belongs in the Backlog</h3>
<p>High-impact areas first: headline, offer, CTA, form length, pricing presentation, trust placement. Low-traffic pages need longer run times; queue them with awareness of calendar reality.</p>
<h2>Sample Size and Statistical Significance</h2>
<p>Do not call winners at 80% confidence because Monday looked good. Pre-calculate required sample size based on baseline conversion and minimum detectable effect. Run until you hit the target or a fixed calendar end with analysis noted as inconclusive.</p>
<h3>Common Statistical Mistakes</h3>
<p>Peeking daily and stopping early inflates false positives. Testing multiple metrics without correction invites cherry-picking. Ignoring seasonality (B2B dips on weekends) skews results. Use proper test tools or stats calculators, not gut feel.</p>
<h2>Test Design Best Practices</h2>
<p>Test one meaningful change when learning is the goal. Multivariate tests need more traffic than most sites have. Split traffic 50/50 unless power analysis says otherwise. Exclude internal IP and bots. Document variants with screenshots for future reference.</p>
<h2>Learning Repository</h2>
<p>Archive every test: hypothesis, variants, runtime, result, decision. Tag by page type and audience. Quarterly, review patterns: do headline tests consistently win bigger than layout tests? Feed winners into personalization and ad copy.</p>
<h2>Organizational Fit</h2>
<p>Assign an owner for the testing roadmap. Align with dev and legal on what can ship without heavy review. Small businesses can still test headlines and CTAs with Clarity, VWO, or Optimizely; enterprise needs governance and SSO.</p>
<p>Structured experimentation compounds knowledge. Hypothesis first, ICE to prioritize, patience on sample size, and honest documentation when tests fail. That framework turns A/B testing from a casino into a growth engine.</p>
<h2>Programmatic vs. Manual Testing</h2>
<p>High-traffic sites can run multivariate or multi-armed bandit tests; most mid-market sites should stick to clear A/B splits until fundamentals are exhausted. Bandits optimize fast but teach less about why a variant won.</p>
<h3>Low-Traffic Workarounds</h3>
<p>Combine traffic to similar pages, test bigger swings instead of micro-copy changes, or use qualitative sessions while building volume. Accept longer run times rather than lowering confidence thresholds.</p>
<h2>Connecting Tests to Media Spend</h2>
<p>When a landing page test wins, roll the variant into ad creative and email within two weeks. Isolated wins that never propagate waste the traffic cost of learning. Maintain a rollout checklist tied to test completion dates.</p>
<h2>When Not to A/B Test</h2>
<p>During major traffic drops, site outages, or holiday anomalies, pause tests. Low traffic pages may need months per test; prioritize high-volume URLs first. Fix broken tracking before testing button colors. Statistical discipline includes knowing when data is too noisy to trust.</p>
<h2>Documenting Losing Variants</h2>
<p>Losers teach as much as winners when hypotheses are clear. Archive why a variant lost: was the idea wrong or the execution weak? Teams that only celebrate wins repeat failed patterns because nobody recorded the loss.</p>
<p>Share test results in a monthly CRO standup with ads and email present. Cross-channel rollout multiplies the value of each experiment.</p>
<h2>Tool Selection for A/B Tests</h2>
<p>Google Optimize sunset pushed teams to VWO, Optimizely, Convert, or native CMS tests. Pick tools that integrate with your analytics stack and support URL vs element tests. Server-side testing helps performance-sensitive pages when client-side flicker hurts UX.</p>
${L.funnels}`;
