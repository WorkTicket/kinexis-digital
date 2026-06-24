import type { Locale } from "@/i18n/routing";
import { getLeadMagnetMetadata } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getLeadMagnetMetadata(locale as Locale);
}

export default function LeadMagnetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
