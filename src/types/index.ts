export type Service = {
  slug: string;
  title: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  problem: string;
  strategy: string;
  solution: string;
  results: { label: string; before: number; after: number; prefix?: string; suffix?: string; decimals?: number }[];
  featuredImage: string;
  timeline?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  body: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  summary: string;
  benefits: string[];
  processSteps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
};

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type LeadData = {
  name: string;
  email: string;
  service?: string;
  revenue?: string;
  budget?: string;
  goal?: string;
  score?: "high" | "medium" | "low";
  source?: string;
};
