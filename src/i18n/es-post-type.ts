export type EsPost = {
  slug: string;
  category: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  lead: string;
  sections: { h2: string; html: string }[];
};
