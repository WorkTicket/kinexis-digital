import type { Locale } from "@/i18n/routing";
import { getAboutMetadata } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getAboutMetadata(locale as Locale);
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
