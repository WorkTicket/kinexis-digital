import type { QA } from "@/lib/content";

export type IndustryPoint = { title: string; text: string; icon: string };

export type FeatureKey = "calls" | "quote-requests" | "reviews" | "bookings" | "service-area";

export type Industry = {
  slug: string;
  name: string;
  /** One line on the hub and homepage cards. */
  card: string;
  projectSlug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  mark: string;
  sub: string;
  heroAlt: string;
  intro: [string, string];
  problemsTitle: string;
  problemsMark: string;
  problems: [IndustryPoint, IndustryPoint, IndustryPoint];
  servicesTitle: string;
  servicesMark: string;
  services: [IndustryPoint, IndustryPoint, IndustryPoint];
  serviceArea: string;
  features: [FeatureKey, FeatureKey, FeatureKey, FeatureKey];
  /** Replaces the shared feature sentence when this trade needs a more specific line. */
  featureText?: Partial<Record<FeatureKey, string>>;
  faqs: [QA, QA, QA];
  related: [string, string, string, string];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "plumbing",
    name: "Plumbing",
    card: "Leak calls, drains and water heaters",
    projectSlug: "copperline-plumbing",
    metaTitle: "Plumbing Website Design | Kinexis Digital",
    metaDescription: "Plumbing website design for service businesses across the United States. Pages for leaks, drains, and water heaters, with tap-to-call and review requests.",
    h1: "Plumbing Website Design That Gets the Call",
    mark: "Gets the Call",
    sub: "A plumbing site has to work while someone is standing in a puddle. Emergency repair, a slow drain and a water-heater quote are three different jobs.",
    intro: [
      "Most plumbing searches happen on a phone, often after hours, and the person calling is already comparing the first two shops that picked up. A homepage that leads with a slogan and hides the number is how those jobs go to the next listing.",
      "We build the site around the work you actually run: leaks and bursts, drains, water heaters, repipes and the remodel fixtures that can wait until tomorrow. You see a homepage preview before you pay.",
    ],
    problemsTitle: "Why plumbing sites lose the job",
    problemsMark: "lose the job",
    problems: [
      { title: "One page for every job", text: "A burst pipe and a bathroom remodel do not share a buyer. Mashing them into one services page makes both harder to find.", icon: "separate-service-pages" },
      { title: "The number is a scavenger hunt", text: "If click-to-call is below a stock photo and a paragraph about family values, the emergency caller is already gone.", icon: "visible-phone-number" },
      { title: "Missed calls stay missed", text: "You are under a sink. The next caller does not leave a voicemail. Text-back is how that lead still reaches you.", icon: "missed-call-follow-up" },
    ],
    heroAlt: "Plumber inspecting sink pipework, copper fitting, laptop and phone",
    servicesTitle: "Pages a plumbing site should have",
    servicesMark: "plumbing site",
    services: [
      { title: "Leak Repair", text: "Leaks, bursts and no-water calls, with hours that match the crew you actually staff.", icon: "leak-repair" },
      { title: "Drain Cleaning", text: "A separate path for clogs and camera work so it does not read like a water-heater ad.", icon: "drain-cleaning" },
      { title: "Water Heaters", text: "Repair versus replacement, the brands you install, and a straight way to ask for a quote.", icon: "water-heaters" },
    ],
    serviceArea: "One page for the cities you cover. Not a stack of thin city pages that all say the same thing.",
    features: ["calls", "quote-requests", "reviews", "service-area"],
    faqs: [
      { q: "Should a plumber advertise 24/7 if the shop closes at six?", a: "Only if someone answers. We write the hours you keep. A page that promises a night tech you do not have creates angry calls, not booked work." },
      { q: "Do the website plans include monthly SEO?", a: "Every site is built fast, with clear service pages and a structure Google can read. Ongoing SEO is quoted separately. It is not bundled into the four plans." },
      { q: "Can review requests go out after a plumbing job?", a: "On Lead System and Plus, a text goes out after the job with a direct link to your Google profile. You are not chasing people from the truck." },
    ],
    related: ["hvac", "electrical", "remodeling", "garage-doors"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    card: "No-cool repair and system replacement",
    projectSlug: "breezeway-hvac",
    metaTitle: "HVAC Websites for US Businesses | Kinexis Digital",
    metaDescription: "HVAC website design for service businesses across the United States. Separate paths for no-cool repair and system replacement, plus text-back and reviews.",
    h1: "HVAC Website Design for Repair and Replacement",
    mark: "Repair and Replacement",
    sub: "A no-cool call is not a system quote. The site should send each one down its own path, and stay honest in the weeks when the weather is boring.",
    intro: [
      "HVAC demand spikes when the house is miserable and goes quiet when it is not. A site that treats every month like July, or dumps repair, install and maintenance onto one page, spends the busy weeks confusing people and the slow weeks with nothing to offer.",
      "We separate same-day service from replacement and give maintenance its own job: fill the shoulder season. The homepage preview shows that structure before you commit to a plan.",
    ],
    problemsTitle: "What HVAC sites get wrong",
    problemsMark: "get wrong",
    problems: [
      { title: "Repair buried under a brand story", text: "Someone with no air conditioning wants hours, a service area and a number. They will not read three screens to find them.", icon: "repair-call-path" },
      { title: "Install treated like an emergency", text: "A replacement buyer is comparing quotes, efficiency and warranties. A giant “call now” banner is the wrong close.", icon: "replacement-quote-path" },
      { title: "No plan for the mild months", text: "Tune-ups and memberships are how trucks stay busy in April. They need a page, not a coupon taped to the repair menu.", icon: "seasonal-maintenance" },
    ],
    heroAlt: "HVAC technician, condenser, diagnostic gauges and website tablet",
    servicesTitle: "What we put on an HVAC site",
    servicesMark: "HVAC site",
    services: [
      { title: "No-Cool Repair", text: "Speed, hours and the symptoms people search. Written for a phone, not a brochure.", icon: "no-cool-repair" },
      { title: "System Replacement", text: "Options, what a consult includes, and financing only if you actually offer it.", icon: "system-replacement" },
      { title: "Maintenance", text: "A quieter offer for tune-ups and memberships, sold as fewer emergency visits.", icon: "maintenance" },
    ],
    serviceArea: "The cities your techs already drive. One clear page, not a copy of the homepage for every ZIP code.",
    features: ["calls", "quote-requests", "reviews", "service-area"],
    faqs: [
      { q: "Will the site push replacement when the caller needs a repair?", a: "No. Repair and replacement get separate pages and separate calls to action. Mixing them trains the wrong person to fill out the wrong form." },
      { q: "Can the site mention financing?", a: "Yes, on the install path, and only for financing you really offer. We do not invent terms." },
      { q: "What happens when a call comes in during a heat wave and nobody answers?", a: "Lead System and Plus text the missed caller back on your tracking number, after carrier approval. That is the follow-up while the board is full." },
    ],
    related: ["plumbing", "electrical", "roofing", "garage-doors"],
  },
  {
    slug: "electrical",
    name: "Electrical",
    card: "Panels, EV chargers and troubleshooting",
    projectSlug: "volterra-electric",
    metaTitle: "Electrician Website Design | Kinexis Digital",
    metaDescription: "Electrician website design for service businesses across the United States. Panel upgrades, EV chargers, and troubleshooting with tap-to-call follow-up.",
    h1: "Electrician Website Design People Trust Enough to Call",
    mark: "Trust Enough to Call",
    sub: "Electrical work is a trust sale. The site has to show the license, the kind of jobs you take, and a way to reach you that does not feel like a lead mill.",
    intro: [
      "Homeowners searching for a panel upgrade or an EV charger are nervous about who they let in the house. A template that could belong to any contractor, with no mention of licensing or the actual work, does not answer that.",
      "We build pages for the jobs that pay: troubleshooting, panels, EV chargers, lighting and the small repairs that fill a day. The copy stays specific to electrical work, and the preview lets you judge it before you buy.",
    ],
    problemsTitle: "Where electrician sites lose trust",
    problemsMark: "lose trust",
    problems: [
      { title: "No proof you are licensed", text: "License, insurance and the kind of work you will not touch belong where a nervous homeowner can see them.", icon: "license-proof" },
      { title: "EV chargers stuffed under “services”", text: "Charger installs are a research visit. They need their own page, not a bullet under outlet repair.", icon: "ev-charger-page" },
      { title: "Commercial and residential mixed", text: "A property manager and a homeowner with a dead outlet are not the same lead. Split them if you sell both.", icon: "separate-buyer-paths" },
    ],
    heroAlt: "Electrician, electrical panel, EV charger and website screens",
    servicesTitle: "Pages that match electrical search",
    servicesMark: "electrical search",
    services: [
      { title: "Panel Upgrades", text: "Outlets, breakers and partial outages, with a phone path for anything that smells like an emergency.", icon: "panel-upgrades" },
      { title: "EV Chargers", text: "When a panel is the job, what the visit includes, and how to ask for a quote.", icon: "ev-chargers" },
      { title: "Troubleshooting", text: "Home chargers you install, what the site visit checks, and a form that is not twelve fields.", icon: "troubleshooting" },
    ],
    serviceArea: "Where you roll a truck. Named once, clearly, instead of spun out into empty city pages.",
    features: ["calls", "quote-requests", "reviews", "service-area"],
    faqs: [
      { q: "Can you show my license number on the site?", a: "Yes. Send the number and the state. We put it where people look, not in a footer nobody opens." },
      { q: "I do residential only. Will the site still talk about commercial?", a: "No. We write the work you want. Advertising jobs you do not staff just creates calls you have to turn down." },
      { q: "How do reviews fit an electrical business?", a: "After a finished job, Lead System and Plus send a text with your Google review link. New reviews are how the next panel quote decides you are real." },
    ],
    related: ["hvac", "plumbing", "garage-doors", "remodeling"],
  },
  {
    slug: "roofing",
    name: "Roofing",
    card: "Repairs, replacements and storm calls",
    projectSlug: "harlans-roofing",
    metaTitle: "Roofing Website Design | Kinexis Digital",
    metaDescription: "Roofing website design for service businesses across the United States. Repair and replacement pages with a clear way to request an inspection.",
    h1: "Roofing Website Design for Inspections That Are Real",
    mark: "Inspections That Are Real",
    sub: "After a storm, every roofer sounds the same. The site should say what you repair, what you replace, and how an inspection actually works.",
    intro: [
      "Roofing searches split in two. A leak that needs a repair this week, and a replacement the owner has been putting off. Storm weeks add a third: people who have been called by three door-knockers and do not trust any of them.",
      "We write the difference. Repair pages ask for the visit. Replacement pages explain materials, what the inspection covers, and how you handle insurance questions without promising a claim outcome. You approve the homepage before anything is billed.",
    ],
    problemsTitle: "Roofing sites that all look like storm chasers",
    problemsMark: "storm chasers",
    problems: [
      { title: "Insurance claims you cannot control", text: "Promising a covered roof you have not seen is how trust dies. We describe your process, not a guaranteed payout.", icon: "insurance-process" },
      { title: "Repair and replacement on one page", text: "A shingle leak and a full tear-off are different quotes. Give each its own page and its own next step.", icon: "repair-replacement-pages" },
      { title: "Photos that are not your roofs", text: "Stock houses do not convince someone standing in their own driveway. We lay the site out for your photos, or quote a shoot separately.", icon: "real-project-photos" },
    ],
    heroAlt: "Roofer, shingle roof, construction detail and website screens",
    servicesTitle: "What belongs on a roofing site",
    servicesMark: "roofing site",
    services: [
      { title: "Roof Repairs", text: "Leaks, missing shingles and the visits you can schedule this week.", icon: "roof-repairs" },
      { title: "Roof Replacement", text: "Materials you install, what an inspection includes, and a short quote form.", icon: "replacements" },
      { title: "Storm Calls", text: "How you triage after weather, written so it does not read like a script from a call center.", icon: "storm-calls" },
    ],
    serviceArea: "The towns you will drive to for an inspection. One page, specific, not a city cloned fifty times.",
    features: ["calls", "quote-requests", "reviews", "service-area"],
    faqs: [
      { q: "Will you write insurance-claim copy?", a: "We will explain how you document a roof and what the homeowner should ask their carrier. We will not promise that a claim will be approved." },
      { q: "I do not have job photos yet. Can you still build the site?", a: "Yes. The free preview uses realistic layout copy so you can judge the design. Your photos replace placeholders before launch. We do not pass off stock jobs as yours." },
      { q: "Do roofers get the same four plans?", a: "Yes. Website, Lead System, Plus or Own It. Lead System and Plus add missed-call text-back and a review request after the job." },
    ],
    related: ["pressure-washing", "painting", "remodeling", "window-cleaning"],
  },
  {
    slug: "garage-doors",
    name: "Garage Doors",
    card: "Broken springs, openers and new doors",
    projectSlug: "liftline-garage-doors",
    metaTitle: "Garage Door Website Design | Kinexis Digital",
    metaDescription: "Garage door website design for service businesses across the United States. A repair path for broken springs and a separate quote path for new doors.",
    h1: "Garage Door Website Design for Repair and New Doors",
    mark: "Repair and New Doors",
    sub: "A broken spring is a same-day search. A new door is a style and price conversation. The site should not make those people fill out the same form.",
    intro: [
      "Garage door customers find you from the driveway, on a phone, with the door stuck open or a spring that just snapped. They want to know if you can come today, what it costs to look, and whether you sell the door or only the parts.",
      "We split repair from replacement. Repair pages lead with the phone. New-door pages show styles and a short way to ask for a measure. The preview is the homepage first, so you can see the split before you pick a plan.",
    ],
    problemsTitle: "Garage door sites that waste the emergency",
    problemsMark: "waste the emergency",
    problems: [
      { title: "A quote form on a broken spring", text: "Nobody with a door stuck open wants to type their window count. Give them a number. Save the form for a new door.", icon: "emergency-phone-path" },
      { title: "Styles with no prices context", text: "You do not have to publish a menu. You do have to say what changes the price: size, insulation, opener, haul-away.", icon: "quote-price-context" },
      { title: "No follow-up after the measure", text: "Replacement quotes go cold. A missed call during the install next door should still get a text.", icon: "quote-follow-up" },
    ],
    heroAlt: "Garage-door technician, modern garage, opener remote and laptop",
    servicesTitle: "Pages a garage door company needs",
    servicesMark: "garage door",
    services: [
      { title: "Broken Springs", text: "The dangerous jobs, with a clear warning not to DIY and a tap-to-call.", icon: "broken-springs" },
      { title: "Opener Repair", text: "Repair versus a new operator, including the brands you actually stock.", icon: "opener-repair" },
      { title: "New Doors", text: "Style, insulation and a request for a measure. Built for someone comparing two quotes.", icon: "new-doors" },
    ],
    serviceArea: "How far you drive for a same-day repair, which is often tighter than your install radius.",
    features: ["calls", "quote-requests", "reviews", "service-area"],
    faqs: [
      { q: "Should repair and new doors be different pages?", a: "Yes. Repair is a phone call. A new door is a measure and a quote. One page trying to do both usually does neither." },
      { q: "Can the site list the door brands I sell?", a: "Yes. Send the brands you are authorized to sell. We will not invent a lineup." },
      { q: "How fast can a small edit go live after launch?", a: "It depends on the plan. Website includes up to two small edits a month. Lead System and Plus include unlimited small edits, handled one at a time." },
    ],
    related: ["electrical", "hvac", "roofing", "plumbing"],
  },
  {
    slug: "painting",
    name: "Painting",
    card: "Interior, exterior and cabinet finishes",
    projectSlug: "brush-and-co",
    metaTitle: "Painter Website Design | Kinexis Digital",
    metaDescription: "Painter website design for service businesses across the United States. Interior, exterior, and cabinet pages with a clear estimate path and review requests.",
    h1: "Painter Website Design That Wins the Estimate",
    mark: "Wins the Estimate",
    sub: "Painting is judged on photos and how easy it is to book a walkthrough. A site that looks like a handyman coupon page underprices you before the first call.",
    intro: [
      "People hiring a painter already know they need paint. They are deciding who will prep, who will show up, and who will not leave tape on the glass. Color grids and a phone number are not that argument.",
      "We separate interior, exterior and cabinet or trim work, then make the estimate path obvious: what you need from them, whether you quote from photos, and how a walkthrough is booked. The homepage preview comes first.",
    ],
    problemsTitle: "Why painting sites fail to get estimates",
    problemsMark: "get estimates",
    problems: [
      { title: "Interior and exterior treated as one job", text: "A single room and a two-story exterior are different crews, seasons and prices. Split the pages.", icon: "interior-exterior-pages" },
      { title: "No finished-work photos", text: "Painting is visual. The layout leaves room for your rooms, not a stock living room with the tags still on the pillows.", icon: "finished-work-gallery" },
      { title: "A form that asks for too much", text: "Room count, photos and a neighborhood are enough to know if the lead is real. A novel is why they call the next painter.", icon: "short-estimate-form" },
    ],
    heroAlt: "Painter, roller, paint samples, cabinet detail and website screens",
    servicesTitle: "What a painting site should explain",
    servicesMark: "painting site",
    services: [
      { title: "Interior Painting", text: "Rooms, prep, and how you protect floors and furniture.", icon: "interior" },
      { title: "Exterior Painting", text: "Siding, trim and the season you will and will not schedule.", icon: "exterior" },
      { title: "Cabinet Finishes", text: "The finer work, priced and described apart from a whole-house repaint.", icon: "cabinet-finishes" },
    ],
    serviceArea: "The neighborhoods you will drive to for a walkthrough. One page, not a cloned city for every ZIP code.",
    features: ["quote-requests", "calls", "reviews", "service-area"],
    featureText: { "quote-requests": "Photos, walkthrough, and when they should expect a number. One page, in plain language." },
    faqs: [
      { q: "Can customers request an estimate from the site?", a: "Yes. The form asks for the kind of work, a way to reach them, and photos if they have them. You see it as a tracked form lead." },
      { q: "I paint in English and Spanish. Is there a plan for that?", a: "Plus is the bilingual plan: the site, text-back and review requests in English and Spanish." },
      { q: "Do you write the page copy?", a: "We can use copy you already have, or quote writing separately. The free preview uses realistic copy for the trade so you can judge the layout." },
    ],
    related: ["remodeling", "pressure-washing", "roofing", "window-cleaning"],
  },
  {
    slug: "remodeling",
    name: "Remodeling",
    card: "Kitchens, baths and the longer quote",
    projectSlug: "oak-and-form",
    metaTitle: "Remodeling Website Design | Kinexis Digital",
    metaDescription: "Remodeling website design for service businesses across the United States. Kitchen and bath galleries with a consult path that fits a longer sales cycle.",
    h1: "Remodeling Website Design for Kitchens and Baths",
    mark: "Kitchens and Baths",
    sub: "A remodel is a long sale. The site should show finished rooms, explain how a project starts, and not shout like a drain-cleaning ad.",
    intro: [
      "Kitchen and bath leads do not convert on the first visit the way a no-heat call does. People look at photos, check that you pull permits if that is your work, and then request a consult. A site built like an emergency plumber throws that lead away.",
      "We lead with the rooms, the process and what you need from them before a number exists. Service pages stay specific: kitchens, baths, and the other remodels you want, not a junk drawer of every trade you have ever touched.",
    ],
    problemsTitle: "Remodeling sites that scare off the consult",
    problemsMark: "scare off",
    problems: [
      { title: "No project photos above the fold", text: "The first screen is the portfolio. If it is a stock kitchen, the real photos three scrolls down never get seen.", icon: "first-screen-portfolio" },
      { title: "A fake starting price", text: "“Kitchens from $9,999” trains the wrong lead. Describe what changes the budget instead of inventing a floor.", icon: "honest-budget-context" },
      { title: "Emergency language on a design project", text: "“Call now” is right for a leak. A remodel needs a consult, a timeline and a person who answers.", icon: "consultation-path" },
    ],
    heroAlt: "Kitchen, material samples, plans, contractor and laptop",
    servicesTitle: "Pages a remodeler should publish",
    servicesMark: "remodeler",
    services: [
      { title: "Kitchens", text: "Scope you take, what the consult covers, and a gallery that is actually your work.", icon: "kitchens" },
      { title: "Bathrooms", text: "Separate from kitchens. Different budget, different photos, different questions.", icon: "bathrooms" },
      { title: "Detailed Estimates", text: "Design, selections, build, and how change orders work. This is the trust page.", icon: "detailed-estimates" },
    ],
    serviceArea: "How far you will drive for a consult. Remodel radiuses are smaller than people assume.",
    features: ["quote-requests", "calls", "reviews", "service-area"],
    faqs: [
      { q: "Will the site promise a project price?", a: "Only if you give us a range you are willing to say in public. Otherwise we explain what the consult covers and how a quote is built." },
      { q: "Can I start with a handful of project photos?", a: "Yes. The layout is built for real rooms. A few strong projects beat a grid of borrowed images." },
      { q: "Is a remodel a fit for the monthly plans?", a: "Yes. The site is the same four plans. Lead System and Plus still help: missed-call text-back while you are on a jobsite, and a review request when the project is done." },
    ],
    related: ["painting", "plumbing", "electrical", "roofing"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    card: "Maintenance routes and design-build work",
    projectSlug: "root-and-stone",
    metaTitle: "Landscaping Website Design | Kinexis Digital",
    metaDescription: "Landscaping website design for service businesses across the United States. Weekly maintenance and design-build kept on separate pages.",
    h1: "Landscaping Website Design for Routes and Projects",
    mark: "Routes and Projects",
    sub: "Mowing routes and a patio install are different businesses that often share a truck. The site should not pretend they are the same lead.",
    intro: [
      "A homeowner who wants a weekly cut is shopping price, reliability and whether you serve their neighborhood. A homeowner who wants a patio is shopping photos and whether you design or only install. One “landscaping services” page fails both.",
      "We split maintenance from project work, name the service area you can actually crew, and leave the design honest about seasonality. You see the homepage before you choose a plan.",
    ],
    problemsTitle: "Landscaping sites that attract the wrong work",
    problemsMark: "wrong work",
    problems: [
      { title: "Maintenance hidden under design photos", text: "If the homepage is all flagstone, the weekly-mow lead assumes you are too expensive and leaves.", icon: "maintenance-service-page" },
      { title: "Projects with no process", text: "Design-build needs a consult path: site visit, concept, install. A phone number alone is not a process.", icon: "project-process" },
      { title: "A service area you cannot staff", text: "Listing the whole metro when you run two crews creates quotes you cannot schedule.", icon: "realistic-service-area" },
    ],
    heroAlt: "Landscape designer, planting plan, finished garden and laptop",
    servicesTitle: "How we structure a landscaping site",
    servicesMark: "landscaping site",
    services: [
      { title: "Maintenance Routes", text: "Mowing, beds, cleanups and what a route agreement includes.", icon: "maintenance-routes" },
      { title: "Landscape Design", text: "Patios, plantings and the other projects you want photos to sell.", icon: "landscape-design" },
      { title: "Design-Build", text: "Cleanups, mulch and the offers that belong in spring and fall, not in January copy.", icon: "design-build" },
    ],
    serviceArea: "Neighborhoods and towns on the route. Specific, and short enough to be true.",
    features: ["bookings", "quote-requests", "service-area", "reviews"],
    faqs: [
      { q: "Should weekly mowing and hardscape be on the same site?", a: "Same site, different pages. The calls to action stay different so a mowing lead is not asked to book a design consult." },
      { q: "Can the site talk about seasons?", a: "Yes. We write what you sell in spring, summer and fall, and we do not leave a winter cleanup offer up as if it were July." },
      { q: "How do reviews work for a route business?", a: "Lead System and Plus send a review request by text after a job. For weekly accounts, you choose when that ask goes out so you are not texting the same lawn every Tuesday." },
    ],
    related: ["yard-care", "pressure-washing", "pool-care", "window-cleaning"],
  },
  {
    slug: "pool-care",
    name: "Pool Care",
    card: "Weekly service, repairs and equipment",
    projectSlug: "bluehaven-pool-care",
    metaTitle: "Pool Service Website Design | Kinexis Digital",
    metaDescription: "Pool service website design for businesses across the United States. Weekly routes, repairs, and equipment, with a clear service area and review requests.",
    h1: "Pool Service Website Design for Routes and Repairs",
    mark: "Routes and Repairs",
    sub: "Weekly pool routes are won on reliability and the map you cover. A green pool or a dead pump is a different call, and it should not wait behind a membership pitch.",
    intro: [
      "Pool companies lose leads in two directions. Route customers cannot tell if you service their neighborhood. Repair customers with cloudy water cannot find a number because the homepage is a gallery of resort pools you did not build.",
      "We make the weekly service obvious, give repairs and equipment their own pages, and state the area your techs already drive. The free preview is a homepage in that shape, before you pick Website, Lead System, Plus or Own It.",
    ],
    problemsTitle: "Pool sites that do not match the route",
    problemsMark: "the route",
    problems: [
      { title: "A resort photo for a weekly route", text: "If you service residential pools, show that. A hotel waterline sets a price expectation you do not want.", icon: "residential-pool-proof" },
      { title: "Repairs with no path", text: "Pumps, heaters and green pools are urgent. They need a page and a phone, not a footnote under “full service.”", icon: "repair-call-path" },
      { title: "Neighborhoods you do not drive", text: "Route density matters. The service area should match the days you already run.", icon: "route-coverage" },
    ],
    heroAlt: "Pool technician, pool equipment, water and website tablet",
    servicesTitle: "Pages a pool company should have",
    servicesMark: "pool company",
    services: [
      { title: "Weekly Service", text: "What a visit includes, how often you come, and how a route slot is requested.", icon: "weekly-service" },
      { title: "Pool Repairs", text: "Green pools, equipment failures and the calls that cannot wait for the next route day.", icon: "repairs" },
      { title: "Equipment", text: "Pumps, heaters and the brands you install, separate from the weekly visit.", icon: "equipment" },
    ],
    serviceArea: "The neighborhoods on the route, written as one page you can stand behind.",
    features: ["bookings", "calls", "service-area", "reviews"],
    faqs: [
      { q: "Can the site sell weekly service and one-time repairs?", a: "Yes. They are separate pages with separate next steps, so a green-pool call is not asked to join a route first." },
      { q: "Do you build pool construction sites?", a: "This page is for service, repair and equipment. If you also remodel pools, we will say so only where that work is real." },
      { q: "What does the free preview include?", a: "A homepage concept for your trade. No card and no obligation. The full site starts after you approve it and choose a plan." },
    ],
    related: ["landscaping", "pressure-washing", "yard-care", "window-cleaning"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    card: "Houses, concrete and roof soft washes",
    projectSlug: "rinseworks",
    metaTitle: "Pressure Washing Websites | Kinexis Digital",
    metaDescription: "Pressure washing website design for businesses across the United States. Houses, concrete, and roof washes with a short quote form.",
    h1: "Pressure Washing Websites That Show the Before and After",
    mark: "Before and After",
    sub: "This trade is won with photos and a fast quote. A site that talks about “solutions” and never shows a driveway is asking people to imagine the result.",
    intro: [
      "House washes, concrete, fences and roof soft washes are different chemicals, different risk and different prices. Customers still lump them together until the site teaches the difference.",
      "We give each surface its own page, build the layout around before-and-after photos, and keep the quote form short: address, surface, and a photo if they have one. You see that homepage as a free preview first.",
    ],
    problemsTitle: "Pressure washing sites that all read alike",
    problemsMark: "read alike",
    problems: [
      { title: "Every surface on one list", text: "A roof wash is not a driveway. Separate pages keep the quote, and the risk, honest.", icon: "surface-service-pages" },
      { title: "No before-and-after", text: "The proof is the photo pair. The template should expect it, not treat images as decoration.", icon: "before-after-proof" },
      { title: "Quotes that start from nothing", text: "Ask for the surface and a photo. Guessing square footage from a name and email wastes the visit.", icon: "photo-based-quotes" },
    ],
    heroAlt: "Surface-cleaning equipment, driveway cleaning and laptop",
    servicesTitle: "Pages that match how people search",
    servicesMark: "people search",
    services: [
      { title: "House Washing", text: "Siding types you will and will not wash, and what the visit includes.", icon: "house-washing" },
      { title: "Concrete Cleaning", text: "Oil, rust and the flatwork jobs that are a different search than a house wash.", icon: "concrete-cleaning" },
      { title: "Roof Washing", text: "Soft wash only if that is what you do, with the safety limits written down.", icon: "roof-washing" },
    ],
    serviceArea: "How far you will drive a rig. Washing routes die when the area is a wish list.",
    features: ["quote-requests", "calls", "service-area", "reviews"],
    faqs: [
      { q: "What if I do not wash roofs?", a: "Then the site will not offer roof washing. We would rather miss a keyword than book a job you do not want." },
      { q: "Can customers attach a photo to the quote form?", a: "The form can ask them to reply with photos, or we can keep it to the details you need and have you request pictures by text. We will not bolt on a heavy upload tool you do not need." },
      { q: "Is ongoing SEO included?", a: "The site ships with clean structure, fast pages and real service pages. Ongoing SEO is a separate quote. It is not part of the four website plans." },
    ],
    related: ["roofing", "painting", "window-cleaning", "landscaping"],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    card: "Home routes and storefront schedules",
    projectSlug: "clearpeak",
    metaTitle: "Window Cleaning Websites | Kinexis Digital",
    metaDescription: "Window cleaning website design for businesses across the United States. Home routes, storefronts, and a simple way to book recurring visits.",
    h1: "Window Cleaning Websites for Routes and Storefronts",
    mark: "Routes and Storefronts",
    sub: "A house and a storefront are both glass, and they are not the same sale. One is a route. The other is a schedule a manager has to approve.",
    intro: [
      "Window cleaning is a recurring business. The site has to make the first clean easy to book and make the return visit feel obvious: how often, what is included, and whether screens, tracks and hard-water stains are in or out.",
      "We split homes from commercial glass, state the stories and reach you will take, and keep the service area tied to the route. The homepage preview shows that before you pay.",
    ],
    problemsTitle: "Window sites that under-explain the visit",
    problemsMark: "under-explain",
    problems: [
      { title: "Homes and storefronts combined", text: "A homeowner and a property manager need different proof and a different ask.", icon: "residential-commercial-paths" },
      { title: "No word on what is included", text: "Screens, sills and interior glass are why quotes get disputed. Say what the visit covers.", icon: "visit-inclusions" },
      { title: "No path back to a recurring clean", text: "The first job is the ad. The route is the business. The site should offer both.", icon: "recurring-cleaning-path" },
    ],
    heroAlt: "Window cleaner, storefront glass, squeegee and website screens",
    servicesTitle: "What we publish for window cleaners",
    servicesMark: "window cleaners",
    services: [
      { title: "Residential Windows", text: "Stories you will climb, interior versus exterior, and how to request a first clean.", icon: "home-routes" },
      { title: "Storefronts", text: "A commercial path with a schedule, not a coupon meant for a three-bed house.", icon: "storefronts" },
      { title: "Recurring Routes", text: "Monthly or quarterly, written as the normal next step after the first visit.", icon: "recurring-routes" },
    ],
    serviceArea: "The neighborhoods on the route. Tight and true, so the drive time still works.",
    features: ["bookings", "calls", "service-area", "reviews"],
    faqs: [
      { q: "Can the site offer one-time and recurring cleans?", a: "Yes. The first clean and the route are both on the site, with the route presented as the thing most customers should be on." },
      { q: "I also wash gutters or do light pressure washing. Should that be on this site?", a: "If it is a real service with its own price, it gets its own page. If it is a side add-on you rarely want, we leave it off." },
      { q: "How do I get reviews without asking at the door?", a: "Lead System and Plus text a Google review link after the job. You pick the timing so a first clean can earn the review before you sell the route." },
    ],
    related: ["pressure-washing", "painting", "landscaping", "yard-care"],
  },
  {
    slug: "yard-care",
    name: "Yard Care",
    card: "Weekly lawn routes and pet-waste stops",
    projectSlug: "happy-yard",
    metaTitle: "Lawn Care Website Design | Kinexis Digital",
    metaDescription: "Lawn care website design for service businesses across the United States. Recurring routes, including pet-waste service, with a simple way to sign up.",
    h1: "Lawn and Yard Care Website Design for Recurring Routes",
    mark: "Recurring Routes",
    sub: "Yard care is won street by street. The site should say what the visit includes, which neighborhoods you run, and how someone gets on the route.",
    intro: [
      "Lawn routes, cleanup and pet-waste service live or die on density. A website that claims the whole city, then describes nothing about the visit, attracts leads your crew cannot absorb and gives the right neighborhood nothing specific to trust.",
      "We write the services you repeat every week, name the areas you already drive, and make signup a short form instead of a phone tag game. Pet-waste service gets its own page when that is a real offer, not a joke in the footer.",
    ],
    problemsTitle: "Yard-care sites that fight the route",
    problemsMark: "fight the route",
    problems: [
      { title: "A citywide promise", text: "Saying you serve everywhere is how you book a lawn 40 minutes off the route. Publish the area you want.", icon: "route-service-area" },
      { title: "Pet waste treated as an afterthought", text: "If you sell it, it is its own search and its own page. If you do not, leave it off.", icon: "pet-waste-service-page" },
      { title: "No explanation of the visit", text: "Mow, edge, blow, waste removal: people want the list before they hand you a gate code.", icon: "visit-inclusions" },
    ],
    heroAlt: "Lawn-care owner, mower, dog, waste station and tablet",
    servicesTitle: "Pages a yard-care route needs",
    servicesMark: "yard-care route",
    services: [
      { title: "Lawn Routes", text: "What every visit includes and how often you come in growing season.", icon: "lawn-routes" },
      { title: "Pet-Waste Service", text: "Leaf and seasonal work, offered when you have the crew, not as a permanent emergency.", icon: "pet-waste" },
      { title: "Recurring Bookings", text: "A straight page for the service: frequency, yards you will take, and how to start.", icon: "recurring-bookings" },
    ],
    serviceArea: "One service-area page for the streets you run. Not a cloned page per subdivision.",
    features: ["bookings", "calls", "service-area", "reviews"],
    faqs: [
      { q: "Should I have a separate page for every neighborhood?", a: "No. One honest service-area page beats twenty thin pages that swap the town name. Thin city pages are how sites get ignored, not how they rank." },
      { q: "Can pet-waste customers sign up without calling?", a: "Yes. A short form is enough: name, address, how often, and how to reach them. You see it as a form lead." },
      { q: "Which plan fits a route business?", a: "Website if you only need the site. Lead System if you also want missed-call text-back, review requests and a monthly report. Plus adds Spanish." },
    ],
    related: ["landscaping", "pool-care", "pressure-washing", "window-cleaning"],
  },
];

/** Old industry URLs that no longer match this site. They 301 to the hub. */
export const RETIRED_INDUSTRY_SLUGS = [
  "automotive",
  "beauty-wellness",
  "construction",
  "dental",
  "ecommerce",
  "education",
  "financial-services",
  "fintech",
  "fitness",
  "healthcare",
  "home-services",
  "legal",
  "professional-services",
  "real-estate",
  "restaurants",
  "saas",
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}

export function relatedIndustries(industry: Industry): Industry[] {
  return industry.related.flatMap((slug) => {
    const match = getIndustry(slug);
    return match ? [match] : [];
  });
}
