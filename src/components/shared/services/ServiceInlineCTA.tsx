"use client";

import { useLocale } from "next-intl";
import SiteCTA from "@/components/ui/SiteCTA";
import { uiChrome } from "@/content/ui-chrome";
import type { Locale } from "@/i18n/routing";

type Props = {
  label: string;
  subtitle?: string;
  surfaceIndex: number;
};

/** Mid-page conversion block — placed after proof on content-rich service pages. */
export default function ServiceInlineCTA({ label, subtitle, surfaceIndex }: Props) {
  const locale = useLocale() as Locale;
  const copy = uiChrome[locale].inlineCta;

  return (
    <SiteCTA
      id="inline-cta"
      layout="inline"
      tone="story"
      surfaceIndex={surfaceIndex}
      title={copy.title}
      subtitle={subtitle ?? copy.subtitle}
      primaryLabel={label}
      showGlow={false}
    />
  );
}
