export type PillarPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
  faqs?: { q: string; a: string }[];
};

export const PILLAR_POSTS: Record<string, PillarPostBody> = {
  "local-seo-get-found-get-called": {
    lead: `It is 7:40 on a Tuesday. A homeowner is standing in the driveway with a phone in one hand and a hose bib that will not shut off in the other. They type “plumber near me,” tap the first name that looks open, and call. If your number on that listing is the old shop line, or your site says you do not come to that side of town, the job is gone before you finish the call you are already on. Local SEO is the unglamorous work of making that moment land on you: the right category, an honest service area, a page that matches the job they searched, and a phone that actually rings. It is not a stack of town pages with the city name swapped, and it is not a promise that you will sit in position one.`,
    sections: [
      {
        h2: "The search happens next to the problem",
        html: `<p>Most local jobs do not start at a desk. They start next to a dead air handler, a dark kitchen, a wet ceiling, or a garage door that stopped halfway. The person searching is impatient, often one-handed, and already comparing two or three names. They are not reading your origin story. They are deciding who can show up.</p>
<p>That is why “being on Google” is too vague to be useful. There are at least two places they might see you. One is the map pack: the business cards with stars, hours, and a call button. The other is the ordinary blue links underneath, where a service page can win if it actually describes the job. A strong profile can get the tap. A clear page can get the call when the map is crowded, when they came from a referral text, or when an ad needs somewhere honest to land.</p>
<p>Google’s <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" rel="noopener noreferrer" target="_blank">SEO Starter Guide</a> is blunt about the foundation: helpful pages, clear titles, and information a person can use. For a trade, “helpful” usually means the work, the area, and a way to reach a human. If those three are muddy, no amount of posting on the profile will rescue the afternoon.</p>
<p>You also cannot treat the map and the website as rivals. The profile is where many emergency calls start. The site is where a water-heater replacement, a panel upgrade, or a roof bid has room to explain itself. Owners who only polish one of them leave the other half of the search unfinished. The four Kinexis website plans do not include ongoing SEO. That split is deliberate, so nobody is sold a ranking inside a hosting bill. If you want that layer later, it is quoted on its own under <a href="/seo-services">SEO services</a>.</p>
<p>A useful test: hand your phone to someone who does not work for you and ask them to find a company that can fix the exact problem you want more of. Watch their thumb. If they hesitate on your name, you have a clarity problem, not a content-calendar problem. Fix what made them hesitate before you pay for another article.</p>`,
      },
      {
        h2: "What the map pack is deciding",
        html: `<p>Open Google on your phone and search the job you want more of, plus “near me.” Look at the three businesses in the pack before you look at anything else. Notice what a thumb can do without scrolling: call, directions, website, hours, a star rating, a couple of photos. That card is a compressed version of your company. If the hours are wrong, the card is lying. If the primary category is a generic “Contractor” when you are a drain company, the card is vague. If the photos are a stock hard hat, the card is borrowing someone else’s face.</p>
<p>Google documents how profiles work in the <a href="https://support.google.com/business/answer/3038177" rel="noopener noreferrer" target="_blank">Business Profile help center</a>. The practical reading for an owner is simple. The profile is a public record of who you are, what you do, and when you answer. Customers treat it like a storefront. So should you.</p>
<p>People argue endlessly about the exact ranking recipe. You will not get a reliable one from a blog, including this one. Distance, the wording of the search, how established the competitors are, and whether your details are consistent all play a part. What you can see with your own eyes is whether your card is eligible to be chosen: correct category, real hours, a working number, recent photos, and reviews that sound like customers instead of ads.</p>
<p>Tap your own listing the way a stranger would. Does the call button dial the line your tech actually hears? Does “Open now” match the board in the shop? If you run emergency hours, are they entered as real hours or as a slogan in the description? Slogans do not change the open/closed badge. Wrong hours create the worst kind of review: someone who drove over, or waited until 9 p.m., because Google said you were there.</p>
<p>When the pack is full of established companies, the website still earns its keep. Ads, yard signs, and the neighbor who texts your link all need a page. So does the person who skips the map and reads the links because they want a written scope before they call. If you only exist as a pin, you are invisible the moment the search is specific—“tankless water heater install,” “EV charger panel,” “no heat after hours”—and the pack is answering a broader query.</p>
<p>There is a quieter failure mode too. You show up, they tap the website, and the site loads a slideshow about craftsmanship with the phone number in a footer image. They go back to the pack and call the next card. You “ranked.” You did not get the job. Local visibility without a callable page is a vanity metric. Pair this with <a href="/blog/google-business-profile-vs-website">when the profile is enough and when the site still matters</a>.</p>`,
      },
      {
        h2: "Name, phone, and hours have to match",
        html: `<p>Pick one public name and stick to it. If the trucks say “River and Main Plumbing,” the profile, the site, the invoice, and the voicemail should say that too. Adding “Best,” “number one,” or a city you want to rank for into the business name is a shortcut that Google’s profile guidelines frown on, and it confuses the customer who was given a different name by a friend. Consistency is boring. Inconsistency is how you get calls for a company that is not quite you.</p>
<p>The phone number deserves the same discipline. One primary number that reaches a person, or a tracked line you actually monitor, belongs on the profile and in the site header. A second number for ads can be useful if you want to know which calls came from where. It should not be the only number, and it should not be a line nobody checks. On Lead System and Plus, a second tracking number is $1 a month if you use one, plus whatever your carrier charges for texts. That is a measurement tool, not a second company.</p>
<p>Hours are where good companies accidentally lie. You close at 5, the profile says 6, and the last caller of the day hears a voicemail that argues with Google. Or you offer after-hours emergency work but the profile closes you at 5, so the map hides you from the person with a burst supply line. Enter the hours you answer. If emergency service is real, say so in a way the hours fields support, and make the site say the same thing. A mismatch is not a small branding issue. It is a missed job plus a one-star review.</p>
<p>Service area belongs in that same alignment. If the profile lists a huge radius and the site lists three towns your two techs can actually reach this week, you will book estimates you have to decline. Declined estimates feel like marketing failure. They are an operations fact you published by accident. The <a href="/blog/google-business-profile-checklist">Google Business Profile checklist</a> goes field by field. The reason those fields matter: the customer and the crawler are both trying to answer “are you the company that can come here today?”</p>
<p>Do this on a Tuesday, not during a storm week. Open the profile, the homepage, and your voicemail greeting side by side. Read the hours out loud. Call the button from a personal phone. If anything disagrees, fix the public version before you write new copy. Owners skip this because it feels clerical. It is the highest-leverage half hour in local search, and it does not require a consultant.</p>`,
      },
      {
        h2: "Categories describe the truck, not the slogan",
        html: `<p>Primary category is the blunt instrument. Plumber, HVAC contractor, electrician, roofing contractor, garage door supplier, house painter—use the category a customer would expect, not a clever adjacent one. Additional categories can cover real secondary work. They should not be a wish list of every license you might someday add.</p>
<p>Then look at the services you attach to the profile. “Plumbing” is a category. “Water heater replacement,” “drain cleaning,” and “slab leak detection” are services a person searches. If you only list the category, you are asking Google and the customer to guess which jobs you want. Guessing goes to the competitor who wrote the jobs down.</p>
<p>Write services the way the phone rings. “AC repair” beats “residential climate solutions.” “Panel upgrade” beats “electrical excellence.” You can still sound like a professional. You do not have to sound like a brochure that is afraid of the noun.</p>
<p>Products and extra attributes are easy to ignore if you are a one-truck shop, and that is fine. Do not fill them with fluff to look busy. A short, true services list plus current photos outperforms a profile that reads like a catalog nobody maintains. If you are bilingual and you actually answer in Spanish, Plus is the plan built for an English and Spanish site and Spanish review requests. Putting Spanish in the profile description while the phone tree is English-only creates a different kind of mismatch. Only advertise the language you can serve.</p>
<p>Lead System and Plus include a profile tune-up at launch. Plus also includes two posts a month. That is setup and a light publishing rhythm, not a promise about where the pin will sit. If someone sells you “map pack guaranteed” inside a website invoice, ask them to put the guarantee in writing with a definition of what happens when Google disagrees. Most will change the subject. We would.</p>`,
      },
      {
        h2: "One service area, not a pile of town pages",
        html: `<p>You cover a real radius. The honest way to say so is one service-area page that names the cities and neighborhoods your crew will actually drive, plus the jobs you will not take. “We come to the west side of the county and these towns. We do not cross the river for a clogged sink.” That sentence saves you and the customer an hour.</p>
<p>The dishonest way is twenty pages that repeat the same three paragraphs and swap the town name. They look like marketing. They read like a mail merge. Google’s spam policies describe <a href="https://developers.google.com/search/docs/essentials/spam-policies" rel="noopener noreferrer" target="_blank">doorway pages</a> as thin pages built mainly to catch similar searches. You do not need a legal opinion to feel the problem: a homeowner who lands on two of your town pages and finds nothing different except the place name has learned that you are talking to an algorithm, not to them.</p>
<p>There is a practical cost too. Thin clones dilute the pages that could have ranked for the work itself. They also create calls from places you cannot serve, which show up in your stats as “leads” and in your truck as wasted windshield time. If you later open a real second location with its own crew, that is a different decision: a real page, a real profile, a real phone. Publishing it overnight as a copy is not the same thing.</p>
<p>On the area page, be specific about response, not about slogans. Same-day drain calls inside a tight radius are a different promise from a roof replacement you schedule two weeks out. If both are true, say both. If only one is true, do not let a template imply round-the-clock everything. The homeowner with the hose bib will forgive a clear “we can be there after 2” more easily than a cheerful lie.</p>
<p>Page structure for a given trade—what deserves its own URL—is covered in the pages guides, for example <a href="/blog/plumbing-website-pages">what a plumbing site needs</a> and <a href="/blog/hvac-website-pages">what an HVAC site needs</a>. Those posts own the “which pages” question. This one owns the principle: geography should be honest, and the job should have a page because the job is different, not because a town name needed a URL.</p>
<p>If you inherited a city-page farm from a previous vendor, do not panic-delete everything on a Friday. Pick the one area page you will keep, move any unique photos or real project notes onto the service pages, and retire the clones. Leaving them up “just in case” teaches the next visitor the same mail-merge lesson. A smaller site that tells the truth books cleaner calls.</p>`,
      },
      {
        h2: "Give the job its own page",
        html: `<p>Someone searching “water heater replacement” and someone searching “burst pipe” are not in the same mood, even if both need a plumber. One is comparing equipment and timing. The other is trying to stop damage. A single Services page that lists both in a bullet halfway down makes each of them work too hard, and it gives Google a vague document to match against a specific query.</p>
<p>A useful service page names the job in the title and the first screen, says who it is for, says what you need from the customer (access, photos, the age of the unit), and offers one obvious next step. For the burst pipe, that step is a tap-to-call number. For the water heater, it might be a short form plus the number. Mixing those two into “Contact us” forces the emergency through a form and the estimate through a panic button. Neither is happy.</p>
<p>Write the page the way you explain the job in the driveway. What fails, what you look at first, what a typical visit includes, what you will not promise before you see it. You do not need a novel. You need enough that a careful homeowner feels you have done this before, and enough that a hurried one can still find the phone. Photos of your work—not a catalog render—belong on that page. So does a license note if your state cares, and a short note on financing only if you actually offer it.</p>
<p>Internal links should sound like directions, not like a footer dump. From the water-heater page, link to the service-area page and to related work you truly want, such as flushing or expansion tanks, when those are real offers. From the homepage, link to the money jobs, not to every URL you have ever published. Google’s notes on <a href="https://developers.google.com/search/docs/appearance/title-link" rel="noopener noreferrer" target="_blank">title links</a> are a reminder that the title is what people see in the results. “Home” and “Services” waste that line. “Water heater replacement” does not.</p>
<p>If you are pricing a site and wondering how many pages you need, start from the calls you want, not from a template that ships with eighteen URLs. Website plans include up to 5 pages, Lead System up to 10, Plus up to 20 in English and Spanish, Own It up to 10. Extra pages on the monthly Website plan are $99 each. That is a scope fact, not a reason to invent cities. Trade-by-trade cost writeups live on posts like <a href="/blog/plumber-website-cost">plumber website cost</a> and <a href="/blog/hvac-website-cost">HVAC website cost</a>. Side-by-side plan numbers live on <a href="/pricing">pricing</a>. This article is not trying to be either of those.</p>
<p>Contractors sometimes ask for a page aimed at “contractor website design” inside a blog post. That phrase belongs on <a href="/web-design">the web design page</a>, which is built to answer it. Use your service pages to answer the homeowner, not to argue with your own marketing site about who ranks for what.</p>`,
      },
      {
        h2: "Reviews and photos are proof, not a trick",
        html: `<p>Stars show up on the map card because people use them. You should too, as a reader and as an owner. What you should not do is treat reviews as a ranking hack: bought reviews, reviews from employees posing as customers, or a stack of asks that only go out when the job went perfectly and you are sure of five stars. The FTC’s <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">Endorsement Guides</a> are written for advertising, and the plain version is enough for a trade: do not fake endorsements, and do not hide a pattern that distorts what customers actually think.</p>
<p>Ask after the work is visible. The same day is usually right for a repair. For a replacement, wait until the system has run and the customer is not still watching a crew carry cardboard through the hallway. Send a direct link so they are not hunting for your name among three similarly named companies. A QR card in the invoice envelope works for people who will never tap a text. You can build that link with the <a href="/tools/google-review-link-qr">Google review link and QR tool</a>. Scripts and timing live in <a href="/blog/how-to-ask-for-google-reviews-contractor">how to ask for Google reviews</a>. How reviews sit next to the phone number on the site is in <a href="/blog/build-trust-with-reviews">building trust with reviews</a>. Lead System and Plus include a review request after jobs. Website and Own It do not, unless you run that workflow yourself.</p>
<p>Photos do a job reviews cannot. They show the truck, the finished condenser pad, the panel with the cover back on, the roof from a distance that proves you were on that house. Upload recent ones to the profile and put the same honesty on the service page. A gallery of twelve stock kitchens tells a remodeling customer you might be anyone. Three real kitchens, even if the lighting is imperfect, tell them you might be you.</p>
<p>Reply to reviews like a person. Thank the specific job, not “your kind words.” On a rough review, say what you can fix and how to reach you, without arguing the diagnosis in public if you were not in the room. Future customers read the reply more carefully than owners expect. A calm reply does not delete the star. It shows the next caller how you behave when something goes sideways.</p>
<p>A thin review history is not a reason to wait on the rest of local SEO. Ship the clear pages and the correct hours now. Ask after the next ten real jobs. The profile will look more alive in a month than it will if you pause everything until you “have enough stars.” Enough is a moving target. Recent and real beats old and perfect.</p>`,
      },
      {
        h2: "The site still has a technical job",
        html: `<p>Local SEO is not only the pin. If the page that should receive the click is slow, broken on a phone, or titled “Welcome to our website,” you did the profile work and then fumbled the handoff. Google indexes the mobile version of a site first. Their note on <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first indexing</a> is worth ten minutes if you have been judging the site on a laptop in the office.</p>
<p>Test the money pages on a phone over cellular, not office Wi-Fi. Can you read the job name without pinching? Can you tap the number? Does a chat bubble sit on top of it? Run the URL through <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> when something feels sluggish. You are looking for the thing that delays the headline and the phone, not for a perfect score to screenshot in a sales meeting.</p>
<p>Structured data can help search engines read your name, address, and phone. Google documents <a href="https://developers.google.com/search/docs/appearance/structured-data/local-business" rel="noopener noreferrer" target="_blank">local business structured data</a> if you want the field list. It does not replace visible text. If the only place the phone number exists is inside a script or a picture, a person on a phone cannot use it and a crawler may not either. Put the number in the header as real text. Use the same number you put on the profile unless you have a deliberate tracking setup and someone is reading the report.</p>
<p>HTTPS, a working form, and pages that do not jump sideways when they load are table stakes. They will not make you famous. Their absence will make you look closed. If you want a focused pass on layout rather than on rankings, <a href="/blog/make-your-website-mobile-ready">making the site mobile-ready</a> and <a href="/blog/website-mistakes-that-cost-you-calls">the mistakes that cost calls</a> stay on the conversion side of the problem. Use them when the search impression is fine and the phone still does not ring.</p>
<p>Speed and clarity interact. A fast page with a vague headline still loses. A clear headline that appears after a long blank wait loses too, because the driveway does not wait. Fix the first screen until both are true, then worry about the third scroll and the blog.</p>`,
      },
      {
        h2: "What not to buy",
        html: `<p>There is a whole industry happy to sell shortcuts: link packages, citation blasts to directories nobody visits, “SEO content” that names forty towns in one paragraph, and review exchanges between businesses that have never hired each other. Some of it is merely wasted money. Some of it can get a profile suspended or a site ignored. If a vendor cannot explain the tactic in a sentence a dispatcher would accept, do not fund it.</p>
<p>Citations—your name, address, and phone on other sites—matter when they are accurate and you actually exist there. They do not matter as a spreadsheet of 200 listings you will never log into again. Start with the places customers and Google already check: your website, your Google profile, Apple if you claim it, and the one or two industry directories your trade actually uses. Make those match. Ignore the rest until the basics are boringly correct.</p>
<p>Guest posts on random blogs, keyword-stuffed footers on client sites, and exact-match domains for every suburb are the same instinct as doorway pages. They try to manufacture geography you do not operate. A real job photo, a real review, and a page that explains the work will outperform that pile for a one-truck company. If you want a second opinion on what is worth paying for, read <a href="/blog/small-business-marketing-budget">where a small marketing budget should go first</a> before you sign a retainer.</p>
<p>Also skip guarantees that sound like math. “We will get you three more calls a week or you pay nothing” can be an honest operations promise if they define a lead. “We will get you to number one” is not a promise. It is a mood. Ask which queries, in which area, measured how, and what they do when the answer is “not yet.”</p>`,
      },
      {
        h2: "Measure calls, not a rank you were promised",
        html: `<p>Ask for a report that a dispatcher could understand. How many times did the profile get viewed? How many calls came from it? How many website calls and forms were real jobs, not spam, wrong numbers, or salespeople? Which service page is getting impressions for the job you actually want? <a href="https://search.google.com/search-console/about" rel="noopener noreferrer" target="_blank">Search Console</a> will show queries and pages. It will not show you the cash. Your call log and your form inbox do that.</p>
<p>A tracked lead, in the Kinexis 60-day lead guarantee on Lead System and Plus, means a call of at least 30 seconds, a missed caller who replies to the optional text-back, or a real quote form. Spam, wrong numbers, job applicants, and existing customers do not count. If you get zero of those in the first 60 days live, the 3rd and 4th monthly charges are waived. That is one guarantee per business, only while the account is in good standing, and it does not apply to Own It. It is also not a ranking promise. You can be visible and still have a slow month. You can be invisible and get lucky off a yard sign. Count the conversations.</p>
<p>Give changes time, and do not change five things on Monday and declare victory on Friday. A corrected category or a fixed phone number can show up quickly because it was simply wrong. A new service page in a crowded market can take months to earn impressions. If an agency’s report is a single green arrow and no call count, you are looking at a mood, not a business result.</p>
<p>When a page gets impressions and no calls, fix the page before you buy more traffic. The headline, the number, and the next step are the usual suspects. <a href="/blog/turn-clicks-into-calls">Turning clicks into calls</a> is the companion for that problem. When you get calls for the wrong job or the wrong town, fix the service list and the area page before you celebrate volume.</p>
<p>Keep a simple notebook for a month. Date, where the caller said they found you, job type, whether you booked it. Ten rows will teach you more than a dashboard you do not open. If “Google” and “the truck” dominate and the website is absent, you know which asset is carrying you. If the website shows up and the calls are the wrong job, the pages are attracting a search you did not mean to answer.</p>`,
      },
      {
        h2: "Ninety days an owner can actually run",
        html: `<p>Week one is an audit you can do in a truck between calls. Read the profile on your phone. Call the button. Check today’s hours. Open the website and see whether the same facts appear. Write down every place they disagree. Fix the disagreements before you write a single new paragraph. A consistent, slightly plain presence beats a clever one that argues with itself.</p>
<p>Weeks two through four, pick the three jobs that pay the bills and make sure each has a page a stranger can understand on a phone. If one of those jobs is buried in a list, pull it out. Add two or three real photos. Put the phone where a thumb lands. If you do not have those pages yet, that is a website project, not a backlink project. Industry hubs under <a href="/industries">industries</a> show how a trade is usually framed. The pages posts under the blog show what to include without cloning towns. Electricians can start with <a href="/blog/electrician-website-pages">electrician website pages</a>. Roofers can start with <a href="/blog/roofing-website-pages">roofing website pages</a>.</p>
<p>Month two, start a review habit you will still be doing in December. One ask after completed work, with a direct link. Reply to what comes in. Do not offer a discount for a star rating. Do not send the link only to the jobs that went perfectly if that means you are steering the record. A slightly mixed, recent review history is more believable than a wall of identical praise from last spring.</p>
<p>Month three, look at Search Console and the call log together. Keep the page that matches a query you want. Improve the one that is seen and ignored. Leave the doorway-page idea in the drawer. If you want help beyond the site itself—cleanup over time, reporting, pages that keep getting sharper—that is SEO work scoped separately. No one honest will promise a position.</p>
<p>Seasonal shops should run this before the rush, not during it. A roofer who discovers a wrong phone number in the first hail week will spend the money month apologizing. An HVAC company that publishes a clear no-cool page in April is boring in the best way when the first hot week hits. The work is the same. The calendar is the part owners control.</p>
<p>If the site you have cannot support this sequence because it hides the number, breaks on a phone, or was built as a brochure, start with a preview of a homepage that does the first screen correctly. That preview takes 2 business days and does not ask for a card. Plans are $0 down: Website $97 a month, Lead System $197, Plus $297, or Own It for $1,497 once. Monthly plans cancel anytime. Every plan has a 30-day money-back guarantee. None of them quietly include an SEO retainer. If you want the preview, use <a href="/contact">the contact form</a>. If you want the numbers side by side first, stay on <a href="/pricing">pricing</a> until the choice is obvious.</p>`,
      },
      {
        h2: "After the call still counts as local SEO",
        html: `<p>Getting found is wasted if the next step falls on the floor. You are under a sink. The phone rings. You cannot grab it. The caller, still holding the problem, taps the next result. Optional missed-call text-back exists for that gap. It does not answer the phone for you. It sends a text so the person can reply while your hands are busy. It needs a dedicated business line. On Lead System and Plus the text-back itself is optional: a second tracking number is $1 a month if you use one, plus carrier text rates. On Website or Own It it is a $97 a month add-on with the same line and carrier rules. Carrier approval usually takes 10–15 days and is not guaranteed. Read <a href="/blog/missed-call-text-delayed-10dlc">why those texts are often delayed</a> before you promise customers a text you cannot send yet.</p>
<p>The FCC’s guide on <a href="https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts" rel="noopener noreferrer" target="_blank">unwanted robocalls and texts</a> is a useful boundary. You are texting someone who just called you, on a line set up for that purpose, not buying a list of strangers. Keep the message short, identify the company, and make it easy to stop. Templates by trade live in <a href="/blog/missed-call-text-back-templates">missed-call text-back templates</a>. If you want a rough sense of what unanswered calls might be costing, the <a href="/tools/missed-call-calculator">missed-call calculator</a> is a napkin, not an audit.</p>
<p>Follow-up is part of being findable because the person who found you is still deciding. A same-day return call beats a prettier website. A review request after the job is finished feeds the next stranger’s decision. Local SEO is a loop: clear public facts, a page that matches the job, a conversation, proof left behind for the next driveway. Break the loop at any point and the ranking argument stops mattering.</p>
<p>You do not have to do the whole loop in a weekend. Fix the lie first—the hours, the number, the area. Then the page for the job that pays you. Then the ask for a real review. Then the habit of calling people back. That sequence is slower than a slogan and much more likely to ring.</p>`,
      },
    ],
    faqs: [
      {
        q: "Do I need a separate page for every city I serve?",
        a: "No. Publish one service-area page for the places you actually crew. Near-duplicate town pages are thin, they attract calls you cannot take, and Google’s spam policies treat doorway pages as a problem.",
      },
      {
        q: "Is ongoing SEO included in the website plans?",
        a: "No. Website, Lead System, Plus, and Own It include the site. Lead System and Plus also include a Google profile tune-up at launch. Ongoing SEO is quoted separately. Nobody can honestly promise a specific ranking.",
      },
      {
        q: "What should I watch if I stop obsessing over a rank screenshot?",
        a: "Profile views, calls, form submissions, and whether those inquiries were real jobs. Search Console shows queries and pages. Your phone log shows whether the work turned into money.",
      },
      {
        q: "How do the profile and the website split the work?",
        a: "The profile is the map card: category, hours, photos, reviews, tap-to-call. The site holds distinct service pages, proof, and a landing place for ads and referrals. Name, phone, hours, and service area should match.",
      },
      {
        q: "How fast will a fix show up?",
        a: "A wrong number or wrong hours can matter as soon as the profile updates. A new service page in a competitive market often takes months. Change one or two things, then give them time before you declare the experiment dead.",
      },
      {
        q: "What is the 60-day lead guarantee, exactly?",
        a: "On Lead System and Plus only: if you get zero tracked leads in the first 60 days live, the 3rd and 4th monthly charges are waived. A tracked lead is a call of 30 seconds or more, a missed caller who replies to text-back, or a real quote form. It is one guarantee per business and does not cover Own It.",
      },
      {
        q: "Should I buy citations or links before I fix the site?",
        a: "No. Make the profile, phone, hours, and service pages true and usable first. Directory blasts and link packages do not repair a buried phone number.",
      },
    ],
  },

  "website-mistakes-that-cost-you-calls": {
    lead: `A homeowner with a warm refrigerator and a hot kitchen searches, taps the first site, and stares at a full-screen coupon for a maintenance plan. The phone number is under it, in a picture, in a font too small to tap. They close the tab. You never hear about it. There is no angry voicemail and no form abandonment email that tells the truth. The mistake just becomes someone else’s job. The problems below are the ones that cause that quiet exit. They are ordinary, they are fixable, and they cost more than a new logo.`,
    sections: [
      {
        h2: "You pay for the back button, not for a lecture",
        html: `<p>Service searches happen on a phone, next to the problem, with one thumb and a short fuse. Google’s note on <a href="https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing" rel="noopener noreferrer" target="_blank">mobile-first indexing</a> matches how the work already arrives: the phone version is the real site. If you only check the homepage on a laptop at the shop, you are grading a page your customer is not using.</p>
<p>People decide in a few seconds whether you do the job and whether they can reach you. If either answer is fuzzy, they go back to the results. They do not owe you a second scroll. They do not owe you a chance to explain the brand story after the fold. The next company in the list is one tap away, and that company might have a boring page with a big phone number. Boring wins.</p>
<p>That is the whole economic argument. Every mistake in this piece is a way of making the next step harder than calling someone else. Fix the hardest step first. Do not collect ten minor annoyances and call it a rebrand. A rebrand that keeps the phone in the footer is an expensive way to keep losing the same calls.</p>
<p>If you want the design conversation itself—the one about what a contractor site is for—that lives on <a href="/web-design">web design</a>. This article stays on the failures that stop the phone from ringing. The checklist companion is <a href="/blog/web-design-for-contractors">what to put on the site so the phone has a chance</a>.</p>`,
      },
      {
        h2: "The headline could belong to any truck",
        html: `<p>Read your homepage headline out loud in the driveway, the way a stranger would. If it says “quality you can trust,” “family owned,” or “serving the community since” a year, you have described a feeling. You have not described a job. The person with the warm fridge typed a job. They are scanning for that job, or for a word close to it: repair, replacement, emergency, install.</p>
<p>Family and years in business can sit underneath, in a smaller line, once the work is named. They are not a substitute for the noun. A painter and a plumber can both be family owned. Only one of them should be telling a leak caller they have arrived at the right company.</p>
<p>The same test applies to the browser tab title, which is often what shows up in Google before anyone sees your design. Google’s guidance on <a href="https://developers.google.com/search/docs/appearance/title-link" rel="noopener noreferrer" target="_blank">title links</a> is worth a look if your result still says “Home.” “Home” is not a service. “No-cool AC repair” is. Use the customer’s words, not the internal nickname the crew uses on the whiteboard.</p>
<p>Do this for the top three money pages, not only the homepage. A sharp homepage that links to a service page titled “Our solutions” throws away the clarity you just earned. The click should land on a page that repeats the job name and shows the number again. Repetition here is kindness. It is not keyword stuffing if the sentence would still make sense read aloud to a neighbor.</p>`,
      },
      {
        h2: "“Metro area” is not a service area",
        html: `<p>Owners write “greater metro and surrounding areas” because it feels safe. It tells a caller nothing about whether you will cross the river for a clogged sink or only for a full replacement. You then spend evenings declining quotes you invited. Those declines feel like a lead problem. They are a sentence problem.</p>
<p>List the towns you will actually crew this month. Say the edges. “Weekday service in these neighborhoods. We do not run emergency calls past the county line.” That paragraph filters the wrong jobs and reassures the right ones. Put it on one service-area page and link it from the header or footer, not as a treasure hunt.</p>
<p>Do not publish a copied page per town. Google’s spam policies describe <a href="https://developers.google.com/search/docs/essentials/spam-policies" rel="noopener noreferrer" target="_blank">doorway pages</a> for a reason, and customers can smell them without reading the policy. Two pages that differ only by place name teach people you are collecting searches, not explaining the work. Which pages a trade actually needs is a different article—see <a href="/blog/plumbing-website-pages">plumbing pages</a> or your trade’s pages guide, and the hubs under <a href="/industries">industries</a>. Cost of the site is a different article again, on the trade cost posts. Do not turn a mistakes piece into a price list.</p>
<p>If your radius changes with the season—mowing weekly in summer, installs only in a tight circle, roof tarps anywhere you can reach after a storm—say that. A static “we serve everyone” line will be wrong on the week it matters most.</p>`,
      },
      {
        h2: "The number is a scavenger hunt",
        html: `<p>The phone number should be real text in the header, visible on a phone without scrolling, and repeated on every service page. One tap. If the number lives only in the footer, only inside a logo image, or only after a “contact” button that opens twelve fields, you have hidden the thing the page is for.</p>
<p>Label it like a person. “Call for a same-day visit” or “Call the shop” beats “click here” and beats a wordless icon that some phones render as a decoration. Emergency work should not share a single timid button with “download our brochure.” The brochure can wait. The leak cannot.</p>
<p>Check the number you published against the number that rings. Tracking numbers are fine when someone reads the report. They are a problem when the tracking line is dead, forwards to a personal cell that goes to a full voicemail, or differs from the number on the truck and the Google profile. The caller does not care which vendor issued the digits. They care that a human picks up or calls back.</p>
<p>While you are under a house, pickup will fail sometimes. That is the job. Optional missed-call text-back is a patch for that moment, not a replacement for answering. It needs a dedicated business line. On Lead System and Plus, a second number is $1 a month if you use one, plus carrier rates. On Website or Own It, text-back is a $97 a month add-on. Approval usually takes 10–15 days and is not guaranteed. The delay is explained in <a href="/blog/missed-call-text-delayed-10dlc">why missed-call texts wait on carriers</a>. Do not launch a site that promises “we text back instantly” on day one if the carrier has not approved the campaign.</p>`,
      },
      {
        h2: "Every job crammed onto one page",
        html: `<p>A no-heat call and a system replacement are both HVAC. They are not the same visit, the same budget, or the same mood. A drain clog and a water heater are both plumbing. Putting them in one scrolling list forces each customer to do your sorting for you. Some will. Many will call a company whose page already sorted it.</p>
<p>Give the jobs you want their own pages. The emergency page leads with hours and the phone. The planned-work page can lead with what the visit includes and a short form. Say what you need from them: a photo of the unit label, gate code, whether the crawlspace is accessible. That is more useful than three paragraphs about passion.</p>
<p>Write it the way you talk on the porch. What usually failed, what you check first, what you will not quote blind. Photos from your jobs, not a manufacturer’s lifestyle shoot. If you offer financing, say so only if the offer is real this month. A badge for a lender you dropped last year is a small lie that shows up when the customer asks.</p>
<p>Internal links should be routes. Home to the three money jobs. Each job to the area page. Related work only when you actually want that call. A footer that links to thirty URLs is not navigation. It is a closet. How those routes should feel on a phone is covered in <a href="/blog/make-your-website-mobile-ready">making the site mobile-ready</a> and in <a href="/blog/turn-clicks-into-calls">turning the visit into a call</a>. Use those when the words are right and the layout still fights the thumb.</p>`,
      },
      {
        h2: "Proof shows up after they needed it",
        html: `<p>License, insurance, and a real photo of a finished job belong near the phone, not on an About page three flicks down. The caller is deciding whether you are safe to let in the house. They will not take a tour of your timeline to find out.</p>
<p>Stock photos are the quiet version of a fake review. The customer builds a picture of a crew that is not yours, then feels the mismatch when your actual truck arrives. Use imperfect photos of your work. A crooked phone picture of a panel you actually wired beats a glossy image of a model in a hard hat.</p>
<p>Reviews help when they are recent and specific. “Fixed the float switch, on time, explained the bill” is worth more than “great service!!!” five times. Do not invent quotes for the homepage. The FTC’s <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">Endorsement Guides</a> are not aimed at giant brands alone. A made-up testimonial on a five-page trade site is still a made-up endorsement. Earn them the way <a href="/blog/how-to-ask-for-google-reviews-contractor">this review ask</a> describes, and put a few real lines where the eye lands before the call. More on how that proof should sit on the page: <a href="/blog/build-trust-with-reviews">building trust with reviews</a>.</p>
<p>If you only have four reviews, show four. A thin, true record is easier to trust than a widget full of anonymous praise with no dates. You can say “we are still building our Google reviews” without apologizing for the work.</p>`,
      },
      {
        h2: "Slow pages and pop-ups that sit on the number",
        html: `<p>A hero video that takes most of a cellular connection before the headline appears is not cinematic. It is a closed sign. People on a weak signal in a basement will not wait for your brand film. They will call the company whose number painted itself on the screen immediately.</p>
<p>Google’s <a href="https://developers.google.com/search/docs/appearance/page-experience" rel="noopener noreferrer" target="_blank">page experience</a> notes cover loading and mobile usability because users feel those things whether or not you care about the jargon. Run the money URL through <a href="https://pagespeed.web.dev/" rel="noopener noreferrer" target="_blank">PageSpeed Insights</a> when the page feels heavy. Chase the item that blocks the phone number. Ignore the temptation to celebrate a score while the call button is still covered by a chat bubble.</p>
<p>Pop-ups, coupon bars, and cookie walls love to land on the exact pixels where the number sits. On a laptop you can drag them aside. On a phone you dismiss them, miss, and leave. If a tool cannot wait until after the first screen is usable, it does not belong. Same for “book online” flows that demand an account before you will discuss a burst pipe. Accounts are for planned work, maybe. Emergencies get a phone.</p>
<p>Test with one hand, outside, on cellular. Pinch to read? Horizontal slide? Keyboard covering the submit button? Those are not polish items. They are the difference between a form that arrives and a form that was abandoned in the driveway. Write down the first failure and fix that before you debate colors.</p>`,
      },
      {
        h2: "The ad, the map, and the site disagree",
        html: `<p>You can lose the call after you already paid for the click. The ad says same-day. The Google profile says you close at five. The site says request a quote within one business day. The voicemail says the shop is at a job site. The customer does not experience those as separate marketing channels. They experience them as one company that cannot keep a story straight.</p>
<p>Pick the true offer and put it everywhere. If same-day means “we answer until 6 and schedule what’s left for tomorrow,” say that. If 24-hour means a real on-call rotation, the hours fields and the homepage should both say so. The <a href="/blog/google-business-profile-checklist">profile checklist</a> is the place to align hours, categories, and photos. Do it in the same afternoon you fix the homepage, not “after the redesign.”</p>
<p>Paid traffic should land on the page that matches the job in the ad. Sending “water heater” clicks to a generic home page makes people hunt, and hunting is how you donate the click to the next result. Fix the landing page before you raise the bid. More visits into a confused page is not growth. It is a more expensive version of the same silence.</p>
<p>Referral traffic has the same standard. The neighbor who texts your link is sending a person who already half-trusts you. Do not make them decode a slideshow to find the number. Gratitude for a referral looks like a page that respects the introduction.</p>`,
      },
      {
        h2: "The form interviews them before you will talk",
        html: `<p>Name, phone, and what is wrong are usually enough to know whether you should call back. Asking for square footage, how they heard about you, preferred financing, and a paragraph of project history before the first conversation is how forms go unfinished. You can ask the rest on the phone, where you can also hear whether this is a real job.</p>
<p>Photos are useful and optional. A required upload on a phone in bright sun, with a full camera roll and a bad signal, will lose people who would have texted you the picture thirty seconds after a human answered. Let the first step be light. Let the second step be a conversation.</p>
<p>Say what happens next, in one sentence. “We call or text during shop hours, usually the same day.” If you only check forms at 7 a.m. and 4 p.m., say that too. Silence after a submit feels like a broken site. A clear expectation feels like a company.</p>
<p>Then keep the promise. A form that works and a callback that waits until Thursday is still a lost job if someone else called at noon. Speed-to-lead is not a software category. It is whether the person on the other end is still standing next to the broken unit. Track calls and real form fills, not pageviews. Pageviews flatter. Booked work does not.</p>`,
      },
      {
        h2: "Menus that hide the job you want",
        html: `<p>A hamburger icon is not a sin. A hamburger that is the only way to find “drain cleaning” is a problem, because the person with water on the floor will not explore your information architecture. They will tap back. Put the three jobs you want on the first screen as plain links, with the phone beside them. The rest of the menu can hold About, reviews, and the area page.</p>
<p>Footer links have the opposite disease: everything, in 8-point type, after the visitor has already decided you are hard to reach. Footers are for people who scrolled because they are interested. They are not a rescue plan for a vague hero. If the only mention of water heaters is a footer link called “residential,” you have asked a hurried person to be a patient one.</p>
<p>Name links the way you name pages. “Services” is a closet door. “Water heaters” and “AC repair” are labels. On a phone, those labels should be thumb-sized, not a row of tiny text buttons that open the wrong page when the truck hits a bump and the thumb slips. Give them space. Test with a thumb, not with a mouse.</p>
<p>Dropdowns that require a hover do not exist on a phone in any way you can trust. If your desktop menu depends on hovering, open the phone and see what actually happens. Often it is a dead tap or a jump to a vague parent page. Build the phone menu as the real menu. Let the wide screen be the luxury version of the same choices.</p>`,
      },
      {
        h2: "A blog that outshouts the page that should book the job",
        html: `<p>Publishing articles is fine when a real question keeps coming up on the phone: tank vs tankless, how to shut the water off, what a double-tapped breaker looks like. Those pieces can help. They become a mistake when they are the only specific pages on the site and the actual service is still a bullet on the homepage.</p>
<p>Search can then send a motivated customer to a 2019 article that never offers a clear call, while the page you wish they had found says nothing useful. Link from the article to the service page in the first screen, with the phone repeated. Do not make them finish 1,500 words to discover you still install the thing you just explained.</p>
<p>Also retire posts that promise services you dropped, prices you no longer charge, or towns you no longer drive to. An old post is still your voice. If it is wrong, it is a wrong voicemail that never stops playing. Updating or removing it is less glamorous than a new article and more likely to stop a bad call.</p>
<p>This site’s own split is a decent model for what not to mix up. Trade cost questions belong on the cost posts, such as <a href="/blog/electrician-website-cost">electrician website cost</a>. Page lists belong on the pages posts. “Contractor website design” as a service belongs on <a href="/web-design">web design</a>. Your customer-facing site should be just as unwilling to make one URL do three jobs.</p>`,
      },
      {
        h2: "Hours, holidays, and the voicemail that argues with you",
        html: `<p>The site can be perfect at 10 a.m. on a Tuesday and still lose Saturday. If you publish “open” hours you do not staff, you manufacture one-star reviews from people who did what you asked. If you are truly on call, the homepage and the Google profile should both say how to reach that person, not a shop line that rings in an empty office.</p>
<p>Holidays are where this goes sloppy. You close for a long weekend, the profile still says open, and the site says nothing. Update both before you lock the door. A one-line banner beats an apology on Monday. Customers forgive a closed holiday they were told about. They do not forgive a drive across town to a dark bay.</p>
<p>Voicemail is part of the website even though it is not on the website. If the greeting says “leave a message and we will call you back the next business day” while the site says “same-day emergency,” you have two companies. Record a greeting that matches the offer: what to do if this is urgent, what to do if it can wait, and the hours a human will hear the message. Then empty the mailbox. A full mailbox is a closed sign you cannot see from the homepage.</p>
<p>If you miss calls because you are on a job, say so in the process, not as a slogan. “If we miss you, we call back the same day during working hours” is a standard you can keep. “We never miss a call” is a standard you will break the first time you are in a crawlspace. Honest beats heroic. Optional text-back can cover the gap once a carrier has approved it. Until then, do not advertise a text you cannot send.</p>`,
      },
      {
        h2: "A language you advertise and a phone that cannot speak it",
        html: `<p>If a chunk of your customers call in Spanish, a translated homepage is not a courtesy. It is how they decide you are for them. It fails the moment the button says “llámenos” and the person who answers cannot continue the conversation, or the form replies only in English three days later. Match the site to the phone, not to a plugin.</p>
<p>Plus is the plan built for that case: an English and Spanish site, up to 20 pages, review requests in both languages, and optional text-back in both, still with the dedicated-line and carrier rules. It is $297 a month, $0 down, cancel anytime. It is the wrong plan if you only want a Spanish sentence in the footer for appearance. Do not collect calls you cannot serve. That is the same mistake as an oversized service area, just with language instead of miles.</p>
<p>Machine translation of technical pages can invent promises you did not make: warranties, response times, license claims. Have a person who knows the work read the Spanish before it goes live. A wrong word on a panel upgrade or a roof scope is not a charming quirk. It is the job described incorrectly.</p>
<p>If you are not ready to answer in a second language, stay in the language you can support and be excellent there. Expanding later is cleaner than a bilingual badge that dumps people into confusion. The industries pages under <a href="/industries">industries</a> are about the work, not about pretending every shop runs a call center.</p>`,
      },
      {
        h2: "Fix the first broken step, then stop",
        html: `<p>Open the homepage on your phone, on cellular, and do not scroll. Can you name the work, the area, and tap the number? If not, that is today’s job. Everything else is a distraction until that is true.</p>
<p>Then open the three services that pay the bills. Each one should name the job, show the number, and tell a hurried person what to do. If two jobs are still sharing a vague page, split the one that causes the most wrong calls or the most “I couldn’t tell if you do this.”</p>
<p>Compare the site to the Google profile: name, phone, hours, area. Fix disagreements the same day. Submit your own form once and notice every field you resented. Cut those fields.</p>
<p>Only after that should you talk about a new site, more pages, or ads. Website is $97 a month, Lead System $197, Plus $297, Own It $1,497 once, all $0 down on the monthly options, cancel anytime, 30-day money-back on every plan. Lead System and Plus add a 60-day lead guarantee: zero tracked leads in the first 60 days and the 3rd and 4th charges are waived. A tracked lead is a call of 30 seconds or more, a missed caller who replies to text-back, or a real quote form. Ongoing SEO is not inside those four plans. A free homepage preview takes 2 business days and does not need a card—<a href="/contact">ask for one</a> when you want to see the first screen before you argue about it. The plan grid itself stays on <a href="/pricing">pricing</a>.</p>
<p>You do not need to fix the whole internet reputation of your trade this week. You need the next stranger to know what you do and how to reach you before they tap back. That is a smaller job than it feels like when you are staring at a messy site. Start with the number.</p>`,
      },
    ],
    faqs: [
      {
        q: "What should show before I scroll on a phone?",
        a: "The work you sell, the area you actually cover, and a tap-to-call number. Story, galleries, and coupons can follow.",
      },
      {
        q: "Should I rebuild the whole site if calls are down?",
        a: "Not first. Fix the headline, the phone path, and the top service pages. A visual overhaul that keeps those broken will not change the call log.",
      },
      {
        q: "Are separate city pages a fix for low calls?",
        a: "No. One honest service-area page is the right move. Copied town pages create the wrong calls and look thin to customers and to Google.",
      },
      {
        q: "Where should reviews sit if I only have a few?",
        a: "Near the phone number, with real wording. A short true set beats a block of anonymous praise. Do not invent quotes.",
      },
      {
        q: "Do website plans include someone fixing these mistakes for me?",
        a: "A new Kinexis site is built with the phone, services, and mobile layout in mind, starting from a free homepage preview. Ongoing SEO is separate. Small edits are included on each plan within that plan’s limits.",
      },
      {
        q: "What is a tracked lead if I am looking at the guarantee?",
        a: "On Lead System and Plus, a tracked lead is a call of at least 30 seconds, a missed caller who replies to text-back, or a real quote form. Spam, wrong numbers, applicants, and existing customers do not count.",
      },
    ],
  },

  "how-to-ask-for-google-reviews-contractor": {
    lead: `The water heater is in. The old one is on the dolly. The customer is standing in the kitchen, relieved, already thinking about dinner. This is the moment a review is easy to ask for and easy to forget. Three weeks later you remember in the truck, send a stiff text, and it feels like you are collecting a favor. The ask did not get harder because customers hate reviews. It got harder because the job stopped being vivid. A good review habit is mostly timing, a link that opens the right page, and a sentence you can say without wincing.`,
    sections: [
      {
        h2: "Ask while the result is still in the room",
        html: `<p>People review what they can still picture. A dry ceiling, a garage door that opens on the first try, a house that smells like paint instead of mildew. That picture fades. By the time you “get around to it” on a Sunday night, you are asking them to remember a feeling and also to go find your business among three similarly named companies. Most will mean to. Many will not.</p>
<p>Same day is the default for a repair or a one-visit job. You finished, they can see it, you are still the person who fixed it and not a logo in a inbox. For a replacement—furnace, roof, water heater—give the equipment a few hours or the next morning so they know it actually runs. Asking while your helper is still carrying cardboard through the hall puts them on the spot in a way that produces either a rushed review or a polite no.</p>
<p>Routes are different. A weekly mow, a pool stop, a window route should not get a review request every visit. That trains people to ignore you. Ask after a visit that went especially cleanly, after you saved a brown patch, or a couple of times a season. You are collecting a true impression, not farming a star on a schedule that annoys the street.</p>
<p>If the job went badly, do not ask. Fix it or have an honest conversation first. A review request on top of an unresolved leak is how you get a detailed one-star that you earned. The script is not a shield. The work is.</p>
<p>Google explains the customer side of reviews in <a href="https://support.google.com/business/answer/3474122" rel="noopener noreferrer" target="_blank">how reviews work on Business Profiles</a>. Your side is simpler than the help center makes it sound: a real customer, a real job, a direct path, no reward for a specific star.</p>`,
      },
      {
        h2: "The link matters more than the speech",
        html: `<p>Search is a terrible way to ask. “Look us up on Google” sounds easy in your kitchen and fails in theirs. Autocomplete offers three businesses with names close to yours. They pick the wrong one, or they give up. Some of those wrong-company reviews are funny until they are permanent.</p>
<p>Send a link that opens your review box, or a QR code that does the same thing when they point a phone at the invoice. You can make both with the <a href="/tools/google-review-link-qr">review link and QR tool</a>. Put the QR on the invoice, on a card you hand over with the keys, and in the text you send from the truck before you leave the street. One link. Do not maintain five.</p>
<p>Test it on your own phone once a month. Profiles get edited, links rot, and a QR that opens a search page is back to the original problem. If you have more than one location, the link must be the location that did the work. A review on the shop you closed in 2022 does not help the truck that showed up today.</p>
<p>Do not ask them to word it for you, and do not hand them a paragraph to paste. Specific reviews are useful because the customer chose the detail—the float switch, the extra trip, the way you protected the floors. A pasted script reads like a pasted script. The next homeowner can tell. So can Google.</p>`,
      },
      {
        h2: "What to say when you are still in the driveway",
        html: `<p>You do not need a speech. You need one sentence you can say while you are coiling a hose. Try: “If this was straightforward, a Google review helps the next person decide who to call. I can text you the link so you do not have to search the name.” Then stop talking. The pause is the ask. Filling it with jokes or a discount makes it weird.</p>
<p>If they say yes, send the link before you pull away. If they say they are not big on reviews, thank them and leave it. One no is not a negotiation. Repeating the ask three ways is how a happy customer becomes a wary one. You will have another job tomorrow.</p>
<p>If they say “what should I write?”, tell them the truth: whatever they would tell a neighbor. The part that failed, whether you showed up when you said, whether the price matched the explanation. Do not feed them adjectives. “Just say we were professional and on time” is you writing the review with their fingers. Skip it.</p>
<p>Some customers will do it on the porch if the link opens cleanly. Let them. Do not stand over their shoulder and watch the stars. That is pressure, even if you meant it as helpful. Step back to the truck. If they would rather do it tonight, the text is enough. You already did the hard part, which was asking while the work was visible.</p>`,
      },
      {
        h2: "A text that sounds like you, not a campaign",
        html: `<p>The text should be short enough to read at a red light and obvious about who it is. Name the company, name the job in plain words, give the link, and give them an exit. Something like: “This is Dana at Northline Plumbing. Thanks for letting us swap the water heater today. If you have a minute, here is the Google review link: [link]. If now is a bad time, no worries.”</p>
<p>That is a template, not a law. Change the name and the job. Do not add three exclamation points and a request to “mention our 24-hour service.” You are not briefing a spokesperson. You are reminding a person who already lived the job.</p>
<p>Send it once. A single reminder a few days later is reasonable if they said they would and then life happened: “Just bumping this in case it got buried. Either way, thanks again.” A third text is a different relationship. Stop. Review requests that feel like collections calls get marked as spam, and they should.</p>
<p>If you text from a personal cell, say who you are in the first line. Unknown numbers get ignored. If you later turn on missed-call text-back, keep that message separate from review asks. One is “sorry we missed you, reply here.” The other is “the job is done, here is a link.” Mixing them confuses both. Carrier rules for business texting are covered in <a href="/blog/missed-call-text-delayed-10dlc">why business texts get delayed</a>. A review link is not that system, but the same courtesy applies: identify yourself and do not text strangers.</p>`,
      },
      {
        h2: "Email, paper, and the customers who will not text",
        html: `<p>Some homeowners will never tap a text from a number they do not know. Older customers, property managers, and facilities people often live in email. Send the same short note there, with the link, after the invoice. Subject lines that say “Follow up from today’s repair” beat “We value your feedback!!!” The second one looks like a survey company. The first one looks like you.</p>
<p>Paper still works. A card with a QR code in the invoice envelope gets reviews from people who sort mail at the table and will not hunt through texts. Write the business name on the card in the same words as the Google profile. If the card says “Dave’s” and the profile says “David R. Mechanical LLC,” you have built a scavenger hunt.</p>
<p>Property managers are a special case. The person who walked the job with you may not be the person allowed to post a public review, and a review that describes a tenant’s unit in detail can be more specific than anyone wanted. Ask the manager what they are comfortable saying in public. A short review about scheduling and cleanliness is enough. Do not push for a paragraph about the tenant.</p>
<p>Office and shop customers—restaurants, small warehouses, churches—often have a board or an owner who was not on site. Email the person who signed the invoice, not a generic info@ address that six people ignore. Name the day and the job so they do not have to reconstruct it.</p>`,
      },
      {
        h2: "Who on the crew is allowed to ask",
        html: `<p>If the ask lives only in your head, it will die on busy weeks. Pick a moment in the job that already happens: invoice signed, system turned on, walkthrough done. That moment belongs to a person. On a one-truck shop, it is you. On a crew, it is the lead who talked to the customer, not the newest helper who has not been introduced.</p>
<p>Give that person the sentence and the link. Do not give them a quota that pays extra for five stars. The moment money depends on the star, the ask gets distorted—skipped bad jobs, coached wording, reviews from cousins. Pay people for good work and for remembering the ask. Do not pay them for the rating.</p>
<p>New techs should hear you do it twice before they do it alone. The failure mode is not shyness. It is over-talking. They add a discount, they apologize for asking, they explain Google’s algorithm. None of that helps. The sentence, the link, the stop.</p>
<p>Write the habit where the job closes in your system. A checkbox on the invoice, a note in the job app, a stack of QR cards in the glove box. If it depends on remembering after you have driven away, you will remember the jobs that were easy and forget the Tuesday that was nothing but drive time. The Tuesday jobs are the ones future customers want to read about, because their Tuesday will look like that.</p>`,
      },
      {
        h2: "What will get you in trouble",
        html: `<p>Do not buy reviews. Do not write them and ask a customer to post your paragraph. Do not have employees pose as customers. Do not trade reviews with the electrician you drink coffee with, unless that electrician actually hired you and is describing real work. The FTC’s <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">Endorsement Guides</a> and the <a href="https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers" rel="noopener noreferrer" target="_blank">consumer reviews rule Q&amp;A</a> are written in plain language on purpose. Fake or deceptive reviews are not a clever growth tactic. They are a lie in the place your next customer looks first.</p>
<p>Do not gate the ask. A private survey that sends only the happy people to Google and buries the unhappy ones in a form you control is a filter, not a request. You can still ask unhappy customers what went wrong. You should. You just do not get to decide that only compliments are allowed to exist in public. Platforms prohibit review gating because customers can feel it, and because it makes the star average a marketing asset instead of a record.</p>
<p>Incentives are the gray area owners poke with a stick. “Leave a review and get $25 off” ties the review to a reward. That is the kind of thing the FTC wants disclosed, and it is the kind of thing that produces reviews about the coupon instead of the work. Do not do it. A thank-you for the job is fine. A discount for a star is not.</p>
<p>Also skip review pods, bought “local guide” networks, and anyone who DMs you offering 20 reviews this week. If you did not do the jobs, you do not have 20 customers. Google has removed piles of reviews from businesses that thought the risk was theoretical. Rebuilding trust after a wipe is slower than asking properly for a year.</p>`,
      },
      {
        h2: "Silence, four stars, and the angry one",
        html: `<p>Most people you ask will not review you. That is normal. They are busy, they do not have a Google account handy, or they liked you and still do not want a hobby of rating contractors. Silence is not a verdict. Keep asking the next real customer. A steady thin stream beats a frantic week of asks followed by six months of nothing.</p>
<p>Four stars with a specific sentence is a gift. Do not write back wounded that it was not five. Thank them for the detail. If they mentioned a wait, say what you are doing about waits, briefly. Future customers trust a company that can hear a four more than a company that only celebrates fives.</p>
<p>A one-star needs a different temperature. Read it twice before you reply. If you were wrong, say so and offer a direct way to finish the repair. If the review is about a different company or a job you did not do, say that calmly and point them to the right place. If they are angry and partly right, reply with the fact you can stand behind and leave the argument about tone alone. The reply is for the next customer, not for your pride.</p>
<p>Do not ask friends to drown a bad review with a burst of vague fives the same afternoon. That pattern is obvious. Do the next ten jobs well and ask those customers. A bad review shrinks as a share of the record when the record is real. It shrinks in a suspicious way when it is suddenly surrounded by people who all sound like your cousin.</p>
<p>How those reviews should show up beside the phone number on the site is a separate question, covered in <a href="/blog/build-trust-with-reviews">building trust with reviews</a>. Getting the review and displaying it are different skills. Do not paste a review onto the homepage and quietly edit out the sentence you disliked. Quote accurately or do not quote.</p>`,
      },
      {
        h2: "Property managers, crews, and the quiet customer",
        html: `<p>The person who watched you work is not always the person allowed to post. A tenant may love the repair and still not be the name on the Google account the property uses. Ask the manager who should get the link, and accept a shorter review than you wanted. A sentence about showing up and leaving the unit clean is enough. Do not push for a story about the tenant’s home. Specific is good. Intimate is not your right.</p>
<p>On a crew, the lead who spoke to the customer owns the ask. Give them the sentence and the link, not a bonus for five stars. The bonus is how the ask gets coached. New people should hear you do it twice. The failure is over-talking: a discount, an apology, a lecture about the algorithm. The sentence, the link, then stop. If they say they are not review people, thank them. One no is not a negotiation.</p>
<p>Quiet customers are the majority. They are not a verdict. Keep the habit on the next job. A business that asks after every finished repair and gets reviews from a fraction of them is healthy. A business that asks only when the owner remembers, usually after an easy job, builds a record of only the easy jobs. The hard Tuesdays are what the next Tuesday customer wants to read.</p>`,
      },
      {
        h2: "After the review exists",
        html: `<p>The ask is not the end. A review that sits unanswered, or a homepage that quotes a sentence the customer did not write, undoes the goodwill you just earned. Reply with a detail from the job. If you put a line on the site, copy it accurately, hesitation included, or do not use it. The public record and the website should not be two different companies. When they diverge, the careful customer believes the one you do not control, which is Google, and discounts the one you polished.</p>
<p>Check the link monthly. Profiles get edited, staff changes, and a QR on a card in the glove box can point at a listing you no longer use. One test tap from your phone is the maintenance. If it opens a search page instead of the review box, fix it before the next ask. Sending people into a maze is how you train them to give up, and then you conclude they “don’t leave reviews.”</p>
<p>Lead System and Plus will keep sending the request after jobs so a busy month does not erase the habit. You still own the reply and the decision not to ask when the work is unfinished. Website and Own It leave the whole loop in your hands, which is fine if the loop is on the invoice and not in your memory. Either way, the next customer in the parking lot is reading what you did after the last job, not what you meant to set up. <a href="/blog/build-trust-with-reviews">How that reading feels</a> is the companion. The ask is this one. Do it while the result is still in the room.</p>`,
      },
      {
        h2: "Make the habit survive a busy month",
        html: `<p>The system fails in July, during the first heat wave, and in the week after a storm, which is exactly when future customers will be reading you. Decide the minimum version now: every completed one-visit job gets one text with the link before the truck leaves the neighborhood, unless the job went badly. That rule fits on a sticky note. A twelve-step “reputation campaign” will not survive Thursday.</p>
<p>Keep a tiny count, not a dashboard. How many jobs this week, how many asks, how many new reviews. If asks are high and reviews are zero, the link is broken or the text is going out at midnight. If asks are zero, the rule is not in the close-out of the job. You do not need software to see that. You need the invoice stack and honesty.</p>
<p>Reply to new reviews within a couple of days. Unanswered praise looks like you are too busy to be polite. Unanswered complaints look like you disappeared. The reply can be two sentences. Future customers read them as a sample of how you handle a conversation when you are not in their hallway.</p>
<p>Once a quarter, read the last twenty reviews as if you were hiring yourself. The repeated compliment is what to keep doing. The repeated complaint is a operations problem that no script will fix. If three reviews mention surprise fees, the ask is not the project. The estimate process is.</p>`,
      },
      {
        h2: "What a plan will do, and what it will not",
        html: `<p>Lead System ($197 a month) and Plus ($297 a month) include a Google review request after jobs. Plus does that in English and Spanish. You still have to have done the job, and you still should not coach the wording. The request is a prompt with a link, not a ghostwriter. Website at $97 a month and Own It at $1,497 do not include that automated ask. You can run the text-and-QR version yourself on those plans. Nobody should pretend a tool posts reviews you did not earn.</p>
<p>A profile tune-up at launch on Lead System and Plus gets the listing into a state where new reviews have a sensible place to land: right name, right category, working link. It does not manufacture history. If you have zero reviews, the first five real ones will change how the card feels more than any description rewrite. Start there.</p>
<p>Reviews are not a ranking product. They help a stranger choose you when you are already on the screen, and they give Google a fresher public record. They do not replace a clear service page or an honest service area. If you want that half of the problem, read <a href="/blog/local-seo-get-found-get-called">local SEO that connects searches to calls</a> and the <a href="/blog/google-business-profile-checklist">profile checklist</a>. Ongoing SEO is not included in the four website plans. It is quoted separately.</p>
<p>If you want a site that has a clean place for real proof next to the phone, start with a homepage preview. Two business days, no card. Monthly plans are $0 down and cancel anytime, with a 30-day money-back guarantee. Lead System and Plus also carry the 60-day lead guarantee. Compare them on <a href="/pricing">pricing</a> when you are ready to look at numbers, or <a href="/contact">ask for the preview</a> when you would rather see a first screen than keep rereading advice. The review habit can start this week either way. It only requires the next finished job and a link that works.</p>`,
      },
    ],
    faqs: [
      {
        q: "When should I ask?",
        a: "When the customer can see the finished work. Same day for most repairs. After the system has actually run for a replacement. Not every week on a route, and not at all if the job is still unresolved.",
      },
      {
        q: "What if I tell them what to write?",
        a: "Don’t. A pasted paragraph reads like an ad, and you are too close to choosing their opinion for them. Ask them to describe the job the way they would to a neighbor.",
      },
      {
        q: "Can I offer a discount for a review?",
        a: "No. A reward tied to a review distorts it and runs into FTC endorsement rules. Thank them for the work. Let the review be voluntary.",
      },
      {
        q: "Is it okay to only send the link to happy customers?",
        a: "Steering only promoters to the public review and hiding everyone else is gating. Ask after completed jobs as a habit, and handle real problems directly instead of filtering the record.",
      },
      {
        q: "Do Kinexis plans send the review request for me?",
        a: "Lead System and Plus include a Google review request after jobs. Plus includes English and Spanish. Website and Own It do not include that automation.",
      },
      {
        q: "How many reminders are reasonable?",
        a: "One ask, and one short bump if they said they would and then went quiet. A third message starts to feel like a collection notice. Stop.",
      },
      {
        q: "Where do I get the link?",
        a: "Use a direct review link or QR so they are not searching your name. The review link and QR tool on this site will generate both. Test the link on your phone.",
      },
    ],
  },

  "google-business-profile-checklist": {
    lead: `Open Google on your phone and search your company the way a stranger would: the trade, then “near me.” If your card is missing, the name is wrong, or the hours say closed while you are standing in the shop holding the phone, nothing else you do this month matters as much as fixing that card. A Google Business Profile is not a social account you feed when you feel inspired. It is the public record of whether you are open, what you fix, and which number rings. This is the pass to make that record true. Rankings are not on the list, because you do not control them, and pretending otherwise wastes the afternoon.`,
    sections: [
      {
        h2: "Claim it before you decorate it",
        html: `<p>If you have never claimed the profile, you may already have one. Google creates listings from public data, old directories, and customers who dropped a pin. Search your phone number and your business name separately. You might find a duplicate with last year’s hours, or a listing at the house you moved out of. Claim the real one. Do not start a second profile because the first one looks ugly. Duplicates split your reviews and confuse the person who is trying to call.</p>
<p>Verification is the annoying part, and it is the part that proves you are the business. Google’s overview of <a href="https://support.google.com/business/answer/3038177" rel="noopener noreferrer" target="_blank">Business Profiles</a> walks through claiming and editing. Follow it. Postcard, phone, email, or video—use the method they offer instead of hunting a workaround on a forum. Until you are verified, you are decorating a listing you do not fully control.</p>
<p>While you wait on a postcard, write down every place the name, phone, and address already appear: the truck, the invoice, the website header, the voicemail. The profile has to join that set, not invent a new one. Owners lose a week “optimizing” a description while the call button still dials a disconnected line. The line comes first.</p>
<p>If an old marketing company still has manager access, remove them when you are in. Access is not a souvenir. Someone who can edit your hours after you have fired them can close you on a Friday without meaning to, or on purpose. Check users the same day you change the password on anything else they touched.</p>`,
      },
      {
        h2: "The name is the name on the truck",
        html: `<p>Use the real business name. Not the name plus a city you want to show up for. Not “best,” “cheap,” or a pipe-and-wrench emoji. Google’s <a href="https://support.google.com/business/answer/2911778" rel="noopener noreferrer" target="_blank">guidelines for representing your business</a> are picky about this because customers use the name to make sure they called the company their neighbor meant. Keyword-stuffed names get edited or suspended, and they make you look like a listing instead of a shop.</p>
<p>If your legal name and your truck name differ, pick the one customers say out loud and use it everywhere: profile, site, invoices, yard signs. “J.P. Holdings LLC” on the profile and “Brightline Air” on the door is how a happy customer reviews the wrong business, or cannot find you at all. Consistency is the whole trick. It is not glamorous enough to sell, which is why it gets skipped.</p>
<p>Do not create a profile per service—“Brightline AC Repair,” “Brightline Furnaces,” “Brightline Ducts”—unless they are actually separate businesses with separate phones and crews. One company, one profile, services listed underneath. Splitting yourself to chase keywords splits your reviews and your sanity.</p>
<p>If you bought the company and kept the old name because that is what the town knows, keep it on the profile too. A rebrand that exists only on the website, while Maps still shows the name people search, hides you from the people who already trust you. Change both the same week, and expect a messy month while regulars catch up.</p>`,
      },
      {
        h2: "Pick a category a customer would say",
        html: `<p>Primary category is the blunt label: plumber, HVAC contractor, electrician, roofing contractor, painter, lawn care service. Choose the one that matches the calls you want this quarter, not a clever neighbor category that sounds less competitive. Additional categories are for work you really do. They are not a wish list, and they are not a place to park every license you might add next year.</p>
<p>“Contractor” by itself is how you disappear into a pile of people who build decks, pour concrete, and remodel kitchens. If you clear drains, say plumber. If you also replace water heaters, that is a service under the plumber category, not a reason to become a generic contractor. Specific beats broad when the person searching is specific.</p>
<p>Read the category on your phone after you save it. If it makes you sound like a different trade, change it before you announce anything. A roofing company categorized as a home builder will get the wrong calls and miss the right ones. Both are expensive. The wrong calls waste an estimate. The missed ones never tell you they happened.</p>
<p>Recheck categories when the business shifts. A lawn route that added irrigation should say so. A painter who stopped doing roofs should not keep a roofing category because it once brought a few calls. Categories are a promise about what the truck is for. Update the promise when the truck changes.</p>`,
      },
      {
        h2: "Hours, including the weeks you pretend are normal",
        html: `<p>Enter the hours a person answers, not the hours you wish you were open. If the shop phone rolls to you until 6 and then to voicemail, you are open until 6. If Saturday is “sometimes, if we are not on a job,” you are not reliably open Saturday, and the green “open” badge should not say that you are. The badge is a promise. Broken promises become reviews.</p>
<p>Special hours exist for holidays and the week you are at a trade show or closed for a funeral. Use them. A profile that says open on Thanksgiving will collect a one-star from someone who stood in your parking lot. Set the special hours the week before, and put the same note on the website. The <a href="/blog/website-mistakes-that-cost-you-calls">mistakes that cost calls</a> include this exact split: Maps says one thing, the site says another, voicemail says a third.</p>
<p>Emergency service needs plain language. If you truly roll a truck at night, the hours and the description should agree, and the number that rings at 1 a.m. should be the number on the card. If “24/7” means “leave a message and we call in the morning,” do not write 24/7. Write what you do. Homeowners with a burst pipe can handle the truth. They cannot handle a drive to a dark building.</p>
<p>Look at the card on a Monday holiday, a normal Thursday, and a Sunday. Three checks a year will catch the lie you forgot you published. It takes less time than one angry callback.</p>`,
      },
      {
        h2: "Storefront, home, or a real service area",
        html: `<p>If customers do not visit you, do not pretend they do. A service-area business hides the home address and lists the towns you actually cover. Publishing your house as a storefront sends strangers to your driveway and can violate the guidelines if you do not serve people there. Google’s help on editing business info—start at <a href="https://support.google.com/business/answer/7091" rel="noopener noreferrer" target="_blank">how to edit your Business Profile</a>—covers address and service area fields. Read the labels. They are not interchangeable.</p>
<p>List towns you will crew, not every place inside a circle you once drove for a relative. A huge area looks ambitious and books estimates you decline. Declined estimates feel like a marketing problem. They are a geography problem you typed yourself. Match the list to the service-area page on the site. When one changes, change the other the same day.</p>
<p>If you have a real shop where people pick up parts or meet for estimates, show that address and keep the hours honest. A shop that is “by appointment” is fine if the profile says so and someone answers when they are coming. A shop address that is a mailbox or a virtual office is how listings get suspended. Do not rent a ghost address to look local in a town you do not work.</p>
<p>Two real locations means two profiles, each with its own hours, phone, and photos. One profile with an address you visit twice a month is not a second location. It is a claim you will have to defend the first time a customer shows up and finds a locked door.</p>`,
      },
      {
        h2: "The phone, the site, and the button that should dial",
        html: `<p>Put the number a human monitors in the primary phone field. Call it from a personal cell after you save. If it rings the old shop, a vendor’s tracking line nobody checks, or a voicemail that is full, you have a public outage that looks like a website problem. It is not. It is the button on the map.</p>
<p>A second number for ads can be useful when you want to know what the ads did. It should not replace the main number on the profile unless you are certain that line is staffed. On Lead System and Plus, a second tracking number is $1 a month if you use one, plus carrier text rates. That is an accounting choice. The customer only cares that someone picks up.</p>
<p>The website field should open the real site, not a Facebook page, not a link-in-bio, not a dead landing page from a campaign you ended. If the site is embarrassing, fix the first screen or send people to the best page you have. Hiding the URL because you are ashamed of it does not stop people from searching the company name and finding it anyway. A profile with no website still works for simple calls. It fails when someone wants to see a water-heater page or a roof photo before they dial. That split is the point of <a href="/blog/google-business-profile-vs-website">profile versus website</a>.</p>
<p>Appointment links and chat buttons are optional and often worse than a phone for emergency trades. If the button opens a scheduler that cannot see your real calendar, you will double-book or ghost people. Turn off tools you will not watch. A quiet profile that rings the right phone beats a profile with four buttons into the void.</p>`,
      },
      {
        h2: "Services written the way the phone rings",
        html: `<p>Add the jobs you want, in customer language. Drain cleaning, water heater replacement, no-cool repair, panel upgrade, spring replacement, interior painting. Skip “solutions,” “excellence,” and “custom residential services.” The person searching already knows the noun. Meet them there.</p>
<p>A short true list beats a long padded one. If you do not install tankless units, do not list them because the margin looks good on a blog. You will get the call, you will decline, and you will have spent the customer’s emergency on a no. The services list is a filter. Let it filter.</p>
<p>Descriptions under each service can be two sentences: what the visit is, and what you need from them. “We diagnose no-cool calls and can usually tell you on site whether it is a repair or a replacement. If you can, text a photo of the indoor unit before we roll.” That is more useful than a paragraph about comfort. Save the long version for the page on your site, and link the two mentally: if it is a service on the profile, it deserves a page when you can explain it properly. Page lists by trade live under the blog, for example <a href="/blog/hvac-website-pages">HVAC website pages</a>, and the hubs under <a href="/industries">industries</a>.</p>
<p>Products and “menu” style extras are optional for most trades. Do not fill them to look busy. An empty extra section is better than a fake price list you copied from a supplier in another state. If you publish prices, publish prices you will honor this month.</p>`,
      },
      {
        h2: "Photos of your work, not a stock hard hat",
        html: `<p>Upload photos a customer can believe. The truck with your name readable. A finished condenser pad. A panel with the cover on and the labels straight. A roof from far enough back to see it is a real house. The crew, if they are willing. Phone photos are fine. Darkness and clutter are fine if the job is honest. What is not fine is a catalog image of a model in unused boots.</p>
<p>Cover photo and logo are the two that show up smallest and matter most. The logo should be the mark on the truck, legible at the size of a thumbnail. The cover should be work, not a sunset. People decide whether you are a real company in the space of that thumbnail plus the star line. Give them evidence.</p>
<p>Add a few new photos a month from jobs you are proud enough to show. A profile whose newest photo is three years old feels closed even when the hours say open. You do not need a shoot. You need the habit of taking one picture before you leave, the way you already take a picture for the invoice.</p>
<p>Do not upload customer faces, house numbers you were asked to keep quiet, or anything that shows a license plate you should not share. Ask before you put a kitchen on the internet if the job was inside and personal. Most people say yes when you ask at the end. Some say no. The no is the end of it.</p>`,
      },
      {
        h2: "Description, posts, and the urge to stuff keywords",
        html: `<p>The description is a short explanation of what you do and where, in sentences a person can read. Name the main jobs. Name the area without listing forty towns. Say if you are licensed where that matters. Stop. A description that repeats “plumber plumber emergency plumber” is not more local. It is harder to read, and the person who taps “more” will feel sold to.</p>
<p>Posts on the profile are optional. Use them for a real change: storm scheduling, a holiday closure, a new service you can actually staff. Plus includes two posts a month as part of the plan. That is a light rhythm, not a content engine. Lead System includes the launch tune-up without that monthly posting. Neither is an SEO retainer. If someone frames a weekly post as the reason you will outrank a ten-year competitor, ask what happens when the posts do not move the pin. The honest answer is that posts are housekeeping.</p>
<p>Offers and coupons belong only if you will honor them and they do not hide the real price of an emergency call. A “$29 drain special” that becomes a $400 camera quote in the driveway is how you buy a one-star. If the special is real, spell out what it includes. If it is a hook, do not publish it.</p>
<p>Q&amp;A on the profile fills itself if you ignore it. Customers and, sometimes, strangers ask questions in public. Answer them in the business voice, briefly, and correct wrong answers others post. “Do you go to the far side of the county?” should not be answered by a random account. Check Q&amp;A when you check hours. It takes five minutes and prevents a public wrong promise.</p>`,
      },
      {
        h2: "Reviews: ask, reply, do not steer",
        html: `<p>The star line is on the card because people use it. Your job is a clean way to ask after real work, a link that opens your profile, and replies that sound like a person. The scripts and the timing are in <a href="/blog/how-to-ask-for-google-reviews-contractor">how to ask after a job</a>. How those reviews should sit on the website is in <a href="/blog/build-trust-with-reviews">building trust with reviews</a>. Do not reinvent a shady version here.</p>
<p>Reply to the specific job. “Glad the new spring fixed the lean” beats “Thanks for your kind words.” On a bad review, say what you can fix and how to reach you. Do not argue diagnostics in public if you were not in the room for the follow-up. The next customer is the audience.</p>
<p>Never buy reviews, never post as a customer, never send the link only when you are sure of five stars if that means you are filtering the record. The FTC’s <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking" rel="noopener noreferrer" target="_blank">Endorsement Guides</a> apply to a one-truck shop the same way they apply to a national brand. Google also removes reviews that look manipulated. A smaller true history survives. A fake spike often does not.</p>
<p>Lead System and Plus send a review request after jobs. That does not relieve you of doing the work well or of replying. Website and Own It leave the ask in your hands. Either way, the profile should be claimed and the link tested before you send anyone to it. A request that lands on a duplicate listing is a review you will not see until a customer mentions it.</p>`,
      },
      {
        h2: "A twenty-minute pass you can keep",
        html: `<p>Once a month, on a day you already do paperwork, open the profile on your phone and walk this list. Call the button. Check today’s hours and the next holiday. Look at the primary category. Open the website link. Skim new reviews and unanswered questions. Upload two photos from recent jobs if you have them. That is the whole maintenance program for a lot of shops.</p>
<p>Write down anything that disagreed with the site, and fix the site or the profile before you close the laptop. Do not start a spreadsheet of “SEO tasks” until this pass is boring. Boring means the public record is stable. Stable is what you want when a storm hits and you do not have time to discover that Saturday’s hours were wrong.</p>
<p>If something looks off and you did not change it—a category swap, a new photo you do not recognize, a suggested edit that rewrites your name—reject it. Google lets the public suggest edits. Some suggestions are helpful. Some are a competitor or a confused algorithm. You are the editor. Act like it.</p>
<p>Keep a copy of your login somewhere the next owner or spouse can find it. Profiles get orphaned when one person holds the password and then leaves. Recovery is slower than the next hail week. This is unglamorous and it will save you.</p>`,
      },
      {
        h2: "What the profile will not do for you",
        html: `<p>The card can get the tap. It cannot explain a panel upgrade, show a kitchen you remodeled, or give an ad somewhere honest to land. That is the website. If your work is mostly “come now,” a solid profile and a simple site may be enough. If your work is scoped, compared, and scheduled, the site has to carry the explanation. Do not ask a 750-character description to do a service page’s job.</p>
<p>The profile also will not guarantee a position. Distance, the wording of the search, competitors, and whether your information is consistent all sit outside a checklist. Anyone who sells “map pack in 30 days” as a certainty is selling a mood. You can make the card accurate, active, and easy to call. You can publish real photos and earn real reviews. Then you watch calls, not a screenshot.</p>
<p>Lead System and Plus include a profile tune-up at launch. Plus adds two posts a month. Ongoing SEO is not part of Website ($97/mo), Lead System ($197/mo), Plus ($297/mo), or Own It ($1,497). If you want that work scoped, it lives on <a href="/seo-services">SEO services</a>. The local system around the profile is in <a href="/blog/local-seo-get-found-get-called">local SEO that connects searches to calls</a>.</p>
<p>If the site the button opens is the weak half, fix that half. A free homepage preview takes 2 business days and does not ask for a card. Monthly plans are $0 down, cancel anytime, with a 30-day money-back guarantee. Numbers sit on <a href="/pricing">pricing</a>. The preview request sits on <a href="/contact">contact</a>. Do the profile pass this week either way. It does not require a new site, and the next person who searches you will meet whatever you leave on the card tonight.</p>`,
      },
    ],
    faqs: [
      {
        q: "Should I put my city in the business name?",
        a: "No. Use the real name customers already say. Adding a city or “best” to chase a search violates Google’s profile guidelines and confuses people who were given your actual name.",
      },
      {
        q: "I work from home. Do I show my address?",
        a: "If customers do not visit you, set up a service-area profile and list the towns you really cover. Do not publish a home address as a storefront or rent a mailbox to look local.",
      },
      {
        q: "How often should I post?",
        a: "When you have something true to say: holiday hours, a storm schedule, a service you can staff. A quiet profile with correct hours beats a noisy one with wrong ones. Plus includes two posts a month. That is housekeeping, not a rank promise.",
      },
      {
        q: "Does a profile tune-up include ongoing SEO?",
        a: "No. Lead System and Plus include a tune-up at launch, and Plus includes two posts a month. Ongoing SEO is quoted separately and is not part of the four website plans.",
      },
      {
        q: "What if I find two listings for the same shop?",
        a: "Claim the real one and clean up the duplicate so reviews and calls are not split. Do not start a third profile because the first looks messy.",
      },
      {
        q: "Can I list every town in a 60-mile circle?",
        a: "Only if you will actually take the work there. An oversized area creates estimates you decline. Match the profile to the service-area page on your site.",
      },
    ],
  },
};
