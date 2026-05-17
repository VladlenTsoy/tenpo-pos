# Tenpo POS API Draft

## Session / shift
- `GET /admin/pos/session`
  - returns current employee, allowed sales points, active shift, device status, permissions.
- `POST /admin/pos/shifts/open`
  - body: salesPointId, deviceId, openingCashAmount.
- `POST /admin/pos/shifts/:id/close`
  - body: closingCashAmount, notes.
- `GET /admin/pos/shifts/:id/report`

## Catalog / barcode
- `GET /admin/pos/catalog`
  - filters: q, categoryId, salesPointId, inStockOnly.
- `GET /admin/pos/products/by-barcode/:code`
- `POST /admin/product-barcodes`
- `PATCH /admin/product-barcodes/:id`

## Cart / checkout
- `POST /admin/pos/orders`
  - idempotency key required.
  - body: shiftId, salesPointId, deviceId, clientId?, items[], discounts?.
- `GET /admin/pos/orders/:id`
- `POST /admin/pos/orders/:id/cancel`
  - permission + reason required.

## Payment
- `POST /admin/pos/orders/:id/pay`
  - idempotency key required.
  - body: methodId, amount, type: cash/card/online/manual-terminal, providerRef?.
- `POST /admin/pos/orders/:id/refund`
  - permission + reason required.

## Customer
- `GET /admin/pos/clients?q=phoneOrName`
- `POST /admin/pos/clients/quick-create`

## Important API rules
- POS checkout must reuse the same stock reservation/soldQty invariants as web checkout.
- Every checkout/payment/refund mutation must be idempotent.
- Seller can only sell from allowed sales points.
- Sale requires an open shift unless admin override is explicitly added later.
