import type { Metadata } from "next";
import { ContractorHome } from "@/components/home/ContractorHome";
import { getContractorHome } from "@/content/contractor-home";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
import { buildPageMetadata } from "@/lib/metadata";

type Props = { params: LocaleParams };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getContractorHome(locale);
  return buildPageMetadata({ locale, path: "/", absolute: true, title: c.metaTitle, description: c.copy });
}

export default async function Home({ params }: Props) {
  return <ContractorHome locale={await resolveLocale(params)} />;
}
