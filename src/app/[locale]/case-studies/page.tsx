import { redirect } from "next/navigation";
import { resolveLocale, type LocaleParams } from "@/i18n/locale";
export default async function RetiredWork({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params);
  redirect(locale === "en" ? "/" : `/${locale}`);
}
