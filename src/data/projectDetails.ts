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
      "This Bluehaven Pool Care template uses a calm, water-inspired look to present weekly care, repairs, and seasonal openings without making homeowners dig through a menu.",
      "The design keeps the quote path short and gives finished-work photography plenty of room. Its mobile layout, clear headings, and local-search structure show the foundation we would use for a real pool service business.",
    ],
    pagespeedImage: pagespeed("bluehaven-pool-care"),
  },
  "breezeway-hvac": {
    about: [
      "The Breezeway HVAC template is built around the moments when a homeowner needs heating or cooling help quickly. A confident visual style, direct service descriptions, and visible contact options keep the first steps easy to understand.",
      "The phone number and quote form stay close on every screen. Separate service pages demonstrate how an HVAC company could support emergency searches, planned replacements, ads, and Google Business Profile visits from one organized site.",
    ],
    pagespeedImage: pagespeed("breezeway-hvac"),
  },
  "copperline-plumbing": {
    about: [
      "This Copperline Plumbing template helps a plumbing business look established without feeling corporate. Warm colors, plain language, and separate paths for repairs, installations, and maintenance make the offer easy to scan.",
      "A visitor in a hurry can find the phone number right away, while someone planning a larger job can take time with the process and workmanship sections. Compressed images and a lean build keep the template quick on slower connections.",
    ],
    pagespeedImage: pagespeed("copperline-plumbing"),
  },
  "volterra-electric": {
    about: [
      "The Volterra Electric template uses a high-contrast design to communicate safety, precision, and modern electrical work. Panel upgrades, lighting, and EV chargers each have a clear place, along with room for real credentials.",
      "The layout feels technical without becoming cold or difficult to read. Visitors can compare services, understand the visit, and request a quote, with special attention to the phone experience people use from a driveway or job site.",
    ],
    pagespeedImage: pagespeed("volterra-electric"),
  },
  "harlans-roofing": {
    about: [
      "This Harlan's Roofing template puts reputation and workmanship at the center. Large project photography and plain explanations separate inspections, repairs, and full replacements so homeowners can understand the process.",
      "The design pairs an inspection offer with review space and a short quote form. Its structure also leaves room for useful service and area pages without requiring the whole site to be redesigned later.",
    ],
    pagespeedImage: pagespeed("harlans-roofing"),
  },
  "liftline-garage-doors": {
    about: [
      "The Liftline Garage Doors template separates urgent repairs from the slower decision of choosing a new door. A crisp, product-led layout shows repair options, door styles, and a direct path to a call or quote.",
      "Product galleries provide ideas without making the page heavy. Compressed images, search-friendly sections, and easy-to-reach mobile controls demonstrate how the design would work for a real garage door company.",
    ],
    pagespeedImage: pagespeed("liftline-garage-doors"),
  },
  "brush-and-co": {
    about: [
      "Brush & Co is a professionally designed template for a painting and finishing business. Generous space, strong project imagery, and a simple color palette let the visual work carry the page without losing a dependable feel.",
      "Separate pages cover interior, exterior, and specialty finishes, while the homepage leads toward an estimate. The template can launch quickly while using the same performance and search foundations as a custom build.",
    ],
    pagespeedImage: pagespeed("brush-and-co"),
  },
  "oak-and-form": {
    about: [
      "Oak & Form is a remodeling template that pairs a refined visual style with practical information. Large project photos, a clear process, and a consultation form help homeowners picture the work and take a first step.",
      "The template keeps the estimate path short without pretending a remodel is simple. Sections for design, materials, timelines, and service areas give a careful buyer useful context before reaching out.",
    ],
    pagespeedImage: pagespeed("oak-and-form"),
  },
  clearpeak: {
    about: [
      "ClearPeak is a professionally designed template for a window and exterior cleaning company, where before-and-after photos do most of the explaining. The bright layout includes service bundles, a short quote form, and space reserved for real job photos.",
      "Tap-to-call controls and compact forms suit the way customers search on a phone. Clear headings and an organized service-area section show how the site could expand without cloning pages for every town.",
    ],
    pagespeedImage: pagespeed("clearpeak"),
  },
  rinseworks: {
    about: [
      "Rinseworks is a bold template for pressure washing and exterior cleaning. Dramatic imagery, useful pricing context, and a quote path that works in a few taps give the design an energetic but practical feel.",
      "Residential and commercial work are separated so visitors can choose the right path quickly. The structure leaves room for seasonal offers, before-and-after galleries, and new service areas without rebuilding the site.",
    ],
    pagespeedImage: pagespeed("rinseworks"),
  },
  "root-and-stone": {
    about: [
      "Root & Stone is a professionally designed landscaping template centered on craftsmanship and outdoor living. Natural textures, clean layouts, project galleries, and separate descriptions cover design, installation, and maintenance.",
      "A consultation form anchors the page while the surrounding sections explain how a project could move forward. The responsive layout is designed to keep large landscape images quick and readable across devices.",
    ],
    pagespeedImage: pagespeed("root-and-stone"),
  },
  "happy-yard": {
    about: [
      "Happy Yard is a website template that gives a practical recurring service a friendly, professional look. Simple plan explanations and a short signup path cover pet-waste removal and yard care without overcomplicating either one.",
      "Service areas, pricing context, and scheduling sit near the top so a customer can understand the offer before calling. The lightweight layout also provides a clean base for local search as a route grows.",
    ],
    pagespeedImage: pagespeed("happy-yard"),
  },
  "afterglow-outdoor-lighting": {
    about: [
      "Afterglow Outdoor Lighting is a website template designed around the hours after sunset. It begins with the finished glow of a home, then explains pathway lighting, landscape accents, and a visit that can be requested without a long form.",
      "The wording stays specific to outdoor lighting, while the phone number and quote path remain close on every screen. The focused template feels tailored to evening work.",
    ],
    pagespeedImage: pagespeed("afterglow-outdoor-lighting"),
  },
  "good-riddance-junk": {
    about: [
      "The Good Riddance Junk template uses a bold, straightforward layout without adding to the clutter. Clear job types help someone with a garage, rental, or full-house cleanout understand what happens next.",
      "The request form and phone number appear early. Short sections explain hauling and cleanouts in the practical terms people use when they are ready to clear a space.",
    ],
    pagespeedImage: pagespeed("good-riddance-junk"),
  },
  "goodhand-home-services": {
    about: [
      "Goodhand Home Services is a professionally designed handyman template for jobs that do not fit neatly into one trade. It organizes repairs, fittings, and finish work so a homeowner can see what is covered before calling.",
      "Close-up craft photography, a clear process, and a short way to describe the job do the trust-building work. The design stays light enough to load quickly on the phone where many of these searches begin.",
    ],
    pagespeedImage: pagespeed("goodhand-home-services"),
  },
  "groundwork-coatings": {
    about: [
      "Groundwork Coatings is a professionally designed template for a service people need to see. The layout gives the floor plenty of room, with space for prepared concrete, finished coatings, and a plain explanation of the process.",
      "A consultation path sits beside the work so a garage or shop owner can ask about the space without searching through menus. The structure can hold more real project photos as a coatings business builds its library.",
    ],
    pagespeedImage: pagespeed("groundwork-coatings"),
  },
  "stillwater-auto-detail": {
    about: [
      "Stillwater Auto Detail is a website template with a quieter look than the category usually uses. It focuses on the finished car, interior work, and repeat care instead of filling the first screen with packages.",
      "A mobile visitor can reach the shop in a tap. Separate exterior, interior, and detail sections answer the basic questions without making the page feel crowded.",
    ],
    pagespeedImage: pagespeed("stillwater-auto-detail"),
  },
  "sunday-house-cleaning": {
    about: [
      "Sunday House Cleaning is a website template built around recurring visits rather than a one-time clean. Familiar rooms and a simple schedule request help explain what regular service could look like.",
      "The design stays bright and uncluttered. Short forms, scannable headings, and a clear service-area structure provide a practical base for local search as a route grows.",
    ],
    pagespeedImage: pagespeed("sunday-house-cleaning"),
  },
  "juniper-tree-co": {
    about: [
      "Juniper Tree Co is a professionally designed tree-care template that balances the urgency of hazardous work with the care expected around a home. Strong local imagery and clear service paths separate pruning, removal, plant health, and storm response.",
      "The page gives safety, planning, and cleanup room to build trust before the estimate request. Its responsive structure keeps those details readable for customers searching from a phone after spotting a problem outside.",
    ],
    pagespeedImage: pagespeed("juniper-tree-co"),
  },
  "ember-and-flue": {
    about: [
      "Ember & Flue is a professionally designed chimney and fireplace template with a warm editorial style. Sweeping, inspections, repairs, and fireplace care are organized around the questions a homeowner has before inviting a technician inside.",
      "Seasonal reminders and a straightforward booking path make the next step clear without relying on alarm. The design leaves useful space for real project photos, service areas, and educational content.",
    ],
    pagespeedImage: pagespeed("ember-and-flue"),
  },
  "cedarline-fence": {
    about: [
      "Cedarline Fence is a professionally designed fences-and-gates template that shows materials and finished boundaries clearly. The layout separates new installations, replacements, gates, and repairs while keeping consultation details close to the work.",
      "Project photography and a simple planning guide help homeowners compare directions before requesting an estimate. The mobile presentation keeps styles, process, and contact options easy to scan on site.",
    ],
    pagespeedImage: pagespeed("cedarline-fence"),
  },
  "highline-pest": {
    about: [
      "Highline Pest is a professionally designed pest-management template built around calm, useful guidance. Common pest concerns, treatment steps, and ongoing protection are easy to find without turning the page into a wall of warnings.",
      "A direct inspection path supports urgent visitors while the surrounding sections explain preparation and follow-up. The structure can grow with seasonal services and focused local-search pages.",
    ],
    pagespeedImage: pagespeed("highline-pest"),
  },
  "northstar-moving": {
    about: [
      "Northstar Moving is a professionally designed local-moving template that makes a complicated day feel more organized. Residential moves, apartments, packing help, and specialty items each lead toward a clear quote path.",
      "The page uses practical planning details and visible next steps to answer questions before a call. Its responsive design keeps the checklist and estimate flow useful while customers are away from a desk.",
    ],
    pagespeedImage: pagespeed("northstar-moving"),
  },
  "harborline-gutters": {
    about: [
      "Harborline Gutters is a professionally designed gutter-systems template focused on protecting the home rather than selling a generic exterior service. Installation, guards, drainage, and repair are shown with clear visual context.",
      "The design pairs project photography with a concise assessment path so homeowners can understand the likely next step. Service-area and educational sections provide room to support local search without cluttering the main page.",
    ],
    pagespeedImage: pagespeed("harborline-gutters"),
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}
