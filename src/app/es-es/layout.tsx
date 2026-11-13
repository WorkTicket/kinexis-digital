import SiteChrome from "@/components/SiteChrome";
import DocumentShell, { documentMetadata, documentViewport } from "@/components/DocumentShell";

export const metadata = documentMetadata;
export const viewport = documentViewport;

export const revalidate = 86400;

export default function SpainLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell locale="es-ES">
      <SiteChrome locale="es-ES">{children}</SiteChrome>
    </DocumentShell>
  );
}
