"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";

/**
 * Client boundary so Conferbot can load as its own async chunk (ssr:false is
 * illegal in Server Components). Internal widget deferral (#62) is unchanged.
 */
const ConferbotWidget = dynamic(() => import("@/components/ConferbotWidget"), {
  ssr: false,
  loading: () => null,
});

export default function ConferbotLazy({ locale }: { locale: Locale }) {
  return <ConferbotWidget locale={locale} />;
}
