import { SpanishPage, spanishMetadata } from "@/i18n/SpanishSite";

export function generateMetadata() {
  return spanishMetadata("es-419");
}

export default function Page() {
  return <SpanishPage locale="es-419" />;
}
