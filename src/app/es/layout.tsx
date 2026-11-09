import SiteChrome from "@/components/SiteChrome";

export const revalidate = 86400;

export default function LatamLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="es-419">{children}</SiteChrome>;
}
