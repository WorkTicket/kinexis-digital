// Portfolio projects. Screenshots are full-page desktop captures that scroll
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
};

export const PROJECTS: Project[] = [
  { slug: "bluehaven-pool-care", name: "Bluehaven Pool Care", trade: "Pool Care", group: "Outdoor Living", kind: "custom", image: "/portfolio/bluehaven-pool-care.webp", deviceImage: "/portfolio/bluehaven-pool-care-devices.webp", width: 1100, height: 6746 },
  { slug: "breezeway-hvac", name: "Breezeway HVAC", trade: "Heating & Cooling", group: "Home Services", kind: "custom", image: "/portfolio/breezeway-hvac.webp", deviceImage: "/portfolio/breezeway-hvac-devices.webp", width: 1100, height: 6320 },
  { slug: "copperline-plumbing", name: "Copperline Plumbing", trade: "Plumbing", group: "Home Services", kind: "custom", image: "/portfolio/copperline-plumbing.webp", deviceImage: "/portfolio/copperline-plumbing-devices.webp", width: 1100, height: 6559 },
  { slug: "volterra-electric", name: "Volterra Electric", trade: "Electrical", group: "Home Services", kind: "custom", image: "/portfolio/volterra-electric.webp", deviceImage: "/portfolio/volterra-electric-devices.webp", width: 1100, height: 5754 },
  { slug: "harlans-roofing", name: "Harlan's Roofing", trade: "Roofing", group: "Home Services", kind: "custom", image: "/portfolio/harlans-roofing.webp", deviceImage: "/portfolio/harlans-roofing-devices.webp", width: 1100, height: 6437 },
  { slug: "liftline-garage-doors", name: "Liftline Garage Doors", trade: "Garage Doors", group: "Home Services", kind: "custom", image: "/portfolio/liftline-garage-doors.webp", deviceImage: "/portfolio/liftline-garage-doors-devices.webp", width: 1100, height: 6084 },
  { slug: "brush-and-co", name: "Brush & Co", trade: "Painting", group: "Design & Build", kind: "template", image: "/portfolio/brush-and-co.webp", deviceImage: "/portfolio/brush-and-co-devices.webp", width: 1100, height: 6146 },
  { slug: "oak-and-form", name: "Oak & Form", trade: "Kitchen & Bath Remodeling", group: "Design & Build", kind: "template", image: "/portfolio/oak-and-form.webp", deviceImage: "/portfolio/oak-and-form-devices.webp", width: 1100, height: 6951 },
  { slug: "clearpeak", name: "ClearPeak", trade: "Window & Exterior Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/clearpeak.webp", deviceImage: "/portfolio/clearpeak-devices.webp", width: 1100, height: 7116 },
  { slug: "rinseworks", name: "Rinseworks", trade: "Pressure Washing", group: "Outdoor Living", kind: "template", image: "/portfolio/rinseworks.webp", deviceImage: "/portfolio/rinseworks-devices.webp", width: 1100, height: 6371 },
  { slug: "root-and-stone", name: "Root & Stone", trade: "Landscaping", group: "Outdoor Living", kind: "template", image: "/portfolio/root-and-stone.webp", deviceImage: "/portfolio/root-and-stone-devices.webp", width: 1100, height: 6333 },
  { slug: "happy-yard", name: "Happy Yard", trade: "Pet Waste & Yard Care", group: "Outdoor Living", kind: "template", image: "/portfolio/happy-yard.webp", deviceImage: "/portfolio/happy-yard-devices.webp", width: 1100, height: 6507 },
  { slug: "afterglow-outdoor-lighting", name: "Afterglow Outdoor Lighting", trade: "Outdoor Lighting", group: "Outdoor Living", kind: "template", image: "/portfolio/afterglow-outdoor-lighting.webp", deviceImage: "/portfolio/afterglow-outdoor-lighting-devices.webp", width: 1100, height: 7161 },
  { slug: "good-riddance-junk", name: "Good Riddance Junk", trade: "Junk Removal", group: "Home Services", kind: "template", image: "/portfolio/good-riddance-junk.webp", deviceImage: "/portfolio/good-riddance-junk-devices.webp", width: 1100, height: 6856 },
  { slug: "goodhand-home-services", name: "Goodhand Home Services", trade: "Handyman", group: "Home Services", kind: "template", image: "/portfolio/goodhand-home-services.webp", deviceImage: "/portfolio/goodhand-home-services-devices.webp", width: 1100, height: 7159 },
  { slug: "groundwork-coatings", name: "Groundwork Coatings", trade: "Floor Coatings", group: "Design & Build", kind: "template", image: "/portfolio/groundwork-coatings.webp", deviceImage: "/portfolio/groundwork-coatings-devices.webp", width: 1100, height: 6298 },
  { slug: "stillwater-auto-detail", name: "Stillwater Auto Detail", trade: "Auto Detailing", group: "Home Services", kind: "template", image: "/portfolio/stillwater-auto-detail.webp", deviceImage: "/portfolio/stillwater-auto-detail-devices.webp", width: 1100, height: 5997 },
  { slug: "sunday-house-cleaning", name: "Sunday House Cleaning", trade: "House Cleaning", group: "Cleaning", kind: "template", image: "/portfolio/sunday-house-cleaning.webp", deviceImage: "/portfolio/sunday-house-cleaning-devices.webp", width: 1100, height: 6430 },
  { slug: "juniper-tree-co", name: "Juniper Tree Co", trade: "Tree Care", group: "Outdoor Living", kind: "template", image: "/portfolio/juniper-tree-co.webp", deviceImage: "/portfolio/juniper-tree-co-devices.webp", width: 1100, height: 5463 },
  { slug: "ember-and-flue", name: "Ember & Flue", trade: "Chimney & Fireplace Care", group: "Home Services", kind: "template", image: "/portfolio/ember-and-flue.webp", deviceImage: "/portfolio/ember-and-flue-devices.webp", width: 1100, height: 5536 },
  { slug: "cedarline-fence", name: "Cedarline Fence", trade: "Fences & Gates", group: "Outdoor Living", kind: "template", image: "/portfolio/cedarline-fence.webp", deviceImage: "/portfolio/cedarline-fence-devices.webp", width: 1100, height: 5715 },
  { slug: "highline-pest", name: "Highline Pest", trade: "Pest Management", group: "Home Services", kind: "template", image: "/portfolio/highline-pest.webp", deviceImage: "/portfolio/highline-pest-devices.webp", width: 1100, height: 5515 },
  { slug: "northstar-moving", name: "Northstar Moving", trade: "Local Moving", group: "Home Services", kind: "template", image: "/portfolio/northstar-moving.webp", deviceImage: "/portfolio/northstar-moving-devices.webp", width: 1100, height: 5697 },
  { slug: "harborline-gutters", name: "Harborline Gutters", trade: "Gutter Systems", group: "Home Services", kind: "template", image: "/portfolio/harborline-gutters.webp", deviceImage: "/portfolio/harborline-gutters-devices.webp", width: 1100, height: 5945 },
];

export const PROJECT_GROUPS = ["Home Services", "Outdoor Living", "Design & Build", "Cleaning"];

/** Screenshot files keep their paths. This query changes when those files are replaced, because they are cached for a year. */
export const PORTFOLIO_ASSET_VERSION = "17";

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
