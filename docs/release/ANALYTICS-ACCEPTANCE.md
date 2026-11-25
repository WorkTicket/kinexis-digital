# Analytics acceptance

**Status: PARTIAL — GA4 remains active; the new Meta dataset is configured in source but not deployed. No event has been sent to it.**

The owner reports that GA4 `G-Z8245BRX2L` is live and received a previous test; this is owner-reported evidence. The previous Meta ID `2080705549212381` belongs to the old dataset and is retained here only as history. The owner created dataset **Kinexis Digital**, ID `1577328887491986`; source now points to this ID. The dataset is not yet connected to ad account `235075765`. No code deployment or event to the new dataset has occurred. The Conversions API token is not configured; the owner must add Worker secret `META_CAPI_TOKEN`. GA4 `generate_lead` key-event confirmation remains pending. Preview builds suppress production trackers. Historical browser evidence is preserved in [`RELEASE-GATE-MATRIX.csv`](../quality-100/RELEASE-GATE-MATRIX.csv), rows 14–18.

**Remaining:** owner to link the dataset to ad account `235075765`, add `META_CAPI_TOKEN` as a Worker secret, and confirm GA4 `generate_lead` key-event status. Do not deploy or send Meta events until separately authorized; any CAPI validation requires a `test_event_code` and explicit owner approval.
