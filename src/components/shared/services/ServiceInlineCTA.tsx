"use client";

import { useLocale, useTranslations } from "next-intl";
import SiteCTA from "@/components/ui/SiteCTA";
import { uiChrome } from "@/content/ui-chrome";
import type { Locale } from "@/i18n/routing";
import type { ServiceSeoSlug } from "@/content/service-seo/types";

type Props = {
  label: string;
  subtitle?: string;
  surfaceIndex: number;
  slug: ServiceSeoSlug;
};

/**
 * Mid-page conversion block.
 * Free-audit labels route to /lead-magnet; everything else to /contact,
 * with the complementary audit offer as secondary.
 */
export default function ServiceInlineCTA({ label, subtitle, surfaceIndex, slug }: Props) {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations("common");
  const tServices = useTranslations("services");
  const copy = uiChrome[locale].inlineCta;

  const isFreeAuditCta =
    slug === "growth-consulting" || /free|gratis|growth audit|auditoría de crecimiento/i.test(label);

  const primaryHref = isFreeAuditCta ? "/lead-magnet" : "/contact";
  const secondaryLabel = isFreeAuditCta
    ? tServices("marketingAudits")
    : tCommon("getFreeAudit");
  const secondaryHref = isFreeAuditCta ? "/services/marketing-audits" : "/lead-magnet";

  return (
    <SiteCTA
      id="inline-cta"
      layout="inline"
      tone="story"
      surfaceIndex={surfaceIndex}
      title={copy.title}
      subtitle={subtitle ?? copy.subtitle}
      primaryLabel={label}
      primaryHref={primaryHref}
      secondaryLabel={secondaryLabel}
      secondaryHref={secondaryHref}
      showGlow={false}
    />
  );
}
