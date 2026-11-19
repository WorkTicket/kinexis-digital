import { PAGES } from "@/lib/pages";
import { POSTS } from "@/lib/content";
import { INDUSTRIES } from "@/data/industries";
import { PROJECTS } from "@/data/portfolio";
import { CASE_STUDIES } from "@/data/caseStudies";
import { MIRROR_PATHS, EN_REDIRECTED_BLOG_SLUGS } from "@/lib/locale-path";
import { esPost } from "@/i18n/posts-es";

export const LANGUAGE_AUDIT = {
  pages: Object.values(PAGES).map((page) => ({
    path: page.path,
    kind: "static-page",
    indexable: page.indexable,
    mirrored: MIRROR_PATHS.includes(page.path),
  })),
  industries: INDUSTRIES.map((industry) => ({
    path: `/industries/${industry.slug}`,
    kind: "industry",
    indexable: industry.status === "live",
    mirrored: MIRROR_PATHS.includes(`/industries/${industry.slug}`),
  })),
  posts: POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    kind: "blog",
    indexable: true,
    mirrored: Boolean(esPost(post.slug)),
    spanishOnlySlug: EN_REDIRECTED_BLOG_SLUGS.has(post.slug),
  })),
  projects: PROJECTS.map((project) => ({
    path: `/portfolio/${project.slug}`,
    kind: "portfolio-detail",
    indexable: project.indexable && !project.placeholder,
    mirrored: false,
  })),
  caseStudies: CASE_STUDIES.map((study) => ({
    path: `/case-studies/${study.slug}`,
    kind: "case-study",
    indexable: true,
    mirrored: false,
  })),
  additional: [
    { path: "/lp/get-a-website", kind: "campaign", indexable: false, mirrored: false },
    { path: "/lp/phoenix-preview", kind: "campaign", indexable: false, mirrored: false },
    { path: "/pay", kind: "checkout", indexable: false, mirrored: false },
    { path: "/pay/thanks", kind: "checkout", indexable: false, mirrored: false },
  ],
  mirrorPaths: [...MIRROR_PATHS],
};
