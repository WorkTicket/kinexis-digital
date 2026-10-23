// Backwards-compatible re-export. Portfolio data lives in src/data/portfolio.ts.
export type { Project, SiteKind } from "@/data/portfolio";
export {
  PROJECTS,
  PROJECT_GROUPS,
  PORTFOLIO_ASSET_VERSION,
  CUSTOM_PROJECTS,
  TEMPLATE_PROJECTS,
  getProject,
  portfolioFile,
} from "@/data/portfolio";
