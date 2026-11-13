/**
 * Import the KINEXIS custom PNG icon library into public/assets/kinexis/icons
 * as WebP files named for the site's Icon() keys.
 *
 * Usage: node scripts/import-custom-icons.mjs [path-to-kinexis-custom-icons]
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve(process.argv[2] ?? path.join(process.env.USERPROFILE ?? "", "Downloads", "kinexis-custom-icons"));
const pngDir = path.join(sourceRoot, "png");
const outDir = path.resolve("public/assets/kinexis/icons");
const SIZE = 256;

/** Site Icon() / industry IconCard key → custom PNG basename (without .png). */
const MAP = {
  "better-design": "easy_mobile_service_webpage",
  "better-follow-up": "scheduled_follow_up_message",
  "better-pricing": "four_plans_one_selected",
  preview: "home_service_homepage_preview_under_review",
  "built-for-your-trade": "home_service_brand_design_kit",
  "technical-seo": "structured_website_setup",
  "on-page-optimization": "precision_pencil_refining_web_content",
  "keyword-research": "search_results_under_the_lens",
  "content-strategy": "editorial_website_content_planning_board",
  "local-seo": "local_search_map_pin",
  reporting: "call_analytics_progress_report_icon",
  hosting: "reliable_cobalt_hosting_server_stack",
  updates: "website_update_with_edit_pencil",
  security: "website_backup_security_shield",
  support: "cobalt_support_headset_and_speech_bubble",
  "made-for-calls": "website_call_button_with_phone_receiver",
  "fast-and-secure": "fast_website_speed_and_security",
  "managed-for-you": "website_hosting_stack_with_live_support",
  "well-designed": "responsive_site_across_four_devices",
  "sales-focused": "website_calls_and_quote_paths",
  "search-optimized": "website_search_visibility_icon",
  "hassle-free": "comparing_plans_choosing_the_right_fit",
  "missed-call-text-back": "missed_call_text_back_phone_icon",
  "after-every-job": "completed_job_review_request",
  "one-tap-to-google": "one_tap_smartphone_reviews",
  "extra-page": "add_a_page_to_your_website",
  "new-pages": "additional_service_page_stack",
  "site-care": "shielded_hosting_server_stack",
  "audit-speed": "fast_loading_website_speedometer",
  "audit-mobile": "responsive_website_on_desktop_and_mobile",
  "audit-conversion": "website_calls_and_quote_paths",
  payment: "secure_checkout_payment_card",
  calendar: "confirmed_service_appointment_calendar",
  phone: "cobalt_phone_receiver_with_call_signal",
  location: "folded_local_map_with_orange_pin",
  gallery: "finished_room_painting_gallery",
  edit: "website_update_with_edit_pencil",
  document: "organized_service_pages_with_branching_actions",
  shield: "website_backup_security_shield",
  tools: "website_blueprint_in_progress",
  bolt: "dedicated_ev_charging_service",
  leaf: "from_garden_plan_to_planted_bed",
  roof: "finished_roofing_photo_proof",
  layers: "additional_service_page_stack",
  palette: "home_service_brand_design_kit",
  desktop: "responsive_website_on_desktop_and_mobile",
  search: "search_results_under_the_lens",
  "no-chasing": "scheduled_follow_up_message",
  sparkle: "cobalt_review_bubble_with_five_stars",

  /* Industry service cards */
  "leak-repair": "job_photo_to_quote",
  "drain-cleaning": "scheduled_service_visit_checklist",
  "water-heaters": "polished_quote_form_with_measuring_ruler",
  "no-cool-repair": "seasonal_hvac_maintenance_calendar",
  "system-replacement": "comparing_plans_choosing_the_right_fit",
  maintenance: "seasonal_hvac_maintenance_calendar",
  "panel-upgrades": "professional_license_verification_card",
  "ev-chargers": "dedicated_ev_charging_service",
  troubleshooting: "scheduled_service_visit_checklist",
  "roof-repairs": "finished_roofing_photo_proof",
  replacements: "measured_kitchen_remodel_blueprint_and_estimate",
  "storm-calls": "roof_insurance_process_checklist",
  "broken-springs": "garage_door_estimate_blueprint",
  "opener-repair": "garage_door_estimate_blueprint",
  "new-doors": "garage_door_estimate_blueprint",
  interior: "finished_room_painting_gallery",
  exterior: "pressure_washed_driveway_before_and_after",
  "cabinet-finishes": "home_service_brand_design_kit",
  kitchens: "kitchen_remodel_showcase_browser_icon",
  bathrooms: "measured_kitchen_remodel_blueprint_and_estimate",
  "detailed-estimates": "itemized_receipt_clear_pricing",
  "maintenance-routes": "lawn_maintenance_booking_icon",
  "landscape-design": "from_garden_plan_to_planted_bed",
  "design-build": "website_blueprint_in_progress",
  "weekly-service": "residential_pool_project_snapshot",
  repairs: "scheduled_service_visit_checklist",
  equipment: "confirmed_payment_receipt_with_alert_bell",
  "house-washing": "pressure_washed_driveway_before_and_after",
  "concrete-cleaning": "job_photo_to_quote",
  "roof-washing": "finished_roofing_photo_proof",
  "home-routes": "recurring_window_cleaning_appointment_calendar",
  storefronts: "one_website_two_buyer_journeys",
  "recurring-routes": "recurring_window_cleaning_appointment_calendar",
  "lawn-routes": "lawn_maintenance_booking_icon",
  "pet-waste": "pet_waste_cleanup_booking_icon",
  "recurring-bookings": "confirmed_service_appointment_calendar",

  /* Industry problem cards */
  "separate-service-pages": "organized_service_pages_with_branching_actions",
  "visible-phone-number": "website_call_button_with_phone_receiver",
  "missed-call-follow-up": "missed_call_text_back_phone_icon",
  "repair-call-path": "cobalt_phone_receiver_with_call_signal",
  "replacement-quote-path": "polished_quote_form_with_measuring_ruler",
  "seasonal-maintenance": "seasonal_hvac_maintenance_calendar",
  "license-proof": "professional_license_verification_card",
  "ev-charger-page": "dedicated_ev_charging_service",
  "separate-buyer-paths": "one_website_two_buyer_journeys",
  "insurance-process": "roof_insurance_process_checklist",
  "repair-replacement-pages": "additional_service_page_stack",
  "real-project-photos": "finished_roofing_photo_proof",
  "emergency-phone-path": "website_call_button_with_phone_receiver",
  "quote-price-context": "itemized_receipt_clear_pricing",
  "quote-follow-up": "scheduled_follow_up_message",
  "interior-exterior-pages": "one_website_two_buyer_journeys",
  "finished-work-gallery": "finished_room_painting_gallery",
  "short-estimate-form": "polished_quote_form_with_measuring_ruler",
  "first-screen-portfolio": "kitchen_remodel_showcase_browser_icon",
  "honest-budget-context": "itemized_receipt_clear_pricing",
  "consultation-path": "home_remodeling_consultation_booking",
  "maintenance-service-page": "lawn_maintenance_booking_icon",
  "project-process": "from_garden_plan_to_planted_bed",
  "realistic-service-area": "folded_neighborhood_service_route_map",
  "residential-pool-proof": "residential_pool_project_snapshot",
  "route-coverage": "folded_neighborhood_service_route_map",
  "surface-service-pages": "organized_service_pages_with_branching_actions",
  "before-after-proof": "pressure_washed_driveway_before_and_after",
  "photo-based-quotes": "job_photo_to_quote",
  "residential-commercial-paths": "one_website_two_buyer_journeys",
  "visit-inclusions": "scheduled_service_visit_checklist",
  "recurring-cleaning-path": "recurring_window_cleaning_appointment_calendar",
  "route-service-area": "folded_local_map_with_orange_pin",
  "pet-waste-service-page": "pet_waste_cleanup_booking_icon",
};

await access(pngDir);
await mkdir(outDir, { recursive: true });

const keys = Object.keys(MAP);
for (const key of keys) {
  const src = path.join(pngDir, `${MAP[key]}.png`);
  await access(src);
  const webp = await sharp(src)
    .resize({ width: SIZE, height: SIZE, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 95, effort: 4 })
    .toBuffer();
  await writeFile(path.join(outDir, `${key}.webp`), webp);
  console.log(`${key}.webp ← ${MAP[key]}.png`);
}

const mapOut = path.resolve("src/lib/custom-icons.ts");
const body = `/** Keys that have a custom illustrated WebP in /assets/kinexis/icons. Generated by scripts/import-custom-icons.mjs. */
export const CUSTOM_ICON_KEYS = new Set<string>([
${keys.map((key) => `  "${key}",`).join("\n")}
]);
`;
await writeFile(mapOut, body);
console.log(`Wrote ${keys.length} icons and ${mapOut}`);

/* Large “Works on every screen” art used when an industry has no portfolio mockup. */
const screenSrc = path.join(pngDir, "responsive_site_across_four_devices.png");
const screenOut = path.resolve("public/assets/shared/responsive-design.webp");
await access(screenSrc);
const screenWebp = await sharp(screenSrc)
  .resize({ width: 640, height: 640, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ quality: 90, alphaQuality: 95, effort: 4 })
  .toBuffer();
await writeFile(screenOut, screenWebp);
console.log(`responsive-design.webp ← responsive_site_across_four_devices.png (640)`);
