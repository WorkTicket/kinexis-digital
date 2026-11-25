/**
 * Import the KINEXIS 11 refined portfolio templates into public/portfolio
 * and append project metadata to src/data/portfolio.ts.
 *
 * Usage: node scripts/import-portfolio-kit.mjs [path-to-KINEXIS-11-Refined-Portfolio-Kit]
 */
import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const kitRoot = path.resolve(
  process.argv[2] ?? path.join(process.env.USERPROFILE ?? "", "Downloads", "KINEXIS-11-Refined-Portfolio-Kit"),
);
const designDest = path.resolve("design-source/portfolio-refined-11");
const publicDir = path.resolve("public/portfolio");
const dataPath = path.resolve("src/data/portfolio.ts");
const detailsPath = path.resolve("src/data/projectDetails.ts");

/** Kit folder slug → site project entry. */
const TEMPLATES = [
  {
    folder: "undertow",
    slug: "undertow-drainage",
    name: "Undertow Drainage",
    trade: "Drainage",
    group: "Home Services",
    about: [
      "Undertow Drainage is a website template for foundation drains, downspouts, and wet-yard fixes. The layout leads with the problem a homeowner can see, then shows the repair path without burying the phone number.",
      "Service sections stay short and practical so someone dealing with standing water can choose a call or a quote from a phone.",
    ],
  },
  {
    folder: "switchyard",
    slug: "switchyard-heating-air",
    name: "Switchyard Heating & Air",
    trade: "HVAC",
    group: "Home Services",
    about: [
      "Switchyard Heating & Air is a website template built for repair, replacement, and seasonal maintenance. The page separates same-day comfort calls from planned system upgrades.",
      "Clear headings, a strong phone path, and room for service-area towns keep the design useful for a local HVAC company.",
    ],
  },
  {
    folder: "graft",
    slug: "graft-tree-care",
    name: "Graft Tree Care",
    trade: "Tree Care",
    group: "Outdoor Living",
    about: [
      "Graft Tree Care is a website template for pruning, removals, and storm work. Large outdoor photography carries the page while the next step stays easy to find.",
      "Job types stay distinct so a homeowner comparing a trim, a removal, or an emergency call can pick the right path quickly.",
    ],
  },
  {
    folder: "tileline",
    slug: "tileline-bath-tile",
    name: "Tileline Bath & Tile",
    trade: "Bath & Tile",
    group: "Design & Build",
    about: [
      "Tileline Bath & Tile is a website template for bathroom remodeling and tile installation. Finished rooms get the room they need, with a consultation path beside the work.",
      "The layout keeps material and project types readable so a visitor planning a shower, floor, or full bath can ask about the space without a long form.",
    ],
  },
  {
    folder: "brightburrow",
    slug: "brightburrow-wildlife",
    name: "Brightburrow Wildlife",
    trade: "Wildlife Control",
    group: "Home Services",
    about: [
      "Brightburrow Wildlife is a website template for humane wildlife removal and exclusion. The tone stays calm while the phone and visit request stay close.",
      "Service sections explain attic, chimney, and yard problems in plain language so a homeowner can act the same day.",
    ],
  },
  {
    folder: "riverstone",
    slug: "riverstone-basement",
    name: "Riverstone Basement Co.",
    trade: "Basement Waterproofing",
    group: "Home Services",
    about: [
      "Riverstone Basement Co. is a website template for waterproofing, sump systems, and finished basements. The page leads with dry-space proof and keeps the inspection request easy to spot.",
      "Repair and finishing paths stay separate so someone dealing with moisture can choose the next step without scanning the whole site.",
    ],
  },
  {
    folder: "kiln",
    slug: "kiln-hearth-chimney",
    name: "Kiln Hearth & Chimney",
    trade: "Chimney & Fireplace",
    group: "Home Services",
    about: [
      "Kiln Hearth & Chimney is a website template for inspections, sweeps, and fireplace repairs. The work sits up front with a clear path to schedule a visit.",
      "Seasonal maintenance and repair calls stay easy to tell apart, which helps a homeowner prepare before lighting the first fire of the season.",
    ],
  },
  {
    folder: "honeycomb",
    slug: "honeycomb-attic",
    name: "Honeycomb Attic Co.",
    trade: "Attic Insulation",
    group: "Home Services",
    about: [
      "Honeycomb Attic Co. is a website template for insulation upgrades and attic air sealing. The page explains comfort and energy benefits without burying the estimate request.",
      "Service sections leave room for before-and-after photos and a short way to ask about the attic from a phone.",
    ],
  },
  {
    folder: "docklight",
    slug: "docklight-marine-detail",
    name: "Docklight Marine Detail",
    trade: "Marine Detailing",
    group: "Specialty",
    about: [
      "Docklight Marine Detail is a website template for boat cleaning and detailing. Bright waterfront photography carries the offer while booking stays simple.",
      "Wash, polish, and interior packages stay distinct so a boat owner can request the right service without digging through menus.",
    ],
  },
  {
    folder: "lockwell",
    slug: "lockwell-door-hardware",
    name: "Lockwell Door Hardware",
    trade: "Door Hardware",
    group: "Home Services",
    about: [
      "Lockwell Door Hardware is a website template for locks, hardware upgrades, and door repairs. Product-led imagery and a short quote path keep the page practical.",
      "Emergency and planned upgrade work stay easy to separate so a visitor can call now or request a measured quote.",
    ],
  },
  {
    folder: "earthform",
    slug: "earthform-grading",
    name: "Earthform Grading",
    trade: "Grading & Excavation",
    group: "Outdoor Living",
    about: [
      "Earthform Grading is a website template for site grading, drainage prep, and outdoor earthwork. The layout shows finished grades and keeps the project request close.",
      "Residential and larger site work stay readable so a property owner can describe the job without a long form.",
    ],
  },
];

await access(path.join(kitRoot, "template-index.json"));
await mkdir(publicDir, { recursive: true });
await mkdir(designDest, { recursive: true });

// Keep a local copy of the editable kit for future design work.
for (const name of ["README.txt", "template-index.json", "template-index.csv", "Collection-Preview.jpg"]) {
  try {
    await copyFile(path.join(kitRoot, name), path.join(designDest, name));
  } catch {
    /* optional */
  }
}

const results = [];
for (const project of TEMPLATES) {
  const images = path.join(kitRoot, project.folder, "images");
  const desktop = path.join(images, "desktop-full.webp");
  const mobile = path.join(images, "mobile-first-screen.webp");
  const devices = path.join(images, "four-device-mockup.webp");
  await access(desktop);
  await access(mobile);
  await access(devices);
  await sharp(mobile).metadata();

  const full = await sharp(desktop).resize({ width: 1100 }).webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
  const small = await sharp(desktop).resize({ width: 640 }).webp({ quality: 85 }).toBuffer();
  const [deviceFull, deviceSmall] = await Promise.all([
    sharp(devices).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 90, smartSubsample: true }).toBuffer(),
    sharp(devices).resize({ width: 768 }).webp({ quality: 85, alphaQuality: 90, smartSubsample: true }).toBuffer(),
  ]);

  await writeFile(path.join(publicDir, `${project.slug}.webp`), full.data);
  await writeFile(path.join(publicDir, `${project.slug}-640.webp`), small);
  await writeFile(path.join(publicDir, `${project.slug}-devices.webp`), deviceFull);
  await writeFile(path.join(publicDir, `${project.slug}-devices-sm.webp`), deviceSmall);

  results.push({
    ...project,
    width: full.info.width,
    height: full.info.height,
  });
  console.log(`${project.slug}: ${full.info.width} x ${full.info.height}`);
}

let data = await readFile(dataPath, "utf8");
const existing = new Set([...data.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));
const fresh = results.filter((project) => !existing.has(project.slug));
if (!fresh.length) {
  console.log("All 11 templates already present in portfolio.ts — refreshing asset version only.");
} else {
  const entries = fresh
    .map(
      (project) =>
        `  { slug: "${project.slug}", name: "${project.name}", trade: "${project.trade}", group: "${project.group}", kind: "template", image: "/portfolio/${project.slug}.webp", deviceImage: "/portfolio/${project.slug}-devices.webp", width: ${project.width}, height: ${project.height} },`,
    )
    .join("\n");
  data = data.replace(
    /export const PROJECTS: Project\[\] = \[\n/,
    `export const PROJECTS: Project[] = [\n${entries}\n`,
  );
}

data = data.replace(/PORTFOLIO_ASSET_VERSION = "(\d+)"/, (_, version) => `PORTFOLIO_ASSET_VERSION = "${Number(version) + 1}"`);
await writeFile(dataPath, data);

let details = await readFile(detailsPath, "utf8");
for (const project of results) {
  if (details.includes(`"${project.slug}"`)) continue;
  const block = `  "${project.slug}": {
    about: [
      ${project.about.map((line) => `"${line.replace(/"/g, '\\"')}"`).join(",\n      ")},
    ],
  },
`;
  details = details.replace(
    /export const PROJECT_DETAILS: Record<string, ProjectDetail> = \{\n/,
    `export const PROJECT_DETAILS: Record<string, ProjectDetail> = {\n${block}`,
  );
}
await writeFile(detailsPath, details);

console.log(`Imported ${results.length} portfolio templates.`);
