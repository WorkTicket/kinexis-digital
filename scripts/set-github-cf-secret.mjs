#!/usr/bin/env node
/**
 * Sets CLOUDFLARE_API_TOKEN in GitHub Actions secrets for WorkTicket/kinexis-digital.
 *
 * Usage:
 *   set GITHUB_TOKEN=ghp_...          (PAT with repo + admin:repo_hook or secrets scope)
 *   set CLOUDFLARE_API_TOKEN=...      (optional if passed interactively)
 *   node scripts/set-github-cf-secret.mjs
 */

import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const REPO = "WorkTicket/kinexis-digital";
const SECRET_NAME = "CLOUDFLARE_API_TOKEN";

async function prompt(label, value = "") {
  if (value) return value;
  const rl = createInterface({ input, output });
  try {
    return (await rl.question(`${label}: `)).trim();
  } finally {
    rl.close();
  }
}

async function getPublicKey(githubToken) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/public-key`, {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub public key request failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

async function encryptSecret(publicKey, secretValue) {
  const sodium = await import("libsodium-wrappers");
  await sodium.default.ready;

  const keyBytes = sodium.default.from_base64(
    publicKey,
    sodium.default.base64_variants.ORIGINAL
  );
  const messageBytes = sodium.default.from_string(secretValue);
  const encryptedBytes = sodium.default.crypto_box_seal(messageBytes, keyBytes);

  return sodium.default.to_base64(encryptedBytes, sodium.default.base64_variants.ORIGINAL);
}

async function setSecret(githubToken, secretValue) {
  const { key_id: keyId, key: publicKey } = await getPublicKey(githubToken);
  const encryptedValue = await encryptSecret(publicKey, secretValue);

  const res = await fetch(`https://api.github.com/repos/${REPO}/actions/secrets/${SECRET_NAME}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ encrypted_value: encryptedValue, key_id: keyId }),
  });

  if (!res.ok) {
    throw new Error(`GitHub secret update failed (${res.status}): ${await res.text()}`);
  }
}

async function main() {
  console.log(`Repository: ${REPO}`);
  console.log(`Secret: ${SECRET_NAME}`);
  console.log("");
  console.log("Create a Cloudflare token first (Edit Cloudflare Workers template):");
  console.log("https://dash.cloudflare.com/profile/api-tokens?template=Edit%20Cloudflare%20Workers");
  console.log("");

  const githubToken = await prompt(
    "GitHub PAT (needs repo + secrets:write)",
    process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ""
  );
  const cloudflareToken = await prompt(
    "Cloudflare API token",
    process.env.CLOUDFLARE_API_TOKEN || ""
  );

  if (!githubToken || !cloudflareToken) {
    console.error("Both GITHUB_TOKEN and CLOUDFLARE_API_TOKEN are required.");
    process.exit(1);
  }

  await setSecret(githubToken, cloudflareToken);
  console.log(`\nSuccess: ${SECRET_NAME} is set on ${REPO}.`);
  console.log("Re-run the failed GitHub Actions deploy workflow to verify.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
