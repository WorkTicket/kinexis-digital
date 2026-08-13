import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="not-found-shell flex flex-1 flex-col">
      <div className="shell">
        <div className="mx-auto w-full max-w-2xl">
          <p className="section-eyebrow mb-5">404</p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.35rem,8vw_+_0.25rem,4.85rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
            {t("title")}.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t("body")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/" size="lg" arrow>
              {t("home")}
            </Button>
            <Button href="/contact" variant="link" arrow>
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
