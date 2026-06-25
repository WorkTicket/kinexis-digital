import type { AuthorSlug } from "@/content/registry/site-routes";

const categoryAuthorMap: Record<string, AuthorSlug> = {
  SEO: "maria-rodriguez",
  "Paid Ads": "james-chen",
  "Anuncios Pagados": "james-chen",
  Email: "maria-rodriguez",
  Analytics: "james-chen",
  CRO: "james-chen",
  "Funnels & CRO": "james-chen",
  "Web Design": "maria-rodriguez",
  "Case Studies": "sarah-mitchell",
  "Casos de Estudio": "sarah-mitchell",
};

export function getBlogAuthorSlug(category: string): AuthorSlug {
  return categoryAuthorMap[category] ?? "sarah-mitchell";
}
