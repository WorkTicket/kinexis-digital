import { getTranslations } from "next-intl/server";

export default async function SkipToMain() {
  const t = await getTranslations("a11y");

  return (
    <a href="#main-content" className="skip-to-main">
      {t("skipToMain")}
    </a>
  );
}
