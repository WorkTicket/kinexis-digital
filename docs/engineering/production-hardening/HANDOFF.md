# Programme handoff

- **Phase:** 9 — Release (LEAD_DB binding removal + merge/deploy)
- **Branch:** `cursor/phase9-release-readiness-67c1`
- **Status:** Placeholder LEAD_DB bindings removed; awaiting CI then stack merge to `main`.

| Command | Result |
|---|---|
| `npm run check` | PASS |
| `npx wrangler deploy --dry-run` | PASS (no LEAD_DB binding; real INVOICE_DB/KV ids only) |
| Production deploy | Pending merge |
