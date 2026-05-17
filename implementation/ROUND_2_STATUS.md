# Round 2 Status — sales-point restriction + POS catalog/scan foundation

## Completed locally in kokoro-api

Added seller-to-sales-point binding:
- `EmployeeEntity.salesPoints`
- join table in migration: `admin_employee_sales_points`
- employee create/update DTO supports `salesPointIds`
- employee service saves assigned sales points

Strengthened POS session/shift safety:
- `/admin/pos/session` now returns only assigned sales points for regular POS staff;
- POS managers can see all points;
- opening a shift is blocked if employee is not assigned to that sales point.

Added POS catalog/scan endpoints:
- `GET /admin/pos/catalog?q=`
  - requires open shift;
  - filters products by current shift sales point;
  - returns variants, images, storage, available qty, sizes and size-level available qty.
- `GET /admin/pos/products/by-barcode/:code`
  - requires open shift;
  - resolves active barcode;
  - blocks scanned product if it belongs to another sales point.

Added relation:
- `ProductVariantEntity.storage` to connect variants to `product_storages`/`sales_points` cleanly.

## Verification
- `npm run build` passed.
- Migration file TypeScript compile check passed:
  - `npx tsc --noEmit --pretty false --skipLibCheck --module commonjs --target ES2021 migrations/1772200000000-add-pos-foundation.ts`

## Known limitations
- POS checkout is still not implemented. This is intentional: inventory correctness must be extracted/tested first.
- Full `npx tsc --noEmit` is blocked by an existing unrelated spec import in `product.controller.spec.ts`; build gate is clean.
- Admin UI for assigning employee sales points is not implemented yet, only API DTO/backend support.

## Next slice
- Add shared POS-safe checkout/inventory service and tests.
- Add POS order creation endpoint using open shift + idempotency key.
- Add payment record flow after order creation.

## Commit
- kokoro-api/develop: `d6d681e` — `feat(pos): add foundation for store POS`
- Pushed to origin/develop.
