import SiteChrome from "@/components/SiteChrome";

// OpenNext KV cache interception: warm HTML for a day without booting Next.
export const revalidate = 86400;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome locale="en">{children}</SiteChrome>;
}
