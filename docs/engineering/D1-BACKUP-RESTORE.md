# D1 invoice ledger — backup & restore

**Database:** `kinexis-invoice-ledger` (`INVOICE_DB`, id `077c8e46-2ea8-4997-8b6a-c06902194575`)  
**Preview:** `kinexis-invoice-ledger-preview` (`5a474f5a-4ac9-4d4c-8309-943c3d52981b`)  
**Do not** touch the unrelated older D1 named `kinexis`.  
**Do not** re-apply `migrations/0001_invoice_payment_ledger.sql` casually (already applied).

## Goals

- Owner-PC backup of production invoice/payment tables without agents deploying or mutating secrets.
- Documented restore path that prefers **KV invoice copy** + selective D1 repair over blind SQL import.
- Verifiable dry run in CI/local without remote access.

## Backup (read-only export)

Script: `scripts/d1-backup-invoice-ledger.mjs`

### Local / CI dry run (no network)

```bash
npm run backup:d1-invoice -- --dry-run
```

Prints the exact wrangler commands that would run. Exit 0. No files written.

### Owner remote export

From a wrangler-authenticated machine:

```powershell
$env:D1_BACKUP_CONFIRM = "YES"
npm run backup:d1-invoice -- --remote
Remove-Item Env:D1_BACKUP_CONFIRM
```

Writes SQL dump under `artifacts/d1-backups/` (gitignored) with a UTC timestamp. Uses:

```text
npx wrangler d1 export kinexis-invoice-ledger --remote --output <path>
```

Optional preview:

```powershell
$env:D1_BACKUP_CONFIRM = "YES"
npm run backup:d1-invoice -- --remote --preview
```

Store the dump **off-repo** (encrypted drive / owner backup). Do not commit dumps (may contain invoice descriptions / company names).

## Verify a dump (structure only)

```bash
npm run backup:d1-invoice -- --verify path/to/dump.sql
```

Checks that the SQL text mentions `invoices` and `payment_events` create/insert blocks. Does not execute against production.

## Restore (owner-gated — destructive if misused)

Prefer these steps **in order**:

1. **Do not panic-import.** KV `invoice:v1:*` was the Phase 1 rollback copy for invoice payloads; D1 is the payment ledger. See `PHASE1-PRODUCTION-SETUP.md`.
2. If only a few rows are wrong: fix with targeted `wrangler d1 execute` SELECTs first, then minimal UPDATEs after written approval.
3. Full restore from dump (last resort):
   - Create a **new** empty D1 database (do not overwrite live id blindly).
   - Import the dump into the new DB (`wrangler d1 execute … --file` / dashboard import — follow current Wrangler docs).
   - Point a **preview** Worker binding at the new id and smoke invoice routes.
   - Only then change production `wrangler.jsonc` binding + deploy (manual owner deploy).
4. Never delete the live production database until the replacement has been verified on preview.

Agents must **stop** before any restore step that writes to production D1. Owner types the commands.

## Cadence

- Before any invoice schema migration (future).
- After unusual payment volume or before major Worker releases.
- Keep at least the last 3 dated dumps off-repo.

## Related

- `docs/engineering/PAYMENT-RECONCILIATION.md` — consistency checks after restore.
- `docs/engineering/production-hardening/PHASE1-PRODUCTION-SETUP.md` — original provision + KV import.
