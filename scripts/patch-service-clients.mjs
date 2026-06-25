import fs from "fs";
import path from "path";

const dir = "src/components/services/clients";
const slugMap = {
  "WebDesignPageClient.tsx": "web-design",
  "CroPageClient.tsx": "cro",
  "EmailMarketingPageClient.tsx": "email-marketing",
  "ContentMarketingPageClient.tsx": "content-marketing",
  "SocialMediaPageClient.tsx": "social-media",
  "VideoMarketingPageClient.tsx": "video-marketing",
  "BrandingPageClient.tsx": "branding",
  "AnalyticsPageClient.tsx": "analytics",
  "GrowthConsultingPageClient.tsx": "growth-consulting",
  "FunnelsPageClient.tsx": "funnels",
  "PaidAdsPageClient.tsx": "paid-ads",
};

for (const [file, slug] of Object.entries(slugMap)) {
  const fp = path.join(dir, file);
  let s = fs.readFileSync(fp, "utf8");
  if (s.includes("ServiceSeoSections")) {
    console.log("skip", file);
    continue;
  }

  s = s.replace(/import FAQSection from "@\/components\/sections\/FAQSection";\n?/g, "");

  const extraImports = `import ServiceSeoSections from "@/components/services/ServiceSeoSections";
import ServicePageFooter from "@/components/services/ServicePageFooter";
import { useServicePageSeo } from "@/components/services/useServicePageSeo";
`;

  if (!s.includes("useServicePageSeo")) {
    s = s.replace(/("use client";\n\n)/, `$1${extraImports}`);
  }

  const fnMatch = s.match(/export default function \w+\(\{ content: c \}: Props\) \{/);
  if (fnMatch && !s.includes("useServicePageSeo(")) {
    s = s.replace(fnMatch[0], `${fnMatch[0]}\n  const { locale, seo } = useServicePageSeo("${slug}");`);
  }

  if (s.includes("c.hero.headlineLine1")) {
    s = s.replace(/label=\{c\.hero\.label\}/g, "label={seo.hero.label}");
    s = s.replace(/c\.hero\.headlineLine1/g, "seo.hero.line1");
    s = s.replace(/c\.hero\.headlineLine2/g, "seo.hero.line2");
    s = s.replace(/c\.hero\.subtitle/g, "seo.hero.subtitle");
  } else if (s.includes("c.heroHeadlineLine1")) {
    s = s.replace(/label=\{c\.heroLabel\}/g, "label={seo.hero.label}");
    s = s.replace(/c\.heroHeadlineLine1/g, "seo.hero.line1");
    s = s.replace(/c\.heroHeadlineLine2/g, "seo.hero.line2");
    s = s.replace(/c\.heroSubtitle/g, "seo.hero.subtitle");
  }

  if (!s.includes("ServiceSeoSections")) {
    const heroStart = s.indexOf("<HeroArchetype");
    const closeIdx = s.indexOf("/>", heroStart);
    if (closeIdx > -1) {
      s =
        s.slice(0, closeIdx + 2) +
        `\n\n      <ServiceSeoSections slug="${slug}" locale={locale} />` +
        s.slice(closeIdx + 2);
    }
  }

  s = s.replace(
    /<FAQSection items=\{c\.faqs\} \/>/g,
    `<ServicePageFooter slug="${slug}" locale={locale} existingFaqs={c.faqs} />`,
  );

  fs.writeFileSync(fp, s);
  console.log("updated", file);
}
