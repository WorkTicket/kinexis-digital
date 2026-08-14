import { L } from "./_links";

export const body = `<p>Quality Score is Google's way of estimating whether your ads, keywords, and landing pages satisfy searchers. Higher scores mean lower CPCs and better ad positions for the same bid. It is not a vanity metric. A one-point improvement across high-spend campaigns can save thousands monthly and free budget for prospecting.</p>
<p>We inherited a Google Ads account spending $45K monthly on branded and non-branded search. Average Quality Score was 5.2. Tightening ad groups, rewriting ads to match intent clusters, and fixing landing page message match raised the account average to 7.8 in six weeks. CPC dropped 22% while conversion volume held steady. Same bids, better auctions.</p>
<h2>Quality Score Components</h2>
<p>Google evaluates three factors: expected click-through rate, ad relevance, and landing page experience. Each keyword gets a below average, average, or above average rating per component. The combined score is 1 to 10 at the keyword level.</p>
<h3>Expected CTR</h3>
<p>Google compares your expected CTR against competitors for the same auction. Improve it with compelling headlines, clear differentiation, and ad extensions that add surface area: sitelinks, callouts, structured snippets, and price extensions where appropriate.</p>
<h3>Ad Relevance</h3>
<p>Ads should mirror the keyword theme in the ad group. Single-theme ad groups with 5 to 15 close variants outperform bloated groups where one ad tries to cover every synonym. Use Dynamic Keyword Insertion sparingly; it helps relevance only when landing pages match too.</p>
<h3>Landing Page Experience</h3>
<p>Send clicks to pages that load fast, match ad promise, and make the next step obvious. Thin pages, pop-up walls, and mobile layout breaks drag this component down.</p>
<h2>Improving Quality Score in Practice</h2>
<p>Export keywords with Quality Score and sort by spend. Fix high-cost, low-score terms first. Split ad groups where one keyword drags relevance down. Pause keywords that never achieve average ratings after two rounds of creative and LP tests.</p>
<h3>Ad Copy Testing Rhythm</h3>
<p>Run two to three RSA variants per ad group with pinned headlines only when data supports it. Test specificity: "Same-Day AC Repair in Austin" vs generic "HVAC Experts." Include proof points: ratings, years in business, guarantees. Refresh ads before fatigue shows in declining CTR.</p>
<h3>Landing Page Alignment</h3>
<p>Headline on the page should echo the ad hook. Remove navigation clutter on dedicated campaign pages. Keep forms above the fold on mobile. Page speed under three seconds on 4G is a practical threshold for paid traffic.</p>
<h2>Quality Score and Smart Bidding</h2>
<p>Automated bidding still benefits from Quality Score because it influences Ad Rank. Low scores force higher bids to maintain position, which confuses algorithm learning phases. Clean structure before scaling tROAS or tCPA campaigns.</p>
<h2>Common Mistakes</h2>
<p>Chasing 10/10 on every keyword wastes time; aim for 7+ on money terms. Ignoring mobile LP experience while desktop scores look fine. Using broad match without tight negatives and wondering why relevance tanks. Sending all traffic to the homepage instead of intent-specific URLs.</p>
<h2>Monitoring and Reporting</h2>
<p>Track weighted average Quality Score weekly in a pivot by campaign. Log changes when you restructure ad groups or launch new LPs. Tie score improvements to CPC and impression share so finance sees the connection.</p>
<p>Quality Score rewards relevance and user experience, which aligns with good marketing anyway. Structure accounts tightly, write ads that match intent, and send clicks to pages built for conversion. The score rises as a natural result.</p>
<h2>Account Structure for Quality Score</h2>
<p>SKAG-style extremes are outdated, but tight thematic ad groups remain essential. Separate brand, competitor, and non-brand campaigns. Split match types when data supports different creative needs. A messy account forces generic ads that hurt relevance across the board.</p>
<h3>Extension Strategy</h3>
<p>Ad extensions improve expected CTR without changing core copy. Sitelinks to specific landing pages, callouts for guarantees, and structured snippets for service types all add relevance signals. Review extension performance monthly and pause underperformers that clutter the ad.</p>
<h2>Diagnosing Low Quality Score Keywords</h2>
<p>Hover over the score in Google Ads to see which component lags. Below average landing page experience with strong ad relevance usually means speed or mobile UX fixes, not more ad copy tests. Export keywords with Quality Score below 5 and impression share above 10% for a focused weekly review list.</p>
<h2>Seasonal and Promotional Campaigns</h2>
<p>Quality Score can dip during short promotions when ad copy changes fast. Pre-build ad variants and landing page modules for seasonal pushes so relevance stays tight on day one. Revert or refresh after promotions end to avoid stale offers dragging CTR.</p>
${L.googleAds}`;
