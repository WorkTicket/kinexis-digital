import { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS } from "@/lib/content";
import { contentMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { ArticleSchema } from "@/components/JsonLd";
import { PageHero, Section, CtaBand } from "@/components/ui";

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

const POST_CONTENT: Record<string, { lead: string; sections: { h2: string; html: string }[] }> = {
  "website-mistakes-that-cost-you-calls": {
    lead: "Your website should be your best salesperson. Works 24/7. Never calls in sick. Answers every question before the customer even asks. At least, that's the idea. Reality? Most trade websites are basically expensive digital business cards — pretty, maybe, but they don't actually sell.",
    sections: [
      {
        h2: "The 3-Second Rule You're Probably Failing",
        html: `<p>Three seconds. That's all you get.</p>
        <p>Research backs this up — visitors decide to stay or bounce in roughly the time it takes to read this sentence. Three seconds to answer: What do you do? Where do you do it? Why should I trust you?</p>
        <p>Most trade sites bury the lead. "Quality Service Since 1995." "Your Local Experts." Nobody — and I mean nobody — searches for "quality service since 1995." They search "emergency plumber Austin" or "roof repair near me" at 11 PM when water's dripping through their ceiling.</p>
        <p>If your headline doesn't scream the answer, you've already lost them.</p>`,
      },
      {
        h2: "Mistake #1: No Clear Service Area Map",
        html: `<p>Here's a scenario: I land on your site. I have a broken AC. It's July. I'm sweating. I scan for my neighborhood — nothing. Just "Serving the Greater Metro Area." What does that even mean? My zip code? The next town over?</p>
        <p>I'm gone. Back to Google. Next result.</p>
        <p>A simple interactive map or a plain list of your top 15-20 service areas in the header and footer eliminates this friction entirely. Google reads it. Customers scan it. Both win. Takes 10 minutes to add.</p>`,
      },
      {
        h2: "Mistake #2: Contact Info Hidden in the Footer",
        html: `<p>Your phone number should be unavoidable. Clickable. Prominent. Repeated.</p>
        <ul>
          <li>Header: top right, high contrast, <code>tel:</code> link</li>
          <li>Hero: primary CTA button = "Call Now" with phone link</li>
          <li>Service pages: sticky contact bar or sidebar</li>
          <li>Footer: phone, email, address, hours</li>
        </ul>
        <p>On mobile? Sticky click-to-call bar at the bottom. Always visible. Every tap that isn't a call is a lost lead. Period.</p>`,
      },
      {
        h2: "Mistake #3: Generic Stock Photos That Scream 'Fake'",
        html: `<p>You know the one. Smiling model in a hard hat. Perfectly clean coveralls. Pointing at blueprints with a pen that's never seen a jobsite.</p>
        <p>Real customers spot stock photos instantly. It signals one of two things: "We don't have real work to show" or "We're hiding something." Neither is good.</p>
        <p>Use photos of your actual trucks. Your actual crew. Your actual jobs. Even imperfect real photos — slightly crooked, weird lighting, your guy making a face — outperform polished stock every single time. Why? Because they're <em>proof</em>. Trust isn't built on perfection. It's built on evidence.</p>`,
      },
      {
        h2: "Mistake #4: No Reviews on the Homepage",
        html: `<p>88% of consumers trust online reviews as much as personal recommendations. Let that sink in.</p>
        <p>If your best social proof lives only on Google Maps, you're wasting it. Embed 3-5 recent 5-star reviews with names, photos, and project types directly on your homepage. Rotate them. Make them impossible to miss.</p>`,
      },
      {
        h2: "Mistake #5: Forms That Ask for Everything, Convert Nothing",
        html: `<p>A 12-field contact form converts at ~1%. A 3-field form (name, phone, problem) converts at 3-5%.</p>
        <p>Every field you add costs you leads. Ask only what you need to dispatch a truck. That's it. The rest happens on the phone — where you actually close the deal.</p>`,
      },
      {
        h2: "Mistake #6: Slow Load Times on Mobile",
        html: `<p>53% of mobile visitors abandon sites taking longer than 3 seconds. Most trade sites? 6-10 seconds on 4G. Uncompressed images. Bloated themes. No caching.</p>
        <p>Run your URL through PageSpeed Insights right now. If mobile is under 90, you're losing calls daily. Not "maybe." Daily.</p>`,
      },
      {
        h2: "Mistake #7: No 'Emergency' or 'Same-Day' Signaling",
        html: `<p>If you offer emergency service, same-day appointments, or 24/7 availability — that should be the loudest message on your site. Badge it. Banner it. Put it in your page titles.</p>
        <p>When someone's basement is flooding at 11 PM, they're not reading your About page. They're looking for the biggest "WE ANSWER NOW" signal they can find. Be that signal.</p>`,
      },
      {
        h2: "How to Fix It This Week",
        html: `<ol>
          <li>Audit your homepage on mobile — phone number, service area, primary CTA visible without scrolling?</li>
          <li>Replace 3 stock photos with real job photos from your phone</li>
          <li>Add 3 recent Google reviews to your homepage</li>
          <li>Cut your contact form to 3 fields max</li>
          <li>Test mobile PageSpeed and compress your hero image</li>
          <li>Add an "Emergency Service" banner if you offer it</li>
        </ol>
        <p>None of these require a redesign. They require decisions. You can fix 5 of 7 this afternoon. The businesses that do are the ones whose phones ring while competitors wonder why their "nice website" doesn't work.</p>`,
      },
    ],
  },

  "turn-clicks-into-calls": {
    lead: "Traffic is vanity. Calls are sanity. You can have 10,000 monthly visitors and zero jobs, or 200 visitors and a full schedule. The difference isn't SEO — it's conversion architecture.",
    sections: [
      {
        h2: "Why 'Contact Us' Pages Kill Conversions",
        html: `<p>The traditional "Contact Us" page is a conversion graveyard.</p>
        <p>Think about it. By the time a visitor navigates there, they've already decided whether to call. Every click between interest and dialing the phone drops 20-30% of prospects. It's physics — friction compounds.</p>
        <p>High-converting trade sites put contact options <em>everywhere</em>: sticky header phone, hero CTA, service page sidebars, exit-intent "Call Now" modals, footer click-to-call. The phone number should be unavoidable. You shouldn't have to hunt for it.</p>`,
      },
      {
        h2: "The Missed-Call Problem Nobody Talks About",
        html: `<p>You're on a ladder. In a crawlspace. Driving between jobs. The phone rings — you can't answer.</p>
        <p>That caller doesn't leave a voicemail. They call the next listing.</p>
        <p>Industry data: 62% of calls to local businesses go unanswered. Of those, 85% won't call back. Let that marinate.</p>
        <p>This is why missed-call text-back is the single highest-ROI feature for trade businesses. An automatic text — "Sorry we missed you! This is [Business]. Reply and we'll call you back within 15 minutes." — recaptures 30-40% of otherwise lost leads. That's not theory. That's math.</p>`,
      },
      {
        h2: "Click-to-Call: The One Metric That Matters",
        html: `<p>Stop tracking "form submissions." Track click-to-call taps.</p>
        <p>On mobile, a tap-to-call is a high-intent action. If you get 500 mobile visits and 12 call taps, that's a 2.4% conversion rate. Optimize for <em>that</em> number.</p>
        <ul>
          <li>Make phone numbers <code>tel:</code> links everywhere (not plain text)</li>
          <li>Add call tracking numbers to measure source (GMB, organic, paid, referral)</li>
          <li>Record calls (with consent) to audit quality and train dispatch</li>
          <li>Review call logs weekly — missed calls = missed revenue</li>
        </ul>`,
      },
      {
        h2: "Form Strategy: Qualify, Don't Interrogate",
        html: `<p>Your form isn't a lead capture tool — it's a triage tool.</p>
        <p>Ask: What's the problem? When do you need it? What's your address? That's it. The rest happens on the phone.</p>
        <p>Bonus: Add a "preferred contact method" dropdown (Call / Text / Email). 68% of homeowners under 45 prefer text. Meet them where they are.</p>`,
      },
      {
        h2: "Speed-to-Lead: The 5-Minute Rule",
        html: `<p>Lead response time is the strongest predictor of close rate. Calling back within 5 minutes makes you 21x more likely to qualify the lead vs. 30 minutes. Within 60 minutes? 7x.</p>
        <p>If you can't personally respond that fast, automate the first touch: instant text confirmation, email with what-to-expect, calendar link for scheduling. The lead feels handled. You buy time to call.</p>`,
      },
      {
        h2: "Tracking That Actually Tells You Something",
        html: `<p>Most trade businesses track "leads" as form submissions. That's noise.</p>
        <p>Track:</p>
        <ul>
          <li>Calls > 30 seconds (real conversations)</li>
          <li>Missed callers who reply to text-back</li>
          <li>Form submissions that become booked jobs</li>
          <li>Cost per booked job by channel (GMB, organic, paid, referral)</li>
        </ul>
        <p>When you know exactly which channel produces booked jobs at what cost, you can double down. That's how you scale. Data beats gut every time.</p>`,
      },
      {
        h2: "The Conversion Stack We Build",
        html: `<p>Every Kinexis Lead System and Plus site includes: click-to-call tracking, missed-call text-back, Google review automation, monthly call reports, and a 60-day lead guarantee.</p>
        <p>Because traffic without conversion is just expensive window shopping.</p>`,
      },
    ],
  },

  "small-business-marketing-budget": {
    lead: "The average small business spends 7-12% of revenue on marketing. Most waste half of it on channels that don't produce calls. Here's how to allocate every dollar for maximum ROI in a trades business.",
    sections: [
      {
        h2: "The Golden Rule: Fish Where the Fish Are",
        html: `<p>Homeowners with broken AC units, leaking pipes, or damaged roofs don't browse Instagram for inspiration.</p>
        <p>They search Google. They ask neighbors. They check Google Maps.</p>
        <p>Your budget should follow the buyer's intent, not marketing trends.</p>`,
      },
      {
        h2: "Tier 1: Foundation (Non-Negotiable, ~40% of Budget)",
        html: `<p>These aren't marketing expenses — they're infrastructure. Without them, every other dollar underperforms.</p>
        <ul>
          <li>Professional website built for conversion (not aesthetics) — $3,000-15,000 one-time or $97-297/mo</li>
          <li>Google Business Profile optimization — $0-500 one-time</li>
          <li>Call tracking & lead reporting — $0-100/mo</li>
          <li>Review generation system — $0-150/mo</li>
        </ul>
        <p>A $97/mo website with tracking and reviews outperforms a $15,000 custom site with neither. Every time.</p>`,
      },
      {
        h2: "Tier 2: Demand Capture (High Intent, ~35% of Budget)",
        html: `<p>People actively searching for your service <em>right now</em>. Highest close rates. Shortest sales cycles.</p>
        <ul>
          <li>Google Local Services Ads (LSA) — pay per lead, Google Guaranteed badge, top of mobile results</li>
          <li>Google Search Ads (high-intent keywords: "emergency plumber [city]", "AC repair near me")</li>
          <li>Bing Ads — 30% cheaper CPCs, older demographic (homeowners)</li>
        </ul>
        <p>Start with LSA. It's pay-per-lead, not pay-per-click. You only pay for real calls. Cap at $50-100/lead depending on trade.</p>`,
      },
      {
        h2: "Tier 3: Demand Generation (Lower Intent, ~15% of Budget)",
        html: `<p>People who might need you soon, or know someone who does. Longer payback, but builds pipeline.</p>
        <ul>
          <li>Meta (Facebook/Instagram) geotargeted to your service area — retargeting website visitors, lookalike audiences</li>
          <li>Nextdoor sponsored posts — hyperlocal, trusted platform for home services</li>
          <li>Direct mail to high-value neighborhoods (postcards with offer + QR to schedule)</li>
        </ul>`,
      },
      {
        h2: "Tier 4: Brand & Retention (Compound Interest, ~10% of Budget)",
        html: `<p>The cheapest lead is a repeat customer or referral.</p>
        <ul>
          <li>Automated review requests after every job — compounds SEO and trust</li>
          <li>Email/SMS maintenance reminders (seasonal tune-ups, filter changes)</li>
          <li>Referral program: $50-100 per booked referral job</li>
          <li>Vehicle wraps — moving billboards in your service area</li>
        </ul>`,
      },
      {
        h2: "Sample Monthly Budget: $2,500 (HVAC Company, $1.2M Revenue)",
        html: `<ul>
          <li>Website + Lead System (Kinexis Lead System): $197</li>
          <li>Google LSA: $800 (target 15-20 leads @ $40-50)</li>
          <li>Google Search Ads: $600</li>
          <li>Meta retargeting + Nextdoor: $400</li>
          <li>Review automation + CRM: $150</li>
          <li>Direct mail (quarterly): $150/mo averaged</li>
          <li>Vehicle wrap (amortized): $100/mo</li>
          <li>Buffer / testing: $103</li>
        </ul>`,
      },
      {
        h2: "What to Cut Immediately",
        html: `<ul>
          <li>SEO retainers without technical deliverables and reporting — most are vapor</li>
          <li>Social media "management" posting generic tips — nobody hires from "Tip Tuesday" graphics</li>
          <li>Brand awareness campaigns — you're not Coke, you're a plumber</li>
          <li>Directory listings (Yelp, Angie's, HomeAdvisor) — you pay for leads you could get free via GMB</li>
        </ul>`,
      },
      {
        h2: "The ROI Measurement Framework",
        html: `<p>Every month, calculate: Total Marketing Spend ÷ Booked Jobs = Cost Per Job. Then: Average Job Value - Cost Per Job = Net Per Job.</p>
        <p>If LSA delivers jobs at $120 CPJ and your average ticket is $850, that's 7:1 ROI. Double that channel. If Meta delivers at $400 CPJ, optimize or cut. Data beats gut.</p>`,
      },
    ],
  },

  "make-your-website-mobile-ready": {
    lead: "63% of local searches happen on mobile. 78% of mobile local searches result in an offline action within 24 hours. If your website doesn't work flawlessly on a phone, you don't have a website — you have a hobby.",
    sections: [
      {
        h2: "The Mobile Reality Check",
        html: `<p>Pull out your phone. Search your service + your city. Click your own result.</p>
        <p>Be honest:</p>
        <ul>
          <li>Does the page load in under 3 seconds?</li>
          <li>Is the phone number tap-to-call without zooming?</li>
          <li>Can you read text without pinching?</li>
          <li>Does the contact form work with fat thumbs?</li>
          <li>Is there a sticky "Call Now" button?</li>
          <li>Does the map show your service area?</li>
        </ul>
        <p>If you answered "no" to any of these, you're losing jobs to competitors who answered "yes."</p>`,
      },
      {
        h2: "Speed: The Silent Killer",
        html: `<p>Mobile users on 4G have the patience of a toddler. Google's data: 1s delay = 7% conversion drop. 3s delay = 32% bounce increase. 5s = 90% bounce.</p>
        <p>The usual culprits on trade sites:</p>
        <ul>
          <li>Uncompressed hero images (2-5 MB → should be 100-200 KB WebP)</li>
          <li>No browser caching headers</li>
          <li>Bloated WordPress themes loading 50+ requests</li>
          <li>No CDN</li>
          <li>Render-blocking JavaScript/CSS</li>
        </ul>
        <p>Fix: Compress images to WebP, enable caching, use a CDN (Cloudflare free tier), minify CSS/JS. A 2-hour technical audit pays for itself in one recovered job.</p>`,
      },
      {
        h2: "Thumb-Zone Design",
        html: `<p>On a phone, 75% of touches happen in the bottom third of the screen (thumb zone). Your primary CTAs — Call, Schedule, Text — <em>must</em> live there.</p>
        <ul>
          <li>Sticky bottom bar: Phone icon | Schedule button</li>
          <li>Header: Clickable phone (top right, but still reachable)</li>
          <li>Forms: Full-width buttons, 48px minimum height</li>
          <li>No hover-dependent interactions (dropdown menus that require hover = broken on mobile)</li>
        </ul>`,
      },
      {
        h2: "Forms That Work on Mobile",
        html: `<p>Mobile form abandonment is 68% higher than desktop. Fix it:</p>
        <ul>
          <li>3 fields max: Name, Phone, Problem dropdown</li>
          <li>Auto-detect location for service area validation</li>
          <li>Input types: tel, email — triggers correct keyboard</li>
          <li>Auto-focus first field on load</li>
          <li>Submit button: full width, 50px height, "Call Me Now" not "Submit"</li>
          <li>Success state: "We'll call you in 5 minutes" + click-to-call fallback</li>
        </ul>`,
      },
      {
        h2: "Google's Mobile-First Indexing: You're Being Judged on Mobile",
        html: `<p>Since 2019, Google indexes the <em>mobile</em> version of your site. If mobile is stripped down (no content, no schema, different navigation), your rankings suffer. Desktop-only content doesn't count.</p>
        <p>Check: View page source on mobile vs. desktop. Same structured data? Same headings? Same content? If not, fix it.</p>`,
      },
      {
        h2: "Core Web Vitals: The Ranking Signals You Can't Ignore",
        html: `<ul>
          <li>LCP (Largest Contentful Paint) < 2.5s — hero image loads fast</li>
          <li>INP (Interaction to Next Paint) < 200ms — taps respond instantly</li>
          <li>CLS (Cumulative Layout Shift) < 0.1 — nothing jumps while loading</li>
        </ul>
        <p>These are ranking factors. Fail them, and you rank below competitors who pass. Every Kinexis site ships passing Core Web Vitals by default.</p>`,
      },
      {
        h2: "The 'Mobile-First' Audit Checklist",
        html: `<ol>
          <li>Run PageSpeed Insights on your homepage — target 90+ mobile</li>
          <li>Test tap-to-call on 3 different phones (iOS, Android, older model)</li>
          <li>Fill out your own contact form on mobile — time it</li>
          <li>Check Google Search Console > Experience > Page Experience — any failures?</li>
          <li>Verify schema markup validates on mobile (Rich Results Test)</li>
          <li>Test emergency banner visibility — does it push content down?</li>
        </ol>`,
      },
      {
        h2: "What 'Mobile Ready' Actually Looks Like",
        html: `<p>A mobile-ready trade site isn't "responsive." It's mobile-first: designed for the phone, enhanced for desktop. The phone experience is the <em>primary</em> experience. Everything else scales up.</p>
        <p>That's how we build every Kinexis site. Because that's how your customers actually browse.</p>`,
      },
    ],
  },

  "local-seo-get-found-get-called": {
    lead: "Local SEO isn't 'SEO for local businesses.' It's a completely different algorithm with different ranking factors, different competition, and different tactics. Here's the playbook that actually moves the needle for trades.",
    sections: [
      {
        h2: "The Three Pillars of Local Ranking",
        html: `<p>Google's local algorithm weighs three things: Relevance, Distance, Prominence. You control Relevance and Prominence. Distance is fixed — but you can expand perceived relevance across your service area.</p>`,
      },
      {
        h2: "Pillar 1: Google Business Profile (GBP) — Your Digital Storefront",
        html: `<p>GBP drives 60%+ of local leads for most trades. Yet 56% of local businesses haven't claimed their profile. Of those who have, most treat it as "set and forget."</p>
        <h3>GBP Optimization Checklist</h3>
        <ul>
          <li>Primary category: Exact match (e.g., "Plumber" not "Contractor")</li>
          <li>Secondary categories: All 9 slots filled with relevant services</li>
          <li>Business name: Real name + one keyword if natural ("Smith Plumbing & Drain")</li>
          <li>Service areas: Set explicitly (don't rely on address radius)</li>
          <li>Hours: Accurate, including seasonal/emergency</li>
          <li>Photos: 20+ (truck, crew, jobs, equipment, office, reviews screenshot)</li>
          <li>Posts: Weekly — offers, updates, completed jobs (signals activity)</li>
          <li>Q&A: Seed 5-10 common questions, answer them yourself</li>
          <li>Attributes: Emergency, women-led, veteran-owned, etc.</li>
        </ul>`,
      },
      {
        h2: "Pillar 2: On-Page Local Signals",
        html: `<p>Your website tells Google where you're relevant. Every service page needs:</p>
        <ul>
          <li>City/neighborhood in H1: "AC Repair in [City], [State]"</li>
          <li>Service area map or list in content</li>
          <li>Local schema markup (LocalBusiness + Service + AreaServed)</li>
          <li>NAP (Name, Address, Phone) in footer — consistent with GBP</li>
          <li>Embedded Google Map of service area</li>
          <li>City-specific content: "We serve [Neighborhood] homes since 2010"</li>
          <li>Internal links from city pages to service pages</li>
        </ul>`,
      },
      {
        h2: "Pillar 3: Prominence — Reviews, Citations, Links",
        html: `<p>Prominence = how well-known and trusted you are online. Three levers:</p>
        <ul>
          <li>Reviews: Quantity, velocity, recency, diversity (Google > all others). Automate requests.</li>
          <li>Citations: Consistent NAP on 50+ directories (Yelp, BBB, Angi, Chamber, niche). Use a service (BrightLocal, Whitespark) or do manually.</li>
          <li>Links: Local links beat national. Chamber, suppliers, manufacturers, local news, sponsorships, partners. 10 local links > 100 directory links.</li>
        </ul>`,
      },
      {
        h2: "The Service Area Page Strategy",
        html: `<p>Don't stuff 30 cities into one footer. Build dedicated pages: <code>/service-area/[city]</code>. Each page:</p>
        <ul>
          <li>Unique content (not duplicate with city name swapped)</li>
          <li>Real jobs in that city (photos, case studies, reviews)</li>
          <li>Local landmarks/neighborhoods mentioned</li>
          <li>GBP review widget filtered to that city (if possible)</li>
          <li>Local schema with AreaServed = that city</li>
        </ul>
        <p>Start with your top 5-10 cities by volume. Add 2/month. In a year you own the map.</p>`,
      },
      {
        h2: "Technical Local SEO: The Invisible Foundation",
        html: `<ul>
          <li>Site speed (Core Web Vitals) — mobile-first</li>
          <li>SSL/HTTPS — non-negotiable</li>
          <li>XML sitemap submitted to GSC</li>
          <li>No duplicate content (city pages = unique)</li>
          <li>Structured data: LocalBusiness, Service, AreaServed, Review, FAQ</li>
          <li>Click-to-call tracking with tel: links</li>
          <li>Mobile usability — zero errors in GSC</li>
        </ul>`,
      },
      {
        h2: "Content That Ranks: Answer the Phone Before It Rings",
        html: `<p>People search questions, not keywords. Build content around:</p>
        <ul>
          <li>"How much does [service] cost in [city]?"</li>
          <li>"Emergency [service] [city] 24 hour"</li>
          <li>"[Service] near [neighborhood/landmark]"</li>
          <li>"Signs you need [service]"</li>
          <li>"[Service] vs [alternative]"</li>
        </ul>
        <p>Each = a blog post or FAQ entry. Schema-markup the FAQs. Win featured snippets. Capture voice search.</p>`,
      },
      {
        h2: "Tracking: The Only Metrics That Matter",
        html: `<ul>
          <li>GBP Insights: Searches, views, actions (call, direction, website)</li>
          <li>GSC: Impressions/clicks for "service + city" queries</li>
          <li>Call tracking: Calls by source (GBP, organic, paid, direct)</li>
          <li>Lead quality: Booked jobs / total leads by channel</li>
          <li>Map pack ranking: Track top 10 keywords in top 3 cities weekly</li>
        </ul>`,
      },
      {
        h2: "The 90-Day Sprint",
        html: `<ol>
          <li>Week 1-2: Claim/optimize GBP, fix NAP, submit citations</li>
          <li>Week 3-4: Build top 5 city pages, add local schema</li>
          <li>Month 2: Launch review automation, start weekly GBP posts</li>
          <li>Month 3: Outreach for 10 local links, publish 8 FAQ posts</li>
          <li>Ongoing: Monthly GBP audit, quarterly citation cleanup, weekly review requests</li>
        </ol>`,
      },
    ],
  },

  "build-trust-with-reviews": {
    lead: "Reviews are the new word-of-mouth. 93% of consumers read reviews before calling a local business. A systematic review engine doesn't just build trust — it compounds your SEO, lowers your cost per lead, and becomes a competitive moat.",
    sections: [
      {
        h2: "The Math: Why Reviews Beat Ads",
        html: `<p>A 4.8-star profile with 120 reviews converts 3-4x better than a 4.2-star profile with 12 reviews — even if the 4.2 business spends 5x on ads.</p>
        <p>Reviews are trust at scale. Ads are rent. Reviews are equity.</p>`,
      },
      {
        h2: "The Review Flywheel",
        html: `<p>More reviews → higher map pack ranking → more visibility → more calls → more jobs → more reviews. It's a flywheel. But it needs a push to start.</p>
        <ul>
          <li>Trigger: Automated request sent 30 minutes after job completion</li>
          <li>Channel: SMS (98% open rate) + email backup</li>
          <li>Link: Direct to Google review form (pre-filled if possible)</li>
          <li>Follow-up: Reminder at 48 hours if no action</li>
          <li>Response: Owner replies to EVERY review within 24 hours</li>
        </ul>`,
      },
      {
        h2: "How to Ask (Without Being Awkward)",
        html: `<p>The ask matters. Bad: "Leave us a review!" Good: "Hi [Name], thanks for trusting us with your [service]. It would mean a lot if you'd share your experience — it helps other homeowners find us. [Link]"</p>
        <p>Personalize: Reference the specific job. "Great catching that slab leak on Maple St." Beats generic every time.</p>`,
      },
      {
        h2: "Automate or It Won't Happen",
        html: `<p>Manual review requests fail because you're busy. The technician forgets. The office manager gets pulled away. Automation ensures 100% coverage.</p>
        <ul>
          <li>Integrate with your CRM/field service software (Jobber, Housecall, ServiceTitan, etc.)</li>
          <li>Trigger on "Job Complete" status</li>
          <li>Customize template per trade</li>
          <li>Track send/open/click/review rates weekly</li>
        </ul>`,
      },
      {
        h2: "Handling Negative Reviews (They're Gifts)",
        html: `<p>A 5.0 with 50 reviews looks fake. A 4.7 with 200 looks real. One thoughtful response to a 2-star review builds more trust than ten 5-stars.</p>
        <ul>
          <li>Respond within 24 hours. Public. Professional. No defensiveness.</li>
          <li>Acknowledge the specific issue. Apologize sincerely.</li>
          <li>Offer to make it right offline: "Call me directly at [cell]"</li>
          <li>Update response after resolution: "Thanks for giving us the chance to fix this."</li>
          <li>Flag fake/spam reviews — but don't obsess.</li>
        </ul>`,
      },
      {
        h2: "Review Marketing: Put Them to Work",
        html: `<p>Don't let reviews rot on Google. Deploy them:</p>
        <ul>
          <li>Homepage: 3-5 rotating recent reviews with photos</li>
          <li>Service pages: Reviews mentioning that service</li>
          <li>City pages: Reviews from that city</li>
          <li>Email signatures: "Rated 4.9 ★ on Google — [link]"</li>
          <li>Truck decals: "Google Us ★★★★★" + QR code</li>
          <li>Social proof ads: Screenshot real reviews in Meta/LSA creative</li>
          <li>Proposals/estimates: Include 2-3 relevant review excerpts</li>
        </ul>`,
      },
      {
        h2: "Video Reviews: The Next Level",
        html: `<p>Video testimonials convert 2-3x higher than text. Ask your happiest customers: "Would you record a 30-second video on your phone? We'll send a $50 gift card."</p>
        <ul>
          <li>Script: Name, problem, why they chose you, result, would they refer</li>
          <li>Shoot vertical (phone format), 30-60 seconds</li>
          <li>Post to GBP (supports video), website, social, YouTube</li>
          <li>Run as video ads to your service area (cheap, high trust)</li>
        </ul>`,
      },
      {
        h2: "The Kinexis Review System",
        html: `<p>Every Lead System and Plus plan includes automated review requests via SMS/email after every job, response templates, review display widgets for your site, and monthly reporting on volume, rating trend, and response rate. We handle the plumbing. You get the trust.</p>`,
      },
    ],
  },
};

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found", robots: { index: false, follow: false } };
  return contentMetadata({
    path: `/blog/${post.slug}`,
    title: "seoTitle" in post && post.seoTitle ? post.seoTitle : post.title,
    description: post.excerpt,
    image: post.image,
    imageAlt: post.title,
    ogType: "article",
    publishedTime: post.date,
    section: post.category,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = POST_CONTENT[slug];
  if (!content) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        date={post.date}
        section={post.category}
      />
      <PageHero h1={post.title} sub={`${formattedDate} · ${post.readTime} · ${post.category} · ${SITE.name}`} />
      <Section>
        <div className="container container--narrow prose">
          <article className="blog-post">
            <figure className="blog-post__hero">
              <picture>
                <source type="image/avif" srcSet={post.image.replace(".webp", ".avif")} />
                <img
                  src={post.image}
                  alt={post.title}
                  width={post.width}
                  height={post.height}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </figure>

            <div className="blog-post__content">
              <p className="blog-post__lead">
                {content.lead}
              </p>

              {content.sections.map((section, idx) => (
                <section key={idx} className="blog-section">
                  <h2>{section.h2}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.html }} />
                </section>
              ))}
            </div>
          </article>
        </div>
      </Section>
      <CtaBand
        h="Want This Applied to Your Site?"
        mark="Your Site"
        sub="Get a free homepage preview built for your trade. No card, no obligation."
        btn="Get My Free Preview"
        href="/contact"
      />
    </>
  );
}
