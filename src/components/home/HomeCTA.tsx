import { getTranslations } from "next-intl/server";
import { PageCTA } from "@/components/page/PageCTA";

export async function HomeCTA() {
  const t = await getTranslations("home");

  return (
    <PageCTA
      motion="chapter"
      eyebrow={t("ctaEyebrow")}
      title={t("ctaTitle")}
      copy={t("ctaCopy")}
    />
  );
}
