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
      "This Bluehaven Pool Care concept uses a calm, water-inspired look to explore how a pool company could present weekly care, repairs, and seasonal openings without making homeowners dig through a menu.",
      "The design keeps the quote path short and gives finished-work photography plenty of room. Its mobile layout, clear headings, and local-search structure show the foundation we would use for a real pool service business.",
    ],
    pagespeedImage: pagespeed("bluehaven-pool-care"),
  },
  "breezeway-hvac": {
    about: [
      "The Breezeway HVAC concept is built around the moments when a homeowner needs heating or cooling help quickly. A confident visual style, direct service descriptions, and visible contact options keep the first steps easy to understand.",
      "The phone number and quote form stay close on every screen. Separate service pages demonstrate how an HVAC company could support emergency searches, planned replacements, ads, and Google Business Profile visits from one organized site.",
    ],
    pagespeedImage: pagespeed("breezeway-hvac"),
  },
  "copperline-plumbing": {
    about: [
      "This Copperline Plumbing concept shows how a plumbing business could look established without feeling corporate. Warm colors, plain language, and separate paths for repairs, installations, and maintenance make the offer easy to scan.",
      "A visitor in a hurry can find the phone number right away, while someone planning a larger job can take time with the process and workmanship sections. Compressed images and a lean build keep the concept quick on slower connections.",
    ],
    pagespeedImage: pagespeed("copperline-plumbing"),
  },
  "volterra-electric": {
    about: [
      "The Volterra Electric concept uses a high-contrast design to communicate safety, precision, and modern electrical work. Panel upgrades, lighting, and EV chargers each have a clear place, along with room for real credentials.",
      "The layout feels technical without becoming cold or difficult to read. Visitors can compare services, understand the visit, and request a quote, with special attention to the phone experience people use from a driveway or job site.",
    ],
    pagespeedImage: pagespeed("volterra-electric"),
  },
  "harlans-roofing": {
    about: [
      "This Harlan's Roofing concept puts reputation and workmanship at the center. Large project photography and plain explanations separate inspections, repairs, and full replacements so homeowners can understand the process.",
      "The design pairs an inspection offer with review space and a short quote form. Its structure also leaves room for useful service and area pages without requiring the whole site to be redesigned later.",
    ],
    pagespeedImage: pagespeed("harlans-roofing"),
  },
  "liftline-garage-doors": {
    about: [
      "The Liftline Garage Doors concept separates urgent repairs from the slower decision of choosing a new door. A crisp, product-led layout shows repair options, door styles, and a direct path to a call or quote.",
      "Product galleries provide ideas without making the page heavy. Compressed images, search-friendly sections, and easy-to-reach mobile controls demonstrate how the design would work for a real garage door company.",
    ],
    pagespeedImage: pagespeed("liftline-garage-doors"),
  },
  "brush-and-co": {
    about: [
      "Brush & Co is a fictional template concept for a painting and finishing business. Generous space, strong project imagery, and a simple color palette let the visual work carry the page without losing a dependable feel.",
      "Separate pages cover interior, exterior, and specialty finishes, while the homepage leads toward an estimate. The concept shows how a template can launch quickly and still use the same performance and search foundations as a custom build.",
    ],
    pagespeedImage: pagespeed("brush-and-co"),
  },
  "oak-and-form": {
    about: [
      "Oak & Form is a remodeling concept that pairs a refined visual style with practical information. Large project photos, a clear process, and a consultation form show how homeowners could picture the work and take a first step.",
      "The template keeps the estimate path short without pretending a remodel is simple. Sections for design, materials, timelines, and service areas give a careful buyer useful context before reaching out.",
    ],
    pagespeedImage: pagespeed("oak-and-form"),
  },
  clearpeak: {
    about: [
      "ClearPeak is a fictional template for a window and exterior cleaning company, where before-and-after photos do most of the explaining. The bright layout includes service bundles, a short quote form, and space reserved for real job photos.",
      "Tap-to-call controls and compact forms suit the way customers search on a phone. Clear headings and an organized service-area section show how the site could expand without cloning pages for every town.",
    ],
    pagespeedImage: pagespeed("clearpeak"),
  },
  rinseworks: {
    about: [
      "Rinseworks is a bold concept for pressure washing and exterior cleaning. Dramatic imagery, useful pricing context, and a quote path that works in a few taps give the template an energetic but practical feel.",
      "Residential and commercial work are separated so visitors can choose the right path quickly. The structure leaves room for seasonal offers, before-and-after galleries, and new service areas without rebuilding the site.",
    ],
    pagespeedImage: pagespeed("rinseworks"),
  },
  "root-and-stone": {
    about: [
      "Root & Stone is a fictional landscaping template centered on craftsmanship and outdoor living. Natural textures, clean layouts, project galleries, and separate descriptions cover design, installation, and maintenance.",
      "A consultation form anchors the page while the surrounding sections explain how a project could move forward. The responsive layout is designed to keep large landscape images quick and readable across devices.",
    ],
    pagespeedImage: pagespeed("root-and-stone"),
  },
  "happy-yard": {
    about: [
      "Happy Yard is a fictional concept that gives a practical recurring service a friendly, professional look. Simple plan explanations and a short signup path cover pet-waste removal and yard care without overcomplicating either one.",
      "Service areas, pricing context, and scheduling sit near the top so a customer can understand the offer before calling. The lightweight layout also provides a clean base for local search as a route grows.",
    ],
    pagespeedImage: pagespeed("happy-yard"),
  },
  "afterglow-outdoor-lighting": {
    about: [
      "Afterglow Outdoor Lighting is a fictional concept designed around the hours after sunset. It begins with the finished glow of a home, then explains pathway lighting, landscape accents, and a visit that can be requested without a long form.",
      "The wording stays specific to outdoor lighting, while the phone number and quote path remain close on every screen. The concept shows how a focused template can still feel tailored to evening work.",
    ],
  },
  "good-riddance-junk": {
    about: [
      "The Good Riddance Junk concept uses a bold, straightforward layout without adding to the clutter. Clear job types help someone with a garage, rental, or full-house cleanout understand what happens next.",
      "The request form and phone number appear early. Short sections explain hauling and cleanouts in the practical terms people use when they are ready to clear a space.",
    ],
  },
  "goodhand-home-services": {
    about: [
      "Goodhand Home Services is a fictional handyman concept for jobs that do not fit neatly into one trade. The template organizes repairs, fittings, and finish work so a homeowner can see what is covered before calling.",
      "Close-up craft photography, a clear process, and a short way to describe the job do the trust-building work. The design stays light enough to load quickly on the phone where many of these searches begin.",
    ],
  },
  "groundwork-coatings": {
    about: [
      "Groundwork Coatings is a fictional concept for a service people need to see. The template gives the floor plenty of room, with space for prepared concrete, finished coatings, and a plain explanation of the process.",
      "A consultation path sits beside the work so a garage or shop owner can ask about the space without searching through menus. The structure can hold more real project photos as a coatings business builds its library.",
    ],
  },
  "stillwater-auto-detail": {
    about: [
      "Stillwater Auto Detail is a fictional concept with a quieter look than the category usually uses. It focuses on the finished car, interior work, and repeat care instead of filling the first screen with packages.",
      "A mobile visitor can reach the shop in a tap. Separate exterior, interior, and detail sections answer the basic questions without making the page feel crowded.",
    ],
  },
  "sunday-house-cleaning": {
    about: [
      "Sunday House Cleaning is a fictional concept built around recurring visits rather than a one-time clean. Familiar rooms and a simple schedule request help explain what regular service could look like.",
      "The design stays bright and uncluttered. Short forms, scannable headings, and a clear service-area structure provide a practical base for local search as a route grows.",
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}
