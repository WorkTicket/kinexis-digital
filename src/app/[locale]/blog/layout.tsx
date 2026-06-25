import type { Locale } from "@/i18n/routing";
import { getBlogMetadata } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getBlogMetadata(locale as Locale);
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
