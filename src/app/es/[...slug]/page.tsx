import { SpanishPage, spanishMetadata } from "@/i18n/SpanishSite";
import { MIRROR_PATHS } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return MIRROR_PATHS.filter((path) => path !== "/").map((path) => ({ slug: path.slice(1).split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return spanishMetadata("es-419", slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <SpanishPage locale="es-419" slug={slug} />;
}
