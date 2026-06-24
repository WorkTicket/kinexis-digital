import type { Locale } from "@/i18n/routing";
import { getCaseStudiesMetadata } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getCaseStudiesMetadata(locale as Locale);
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
