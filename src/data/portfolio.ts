// Portfolio templates. Screenshots are full-page desktop captures that scroll
// inside the browser frame (see components/ShotFrame.tsx).
export type SiteKind = "custom" | "template";

export type Project = {
  slug: string;
  name: string;
  /** Category shown on the portfolio cards. */
  trade: string;
  /** Broad filter group. */
  group: string;
  /** Custom build or template build. */
  kind: SiteKind;
  image: string;
  /** Supplied lossless four-device preview. */
  deviceImage: string;
  width: number;
  height: number;
  /** Indicates a placeholder card with no detail page. */
  placeholder?: boolean;
  /** Opt in only when this is a real, distinct indexable case study. */
  indexable?: boolean;
};

export const PROJECTS: Project[] = [
  { slug: "tileline-bath-tile", name: "Tileline Bath & Tile", trade: "Bath & Tile", group: "Design & Build", kind: "template", image: "/portfolio/tileline-bath-tile.webp", deviceImage: "/portfolio/tileline-bath-tile-devices.webp", width: 1600, height: 8754 },
  { slug: "kiln-hearth-chimney", name: "Kiln Hearth & Chimney", trade: "Chimney & Fireplace", group: "Home Services", kind: "template", image: "/portfolio/kiln-hearth-chimney.webp", deviceImage: "/portfolio/kiln-hearth-chimney-devices.webp", width: 1600, height: 9031 },
  { slug: "switchyard-heating-air", name: "Switchyard Heating & Air", trade: "HVAC", group: "Home Services", kind: "template", image: "/portfolio/switchyard-heating-air.webp", deviceImage: "/portfolio/switchyard-heating-air-devices.webp", width: 1600, height: 9099 },
  { slug: "meridian-chauffeur", name: "Meridian Chauffeur", trade: "Private Transportation", group: "Specialty", kind: "template", image: "/portfolio/meridian-chauffeur.webp", deviceImage: "/portfolio/meridian-chauffeur-devices.webp", width: 1600, height: 10401 },
  { slug: "good-riddance-junk", name: "Good Riddance Junk", trade: "Junk Removal", group: "Home Services", kind: "template", image: "/portfolio/good-riddance-junk.webp", deviceImage: "/portfolio/good-riddance-junk-devices.webp", width: 1600, height: 10680 },
  { slug: "happy-yard", name: "Happy Yard", trade: "Pet Waste Removal", group: "Outdoor Living", kind: "template", image: "/portfolio/happy-yard.webp", deviceImage: "/portfolio/happy-yard-devices.webp", width: 1600, height: 8553 },
  { slug: "slatewash", name: "Slatewash", trade: "Exterior Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/slatewash.webp", deviceImage: "/portfolio/slatewash-devices.webp", width: 1600, height: 14011 },
  { slug: "brightburrow-wildlife", name: "Brightburrow Wildlife", trade: "Wildlife Control", group: "Home Services", kind: "template", image: "/portfolio/brightburrow-wildlife.webp", deviceImage: "/portfolio/brightburrow-wildlife-devices.webp", width: 1600, height: 8518 },
  { slug: "basecoat-floors", name: "Basecoat Floors", trade: "Floor Coatings", group: "Design & Build", kind: "template", image: "/portfolio/basecoat-floors.webp", deviceImage: "/portfolio/basecoat-floors-devices.webp", width: 1600, height: 11314 },
  { slug: "vantage-wraps", name: "Vantage Wraps", trade: "Vehicle Wraps", group: "Specialty", kind: "template", image: "/portfolio/vantage-wraps.webp", deviceImage: "/portfolio/vantage-wraps-devices.webp", width: 1600, height: 14164 },
  { slug: "rinseworks", name: "Rinseworks", trade: "Pressure Washing", group: "Cleaning", kind: "template", image: "/portfolio/rinseworks.webp", deviceImage: "/portfolio/rinseworks-devices.webp", width: 1600, height: 12058 },
  { slug: "union-electric", name: "Union Electric Co.", trade: "Electrical", group: "Home Services", kind: "template", image: "/portfolio/union-electric.webp", deviceImage: "/portfolio/union-electric-devices.webp", width: 1600, height: 10669 },
  { slug: "graft-tree-care", name: "Graft Tree Care", trade: "Tree Care", group: "Outdoor Living", kind: "template", image: "/portfolio/graft-tree-care.webp", deviceImage: "/portfolio/graft-tree-care-devices.webp", width: 1600, height: 8384 },
  { slug: "spraycraft", name: "Spraycraft", trade: "Pressure Washing", group: "Cleaning", kind: "template", image: "/portfolio/spraycraft.webp", deviceImage: "/portfolio/spraycraft-devices.webp", width: 1600, height: 11176 },
  { slug: "haulgood", name: "Haulgood", trade: "Junk Removal", group: "Home Services", kind: "template", image: "/portfolio/haulgood.webp", deviceImage: "/portfolio/haulgood-devices.webp", width: 1600, height: 9886 },
  { slug: "red-oak-roofing", name: "Red Oak Roofing", trade: "Roofing", group: "Home Services", kind: "template", image: "/portfolio/red-oak-roofing.webp", deviceImage: "/portfolio/red-oak-roofing-devices.webp", width: 1600, height: 9840 },
  { slug: "clearpeak", name: "ClearPeak", trade: "Window & Exterior Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/clearpeak.webp", deviceImage: "/portfolio/clearpeak-devices.webp", width: 1600, height: 12719 },
  { slug: "liftline-garage-doors", name: "Liftline Garage Doors", trade: "Garage Doors", group: "Home Services", kind: "template", image: "/portfolio/liftline-garage-doors.webp", deviceImage: "/portfolio/liftline-garage-doors-devices.webp", width: 1600, height: 11444 },
  { slug: "riverstone-basement", name: "Riverstone Basement Co.", trade: "Basement Waterproofing", group: "Home Services", kind: "template", image: "/portfolio/riverstone-basement.webp", deviceImage: "/portfolio/riverstone-basement-devices.webp", width: 1600, height: 8870 },
  { slug: "popwave-parties", name: "Popwave Parties", trade: "Kids' Parties", group: "Events", kind: "template", image: "/portfolio/popwave-parties.webp", deviceImage: "/portfolio/popwave-parties-devices.webp", width: 1600, height: 9454 },
  { slug: "earthform-grading", name: "Earthform Grading", trade: "Grading & Excavation", group: "Outdoor Living", kind: "template", image: "/portfolio/earthform-grading.webp", deviceImage: "/portfolio/earthform-grading-devices.webp", width: 1600, height: 8575 },
  { slug: "groundwork-coatings", name: "Groundwork Coatings", trade: "Floor Coatings", group: "Design & Build", kind: "template", image: "/portfolio/groundwork-coatings.webp", deviceImage: "/portfolio/groundwork-coatings-devices.webp", width: 1600, height: 15239 },
  { slug: "undertow-drainage", name: "Undertow Drainage", trade: "Drainage", group: "Home Services", kind: "template", image: "/portfolio/undertow-drainage.webp", deviceImage: "/portfolio/undertow-drainage-devices.webp", width: 1600, height: 8070 },
  { slug: "honeycomb-attic", name: "Honeycomb Attic Co.", trade: "Attic Insulation", group: "Home Services", kind: "template", image: "/portfolio/honeycomb-attic.webp", deviceImage: "/portfolio/honeycomb-attic-devices.webp", width: 1600, height: 9146 },
  { slug: "docklight-marine-detail", name: "Docklight Marine Detail", trade: "Marine Detailing", group: "Specialty", kind: "template", image: "/portfolio/docklight-marine-detail.webp", deviceImage: "/portfolio/docklight-marine-detail-devices.webp", width: 1600, height: 8399 },
  { slug: "lockwell-door-hardware", name: "Lockwell Door Hardware", trade: "Door Hardware", group: "Home Services", kind: "template", image: "/portfolio/lockwell-door-hardware.webp", deviceImage: "/portfolio/lockwell-door-hardware-devices.webp", width: 1600, height: 8459 },
  { slug: "jollyglow", name: "Jollyglow", trade: "Holiday Lighting", group: "Outdoor Living", kind: "template", image: "/portfolio/jollyglow.webp", deviceImage: "/portfolio/jollyglow-devices.webp", width: 1600, height: 10421 },
  { slug: "fieldwork-coaching", name: "Fieldwork Coaching", trade: "Business Coaching", group: "Specialty", kind: "template", image: "/portfolio/fieldwork-coaching.webp", deviceImage: "/portfolio/fieldwork-coaching-devices.webp", width: 1600, height: 12034 },
  { slug: "afterglow-outdoor-lighting", name: "Afterglow Outdoor Lighting", trade: "Outdoor Lighting", group: "Outdoor Living", kind: "template", image: "/portfolio/afterglow-outdoor-lighting.webp", deviceImage: "/portfolio/afterglow-outdoor-lighting-devices.webp", width: 1600, height: 13609 },
  { slug: "sunday-house-cleaning", name: "Sunday House Cleaning", trade: "House Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/sunday-house-cleaning.webp", deviceImage: "/portfolio/sunday-house-cleaning-devices.webp", width: 1600, height: 11468 },
  { slug: "tradeport-supply", name: "Tradeport Supply", trade: "Wholesale Supply", group: "Specialty", kind: "template", image: "/portfolio/tradeport-supply.webp", deviceImage: "/portfolio/tradeport-supply-devices.webp", width: 1600, height: 7921 },
  { slug: "fieldstone-masonry", name: "Fieldstone Masonry", trade: "Masonry", group: "Design & Build", kind: "template", image: "/portfolio/fieldstone-masonry.webp", deviceImage: "/portfolio/fieldstone-masonry-devices.webp", width: 1600, height: 12700 },
];

export const PROJECT_GROUPS = ["Home Services", "Outdoor Living", "Design & Build", "Cleaning", "Events", "Specialty"];

/** Screenshot files keep their paths. This query changes when those files are replaced, because they are cached for a year. */
export const PORTFOLIO_ASSET_VERSION = "39";

export type PortfolioShotWidth = 320 | 400 | 480 | 640 | 662 | 800 | 960 | 1100 | 1600 | "card";

export function portfolioFile(
  image: string,
  width: PortfolioShotWidth = 1100,
  format: "webp" | "avif" = "webp",
) {
  const stem = image.replace(/\.webp$/, "");
  const ext = format === "avif" ? ".avif" : ".webp";
  const file = width === "card"
    ? `${stem}-card${ext}`
    : typeof width === "number"
      ? width === 1100 || width === 1600
        ? `${stem}${ext}`
        : `${stem}-${width}${ext}`
      : `${stem}${ext}`;
  return `${file}?v=${PORTFOLIO_ASSET_VERSION}`;
}

/** Listing card crop at a specific width (400 / 480 / 800 for 2×). */
export function portfolioCardFile(
  image: string,
  width: 400 | 480 | 800 = 400,
  format: "webp" | "avif" = "webp",
) {
  const stem = image.replace(/\.webp$/, "");
  const ext = format === "avif" ? ".avif" : ".webp";
  return `${stem}-card-${width}${ext}?v=${PORTFOLIO_ASSET_VERSION}`;
}

/** Listing cards: CSS ~400×300 — 400/480 + 800w for retina. */
export function portfolioCardSrcSet(image: string, format: "webp" | "avif" = "webp") {
  return `${portfolioCardFile(image, 400, format)} 400w, ${portfolioCardFile(image, 480, format)} 480w, ${portfolioCardFile(image, 800, format)} 800w`;
}

/** Hover-scroll frames: lab display ~280px / 46vw — prefer 320w, keep 640w for DPR. */
export function portfolioShotSrcSet(image: string, format: "webp" | "avif" = "webp") {
  return `${portfolioFile(image, 320, format)} 320w, ${portfolioFile(image, 640, format)} 640w`;
}

/** Case-study full-page live screenshots — CSS ~378 mobile / ~662–800 desktop.
 *  400w is the mobile candidate (with understated sizes); 662/800/1100 for larger viewports. */
export function portfolioCaseStudySrcSet(image: string, format: "webp" | "avif" = "webp") {
  return `${portfolioFile(image, 400, format)} 400w, ${portfolioFile(image, 662, format)} 662w, ${portfolioFile(image, 800, format)} 800w, ${portfolioFile(image, 1100, format)} 1100w`;
}

export function portfolioDeviceFile(image: string, width: 768 | 1536 = 1536) {
  const file = width === 768 ? image.replace(/\.webp$/, "-sm.webp") : image;
  return `${file}?v=${PORTFOLIO_ASSET_VERSION}`;
}

/** Lighthouse 100 template with this project's homepage hero baked into the gray panel. */
export function portfolioScoresFile(image: string) {
  return `${image.replace(/\.webp$/, "-scores.webp")}?v=${PORTFOLIO_ASSET_VERSION}`;
}

export const CUSTOM_PROJECTS = PROJECTS.filter((p) => p.kind === "custom");
export const TEMPLATE_PROJECTS = PROJECTS.filter((p) => p.kind === "template");

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
