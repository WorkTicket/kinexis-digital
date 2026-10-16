import type { LandingPageEntry } from "@/content/registry/landing-pages";

const FORM_FIELDS = [
  "slug", "budgetOptions", "businessNameRequired", "conversionKind", "formCtaHint",
  "formFootnote", "formStep2Title", "formTrust", "industryOptions", "investmentLabel",
  "phoneRequired", "privacyMicrocopy", "roleOptions", "serviceLabel",
  "submitLabel", "successCopy", "successTitle", "timelineLabel", "timelineOptions",
  "twoStepQualify", "websiteStatusOptions",
] as const satisfies readonly (keyof LandingPageEntry)[];

export type WebsitePlanFormPage = Pick<LandingPageEntry, (typeof FORM_FIELDS)[number]>;

/** Serialize only form data across the server/client boundary, not the whole campaign. */
export function getWebsitePlanFormPage(page: LandingPageEntry): WebsitePlanFormPage {
  return Object.fromEntries(FORM_FIELDS.map(key => [key, page[key]])) as WebsitePlanFormPage;
}
