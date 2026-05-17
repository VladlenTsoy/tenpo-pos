# Round 1 Status — POS foundation

## Completed locally

### Documentation workspace
- Created local POS workspace: `/opt/ai-org/workspaces/core-director/projects/tenpo-pos`.
- Added product spec draft, roadmap, API draft, and risk-control plan.
- Added reminder for Vladlen to send/provide dedicated Git repository later.

### Backend implementation slice in kokoro-api
Changed repo: `/opt/ai-org/workspaces/tenpo-dev/kokoro-api` on `develop`.

Added:
- POS entities/module/controller/service:
  - `pos_devices`
  - `pos_shifts`
  - `pos_shift_events`
  - `pos_payments`
  - `pos_receipts`
- Product barcode model/module/controller/service:
  - `product_barcodes`
- Migration:
  - `migrations/1772200000000-add-pos-foundation.ts`
- Order POS links:
  - `orderSource`
  - `salesPoint`
  - `posShift`
  - `posDevice`
- POS admin permissions module:
  - `pos.read/create/update/delete/manage`
- Initial POS endpoints:
  - `GET /admin/pos/session`
  - `POST /admin/pos/shifts/open`
  - `POST /admin/pos/shifts/:id/close`
  - `GET /admin/pos/shifts/:id/report`
- Barcode admin endpoints:
  - `GET /admin/product-barcodes`
  - `GET /admin/product-barcodes/by-code/:code`
  - `POST /admin/product-barcodes`
  - `PATCH /admin/product-barcodes/:id`
  - `DELETE /admin/product-barcodes/:id`

## Verification
- `npm run build` passed in `kokoro-api`.

## Known limitations / next risk controls
- Seller-to-sales-point restriction is not implemented yet; current `/admin/pos/session` returns all sales points until employee-sales-point mapping is added.
- POS checkout/order creation is not implemented yet; do not use admin order create for POS sales.
- Migration is created but not run. Needs review before DB application.
- Product barcode uniqueness is global by code; expected for scanner reliability.

## Next slice
1. Add employee-to-sales-point assignment model.
2. Add shared checkout/inventory service tests before POS checkout.
3. Implement POS catalog endpoints filtered by active shift/sales point.
4. Implement scanner lookup response optimized for POS cart.
