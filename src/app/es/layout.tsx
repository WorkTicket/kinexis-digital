import SiteChrome from "@/components/SiteChrome";
import DocumentShell, { documentMetadata, documentViewport } from "@/components/DocumentShell";

export const metadata = documentMetadata;
export const viewport = documentViewport;

export const revalidate = 86400;

export default function LatamLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell locale="es-419">
      <SiteChrome locale="es-419">{children}</SiteChrome>
    </DocumentShell>
  );
}
