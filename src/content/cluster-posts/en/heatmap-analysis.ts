import { L } from "./_links";

export const body = `<p>Heatmaps show where users click, how far they scroll, and what they ignore. That beats debating redesigns from opinions alone. Session recordings plus heatmap data reveal friction on landing pages, checkout flows, and long-form sales pages. The goal is not pretty charts; it is finding fixable problems that lift conversion rate.</p>
<p>A B2B demo request page looked fine in design reviews. Click maps showed 34% of taps landing on a non-clickable hero image users assumed was a video. Scroll maps showed only 22% reached testimonials placed too low. Making the hero playable and moving proof above the fold raised demo submissions 27% in three weeks without new traffic.</p>
<h2>Types of Heatmaps</h2>
<p><strong>Click maps</strong> aggregate where users click or tap. <strong>Scroll maps</strong> show how far down the page users travel before dropping off. <strong>Move maps</strong> (desktop) trace mouse movement as a proxy for attention. Each answers different questions; use them together.</p>
<h3>Choosing Sample Sizes</h3>
<p>Heatmaps need enough sessions to stabilize patterns. For most B2B pages, 500 to 1,000 sessions per variant is a starting point. Segment mobile and desktop; combined maps hide device-specific issues.</p>
<h2>Reading Click Maps</h2>
<p>Look for rage clicks on non-interactive elements, ignored primary CTAs, and unexpected hotspots on navigation that pull users off funnel. Dead clicks on images often mean users expect functionality you have not built.</p>
<h3>CTA Visibility Problems</h3>
<p>If clicks cluster on secondary links while the main CTA stays cold, check contrast, size, and copy. Sticky mobile CTAs can help when scroll maps show most users never reach bottom CTAs.</p>
<h2>Scroll Depth Analysis</h2>
<p>Identify the fold drop-off where engagement cliffs. Place key proof, pricing, and CTAs above that line or add mid-page CTAs for long pages. Content that never gets read should move up or be cut.</p>
<h3>Long-Page vs. Short-Page Tests</h3>
<p>Heatmaps settle "long vs short" debates with evidence. High-intent buyers often scroll deep if sections are scannable. Low-intent traffic may bounce early regardless; pair scroll data with traffic source.</p>
<h2>Combining Heatmaps With Other Data</h2>
<p>Layer heatmaps with form analytics, GA4 funnel steps, and A/B tests. A hot click area that does not convert suggests misleading UI. High scroll depth with low conversion suggests offer or trust problems, not layout alone.</p>
<h3>Session Recordings</h3>
<p>Watch recordings from segments that almost converted: abandoned forms, cart exits, repeated back navigation. Heatmaps tell you where; recordings often show why.</p>
<h2>Tooling and Privacy</h2>
<p>Hotjar, Microsoft Clarity, Crazy Egg, and FullStory each have tradeoffs. Mask sensitive fields, disclose tracking in privacy policies, and sample on high-traffic pages if performance is a concern.</p>
<h2>From Insight to Test</h2>
<p>Turn observations into hypotheses: "Moving social proof above 40% scroll line will increase form starts." Test one major change at a time when possible. Re-run heatmaps after winners ship to confirm behavior shifted.</p>
<p>Heatmap analysis works when it feeds a prioritized test backlog, not when it becomes wallpaper for stakeholders. Find the dead clicks, fix the fold, and align CTAs with where attention already goes.</p>
<h2>Segmenting Heatmap Data</h2>
<p>Filter by traffic source, device, and new vs. returning visitors. Paid social users behave differently from branded search. A heatmap that blends all traffic hides the segment-specific fixes that would move conversion rate most.</p>
<h3>Before and After Documentation</h3>
<p>Export heatmap screenshots before launching redesigns or tests. Compare after two weeks of similar traffic volume. Visual before/after evidence helps stakeholders understand why a change shipped and whether behavior actually shifted.</p>
<h2>Common False Positives</h2>
<p>Mouse movement on desktop does not always mean attention on mobile. Rage clicks can be bot traffic. Low scroll depth on short pages is normal. Validate heatmap patterns with quantitative funnel data before rebuilding entire templates.</p>
<h2>Heatmap Tools Compared</h2>
<p>Microsoft Clarity is free and pairs well with GA4. Hotjar offers polished sharing for stakeholders. Enterprise teams may need session replay with PII masking for regulated industries. Pick one primary tool; stacking multiple trackers slows pages and duplicates insights.</p>
<h2>From Heatmaps to Development Tickets</h2>
<p>Translate findings into actionable specs: "Move primary CTA to 400px scroll on mobile template" beats "improve CTA." Attach screenshots with click percentages. Developers ship faster with precise placement notes than with abstract UX feedback.</p>
<p>Schedule quarterly heatmap reviews on top three revenue pages even when no redesign is planned. Behavior shifts as traffic mix changes.</p>
${L.funnels}`;
