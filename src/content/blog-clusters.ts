/** Blog cluster articles - topical authority content funneling to parent service pages */

import type { Locale } from "@/i18n/routing";
import { clusterPostBodiesEn } from "./cluster-posts-en-bodies";
import { clusterPostBodiesEs } from "./cluster-posts-es-bodies";

export type ClusterPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  parentServicePath: string;
  body: string;
};

const clusterPostsEnMeta = [
  {
    slug: "technical-seo-guide",
    title: "The Complete Technical SEO Guide",
    category: "SEO",
    publishedAt: "March 10, 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "internal-linking-guide",
    title: "Internal Linking Guide for SEO Authority",
    category: "SEO",
    publishedAt: "March 5, 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "seo-audit-framework",
    title: "SEO Audit Framework: A Step-by-Step Process",
    category: "SEO",
    publishedAt: "February 28, 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "link-building-strategies",
    title: "Link Building Strategies That Still Work",
    category: "SEO",
    publishedAt: "February 20, 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "local-seo-checklist",
    title: "Local SEO Checklist for Service Businesses",
    category: "SEO",
    publishedAt: "February 15, 2026",
    parentServicePath: "/services/local-seo",
  },
  {
    slug: "quality-score-guide",
    title: "Google Ads Quality Score Guide",
    category: "Paid Ads",
    publishedAt: "March 8, 2026",
    parentServicePath: "/services/google-ads",
  },
  {
    slug: "negative-keywords-guide",
    title: "Negative Keywords Guide for PPC",
    category: "Paid Ads",
    publishedAt: "March 1, 2026",
    parentServicePath: "/services/ppc-management",
  },
  {
    slug: "landing-page-best-practices",
    title: "Landing Page Best Practices for Paid Traffic",
    category: "Paid Ads",
    publishedAt: "February 25, 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "roas-calculations",
    title: "ROAS Calculations: Measuring True Ad Profitability",
    category: "Paid Ads",
    publishedAt: "February 18, 2026",
    parentServicePath: "/services/analytics",
  },
  {
    slug: "heatmap-analysis",
    title: "Heatmap Analysis for Conversion Optimization",
    category: "Funnels & CRO",
    publishedAt: "March 12, 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "conversion-psychology",
    title: "Conversion Psychology: Why Buyers Say Yes",
    category: "Funnels & CRO",
    publishedAt: "March 6, 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "ab-testing-framework",
    title: "A/B Testing Framework for Marketers",
    category: "Funnels & CRO",
    publishedAt: "February 22, 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "landing-page-optimization",
    title: "Landing Page Optimization Playbook",
    category: "Funnels & CRO",
    publishedAt: "February 10, 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "lifecycle-marketing",
    title: "Lifecycle Marketing: Mapping the Full Customer Journey",
    category: "Email",
    publishedAt: "March 14, 2026",
    parentServicePath: "/services/email-marketing",
  },
  {
    slug: "automated-nurture-sequences",
    title: "Automated Nurture Sequences That Convert",
    category: "Email",
    publishedAt: "March 7, 2026",
    parentServicePath: "/services/email-marketing",
  },
  {
    slug: "email-segmentation",
    title: "Email Segmentation Strategies",
    category: "Email",
    publishedAt: "February 28, 2026",
    parentServicePath: "/services/email-marketing",
  },
  {
    slug: "attribution-models",
    title: "Marketing Attribution Models Explained",
    category: "Analytics",
    publishedAt: "March 11, 2026",
    parentServicePath: "/services/analytics",
  },
  {
    slug: "ga4-reporting",
    title: "GA4 Reporting for Marketing Teams",
    category: "Analytics",
    publishedAt: "March 4, 2026",
    parentServicePath: "/services/analytics",
  },
  {
    slug: "marketing-dashboards",
    title: "Marketing Dashboards That Drive Decisions",
    category: "Analytics",
    publishedAt: "February 26, 2026",
    parentServicePath: "/services/analytics",
  },
] as const;

const clusterPostsEn: ClusterPost[] = clusterPostsEnMeta.map((post) => ({
  ...post,
  body: clusterPostBodiesEn[post.slug],
}));

const clusterPostsEsMeta = [
  {
    slug: "technical-seo-guide",
    title: "La Guía Completa de SEO Técnico",
    category: "SEO",
    publishedAt: "10 de marzo de 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "internal-linking-guide",
    title: "Guía de Enlazado Interno para Autoridad SEO",
    category: "SEO",
    publishedAt: "5 de marzo de 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "seo-audit-framework",
    title: "Framework de Auditoría SEO: Proceso Paso a Paso",
    category: "SEO",
    publishedAt: "28 de febrero de 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "link-building-strategies",
    title: "Estrategias de Link Building que Siguen Funcionando",
    category: "SEO",
    publishedAt: "20 de febrero de 2026",
    parentServicePath: "/services/seo",
  },
  {
    slug: "local-seo-checklist",
    title: "Checklist de SEO Local para Negocios de Servicios",
    category: "SEO",
    publishedAt: "15 de febrero de 2026",
    parentServicePath: "/services/local-seo",
  },
  {
    slug: "quality-score-guide",
    title: "Guía de Quality Score en Google Ads",
    category: "Anuncios Pagados",
    publishedAt: "8 de marzo de 2026",
    parentServicePath: "/services/google-ads",
  },
  {
    slug: "negative-keywords-guide",
    title: "Guía de Palabras Clave Negativas para PPC",
    category: "Anuncios Pagados",
    publishedAt: "1 de marzo de 2026",
    parentServicePath: "/services/ppc-management",
  },
  {
    slug: "landing-page-best-practices",
    title: "Mejores Prácticas de Landing Pages para Tráfico Pagado",
    category: "Anuncios Pagados",
    publishedAt: "25 de febrero de 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "roas-calculations",
    title: "Cálculos de ROAS: Midiendo la Rentabilidad Real de Anuncios",
    category: "Anuncios Pagados",
    publishedAt: "18 de febrero de 2026",
    parentServicePath: "/services/analytics",
  },
  {
    slug: "heatmap-analysis",
    title: "Análisis de Heatmaps para Optimización de Conversión",
    category: "Funnels & CRO",
    publishedAt: "12 de marzo de 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "conversion-psychology",
    title: "Psicología de Conversión: Por Qué los Compradores Dicen Sí",
    category: "Funnels & CRO",
    publishedAt: "6 de marzo de 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "ab-testing-framework",
    title: "Framework de A/B Testing para Marketers",
    category: "Funnels & CRO",
    publishedAt: "22 de febrero de 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "landing-page-optimization",
    title: "Playbook de Optimización de Landing Pages",
    category: "Funnels & CRO",
    publishedAt: "10 de febrero de 2026",
    parentServicePath: "/services/funnels",
  },
  {
    slug: "lifecycle-marketing",
    title: "Marketing de Ciclo de Vida: Mapeando el Customer Journey Completo",
    category: "Email",
    publishedAt: "14 de marzo de 2026",
    parentServicePath: "/services/email-marketing",
  },
  {
    slug: "automated-nurture-sequences",
    title: "Secuencias de Nutrición Automatizadas que Convierten",
    category: "Email",
    publishedAt: "7 de marzo de 2026",
    parentServicePath: "/services/email-marketing",
  },
  {
    slug: "email-segmentation",
    title: "Estrategias de Segmentación de Email",
    category: "Email",
    publishedAt: "28 de febrero de 2026",
    parentServicePath: "/services/email-marketing",
  },
  {
    slug: "attribution-models",
    title: "Modelos de Atribución de Marketing Explicados",
    category: "Analítica",
    publishedAt: "11 de marzo de 2026",
    parentServicePath: "/services/analytics",
  },
  {
    slug: "ga4-reporting",
    title: "Reportes GA4 para Equipos de Marketing",
    category: "Analítica",
    publishedAt: "4 de marzo de 2026",
    parentServicePath: "/services/analytics",
  },
  {
    slug: "marketing-dashboards",
    title: "Dashboards de Marketing que Impulsan Decisiones",
    category: "Analítica",
    publishedAt: "26 de febrero de 2026",
    parentServicePath: "/services/analytics",
  },
] as const;

const clusterPostsEs: ClusterPost[] = clusterPostsEsMeta.map((post) => ({
  ...post,
  body: clusterPostBodiesEs[post.slug],
}));

const clusterPostsByLocale: Record<Locale, ClusterPost[]> = {
  en: clusterPostsEn,
  es: clusterPostsEs,
};

/** @deprecated Use getClusterPost(slug, locale) instead */
export const clusterPosts = clusterPostsEn;

/** @deprecated Use getClusterPost(slug, locale) instead */
export const clusterPostsBySlug = Object.fromEntries(clusterPostsEn.map((p) => [p.slug, p]));

export function getClusterPost(slug: string, locale: Locale): ClusterPost | undefined {
  const posts = clusterPostsByLocale[locale] ?? clusterPostsEn;
  return posts.find((p) => p.slug === slug) ?? clusterPostsEn.find((p) => p.slug === slug);
}
