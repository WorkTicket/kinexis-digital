import type { Locale } from "@/i18n/routing";
import documents from "./terms.generated.json";

/** Precompiled by scripts/generate-legal-terms.mjs; no Worker filesystem reads. */
export function getTermsContent(locale: Locale) {
  return locale === "en" ? documents.en : documents.es;
}
