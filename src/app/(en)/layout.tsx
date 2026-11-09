import SiteChrome from "@/components/SiteChrome";
import DocumentShell, { documentMetadata, documentViewport } from "@/components/DocumentShell";

export const metadata = documentMetadata;
export const viewport = documentViewport;

// OpenNext KV cache interception: warm HTML for a day without booting Next.
export const revalidate = 86400;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocumentShell locale="en">
      <SiteChrome locale="en">{children}</SiteChrome>
    </DocumentShell>
  );
}
