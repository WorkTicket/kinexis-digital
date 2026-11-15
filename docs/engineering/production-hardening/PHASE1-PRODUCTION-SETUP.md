# Phase 1 production setup

Completed on 2026-11-15. This file stays as the procedure. The live result is below. Do not start Phase 2.

## What shipped

- PR #6 merged to `main` as `a32c39b`.
- Worker `kinexis-digital` version `87e26f40-6f60-4c83-95c9-33d56e483705`, deployed from that commit. Rollback version `5c5690e8-216f-4441-ab32-fb056b401dd2`.
- D1 migration 0001 applied to production `kinexis-invoice-ledger` (`077c8e46-2ea8-4997-8b6a-c06902194575`) and preview `kinexis-invoice-ledger-preview` (`5a474f5a-4ac9-4d4c-8309-943c3d52981b`). Both ledger tables had 0 rows. The unrelated database named `kinexis` was left alone.
- Production KV prefix `invoice:v1:` had 0 keys, so nothing was imported. `INVOICE_LINK_SECRET_PREVIOUS` was not set. The staff route returns a link only after the invoice is stored, and the app never deletes those keys.
- Production secrets set, values not copied here except the live webhook id the owner recorded: live `PAYPAL_MERCHANT_ID`, `PAYPAL_WEBHOOK_ID` `24N19060893354101` for `https://kinexisdigital.com/api/paypal/webhook`, `PAYPAL_API_BASE` = `https://api-m.paypal.com`, and `INVOICE_LINK_SECRET` (32 random bytes generated on the owner PC and never printed).
- Smoke, no payment: `www` and apex `/` returned 200, `/pay` returned 200, unsigned `POST /api/paypal/webhook` returned 400 `{"error":"invalid signature headers"}`, and `GET` returned 405.
- Not verified: a PayPal-signed live webhook. That stays open until the first real payment event. No real payment test was run.

The steps below are the procedure that was used. Re-running database create is skipped when these ids are already in `wrangler.jsonc`.

Run this on the Windows checkout where `npx wrangler` is already logged in. The script is `scripts/phase1-production-setup.ps1`. It pauses before every production change and asks you to type `YES`.

It never runs `wrangler deploy`, `npm run deploy`, or `npm run deploy:worker`. Publishing the new Worker code stays a command you type yourself, after you have read the diff and this runbook.

Do not put sandbox PayPal values on the production Worker. Production payments stay on the live PayPal API.

## What the current production code signs with

The Worker that is live today is the `main` code from before this branch. Its invoice link key is:

`INVOICE_LINK_SECRET`, if that secret is already set, otherwise `PAYPAL_CLIENT_SECRET`.

Those links are an unversioned HMAC of `invoice:<id>`. The new code does not fall back to the PayPal secret. New links are `v2.` signatures from `INVOICE_LINK_SECRET` (at least 32 bytes). Old links keep working only when the key that signed them is stored as `INVOICE_LINK_SECRET_PREVIOUS`.

Check names, not values, with `npx wrangler secret list`.

- If `INVOICE_LINK_SECRET` is already listed, existing links were signed with that value. That value is what belongs in `INVOICE_LINK_SECRET_PREVIOUS` after you generate a new current secret.
- If `INVOICE_LINK_SECRET` is not listed, existing links were signed with the live `PAYPAL_CLIENT_SECRET`. Put that live secret in `INVOICE_LINK_SECRET_PREVIOUS`. Do not use the sandbox client secret. A sandbox secret would not verify live links.

Setting a new `INVOICE_LINK_SECRET` while the old Worker is still running changes which key the old code uses and breaks existing links. The script refuses that secret until you type `THE NEW CODE IS DEPLOYED`.

## What production PayPal must be

Leave production `PAYPAL_API_BASE` unset. The code then calls `https://api-m.paypal.com`. That is the live API, which is what real customer charges use. Pointing production at `https://api-m.sandbox.paypal.com` would stop real charges from completing.

The sandbox client, secret, merchant id, and webhook id belong only on the preview Worker (`kinexis-digital-preview`), and only if you opt in. The production Worker needs the live app's merchant id and a webhook id from the live app. The sandbox webhook registered for `https://kinexisdigital.com/api/paypal/webhook` is not the live webhook id.

`PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` on production should stay the live values already there. This setup does not replace them.

## Commands you are approving

Each line is one production change. The script runs one only after you type `YES`.

1. Create an empty D1 database named `kinexis-invoice-ledger`.
2. Write its id into `wrangler.jsonc` in place of `00000000-0000-4000-8000-000000000001`. The script shows the diff first. It does not commit.
3. Create an empty D1 database named `kinexis-invoice-ledger-preview`.
4. Write its id into `wrangler.jsonc` in place of `00000000-0000-4000-8000-000000000002`.
5. Apply `migrations/0001_invoice_payment_ledger.sql` to the preview database. Wrangler asks a second time and takes a backup.
6. Apply that same migration to the production database. The current Worker does not read this database until you deploy.
7. Read every production KV key named `invoice:v1:*` and print a dry run. No database writes. KV is not changed.
8. Insert the valid invoices into production D1. A second run does not overwrite a row that is already there. KV is not changed.
9. Read KV and D1 again and check that the valid row count matches and that amount, currency, status, order id, and capture id match.
10. Only after the Phase 1 code is deployed: generate a 32-byte `INVOICE_LINK_SECRET` on this PC and store it on the production Worker. The value is not printed.
11. Optionally store `INVOICE_LINK_SECRET_PREVIOUS` as the key from the section above.
12. Optionally store the live `PAYPAL_MERCHANT_ID` and the live `PAYPAL_WEBHOOK_ID` on the production Worker.
13. Optionally store sandbox PayPal values, including `PAYPAL_API_BASE=https://api-m.sandbox.paypal.com`, on the preview Worker only.

## How to run it

From the repository root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\phase1-production-setup.ps1
```

Stop at any prompt by typing anything other than `YES`. The script throws and does not continue.

If the dry run reports validation errors, it stops before the write. Invalid rows stay in KV. Fix them, or re-run the importer yourself with `--skip-invalid` only if you accept leaving those rows out of D1:

```powershell
$env:PHASE1_IMPORT_CONFIRM = "YES"
node .\scripts\import-invoice-kv.mjs --remote --apply --skip-invalid
Remove-Item Env:PHASE1_IMPORT_CONFIRM
node .\scripts\import-invoice-kv.mjs --remote --verify
```

The dry run prints id prefixes, amounts, currency, and status for up to five rows. It does not print descriptions or company names.

## Rollback

KV is never deleted or modified. It remains the rollback copy of every invoice.

| Step | If you need to undo it |
|---|---|
| A. Databases created, config not yet used by a deploy | Delete the empty databases in the Cloudflare dashboard. Run `git checkout -- wrangler.jsonc`. |
| A. `wrangler.jsonc` edited | `git checkout -- wrangler.jsonc` restores the placeholder ids. The empty databases can stay. |
| B. Migration applied, no invoices imported | Leave the empty tables. Dropping them is optional and only safe before the import. Wrangler keeps a backup of the migration itself. |
| C. Import wrote D1 rows | Leave KV alone. Do not deploy until verification passed. A second import will not overwrite a row with the same id. To discard a bad copy, delete the D1 rows in the dashboard before deploy, then import again. Do not delete KV. |
| D. `INVOICE_LINK_SECRET` stored before any v2 link was sent | `npx wrangler secret delete INVOICE_LINK_SECRET` returns the Worker to having no dedicated signing secret. Do this only if the new code is not live, or customers have not received new links. |
| D. Previous key stored | `npx wrangler secret delete INVOICE_LINK_SECRET_PREVIOUS` makes old links fail on the new code. Put the key back if old links must work. |
| D. Live merchant or webhook id stored | Put the previous value back with `npx wrangler secret put`, or delete the name if the old code never read it. Old code ignores `PAYPAL_MERCHANT_ID` and `PAYPAL_WEBHOOK_ID`. |
| Preview sandbox secrets | `npx wrangler secret delete <NAME> --env preview` affects only `kinexis-digital-preview`. |
| Deploy | Not performed by this script. Rolling back a deploy is `npx wrangler rollback`, which you run yourself. |

## After this script

Verification in step C must report `countsMatch: true` before you treat D1 as the invoice store. The new code reads D1 only. It does not read `invoice:v1:*` from KV. Deploying before a passing verification makes those invoices look missing.

Deploy, when you decide to, is still:

```powershell
npm run deploy
```

That command is not part of the setup script.
