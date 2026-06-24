import type { Locale } from "@/i18n/routing";
import { getServicesHubMetadata } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getServicesHubMetadata(locale as Locale);
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
