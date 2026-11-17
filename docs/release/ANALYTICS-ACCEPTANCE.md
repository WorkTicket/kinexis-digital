# Analytics acceptance

**Status: BLOCKED — provider/account acceptance is incomplete.**

Fresh local analytics contract and deploy-preflight checks passed. Historical browser transport evidence and limitations are preserved in [`RELEASE-GATE-MATRIX.csv`](../quality-100/RELEASE-GATE-MATRIX.csv), rows 14–18; transport responses do not prove account receipt, attribution, key-event configuration, consent compliance, or production readiness.

**Owner actions:** provide approved read-only access to GA4 property 542906196 and the correct Meta business/ad account and campaign dataset; confirm actual stream/measurement and Pixel IDs; inspect Realtime/DebugView and Events Manager; approve `generate_lead` key-event intent; review consent, attribution, deduplication, and test-event exclusion. Do not change provider settings or send more events without approval.
