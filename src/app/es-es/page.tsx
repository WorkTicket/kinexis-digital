import { SpanishPage, spanishMetadata } from "@/i18n/SpanishSite";

/** Match EN home ISR for OpenNext edge HTML cache. */
export const revalidate = 86400;

export function generateMetadata() {
  return spanishMetadata("es-ES");
}

export default function Page() {
  return <SpanishPage locale="es-ES" />;
}
