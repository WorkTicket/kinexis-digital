# Content Expansion Plan — KINEXIS Digital

**Date:** 2026-07-14  
**Status:** Ready to implement  
**Priority:** P0 (highest — content volume is #1 ranking blocker)

---

## Analysis

- Current content: 26 blog posts (19 cluster + 7 featured) + 3 case studies = **29 pieces**
- Top SEO competitors in digital marketing space: **150-400+ articles**
- Avg. monthly posting rate needed: **6-8 posts/month** to catch up in 12-18 months
- Content is well-written and substantive (~5000 words/post average) — volume is the gap, not quality

---

## Priority Topics (by keyword opportunity)

### Tier 1: Long-tail SEO topics (lower competition, high conversion intent)

| # | Topic | Target Keyword | Comp. Level | Cluster | Priority |
|---|-------|---------------|-------------|---------|----------|
| 1 | SEO Pricing: How Much Should You Budget for SEO in 2026? | "seo pricing 2026" / "how much does seo cost" | Low | SEO | P0 |
| 2 | SEO for Small Business: A Realistic 90-Day Plan | "seo for small business" / "small business seo guide" | Low-Med | SEO | P0 |
| 3 | How to Choose an SEO Agency (Checklist) | "how to choose an seo agency" / "seo agency checklist" | Low | SEO | P0 |
| 4 | Local SEO vs National SEO: Which Do You Need? | "local seo vs national seo" | Low | Local SEO | P0 |
| 5 | SEO for Startups: Building Organic Growth from Day 1 | "seo for startups" | Low-Med | SEO | P1 |
| 6 | Google Ads Management Pricing: What to Expect in 2026 | "google ads management pricing" | Low | PPC | P1 |
| 7 | Digital Marketing for Home Services: The Complete Guide | "digital marketing for home services" | Low | Industry | P1 |
| 8 | PPC for Small Business: Is It Worth It? | "ppc for small business" | Low-Med | PPC | P1 |
| 9 | How Long Does SEO Take? Realistic Timelines | "how long does seo take" | Low | SEO | P0 |
| 10 | Conversion Rate Optimization for Service Businesses | "cro for service businesses" | Low | CRO | P1 |

### Tier 2: Industry-specific content (differentiation + topical authority)

| # | Topic | Cluster | Priority |
|---|-------|---------|----------|
| 11 | SEO for HVAC Companies: Complete Guide | Industry | P1 |
| 12 | SEO for Plumbing Companies: Complete Guide | Industry | P1 |
| 13 | SEO for Dental Practices: Complete Guide | Industry | P1 |
| 14 | SEO for Law Firms: Complete Guide | Industry | P1 |
| 15 | SEO for Contractors: Complete Guide | Industry | P1 |
| 16 | SEO for Real Estate Agents: Complete Guide | Industry | P1 |
| 17 | Digital Marketing for Roofing Companies | Industry | P2 |
| 18 | Digital Marketing for Ecommerce Stores | Industry | P2 |

### Tier 3: Data-driven / original research (backlink magnets)

| # | Topic | Goal | Priority |
|---|-------|------|----------|
| 19 | SEO Industry Benchmark Report 2026 (CTR by position, avg. time to rank, etc.) | PR / links | P2 |
| 20 | Digital Marketing Budget Survey: How Much Are Businesses Spending? | PR / links | P2 |
| 21 | The State of Local SEO: 500 Business Profiles Analyzed | PR / links | P2 |

### Tier 4: How-to / tool comparisons (grants featured snippets)

| # | Topic | Priority |
|---|-------|----------|
| 22 | Google Search Console Guide for Beginners | P2 |
| 23 | Ahrefs vs Semrush vs Moz: Which SEO Tool Is Right for You? | P2 |
| 24 | Google Analytics 4 Setup Guide: Step by Step | P2 |
| 25 | How to Run a Technical SEO Audit (DIY) | P2 |

---

## Implementation Strategy

### Month 1 (6-8 posts)
1. SEO Pricing: How Much Should You Budget for SEO in 2026?
2. How Long Does SEO Take? Realistic Timelines
3. How to Choose an SEO Agency (Checklist)
4. Digital Marketing for Home Services: The Complete Guide
5. SEO for Small Business: A Realistic 90-Day Plan
6. Google Ads Management Pricing: What to Expect in 2026
7. Local SEO vs National SEO: Which Do You Need?
8. PPC for Small Business: Is It Worth It?

### Month 2 (6-8 posts)
1. SEO for HVAC Companies: Complete Guide
2. SEO for Plumbing Companies: Complete Guide
3. SEO for Dental Practices: Complete Guide
4. Conversion Rate Optimization for Service Businesses
5. SEO for Law Firms: Complete Guide
6. SEO for Startups: Building Organic Growth from Day 1
7. Google Search Console Guide for Beginners
8. Ahrefs vs Semrush vs Moz: Which SEO Tool Is Right for You?

### Month 3 (4-6 posts + backlink push)
1. SEO for Contractors: Complete Guide
2. SEO for Real Estate Agents: Complete Guide
3. Digital Marketing for Ecommerce Stores
4. Google Analytics 4 Setup Guide: Step by Step
5. How to Run a Technical SEO Audit (DIY)
6. Launch Tier 3 research content + PR outreach

---

## Content Structure Template

```typescript
// In src/content/blog-articles-en-expanded.ts
"topic-slug": {
  title: "SEO Title That Targets Long-Tail Keyword",
  category: "Category",
  publishedAt: "Month DD, 2026",
  body: `<p>Introduction that hooks reader and includes target keyword naturally.</p>
<h2>Subheading Targeting Related Keyword</h2>
<p>Content body with actionable advice, examples, and internal links to service pages.</p>
// ... more sections
<h2>CTA Section</h2>
<p>Final paragraph with soft CTA and link to relevant service page.</p>`,
},
```

### Internal Linking Requirements (every new post)
- Link to 2 existing related articles
- Link to 1 relevant service page
- Link to 1 case study (if applicable)
- Receive backlinks from 2 existing articles (add retroactive links)

---

## Tracking

- Add each new post to `src/content/registry/site-routes.ts` `blogSlugs` array
- Update sitemap automatically picks them up
- After deploying, run `npm run submit:indexnow`
- Track rankings in GSC: monitor impressions for target keywords weekly
- Check Ahrefs: re-crawl 2 weeks after content batch is deployed

---

## Expected Impact

- **3-6 months:** Tier 1 content should rank for long-tail terms (positions 5-15)
- **6-12 months:** Content compounding + backlinks should move core service pages (positions 3-10)
- **12-18 months:** Sufficient domain authority + content volume to compete for top-tier terms
