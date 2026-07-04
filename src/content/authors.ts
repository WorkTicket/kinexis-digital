import type { Locale } from "@/i18n/routing";

export type Author = {
  slug: string;
  name: string;
  jobTitle: string;
  credentials: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
};

export const authorsContent: Record<Locale, { authors: Author[] }> = {
  en: {
    authors: [
      {
        slug: "sarah-mitchell",
        name: "Sarah Mitchell",
        jobTitle: "Founder & Head of Strategy",
        credentials: "12 years in SEO and paid media for B2B and local service brands",
        bio: "Sarah started KINEXIS after running growth at two agencies that prioritized pitch decks over results. She leads client strategy, channel mix decisions, and the audits that kick off every engagement. Her work shows up in the landscaping and plumbing case studies on this site.",
        expertise: ["SEO strategy", "Channel mix planning", "Local market audits", "Client reporting"],
        linkedin: "https://www.linkedin.com/in/sarah-mitchell-kinexis/",
      },
      {
        slug: "james-chen",
        name: "James Chen",
        jobTitle: "Director of Paid Media",
        credentials: "Google Ads and Meta certified, managed $4M+ in annual ad spend",
        bio: "James builds and optimizes Google Ads, Meta, and cross-channel PPC accounts. He set up the conversion tracking and campaign structures behind our home services and e-commerce client results. If an account wastes budget on junk searches, he finds it in week one.",
        expertise: ["Google Ads", "Meta Ads", "Conversion tracking", "ROAS optimization"],
        linkedin: "https://www.linkedin.com/in/james-chen-kinexis/",
      },
      {
        slug: "maria-rodriguez",
        name: "Maria Rodriguez",
        jobTitle: "Head of Content & SEO",
        credentials: "Former in-house content lead for a Series B SaaS company",
        bio: "Maria runs keyword research, content production, and on-page SEO for client accounts. She built the content systems behind our SaaS and B2B consulting case studies. She cares about content that ranks and converts, not word count for its own sake.",
        expertise: ["Content strategy", "Technical SEO", "Link building", "Bilingual EN/ES content"],
        linkedin: "https://www.linkedin.com/in/maria-rodriguez-kinexis/",
      },
    ],
  },
  es: {
    authors: [
      {
        slug: "sarah-mitchell",
        name: "Sarah Mitchell",
        jobTitle: "Fundadora y Directora de Estrategia",
        credentials: "12 años en SEO y medios pagados para marcas B2B y servicios locales",
        bio: "Sarah fundó KINEXIS después de liderar crecimiento en dos agencias que priorizaban presentaciones sobre resultados. Dirige estrategia de clientes y las auditorías que inician cada proyecto.",
        expertise: ["Estrategia SEO", "Mix de canales", "Auditorías locales", "Informes"],
      },
      {
        slug: "james-chen",
        name: "James Chen",
        jobTitle: "Director de Medios Pagados",
        credentials: "Certificado en Google Ads y Meta, gestionó más de $4M anuales en publicidad",
        bio: "James construye y optimiza cuentas de Google Ads, Meta y PPC multicanal. Configuró el seguimiento de conversiones detrás de nuestros resultados en servicios del hogar y e-commerce.",
        expertise: ["Google Ads", "Meta Ads", "Seguimiento de conversiones", "Optimización ROAS"],
      },
      {
        slug: "maria-rodriguez",
        name: "Maria Rodriguez",
        jobTitle: "Directora de Contenido y SEO",
        credentials: "Ex-líder de contenido in-house en una empresa SaaS Serie B",
        bio: "Maria dirige investigación de palabras clave, producción de contenido y SEO on-page. Construyó los sistemas de contenido detrás de nuestros casos de estudio SaaS y B2B.",
        expertise: ["Estrategia de contenido", "SEO técnico", "Link building", "Contenido bilingüe"],
      },
    ],
  },
};

export function getAuthor(slug: string, locale: Locale): Author | undefined {
  return authorsContent[locale].authors.find((a) => a.slug === slug);
}
