export type EnglishPostBody = {
  lead: string;
  sections: { h2: string; html: string }[];
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
      { h2: "Follow Up On The Call You Miss", html: `<p>You may be on a job when the next customer calls. On plans that include it, text-back sends a message to someone who called your tracking number.</p><p>It does not replace answering the phone. It gives the caller a way to reply while your hands are busy.</p>` },
      { h2: "Measure Calls And Real Requests", html: `<p>Visits alone do not show whether the site is helping. Review impressions, clicks, calls, replies to text-back, and genuine form inquiries.</p><p>If a page gets visits but no calls, check the headline, phone number, and next step before paying for more traffic.</p>` },
    ],
  },
  "small-business-marketing-budget": {
    lead: "A service business does not need a long list of subscriptions. It needs a site that works on a phone, a visible number, and a way to tell which calls and forms came through the site.",
    sections: [
      { h2: "Start With The Basics", html: `<p>Begin with dependable hosting, pages for the work you actually sell, and a phone number people can tap. Ads cannot fix a page that makes contact difficult.</p><p>Each Kinexis plan starts with a free homepage preview and no card. Website is $97 a month, Lead System is $197, Plus is $297, and Own It is a one-time $1,497 payment.</p>` },
      { h2: "Follow-Up Before Another Design Change", html: `<p>Lead System adds missed-call text-back, a Google review request after the job, and monthly reporting. Those tools cover the gap between a visit, a call, and the completed work.</p><p>Plus provides that follow-up in English and Spanish, along with a bilingual site. Own It is a one-time purchase without a monthly plan or the lead guarantee.</p>` },
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
      { h2: "Reply From Your Business Account", html: `<p>A short reply to a new review shows that a person is paying attention. Respond from the business’s own Google account.</p><p>Writing those replies is not included with every plan. Automated review requests are included with Lead System and Plus. Own It does not include that follow-up or the lead guarantee unless text-back is added.</p>` },
    ],
  },
};
