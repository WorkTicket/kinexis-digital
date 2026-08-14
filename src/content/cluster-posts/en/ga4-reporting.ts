import { L } from "./_links";

export const body = `<p>GA4's event-based data model changes how marketing teams report performance. Pageviews alone no longer tell the story; events, parameters, and user identity stitch journeys across sessions. Teams that cling to Universal Analytics mental models miss conversions hidden in explorations and misread engagement metrics.</p>
<p>After migrating a lead-gen site to GA4, reported conversions dropped 30% overnight. The issue was not traffic; event naming changed and a key form submit was not mapped as a conversion. Rebuilding events in GTM, marking conversions in Admin, and creating a funnel exploration restored visibility. Within a month they had clearer drop-off data than UA ever provided.</p>
<h2>Core GA4 Concepts</h2>
<p><strong>Events</strong> are any interaction you track. <strong>Parameters</strong> add context (value, currency, item ID). <strong>Conversions</strong> are key events you flag for reporting. <strong>Explorations</strong> are flexible analysis workspaces replacing many UA custom reports.</p>
<h3>Event Planning</h3>
<p>Document an event taxonomy before implementation: generate_lead, purchase, sign_up, with consistent parameters. Avoid duplicate events firing from GA4 auto-config and GTM simultaneously.</p>
<h2>Essential Reports for Marketing</h2>
<p><strong>Acquisition overview:</strong> users and conversions by channel.<br><strong>Traffic acquisition:</strong> session source/medium detail.<br><strong>Landing page report:</strong> entry performance.<br><strong>Engagement:</strong> events and pages driving interaction.</p>
<h3>Explorations to Master</h3>
<p><strong>Funnel exploration:</strong> step-by-step drop-off for signup or checkout.<br><strong>Path exploration:</strong> what users do before and after key events.<br><strong>Segment overlap:</strong> how audiences intersect for targeting insights.</p>
<h2>Audiences and Remarketing</h2>
<p>Build audiences from events (viewed pricing, abandoned form) and export to Google Ads. Set membership duration aligned to sales cycle. Exclude converters from prospecting when platforms allow.</p>
<h2>Attribution Reports in GA4</h2>
<p>Advertising workspace shows paid performance; model comparison shows how first vs. data-driven differs. Use conversion paths report for assisted touch visibility, not only last click.</p>
<h3>BigQuery Export</h3>
<p>High-volume sites benefit from BigQuery for custom attribution and LTV cohorts. Requires setup but removes sampling limits on complex queries.</p>
<h2>Data Quality Habits</h2>
<p>DebugView during GTM changes. Annotate launches in analytics. Monitor internal traffic filters. Compare GA4 totals to CRM weekly; variance within 10% is a healthy target for lead gen.</p>
<h2>Reporting Cadence for Teams</h2>
<p>Weekly: channel performance and conversion count. Monthly: funnel shifts, landing page winners/losers, event parameter completeness. Quarterly: taxonomy review and exploration deep dives for strategists.</p>
<p>GA4 rewards teams that think in events and journeys, not pageviews alone. Build a clean taxonomy, lean on explorations for diagnosis, and tie reports to decisions every Monday standup actually uses.</p>
<h2>Custom Dimensions and User Properties</h2>
<p>Pass plan tier, customer status, or industry as user properties for richer explorations. Requires GTM discipline but enables analysis like "conversion rate by plan on pricing page" without exporting to BI for every question.</p>
<h3>Consent Mode and Data Gaps</h3>
<p>With consent banners, modelled conversions fill gaps in GA4 and Google Ads. Monitor consent rates by region. Sudden drops in reported conversions may be consent configuration, not campaign failure.</p>
<h2>Training Your Team on GA4</h2>
<p>Run monthly 30-minute labs: build one funnel, one audience, one exploration together. Shared fluency reduces Slack threads asking for one-off exports and spreads accountability for data quality.</p>
<h2>GA4 vs. Looker Studio Reporting</h2>
<p>Native GA4 reports suit exploration; Looker Studio suits recurring stakeholder views. Build explorations first to validate metrics, then crystallize stable definitions into dashboards. Changing dashboard widgets without validating event logic creates executive distrust fast.</p>
<h3>Cross-Domain and Subdomain Tracking</h3>
<p>Configure cross-domain measurement when checkout lives on another host or subdomain. Misconfigured linker parameters split sessions and undercount conversions on the domain marketing actually optimizes.</p>
<p>Keep a GA4 change log beside your GTM container notes. When conversions move, you need both tags and Admin conversion flags in one timeline.</p>
<h2>Key Event Marking in GA4 Admin</h2>
<p>Only marked conversions appear in standard acquisition reports. Review the conversion list quarterly and remove obsolete events that clutter reporting. Name events for humans: <strong>generate_lead_form</strong> beats <strong>event_47</strong> in shared dashboards.</p>
<h2>Comparing GA4 to Platform Data</h2>
<p>Export weekly channel conversions from GA4 and Google Ads side by side. Persistent gaps usually mean tagging, consent mode, or conversion window differences, not "bad ads."</p>
<p>Schedule a quarterly GA4 admin audit: conversions marked, filters active, data retention settings documented.</p>
<p>Pair GA4 explorations with screen recordings on pages with sudden funnel drop-offs.</p>
<p>Label annotation markers in GA4 when campaigns launch or sites deploy.</p>
<p>Keep a screenshot library of your core explorations for faster stakeholder updates.</p>
${L.analytics}`;
