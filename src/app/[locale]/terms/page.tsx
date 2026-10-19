import type { Metadata } from "next";
import { TermsDocument } from "@/components/page/TermsDocument";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: LocaleParams };

export const dynamic = "error";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/terms",
    title: locale === "en" ? "Terms of Service" : "Términos del Servicio",
    description:
      locale === "en"
        ? "Kinexis Digital terms for website plans, billing, cancellation, edits, ownership, texting and the 60-day tracked lead guarantee. Updated October 19, 2026."
        : "Términos de Kinexis Digital: planes web, cobros, cancelación, cambios, propiedad, textos y garantía de contactos registrados. Actualizados el 19 de octubre de 2026.",
  });
}

export default async function TermsPage({ params }: Props) {
  const locale = await resolveLocale(params);
  return <TermsDocument locale={locale} />;
}
