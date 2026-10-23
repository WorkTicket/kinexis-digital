// Long-form copy and optional media for each portfolio project.
// Add `liveUrl` when a project is publicly available and the "Go To The
// Website" button will render automatically. PageSpeed images are optional; the section stays hidden until a path is supplied.
export type ProjectDetail = {
  /** Paragraphs used under "About The {name} Project". */
  about: string[];
  liveUrl?: string;
  pagespeedImage?: string;
};

const pagespeed = (slug: string) => `/portfolio/${slug}-pagespeed.jpg`;

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "bluehaven-pool-care": {
    about: [
      "Bluehaven Pool Care needed a website that felt as calm and polished as the pools they maintain. We built a bright, water-inspired design with clear service pages, a simple quote path and photography that lets the finished work do the talking. Homeowners can quickly see weekly maintenance, repairs and seasonal openings without digging through a menu.",
      "Behind the scenes the site is built for speed on mobile, where most pool owners search. Every page has a focused call to action, clean headings and local SEO foundations, so Bluehaven can turn nearby searches into scheduled visits instead of chasing referrals.",
    ],
    pagespeedImage: pagespeed("bluehaven-pool-care"),
  },
  "breezeway-hvac": {
    about: [
      "Breezeway HVAC serves homeowners on the hottest and coldest days of the year, so the site had to make calling for help effortless. We paired a confident, comfort-focused visual style with emergency contact options, straightforward service descriptions and trust signals that answer the question every visitor has: can I rely on these people?",
      "The layout keeps the quote form and phone number within reach on every screen. Service pages are written around the problems customers actually search for, and the fast, accessible build gives the team a professional home base for ads, Google Business Profile traffic and repeat customers.",
    ],
    pagespeedImage: pagespeed("breezeway-hvac"),
  },
  "copperline-plumbing": {
    about: [
      "Copperline Plumbing wanted to look established without feeling corporate. We created a warm, trade-trusted design with direct language, real service categories and a quote request that takes less than a minute. Emergency repairs, installations and routine maintenance each get their own clear path.",
      "The site is structured so a visitor in a hurry can find the phone number immediately, while someone planning a larger project can read about the team, the process and the workmanship. Clean code and compressed imagery keep the experience quick even on a weak connection.",
    ],
    pagespeedImage: pagespeed("copperline-plumbing"),
  },
  "volterra-electric": {
    about: [
      "Volterra Electric needed a website that communicated safety, precision and modern capability. We built a high-contrast design around the services that matter most, from panel upgrades to lighting and EV chargers, with an emphasis on clear credentials and easy scheduling.",
      "The result feels technical without being cold. Visitors can compare services, understand what to expect and request a quote without leaving the page. The mobile experience is especially focused, because most electrical searches happen from the driveway or job site.",
    ],
    pagespeedImage: pagespeed("volterra-electric"),
  },
  "harlans-roofing": {
    about: [
      "Harlan's Roofing is built on reputation, so the website needed to show the scale and care behind every roof. We combined strong project photography with plain-spoken copy about inspections, repairs and full replacements. Homeowners can see the process and understand exactly what happens next.",
      "A prominent free-inspection offer, review highlights and a clean quote form make it easy to start a conversation. The structure also gives the team room to add neighborhood and service pages as they grow, without redesigning the site.",
    ],
    pagespeedImage: pagespeed("harlans-roofing"),
  },
  "liftline-garage-doors": {
    about: [
      "Liftline Garage Doors needed to turn quick searches into service calls. We designed a crisp, product-led site that shows door styles, repair capabilities and the speed of the team's response. The homepage gets straight to the point with a clear quote path and a phone number that stays visible.",
      "Product galleries give homeowners inspiration without slowing the page down. Every image is compressed, every section is structured for search, and the mobile layout keeps the forms and tap-to-call buttons comfortably within reach.",
    ],
    pagespeedImage: pagespeed("liftline-garage-doors"),
  },
  "brush-and-co": {
    about: [
      "Brush & Co is a template build for a painting and finishing business that wants to look creative and dependable at the same time. The design uses generous whitespace, strong project imagery and a simple color story that lets the work stand out.",
      "Service pages cover interior, exterior and specialty finishes, while the homepage moves visitors toward a free estimate. The template is quick to launch, easy to update and built on the same performance and SEO foundations as our custom projects.",
    ],
    pagespeedImage: pagespeed("brush-and-co"),
  },
  "oak-and-form": {
    about: [
      "Oak & Form pairs a refined visual style with the practical needs of a kitchen and bath remodeler. Large project photos, a clear process section and a consultation form help homeowners picture the result and take the first step.",
      "This template keeps the path to an estimate short without oversimplifying the work. It covers design, materials, timelines and service areas, giving a high-consideration buyer the detail they need before reaching out.",
    ],
    pagespeedImage: pagespeed("oak-and-form"),
  },
  clearpeak: {
    about: [
      "ClearPeak is a template site for a window and exterior cleaning company that lives on before-and-after results. We built a bright, high-trust layout with service bundles, a fast quote form and plenty of space for real job photos.",
      "The site is designed to convert on mobile, with tap-to-call buttons and short forms that fit the way customers search. Clean headings and location-friendly copy make it easy to expand into new service areas.",
    ],
    pagespeedImage: pagespeed("clearpeak"),
  },
  rinseworks: {
    about: [
      "Rinseworks needed a bold, energetic site for pressure washing and exterior cleaning. The template leads with dramatic imagery, clear pricing cues and a quote path that works in a few taps.",
      "Residential and commercial services are separated so visitors self-select quickly. The page structure leaves room for seasonal offers, before-and-after galleries and new neighborhoods without a rebuild.",
    ],
    pagespeedImage: pagespeed("rinseworks"),
  },
  "root-and-stone": {
    about: [
      "Root & Stone is a landscaping template built around craftsmanship and outdoor living. The design pairs natural textures with clean layouts, project galleries and service descriptions for design, installation and maintenance.",
      "A consultation form anchors the page, while trust-building details explain the process and the team behind the work. The responsive build keeps large landscape photos fast and readable on every device.",
    ],
    pagespeedImage: pagespeed("root-and-stone"),
  },
  "happy-yard": {
    about: [
      "Happy Yard makes a practical service feel friendly and easy to buy. The template uses playful but professional visuals, simple weekly-plan explanations and a quick signup path for pet waste removal and yard care.",
      "Service areas, pricing and scheduling are front and center, so customers can decide without a phone call. The site is lightweight, accessible and ready for local SEO as the route grows.",
    ],
    pagespeedImage: pagespeed("happy-yard"),
  },
  "afterglow-outdoor-lighting": {
    about: [
      "Afterglow Outdoor Lighting is built for the hours after sunset. The site leads with the finished glow of a home, then walks homeowners through pathway lighting, landscape accents and a visit they can schedule without a long form.",
      "Service descriptions stay specific to outdoor lighting, and the layout keeps the phone number and quote path close on every screen. It is a template a lighting company can launch quickly and still look like it was designed for evening work.",
    ],
  },
  "good-riddance-junk": {
    about: [
      "Good Riddance Junk needed a site that feels capable without feeling chaotic. We paired a bold, straightforward layout with clear job types, so a homeowner clearing a garage, a rental or a full house can see what happens next.",
      "The page puts the request form and the phone number up front. Short service sections explain hauling, cleanouts and the rooms they leave behind, which is what people search for when they want the stuff gone.",
    ],
  },
  "goodhand-home-services": {
    about: [
      "Goodhand Home Services covers the odd jobs that do not fit one trade. The template organizes repairs, fittings and finish work into a calm homepage, so a homeowner can tell what the team takes on before they call.",
      "Trust comes from the work itself: close-up craft, a clear process and a short way to describe the job. The site stays fast on a phone, which is where most of these searches start.",
    ],
  },
  "groundwork-coatings": {
    about: [
      "Groundwork Coatings sells a finish people have to see. The template gives the floor the room, with photography of prepared concrete and the coated result, plus plain language about what the process involves.",
      "A consultation path sits near the work, so a garage or shop owner can ask about their space without hunting through menus. The structure is ready for more project photos as the crew adds jobs.",
    ],
  },
  "stillwater-auto-detail": {
    about: [
      "Stillwater Auto Detail is a quieter take on a service that is usually loud. The site focuses on the finished car, the interior and the kind of care a regular client can book again, instead of a wall of packages.",
      "Mobile visitors can reach the shop in a tap. Service sections separate exterior, interior and the detail work itself, so the page answers the question and then gets out of the way.",
    ],
  },
  "sunday-house-cleaning": {
    about: [
      "Sunday House Cleaning is built around a recurring visit, not a one-time scrub. The template explains the rhythm of a clean home, with rooms people recognize and a simple way to ask about a regular schedule.",
      "The design stays bright and uncluttered, the way the service should feel. Forms are short, headings are easy to scan, and the page is ready for local search as the route grows.",
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}
