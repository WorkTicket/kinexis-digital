# Rollback plan

**Status: BLOCKED — operational rollback readiness has not been verified.**

Do not deploy until Cloudflare Operations confirms access and a tested rollback path. Before release, record the prior Worker deployment/version, approved candidate, migration compatibility and recovery procedure, configuration recovery, D1 backup/restore availability, monitoring thresholds, decision owner, and exact rollback commands from the repository's established workflow.

Worker rollback alone must not be assumed to reverse D1 changes. Rehearse only in an isolated environment. No production rollback or migration was performed.
