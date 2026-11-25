import type { QA } from "@/lib/content";

type LegacySlugPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: QA[];
};

export const LEGACY_SLUG_POST_BODIES: Record<string, LegacySlugPostBody> = {
  "pagina-web-para-plomeros": {
    lead: "Half the people who land on a plumbing page have water where it should not be. The other half are planning a water heater or a drain job and will actually read. A plumber website that works serves both without making either one hunt for the phone—and without promising a crew you do not have at 2 a.m.",
    faqs: [
      {
        q: "Should I advertise 24/7 on my plumber site?",
        a: "Only if someone answers. Honest staffed hours beat angry overnight calls and one-star reviews that say you never picked up.",
      },
      {
        q: "Do Kinexis website plans include ongoing SEO?",
        a: "No. Sites launch with a clean structure Google can read. Ongoing SEO is quoted separately if you want that layer later.",
      },
      {
        q: "Where should I look for plumbing website design?",
        a: "The plumbing industry hub owns the design-and-proof story. This article is supporting context—structure, calls, and plans—not a second homepage for that search.",
      },
      {
        q: "How fast can a new plumber site go live?",
        a: "You get a free homepage preview in 2 business days with no card. After you approve the preview and send the content we need, the site typically goes live in about 5 business days, confirmed in writing.",
      },
      {
        q: "Which plan sends Google review requests after jobs?",
        a: "Lead System ($197/mo) and Plus ($297/mo) include review requests after jobs. Website ($97/mo) and base Own It ($1,497) do not include automated requests unless you run the workflow yourself.",
      },
    ],
    sections: [
      {
        h2: "The search happens next to the problem",
        html: `<p>It is not a desk search. Someone is standing in a kitchen with a towel under the cabinet, or they are in the garage staring at a water heater that woke them up with a rumble. They type with one thumb. “Plumber near me,” “drain cleaning,” “tankless install”—the query matches the mood. Panic wants a number. Planning wants proof.</p><p>Your site has about three seconds on a phone before they tap back to the map. If the first screen is a slideshow about “family values” and the phone lives in a footer image, you lose the call you already earned from the listing. If the headline names plumbing generically but not the job they searched, they keep scrolling the pack.</p><p>This article is supporting material for plumbing websites: how the page should behave when a stranger lands on it, what to separate, and how Kinexis plans map to that job. For the full design story, proof, and trade-specific positioning, use the <a href="/industries/plumbing">plumbing industry hub</a>. For URL-by-URL structure, see <a href="/blog/plumbing-website-pages">what pages a plumbing website needs</a>. We are not trying to own the same “plumber website design” query twice.</p>`,
      },
      {
        h2: "First screen: name the work, the area, and the phone",
        html: `<p>On mobile, the headline should sound like the truck door, not like a mission statement. “Emergency leak repair,” “Drain cleaning,” “Water heater replacement”—plain nouns the customer already has in mind. Under that, one line on the cities or neighborhoods you actually reach this week, not a map dot that covers half the state because it looked impressive in a sales deck.</p><p>The phone number belongs in the header as tap-to-call text, not buried below a hero video that takes five seconds to load. Hours belong where a stranger can see them without opening the menu. If you close at 5, say 5. If you run real after-hours emergency with someone on call, say that in the same place the map reads “Open now,” not only in a paragraph nobody scrolls to.</p><p>License and insurance notes—when they apply in your state—sit near the number, not on an About page the panicked caller will never open. You are not writing a brochure. You are answering “Can you fix this, here, today?” before they dial the next card in the pack.</p>`,
      },
      {
        h2: "Two buyers, two paths",
        html: `<p>A burst supply line and a water-heater quote are not the same person, even if both need a plumber. Mixing them on one generic Services page forces the emergency through contact forms and the planner through a panic button. Neither is happy.</p><p>Give each job its own path when the phone rings that way in real life:</p><ul><li><strong>Leaks and urgent flow issues</strong> — phone first, honest response language, what to do while someone is on the way (shutoff, breaker, when to call the utility).</li><li><strong>Drains and sewer backups</strong> — separate from heaters; camera work and cleanouts are not “general plumbing” to the person with a gurgling tub.</li><li><strong>Water heaters</strong> — repair vs replace, brands you actually install, a clear estimate path with photos later—not a novel before they can call.</li></ul><p>That split is layout and copy, not SEO theater. Google’s <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">SEO Starter Guide</a> is blunt about helpful pages: clear titles and information a person can use. For plumbing, “useful” usually means the job, the area, and a human on the other end of the number. The detailed page list lives in <a href="/blog/plumbing-website-pages">the plumbing pages guide</a>—read that when you are deciding URLs, not when you are only wondering whether the homepage phone is visible.</p>`,
      },
      {
        h2: "Trust before they dial",
        html: `<p>Stars on the map card matter. So do photos that look like your trucks, not a stock warehouse of pristine wrenches. Put a few real job photos on the pages that sell the work—tank installs, cleared drains, replaced valves—without pretending every bathroom is a magazine shoot.</p><p>Reviews belong where the cautious planner can see them: near the phone or the form, linking out to the Google profile customers already trust. Do not paste five-star paragraphs you wrote yourself. Do not hide the profile because one review stung. Future callers read the mix; they are judging whether you sound human when something goes sideways.</p><p>Forms should respect the thumb. For an active leak, name, phone, and a short problem field is enough. For a heater replacement, you can ask for brand or age on a second screen or follow-up text—not a twelve-field interrogation while they are still standing in the puddle. How reviews and proof sit on the page is covered in <a href="/blog/build-trust-with-reviews">building trust with reviews</a>; this post stays on plumbing-site behavior, not the full reputation playbook.</p>`,
      },
      {
        h2: "Mobile speed is not a bonus feature",
        html: `<p>Most plumbing searches are mobile, often on cellular, often while something is still dripping. If the headline and number wait behind a full-screen loader or a cookie banner that covers the call button, the job goes to the next name. Google indexes the mobile version first; their note on <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first indexing</a> is worth a quick read if you have been judging the site only on office Wi‑Fi.</p><p>Test the money pages the way a customer does. Can you tap the number without pinching? Does the page jump when fonts load? Run a sluggish URL through <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> when something feels off—you are looking for what delays the first screen, not a trophy score.</p><p>Put the business name, address, and phone in visible text. Structured data can help search engines read local details; Google documents <a href="https://developers.google.com/search/docs/appearance/structured-data/local-business" rel="noopener noreferrer" target="_blank">local business structured data</a> if you want the field list. It does not replace a readable number in the header. If the only phone is inside an image, the person in the kitchen cannot use it.</p>`,
      },
      {
        h2: "Service area: honest beats huge",
        html: `<p>One service-area page that names the towns and neighborhoods your crew will actually drive this month beats twenty thin pages that swap only the city name. Doorway-style clones confuse customers and read like mail merge. Google’s spam policies describe <a href="https://developers.google.com/search/docs/essentials/spam-policies" rel="noopener noreferrer" target="_blank">doorway pages</a> as thin pages built mainly to catch similar searches—you do not need a law degree to feel why a homeowner resents landing on the same paragraph with a different suburb pasted in.</p><p>Be specific about what you will and will not run for. Same-day drain calls inside a tight radius are a different promise from a repipe you schedule two weeks out. If both are true, say both on the area page. If only one is true, do not let a template imply round-the-clock everything. Mis-set geography books windshield time you have to decline—and declines become bad reviews even when you were never the right company for that address.</p><p>Align the area page with your Google Business Profile service area and the hours on the card. A mismatch between profile, site, and voicemail is how you get “you lied on Google” one-stars from people who drove farther than you intended to serve.</p>`,
      },
      {
        h2: "Optional missed-call text-back",
        html: `<p>On a job, the phone rings in the truck. You cannot answer. A short text that names the business and asks what they need can keep that caller from dialing the next company—if you actually monitor the line and if carrier rules are met.</p><p>Missed-call text-back is optional on Kinexis plans. It is not included for free, and it is not on every plan by default. It needs a dedicated business phone line. On Lead System and Plus, a second tracking number is $1/mo if you use one, plus carrier text rates. Carrier approval usually takes 10–15 business days and is not guaranteed. Website and Own It can add text-back as a $97/mo add-on under the same carrier rules. Do not tell customers texting is live until it is.</p><p>Templates and compliance notes live in <a href="/blog/missed-call-text-back-templates">missed-call text-back templates</a>. This plumbing article only flags the option so you do not promise instant SMS on a $97/mo site that has not turned it on yet.</p>`,
      },
      {
        h2: "What the four website plans include",
        html: `<p>Pricing detail belongs on <a href="/pricing">pricing</a> and on <a href="/blog/plumber-website-cost">how much a plumber website costs</a>. The short version for scope conversations:</p><ul><li><strong>Website — $97/mo</strong> — custom design within standard website scope, hosting, launch support, up to 5 pages on the published tiers.</li><li><strong>Lead System — $197/mo</strong> — everything in Website, more pages, Google review requests after jobs, optional missed-call text-back with a dedicated line.</li><li><strong>Plus — $297/mo</strong> — Lead System features with an English and Spanish site and Spanish review requests when that workflow fits your operation.</li><li><strong>Own It — $1,497</strong> — one-time purchase path for the site files with hosting terms spelled in writing; automated review requests are not in the base Own It package unless you add the same workflows you would run yourself.</li></ul><p>Monthly plans are month-to-month. Cancel anytime; the site stays live through the paid period, then hosting ends unless you buy out or move to Own It before that period ends. Guarantees in writing include a 60-day lead guarantee on Lead System and Plus (with specific charge waivers) and a 30-day money-back guarantee on every plan—read the plan terms on pricing rather than trusting a blog paraphrase.</p><p>Custom website design is included in the plan for standard website scope—not a separate “custom design” line item. Extra pages on Website are $99 each when you need more URLs than the tier includes. None of the four plans include ongoing SEO as a bundled ranking promise; sites ship with clean structure Google can read. If you want ongoing SEO work, that is quoted separately.</p>`,
      },
      {
        h2: "Free preview, then launch",
        html: `<p>You should see the homepage before you fund a full build blind. Kinexis starts with a free homepage preview—delivered in 2 business days, no card required. The form collects name, email or phone, business name, business type, city, and optional current website so the preview matches your trade and area.</p><p>After you approve the preview and send the content we need—photos, services, hours, logo—the site typically goes live in about 5 business days, confirmed in writing. That timeline assumes you respond when we ask for missing pieces. A plumber who sends phone photos from three recent jobs and honest hours moves faster than one who waits two weeks because the logo debate is still open.</p><p>Primary CTA on the main site is <a href="/contact">Get My Free Preview</a>. Secondary is compare plans on <a href="/pricing">pricing</a>. If you already have a site and want a second opinion on why the phone quieted down, the free audit path on the main site may fit—but this post is for owners who need a callable plumbing site, not a full site teardown essay.</p>`,
      },
      {
        h2: "What this post is not",
        html: `<p>We are not repeating the <a href="/industries/plumbing">plumbing hub</a> portfolio story or re-arguing “why hire Kinexis for plumbers.” That page owns the design intent search. We are not duplicating <a href="/blog/plumbing-website-pages">every URL a plumbing site needs</a>—that guide owns the sitemap conversation. We are not replacing <a href="/blog/plumber-website-cost">plumber website cost</a> line by line.</p><p>Use this article when you are explaining to a partner or office manager why the leak page and the heater page should not share one form, why 24/7 should not be a slogan without a human, and which plan includes review requests. When you are ready to see the homepage mockup for your trucks and towns, <a href="/contact">request the free preview</a> or walk through <a href="/pricing">plans and pricing</a>.</p>`,
      },
    ],
  },

  "como-pedir-resenas-en-google": {
    lead: "The next caller almost always opens your Google reviews before they dial. Asking at the door sometimes works. Sending a direct link when the finished work is visible works more often—and it does not need a speech that makes your tech uncomfortable. This is the how-to for real customers, real links, and real timing—not bought stars or review gates.",
    faqs: [
      {
        q: "Can I pay customers for Google reviews?",
        a: "No. Do not offer payment, discounts, or free work in exchange for reviews. Google's policies and the FTC's Endorsement Guides treat fake or compensated endorsements seriously. Ask real customers with a direct link after honest work.",
      },
      {
        q: "Can I only ask happy customers or hide bad reviews?",
        a: "No. Do not cherry-pick only five-star jobs, discourage negative reviews, or gate the link behind a survey that forwards happy people to Google and sad people to a private form. That pattern misleads future customers.",
      },
      {
        q: "Which Kinexis plans send automated review requests?",
        a: "Lead System ($197/mo) and Plus ($297/mo) include review requests after jobs. Website ($97/mo) and base Own It ($1,497) do not include automated requests unless you run the workflow yourself.",
      },
      {
        q: "Where do I get the direct Google review link?",
        a: "From your Google Business Profile using Get more reviews, or build a link and QR with the review link and QR tool on this site. Test on a phone that is not signed in as the owner.",
      },
      {
        q: "Can Plus send review requests in Spanish?",
        a: "Yes. Plus ($297/mo) supports an English and Spanish site and can send review requests in Spanish when that fits how you already communicate with the customer.",
      },
    ],
    sections: [
      {
        h2: "Why the direct link beats “find us on Google”",
        html: `<p>“Just Google us” sounds easy in the shop. On a phone, it is work. Your customer types a name, sees three similarly named companies, taps the wrong card, and leaves a review on a business that is not yours. Or they give up and you get silence you interpret as ingratitude.</p><p>A direct review link opens the review form for your location—the same flow Google documents under <strong>Get more reviews</strong> in the <a href="https://support.google.com/business/answer/3474122" rel="noopener noreferrer" target="_blank">Business Profile review help</a>. One tap, write, post. That is the bar: remove hunting.</p><p>You can also generate a link and QR from your Place ID with the <a href="/tools/google-review-link-qr">Google review link &amp; QR tool</a> on this site. Print the QR for invoice stuffers, leave a laminated card in the truck, and keep the short URL in your texts. Test every new link on a personal phone that is not logged in as the profile owner. If it lands on a knowledge panel for a different company, fix it before you send it to customers.</p>`,
      },
      {
        h2: "Get the link from Google (step by step)",
        html: `<p>Open Google Business Profile with the Google account that manages the listing—not a personal Gmail that only has manager access buried three menus deep, if you can avoid that confusion in the office.</p><ol><li>Go to <strong>Read reviews</strong> for your location.</li><li>Choose <strong>Get more reviews</strong> (wording may vary slightly in the UI).</li><li>Copy the share link Google provides.</li><li>If you need a QR, Google’s help notes that you can download the QR from a computer browser—right-click the image and save it, per <a href="https://support.google.com/business/answer/3474122" rel="noopener noreferrer" target="_blank">Google’s instructions</a>.</li></ol><p>Store the link in one place everyone trusts: a note in the CRM, a saved message template, a single line in the office SOP. Do not let each tech keep a different broken link in their personal notes app.</p><p>Profile hygiene still matters. Wrong business name, merged duplicate listings, or a suspended profile means the link goes nowhere useful. If reviews suddenly stop, check profile status before you rewrite scripts. The <a href="/blog/google-business-profile-checklist">Google Business Profile checklist</a> is the boring maintenance list that keeps the ask from failing for clerical reasons.</p>`,
      },
      {
        h2: "Rules that keep you out of trouble",
        html: `<p>Reviews are endorsements in public. The FTC’s <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">Endorsement Guides</a> answer the questions businesses actually ask: do not fabricate reviews, do not pay for them without clear disclosure, do not misrepresent what typical customers experience. You do not need a law degree to run a clean shop—ask real people after real jobs.</p><p>Google’s policies align with common sense you already teach new techs: do not offer incentives tied to star rating, do not post reviews on behalf of customers, do not use review stations that filter unhappy people away from Google. “We only want five stars” is both bad ethics and bad training—it teaches techs to avoid the ask on normal jobs.</p><p>Do not write the review text for them and ask them to paste it. Do not swap employee praise for customer voices. Do not buy packages from vendors who promise dozens of reviews overnight. Suspensions and public embarrassment cost more than the slow climb of legitimate asks.</p><p>If you use SMS, consent and opt-out rules apply. Identify your business in the first line. Honor STOP. Have a qualified compliance review before you blast a new template—this article gives drafts, not legal clearance.</p>`,
      },
      {
        h2: "When to ask (timing beats enthusiasm)",
        html: `<p>The right moment is when the customer can see the finished work—not when you are still carrying tools through their hallway, and not three weeks later when they forgot your name.</p><ul><li><strong>Repairs and clears</strong> — same day, after walkthrough, while the fixed thing is right in front of them.</li><li><strong>Replacements</strong> — after install is complete and the system has run; next morning is fine if they were tired at close-out.</li><li><strong>Recurring routes</strong> (lawn, pool, cleaning) — after a notably good visit, not every Tuesday to the same address.</li><li><strong>Estimate-only calls</strong> — usually skip. They did not hire you yet. Asking then feels pushy and confuses the relationship.</li></ul><p>On <strong>Lead System</strong> ($197/mo) and <strong>Plus</strong> ($297/mo), Kinexis can send the review request after the job using your direct link workflow. <strong>Website</strong> ($97/mo) and base <strong>Own It</strong> ($1,497) do not include automated requests. Plus can send in English and Spanish when that matches how you already talk to the household.</p>`,
      },
      {
        h2: "Door script (short enough to memorize)",
        html: `<p>Your tech should not perform a monologue. One thank-you, one sentence on why reviews matter, one question, one next step.</p><blockquote><p>“Thanks for having us out today. If you’re happy with how this turned out, a quick Google review helps the next customer find us—it’s how a lot of people choose who to call. Can I text you the direct link? It takes about a minute.”</p></blockquote><p>If they say yes, send the text before you leave the driveway—not from the shop at 9 p.m. when the moment is cold. If they hesitate or say no, stop. Arguing converts a neutral customer into someone who tells the story at dinner.</p><p>Spanish-speaking households: if your crew truly serves in Spanish, use the same short structure in Spanish. Plus is the plan built for bilingual sites and Spanish review requests when your operation can back that up. Do not paste Spanish scripts if the office cannot answer a Spanish callback.</p><p>More trade-specific variants and crew training notes live in <a href="/blog/how-to-ask-for-google-reviews-contractor">how to ask for Google reviews (contractor scripts)</a>. This post stays language-neutral and repeats the basics so the Spanish slug URL still serves English readers who landed from an old link or a forwarded text.</p>`,
      },
      {
        h2: "Text message scripts",
        html: `<p>One link per message. Identify the business. Do not mix a review ask with a payment dispute or a collections tone.</p><p><strong>Same day (after yes at the door)</strong></p><blockquote><p>Hi [Name]—this is [Your Name] at [Company]. Thanks again for having us out today. If you’re willing, here’s our Google review link: [link]. Reply STOP to opt out of texts.</p></blockquote><p><strong>Same day (no prior ask—use sparingly)</strong></p><blockquote><p>Hi [Name]—[Company] here. We wrapped your [job type] today. If everything looks good, we’d appreciate a Google review when you have a minute: [link]. Reply STOP to opt out.</p></blockquote><p><strong>Next morning (they said yes but you forgot the link)</strong></p><blockquote><p>Hi [Name]—following up with the Google review link I mentioned yesterday: [link]. No pressure if you’re busy. —[Company]</p></blockquote><p>Keep [link] short—a branded short URL or the Google share link, not a paragraph of tracking parameters. Test that it opens the review box, not your website homepage.</p>`,
      },
      {
        h2: "Email and paper (for customers who do not text)",
        html: `<p>Some homeowners still live in email. Send one message, subject line boring and clear: “Google review link for [Company].”</p><blockquote><p>Hi [Name],</p><p>Thank you for choosing [Company] for [job]. If you’re satisfied with the work, a Google review helps neighbors find us when they search.</p><p><a href="[link]">Leave a review here</a></p><p>If anything did not go as expected, reply to this email or call [phone] so we can fix it.</p><p>—[Your Name]</p></blockquote><p>That last line matters. You are not asking only for praise; you are showing you answer when something is wrong. Future readers notice.</p><p>Paper still works. Print the QR from the tool or Google, stick it on invoices, leave it on the kitchen counter with the signed ticket. A quarter sheet with “Scan to review [Company]” beats a verbal lecture for customers who will never open a text from an unknown number.</p>`,
      },
      {
        h2: "What never to do",
        html: `<ul><li>Do not offer money, gift cards, discounts, or free future visits tied to leaving a review or a star rating.</li><li>Do not use kiosks or surveys that send happy people to Google and unhappy people to a private complaint form—that is gating.</li><li>Do not ask employees, cousins, or other businesses to trade reviews.</li><li>Do not paste the same review text to ten customers or hand them a paragraph to copy.</li><li>Do not threaten or guilt-trip (“We need 20 reviews this month”).</li><li>Do not use job photos from another company’s marketing as if they were yours—that is a different kind of false advertising.</li></ul><p>If a marketer sells “reputation automation” you do not understand, slow down. Read Google's <a href="https://support.google.com/business/answer/2622994" rel="noopener noreferrer" target="_blank">policies on prohibited content</a> and the FTC guides linked above. Cheap shortcuts become expensive when the profile disappears.</p>`,
      },
      {
        h2: "After the review posts",
        html: `<p>Thank reviewers like a human. Mention the job, not “your kind words.” On a tough review, say how to reach you and what you can check—without diagnosing on Twitter or arguing about parts you did not supply if you were not on site.</p><p>On the website, show that reviews exist and link to the profile; do not rebuild Google on a custom page with invented quotes. How those elements should sit next to the phone is in <a href="/blog/build-trust-with-reviews">build trust with reviews</a>. How the ask fits crew culture is in <a href="/blog/how-to-ask-for-google-reviews-contractor">contractor review scripts</a>.</p><p>A thin review count is not a reason to pause operations. Keep asking after the next ten real jobs. Recent and real beats old and perfect. Lead System and Plus automate the send after jobs; Website and Own It owners run the same scripts manually until they upgrade or build their own workflow.</p>`,
      },
      {
        h2: "Optional automation and what it costs",
        html: `<p>If you are already drowning in follow-up, automated review requests on Lead System ($197/mo) and Plus ($297/mo) use your direct link after the job closes in your process—not a generic “rate us” page on another domain. Plus adds Spanish when your business actually serves in Spanish.</p><p>That automation is separate from missed-call text-back, which is optional, needs a dedicated business line, and on Lead System/Plus uses a $1/mo second tracking number if you use one plus carrier rates. Carrier approval for texting often takes 10–15 days and is not guaranteed. Do not bundle those facts into a pitch that sounds like texting is free on every plan.</p><p>Website at $97/mo and Own It at $1,497 are legitimate choices when you will ask by hand and only need the site to show proof and phone. Compare tiers on <a href="/pricing">pricing</a>. If you want the homepage mockup while you fix review habits, <a href="/contact">get a free preview</a>—2 business days, no card—then launch typically in about 5 business days after approval and content, confirmed in writing.</p>`,
      },
    ],
  },
};
