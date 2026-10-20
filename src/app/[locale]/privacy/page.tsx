import type { Metadata } from "next";
import { TermsDocument } from "@/components/page/TermsDocument";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";
type Props = { params: LocaleParams };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const locale = await resolveLocale(params);
 return buildPageMetadata({ locale, path: "/privacy", title: locale === "en" ? "Privacy Policy" : "Política de Privacidad", description: "Kinexis Digital — Privacy Policy / Política de Privacidad" });
}
export default async function Page({ params }: Props) {
 return <TermsDocument locale={await resolveLocale(params)} privacy={true} />;
}
