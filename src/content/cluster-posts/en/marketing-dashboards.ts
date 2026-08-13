import { L } from "./_links";

export const body = `<p>Dashboards should answer whether marketing is generating profitable revenue, not drown teams in vanity metrics. A useful marketing dashboard connects channel activity to pipeline, cost, and outcomes executives already care about. Everything else is drill-down material.</p>
<p>A growth-stage ecommerce brand had twelve Looker Studio pages nobody opened. We rebuilt around two views: an executive weekly with revenue, MER, CAC, and channel contribution; and a channel ops view with campaign-level ROAS, creative fatigue flags, and inventory-aware ad spend. Meeting time spent debating data dropped; time acting on clear flags rose.</p>
<h2>Executive Dashboard Design</h2>
<p>One screen, five to seven KPIs max: revenue (or qualified pipeline), marketing efficiency ratio, CAC or CPA, ROAS or contribution margin, conversion rate, and period-over-period deltas. Use consistent date comparisons (WoW, MoM, YoY).</p>
<h3>Metrics Executives Trust</h3>
<p>Tie to finance where possible: Shopify or ERP revenue vs. platform-reported revenue with note on variance. Show MER (total revenue / total marketing spend) alongside platform ROAS to reduce blind spots.</p>
<h2>Channel Operations Dashboard</h2>
<p>Media buyers need campaign-level spend, impressions, CTR, CPC, conversions, CPA/ROAS, and budget pacing. Include creative or ad group dimensions for troubleshooting. Flag anomalies with simple conditional formatting.</p>
<h3>Leading vs. Lagging Indicators</h3>
<p>Lagging: revenue, ROAS, pipeline closed. Leading: impression share, quality score trends, email click rate, landing page speed. Pair them so teams see problems before quarter-end surprises.</p>
<h2>Data Sources and Integration</h2>
<p>Pull from ad platforms via native connectors, GA4 for site behavior, CRM for lead stage and closed-won, ecommerce for orders. Centralize in BigQuery, Looker Studio, or Metabase depending on stack. Document refresh schedules and owners.</p>
<h3>Avoiding Dashboard Sprawl</h3>
<p>One source of truth per question. If two dashboards disagree, people trust neither. Archive unused reports quarterly.</p>
<h2>Visualization Best Practices</h2>
<p>Label axes, note currency, show sample size on conversion rates. Avoid pie charts for more than three segments. Tables sort by spend or revenue impact default, not alphabetically.</p>
<h2>Governance</h2>
<p>Assign metric owners who validate definitions. Change logs when calculations shift. Train new hires on how to read the executive view in onboarding.</p>
<h2>When Dashboards Fail</h2>
<p>Usually tracking gaps, not tool choice. Fix attribution and event naming before adding another chart. Run a monthly "dashboard trust" review comparing dashboard totals to source systems.</p>
<p>Marketing dashboards work when they drive weekly decisions. Build an executive lens for profit and efficiency, a channel lens for daily optimization, and protect clarity ruthlessly. Less noise, more action.</p>
<h2>Alerting and Thresholds</h2>
<p>Set automated alerts for CPA spikes, conversion rate drops, and spend pacing beyond 110% of weekly plan. Alerts should name an owner and link to the drill-down dashboard. Unowned alerts become noise.</p>
<h3>Benchmarks and Targets</h3>
<p>Show targets as bands, not single lines. YoY comparisons account for seasonality better than MoM alone for retail and B2B with fiscal cycles. Document how targets were set so teams do not chase arbitrary numbers.</p>
<h2>Dashboard Rollout Process</h2>
<p>Pilot with marketing leadership for two weeks, gather "what is missing" feedback, then publish to wider team. Version dashboards in changelog notes when metrics definitions change. Trust erodes when numbers shift without explanation.</p>
<h2>Role-Specific Dashboard Views</h2>
<p>CMOs need efficiency and pipeline; media buyers need creative and keyword tabs; email leads need deliverability and revenue per send. One mega-dashboard serves nobody well. Link views from the executive page rather than cramming every metric above the fold.</p>
<h3>Documentation Alongside Charts</h3>
<p>Include a text panel with metric definitions and data refresh time. New hires and agency partners onboard faster when they do not guess whether ROAS is gross or net.</p>
<p>Review dashboard usage analytics if your BI tool supports it. Unused tiles are candidates for removal, not more decoration.</p>
<h2>Connecting Dashboards to Weekly Rituals</h2>
<p>Anchor leadership reviews to the same dashboard URL every Monday. When metrics slip, drill into channel tabs immediately instead of requesting custom exports. Ritual plus consistent views beats rebuilding slides from scratch each week.</p>
<h2>Mobile-Friendly Dashboard Views</h2>
<p>Executives check phones between meetings. Ensure key KPIs render on mobile layouts without horizontal scrolling. If the dashboard fails on phone, it will not drive daily decisions.</p>
<p>Name an owner for each dashboard tile who validates the number before leadership reviews.</p>
<p>Print the executive dashboard definition page in onboarding docs for every new marketing hire.</p>
<p>Archive superseded dashboard versions instead of deleting them outright.</p>
${L.analytics}`;
