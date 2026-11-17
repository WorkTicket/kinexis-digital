# Analytics acceptance

**Status: PARTIAL — owner confirmed both IDs are live and received the authorized test; GA4 key-event verification is pending.**

Owner reports that GA4 `G-Z8245BRX2L` and Meta Pixel `2080705549212381` are live and received the previously authorized test. This is owner-reported provider evidence, not an independent account inspection by the agent. GA4 `generate_lead` key-event status is expected to be checked/configured by the owner on 2026-11-18. Preview builds suppress both production trackers. Historical browser transport evidence and limitations are preserved in [`RELEASE-GATE-MATRIX.csv`](../quality-100/RELEASE-GATE-MATRIX.csv), rows 14–18.

**Remaining:** owner to confirm GA4 `generate_lead` key-event status on 2026-11-18; complete read-only review of consent, attribution, deduplication, and test-event exclusion. Do not send additional live-account events unless a labeled test-event procedure is approved.
