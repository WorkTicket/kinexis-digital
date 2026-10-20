import type { Locale } from "@/i18n/routing";
import documents from "./documents.json";
import { renderTermsMarkdown } from "@/lib/legal-markdown";
import { LEGAL_OPERATOR_NAME, MAILING_ADDRESS, TERMS_EFFECTIVE_DATE, PRIVACY_EFFECTIVE_DATE, BUSINESS_EMAIL } from "@/config/business-identity";
import { getBusinessPhoneDisplay } from "@/lib/business";

export function getTermsContent(locale: Locale, privacy = false) {
  const es = locale !== "en";
  let source = documents[`${privacy ? "privacy-policy" : "terms-of-service"}-${es ? "es" : "en"}`];
  const operator = LEGAL_OPERATOR_NAME ? (es ? `es operada por ${LEGAL_OPERATOR_NAME}, empresa individual,` : `is operated by ${LEGAL_OPERATOR_NAME}, a sole proprietorship,`) : "";
  const effectiveDate = privacy ? PRIVACY_EFFECTIVE_DATE : TERMS_EFFECTIVE_DATE;
  const displayDate = privacy
    ? new Intl.DateTimeFormat(es ? "es-MX" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${effectiveDate}T00:00:00Z`))
    : effectiveDate;
  source = source.replaceAll("{{OPERATOR_SENTENCE}} ", operator ? `${operator} ` : "")
    .replaceAll("{{MAILING_ADDRESS_SENTENCE}}", MAILING_ADDRESS ? ` · ${es ? "Dirección postal" : "Mailing address"}: ${MAILING_ADDRESS}` : "")
    .replaceAll("{{BUSINESS_PHONE_DISPLAY}}", getBusinessPhoneDisplay() ?? "")
    .replaceAll("{{EFFECTIVE_DATE}}", displayDate)
    .replaceAll("hello@kinexisdigital.com", BUSINESS_EMAIL);
  if (!privacy) {
    source = source.replace(/\*\*(Who we are|Quiénes somos)\.\*\*[^\n]*/i, es
      ? `**Quiénes somos.** Kinexis Digital${operator ? " " + operator : ""}. Somos un equipo remoto; no estamos ubicados en Houston. Contacto: ${BUSINESS_EMAIL} · ${getBusinessPhoneDisplay() ?? ""}${MAILING_ADDRESS ? " · Dirección postal: " + MAILING_ADDRESS : ""}.`
      : `**Who we are.** Kinexis Digital${operator ? " " + operator : ""}. We're a remote team; we are not based in Houston. Contact: ${BUSINESS_EMAIL} · ${getBusinessPhoneDisplay() ?? ""}${MAILING_ADDRESS ? " · Mailing address: " + MAILING_ADDRESS : ""}.`);
  }
  return renderTermsMarkdown(source);
}
