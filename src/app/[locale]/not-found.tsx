import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import NotFoundContent from "@/components/pages/NotFoundContent";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

const notFoundMeta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Page Not Found | KINEXIS Digital",
    description: "This page does not exist. Return to the KINEXIS Digital homepage or contact us to find what you need.",
  },
  es: {
    title: "Página No Encontrada | KINEXIS Digital",
    description: "Esta página no existe. Vuelve al inicio de KINEXIS Digital o contáctanos para encontrar lo que buscas.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const meta = notFoundMeta[locale] ?? notFoundMeta.en;
  return buildPageMetadata({
    locale,
    path: "/404",
    title: meta.title,
    description: meta.description,
    noIndex: true,
  });
}

export default function NotFound() {
  return <NotFoundContent />;
}
