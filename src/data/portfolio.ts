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
  { slug: "liftline-garage-doors", name: "Liftline Garage Doors", trade: "Garage Doors", group: "Home Services", kind: "template", image: "/portfolio/liftline-garage-doors.webp", deviceImage: "/portfolio/liftline-garage-doors-devices.webp", width: 1100, height: 7870 },
  { slug: "afterglow-outdoor-lighting", name: "Afterglow Outdoor Lighting", trade: "Outdoor Lighting", group: "Outdoor Living", kind: "template", image: "/portfolio/afterglow-outdoor-lighting.webp", deviceImage: "/portfolio/afterglow-outdoor-lighting-devices.webp", width: 1100, height: 9460 },
  { slug: "rinseworks", name: "Rinseworks", trade: "Pressure Washing", group: "Cleaning", kind: "template", image: "/portfolio/rinseworks.webp", deviceImage: "/portfolio/rinseworks-devices.webp", width: 1100, height: 8381 },
  { slug: "sunday-house-cleaning", name: "Sunday House Cleaning", trade: "House Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/sunday-house-cleaning.webp", deviceImage: "/portfolio/sunday-house-cleaning-devices.webp", width: 1100, height: 7886 },
  { slug: "fieldstone-masonry", name: "Fieldstone Masonry", trade: "Masonry", group: "Design & Build", kind: "template", image: "/portfolio/fieldstone-masonry.webp", deviceImage: "/portfolio/fieldstone-masonry-devices.webp", width: 1100, height: 8828 },
  { slug: "red-oak-roofing", name: "Red Oak Roofing", trade: "Roofing", group: "Home Services", kind: "template", image: "/portfolio/red-oak-roofing.webp", deviceImage: "/portfolio/red-oak-roofing-devices.webp", width: 1100, height: 6840 },
  { slug: "meridian-chauffeur", name: "Meridian Chauffeur", trade: "Private Transportation", group: "Specialty", kind: "template", image: "/portfolio/meridian-chauffeur.webp", deviceImage: "/portfolio/meridian-chauffeur-devices.webp", width: 1100, height: 7231 },
  { slug: "happy-yard", name: "Happy Yard", trade: "Pet Waste Removal", group: "Outdoor Living", kind: "template", image: "/portfolio/happy-yard.webp", deviceImage: "/portfolio/happy-yard-devices.webp", width: 1100, height: 5946 },
  { slug: "good-riddance-junk", name: "Good Riddance Junk", trade: "Junk Removal", group: "Home Services", kind: "template", image: "/portfolio/good-riddance-junk.webp", deviceImage: "/portfolio/good-riddance-junk-devices.webp", width: 1100, height: 7424 },
  { slug: "popwave-parties", name: "Popwave Parties", trade: "Kids' Parties", group: "Events", kind: "template", image: "/portfolio/popwave-parties.webp", deviceImage: "/portfolio/popwave-parties-devices.webp", width: 1100, height: 6572 },
  { slug: "basecoat-floors", name: "Basecoat Floors", trade: "Floor Coatings", group: "Design & Build", kind: "template", image: "/portfolio/basecoat-floors.webp", deviceImage: "/portfolio/basecoat-floors-devices.webp", width: 1100, height: 7865 },
  { slug: "union-electric", name: "Union Electric Co.", trade: "Electrical", group: "Home Services", kind: "template", image: "/portfolio/union-electric.webp", deviceImage: "/portfolio/union-electric-devices.webp", width: 1100, height: 7417 },
  { slug: "vantage-wraps", name: "Vantage Wraps", trade: "Vehicle Wraps", group: "Specialty", kind: "template", image: "/portfolio/vantage-wraps.webp", deviceImage: "/portfolio/vantage-wraps-devices.webp", width: 1100, height: 9846 },
  { slug: "clearpeak", name: "ClearPeak", trade: "Window & Exterior Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/clearpeak.webp", deviceImage: "/portfolio/clearpeak-devices.webp", width: 1100, height: 8841 },
  { slug: "groundwork-coatings", name: "Groundwork Coatings", trade: "Floor Coatings", group: "Design & Build", kind: "template", image: "/portfolio/groundwork-coatings.webp", deviceImage: "/portfolio/groundwork-coatings-devices.webp", width: 1100, height: 10479 },
  { slug: "jollyglow", name: "Jollyglow", trade: "Holiday Lighting", group: "Outdoor Living", kind: "template", image: "/portfolio/jollyglow.webp", deviceImage: "/portfolio/jollyglow-devices.webp", width: 1100, height: 7245 },
  { slug: "haulgood", name: "Haulgood", trade: "Junk Removal", group: "Home Services", kind: "template", image: "/portfolio/haulgood.webp", deviceImage: "/portfolio/haulgood-devices.webp", width: 1100, height: 6799 },
  { slug: "spraycraft", name: "Spraycraft", trade: "Pressure Washing", group: "Cleaning", kind: "template", image: "/portfolio/spraycraft.webp", deviceImage: "/portfolio/spraycraft-devices.webp", width: 1100, height: 7685 },
  { slug: "slatewash", name: "Slatewash", trade: "Exterior Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/slatewash.webp", deviceImage: "/portfolio/slatewash-devices.webp", width: 1100, height: 9740 },
  { slug: "fieldwork-coaching", name: "Fieldwork Coaching", trade: "Business Coaching", group: "Specialty", kind: "template", image: "/portfolio/fieldwork-coaching.webp", deviceImage: "/portfolio/fieldwork-coaching-devices.webp", width: 1100, height: 8366 },
  { slug: "tradeport-supply", name: "Tradeport Supply", trade: "Wholesale Supply", group: "Specialty", kind: "template", image: "/portfolio/tradeport-supply.webp", deviceImage: "/portfolio/tradeport-supply-devices.webp", width: 1100, height: 5447 },
];

export const PROJECT_GROUPS = ["Home Services", "Outdoor Living", "Design & Build", "Cleaning", "Events", "Specialty"];

/** Screenshot files keep their paths. This query changes when those files are replaced, because they are cached for a year. */
export const PORTFOLIO_ASSET_VERSION = "25";

export function portfolioFile(image: string, width: 640 | 1100 = 1100) {
  const file = width === 640 ? image.replace(/\.webp$/, "-640.webp") : image;
  return `${file}?v=${PORTFOLIO_ASSET_VERSION}`;
}

export function portfolioDeviceFile(image: string, width: 768 | 1536 = 1536) {
  const file = width === 768 ? image.replace(/\.webp$/, "-sm.webp") : image;
  return `${file}?v=${PORTFOLIO_ASSET_VERSION}`;
}

export const CUSTOM_PROJECTS = PROJECTS.filter((p) => p.kind === "custom");
export const TEMPLATE_PROJECTS = PROJECTS.filter((p) => p.kind === "template");

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
