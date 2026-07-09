"use client";

import { useTranslations } from "next-intl";
import { Home, Layers, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFoundContent() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/[0.04] blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl">
        <span className="mb-6 inline-block rounded-full border border-neon-cyan/20 bg-neon-cyan/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neon-cyan">
          404
        </span>

        <h1 className="type-hero mx-auto text-white">
          {t("title")}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-white/50">
          {t("body")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/" variant="secondary" size="sm">
            <Home className="h-4 w-4 shrink-0 text-neon-cyan" />
            {t("home")}
          </Button>
          <Button href="/services" variant="secondary" size="sm">
            <Layers className="h-4 w-4 shrink-0 text-neon-cyan" />
            {t("services")}
          </Button>
          <Button href="/contact" variant="secondary" size="sm">
            <Phone className="h-4 w-4 shrink-0 text-neon-cyan" />
            {t("contact")}
          </Button>
        </div>

        <div className="mt-8">
          <Button href="/contact" variant="primary">
            {t("cta")}
          </Button>
          <p className="mt-2 text-xs text-text-muted">
            {t("footnote")}
          </p>
        </div>
      </div>
    </div>
  );
}
