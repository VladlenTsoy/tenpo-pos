# Tenpo POS

Local product/architecture workspace for a full tablet-first POS application for store sellers and managers.

Status: discovery + architecture started locally. This folder should later be moved/pushed to a dedicated Git repository when Vladlen provides it.

## Product goal
Build a production-ready POS for retail store staff:
- seller login and shift open/close;
- seller bound to allowed sales points;
- tablet-first product search and scan flow;
- product variants, sizes, and stock visibility by sales point/storage;
- QR/barcode scanning via tablet camera or external USB/Bluetooth scanner;
- cart, checkout, payment, receipt;
- customer search/create/attach;
- manager controls: refunds, cancellations, shift reports, discrepancies;
- auditability and safe inventory accounting.

## Existing system principle
Evolve Tenpo/Kokoro. Do not rewrite the platform.

Existing repos:
- `/opt/ai-org/workspaces/tenpo-dev/kokoro-api`
- `/opt/ai-org/workspaces/tenpo-dev/kokoro-admin`
- `/opt/ai-org/workspaces/tenpo-dev/kokoro-site`

## Current recommendation
Start with POS backend foundation and risk controls before building the tablet UI. The highest risk is inventory/payment correctness, not UI speed.
## Frontend app

This repository now contains the standalone tablet-first POS frontend.

Commands:

```bash
npm install
npm run dev
npm run build
```

Configuration:

- `VITE_API_BASE_URL` — Kokoro/Tenpo API base URL.
- `VITE_POS_DEMO_MODE=true` keeps the UI usable with demo catalog data while checkout/inventory endpoints are finalized. Set to `false` to use live `/admin/pos/*` endpoints.

Current frontend scope:

- POS shift/session header;
- barcode/search input;
- tablet catalog grid with size-level stock visibility;
- cart and quantity controls;
- payment method selector;
- checkout CTA intentionally gated until backend inventory idempotency is finalized.

