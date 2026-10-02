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
    title: "Client Intake Questionnaire",
    description:
      "Tell us about your business, your customers, and your goals so we can plan a website that wins more work and gets found on Google.",
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
