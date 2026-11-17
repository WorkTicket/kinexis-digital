# Analytics acceptance

**Status: BLOCKED — provider/account acceptance is incomplete.**

Owner-supplied public GA4 and Meta IDs are now set in gitignored `.env.local` and root Wrangler vars; the strict production build preflight passes. Preview builds suppress both production trackers. Historical browser transport evidence and limitations are preserved in [`RELEASE-GATE-MATRIX.csv`](../quality-100/RELEASE-GATE-MATRIX.csv), rows 14–18; neither supplied IDs nor prior transport responses prove correct account mapping, receipt, attribution, key-event configuration, consent compliance, or production readiness.

**Owner actions:** provide approved read-only access to GA4 property 542906196 and the correct Meta business/ad account and campaign dataset; verify configured IDs match the intended stream/dataset; inspect Realtime/DebugView and Events Manager; approve `generate_lead` key-event intent; review consent, attribution, deduplication, and test-event exclusion. Do not send additional live-account events until a labeled test-event procedure is approved.
