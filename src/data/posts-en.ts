import type { QA } from "@/lib/content";

export type EnglishPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: QA[];
};

export const EN_POST_CONTENT: Record<string, EnglishPostBody> = {
  "website-mistakes-that-cost-you-calls": {
    lead: "A service website needs to answer three questions on a phone: what you do, where you work, and how someone can reach you. If those answers are hard to find, the visitor goes back to the search results.",
    sections: [
      { h2: "The Headline Does Not Name The Work", html: `<p>People do not search for “quality since 1995.” They search for the leak, the air conditioner that stopped cooling, or the roof after a storm. The headline should name that work.</p><p>A line about family values does not replace a visible phone number. On a phone, someone decides quickly whether the page can help.</p>` },
      { h2: "The Service Area Is A Mystery", html: `<p>“Serving the metro area” does not tell someone whether you reach their neighborhood. A short list of the cities you actually cover helps the customer and gives Google useful context.</p><p>You do not need a copied page for every town. One honest service-area page can reduce requests for work your crew cannot take.</p>` },
      { h2: "The Phone Number Is Hidden", html: `<p>Put the number in the header, near the top of the page, and on service pages. On a phone, it should take one tap rather than copying and pasting a number.</p><p>If the only phone number is in the footer, someone with an urgent problem may never reach it. They are already comparing the next business in the list.</p>` },
      { h2: "Different Jobs Share One Page", html: `<p>A repair needed today and an estimate for next week are not the same search. Putting both on one general page makes each harder to understand.</p><p>Separate pages with a clear next step tell someone whether to call now or request a visit. That path should work the same way on a computer and a phone.</p>` },
    ],
  },
  "turn-clicks-into-calls": {
    lead: "Being found is only the first half. Once someone reaches the page, they need to know what to tap. For most service businesses, that means a phone number or a short quote form.",
    sections: [
      { h2: "Choose One Main Next Step", html: `<p>Call, request a quote, chat, download, and follow on social media should not all compete for attention. Choose the step that matters most: a call or a short form.</p><p>On a phone, the main button should be easy to reach. If someone has to zoom or search for it, the page is making the job harder.</p>` },
      { h2: "Keep The Form Short", html: `<p>Name, phone number, and the type of work are often enough to tell whether an inquiry is relevant. Asking for the full history of the property before the first conversation creates unnecessary friction.</p><p>Photos and extra details can follow by text. They do not need to slow down the first request.</p>` },
      { h2: "Follow Up On The Call You Miss", html: `<p>You may be on a job when the next customer calls. Optional missed-call text-back sends a message to someone who called your tracking number.</p><p>It does not replace answering the phone. It gives the caller a way to reply while your hands are busy.</p>` },
      { h2: "Measure Calls And Real Requests", html: `<p>Visits alone do not show whether the site is helping. Review impressions, clicks, calls, replies to text-back, and genuine form inquiries.</p><p>If a page gets visits but no calls, check the headline, phone number, and next step before paying for more traffic.</p>` },
    ],
  },
  "small-business-marketing-budget": {
    lead: "A service business does not need a long list of subscriptions. It needs a site that works on a phone, a visible number, and a way to tell which calls and forms came through the site.",
    sections: [
      { h2: "Start With The Basics", html: `<p>Begin with dependable hosting, pages for the work you actually sell, and a phone number people can tap. Ads cannot fix a page that makes contact difficult.</p><p>Each Kinexis plan starts with a free homepage preview and no card. Website is $97 a month, Lead System is $197, Plus is $297, and Own It is a one-time $1,497 payment.</p>` },
      { h2: "Follow-Up Before Another Design Change", html: `<p>Lead System includes a Google review request after the job and monthly reporting. Missed-call text-back is optional: $1/mo for a second tracking number if you use one, plus carrier text rates. Those tools cover the gap between a visit, a call, and the completed work.</p><p>Plus provides that follow-up in English and Spanish, along with a bilingual site. Own It is a one-time purchase without a monthly plan or the lead guarantee.</p>` },
      { h2: "SEO Is Ongoing Work", html: `<p>A clean, fast site with useful titles is the foundation. Monthly SEO work is quoted separately and is not hidden inside the four website plans.</p><p>No one controls Google’s results. Useful reporting should show impressions, clicks, and leads instead of promising a particular position.</p>` },
      { h2: "Know What Can Wait", html: `<p>Extra pages, site care after the first year on Own It, and text-back can be added when the business needs them. Current add-on prices are listed on the upgrades page.</p><p>Before spending more on ads, make sure the page they lead to clearly explains the work and makes the phone number easy to use.</p>` },
    ],
  },
  "make-your-website-mobile-ready": {
    lead: "If a site works on a computer but breaks on a phone, it is failing where many customers first see it. Service searches often happen in a driveway, a kitchen, or beside the problem itself.",
    sections: [
      { h2: "Keep The Number Within Reach", html: `<p>No one should have to zoom in to read the phone number. The call button should appear early, and its label should describe the action rather than say “click here.”</p><p>Form fields also need enough room for a thumb. Check that the phone keyboard does not cover the submit button.</p>` },
      { h2: "Speed Is Part Of The Design", html: `<p>A large photo that takes too long to load gets in the way of the rest of the page. The important content should appear quickly on an ordinary mobile connection.</p><p>Google also measures page experience. A slow page makes search and contact harder even when the writing is useful.</p>` },
      { h2: "Keep The Content, Change The Order", html: `<p>Order matters more on a small screen: the work, the service area, and the phone number come first. The company story can follow. A desktop has more room, but the next step should stay the same.</p><p>Do not publish a reduced mobile version with missing services. Use the same useful pages in a layout that reads well at both sizes.</p>` },
      { h2: "Test It Like A Customer", html: `<p>Open the site on your phone and use one hand. Can you call without searching? Can you finish the form? Can you see the project photos clearly?</p><p>If not, write down the points where you get stuck. That list is a practical place to start the next round of changes.</p>` },
    ],
  },
  "local-seo-get-found-get-called": {
    lead: "Google needs to understand what work you do and where you do it. Customers need an easy way to call once they find you. Both become harder when every page is the same template with a different city name.",
    sections: [
      { h2: "Use One Honest Service Area", html: `<p>A useful service-area page lists the cities your crew really covers. It gives customers an answer and gives search engines clear location information.</p><p>Dozens of nearly identical town pages add little value. Specific information about the area and the work is more useful than changing one place name at a time.</p>` },
      { h2: "Give Each Main Service A Page", html: `<p>People search for the job, not a broad phrase such as “home services.” A leak, water heater, no-cool call, roof repair, or lawn route can each have its own page and next step.</p><p>The title and description should name that work in language a customer would use.</p>` },
      { h2: "Keep Google And The Website Consistent", html: `<p>Your business name, phone number, hours, and service area should agree across the site and Google Business Profile. A profile that says 24 hours while the site closes at six creates the wrong expectation.</p><p>Lead System and Plus include a profile setup. Plus also includes two posts a month. Ongoing SEO work is separate and quoted on its own.</p>` },
      { h2: "Check Whether The Work Is Moving", html: `<p>Review impressions, clicks, calls, and forms rather than relying on a promised ranking. Search Console shows whether pages are appearing, and lead reporting shows whether those visits became inquiries.</p><p>Technical fixes can show changes within weeks. Broader growth often takes months and depends on the starting point and competition.</p>` },
    ],
  },
  "build-trust-with-reviews": {
    lead: "The next customer may read your reviews before calling. Asking at the door works sometimes. A text with a direct link, sent at the right point in the job, keeps the request from depending on memory.",
    sections: [
      { h2: "Ask At The Right Time", html: `<p>Send the request after the work is complete, while the customer still remembers the visit. Include the Google profile link so they do not have to search for the business.</p><p>For recurring routes, choose the right visit rather than sending a request every week to the same customer.</p>` },
      { h2: "Use A Direct Link", html: `<p>“Find us on Google and leave a review” asks the customer to do extra work. A link that opens the profile on their phone takes fewer steps.</p><p>Lead System sends that request after each job. Plus can send it in English and Spanish.</p>` },
      { h2: "Do Not Buy Or Invent Reviews", html: `<p>A review should come from a real customer. Made-up comments or photos of someone else’s work can damage trust in the profile.</p><p>If the business has only a few reviews, the website can still make calling easy. The review count can grow with completed jobs.</p>` },
      { h2: "Reply From Your Business Account", html: `<p>A short reply to a new review shows that a person is paying attention. Respond from the business’s own Google account.</p><p>Writing those replies is not included with every plan. Automated review requests are included with Lead System and Plus. Own It does not include review requests or the lead guarantee. On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>` },
    ],
  },
  "monthly-website-vs-own-it": {
    lead: "Monthly website plans and Own It are both valid choices for trade businesses. The right fit depends on cash flow, whether you want missed-call tools, and how you want the site files handled.",
    faqs: [
          {
                "q": "Who owns your website if you cancel?",
                "a": "On a monthly plan, Kinexis hosts and manages the site while the plan is active. After the paid period ends, hosting stops unless you arrange a buyout (written one-time purchase of site files — $1,497) or move to Own It before the period ends. With Own It, site files are yours from launch day."
          },
          {
                "q": "Can I cancel anytime?",
                "a": "Yes. Cancel by text, email, or Messenger with no cancellation fee. The site stays live through the billing period you already paid for."
          }
    ],
    sections: [
          {
                "h2": "Both Options Are Valid",
                "html": "<p>Some owners want $0 down and month-to-month. Others prefer one payment and the site files from day one. Neither path is a scare tactic — pick the cash-flow model that fits the shop.</p>"
          },
          {
                "h2": "Side-by-Side: Monthly Plans vs Own It",
                "html": "<table><thead><tr><th></th><th>Website / Lead System / Plus</th><th>Own It</th></tr></thead><tbody><tr><td>Price</td><td>$97 / $197 / $297 per month</td><td>$1,497 one-time</td></tr><tr><td>Down payment</td><td>$0 down</td><td>Paid when you approve the preview</td></tr><tr><td>Missed-call text-back &amp; review requests</td><td>Lead System and Plus: optional text-back ($1/mo second number if used + carrier rates); review requests included</td><td>Review requests not included; text-back available as a Website/Own It add-on</td></tr><tr><td>Site files</td><td>Hosted/managed while the plan is active; $1,497 buyout available in writing</td><td>Yours from launch day</td></tr><tr><td>Lead guarantee</td><td>60-day on Lead System and Plus</td><td>Not included</td></tr></tbody></table><p>Details: <a href=\"/pricing\">pricing</a>.</p>"
          },
          {
                "h2": "Who Owns Your Website If You Cancel",
                "html": "<p>Cancel anytime. The site stays live through the paid period. When that period ends, hosting and management stop and the site comes offline. To keep it, arrange a buyout — a written one-time purchase of the site files (<code>$1,497</code>) — or move to Own It before the paid period ends.</p><p>Never assume a blanket ownership claim. Ask for buyout terms in writing before you cancel if you want to keep the files.</p>"
          },
          {
                "h2": "Own It From Launch Day",
                "html": "<p>With Own It, the site files belong to you from launch day. You get 12 months of hosting and small edits included, then optional Site Care at $39/mo if you want ongoing hosting and edit time.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose.</p>"
          }
    ],
  },
  "missed-call-text-back-templates": {
    lead: "Missed-call text-back is optional and needs a dedicated business phone line. On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates. Carrier approval usually takes 10–15 days and is not guaranteed.",
    faqs: [
          {
                "q": "How long before missed-call texts start?",
                "a": "Activation is subject to carrier approval. Texting typically begins 10–15 days after approval; approval is not guaranteed."
          },
          {
                "q": "Is text-back included in every plan?",
                "a": "No. It is optional and needs a dedicated business phone line. On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates."
          }
    ],
    sections: [
          {
                "h2": "How Text-Back Works Here",
                "html": "<p>Lead System and Plus can text a missed caller on your tracking number after carrier approval. A dedicated business line is required. A second tracking number is $1/mo. Standard carrier messaging rates may apply. This page is templates — not a software comparison for the head term “missed call text back.”</p><p>Estimate at-risk revenue with the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Plumbing Templates",
                "html": "<p id=\"plumbing\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi, this is {Business}. We just missed your call about a plumbing issue. Reply LEAK, DRAIN, or HEATER and the best number/time to reach you.</code></li><li><code>Thanks for calling {Business}. We’re on a job and will call back shortly. If this is no water or a burst, reply URGENT.</code></li><li><code>Got your missed call. For a water heater quote, reply with brand/age if you know it. We’ll text back a visit window.</code></li><li><code>After-hours note from {Business}: leave the issue in a text and we’ll confirm first thing during staffed hours.</code></li><li><code>If you called about a clog, reply DRAIN and your city. We’ll confirm whether we can get there today.</code></li></ul>"
          },
          {
                "h2": "HVAC Templates",
                "html": "<p id=\"hvac\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business} — missed your call. Reply NO COOL, NO HEAT, or QUOTE and your zip.</code></li><li><code>We’re on a service call. Reply URGENT for no-cool/no-heat and we’ll prioritize a callback.</code></li><li><code>For a system replacement quote, reply with home size/age if you have it. We’ll schedule a consult.</code></li><li><code>After hours: text the symptom and we’ll confirm the first open tech window.</code></li><li><code>Maintenance season: reply TUNEUP to ask about shoulder-season service.</code></li></ul>"
          },
          {
                "h2": "Electrical Templates",
                "html": "<p id=\"electrical\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi, {Business} missed your call. Reply PANEL, EV, or OUTLET and your city.</code></li><li><code>If something smells like burning or breakers won’t reset, reply URGENT — don’t wait on email.</code></li><li><code>EV charger installs: reply with panel amps if known and we’ll book a site check.</code></li><li><code>After hours: text the issue; we’ll confirm during staffed hours.</code></li><li><code>Licensed electrical work only — reply with the job type and we’ll confirm fit.</code></li></ul>"
          },
          {
                "h2": "Roofing Templates",
                "html": "<p id=\"roofing\">Use these as drafts. Have a qualified review for TCPA/compliance before publish.</p><ul><li><code>Hi from {Business}. Missed your call — reply LEAK, REPLACE, or STORM.</code></li><li><code>Active leak? Reply URGENT and your address area. We’ll aim for a same-day inspection window when crews allow.</code></li><li><code>Replacement quotes: reply with roof age/material if you know it.</code></li><li><code>Storm follow-up: we document the roof; we don’t promise insurance outcomes.</code></li><li><code>After hours: text photos of the damage if safe, and we’ll confirm next steps.</code></li></ul>"
          },
          {
                "h2": "Garage Doors Templates",
                "html": "<p id=\"garage-doors\">Templates for garage doors are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/garage-doors\">garage doors hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Painting Templates",
                "html": "<p id=\"painting\">Templates for painting are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/painting\">painting hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Remodeling Templates",
                "html": "<p id=\"remodeling\">Templates for remodeling are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/remodeling\">remodeling hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Landscaping Templates",
                "html": "<p id=\"landscaping\">Templates for landscaping are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/landscaping\">landscaping hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Pool Care Templates",
                "html": "<p id=\"pool-care\">Templates for pool care are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/pool-care\">pool care hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Pressure Washing Templates",
                "html": "<p id=\"pressure-washing\">Templates for pressure washing are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/pressure-washing\">pressure washing hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Window Cleaning Templates",
                "html": "<p id=\"window-cleaning\">Templates for window cleaning are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/window-cleaning\">window cleaning hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Yard Care Templates",
                "html": "<p id=\"yard-care\">Templates for yard care are in progress. Request a preview and we will tune SMS copy to the jobs you run. Meanwhile see the <a href=\"/industries/yard-care\">yard care hub</a> and the <a href=\"/tools/missed-call-calculator\">missed-call calculator</a>.</p>"
          },
          {
                "h2": "Compliance Note",
                "html": "<p>SMS templates need a qualified compliance review before you send them to customers. Consent, identification, and opt-out rules still apply.</p><p><a href=\"/pricing\">See Lead System and Plus</a> or <a href=\"/contact\">get a free preview</a>.</p>"
          }
    ],
  },
  "plumber-website-cost": {
      "lead": "With Kinexis, a plumber website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a plumber website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Plumbing Site",
              "html": "<p>You’re paying for pages built around leaks, drains, and water heaters — not a generic template with the trade name swapped. See <a href=\"/industries/plumbing\">website design for plumbers</a> and <a href=\"/blog/plumbing-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "plumbing-website-pages": {
      "lead": "A plumber website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Separate leak repair, drain cleaning, and water heater pages so emergency and quote traffic are not mixed.",
      "faqs": [
          {
              "q": "What pages should a plumber website have?",
              "a": "Home, services for leaks, drains, and water heaters, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Plumbing-Specific Service Pages",
              "html": "<p>Build around leaks, drains, and water heaters. Separate leak repair, drain cleaning, and water heater pages so emergency and quote traffic are not mixed.</p><p>Details and examples live on the <a href=\"/industries/plumbing\">plumbing industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>Preferred Plumbing Solutions is a live plumbing client site. On the homepage: local Spirit Lake hero with phone + free-estimate CTA, a trust strip (licensed, owner-operated, free estimates), separate paths for repairs / radiant / tankless / drains / new construction, and FAQs that state real staffed hours. See the <a href=\"/industries/plumbing\">plumbing hub</a> proof block for the annotated screenshot.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "hvac-website-cost": {
      "lead": "With Kinexis, a HVAC website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a HVAC website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a HVAC Site",
              "html": "<p>You’re paying for pages built around no-cool repair, replacement, and maintenance — not a generic template with the trade name swapped. See <a href=\"/industries/hvac\">website design for HVACs</a> and <a href=\"/blog/hvac-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "hvac-website-pages": {
      "lead": "A HVAC website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Keep repair, system replacement, and maintenance on separate paths so shoulder-season work stays visible.",
      "faqs": [
          {
              "q": "What pages should a HVAC website have?",
              "a": "Home, services for no-cool repair, replacement, and maintenance, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "HVAC-Specific Service Pages",
              "html": "<p>Build around no-cool repair, replacement, and maintenance. Keep repair, system replacement, and maintenance on separate paths so shoulder-season work stays visible.</p><p>Details and examples live on the <a href=\"/industries/hvac\">hvac industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "electrician-website-cost": {
      "lead": "With Kinexis, a electrician website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a electrician website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Electrical Site",
              "html": "<p>You’re paying for pages built around panels, EV chargers, and troubleshooting — not a generic template with the trade name swapped. See <a href=\"/industries/electrical\">website design for electricians</a> and <a href=\"/blog/electrician-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "electrician-website-pages": {
      "lead": "A electrician website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Show licensing trust early, and give EV chargers their own page when that work is real.",
      "faqs": [
          {
              "q": "What pages should a electrician website have?",
              "a": "Home, services for panels, EV chargers, and troubleshooting, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Electrical-Specific Service Pages",
              "html": "<p>Build around panels, EV chargers, and troubleshooting. Show licensing trust early, and give EV chargers their own page when that work is real.</p><p>Details and examples live on the <a href=\"/industries/electrical\">electrical industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "roofing-website-cost": {
      "lead": "With Kinexis, a roofing website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a roofing website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Roofing Site",
              "html": "<p>You’re paying for pages built around repairs, replacements, and storm calls — not a generic template with the trade name swapped. See <a href=\"/industries/roofing\">website design for roofings</a> and <a href=\"/blog/roofing-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "roofing-website-pages": {
      "lead": "A roofing website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Split repair and replacement, and describe insurance process without promising claim outcomes.",
      "faqs": [
          {
              "q": "What pages should a roofing website have?",
              "a": "Home, services for repairs, replacements, and storm calls, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Roofing-Specific Service Pages",
              "html": "<p>Build around repairs, replacements, and storm calls. Split repair and replacement, and describe insurance process without promising claim outcomes.</p><p>Details and examples live on the <a href=\"/industries/roofing\">roofing industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "garage-door-website-cost": {
      "lead": "With Kinexis, a garage door company website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a garage door company website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Garage Doors Site",
              "html": "<p>You’re paying for pages built around broken springs, openers, and new doors — not a generic template with the trade name swapped. See <a href=\"/industries/garage-doors\">website design for garage door companys</a> and <a href=\"/blog/garage-door-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "garage-door-website-pages": {
      "lead": "A garage door company website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Emergency spring/opener paths should lead with the phone; new-door pages can use a short measure form.",
      "faqs": [
          {
              "q": "What pages should a garage door company website have?",
              "a": "Home, services for broken springs, openers, and new doors, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Garage Doors-Specific Service Pages",
              "html": "<p>Build around broken springs, openers, and new doors. Emergency spring/opener paths should lead with the phone; new-door pages can use a short measure form.</p><p>Details and examples live on the <a href=\"/industries/garage-doors\">garage doors industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "painting-website-cost": {
      "lead": "With Kinexis, a painting contractor website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a painting contractor website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Painting Site",
              "html": "<p>You’re paying for pages built around interior, exterior, and cabinet finishes — not a generic template with the trade name swapped. See <a href=\"/industries/painting\">website design for painting contractors</a> and <a href=\"/blog/painting-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "painting-website-pages": {
      "lead": "A painting contractor website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Separate interior, exterior, and cabinet work, and keep the estimate form short.",
      "faqs": [
          {
              "q": "What pages should a painting contractor website have?",
              "a": "Home, services for interior, exterior, and cabinet finishes, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Painting-Specific Service Pages",
              "html": "<p>Build around interior, exterior, and cabinet finishes. Separate interior, exterior, and cabinet work, and keep the estimate form short.</p><p>Details and examples live on the <a href=\"/industries/painting\">painting industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "remodeling-website-cost": {
      "lead": "With Kinexis, a remodeling contractor website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a remodeling contractor website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Remodeling Site",
              "html": "<p>You’re paying for pages built around kitchens, baths, and longer consults — not a generic template with the trade name swapped. See <a href=\"/industries/remodeling\">website design for remodeling contractors</a> and <a href=\"/blog/remodeling-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "remodeling-website-pages": {
      "lead": "A remodeling contractor website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Lead with finished rooms and a consult path instead of emergency-call language.",
      "faqs": [
          {
              "q": "What pages should a remodeling contractor website have?",
              "a": "Home, services for kitchens, baths, and longer consults, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Remodeling-Specific Service Pages",
              "html": "<p>Build around kitchens, baths, and longer consults. Lead with finished rooms and a consult path instead of emergency-call language.</p><p>Details and examples live on the <a href=\"/industries/remodeling\">remodeling industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "landscaping-website-cost": {
      "lead": "With Kinexis, a landscaping website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a landscaping website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Landscaping Site",
              "html": "<p>You’re paying for pages built around maintenance routes and design-build — not a generic template with the trade name swapped. See <a href=\"/industries/landscaping\">website design for landscapings</a> and <a href=\"/blog/landscaping-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "landscaping-website-pages": {
      "lead": "A landscaping website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Split weekly maintenance from design-build so mowing leads are not forced into a patio consult.",
      "faqs": [
          {
              "q": "What pages should a landscaping website have?",
              "a": "Home, services for maintenance routes and design-build, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Landscaping-Specific Service Pages",
              "html": "<p>Build around maintenance routes and design-build. Split weekly maintenance from design-build so mowing leads are not forced into a patio consult.</p><p>Details and examples live on the <a href=\"/industries/landscaping\">landscaping industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>A1 Property Services is a live landscaping client site. On the homepage: Cedar Falls place-first hero and free-quote CTA, lawn care separated from hardscape projects, before/after sliders of real jobs, and a named Black Hawk County service area. See the <a href=\"/industries/landscaping\">landscaping hub</a> proof block for the annotated screenshot.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "pool-service-website-cost": {
      "lead": "With Kinexis, a pool service website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a pool service website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Pool Care Site",
              "html": "<p>You’re paying for pages built around weekly routes, repairs, and equipment — not a generic template with the trade name swapped. See <a href=\"/industries/pool-care\">website design for pool services</a> and <a href=\"/blog/pool-service-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "pool-service-website-pages": {
      "lead": "A pool service website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Give green-pool and equipment repairs a phone path that is not buried under membership copy.",
      "faqs": [
          {
              "q": "What pages should a pool service website have?",
              "a": "Home, services for weekly routes, repairs, and equipment, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Pool Care-Specific Service Pages",
              "html": "<p>Build around weekly routes, repairs, and equipment. Give green-pool and equipment repairs a phone path that is not buried under membership copy.</p><p>Details and examples live on the <a href=\"/industries/pool-care\">pool care industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "pressure-washing-website-cost": {
      "lead": "With Kinexis, a pressure washing website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a pressure washing website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Pressure Washing Site",
              "html": "<p>You’re paying for pages built around houses, concrete, and roof soft washes — not a generic template with the trade name swapped. See <a href=\"/industries/pressure-washing\">website design for pressure washings</a> and <a href=\"/blog/pressure-washing-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "pressure-washing-website-pages": {
      "lead": "A pressure washing website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Separate surfaces and leave room for before-and-after photos that prove the result.",
      "faqs": [
          {
              "q": "What pages should a pressure washing website have?",
              "a": "Home, services for houses, concrete, and roof soft washes, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Pressure Washing-Specific Service Pages",
              "html": "<p>Build around houses, concrete, and roof soft washes. Separate surfaces and leave room for before-and-after photos that prove the result.</p><p>Details and examples live on the <a href=\"/industries/pressure-washing\">pressure washing industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "window-cleaning-website-cost": {
      "lead": "With Kinexis, a window cleaning website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a window cleaning website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Window Cleaning Site",
              "html": "<p>You’re paying for pages built around home routes and storefront schedules — not a generic template with the trade name swapped. See <a href=\"/industries/window-cleaning\">website design for window cleanings</a> and <a href=\"/blog/window-cleaning-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "window-cleaning-website-pages": {
      "lead": "A window cleaning website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Split residential and commercial glass, and offer recurring cleans as the normal next step.",
      "faqs": [
          {
              "q": "What pages should a window cleaning website have?",
              "a": "Home, services for home routes and storefront schedules, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Window Cleaning-Specific Service Pages",
              "html": "<p>Build around home routes and storefront schedules. Split residential and commercial glass, and offer recurring cleans as the normal next step.</p><p>Details and examples live on the <a href=\"/industries/window-cleaning\">window cleaning industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
  "lawn-care-website-cost": {
      "lead": "With Kinexis, a lawn care website starts at Website $97/mo, Lead System $197/mo, Plus $297/mo, or Own It for a one-time $1,497. Every option begins with a free homepage preview — no card and no obligation.",
      "faqs": [
          {
              "q": "How much is a lawn care website with Kinexis?",
              "a": "Website is $97/mo, Lead System is $197/mo, Plus is $297/mo, and Own It is $1,497 one-time. See /pricing for inclusions."
          },
          {
              "q": "Is SEO included in those prices?",
              "a": "Each site ships with clear structure and service pages. Ongoing SEO is quoted separately and is not bundled into the four plans."
          },
          {
              "q": "What if I cancel a monthly plan?",
              "a": "Cancel anytime with no cancellation fee. The site stays live through the paid period, then hosting ends unless you arrange a buyout ($1,497) or move to Own It before the period ends."
          }
      ],
      "sections": [
          {
              "h2": "Kinexis Prices for Trade Websites",
              "html": "<p>Here are the four live options:</p><table><thead><tr><th>Plan</th><th>Price</th><th>Best for</th></tr></thead><tbody><tr><td>Website</td><td>$97/mo</td><td>A professional site with hosting, SSL, and up to two small edits a month</td></tr><tr><td>Lead System</td><td>$197/mo</td><td>Optional text-back ($1/mo second number if used + carrier rates), Google review requests, call tracking, and unlimited small edits</td></tr><tr><td>Plus</td><td>$297/mo</td><td>English + Spanish site and follow-up tools</td></tr><tr><td>Own It</td><td>$1,497 one-time</td><td>Site files yours from launch day, with 12 months of hosting and small edits included</td></tr></tbody></table><p>Full inclusions live on <a href=\"/pricing\">/pricing</a>. Compare monthly vs Own It in <a href=\"/blog/monthly-website-vs-own-it\">Monthly Website vs Own It</a>.</p>"
          },
          {
              "h2": "DIY, Freelancer, or Agency — Qualitative Only",
              "html": "<p>DIY builders can look cheap until you add hosting, copy, photos, and the hours you spend learning the tool. Freelancers vary widely by experience and availability. Agencies often quote project fees that include strategy, design, and revisions — ranges differ by market and scope, so treat any public “average cost” posts as dated market commentary, not a Kinexis quote.</p><p>We publish our own plan prices so you can compare without guessing.</p>"
          },
          {
              "h2": "Hidden Costs to Plan For",
              "html": "<p>Ongoing SEO is separate. Photos and custom copy may be quoted if you need them. Missed-call text-back needs a dedicated business line and carrier approval (usually 10–15 days; not guaranteed). On Lead System or Plus, a second tracking number is $1/mo if you use one, plus carrier text rates.</p>"
          },
          {
              "h2": "What You’re Paying For on a Yard Care Site",
              "html": "<p>You’re paying for pages built around weekly lawn routes and pet-waste stops — not a generic template with the trade name swapped. See <a href=\"/industries/yard-care\">website design for lawn cares</a> and <a href=\"/blog/lawn-care-website-pages\">the pages checklist</a>.</p><p><a href=\"/contact\">Get a free homepage preview</a> before you choose a plan.</p>"
          }
      ]
  },
  "lawn-care-website-pages": {
      "lead": "A lawn care website needs a clear home page, honest service area, about, reviews, and contact — plus service pages for the jobs people actually search. Publish an honest service area and give pet-waste its own page only when that offer is real.",
      "faqs": [
          {
              "q": "What pages should a lawn care website have?",
              "a": "Home, services for weekly lawn routes and pet-waste stops, service area, about, reviews, and contact. Avoid thin city doorway pages."
          },
          {
              "q": "Do I need a page for every city?",
              "a": "No. One honest service-area page beats dozens of near-identical city pages that swap the town name."
          }
      ],
      "sections": [
          {
              "h2": "Core Pages Every Trade Site Needs",
              "html": "<ul><li><strong>Home</strong> — name the work, show the phone, and make the next step obvious.</li><li><strong>Services</strong> — separate pages for the jobs you sell, not one junk drawer.</li><li><strong>Service area</strong> — cities and neighborhoods you can actually crew.</li><li><strong>About</strong> — license, insurance, and who shows up.</li><li><strong>Reviews</strong> — proof from real jobs.</li><li><strong>Contact</strong> — form + click-to-call on every device.</li></ul>"
          },
          {
              "h2": "Yard Care-Specific Service Pages",
              "html": "<p>Build around weekly lawn routes and pet-waste stops. Publish an honest service area and give pet-waste its own page only when that offer is real.</p><p>Details and examples live on the <a href=\"/industries/yard-care\">yard care industry hub</a>.</p>"
          },
          {
              "h2": "Annotated Homepage When Proof Exists",
              "html": "<p>When a live client site exists for this trade, we annotate the homepage on the industry hub. Until then, use the service list above and a free preview built for your offer.</p>"
          },
          {
              "h2": "Skip Doorway City Spam",
              "html": "<p>Do not publish near-identical pages that only change the city name. That pattern wastes crawl budget and does not help callers. One clear service-area page is the honest approach.</p><p><a href=\"/contact\">Request a free homepage preview</a> or compare plans on <a href=\"/pricing\">/pricing</a>.</p>"
          }
      ]
  },
};
