import type { Locale } from "@/i18n/routing";
import { getContactMetadata } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getContactMetadata(locale as Locale);
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
