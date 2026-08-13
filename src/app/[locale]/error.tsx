"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.04em] text-foreground">
        {t("title")}
      </h1>
      <p className="max-w-md leading-relaxed text-muted">{t("body")}</p>
      <Button type="button" onClick={reset}>
        {t("retry")}
      </Button>
    </main>
  );
}
