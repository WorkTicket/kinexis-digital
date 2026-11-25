# Current task

**Done:** #28–#36 (lift through SEO T5); docs refresh #41.

**In progress:** Tech-0 SEO PR #37 (`cursor/seo-gsc-indexing-meta-67c1`): GSC/Ahrefs plans; dead case-study 301s; homepage/pricing/local-SEO meta; **`/es-es`→`/es`**; **painting + remodeling live**.

**Out of this repo (approved, owner deploys elsewhere):**
- BIMI: Cloudflare Pages **`kinexis-card`** (`bimi.kinexisdigital.com`) — noindex + robots (Allow `/bimi/` for logo.svg)
- Connect: **`WorkTicket/kinexis-connect`** / Worker **`kinexis-connect`** — noindex login/signup/dashboard; homepage may stay indexable

**Owner:** Cloudflare Always Use HTTPS (dashboard).

**Next after #37 merge:** T6 → T7 → trade rewrite batches. (Parallel open PRs #44/#45/#47/#49 should defer to #37 for overlapping Tech-0 work.)

**Hard rules:** Manual, exact-SHA production deploys only. No secrets in Git/config and no production migrations without separate approval. An agent may initiate a deploy only after explicit owner approval for the exact SHA, through the protected `production` GitHub Environment or locally authenticated deploy script; never bypass tests, SHA/confirmation checks, or Cloudflare recovery gates.
