import type { Locale } from "@/i18n/routing";

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  result: string;
};

export type TestimonialsContent = {
  label: string;
  title: string;
  subtitle: string;
  items: Testimonial[];
};

// TODO: Replace placeholder testimonials with real client quotes before launch.
// Format: get written permission from clients, ideally with a headshot and LinkedIn URL.
export const testimonialsContent: Record<Locale, TestimonialsContent> = {
  en: {
    label: "Client Testimonials",
    title: "What clients say.",
    subtitle: "Specific outcomes from real businesses.",
    items: [
      {
        quote:
          "We went from barely visible on Google to ranking in the top three for every core keyword in our market. Revenue doubled in under a year. KINEXIS didn't just do SEO. They rebuilt how our business shows up online.",
        name: "Marcus T.",
        title: "Owner",
        company: "Local Landscaping Business",
        industry: "Home Services",
        result: "$2K → $11.5K/mo · 8 months",
      },
      {
        quote:
          "New patient volume went from 45 a month to nearly 200. Google Ads was always a money pit for us before KINEXIS. Now every dollar has a clear return. The weekly reporting alone is worth the fee.",
        name: "Dr. Amanda R.",
        title: "Practice Owner",
        company: "Multi-Location Dental Practice",
        industry: "Healthcare",
        result: "45 → 198 patients/mo · 6 months",
      },
      {
        quote:
          "Our old agency handed us vanity metrics. KINEXIS shows us pipeline value every week. We went from $400K to $2.4M in active pipeline. That's the number that matters and they track it.",
        name: "David K.",
        title: "Managing Partner",
        company: "B2B Management Consulting Firm",
        industry: "B2B",
        result: "$400K → $2.4M pipeline · 9 months",
      },
      {
        quote:
          "The site they built converts at 6x the rate our old one did. Every decision was explained in plain language. We knew what we were getting and why at every stage.",
        name: "Rachel M.",
        title: "Founder",
        company: "Premium E-Commerce Brand",
        industry: "Retail",
        result: "1.8% → 6.3% conversion rate · 9 months",
      },
    ],
  },
  es: {
    label: "Testimonios de Clientes",
    title: "Lo que dicen nuestros clientes.",
    subtitle: "Resultados específicos de negocios reales.",
    items: [
      {
        quote:
          "Pasamos de ser invisibles en Google a aparecer en el top tres para cada palabra clave importante de nuestro mercado. Los ingresos se duplicaron en menos de un año.",
        name: "Marcus T.",
        title: "Propietario",
        company: "Empresa Local de Jardinería",
        industry: "Servicios del Hogar",
        result: "$2K → $11.5K/mes · 8 meses",
      },
      {
        quote:
          "El volumen de pacientes nuevos pasó de 45 al mes a casi 200. Google Ads era un pozo sin fondo antes de KINEXIS. Ahora cada peso tiene un retorno claro.",
        name: "Dra. Amanda R.",
        title: "Propietaria",
        company: "Clínica Dental Multi-sede",
        industry: "Salud",
        result: "45 → 198 pacientes/mes · 6 meses",
      },
      {
        quote:
          "Nuestra agencia anterior nos daba métricas de vanidad. KINEXIS nos muestra el valor del pipeline cada semana. Pasamos de $400K a $2.4M en pipeline activo.",
        name: "David K.",
        title: "Socio Director",
        company: "Firma de Consultoría B2B",
        industry: "B2B",
        result: "$400K → $2.4M en pipeline · 9 meses",
      },
    ],
  },
};
