import { redirect } from "next/navigation";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export default async function PaidAdsServiceRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/services/ppc-management`);
}
