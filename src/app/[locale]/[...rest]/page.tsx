import { notFound } from "next/navigation";

/**
 * OpenNext/Cloudflare returns 5xx for unmatched App Router paths unless a
 * catch-all calls notFound(). Google Search Console was reporting /mo and
 * other junk paths as server errors instead of 404s.
 */
export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

export default function CatchAllPage() {
  notFound();
}
