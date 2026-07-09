import type { ServicePillarContent } from "@/components/sections/ServicePillarSections";

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
export const seoPillarContent: ServicePillarContent = {
  overview: {
    title: "SEO built to generate leads, not rankings for their own sake.",
    paragraphs: [
      "Most SEO programs track positions and impressions while the pipeline stays flat. Keywords that rank but never convert are a liability, not an asset. Winning in organic search means owning the searches your buyers actually run before they call a competitor.",
      "KINEXIS builds SEO programs around commercial and transactional intent. Technical audits remove the crawl issues blocking your highest-value pages. Content targets the exact queries that drive demo requests, consultation bookings, and purchases. Link acquisition focuses on authority in your market, not volume for its own sake.",
      "We connect every SEO activity back to revenue metrics: qualified leads, cost per acquisition, and pipeline contribution. Rankings are a leading indicator. What we actually optimize for is business growth.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "A full organic growth system from audit through|ongoing optimization.",
    items: [
      { title: "Technical SEO Audit", description: "Crawl analysis, Core Web Vitals, indexation fixes, and schema markup on revenue-critical pages." },
      { title: "Keyword & Content Strategy", description: "Buyer-intent keyword mapping, content gap analysis, and a publishing calendar tied to your funnel." },
      { title: "On-Page Optimization", description: "Title tags, headings, internal links, and page structure on pages that drive conversions." },
      { title: "Content Production", description: "Service pages, blog articles, and landing pages written for search intent and qualified traffic." },
      { title: "Link Building & Digital PR", description: "Targeted outreach, guest placements, and authority links from relevant sources in your industry." },
      { title: "Monthly Performance Reporting", description: "Rankings, organic traffic, leads, and pipeline contribution. Actionable data, not a vanity dashboard." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From technical foundation to compounding organic growth.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Foundation", description: "Full technical audit, keyword research, competitor analysis, and content gap identification." },
      { phase: "Week 3–4", duration: "Strategy & Quick Wins", description: "On-page fixes, title tag optimization, internal linking, and priority page updates." },
      { phase: "Month 2", duration: "Content & Authority Build", description: "New content published, link outreach begins, structured data implemented." },
      { phase: "Month 3+", duration: "Scale & Compound", description: "Ranking movement accelerates, content expands, and traffic converts to qualified pipeline." },
    ],
  },
  pricing: {
    title: "Investment guidance",
    subtitle: "Transparent pricing based on competition and scope.",
    tiers: [
      { name: "Starter", range: "$750/mo", description: "Local or niche SEO for businesses with moderate competition and 1–3 target service areas." },
      { name: "Growth", range: "$1,500/mo", description: "Multi-location or mid-competition SEO with content production and active link building." },
      { name: "Scale", range: "$3,000+/mo", description: "Enterprise SEO for competitive markets with high-volume content and authority campaigns." },
    ],
    note: "Pricing reflects management and strategy. Content production costs vary by volume and are quoted separately.",
  },
  results: {
    title: "Results we track",
    subtitle: "Real outcomes from recent client programs.",
    metrics: [
      { metric: "+1,290%", label: "organic traffic · Landscaping Co." },
      { metric: "4.8X", label: "qualified leads · same client, 10 mo" },
      { metric: "340+", label: "commercial keywords mapped per engagement" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Local SEO
// ---------------------------------------------------------------------------
export const localSeoPillarContent: ServicePillarContent = {
  overview: {
    title: "Local SEO built to fill your calendar with booked calls.",
    paragraphs: [
      "Map pack visibility is a business outcome, not a vanity metric. When your GMB listing ranks in the top three for service searches in your city, you get calls. When it doesn't, your competitors do. Most local businesses are losing those calls because of fixable problems: inconsistent NAP data, under-optimized GBP profiles, and service area pages that search engines can't parse.",
      "KINEXIS builds local SEO programs from the ground up. We audit your current presence, fix citation inconsistencies, optimize your Google Business Profile for the searches that drive bookings, and build location content that earns map pack placement.",
      "Every local SEO engagement includes conversion tracking so you can see exactly which search terms are generating calls and which locations are driving revenue. You never pay for rankings you can't tie to your business.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Everything you need to dominate local search|in your market.",
    items: [
      { title: "Google Business Profile Optimization", description: "Categories, services, photos, posts, and Q&A optimized for searches that drive calls in your market." },
      { title: "Citation Audit & Cleanup", description: "Consistent NAP data across 45+ directories so Google trusts your location signals." },
      { title: "Location Page Creation", description: "Service area pages with real market context, not keyword-stuffed city-name templates." },
      { title: "Review Generation Strategy", description: "A sustainable process for earning genuine reviews that improve map pack position and conversion rate." },
      { title: "Competitor Gap Analysis", description: "We identify exactly what your top local competitors are doing better and build a plan to overtake them." },
      { title: "Weekly Rank Tracking", description: "Map pack and organic position tracking for your priority local keywords, reported weekly." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From audit to map pack placement in 90 days.",
    phases: [
      { phase: "Week 1", duration: "Local Audit", description: "GBP review, citation scan, competitor analysis, and ranking baseline for priority local keywords." },
      { phase: "Week 2–4", duration: "Foundation Fix", description: "NAP cleanup, GBP optimization, photo updates, and service category corrections." },
      { phase: "Month 2", duration: "Content & Citations", description: "Location page builds or rewrites, citation submissions, and review strategy launch." },
      { phase: "Month 3+", duration: "Authority & Scale", description: "Map pack movement, review momentum, and expansion to secondary service areas." },
    ],
  },
  pricing: {
    title: "Local SEO vs. DIY map pack work",
    subtitle: "What changes when someone owns GBP, citations, and reviews every week.",
    tiers: [
      { name: "Starter", range: "$500/mo", description: "Single-location local SEO for service businesses in mid-competition markets." },
      { name: "Growth", range: "$1,000/mo", description: "Multi-location or competitive market local SEO with full citation and content management." },
      { name: "Scale", range: "$2,000+/mo", description: "Franchise or high-competition local SEO across multiple cities and service categories." },
    ],
    note: "Pricing covers map pack strategy and optimization. One-time citation cleanup is quoted based on current status. Full-site SEO with content and links is priced separately, see SEO pricing.",
  },
  results: {
    title: "Results we track",
    subtitle: "Outcomes from recent local SEO programs.",
    metrics: [
      { metric: "327%", label: "emergency calls · Plumbing Co., 8 mo" },
      { metric: "+2,371%", label: "GBP interactions · same client" },
      { metric: "Top 3", label: "map pack · 48 of 60 keywords" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Web Design
// ---------------------------------------------------------------------------
export const webDesignPillarContent: ServicePillarContent = {
  overview: {
    title: "Websites designed for conversion, not just visual appeal.",
    paragraphs: [
      "Most agency websites look polished in a browser and convert at 1–2%. That gap is a revenue problem. A site that looks impressive but buries the CTA, loads slowly on mobile, or sends every visitor to the same generic homepage is costing you deals every week.",
      "KINEXIS builds websites around your conversion goal first, then designs the experience that makes reaching that goal frictionless. Hero structure, navigation depth, CTA placement, and form length all follow how your buyers actually behave, not aesthetic preference.",
      "We handle the full stack: UX architecture, visual design, development, performance optimization, and conversion tracking. You get a site that loads fast, ranks well, and turns visitors into qualified leads from day one.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Full-service web design from discovery|through launch and optimization.",
    items: [
      { title: "UX Architecture & Wireframing", description: "Page hierarchy, user flow mapping, and wireframes built around how your buyers navigate to a decision." },
      { title: "Visual Design System", description: "Custom design language, typography, color system, and component library built for your brand." },
      { title: "Responsive Development", description: "Hand-coded or CMS-powered build with pixel-perfect mobile responsiveness and cross-browser testing." },
      { title: "Performance Optimization", description: "Core Web Vitals optimization, image compression, lazy loading, and caching for sub-3-second load times." },
      { title: "CRO-Ready Copy & Structure", description: "Page copy written for search intent and conversion, with above-the-fold messaging that qualifies visitors fast." },
      { title: "Conversion Tracking Setup", description: "GA4, GTM, form tracking, and call tracking integrated so you know exactly what's generating leads." },
    ],
  },
  timeline: {
    title: "Build timeline",
    subtitle: "From discovery to a live, optimized site.",
    phases: [
      { phase: "Week 1–2", duration: "Discovery & Architecture", description: "Business goals, buyer research, competitor review, sitemap, and wireframe approval." },
      { phase: "Week 3–4", duration: "Design", description: "High-fidelity mockups, design system, and stakeholder review rounds." },
      { phase: "Month 2", duration: "Build & Content", description: "Development, content integration, mobile optimization, and QA across browsers and devices." },
      { phase: "Month 3", duration: "Launch & Optimize", description: "Soft launch, analytics setup, speed tests, and post-launch conversion baseline." },
    ],
  },
  pricing: {
    title: "Investment guidance",
    subtitle: "Pricing based on scope, pages, and complexity.",
    tiers: [
      { name: "Starter", range: "$2,500", description: "5–8 page marketing site with standard CMS, mobile-responsive design, and analytics setup." },
      { name: "Growth", range: "$5,000", description: "10–20 page custom site with conversion architecture, copywriting, and full tracking stack." },
      { name: "Scale", range: "$10,000+", description: "Enterprise web presence with custom functionality, multi-location, or advanced integrations." },
    ],
    note: "Project-based pricing. Ongoing maintenance and CRO retainers available post-launch.",
  },
  results: {
    title: "Results we track",
    subtitle: "Measurable outcomes from recent web projects.",
    metrics: [
      { metric: "1.8% → 8.4%", label: "conversion rate · Landscaping Co. rebuild" },
      { metric: "4.8X", label: "qualified lead growth · same client, 10 mo" },
      { metric: "Lighthouse 94", label: "performance score · post-launch" },
    ],
  },
};

// ---------------------------------------------------------------------------
// CRO
// ---------------------------------------------------------------------------
export const croPillarContent: ServicePillarContent = {
  overview: {
    title: "Conversion optimization backed by data, not opinions.",
    paragraphs: [
      "Getting traffic is expensive. Losing it to a slow form, a weak CTA, or a page that buries the value proposition is a compounding cost. Most businesses accept mediocre conversion rates because they don't have a system for finding and fixing what's actually breaking the funnel.",
      "KINEXIS runs structured CRO programs: heatmaps, session recordings, user testing, and A/B experiments that generate real statistical evidence for what changes move conversion rates. We don't guess. We test, measure, and implement based on data.",
      "CRO is the highest-leverage marketing investment you can make. Doubling your conversion rate costs nothing in additional traffic. It just extracts more revenue from what you're already spending.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "A systematic approach to turning more visitors|into leads and customers.",
    items: [
      { title: "Conversion Audit", description: "Full funnel review including heatmaps, session recordings, form analytics, and page-level drop-off analysis." },
      { title: "User Research", description: "Surveys, user testing, and qualitative data collection to understand why visitors don't convert." },
      { title: "A/B & Multivariate Testing", description: "Hypothesis-driven experiments on headlines, CTAs, layout, and forms with statistical significance gates." },
      { title: "Landing Page Optimization", description: "Page-level redesigns and copy rewrites based on conversion data and user behavior signals." },
      { title: "Form & Checkout Optimization", description: "Friction reduction, field analysis, and UX improvements on every form and conversion point." },
      { title: "Monthly Testing Reports", description: "Test results, winners, learnings, and next experiments. A compounding record of what works for your audience." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From data collection to conversion lift in 60 days.",
    phases: [
      { phase: "Week 1–2", duration: "Data Collection", description: "Analytics audit, heatmap setup, session recording review, and conversion funnel baseline." },
      { phase: "Week 3–4", duration: "Hypothesis & Design", description: "Prioritized test list, variant designs, and experiment setup on top conversion pages." },
      { phase: "Month 2", duration: "Test & Measure", description: "A/B tests running with statistical rigor, interim reads, and secondary metric tracking." },
      { phase: "Month 3+", duration: "Implement & Scale", description: "Winners deployed, tests expanded to additional pages, and compounding lift tracked." },
    ],
  },
  pricing: {
    title: "Investment guidance",
    subtitle: "Pricing based on traffic volume and test complexity.",
    tiers: [
      { name: "Starter", range: "$750/mo", description: "Monthly CRO for sites with 1,000+ monthly sessions on priority pages. Focused on 1–2 key conversion pages." },
      { name: "Growth", range: "$1,500/mo", description: "Multi-page testing program for growing brands with 20,000+ monthly sessions." },
      { name: "Scale", range: "$3,000+/mo", description: "Enterprise CRO with full funnel testing, personalization, and advanced attribution." },
    ],
    note: "Minimum 3-month engagement required for statistically meaningful results.",
  },
  results: {
    title: "Results we track",
    subtitle: "Conversion outcomes from recent programs.",
    metrics: [
      { metric: "1.8% → 8.4%", label: "conversion rate · Landscaping Co." },
      { metric: "+42%", label: "form completion lift · A/B test winner" },
      { metric: "15–45%", label: "typical page lift · first 90 days" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Email Marketing
// ---------------------------------------------------------------------------
export const emailMarketingPillarContent: ServicePillarContent = {
  overview: {
    title: "Email marketing built to drive revenue from your existing audience.",
    paragraphs: [
      "Email is the highest-ROAS channel in most marketing stacks when it's run properly. Most businesses leave that revenue on the table with generic blasts, poorly segmented lists, and automation sequences that stop after one welcome email.",
      "KINEXIS builds email programs that work as revenue infrastructure. Automated sequences nurture leads through the decision process. Segmented campaigns send the right message to the right audience at the right time. Behavioral triggers turn engagement signals into sales conversations.",
      "We manage the full stack: strategy, copywriting, design, automation build, list hygiene, and deliverability. Every campaign is tied to revenue metrics, not open rates alone.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Full-service email management from strategy|through automation and reporting.",
    items: [
      { title: "List Audit & Segmentation", description: "List health check, segment structure, and suppression setup for deliverability and relevance." },
      { title: "Automation Architecture", description: "Welcome sequences, lead nurture flows, cart abandonment, re-engagement, and post-purchase series." },
      { title: "Campaign Strategy & Calendar", description: "Monthly campaign plan aligned to sales cycles, product launches, and seasonal opportunities." },
      { title: "Copywriting & Design", description: "Email copy and responsive templates written for engagement and optimized for clicks." },
      { title: "A/B Testing", description: "Subject line, send time, CTA, and content tests to continuously improve open and click rates." },
      { title: "Performance Reporting", description: "Revenue attribution, open rates, click rates, and unsubscribe trends, reported weekly and monthly." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From audit to revenue-generating email infrastructure.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Strategy", description: "List review, deliverability check, platform setup, and campaign calendar for month one." },
      { phase: "Week 3–4", duration: "Automation Build", description: "Core automation sequences built, tested, and activated: welcome, nurture, and re-engagement." },
      { phase: "Month 2", duration: "Campaign Launch", description: "Regular campaigns running, A/B tests in progress, and revenue attribution tracking live." },
      { phase: "Month 3+", duration: "Optimize & Scale", description: "Automation expansion, segmentation refinement, and compound revenue growth from email." },
    ],
  },
  pricing: {
    title: "Newsletter blasts vs. revenue automation",
    subtitle: "What changes when sequences, segmentation, and deliverability are managed every week.",
    tiers: [
      { name: "Starter", range: "$500/mo", description: "Monthly campaigns and basic automation for lists up to 10,000 contacts." },
      { name: "Growth", range: "$1,000/mo", description: "Full automation suite, advanced segmentation, and weekly campaigns for lists up to 50,000." },
      { name: "Scale", range: "$2,500+/mo", description: "Enterprise email with behavioral triggers, CRM integration, and revenue attribution." },
    ],
    note: "ESP costs (Klaviyo, HubSpot, etc.) are separate from management fees.",
  },
  results: {
    title: "Results we track",
    subtitle: "Email outcomes from recent client programs.",
    metrics: [
      { metric: "38%", label: "avg. open rate · optimized sequences" },
      { metric: "8x", label: "ROAS on email vs. paid channels" },
      { metric: "+180%", label: "revenue from automated flows · 90 days" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Content Marketing
// ---------------------------------------------------------------------------
export const contentMarketingPillarContent: ServicePillarContent = {
  overview: {
    title: "Content that earns traffic and converts readers into buyers.",
    paragraphs: [
      "This retainer is for teams that need production volume without a full SEO program. You may already have an in-house SEO lead, an agency handling technical work, or a site that ranks and just needs consistent publishing.",
      "KINEXIS builds content programs around the searches your buyers run during active evaluation. Service comparison content, solution-focused articles, and conversion-optimized landing pages that turn organic traffic into pipeline.",
      "We handle strategy, production, and optimization. Every piece is planned against a keyword target, written to demonstrate authority, and structured to keep readers moving toward a conversion action. Need technical SEO and link building too? See SEO pricing instead.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Content strategy and production built to|compound organic growth month over month.",
    items: [
      { title: "Content Strategy & Roadmap", description: "Keyword research, content gap analysis, and a prioritized publishing calendar tied to buyer intent." },
      { title: "Article & Blog Production", description: "Long-form content written by subject matter experts for search intent and reader engagement." },
      { title: "Service & Landing Page Copy", description: "Commercial page copy optimized for conversion and target keywords that bring in ready buyers." },
      { title: "Content Optimization", description: "Existing content audits and rewrites to improve rankings and conversion rates on underperforming pages." },
      { title: "Internal Linking Strategy", description: "Systematic internal link architecture that distributes authority and guides buyers through the funnel." },
      { title: "Performance Tracking", description: "Page-level traffic, keyword rankings, and conversion contribution tracked monthly." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From strategy to compounding content returns.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Strategy", description: "Existing content audit, competitor content gap analysis, and 90-day publishing calendar." },
      { phase: "Week 3–4", duration: "Priority Content", description: "First batch of high-priority pieces published, internal linking structure set up." },
      { phase: "Month 2–3", duration: "Build Volume", description: "Consistent publishing cadence, on-page optimization of existing pages, and backlink outreach." },
      { phase: "Month 4+", duration: "Compound Returns", description: "Traffic and rankings accelerate, conversion optimization layer added to top organic pages." },
    ],
  },
  pricing: {
    title: "Content retainer vs. full SEO program",
    subtitle: "When you need production volume but already have SEO covered elsewhere.",
    tiers: [
      { name: "Starter", range: "$800/mo", description: "4–6 pieces per month with keyword strategy and basic on-page optimization." },
      { name: "Growth", range: "$1,500/mo", description: "8–12 pieces per month with pillar page strategy, link building, and conversion optimization." },
      { name: "Scale", range: "$3,000+/mo", description: "20+ pieces per month with editorial leadership, digital PR, and full SEO integration." },
    ],
    note: "Standalone content production and strategy. Full SEO programs include content at every tier, see SEO pricing if you need technical work and link building too. Per-piece pricing available for project-based needs.",
  },
  results: {
    title: "Results we track",
    subtitle: "Content outcomes from recent programs.",
    metrics: [
      { metric: "5.9X", label: "demo requests · SaaS Platform, 8 mo" },
      { metric: "+482%", label: "organic traffic · same client" },
      { metric: "62%", label: "of demos from content engine · month 8" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Social Media
// ---------------------------------------------------------------------------
export const socialMediaPillarContent: ServicePillarContent = {
  overview: {
    title: "Social media management that builds audience and drives pipeline.",
    paragraphs: [
      "Posting consistently is table stakes. What actually moves business outcomes is content that earns engagement from the right audience, builds brand authority in your category, and turns followers into buyers over time. Most social media programs optimize for likes, not leads.",
      "KINEXIS manages social as a distribution and demand-generation channel. Organic content builds trust and authority. Paid amplification puts your best content in front of precise audience segments. Community management converts engaged followers into qualified conversations.",
      "We handle strategy, content creation, scheduling, and reporting. Every metric we track connects back to pipeline: reach among your target buyer, engagement quality, and lead attribution from social traffic.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Full-service social media management from strategy|through content and community.",
    items: [
      { title: "Social Media Audit", description: "Current account analysis, competitor benchmarking, and audience insights across platforms." },
      { title: "Content Strategy & Calendar", description: "Monthly content plan with themes, formats, and posting schedule aligned to your audience and goals." },
      { title: "Content Creation", description: "Graphics, short-form video, carousels, and copy produced to your brand standards and platform best practices." },
      { title: "Community Management", description: "Comment responses, DM management, and engagement monitoring to build relationships with your audience." },
      { title: "Paid Amplification", description: "Boosted posts and paid social campaigns to accelerate reach for top-performing organic content." },
      { title: "Monthly Reporting", description: "Reach, engagement, follower growth, and lead attribution tracked and reported with actionable takeaways." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From audit to consistent, revenue-connected social presence.",
    phases: [
      { phase: "Week 1", duration: "Audit & Strategy", description: "Account audit, audience research, competitor analysis, and first-month content plan approval." },
      { phase: "Week 2–4", duration: "Setup & Templates", description: "Brand templates created, content calendar built, and first posts scheduled and published." },
      { phase: "Month 2", duration: "Publish & Amplify", description: "Full publishing cadence running, paid amplification active, and engagement baselines established." },
      { phase: "Month 3+", duration: "Optimize & Scale", description: "Best-performing formats and topics scaled, audience growth compounds, and pipeline tracking refined." },
    ],
  },
  pricing: {
    title: "Inconsistent posting vs. managed social pipeline",
    subtitle: "What you get when content, community, and reporting connect to leads, not vanity metrics.",
    tiers: [
      { name: "Starter", range: "$750/mo", description: "2 platforms, 12 posts/month, and monthly reporting. Ideal for building a consistent presence." },
      { name: "Growth", range: "$1,500/mo", description: "3–4 platforms, 20+ posts/month, paid amplification management, and community engagement." },
      { name: "Scale", range: "$3,000+/mo", description: "Full multi-platform management with video production, influencer coordination, and advanced analytics." },
    ],
    note: "Ad spend for boosted posts and paid campaigns is separate from management fees.",
  },
  results: {
    title: "Results we track",
    subtitle: "Social media outcomes from recent client programs.",
    metrics: [
      { metric: "+15%/mo", label: "organic follower growth · B2B brand" },
      { metric: "3.8%", label: "avg. engagement rate · above industry avg." },
      { metric: "+25%", label: "leads attributed from social traffic" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Video Marketing
// ---------------------------------------------------------------------------
export const videoMarketingPillarContent: ServicePillarContent = {
  overview: {
    title: "Video content built to capture attention and drive measurable action.",
    paragraphs: [
      "Video is the highest-engagement format across every platform, but most brand video is too long, too vague, and never tested against a conversion goal. A brand film that wins awards but doesn't generate leads is a creative expense, not a marketing asset.",
      "KINEXIS produces video with performance in mind. Ads that drive clicks. Explainer videos that shorten the sales cycle. Testimonials that convert hesitant buyers. Every piece is built around a specific audience, placement, and outcome.",
      "We handle strategy, scripting, production, post-production, and distribution. YouTube pre-roll, paid social video, website hero. Each piece built around what it needs to accomplish.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "End-to-end video production from strategy|through distribution and performance tracking.",
    items: [
      { title: "Video Strategy & Brief", description: "Goals, audience, placement, and creative direction defined before a single frame is shot." },
      { title: "Script & Storyboard", description: "Conversion-focused scripts and storyboards reviewed and approved before production begins." },
      { title: "Production", description: "Professional filming, direction, and on-camera coaching for interview-style or scripted formats." },
      { title: "Editing & Post-Production", description: "Editing, color grading, motion graphics, captions, and format optimization for each platform." },
      { title: "Distribution Strategy", description: "Platform-by-platform publishing plan with metadata optimization for organic and paid reach." },
      { title: "Performance Analytics", description: "View-through rate, engagement, click-through, and conversion attribution tracked per asset." },
    ],
  },
  timeline: {
    title: "Production timeline",
    subtitle: "From strategy to live, optimized video assets.",
    phases: [
      { phase: "Week 1–2", duration: "Strategy & Pre-Production", description: "Creative brief, script drafts, storyboard approval, and production logistics." },
      { phase: "Week 3–4", duration: "Production", description: "Shoot days, interviews, B-roll, and location filming per approved storyboard." },
      { phase: "Month 2", duration: "Post-Production", description: "Editing, color, audio mix, motion graphics, and platform-specific format exports." },
      { phase: "Month 3", duration: "Distribution & Test", description: "Videos published, paid placement launched, and A/B performance testing begins." },
    ],
  },
  pricing: {
    title: "Phone footage vs. conversion-focused production",
    subtitle: "Fixed project fees for scripts, production, and platform-ready cuts built to perform.",
    tiers: [
      { name: "Starter", range: "$1,000/mo", description: "Single video asset per month: 60–90 second explainer or testimonial, fully produced and delivered." },
      { name: "Growth", range: "$2,500/mo", description: "3–5 video asset package with brand film, ad cuts, and social format variants." },
      { name: "Scale", range: "$5,000+/mo", description: "Full video production program with multiple shoot days, ongoing asset creation, and paid distribution." },
    ],
    note: "Project-based pricing. Monthly retainers available for ongoing video content programs.",
  },
  results: {
    title: "Results we track",
    subtitle: "Video performance from recent productions.",
    metrics: [
      { metric: "65%", label: "avg. video completion rate · optimized cuts" },
      { metric: "3.2x", label: "higher engagement vs. static ads" },
      { metric: "+45%", label: "conversion lift · video vs. text landing pages" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Branding
// ---------------------------------------------------------------------------
export const brandingPillarContent: ServicePillarContent = {
  overview: {
    title: "Brand identity built for market differentiation and buyer trust.",
    paragraphs: [
      "A brand is not a logo. It's the full system of visual and verbal signals that tells buyers who you are, what you stand for, and why they should trust you over every alternative. When those signals are inconsistent or generic, you compete on price. When they're sharp and differentiated, you command a premium.",
      "KINEXIS builds brand identities for growth-stage companies that need to look and sound like the category leader they're becoming. We start with strategic positioning, then translate it into a visual system and messaging framework that scales across every touchpoint.",
      "Every brand project delivers a complete identity system, not just a logo file. Messaging, typography, color, iconography, and usage guidelines that your team can execute consistently across website, ads, sales decks, and social without coming back to ask what to do.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "A complete brand identity system from positioning|through visual design and guidelines.",
    items: [
      { title: "Brand Discovery & Positioning", description: "Competitor audit, audience research, differentiation mapping, and brand positioning statement." },
      { title: "Logo Design System", description: "Primary logo, secondary marks, icon, and lockup variations for every use case." },
      { title: "Visual Identity", description: "Color palette, typography system, imagery direction, and graphic language for the brand." },
      { title: "Messaging Framework", description: "Brand voice, tagline, elevator pitch, value propositions, and messaging pillars for sales and marketing." },
      { title: "Brand Guidelines", description: "Comprehensive usage guide covering every element of the visual and verbal identity." },
      { title: "Collateral Design", description: "Business cards, pitch deck template, email signature, and core marketing collateral in the new brand." },
    ],
  },
  timeline: {
    title: "Project timeline",
    subtitle: "From discovery to a complete brand system.",
    phases: [
      { phase: "Week 1–2", duration: "Discovery & Research", description: "Brand audit, competitor landscape, audience interviews, and positioning workshop." },
      { phase: "Week 3–4", duration: "Concept Development", description: "3 visual directions presented with rationale, messaging drafts, and stakeholder feedback." },
      { phase: "Month 2", duration: "Refinement", description: "Final direction developed into full visual system with logo variations and color system." },
      { phase: "Month 3", duration: "Guidelines & Delivery", description: "Brand guidelines document, final file delivery, and collateral design completed." },
    ],
  },
  pricing: {
    title: "Logo shop deliverable vs. full identity system",
    subtitle: "Fixed-fee projects that include positioning, messaging, and production-ready guidelines.",
    tiers: [
      { name: "Starter", range: "$1,500", description: "Logo system, color palette, typography, and brand guidelines for growth-stage businesses." },
      { name: "Growth", range: "$3,500", description: "Full visual identity, messaging framework, brand guidelines, and core collateral package." },
      { name: "Scale", range: "$7,500+", description: "Complete brand system with positioning strategy, full guidelines, and collateral suite." },
    ],
    note: "Brand projects are scoped based on deliverables and revision rounds. All pricing is fixed-fee.",
  },
  results: {
    title: "Results we track",
    subtitle: "Brand outcomes from recent identity projects.",
    metrics: [
      { metric: "2.1x", label: "conversion lift post-rebrand · Landscaping Co." },
      { metric: "+55%", label: "sales close rate improvement · professional services" },
      { metric: "40+", label: "production-ready brand assets delivered" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------
export const analyticsPillarContent: ServicePillarContent = {
  overview: {
    title: "Analytics infrastructure that connects marketing spend to revenue.",
    paragraphs: [
      "Most marketing teams are flying blind. They have data on page views, session counts, and ad impressions, but they can't answer the questions that actually matter: which channel booked the last 20 customers, what the cost per qualified lead is by source, or which content is driving pipeline vs. just traffic.",
      "KINEXIS builds analytics infrastructure from the ground up. GA4 properly configured, GTM implemented with clean event taxonomy, conversion tracking that captures real business outcomes, and dashboards that answer revenue questions without a data analyst standing by.",
      "We specialize in connecting marketing data to the business outcomes that drive decisions: qualified leads, cost per acquisition, revenue attribution, and ROAS by channel. When you see the full picture, you stop wasting budget on channels that look good in reports but don't book revenue.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Full analytics setup from tracking infrastructure|through dashboards and attribution.",
    items: [
      { title: "Analytics Audit", description: "Full review of current GA4, GTM, and ad platform tracking for gaps, errors, and data quality issues." },
      { title: "GA4 Configuration", description: "Clean GA4 setup with proper event taxonomy, conversion goals, and enhanced measurement." },
      { title: "GTM Implementation", description: "Tag management setup with organized triggers, variables, and tags for every tracking requirement." },
      { title: "Conversion Tracking", description: "Form submissions, phone calls, purchases, and offline conversions tracked across all channels." },
      { title: "Dashboard Build", description: "Looker Studio or native dashboards showing leads, CPL, ROAS, and channel attribution in one view." },
      { title: "Monthly Reporting", description: "Regular performance analysis with actionable recommendations, not just data exports." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From data chaos to clean, trustworthy attribution.",
    phases: [
      { phase: "Week 1", duration: "Audit", description: "Full review of existing tracking setup, data quality check, and gap analysis across all channels." },
      { phase: "Week 2–3", duration: "Implementation", description: "GA4 configuration, GTM setup, conversion event implementation, and ad platform tracking." },
      { phase: "Week 4", duration: "Dashboards", description: "Dashboard build with revenue metrics, channel attribution, and executive-ready views." },
      { phase: "Month 2+", duration: "Insights & Optimization", description: "Monthly reporting cycles, tracking refinements, and data-driven channel optimization recommendations." },
    ],
  },
  pricing: {
    title: "Broken tracking vs. revenue-ready attribution",
    subtitle: "What you get when GA4, GTM, and dashboards are built to answer revenue questions.",
    tiers: [
      { name: "Starter", range: "$250/mo", description: "GA4 + GTM setup, 3 conversion goals, and a single Looker Studio dashboard with monthly reporting." },
      { name: "Growth", range: "$500/mo", description: "Full tracking stack, multi-channel attribution, CRM integration, and monthly reporting." },
      { name: "Scale", range: "$1,000+/mo", description: "Enterprise analytics with custom attribution models, data warehouse, and exec reporting suite." },
    ],
    note: "Setup projects are billed separately from ongoing reporting retainers.",
  },
  results: {
    title: "Results we track",
    subtitle: "Analytics outcomes from recent implementations.",
    metrics: [
      { metric: "40%", label: "reduction in wasted ad spend · after attribution setup" },
      { metric: "100%", label: "conversion visibility across channels" },
      { metric: "2.8x", label: "ROAS improvement · with proper attribution" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Growth Consulting
// ---------------------------------------------------------------------------
export const growthConsultingPillarContent: ServicePillarContent = {
  overview: {
    title: "Growth consulting that aligns your full marketing operation to revenue.",
    paragraphs: [
      "Most growing businesses hit a ceiling where adding more channels, more content, or more ad spend stops moving the needle. The bottleneck isn't effort. It's alignment. Marketing, sales, and product are optimizing for different things, and no one has a clear model for how the business actually acquires and retains customers.",
      "KINEXIS growth consulting starts with a rigorous business audit: where revenue is coming from today, what the unit economics look like by channel, and where the highest-leverage growth levers are. We build a growth model, then a channel strategy, then an execution roadmap with clear owners and KPIs.",
      "You get a strategic partner who has scaled businesses across industries, not a generalist agency that sells services. Every recommendation is tied to your specific market, margin structure, and growth stage.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Strategic advisory from business audit through|execution roadmap and ongoing guidance.",
    items: [
      { title: "Business & Marketing Audit", description: "Full review of current channels, unit economics, funnel performance, and growth blockers." },
      { title: "Growth Model", description: "A clear model showing how customers are acquired, retained, and expanded, with levers by stage." },
      { title: "Channel Strategy", description: "Prioritized channel recommendations based on your business model, audience, and available resources." },
      { title: "KPI Framework", description: "The metrics that actually matter for your stage of growth, with targets and accountability structure." },
      { title: "Execution Roadmap", description: "90-day and 12-month plans with clear priorities, owners, and resource requirements." },
      { title: "Monthly Advisory Sessions", description: "Regular strategy sessions to review performance, adjust priorities, and unblock execution." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From business audit to executing your growth roadmap.",
    phases: [
      { phase: "Week 1–2", duration: "Discovery Audit", description: "Business model review, channel audit, data analysis, and stakeholder interviews." },
      { phase: "Week 3–4", duration: "Strategy Development", description: "Growth model built, channel strategy defined, and KPI framework presented for approval." },
      { phase: "Month 2", duration: "Roadmap & Kickoff", description: "90-day execution roadmap delivered, team briefed, and first initiatives launched." },
      { phase: "Month 3+", duration: "Advisory & Iteration", description: "Monthly advisory sessions, performance reviews, and strategy adjustments as data comes in." },
    ],
  },
  pricing: {
    title: "Guesswork vs. a documented marketing strategy",
    subtitle: "A clear plan tied to your unit economics, not a list of tactics to buy.",
    tiers: [
      { name: "Starter", range: "$500", description: "Focused strategy sprint for one channel or campaign, with a prioritized 90-day action plan." },
      { name: "Growth", range: "$1,500", description: "Full-funnel marketing strategy with channel mix, positioning, and a 6-month execution roadmap." },
      { name: "Scale", range: "$3,000+", description: "Multi-channel growth strategy with market research, competitor analysis, and a 12-month plan." },
    ],
    note: "Strategy engagements are project-based and separate from execution. We can hand the plan to your team or run it for you.",
  },
  results: {
    title: "Results we track",
    subtitle: "Growth outcomes from recent consulting programs.",
    metrics: [
      { metric: "2.8x", label: "avg. revenue growth · 12-month engagements" },
      { metric: "45%", label: "reduction in blended CPL · channel reallocation" },
      { metric: "3.1x", label: "pipeline growth · strategic alignment" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Funnels
// ---------------------------------------------------------------------------
export const funnelsPillarContent: ServicePillarContent = {
  overview: {
    title: "Funnels and conversion optimization as one revenue system.",
    paragraphs: [
      "Traffic without a system is wasted, and a funnel without optimization stops compounding. Most businesses have ads, a website, and maybe an email list, but no connected path from first click to booked call, and no testing program to find what's actually breaking conversion.",
      "KINEXIS builds and optimizes conversion systems end to end: funnel architecture, high-converting landing pages, lead magnets, nurture automation, retargeting, and structured A/B experiments backed by heatmaps and session data. We don't guess what works. We map the journey, launch the system, and keep improving every stage.",
      "Every engagement is tracked stage by stage: cost per lead, booking rate, email engagement, test win rate, and revenue per visitor. When one stage underperforms, we fix the constraint with data, not just add more traffic.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Funnel design, build, automation, and ongoing|conversion rate optimization in one program.",
    items: [
      { title: "Funnel Audit & Architecture", description: "Full buyer journey map with conversion data at every stage, gap identification, and offer positioning." },
      { title: "Landing Page Design & Build", description: "CRO-optimized landing pages built for specific traffic sources with conversion-focused copy and structure." },
      { title: "Lead Magnets & Nurture Automation", description: "High-value capture assets plus multi-step email and SMS sequences that move leads toward booking." },
      { title: "A/B & Multivariate Testing", description: "Hypothesis-driven experiments on headlines, CTAs, forms, and layouts with statistical significance gates." },
      { title: "UX Research & Heatmap Analysis", description: "Session recordings, heatmaps, and user behavior analysis to prioritize the highest-impact tests." },
      { title: "End-to-End Tracking & Reporting", description: "Conversion tracking at every funnel stage plus monthly test results, winners, and rollout recommendations." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From funnel audit to live system and compounding optimization.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Architecture", description: "Funnel review, conversion baseline, heatmap setup, and new system architecture approval." },
      { phase: "Week 3–4", duration: "Build & Launch", description: "Landing pages, email sequences, CRM integration, tracking, and first A/B tests live." },
      { phase: "Month 2", duration: "Test & Nurture", description: "Automation running, retargeting active, experiments reaching significance on priority pages." },
      { phase: "Month 3+", duration: "Optimize & Scale", description: "Winners deployed site-wide, underperforming stages fixed, traffic scaled to proven funnel." },
    ],
  },
  pricing: {
    title: "A scattered path vs. a mapped customer journey",
    subtitle: "What changes when the journey is mapped, built, and automated as one system.",
    tiers: [
      { name: "Starter", range: "$1,000", description: "Single journey map and funnel build with a landing page and 5-email nurture sequence." },
      { name: "Growth", range: "$2,500", description: "Full-funnel strategy across stages with automation, lead scoring, and conversion tracking." },
      { name: "Scale", range: "$5,000+", description: "Multi-segment journey system with advanced automation, personalization, and lifecycle mapping." },
    ],
    note: "Journey and funnel strategy is project-based. Ongoing CRO testing on the pages you build is a separate retainer.",
  },
  results: {
    title: "Results we track",
    subtitle: "Funnel and CRO outcomes from recent programs.",
    metrics: [
      { metric: "1.8% → 8.4%", label: "conversion rate · Landscaping Co. funnel" },
      { metric: "5.9X", label: "demo requests · SaaS Platform, 8 mo" },
      { metric: "+35%", label: "nurture-to-booking rate · post-automation" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Paid Ads (overview)
// ---------------------------------------------------------------------------
export const paidAdsPillarContent: ServicePillarContent = {
  overview: {
    title: "Paid advertising built around what actually books revenue.",
    paragraphs: [
      "Most ad accounts waste 20–40% of budget on the wrong audiences, misaligned landing pages, and platforms chosen by hype rather than buyer behavior. The result is cost per lead numbers that make paid media look unprofitable when the real problem is execution, not the channel.",
      "KINEXIS manages paid advertising across Google, Meta, LinkedIn, and Microsoft Ads as a unified revenue program. Channel selection is driven by where your buyers actually convert. Campaign structure follows your business model: local service calls for trades, demo requests for SaaS, consultations for professional services, and purchases for e-commerce.",
      "Every campaign connects to conversion tracking that proves revenue impact. We don't optimize for clicks or impressions. We optimize for qualified pipeline and ROAS.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Full-spectrum paid media management from audit|through ongoing optimization and reporting.",
    items: [
      { title: "Platform Audit & Recommendation", description: "Data-driven channel selection based on where your buyers convert and where budget is being wasted." },
      { title: "Campaign Architecture", description: "Intent-based structure with proper segmentation by service, audience, location, and funnel stage." },
      { title: "Audience & Keyword Strategy", description: "High-intent keywords, custom audiences, lookalikes, and negative lists built to eliminate waste." },
      { title: "Ad Creative & Copy", description: "Ads written and designed for your specific audience with systematic A/B testing built in." },
      { title: "Conversion Tracking", description: "GA4, GTM, call tracking, and offline conversion import for accurate ROAS across every channel." },
      { title: "Weekly Optimization & Reporting", description: "Bid adjustments, audience refinements, creative rotation, and weekly performance dashboards." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From audit to optimized, revenue-generating paid media.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Strategy", description: "Account audit, channel recommendation, competitor analysis, and campaign architecture plan." },
      { phase: "Week 3–4", duration: "Build & Launch", description: "Campaigns built, tracking verified, audiences loaded, and ads approved before going live." },
      { phase: "Month 2", duration: "Optimize", description: "Search term mining, bid strategy refinement, creative testing, and budget reallocation to top performers." },
      { phase: "Month 3+", duration: "Scale", description: "Expand winning campaigns, test new channels, and integrate with SEO and email for full-funnel growth." },
    ],
  },
  pricing: {
    title: "Investment guidance",
    subtitle: "Transparent pricing based on channel mix and ad spend.",
    tiers: [
      { name: "Starter", range: "$2,500/mo", description: "Single-channel management for local businesses with up to $5K monthly ad spend." },
      { name: "Growth", range: "$5,000/mo", description: "Multi-channel paid media for growing brands with $5K–$25K monthly ad spend." },
      { name: "Scale", range: "$9,000+/mo", description: "Full-spectrum paid advertising with advanced attribution, multi-location, and $25K+ ad spend." },
    ],
    note: "Management fees are separate from ad spend. A detailed proposal is provided after your strategy call.",
  },
  results: {
    title: "Results we track",
    subtitle: "Paid media outcomes from recent client programs.",
    metrics: [
      { metric: "327%", label: "emergency calls · Plumbing Co., 8 mo" },
      { metric: "65%", label: "wasted spend eliminated · same client" },
      { metric: "$47", label: "avg. cost per lead · after optimization" },
    ],
  },
};

// ---------------------------------------------------------------------------
// YouTube Ads
// ---------------------------------------------------------------------------
export const youtubeAdsPillarContent: ServicePillarContent = {
  overview: {
    title: "YouTube ads that reach buyers while attention is still cheap.",
    paragraphs: [
      "YouTube sits between search and social. People go there to learn, compare, and decide, which makes it one of the few places you can still put a message in front of a buyer before they hit Google and start comparing prices. Most advertisers waste that by running a repurposed TV spot with no skip-proof hook and no clear next step.",
      "KINEXIS builds YouTube programs around the first five seconds and the action that follows. We structure campaigns by intent using in-stream, in-feed, and Shorts placements, then layer audience signals from your customer data, search history, and website visitors so spend lands on people who can actually buy.",
      "Every campaign runs through the same conversion tracking we use for Search, so view-through and click conversions tie back to booked calls and revenue. YouTube stops being a brand-awareness line item you cannot measure and starts feeding your pipeline.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Strategy, targeting, and creative direction managed|as one video advertising program.",
    items: [
      { title: "Campaign & Placement Strategy", description: "In-stream, in-feed, and Shorts campaigns structured by funnel stage and buying intent, not one catch-all campaign." },
      { title: "Audience & Targeting Build", description: "Custom segments from your customer lists, search intent, competitor viewers, and website retargeting pools." },
      { title: "Creative Direction & Hook Testing", description: "Scripts and edits built around the first five seconds, with multiple hooks tested to beat the skip button." },
      { title: "Landing Page Alignment", description: "Post-click pages matched to the ad promise so the traffic you pay for has somewhere to convert." },
      { title: "Conversion Tracking Setup", description: "GA4, enhanced conversions, and view-through attribution so video spend maps to leads and revenue." },
      { title: "Weekly Optimization & Reporting", description: "Bid, audience, and creative adjustments each week with reporting on view rate, CPA, and conversions." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From account setup to a video program that converts.",
    phases: [
      { phase: "Week 1–2", duration: "Strategy & Setup", description: "Account audit, audience research, tracking validation, and campaign architecture built around your goals." },
      { phase: "Week 3–4", duration: "Creative & Launch", description: "Hook and creative direction, landing page alignment, and first campaigns live with tracking verified." },
      { phase: "Month 2", duration: "Optimize", description: "Audience and placement pruning, hook testing, and bid adjustments tied to cost per qualified action." },
      { phase: "Month 3+", duration: "Scale", description: "Winning audiences and creative scaled, new placements tested, and spend expanded as CPA holds." },
    ],
  },
  pricing: {
    title: "Boosted videos vs. a managed YouTube program",
    subtitle: "What changes when targeting, creative, and tracking are run as one system.",
    tiers: [
      { name: "Starter", range: "$600/mo", description: "Single-market YouTube management for advertisers with up to $5K monthly ad spend." },
      { name: "Growth", range: "$1,200/mo", description: "Multi-campaign video across YouTube and Google with creative testing and $5K–$20K ad spend." },
      { name: "Scale", range: "$2,500+/mo", description: "Full video advertising program with multi-market targeting, advanced attribution, and $20K+ ad spend." },
    ],
    note: "Management fees are separate from ad spend. Video production can be handled in-house or through our video marketing service and is quoted separately.",
  },
  results: {
    title: "Results we track",
    subtitle: "Video advertising outcomes from recent programs.",
    metrics: [
      { metric: "48%", label: "avg. view rate · optimized in-stream" },
      { metric: "-31%", label: "CPA vs. first-month benchmark" },
      { metric: "3.1x", label: "return on ad spend · retargeting layer" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Landing Page Design & Optimization
// ---------------------------------------------------------------------------
export const landingPagesPillarContent: ServicePillarContent = {
  overview: {
    title: "Landing pages built for one campaign, one audience, one action.",
    paragraphs: [
      "Sending paid traffic to your homepage is one of the most expensive habits in marketing. A homepage answers ten questions for ten different visitors. A landing page answers one question for the exact person who clicked your ad, which is why a dedicated page routinely doubles the conversion rate of the same offer on a general page.",
      "KINEXIS designs and builds landing pages around a single conversion goal. Message match with the ad, a headline that qualifies fast, proof placed where doubt shows up, and a form or call CTA that removes friction instead of adding it. Then we test the parts that move the number.",
      "Every page ships with conversion tracking and a testing plan. You get a page that loads fast, reflects your brand, and gives your paid campaigns somewhere to convert, plus the data to keep improving it after launch.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Design, build, and optimization for pages|where your ad budget actually lands.",
    items: [
      { title: "Conversion Strategy & Wireframe", description: "Message match, offer positioning, and page structure mapped to the campaign and audience before design starts." },
      { title: "Custom Page Design", description: "On-brand, mobile-first design with a clear visual hierarchy that leads to a single primary action." },
      { title: "Development & Build", description: "Fast, responsive build on your CMS or a dedicated landing page platform, tested across devices and browsers." },
      { title: "Conversion Copywriting", description: "Headlines, subheads, and CTA copy written to qualify visitors and answer objections in order." },
      { title: "Tracking & Form Setup", description: "GA4, form and call tracking, and thank-you flows so every conversion is captured and attributed." },
      { title: "A/B Testing & Iteration", description: "Structured tests on headlines, layout, and forms with statistical gates and a record of what won." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From wireframe to a live, converting page.",
    phases: [
      { phase: "Week 1", duration: "Strategy & Wireframe", description: "Campaign review, offer positioning, message match, and approved wireframe for the page." },
      { phase: "Week 2", duration: "Design & Copy", description: "High-fidelity design, conversion copy, and stakeholder review before build." },
      { phase: "Week 3", duration: "Build & Launch", description: "Development, tracking setup, cross-device QA, and launch with a conversion baseline captured." },
      { phase: "Month 2+", duration: "Test & Optimize", description: "A/B tests on the highest-impact elements, with winners deployed and the next test queued." },
    ],
  },
  pricing: {
    title: "Homepage traffic vs. a purpose-built landing page",
    subtitle: "What changes when the page is built for the campaign, then tested.",
    tiers: [
      { name: "Starter", range: "$500", description: "Single conversion-focused landing page with copy, design, build, and tracking setup." },
      { name: "Growth", range: "$1,000", description: "Campaign set of 2–3 pages with message match per audience and a launch testing plan." },
      { name: "Scale", range: "$2,000+", description: "Campaign set of 5+ pages or an ongoing design and A/B testing engagement for always-on campaigns." },
    ],
    note: "Fixed project fees by page count. Ongoing testing retainers are available. Ad spend and platform fees are separate.",
  },
  results: {
    title: "Results we track",
    subtitle: "Landing page outcomes from recent projects.",
    metrics: [
      { metric: "1.8% → 8.4%", label: "conversion rate · Landscaping Co." },
      { metric: "+42%", label: "form completion · A/B test winner" },
      { metric: "Lighthouse 94", label: "performance · post-build" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Website Maintenance & Support
// ---------------------------------------------------------------------------
export const websiteMaintenancePillarContent: ServicePillarContent = {
  overview: {
    title: "Website care that keeps your site fast, secure, and online.",
    paragraphs: [
      "A website is not a project you finish. Plugins update, security patches ship, forms silently break, and a site that launched fast slowly gathers weight until it costs you leads. Most businesses only notice when something is already down or a customer can't submit a form.",
      "KINEXIS runs proactive maintenance so problems get caught before they cost you. Core, theme, and plugin updates tested on staging. Daily backups you can actually restore from. Uptime and security monitoring, malware scanning, and a real person to fix things when you need a change made.",
      "You get a predictable monthly plan instead of surprise developer invoices, plus a monthly report showing what was updated, what was blocked, and how the site is performing. Your site stays current and you stop worrying about it.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Proactive care and hands-on support|so your site stays healthy month after month.",
    items: [
      { title: "Core, Theme & Plugin Updates", description: "Updates applied and tested on staging first, so nothing breaks in production the way auto-updates do." },
      { title: "Daily Backups & Restore", description: "Automated off-site backups with tested restore points, so a bad update is a five-minute fix, not a crisis." },
      { title: "Security & Malware Monitoring", description: "Firewall management, malware scanning, and hardening to keep your site off blocklists and out of trouble." },
      { title: "Uptime Monitoring", description: "Round-the-clock uptime checks with alerts, so downtime is caught and addressed before customers notice." },
      { title: "Content & Support Requests", description: "A monthly block of hands-on time for edits, new sections, and small fixes handled by a real developer." },
      { title: "Monthly Health Report", description: "A clear report on updates applied, threats blocked, uptime, and performance so you know the site is handled." },
    ],
  },
  timeline: {
    title: "Onboarding timeline",
    subtitle: "From handoff to a fully monitored, backed-up site.",
    phases: [
      { phase: "Week 1", duration: "Audit & Onboarding", description: "Full site audit, staging environment setup, and baseline of plugins, performance, and security." },
      { phase: "Week 2", duration: "Backups & Monitoring", description: "Backup schedule, uptime and security monitoring, and firewall configured and verified." },
      { phase: "Week 3–4", duration: "Cleanup & Hardening", description: "Pending updates cleared on staging, vulnerabilities patched, and known issues resolved." },
      { phase: "Ongoing", duration: "Maintain & Support", description: "Scheduled updates, backups, monitoring, support requests, and a monthly health report." },
    ],
  },
  pricing: {
    title: "DIY updates vs. a managed care plan",
    subtitle: "What changes when updates, backups, and support are handled every month.",
    tiers: [
      { name: "Starter", range: "$99/mo", description: "Updates, daily backups, uptime and security monitoring for standard business sites." },
      { name: "Growth", range: "$249/mo", description: "Everything in Starter plus staging, priority support, and a monthly block of edit time." },
      { name: "Scale", range: "$499+/mo", description: "Managed care for larger or e-commerce sites with faster response times and expanded support hours." },
    ],
    note: "Plans are month to month. Hosting and third-party licenses are billed separately. Larger change requests are quoted before work begins.",
  },
  results: {
    title: "What plans deliver",
    subtitle: "The outcomes a proactive care plan is built to protect.",
    metrics: [
      { metric: "99.9%", label: "uptime target · monitored 24/7" },
      { metric: "Daily", label: "off-site backups · tested restores" },
      { metric: "< 1 biz day", label: "response on support requests" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Website Speed & Performance Optimization
// ---------------------------------------------------------------------------
export const websiteSpeedPillarContent: ServicePillarContent = {
  overview: {
    title: "Speed work that recovers the visitors slow pages quietly cost you.",
    paragraphs: [
      "Every second of load time has a price. Visitors leave, conversion rates drop, and Google factors Core Web Vitals into rankings, so a slow site loses traffic twice: once at the search result and again on the page. Most sites are slow for the same handful of reasons, and almost all of them are fixable.",
      "KINEXIS runs a full performance audit against real Core Web Vitals data, then fixes the causes: oversized images, render-blocking scripts, bloated plugins, no caching, and a slow server response. We measure before and after so the improvement is a number you can see, not a vague promise.",
      "The goal is a site that loads before people lose patience and passes Core Web Vitals on mobile, where most of your traffic lives. Faster pages convert better and rank better, and the work usually pays for itself in recovered leads.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "A measured performance overhaul from audit|through verified Core Web Vitals results.",
    items: [
      { title: "Performance Audit", description: "Lab and field data analysis against Core Web Vitals, with a prioritized list of what is actually slowing the site." },
      { title: "Image & Media Optimization", description: "Compression, next-gen formats, correct sizing, and lazy loading to cut the heaviest page weight first." },
      { title: "Code & Script Cleanup", description: "Render-blocking CSS and JavaScript deferred or removed, unused code eliminated, and third-party scripts audited." },
      { title: "Caching & Delivery", description: "Page and browser caching, a CDN, and compression configured for fast repeat loads and global delivery." },
      { title: "Server & Core Web Vitals Tuning", description: "Server response time, LCP, CLS, and INP addressed so the site passes on mobile and desktop." },
      { title: "Before & After Reporting", description: "Documented Lighthouse and Core Web Vitals scores before and after, so the gain is measurable." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From audit to a site that passes Core Web Vitals.",
    phases: [
      { phase: "Week 1", duration: "Audit & Baseline", description: "Lab and field data captured, bottlenecks identified, and a prioritized fix plan with expected impact." },
      { phase: "Week 2", duration: "Assets & Delivery", description: "Image optimization, caching, CDN, and compression implemented on the heaviest-impact items first." },
      { phase: "Week 3", duration: "Code & Server", description: "Render-blocking resources resolved, scripts cleaned up, and server response tuned." },
      { phase: "Week 4", duration: "Verify & Report", description: "Core Web Vitals re-measured, results documented, and a plan to hold performance over time." },
    ],
  },
  pricing: {
    title: "One-off tweaks vs. a measured speed overhaul",
    subtitle: "What changes when the work is audited, prioritized, and verified.",
    tiers: [
      { name: "Starter", range: "$500", description: "Full performance audit with a prioritized fix plan and quick wins implemented." },
      { name: "Growth", range: "$1,000", description: "Core Web Vitals overhaul across images, code, and caching with verified before-and-after results." },
      { name: "Scale", range: "$2,000+", description: "Complete performance rebuild across images, code, caching, and server tuning for larger sites." },
    ],
    note: "Fixed project fees by scope. Ongoing performance monitoring is available as a separate retainer. Hosting upgrades, if needed, are quoted separately.",
  },
  results: {
    title: "Results we track",
    subtitle: "Performance outcomes from recent optimization work.",
    metrics: [
      { metric: "Lighthouse 94", label: "performance · post-optimization" },
      { metric: "-58%", label: "load time · median across pages" },
      { metric: "Core Web Vitals", label: "passing on mobile and desktop" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Microsoft Ads (Bing Ads)
// ---------------------------------------------------------------------------
export const microsoftAdsPillarContent: ServicePillarContent = {
  overview: {
    title: "Microsoft Ads that reach the buyers Google alone misses.",
    paragraphs: [
      "Everyone crowds into Google, so the auction there gets expensive fast. Microsoft Ads runs across Bing, Yahoo, and the wider Microsoft network, where cost per click is often lower and the audience skews older, higher-income, and more likely to buy on a work device. For a lot of B2B and considered-purchase businesses, that traffic converts as well as Google at a fraction of the cost.",
      "KINEXIS manages Microsoft Ads as its own program, not an afterthought import from your Google account. We rebuild campaign structure for the platform, adjust bids for a different competitive landscape, and use LinkedIn profile targeting, which only Microsoft offers, to reach people by job title, company, and industry.",
      "Every campaign runs on the same conversion tracking we use everywhere else, so you can compare cost per qualified lead against Google side by side and move budget to whichever platform is actually cheaper for your business.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "A dedicated Microsoft Ads program, not a|copy-paste of your Google campaigns.",
    items: [
      { title: "Account Setup & Import Review", description: "Clean account build or a full audit of an imported Google account, restructured for how Microsoft's auction actually behaves." },
      { title: "Campaign Architecture", description: "Search, Shopping, and Audience campaigns segmented by intent, with keyword themes tuned to Bing search behavior." },
      { title: "LinkedIn Profile Targeting", description: "Company, industry, and job-function targeting that only exists on Microsoft Ads, ideal for B2B and high-consideration offers." },
      { title: "Negative Keyword Management", description: "Weekly search term review and negative lists so your budget stays on queries that convert." },
      { title: "Conversion Tracking Setup", description: "UET tag, conversion goals, and CRM connection so every lead ties back to a campaign and a dollar figure." },
      { title: "Weekly Optimization & Reporting", description: "Bid, budget, and creative adjustments each week with reporting that compares performance to your Google spend." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From account setup to a channel that earns its budget.",
    phases: [
      { phase: "Week 1", duration: "Audit & Setup", description: "Account build or import review, UET tag verification, and campaign architecture mapped to your goals." },
      { phase: "Week 2", duration: "Launch", description: "Campaigns, keywords, and audiences live with tracking confirmed before spend ramps up." },
      { phase: "Month 1", duration: "Optimize", description: "Search term mining, bid adjustments, and audience refinement tied to cost per qualified lead." },
      { phase: "Month 2+", duration: "Scale", description: "Winning campaigns expanded, LinkedIn targeting layered in, and budget balanced against Google performance." },
    ],
  },
  pricing: {
    title: "Ignoring Bing vs. running it as its own channel",
    subtitle: "What changes when Microsoft Ads gets real management instead of an import.",
    tiers: [
      { name: "Starter", range: "$400/mo", description: "Single-market Search management for advertisers with up to $4K monthly ad spend." },
      { name: "Growth", range: "$800/mo", description: "Search plus Shopping and Audience campaigns with LinkedIn targeting and $4K–$15K ad spend." },
      { name: "Scale", range: "$1,800+/mo", description: "Full Microsoft Ads program with multi-market targeting, advanced attribution, and $15K+ ad spend." },
    ],
    note: "Management fees are separate from ad spend, which bills directly to Microsoft. Often runs alongside Google Ads for wider reach.",
  },
  results: {
    title: "Results we track",
    subtitle: "What a dedicated Microsoft Ads program is built to deliver.",
    metrics: [
      { metric: "20–35%", label: "lower CPC vs. comparable Google campaigns" },
      { metric: "B2B reach", label: "via LinkedIn profile targeting" },
      { metric: "Side by side", label: "CPL reported against Google spend" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Copywriting & Content Creation
// ---------------------------------------------------------------------------
export const copywritingPillarContent: ServicePillarContent = {
  overview: {
    title: "Copywriting that sounds like you and moves people to act.",
    paragraphs: [
      "Most business copy says nothing. It fills the page with claims any competitor could make and leaves the reader to figure out why they should care. Good copy does the opposite: it names the problem in the reader's own words, makes one clear argument, and asks for a specific next step.",
      "KINEXIS writes conversion copy for the places it matters most, from website pages and landing pages to email sequences, ad copy, and sales collateral. Every piece starts with your customers, not a template. We learn how they describe the problem, what they compare you against, and what makes them hesitate, then write to that.",
      "This is a retainer for teams that need consistent, on-brand writing without hiring a full-time copywriter. You get a writer who learns your voice, works from a shared calendar, and turns rough ideas into finished copy that reads like it came from inside the company.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "On-brand writing across the channels|where words do the selling.",
    items: [
      { title: "Voice & Messaging Guide", description: "A short, usable guide to your tone, key phrases, and value propositions so every piece sounds consistent." },
      { title: "Website & Landing Page Copy", description: "Conversion-focused page copy that qualifies visitors, answers objections in order, and drives one clear action." },
      { title: "Email & Sequence Copy", description: "Nurture sequences, campaigns, and lifecycle emails written to earn opens and move readers toward a decision." },
      { title: "Ad & Social Copy", description: "Hooks, headlines, and captions written for each platform and tested against real performance." },
      { title: "Sales & Case Study Content", description: "One-pagers, proposals, and case studies that give your sales team words that actually close." },
      { title: "Editing & Optimization", description: "Rewrites of existing copy to sharpen the message, tighten the language, and lift conversion." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From voice discovery to a steady flow of finished copy.",
    phases: [
      { phase: "Week 1", duration: "Voice & Discovery", description: "Customer research, existing content review, and a messaging guide that captures how you sound." },
      { phase: "Week 2", duration: "First Deliverables", description: "First priority pieces drafted, reviewed, and refined against the voice guide." },
      { phase: "Month 1", duration: "Cadence", description: "A shared content calendar running, with a predictable weekly or monthly output." },
      { phase: "Month 2+", duration: "Refine & Scale", description: "Performance reviewed, top pieces optimized, and output scaled to your channels." },
    ],
  },
  pricing: {
    title: "Generic filler vs. copy written to convert",
    subtitle: "Monthly retainers scoped to the volume and channels you need.",
    tiers: [
      { name: "Starter", range: "$400/mo", description: "A steady flow of copy for one channel, ideal for blogs, emails, or ongoing web updates." },
      { name: "Growth", range: "$800/mo", description: "Multi-channel copywriting across web, email, and ads with a shared content calendar." },
      { name: "Scale", range: "$2,000+/mo", description: "High-volume content and copy across every channel with dedicated writing and editorial support." },
    ],
    note: "Retainers are month to month and scoped by volume. Per-project pricing is available for one-off pieces like a full site rewrite.",
  },
  results: {
    title: "What good copy delivers",
    subtitle: "The outcomes conversion writing is built to move.",
    metrics: [
      { metric: "One voice", label: "consistent across every channel" },
      { metric: "Faster", label: "turnaround than an in-house hire" },
      { metric: "Written to convert", label: "not just to fill the page" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Marketing Audits
// ---------------------------------------------------------------------------
export const marketingAuditsPillarContent: ServicePillarContent = {
  overview: {
    title: "A marketing audit that tells you exactly what to fix first.",
    paragraphs: [
      "When results stall, the instinct is to spend more or add another channel. Usually the real problem is somewhere you're not looking: broken tracking, a leaky funnel, budget in the wrong place, or a message that never landed. An audit finds it before you spend another dollar covering it up.",
      "KINEXIS runs a structured review of your marketing across acquisition, conversion, and measurement. We dig into your analytics, ad accounts, SEO footprint, website, email, and reporting, then rank what we find by impact so you know what to fix this month versus next quarter.",
      "You get a clear, prioritized report and a working session to walk through it, not a 60-page PDF that gathers dust. Whether your team runs the fixes or we do, you leave with a plan grounded in your actual numbers.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "A full diagnostic of where your marketing|leaks money and where it can grow.",
    items: [
      { title: "Analytics & Tracking Review", description: "A check of GA4, tags, and conversion tracking to confirm your numbers can actually be trusted." },
      { title: "Channel Performance Audit", description: "Ad accounts, SEO, email, and social reviewed for wasted spend, missed opportunity, and quick wins." },
      { title: "Website & Conversion Review", description: "Funnel, landing page, and UX analysis to find where interested visitors are dropping off." },
      { title: "Competitor Benchmark", description: "How your visibility, messaging, and spend compare to the competitors winning in your market." },
      { title: "Prioritized Findings", description: "Everything we find, ranked by impact and effort, so you know the order to fix it in." },
      { title: "Action Plan & Walkthrough", description: "A working session to review the report and a 90-day plan your team can execute or hand back to us." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From access to a plan you can act on.",
    phases: [
      { phase: "Week 1", duration: "Access & Data Pull", description: "We gather access to your analytics, ad accounts, and tools, then pull the baseline data." },
      { phase: "Week 2", duration: "Analysis", description: "Deep review across channels, tracking, and conversion, with findings scored by impact." },
      { phase: "Week 3", duration: "Report & Walkthrough", description: "Prioritized findings delivered in a working session, with a clear 90-day action plan." },
      { phase: "After", duration: "Execution (Optional)", description: "Your team runs the plan, or we scope the work and take it on directly." },
    ],
  },
  pricing: {
    title: "Guessing vs. a diagnosis backed by your data",
    subtitle: "Fixed-fee audits scoped to how much of your marketing we review.",
    tiers: [
      { name: "Starter", range: "$500", description: "Focused audit of one channel or your tracking setup, with prioritized findings and quick wins." },
      { name: "Growth", range: "$1,000", description: "Multi-channel audit across acquisition, conversion, and measurement with a 90-day action plan." },
      { name: "Scale", range: "$2,500+", description: "Full marketing operation review with competitor benchmarking and a detailed execution roadmap." },
    ],
    note: "Audits are fixed-fee projects. The fee is credited toward your first month if you move into an ongoing engagement.",
  },
  results: {
    title: "What an audit delivers",
    subtitle: "The clarity a structured review is built to create.",
    metrics: [
      { metric: "Ranked", label: "findings by impact and effort" },
      { metric: "90-day plan", label: "you can act on immediately" },
      { metric: "Fee credited", label: "toward ongoing work" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Marketing Automation & CRM Consulting
// ---------------------------------------------------------------------------
export const marketingAutomationCrmPillarContent: ServicePillarContent = {
  overview: {
    title: "Automation and CRM that actually connect marketing to sales.",
    paragraphs: [
      "Most teams buy a CRM and a marketing platform, then use maybe a tenth of what they pay for. Leads sit in one tool, deals in another, and nobody can say which campaign produced the last ten customers. Automation promised to fix that and instead created a tangle of half-finished workflows.",
      "KINEXIS untangles it. We map how a lead should move from first touch to closed deal, then build the automation and CRM structure to support it: lead capture, scoring, routing, nurture, and clean handoffs to sales. Everything is documented so your team can run it without guessing.",
      "We work across HubSpot, Salesforce, GoHighLevel, ActiveCampaign, and the tools you already pay for. The goal is a system where marketing and sales share one source of truth, follow-up happens automatically, and you can finally trace revenue back to its source.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "The strategy and build to make your stack|work like one connected system.",
    items: [
      { title: "Lifecycle & Journey Mapping", description: "A clear map of how leads move from first touch to closed deal, with the triggers and stages defined." },
      { title: "CRM Setup & Cleanup", description: "Pipeline structure, fields, and data hygiene so your CRM reflects reality instead of adding to the mess." },
      { title: "Automation Build", description: "Lead capture, scoring, routing, and nurture workflows built and tested inside your platform." },
      { title: "Sales & Marketing Handoff", description: "Clear rules for when a lead is sales-ready and how it gets passed, so nothing slips through." },
      { title: "Integrations", description: "Your forms, ads, calendar, and tools connected so data flows without manual exports." },
      { title: "Documentation & Training", description: "Written playbooks and a training session so your team owns the system after we build it." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From tangled tools to one connected revenue system.",
    phases: [
      { phase: "Week 1–2", duration: "Audit & Mapping", description: "Current stack review, lifecycle mapping, and a build plan for automation and CRM structure." },
      { phase: "Week 3–4", duration: "Build", description: "CRM cleanup, core workflows, lead scoring, and integrations built and tested." },
      { phase: "Month 2", duration: "Launch & Train", description: "System goes live, sales and marketing handoff activated, and your team trained on it." },
      { phase: "Month 3+", duration: "Refine", description: "Workflows tuned against real data, with reporting that ties campaigns to closed revenue." },
    ],
  },
  pricing: {
    title: "Shelfware vs. a stack that works together",
    subtitle: "Project-based consulting scoped to the size of your build.",
    tiers: [
      { name: "Starter", range: "$1,000", description: "Core CRM setup with a handful of essential automations and clean lead capture." },
      { name: "Growth", range: "$2,500", description: "Full lifecycle build with lead scoring, nurture workflows, integrations, and documentation." },
      { name: "Scale", range: "$5,000+", description: "Complex multi-tool implementation with advanced routing, attribution, and team training." },
    ],
    note: "Project-based by scope. Platform license fees are billed by the vendor. Ongoing management retainers are available.",
  },
  results: {
    title: "What the system delivers",
    subtitle: "The outcomes a connected stack is built to produce.",
    metrics: [
      { metric: "One source", label: "of truth for marketing and sales" },
      { metric: "Automated", label: "follow-up and lead routing" },
      { metric: "Traceable", label: "revenue back to its campaign" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Fractional CMO Services
// ---------------------------------------------------------------------------
export const fractionalCmoPillarContent: ServicePillarContent = {
  overview: {
    title: "Senior marketing leadership without a full-time executive hire.",
    paragraphs: [
      "Growing companies reach a point where they need real marketing leadership but can't yet justify a $250K CMO. What they usually get instead is a junior manager stretched too thin, or a founder trying to run marketing between everything else. Both leave strategy, hiring, and budget decisions to guesswork.",
      "A KINEXIS fractional CMO plugs in as your part-time marketing leader. We own the strategy, set the priorities, manage the agencies and freelancers, and hold the team accountable to numbers that matter. You get executive-level thinking and a steady hand on the wheel, for a fraction of a full-time salary.",
      "This is an embedded engagement, not occasional advice. We join your leadership rhythm, report to you like a member of the team, and stay close enough to the work to course-correct when something isn't working. When you're ready for a full-time hire, we help you find and onboard them.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Embedded marketing leadership that owns|the strategy and drives the team.",
    items: [
      { title: "Marketing Strategy & Planning", description: "A growth strategy tied to your revenue goals, refreshed each quarter with clear priorities and budgets." },
      { title: "Team & Vendor Management", description: "Direction and accountability for your in-house team, agencies, and freelancers so the work actually ships." },
      { title: "Budget & Channel Ownership", description: "Spend allocated to the channels that produce, with the discipline to cut what doesn't." },
      { title: "KPI & Reporting Framework", description: "The metrics that matter for your stage, tracked and reported to leadership in plain language." },
      { title: "Leadership Participation", description: "A seat in your leadership meetings, bringing marketing into the decisions that shape the business." },
      { title: "Hiring & Onboarding Support", description: "Help defining, recruiting, and onboarding your permanent marketing team when the time comes." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From onboarding to steady marketing leadership.",
    phases: [
      { phase: "Month 1", duration: "Immersion", description: "Deep dive into your business, numbers, and team, plus a first-90-days priority plan." },
      { phase: "Month 2", duration: "Structure", description: "Strategy set, KPIs defined, vendors aligned, and the team pointed at the right work." },
      { phase: "Ongoing", duration: "Lead & Execute", description: "Weekly leadership, team management, and reporting against the plan, adjusted as data comes in." },
      { phase: "Quarterly", duration: "Plan & Review", description: "Strategy and budget refreshed each quarter with a review of what worked and what changes." },
    ],
  },
  pricing: {
    title: "A stretched manager vs. real marketing leadership",
    subtitle: "Monthly engagements scoped to how embedded you need us.",
    tiers: [
      { name: "Starter", range: "$2,500/mo", description: "Part-time strategic leadership with monthly planning and vendor oversight for early-stage teams." },
      { name: "Growth", range: "$5,000/mo", description: "Embedded fractional CMO with weekly involvement, team management, and full budget ownership." },
      { name: "Scale", range: "$10,000+/mo", description: "Senior leadership for growth-stage companies with multi-channel oversight and board-level reporting." },
    ],
    note: "Month to month after an initial 90-day commitment. Execution handled by your team or scoped separately with our specialists.",
  },
  results: {
    title: "What leadership delivers",
    subtitle: "The outcomes an embedded CMO is built to drive.",
    metrics: [
      { metric: "A fraction", label: "of a full-time CMO salary" },
      { metric: "Owned", label: "strategy, team, and budget" },
      { metric: "Accountable", label: "to revenue, not activity" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Training & Workshops
// ---------------------------------------------------------------------------
export const trainingWorkshopsPillarContent: ServicePillarContent = {
  overview: {
    title: "Marketing training that leaves your team able to do the work.",
    paragraphs: [
      "Sometimes the right move isn't to outsource, it's to build the skill in-house. But generic online courses rarely stick because they're not about your business, your tools, or your market. Your team finishes the video and still doesn't know how to apply it on Monday.",
      "KINEXIS runs practical, hands-on training built around your actual accounts and goals. Whether it's SEO, paid ads, analytics, content, or a full-stack marketing overview, we teach with your data on the screen and your team doing the work, not watching slides.",
      "Sessions can be a single focused workshop, a multi-day intensive, or an ongoing coaching arrangement. Everyone leaves with templates, checklists, and recordings, so the knowledge stays in the building after we do.",
    ],
  },
  deliverables: {
    title: "What's included",
    subtitle: "Hands-on sessions built around your|business, your tools, and your data.",
    items: [
      { title: "Custom Curriculum", description: "A session plan built for your team's skill level, tools, and the outcomes you actually need." },
      { title: "Live, Hands-On Sessions", description: "Working sessions using your accounts and real tasks, not generic slides and hypotheticals." },
      { title: "Channel-Specific Training", description: "Deep dives on SEO, paid ads, analytics, content, email, or social, chosen by what your team needs most." },
      { title: "Templates & Playbooks", description: "The checklists, templates, and processes we teach, so the workflow outlives the session." },
      { title: "Recordings & Materials", description: "Every session recorded and documented for onboarding and future reference." },
      { title: "Follow-Up Support", description: "A window for questions after the session so learning turns into applied habit." },
    ],
  },
  timeline: {
    title: "Engagement timeline",
    subtitle: "From goals to a team that can run the work.",
    phases: [
      { phase: "Week 1", duration: "Scope & Design", description: "We assess your team's level and goals, then design a curriculum around your tools and data." },
      { phase: "Session", duration: "Deliver", description: "Live, hands-on training with your real accounts, whether a single workshop or a multi-day intensive." },
      { phase: "After", duration: "Materials", description: "Recordings, templates, and playbooks delivered so the knowledge stays with the team." },
      { phase: "Optional", duration: "Ongoing Coaching", description: "Recurring sessions to build skills over time and keep the team sharp as tools change." },
    ],
  },
  pricing: {
    title: "Generic courses vs. training on your own accounts",
    subtitle: "Priced by format, from a single workshop to ongoing coaching.",
    tiers: [
      { name: "Starter", range: "$500/session", description: "A focused 2–3 hour workshop on a single topic, run live with your team and your data." },
      { name: "Growth", range: "$1,500/day", description: "A full-day intensive across multiple topics with templates, playbooks, and recordings." },
      { name: "Scale", range: "Custom", description: "A multi-session program or ongoing coaching retainer built around your team's development plan." },
    ],
    note: "Delivered remotely or on-site. On-site travel is quoted separately. Custom programs are scoped to your goals.",
  },
  results: {
    title: "What training delivers",
    subtitle: "The capability a hands-on program is built to create.",
    metrics: [
      { metric: "In-house", label: "skill that stays after we leave" },
      { metric: "Your accounts", label: "not generic examples" },
      { metric: "Templates", label: "and recordings to keep" },
    ],
  },
};
