/**
 * Migration: static pages page.tsx → components/pages/*PageClient.tsx + server shells.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const clientsDir = path.join(root, "src/components/pages");
fs.mkdirSync(clientsDir, { recursive: true });

const pages = [
  {
    dir: "about",
    path: "/about",
    breadcrumb: "About",
    contentVar: "aboutContent",
    contentType: "AboutContent",
    contentPath: "@/content/about",
    clientName: "AboutPageClient",
    pageFn: "AboutPage",
  },
  {
    dir: "contact",
    path: "/contact",
    breadcrumb: "Contact",
    contentVar: "contactContent",
    contentType: "ContactContent",
    contentPath: "@/content/contact",
    clientName: "ContactPageClient",
    pageFn: "ContactPage",
  },
  {
    dir: "blog",
    path: "/blog",
    breadcrumb: "Blog",
    contentVar: "blogContent",
    contentType: "BlogContent",
    contentPath: "@/content/blog",
    clientName: "BlogPageClient",
    pageFn: "BlogPage",
    extraClientEdits: (src) =>
      src
        .replace(/import \{ useEffect, useState \} from "react";\n/, 'import { useState } from "react";\n')
        .replace(/import \{ useLocale \} from "next-intl";\n/, "")
        .replace(/\s*const locale = useLocale\(\);\n/, "")
        .replace(
          /\s*useEffect\(\(\) => \{\n\s*setActiveCategory\(c\.categories\[0\]\);\n\s*\}, \[locale, c\.categories\]\);\n/,
          "\n",
        ),
  },
  {
    dir: "case-studies",
    path: "/case-studies",
    breadcrumb: "Case Studies",
    contentVar: "caseStudiesContent",
    contentType: "CaseStudiesContent",
    contentPath: "@/content/case-studies",
    clientName: "CaseStudiesPageClient",
    pageFn: "CaseStudiesPage",
    extraClientEdits: (src) =>
      src
        .replace(/import \{ useEffect, useState \} from "react";\n/, 'import { useState } from "react";\n')
        .replace(/import \{ useLocale \} from "next-intl";\n/, "")
        .replace(/\s*const locale = useLocale\(\);\n/, "")
        .replace(
          /\s*useEffect\(\(\) => \{\n\s*setActiveIndustry\(c\.industries\[0\]\);\n\s*\}, \[locale, c\.industries\]\);\n/,
          "\n",
        ),
  },
  {
    dir: "lead-magnet",
    path: "/lead-magnet",
    breadcrumb: "Free Growth Audit",
    contentVar: "leadMagnetContent",
    contentType: "LeadMagnetContent",
    contentPath: "@/content/lead-magnet",
    clientName: "LeadMagnetPageClient",
    pageFn: "LeadMagnetPage",
  },
];

for (const page of pages) {
  const pagePath = path.join(root, `src/app/[locale]/${page.dir}/page.tsx`);
  let src = fs.readFileSync(pagePath, "utf8");

  if (!src.startsWith('"use client"')) {
    console.log(`Skip ${page.dir} — not a client page`);
    continue;
  }

  src = src.replace(/import \{ useLocalizedContent \} from "@\/hooks\/useLocalizedContent";\r?\n?/, "");

  const contentImportRe = new RegExp(
    `import \\{ ${page.contentVar} \\} from "${page.contentPath.replace("@", "@")}";\\r?\\n?`,
  );
  src = src.replace(
    contentImportRe,
    `import type { ${page.contentType} } from "${page.contentPath}";\n`,
  );

  src = src.replace(
    new RegExp(`\\s*const c = useLocalizedContent\\(${page.contentVar}\\);\\r?\\n`),
    "",
  );

  src = src.replace(
    new RegExp(`export default function ${page.pageFn}\\(\\) \\{`),
    `type Props = { content: ${page.contentType} };\n\nexport default function ${page.clientName}({ content: c }: Props) {`,
  );

  if (page.extraClientEdits) {
    src = page.extraClientEdits(src);
  }

  const clientPath = path.join(clientsDir, `${page.clientName}.tsx`);
  fs.writeFileSync(clientPath, src);
  console.log(`Wrote ${clientPath}`);

  const serverPage = `import { setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import JsonLd from "@/components/seo/JsonLd";
import type { Locale } from "@/i18n/routing";
import { ${page.contentVar} } from "${page.contentPath}";
import { getLocalizedContent } from "@/lib/get-localized-content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";

const ${page.clientName} = dynamic(() => import("@/components/pages/${page.clientName}"));

type Props = { params: Promise<{ locale: Locale }> };

export default async function ${page.pageFn}({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getLocalizedContent(${page.contentVar}, locale);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", url: buildAbsoluteUrl(locale, "/") },
            { name: "${page.breadcrumb}", url: buildAbsoluteUrl(locale, "${page.path}") },
          ]),
        ]}
      />
      <${page.clientName} content={content} />
    </>
  );
}
`;

  fs.writeFileSync(pagePath, serverPage);
  console.log(`Wrote server shell ${pagePath}`);
}

console.log("Done.");
