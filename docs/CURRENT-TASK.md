# Current task

**Done (this branch):** Conferbot launcher still overlapped the mobile sticky bar after #25 because the bubble lives in `<conferbot-widget>` open shadow DOM. Fixed via `ConferbotWidget` shadow positioner (`data-cb-own-m-bottom` + `#kx-chat-lift` + measured `.float-cta` top + 12px). Branch `cursor/conferbot-launcher-above-sticky-67c1`.

**Do not deploy from agents** — owner ships from PC via `npm run deploy`.

See `docs/DECISIONS.md` (widget mobile lift) and artifacts under `/opt/cursor/artifacts/conferbot-lift-*.png`.
