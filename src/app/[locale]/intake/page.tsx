import type { Metadata } from "next";
import { ClientIntakeForm } from "@/components/intake/ClientIntakeForm";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";
import "@/styles/components/client-intake.css";

type Props = { params: LocaleParams };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return buildPageMetadata({
    locale,
    path: "/intake",
    title: locale === "en" ? "Get started: your free homepage preview" : "Empecemos: su vista previa gratis",
    description:
      locale === "en" ? "Send your business details for your free homepage preview." : "Envíe los datos de su negocio para su vista previa gratis.",
    noIndex: true,
    noFollow: true,
  });
}

export default async function IntakePage({ params }: Props) {
  await resolveLocale(params);
  return (
    <main className="flex flex-1 flex-col">
      <ClientIntakeForm />
    </main>
  );
}
