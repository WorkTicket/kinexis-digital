// Long-form copy and optional media for each portfolio project.
// Add `liveUrl` when a project is publicly available and the "Go To The
// Website" button will render automatically. PageSpeed images are optional; the section stays hidden until a path is supplied.
export type ProjectDetail = {
  /** Paragraphs used under "About The {name} Project". */
  about?: string[];
  liveUrl?: string;
  pagespeedImage?: string;
};

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "earthform-grading": {
    about: [
      "Earthform Grading is a website template for site grading, drainage prep, and outdoor earthwork. The layout shows finished grades and keeps the project request close.",
      "Residential and larger site work stay readable so a property owner can describe the job without a long form.",
    ],
  },
  "lockwell-door-hardware": {
    about: [
      "Lockwell Door Hardware is a website template for locks, hardware upgrades, and door repairs. Product-led imagery and a short quote path keep the page practical.",
      "Emergency and planned upgrade work stay easy to separate so a visitor can call now or request a measured quote.",
    ],
  },
  "docklight-marine-detail": {
    about: [
      "Docklight Marine Detail is a website template for boat cleaning and detailing. Bright waterfront photography carries the offer while booking stays simple.",
      "Wash, polish, and interior packages stay distinct so a boat owner can request the right service without digging through menus.",
    ],
  },
  "honeycomb-attic": {
    about: [
      "Honeycomb Attic Co. is a website template for insulation upgrades and attic air sealing. The page explains comfort and energy benefits without burying the estimate request.",
      "Service sections leave room for before-and-after photos and a short way to ask about the attic from a phone.",
    ],
  },
  "kiln-hearth-chimney": {
    about: [
      "Kiln Hearth & Chimney is a website template for inspections, sweeps, and fireplace repairs. The work sits up front with a clear path to schedule a visit.",
      "Seasonal maintenance and repair calls stay easy to tell apart, which helps a homeowner prepare before lighting the first fire of the season.",
    ],
  },
  "riverstone-basement": {
    about: [
      "Riverstone Basement Co. is a website template for waterproofing, sump systems, and finished basements. The page leads with dry-space proof and keeps the inspection request easy to spot.",
      "Repair and finishing paths stay separate so someone dealing with moisture can choose the next step without scanning the whole site.",
    ],
  },
  "brightburrow-wildlife": {
    about: [
      "Brightburrow Wildlife is a website template for humane wildlife removal and exclusion. The tone stays calm while the phone and visit request stay close.",
      "Service sections explain attic, chimney, and yard problems in plain language so a homeowner can act the same day.",
    ],
  },
  "tileline-bath-tile": {
    about: [
      "Tileline Bath & Tile is a website template for bathroom remodeling and tile installation. Finished rooms get the room they need, with a consultation path beside the work.",
      "The layout keeps material and project types readable so a visitor planning a shower, floor, or full bath can ask about the space without a long form.",
    ],
  },
  "graft-tree-care": {
    about: [
      "Graft Tree Care is a website template for pruning, removals, and storm work. Large outdoor photography carries the page while the next step stays easy to find.",
      "Job types stay distinct so a homeowner comparing a trim, a removal, or an emergency call can pick the right path quickly.",
    ],
  },
  "switchyard-heating-air": {
    about: [
      "Switchyard Heating & Air is a website template built for repair, replacement, and seasonal maintenance. The page separates same-day comfort calls from planned system upgrades.",
      "Clear headings, a strong phone path, and room for service-area towns keep the design useful for a local HVAC company.",
    ],
  },
  "undertow-drainage": {
    about: [
      "Undertow Drainage is a website template for foundation drains, downspouts, and wet-yard fixes. The layout leads with the problem a homeowner can see, then shows the repair path without burying the phone number.",
      "Service sections stay short and practical so someone dealing with standing water can choose a call or a quote from a phone.",
    ],
  },
  "liftline-garage-doors": {
    about: [
      "The Liftline Garage Doors template separates urgent repairs from the slower decision of choosing a new door. A crisp, product-led layout shows repair options, door styles, and a direct path to a call or quote.",
      "Product galleries provide ideas without making the page heavy. Compressed images, search-friendly sections, and easy-to-reach mobile controls demonstrate how the design would work for a real garage door company.",
    ],
  },
  "afterglow-outdoor-lighting": {
    about: [
      "Afterglow Outdoor Lighting is a website template designed around the hours after sunset. It begins with the finished glow of a home, then explains pathway lighting, landscape accents, and a visit that can be requested without a long form.",
      "The wording stays specific to outdoor lighting, while the phone number and quote path remain close on every screen. The focused template feels tailored to evening work.",
    ],
  },
  rinseworks: {
    about: [
      "Rinseworks is a bold template for pressure washing and exterior cleaning. Dramatic imagery, useful pricing context, and a quote path that works in a few taps give the design an energetic but practical feel.",
      "Residential and commercial work are separated so visitors can choose the right path quickly. The structure leaves room for seasonal offers, before-and-after galleries, and new service areas without rebuilding the site.",
    ],
  },
  "sunday-house-cleaning": {
    about: [
      "Sunday House Cleaning is a website template built around recurring visits rather than a one-time clean. Familiar rooms and a simple schedule request help explain what regular service could look like.",
      "The design stays bright and uncluttered. Short forms, scannable headings, and a clear service-area structure provide a practical base for local search as a route grows.",
    ],
  },
  "fieldstone-masonry": {
    about: [
      "Fieldstone Masonry is a professionally designed template for concrete, brick, and stone work. Finished masonry gets the room, and the kinds of jobs a homeowner is comparing stay easy to tell apart.",
      "A consultation path sits with the work so someone planning a wall, flatwork, or repair can ask about the project without searching through the page.",
    ],
  },
  "red-oak-roofing": {
    about: [
      "Red Oak Roofing is a professionally designed template for inspections, repairs, and replacements. The page leads with the work itself and keeps the next step easy to find.",
      "Service sections leave room for real project photos and a short way to request a look at the roof, without treating every job as the same call.",
    ],
  },
  "meridian-chauffeur": {
    about: [
      "Meridian Chauffeur is a professionally designed template for private transportation. The page presents arranged rides in a calm, service-led layout.",
      "The request path stays short so a visitor can describe the trip they need without digging through menus.",
    ],
  },
  "happy-yard": {
    about: [
      "Happy Yard is a website template for a residential pet-waste service. A friendly layout, simple plan explanations, and a short signup path keep a recurring visit easy to understand.",
      "Service areas, pricing context, and scheduling sit near the top so a customer can understand the offer before calling. The lightweight layout also provides a clean base for local search as a route grows.",
    ],
  },
  "good-riddance-junk": {
    about: [
      "The Good Riddance Junk template uses a bold, straightforward layout without adding to the clutter. Clear job types help someone with a garage, rental, or full-house cleanout understand what happens next.",
      "The request form and phone number appear early. Short sections explain hauling and cleanouts in the practical terms people use when they are ready to clear a space.",
    ],
  },
  "popwave-parties": {
    about: [
      "Popwave Parties is a professionally designed template for kids’ foam parties, birthdays, school events, and camps. The offer sits up front, with a bright layout that still stays easy to scan.",
      "Event types stay separate so a parent or organizer can see what is included and ask about a date without a long form.",
    ],
  },
  "basecoat-floors": {
    about: [
      "Basecoat Floors is a professionally designed template for concrete preparation and floor coatings. The layout is built around the finished floor, from the prepared slab to the coating.",
      "A consultation path sits with the work so a garage or shop owner can ask about the space before requesting a quote.",
    ],
  },
  "union-electric": {
    about: [
      "Union Electric Co. is a professionally designed template for electrical repairs, upgrades, and renovation work. The phone and quote path stay close while the services remain easy to scan.",
      "It is built for the way people look up an electrician: a clear offer, room for credentials, and a page that still reads well from a phone.",
    ],
  },
  "vantage-wraps": {
    about: [
      "Vantage Wraps is a professionally designed template for a vehicle wrap and graphics studio. Large vehicle photography carries the page, with room for styles and a straightforward way to start a project.",
      "Wrap, color, and graphics work stay distinct so a visitor can tell what the studio takes on.",
    ],
  },
  clearpeak: {
    about: [
      "ClearPeak is a professionally designed template for a window and exterior cleaning company, where before-and-after photos do most of the explaining. The bright layout includes service bundles, a short quote form, and space reserved for real job photos.",
      "Tap-to-call controls and compact forms suit the way customers search on a phone. Clear headings and an organized service-area section show how the site could expand without cloning pages for every town.",
    ],
  },
  "groundwork-coatings": {
    about: [
      "Groundwork Coatings is a professionally designed template for a service people need to see. The layout gives the floor plenty of room, with space for prepared concrete, finished coatings, and a plain explanation of the process.",
      "A consultation path sits beside the work so a garage or shop owner can ask about the space without searching through menus. The structure can hold more real project photos as a coatings business builds its library.",
    ],
  },
  jollyglow: {
    about: [
      "Jollyglow is a professionally designed template for seasonal holiday lighting. The page leads with the finished glow of a home and explains how a lighting visit is requested.",
      "The offer stays specific to seasonal lighting, with the phone and booking path kept close on every screen.",
    ],
  },
  haulgood: {
    about: [
      "Haulgood is a professionally designed template for junk removal and property cleanouts. Job types are easy to recognize before a visitor calls.",
      "The request form and phone number appear early, and short sections explain what a haul includes.",
    ],
  },
  spraycraft: {
    about: [
      "Spraycraft is a professionally designed template for exterior pressure washing. Surfaces and services are separated so a visitor can see what the wash covers.",
      "The quote path stays short, with room for before-and-after photos as a business adds its own work.",
    ],
  },
  slatewash: {
    about: [
      "Slatewash is a professionally designed template for residential and commercial exterior cleaning. Home and commercial work stay on separate paths so each visitor gets a clear next step.",
      "Service sections leave room for job photos and a short request, without crowding the first screen.",
    ],
  },
  "fieldwork-coaching": {
    about: [
      "Fieldwork Coaching is a professionally designed template for business coaching aimed at home service owners. Planning, team systems, and a simple way to start a conversation sit on one focused page.",
      "The layout stays practical: what the coaching covers, who it is for, and how to request a conversation.",
    ],
  },
  "tradeport-supply": {
    about: [
      "Tradeport Supply is a professionally designed template for wholesale supply and distribution. Packaging, facility supplies, and warehouse equipment are organized so a buyer can see the offer quickly.",
      "A direct inquiry path sits with the product groups, ready to be customized with a real catalog.",
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}
