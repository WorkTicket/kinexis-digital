import SiteChrome from "@/components/SiteChrome";

export const revalidate = 86400;

export default function SpainLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="es-ES">{children}</SiteChrome>;
}
