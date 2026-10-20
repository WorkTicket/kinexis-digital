import { L } from "./_links";

export const body = `<p>ROAS looks simple until you try to make decisions with it. Revenue divided by ad spend tells you nothing about profit if margins vary by product, channel, or customer type. Teams that optimize to blended ROAS alone often scale unprofitable prospecting while retargeting masks the damage. Calculate break-even ROAS first, then segment performance so scaling decisions protect margin.</p>

<h2>ROAS Formula and What It Omits</h2>
<p><strong>ROAS = Revenue from Ads / Ad Spend.</strong> It ignores COGS, fulfillment, returns, payment fees, and lifetime value. Use ROAS for pacing and channel comparison only when margins are consistent.</p>
<h3>Break-Even ROAS</h3>

<h2>Contribution Margin ROAS</h2>
<p>Smarter teams use contribution margin after product and fulfillment costs. <strong>CM-ROAS = Contribution Margin / Ad Spend.</strong> This aligns marketing with finance and prevents celebrating revenue that costs money to deliver.</p>
<h3>LTV Considerations</h3>
<p>Subscription and repeat-purchase models can accept lower front-end ROAS if payback period is defined. Set explicit horizons: 30-day, 90-day, and 12-month LTV ROAS targets. Do not fund acquisition on infinite LTV assumptions without cohort data.</p>
<h2>Blended vs. Channel ROAS</h2>
<p>Blended ROAS across prospecting and retargeting hides weak top-of-funnel performance. Report them separately. Brand search often inflates paid search ROAS; strip brand for a clearer view of non-brand efficiency.</p>
<h3>Platform vs. Business ROAS</h3>

<h2>Setting ROAS Targets by Campaign Type</h2>
<p>Prospecting tolerates lower ROAS if LTV supports it; retargeting should exceed break-even comfortably. New customer campaigns deserve stricter thresholds than catch-all campaigns mixing returning buyers.</p>
<h3>Incrementality Checks</h3>
<p>Run geo holdouts or pause tests periodically to see if reported ROAS drops when spend stops. Some retargeting ROAS is capturing demand that would convert anyway. Incrementality experiments prevent over-crediting channels.</p>
<h2>Reporting Cadence</h2>
<p>Weekly: platform ROAS by campaign with spend thresholds. Monthly: CM-ROAS tied to finance closes. Quarterly: LTV cohort updates and target revisions. Document assumptions so new team members do not inherit mystery numbers.</p>
<p>ROAS is a guidepost, not the finish line. Pair it with margin math, segmented reporting, and occasional incrementality tests and you get a picture of true ad profitability worth scaling.</p>
<h2>Finance and Marketing Alignment</h2>
<p>Share a one-page ROAS glossary with finance: definitions of gross vs. net revenue, which costs are in margin, and payback windows for LTV models. When both teams use the same break-even ROAS number, budget conversations get shorter and more productive.</p>
<h3>Scenario Planning</h3>

<h2>Reporting Templates</h2>
<p>Build a weekly ROAS sheet with columns for spend, revenue, margin, break-even threshold, and status flag (scale, hold, cut). Color-code by segment. Executives scan flags; media buyers drill into campaign tabs. Consistency week over week matters more than novel visualizations.</p>
<h2>Common ROAS Mistakes</h2>
<p>Including shipping revenue but excluding shipping cost inflates ROAS. Counting assisted conversions as equal to closed revenue on long sales cycles overstates paid performance. Using platform default attribution without comparing to CRM closed-won dates leads to premature scaling. Fix the inputs before debating the outputs.</p>
<h2>ROAS Targets by Funnel Stage</h2>
<p>Top-of-funnel video and display may run below break-even ROAS while mid-funnel search and retargeting carry the blend. Set stage-specific targets in planning docs so teams do not pause awareness that feeds converters three weeks later.</p>
<h3>New Customer ROAS</h3>
<p>Strip returning purchasers from prospecting ROAS calculations when possible. Platforms often credit retargeting and prospecting together. CRM or ecommerce exports tagged with first-order flag reveal true acquisition efficiency.</p>
<p>Review ROAS weekly in a fixed template shared with finance. Consistent format beats ad hoc slides when budgets are on the line.</p>
${L.analytics}`;
