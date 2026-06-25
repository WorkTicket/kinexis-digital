# Sanity Studio

This folder is a placeholder for the Sanity Studio (CMS) project.

## Schemas

Schemas are already defined in `schemas/`:
- `caseStudy.ts` — Case Study (title, slug, client, industry, problem, strategy, solution, results, featuredImage)
- `blogPost.ts` — Blog Post (title, slug, category, author, excerpt, coverImage, publishedAt, body)
- `service.ts` — Service (title, slug, summary, benefits, processSteps, faq)

## To set up the studio

```bash
npm create sanity@latest -- --template clean --project <PROJECT_ID> --dataset production
```

Or install manually:
```bash
npm install sanity @sanity/vision
```

Then import and use the schemas from `./schemas/index.ts`:
```ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "KINEXIS Digital CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
```

## Connection

The frontend connects via `src/lib/sanity/client.ts` using `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` from `.env`.
GROQ queries are in `src/lib/sanity/queries.ts`.
