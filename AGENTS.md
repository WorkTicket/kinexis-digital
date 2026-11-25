# KINEXIS Digital — Agent Instructions

## Project
Custom marketing website for KinexIS Digital (US service businesses). Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Deployed to Cloudflare Workers via OpenNext. See `package.json` and `README.md`.

## Context loading (do first)
- Read this file first.
- Read `docs/ARCHITECTURE.md` to find relevant files/routes/components.
- Read `docs/COMPONENTS.md` before creating components.
- Read `docs/DESIGN-SYSTEM.md` only for visual work.
- Read `docs/CONTENT.md` only when changing copy.
- Read `docs/WORKFLOWS.md` for validation commands.
- Read `docs/CURRENT-TASK.md` when resuming work.
- Read `docs/DECISIONS.md` if unsure why something exists.
- Do not read every docs file by default.

## Efficient code exploration
- Search filenames before file contents.
- Inspect only files relevant to the request.
- Avoid scanning `node_modules`, `.next`, `out`, build outputs.
- Reuse existing code/components. Don't rebuild working features.
- Avoid repeatedly reading unchanged files.
- Avoid dumping large files/verbose command output.
- Prefer targeted edits and focused searches.

## Coding rules
- Use TypeScript, Next.js App Router, and Tailwind patterns already established.
- Use path alias `@/*` (see `tsconfig.json`).
- Preserve responsive layouts and accessibility.
- Do not add dependencies without a clear need.
- Do not modify unrelated files.
- Do not invent product claims/pricing. Use `docs/CONTENT.md`.
- Follow existing patterns in neighboring files.

## Design quality
- Follow `docs/DESIGN-SYSTEM.md` (sticker/brand style: navy/orange/cobalt, hard shadows).
- Create polished, custom interfaces. Avoid generic templates.
- Prioritize visual hierarchy and mobile layouts.
- Preserve approved assets and design decisions.

## Verification
- Run targeted checks first (`npm run lint`, `npm run typecheck` if relevant).
- Run full builds only when changes justify them.
- Fix errors caused by your changes.
- Report any checks that could not run.

## Communication
- Be concise. Avoid narrating routine tool calls.
- Make reasonable implementation decisions independently.
- Ask questions only for genuinely blocking ambiguity.
- Finish with a brief summary of changes and tests.

## Session handoff
When requested, update `docs/CURRENT-TASK.md` with goal/status, changed files, completed/unfinished, errors/blockers, and exact next action. Keep it short.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
