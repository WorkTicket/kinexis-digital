# Phase 1 production setup for the owner's Windows checkout.
# Reads production KV, creates D1 databases, applies the invoice migration, and can set Worker secrets.
# It never runs wrangler deploy. Deploy stays a separate command the owner types themselves.
#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

$ProdPlaceholder = "00000000-0000-4000-8000-000000000001"
$PreviewPlaceholder = "00000000-0000-4000-8000-000000000002"
$ProdDatabase = "kinexis-invoice-ledger"
$PreviewDatabase = "kinexis-invoice-ledger-preview"

function Assert-NoDeployCommand {
    $raw = Get-Content -Raw -Path $PSCommandPath
    if ($raw -match '(?m)^\s*(npx |wrangler |& npx wrangler ).*deploy') {
        throw "This script contains a deploy command and will not run."
    }
}

function Confirm-Step {
    param([Parameter(Mandatory = $true)][string]$Message)
    Write-Host ""
    Write-Host $Message
    $answer = Read-Host "Type YES to run this step"
    if ($answer -ne "YES") {
        throw "Stopped before the step. Nothing further was run."
    }
}

function Invoke-Wrangler {
    param([Parameter(Mandatory = $true)][string[]]$WranglerArgs)
    $joined = $WranglerArgs -join " "
    if ($joined -match '(^|\s)deploy($|\s)') {
        throw "Refusing to run wrangler deploy."
    }
    Write-Host ">> npx wrangler $joined"
    & npx wrangler @WranglerArgs
    if ($LASTEXITCODE -ne 0) {
        throw "wrangler exited $LASTEXITCODE. Stop and use the rollback section in PHASE1-PRODUCTION-SETUP.md."
    }
}

function Get-WranglerText {
    param([Parameter(Mandatory = $true)][string[]]$WranglerArgs)
    $joined = $WranglerArgs -join " "
    if ($joined -match '(^|\s)deploy($|\s)') {
        throw "Refusing to run wrangler deploy."
    }
    Write-Host ">> npx wrangler $joined"
    $output = & npx wrangler @WranglerArgs 2>&1 | Out-String
    if ($LASTEXITCODE -ne 0) {
        throw "wrangler exited $LASTEXITCODE. Stop and use the rollback section in PHASE1-PRODUCTION-SETUP.md."
    }
    return $output
}

function Get-CreatedDatabaseId {
    param([Parameter(Mandatory = $true)][string]$Output)
    $ids = [regex]::Matches($Output, "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}") |
        ForEach-Object { $_.Value.ToLowerInvariant() } |
        Where-Object { $_ -ne $ProdPlaceholder -and $_ -ne $PreviewPlaceholder }
    $unique = @($ids | Select-Object -Unique)
    if ($unique.Count -ne 1) {
        throw "Expected one new database id in the wrangler output. Found $($unique.Count). wrangler.jsonc was not changed."
    }
    return $unique[0]
}

function Update-PlaceholderId {
    param(
        [Parameter(Mandatory = $true)][string]$Placeholder,
        [Parameter(Mandatory = $true)][string]$DatabaseId,
        [Parameter(Mandatory = $true)][string]$Label
    )
    $path = Join-Path $Root "wrangler.jsonc"
    $text = [System.IO.File]::ReadAllText($path)
    $count = [regex]::Matches($text, [regex]::Escape($Placeholder)).Count
    if ($count -ne 1) {
        throw "Expected $Label placeholder once in wrangler.jsonc. Found $count. No edit was written."
    }
    $updated = $text.Replace($Placeholder, $DatabaseId)
    $preview = Join-Path $env:TEMP "wrangler.phase1.jsonc"
    [System.IO.File]::WriteAllText($preview, $updated)
    Write-Host "Proposed wrangler.jsonc diff for ${Label}:"
    $nativePreference = $null
    if (Test-Path variable:PSNativeCommandUseErrorActionPreference) {
        $nativePreference = $PSNativeCommandUseErrorActionPreference
        $PSNativeCommandUseErrorActionPreference = $false
    }
    & git diff --no-index -- $path $preview
    if (Test-Path variable:PSNativeCommandUseErrorActionPreference) {
        $PSNativeCommandUseErrorActionPreference = $nativePreference
    }
    if ($LASTEXITCODE -gt 1) {
        throw "git diff failed while previewing wrangler.jsonc."
    }
    Confirm-Step "Write the $Label database id into wrangler.jsonc? This does not commit and does not deploy."
    [System.IO.File]::WriteAllText($path, $updated)
    Remove-Item -Force $preview
    Write-Host "Rollback for this edit: git checkout -- wrangler.jsonc"
}

function Set-WorkerSecret {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$Value,
        [string]$Environment
    )
    if ([string]::IsNullOrWhiteSpace($Value)) {
        throw "Refusing to set $Name from an empty value."
    }
    $arguments = @("secret", "put", $Name)
    if ($Environment) {
        $arguments += @("--env", $Environment)
    }
    Write-Host ">> npx wrangler $($arguments -join ' ')"
    # Wrangler trims trailing whitespace from stdin, so the pipeline newline is not part of the secret.
    $Value | & npx wrangler @arguments
    if ($LASTEXITCODE -ne 0) {
        throw "wrangler secret put $Name exited $LASTEXITCODE."
    }
}

function New-InvoiceSigningSecret {
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $rng.GetBytes($bytes)
        return [Convert]::ToBase64String($bytes)
    } finally {
        [Array]::Clear($bytes, 0, $bytes.Length)
        $rng.Dispose()
    }
}

Assert-NoDeployCommand
Write-Host "Phase 1 setup. Worker name in wrangler.jsonc is kinexis-digital. Preview worker is kinexis-digital-preview."
Write-Host "This script never deploys. Production PayPal stays on the live API (api-m.paypal.com)."
Write-Host "Sandbox PayPal values are for the preview worker only, and only if you opt in."

$configText = [System.IO.File]::ReadAllText((Join-Path $Root "wrangler.jsonc"))
$prodReady = $configText.Contains("077c8e46-2ea8-4997-8b6a-c06902194575")
$previewReady = $configText.Contains("5a474f5a-4ac9-4d4c-8309-943c3d52981b")
if ($prodReady -and $previewReady) {
    Write-Host "D1 ids are already in wrangler.jsonc. Skipping database create. The unrelated database named kinexis is not touched."
} else {
Confirm-Step @"
Step A, production database.
This creates an empty D1 database named $ProdDatabase in the logged-in Cloudflare account.
It does not copy invoices and does not deploy.
"@
$prodOutput = Get-WranglerText @("d1", "create", $ProdDatabase)
Write-Host $prodOutput
$prodId = Get-CreatedDatabaseId $prodOutput
Update-PlaceholderId -Placeholder $ProdPlaceholder -DatabaseId $prodId -Label "production"

Confirm-Step @"
Step A, preview database.
This creates an empty D1 database named $PreviewDatabase.
It does not receive production invoices.
"@
$previewOutput = Get-WranglerText @("d1", "create", $PreviewDatabase)
Write-Host $previewOutput
$previewId = Get-CreatedDatabaseId $previewOutput
Update-PlaceholderId -Placeholder $PreviewPlaceholder -DatabaseId $previewId -Label "preview"
Write-Host "Rollback A: delete the empty databases in the Cloudflare dashboard if you do not want them, and run: git checkout -- wrangler.jsonc"
}

Confirm-Step @"
Step B, preview migration.
This applies migrations/0001_invoice_payment_ledger.sql to the preview D1 database.
Wrangler will ask again and will take a backup. No Worker is deployed.
"@
Invoke-Wrangler @("d1", "migrations", "apply", $PreviewDatabase, "--remote", "--env", "preview")
Write-Host "Rollback B preview: the migration only adds tables. Leave them if the import has not run. Do not drop tables after invoices have been copied."

Confirm-Step @"
Step B, production migration.
This applies the same migration to the production D1 database. The current production Worker does not use that database until a later deploy.
"@
Invoke-Wrangler @("d1", "migrations", "apply", $ProdDatabase, "--remote")
Write-Host "Rollback B production: same as preview. KV is still the live invoice store."

Confirm-Step @"
Step C, dry run.
This reads every production KV key starting with invoice:v1: and prints counts, a redacted sample, and validation errors.
It does not write to D1 and does not change KV.
"@
& node (Join-Path $Root "scripts\import-invoice-kv.mjs") --remote
if ($LASTEXITCODE -ne 0) {
    throw "Dry run failed or found invalid rows. Fix those rows or decide to skip them before any write. KV was not modified."
}

Confirm-Step @"
Step C, import.
This inserts the valid KV invoices into production D1 with INSERT OR IGNORE.
Running it twice does not overwrite an existing row. KV is not modified.
"@
$env:PHASE1_IMPORT_CONFIRM = "YES"
try {
    & node (Join-Path $Root "scripts\import-invoice-kv.mjs") --remote --apply
    if ($LASTEXITCODE -ne 0) {
        throw "Import failed. KV was not modified. Do not deploy."
    }
} finally {
    Remove-Item Env:PHASE1_IMPORT_CONFIRM -ErrorAction SilentlyContinue
}
Write-Host "Rollback C: KV still has the original invoices. D1 rows can be left in place; a second import will not overwrite matching rows."

Write-Host ""
Write-Host "Data steps are done. Do not set INVOICE_LINK_SECRET until the Phase 1 Worker code is deployed."
Write-Host "The code currently in production signs links with INVOICE_LINK_SECRET if that secret already exists, otherwise with the live PAYPAL_CLIENT_SECRET."
Write-Host "The new code does not fall back to the PayPal secret. Old links keep working only if that old key is stored as INVOICE_LINK_SECRET_PREVIOUS."
Write-Host "Setting a new INVOICE_LINK_SECRET before the new code is deployed would make the old code start using it and would break existing links."
$deployed = Read-Host "Type THE NEW CODE IS DEPLOYED to set signing and PayPal secrets now. Anything else stops here"
if ($deployed -ne "THE NEW CODE IS DEPLOYED") {
    Write-Host "Stopped before secrets. Production PayPal is unchanged. Deploy is still your own command: npm run deploy"
    exit 0
}

Confirm-Step @"
Step D, new invoice signing secret.
A 32-byte key is generated in this process and sent to the production Worker secret INVOICE_LINK_SECRET.
The value is not printed. This changes the live Worker secret immediately.
"@
$current = New-InvoiceSigningSecret
try {
    Set-WorkerSecret -Name "INVOICE_LINK_SECRET" -Value $current
} finally {
    $current = $null
}
Write-Host "Rollback D signing: wrangler secret delete INVOICE_LINK_SECRET only if the new code is not relying on it yet. Do not delete it after customers have received v2 links."

$needsPrevious = Read-Host "Do existing live invoice links need to keep working? Type YES to set INVOICE_LINK_SECRET_PREVIOUS"
if ($needsPrevious -eq "YES") {
    Write-Host "If wrangler secret list shows INVOICE_LINK_SECRET was already present before this script, paste that previous value."
    Write-Host "If it was not present, paste the live PAYPAL_CLIENT_SECRET. Do not paste the sandbox client secret."
    Confirm-Step "List production secret names only (not values)?"
    Invoke-Wrangler @("secret", "list")
    $secure = Read-Host "Paste the previous signing secret" -AsSecureString
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
        $previous = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
        Set-WorkerSecret -Name "INVOICE_LINK_SECRET_PREVIOUS" -Value $previous
    } finally {
        if ($pointer -ne [IntPtr]::Zero) {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
        }
        $previous = $null
    }
}

Write-Host ""
Write-Host "Production PayPal must stay on the live API. This script will not set PAYPAL_API_BASE."
Write-Host "The code uses https://api-m.paypal.com when PAYPAL_API_BASE is unset. Sandbox credentials would not charge real customers."
Write-Host "Leave PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET as the live values already on the Worker. This script does not replace them."
$merchant = Read-Host "Paste the LIVE PayPal merchant id, or press Enter to skip"
if (-not [string]::IsNullOrWhiteSpace($merchant)) {
    Confirm-Step "Store that merchant id as production PAYPAL_MERCHANT_ID? The value will not be printed again."
    try {
        Set-WorkerSecret -Name "PAYPAL_MERCHANT_ID" -Value $merchant.Trim()
    } finally {
        $merchant = $null
    }
}
$webhook = Read-Host "Paste the LIVE PayPal webhook id, or press Enter to skip. Do not paste the sandbox webhook id."
if (-not [string]::IsNullOrWhiteSpace($webhook)) {
    Confirm-Step "Store that webhook id as production PAYPAL_WEBHOOK_ID?"
    try {
        Set-WorkerSecret -Name "PAYPAL_WEBHOOK_ID" -Value $webhook.Trim()
    } finally {
        $webhook = $null
    }
}

$previewSecrets = Read-Host "Type YES to set sandbox PayPal secrets on the preview worker only"
if ($previewSecrets -eq "YES") {
    Write-Host "Preview worker: kinexis-digital-preview. These values must be the sandbox app, not the live app."
    Confirm-Step "Continue with preview sandbox secrets?"
    foreach ($name in @("PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRET", "PAYPAL_MERCHANT_ID", "PAYPAL_WEBHOOK_ID")) {
        $secure = Read-Host "Paste sandbox $name for preview" -AsSecureString
        $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
        try {
            $value = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
            Set-WorkerSecret -Name $name -Value $value -Environment "preview"
        } finally {
            if ($pointer -ne [IntPtr]::Zero) {
                [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
            }
            $value = $null
        }
    }
    $sandboxBase = "https://api-m.sandbox.paypal.com"
    Set-WorkerSecret -Name "PAYPAL_API_BASE" -Value $sandboxBase -Environment "preview"
    Write-Host "Preview PAYPAL_API_BASE is the sandbox host. Production PAYPAL_API_BASE was not set."
}

Write-Host ""
Write-Host "Setup commands finished. This script did not deploy."
Write-Host "If you have not deployed the Phase 1 code, the production Worker is still the previous version and still reads invoices from KV."
