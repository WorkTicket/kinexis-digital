import { SpanishPage, spanishMetadata } from "@/i18n/SpanishSite";

export function generateMetadata() {
  return spanishMetadata("es-ES");
}

export default function Page() {
  return <SpanishPage locale="es-ES" />;
}
