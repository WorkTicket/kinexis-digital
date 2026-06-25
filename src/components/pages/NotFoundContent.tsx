"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Home, Layers, Phone } from "lucide-react";

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

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-white/50">
          {t("body")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
          >
            <Home className="h-4 w-4 shrink-0 text-neon-cyan" />
            {t("home")}
          </Link>
          <Link
            href="/services"
            className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
          >
            <Layers className="h-4 w-4 shrink-0 text-neon-cyan" />
            {t("services")}
          </Link>
          <Link
            href="/contact"
            className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
          >
            <Phone className="h-4 w-4 shrink-0 text-neon-cyan" />
            {t("contact")}
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-neon-cyan px-6 py-3 text-sm font-semibold text-bg transition-opacity duration-200 hover:opacity-90"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
          <p className="mt-2 text-xs text-white/30">
            {t("footnote")}
          </p>
        </div>
      </div>
    </div>
  );
}
