/**
 * One-time migration: move service page.tsx → components/services/clients/*PageClient.tsx
 * and replace page.tsx with server shells.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const services = [
  { slug: "seo", dir: "seo", contentVar: "seoContent", contentType: "SeoContent", contentPath: "@/content/services/seo", clientName: "SeoPageClient", pageFn: "SeoPage" },
  { slug: "web-design", dir: "web-design", contentVar: "webDesignContent", contentType: "WebDesignContent", contentPath: "@/content/services/web-design", clientName: "WebDesignPageClient", pageFn: "WebDesignPage" },
  { slug: "paid-ads", dir: "paid-ads", contentVar: "paidAdsContent", contentType: "PaidAdsContent", contentPath: "@/content/services/paid-ads", clientName: "PaidAdsPageClient", pageFn: "PaidAdsPage" },
  { slug: "cro", dir: "cro", contentVar: "croContent", contentType: "CROContent", contentPath: "@/content/services/cro", clientName: "CroPageClient", pageFn: "CROPage" },
  { slug: "funnels", dir: "funnels", contentVar: "funnelsContent", contentType: "FunnelsContent", contentPath: "@/content/services/funnels", clientName: "FunnelsPageClient", pageFn: "FunnelsPage" },
  { slug: "branding", dir: "branding", contentVar: "brandingContent", contentType: "BrandingContent", contentPath: "@/content/services/branding", clientName: "BrandingPageClient", pageFn: "BrandingPage" },
  { slug: "email-marketing", dir: "email-marketing", contentVar: "emailMarketingContent", contentType: "EmailMarketingContent", contentPath: "@/content/services/email-marketing", clientName: "EmailMarketingPageClient", pageFn: "EmailMarketingPage" },
  { slug: "content-marketing", dir: "content-marketing", contentVar: "contentMarketingContent", contentType: "ContentMarketingContent", contentPath: "@/content/services/content-marketing", clientName: "ContentMarketingPageClient", pageFn: "ContentMarketingPage" },
  { slug: "social-media", dir: "social-media", contentVar: "socialMediaContent", contentType: "SocialMediaContent", contentPath: "@/content/services/social-media", clientName: "SocialMediaPageClient", pageFn: "SocialMediaPage" },
  { slug: "video-marketing", dir: "video-marketing", contentVar: "videoMarketingContent", contentType: "VideoMarketingContent", contentPath: "@/content/services/video-marketing", clientName: "VideoMarketingPageClient", pageFn: "VideoMarketingPage" },
  { slug: "analytics", dir: "analytics", contentVar: "analyticsContent", contentType: "AnalyticsContent", contentPath: "@/content/services/analytics", clientName: "AnalyticsPageClient", pageFn: "AnalyticsPage" },
  { slug: "growth-consulting", dir: "growth-consulting", contentVar: "growthConsultingContent", contentType: "GrowthConsultingContent", contentPath: "@/content/services/growth-consulting", clientName: "GrowthConsultingPageClient", pageFn: "GrowthConsultingPage" },
];

const clientsDir = path.join(root, "src/components/services/clients");
fs.mkdirSync(clientsDir, { recursive: true });

for (const svc of services) {
  const pagePath = path.join(root, `src/app/[locale]/services/${svc.dir}/page.tsx`);
  let src = fs.readFileSync(pagePath, "utf8");

  if (!src.startsWith('"use client"')) {
    console.log(`Skip ${svc.slug} — not a client page`);
    continue;
  }

  // Remove useLocalizedContent import
  src = src.replace(/import \{ useLocalizedContent \} from "@\/hooks\/useLocalizedContent";\n?/, "");

  // Replace content value import with type-only import
  const contentImportRe = new RegExp(
    `import \\{ ${svc.contentVar} \\} from "${svc.contentPath.replace("@", "@")}";\\n?`
  );
  src = src.replace(
    contentImportRe,
    `import type { ${svc.contentType} } from "${svc.contentPath}";\n`
  );

  // Remove useLocalizedContent call
  src = src.replace(
    new RegExp(`\\s*const c = useLocalizedContent\\(${svc.contentVar}\\);\\n`),
    ""
  );

  // Replace default export function with props-based client component
  src = src.replace(
    new RegExp(`export default function ${svc.pageFn}\\(\\) \\{`),
    `type Props = { content: ${svc.contentType} };\n\nexport default function ${svc.clientName}({ content: c }: Props) {`
  );

  const clientPath = path.join(clientsDir, `${svc.clientName}.tsx`);
  fs.writeFileSync(clientPath, src);
  console.log(`Wrote ${clientPath}`);

  const serverPage = `import { createServicePage } from "@/lib/create-service-page";
import { ${svc.contentVar} } from "${svc.contentPath}";

export default createServicePage(
  "${svc.slug}",
  ${svc.contentVar},
  () => import("@/components/services/clients/${svc.clientName}"),
);
`;

  fs.writeFileSync(pagePath, serverPage);
  console.log(`Wrote server shell ${pagePath}`);
}

// Services hub
const hubPagePath = path.join(root, "src/app/[locale]/services/page.tsx");
let hubSrc = fs.readFileSync(hubPagePath, "utf8");
hubSrc = hubSrc.replace(/import \{ useLocalizedContent \} from "@\/hooks\/useLocalizedContent";\n?/, "");
hubSrc = hubSrc.replace(
  /import \{\n  servicesPageContent,\n  type PathwayPaidAdsVisual,\n  type PathwaySeoVisual,\n  type PathwayWebDesignVisual,\n\} from "@\/content\/services-page";/,
  `import type {
  PathwayPaidAdsVisual,
  PathwaySeoVisual,
  PathwayWebDesignVisual,
  ServicesPageContent,
} from "@/content/services-page";`
);
hubSrc = hubSrc.replace(/\s*const c = useLocalizedContent\(servicesPageContent\);\n/, "");
hubSrc = hubSrc.replace(
  /export default function ServicesPage\(\) \{/,
  "type Props = { content: ServicesPageContent };\n\nexport default function ServicesHubClient({ content: c }: Props) {"
);

const hubClientPath = path.join(clientsDir, "ServicesHubClient.tsx");
fs.writeFileSync(hubClientPath, hubSrc);
console.log(`Wrote ${hubClientPath}`);

const hubServerPage = `import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { servicesPageContent } from "@/content/services-page";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { getServicesHubMetadata } from "@/lib/static-page-metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const ServicesHubClient = dynamic(() => import("@/components/services/clients/ServicesHubClient"));

type Props = { params: Promise<{ locale: Locale }> };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(servicesPageContent, locale);
  const meta = getServicesHubMetadata(locale);
  const description =
    typeof meta.description === "string" ? meta.description : "KINEXIS Digital services.";

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "Services", url: buildAbsoluteUrl(locale, "/services") },
          ]),
        ]}
      />
      <ServicesHubClient content={content} />
    </>
  );
}
`;

fs.writeFileSync(hubPagePath, hubServerPage);
console.log(`Wrote server shell ${hubPagePath}`);

console.log("Migration complete.");
