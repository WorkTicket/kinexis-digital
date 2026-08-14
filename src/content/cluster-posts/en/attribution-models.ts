import { L } from "./_links";

export const body = `<p>Attribution decides how credit for a conversion gets split across touchpoints. The model you choose shapes budget allocation, creative strategy, and how channels fight or cooperate. No model is perfect; each answers a different question. The mistake is optimizing to one dashboard number without knowing what that number assumes.</p>
<p>A B2B company credited LinkedIn with zero pipeline because last-touch GA4 reports ignored early awareness clicks. Implementing a defined multi-touch model in their CRM plus GA4 path exploration showed LinkedIn influenced 38% of closed deals within 90 days, even when search got the last click. Budget shifted modestly; pipeline forecasting improved more than raw lead volume.</p>
<h2>Single-Touch Models</h2>
<p><strong>First-touch</strong> credits acquisition channels; good for understanding awareness drivers.<br><strong>Last-touch</strong> credits closers; common default but misleading for long cycles.<br>Both ignore everything in between.</p>
<h3>When Single-Touch Is Enough</h3>
<p>Short sales cycles, single-channel dominance, or early-stage teams needing simple reporting. Document limitations explicitly.</p>
<h2>Multi-Touch Models</h2>
<p><strong>Linear</strong> splits credit equally.<br><strong>Time decay</strong> weights recent touches more.<br><strong>Position-based (U-shaped)</strong> emphasizes first and last.<br><strong>Data-driven (DDA)</strong> uses machine learning on your conversion paths in GA4.</p>
<h3>Choosing a Model</h3>
<p>Match sales cycle length and touchpoint count. Six-month enterprise deals need multi-touch or DDA; same-day ecommerce may live on last-touch with platform ROAS checks.</p>
<h2>GA4 and CRM Integration</h2>
<p>GA4 path exploration and advertising reports show assisted conversions. CRM opportunity data adds revenue and stage timing. Join them with UTM discipline and offline conversion imports for closed-loop learning.</p>
<h3>UTM Hygiene</h3>
<p>Inconsistent naming breaks attribution. Maintain a living UTM spreadsheet: source, medium, campaign rules. Audit quarterly for rogue lowercase variants.</p>
<h2>Platform vs. Unified Attribution</h2>
<p>Each ad platform self-reports generously. Marketing mix modeling and incrementality tests provide sanity checks. Compare channel reports monthly; large gaps signal double-counting or missing tags.</p>
<h2>Organizational Alignment</h2>
<p>Finance may care about revenue recognition; marketing cares about touch assists; sales cares about sourced vs. influenced. Define shared definitions in one attribution doc before debates get personal.</p>
<h2>Evolution Over Time</h2>
<p>Revisit models when you add channels, change cycle length, or move upmarket. Attribution is a living policy, not a one-time GA setting.</p>
<p>Attribution models are lenses, not truth. Pick the lens that matches the decision at hand, combine with incrementality when stakes are high, and teach stakeholders what the numbers mean. Better decisions follow.</p>
<h2>Marketing Mix Modeling Basics</h2>
<p>When digital touch tracking breaks (iOS privacy, offline sales), marketing mix modeling estimates channel contribution using regression on spend and revenue over time. MMM is slow and requires clean historical data, but it complements platform reporting for budget allocation at scale.</p>
<h3>Incrementality Testing Playbook</h3>
<p>Run geo holdouts: pause spend in selected regions while holding others constant. Measure lift difference after four to six weeks. Use for channels where last-click shows zero but brand search correlates with display spend.</p>
<h2>Reporting Attribution Honestly</h2>
<p>Present ranges and multiple models in leadership reviews. "Last-touch says search wins; position-based says LinkedIn assists 35% of pipeline" is more useful than false precision. Document known blind spots like dark social and word of mouth.</p>
<h2>Offline and Online Joined Attribution</h2>
<p>Phone calls, store visits, and sales-assist deals need CRM fields capturing first touch and influencing campaigns. Train reps to ask "how did you hear about us?" and log consistently. Digital attribution improves when offline inputs feed the same model.</p>
<h3>Attribution for Long Sales Cycles</h3>
<p>B2B deals closing six months after first touch require opportunity-level attribution in CRM, not only session-based GA4 reports. Sync ad click IDs to CRM where possible for clearer path reconstruction.</p>
<p>Revisit attribution policy when you add a major channel or change average deal size. Models that worked at $2K ACV often break at $20K.</p>
<h2>Weighted Attribution Custom Models</h2>
<p>Some teams build spreadsheet models weighting touchpoints by channel role: paid search last touch weighted 40%, first-touch content 30%, mid-funnel email 30%. Custom weights beat default linear when you have clear hypotheses about your funnel.</p>
<h2>Board-Level Attribution Summaries</h2>
<p>Executives need one slide on assisted pipeline and one on sourced revenue, with footnotes on model assumptions. Depth lives in appendix tabs; the meeting stays focused on budget decisions.</p>
<p>Update the attribution doc when sales cycle length changes. Stale assumptions misallocate budget faster than stale creative.</p>
<p>Share attribution definitions with agency partners so reported wins use the same rules as internal teams.</p>
${L.analytics}`;
