"use client";

import { m as motion } from "@/lib/framer";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Search, BarChart3, Monitor, Filter, Palette, FileText } from "lucide-react";
import { getServiceExploreLabel } from "@/lib/service-explore-labels";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { useMotionVariants } from "@/hooks/useMotionVariants";
import Section from "@/components/shared/services/Section";

const services = [
  {
    icon: Monitor,
    title: "Website Design",
    description: "Custom websites built from scratch. Every layout, button, and page is designed to turn visitors into qualified leads. No templates, no cookie-cutter designs. Fast-loading, beautiful sites that actually convert.",
    href: "/services/web-design",
  },
  {
    icon: Search,
    title: "SEO",
    description: "We target keywords your ideal customers actually search for. Our organic strategies earn top rankings for terms that drive qualified traffic, not vanity keywords that look good on a report but attract the wrong audience.",
    href: "/services/seo",
  },
  {
    icon: BarChart3,
    title: "Paid Ads",
    description: "Every dollar gets optimized toward booked calls with qualified buyers. We engineer every ad, audience, and bid strategy to maximize ROAS and fill your pipeline with real conversations, not just clicks.",
    href: "/services/ppc-management",
  },
  {
    icon: Filter,
    title: "Funnels & CRO",
    description: "Complete conversion systems that turn cold traffic into warm leads and warm leads into paying clients. Lead magnets, email sequences, and landing pages built to convert at rates that actually move revenue.",
    href: "/services/funnels",
  },
  {
    icon: Palette,
    title: "Branding",
    description: "Positioning, visual identity, and messaging systems that command trust and recognition. From your logo to your voice, everything feels cohesive and built to attract the right clients.",
    href: "/services/branding",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    description: "Authority-building content that answers the exact questions your buyers are searching for. Lead magnets that capture emails. Nurture sequences that build trust over time. Content that moves buyers closer to a decision.",
    href: "/services/content-marketing",
  },
];

export default function ServicesOverview() {
  const { fadeUp, stagger } = useMotionVariants();
  const tCommon = useTranslations("common");

  return (
    <Section id="services-overview" surfaceIndex={0}>
      <div className="container-site">
        <SectionHeader
          badge="Connected Services"
          title="What we build for clients"
          description="Every service gets measured against one question: does this actually move the revenue needle? If the answer is no, we do not do it."
          headingId="services-overview-heading"
        />

        <motion.div
          className="section-content grid-tablet-services"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeUp}>
              <Link href={service.href} className="group block h-full touch-manipulation">
                <Card className="h-full flex flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                    <service.icon className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="card-heading group-hover:text-neon-cyan transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="mt-3 type-body text-muted">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-strong">
                    <span className="text-base font-semibold text-neon-cyan inline-flex items-center gap-2 min-h-touch">
                      {getServiceExploreLabel(service.href)}
                      <span className="transition-transform duration-200">&rarr;</span>
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="section-cta-row">
          <Button
            href="/services"
            variant="secondary"
            fullWidthMobile
           
          >
            {tCommon("viewAllServices")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
