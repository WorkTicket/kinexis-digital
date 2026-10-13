import type { LandingPageEntry } from "@/content/registry/landing-pages";

const FORM_FIELDS = [
  "slug", "budgetOptions", "businessNameRequired", "calendarSubtitle", "calendarTitle",
  "continueLabel", "conversionKind", "formCtaHint", "formFootnote", "formStep1Title",
  "formStep2Title", "industryLabel", "industryOptions", "investmentLabel", "phoneRequired",
  "privacyMicrocopy", "roleLabel", "roleOptions", "serviceLabel", "submitLabel", "successCopy",
  "successTitle", "timelineLabel", "timelineOptions", "twoStepQualify", "websiteStatusLabel",
  "websiteStatusOptions",
] as const satisfies readonly (keyof LandingPageEntry)[];

export type WebsitePlanFormPage = Pick<LandingPageEntry, (typeof FORM_FIELDS)[number]>;

/** Serialize only form data across the server/client boundary, not the whole campaign. */
export function getWebsitePlanFormPage(page: LandingPageEntry): WebsitePlanFormPage {
  return Object.fromEntries(FORM_FIELDS.map(key => [key, page[key]])) as WebsitePlanFormPage;
}
