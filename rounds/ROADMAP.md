# Tenpo POS Roadmap

## Round 0 — Discovery and system mapping
Goal: know exactly what current Kokoro can support safely.

Deliverables:
- map product, variant, size, storage, sales point, order, client, payment entities;
- map current checkout/reservation logic;
- map admin permissions and employee-to-sales-point model;
- identify migration impact and backwards compatibility constraints.

Exit criteria:
- no POS schema/API work starts before inventory/order invariants are documented.

## Round 1 — Risk-control architecture
Goal: minimize production risk before implementation.

Deliverables:
- inventory invariant document: `qty`, `reservedQty`, `soldQty`, available stock rules;
- POS order lifecycle and cancellation/refund lifecycle;
- idempotency strategy for checkout/payment/refund;
- transaction/locking strategy for stock updates;
- audit log/event strategy;
- rollback plan.

Exit criteria:
- race-condition and refund scenarios have test cases before UI work.

## Round 2 — Backend POS foundation
Goal: add POS domain without breaking existing admin/site flows.

Deliverables:
- migrations/entities for `pos_shifts`, `pos_devices`, `pos_shift_events`, `product_barcodes`, POS payment/receipt records if needed;
- extend `orders` with POS source, sales point, shift, device fields;
- POS permissions: `pos.read`, `pos.sell`, `pos.refund`, `pos.shift.open`, `pos.shift.close`, `pos.manager`;
- shared checkout/inventory service reused by site and POS.

Exit criteria:
- existing site checkout/admin order flows still pass tests/build.

## Round 3 — POS catalog + scanning
Goal: seller can find and add exact product/size safely.

Deliverables:
- `GET /admin/pos/session`;
- `GET /admin/pos/catalog` filtered by seller sales point/storage;
- `GET /admin/pos/products/by-barcode/:code`;
- barcode management model;
- keyboard-wedge scanner support specification;
- camera scanner proof path.

Exit criteria:
- product lookup never shows sellable quantity above `qty - reservedQty`.

## Round 4 — Tablet POS UI shell
Goal: fast seller interface, not admin table.

Deliverables:
- `/pos` tablet route in `kokoro-admin` or future standalone app;
- open shift gate;
- product grid/search;
- variant/size picker;
- stock badges by current point;
- cart panel;
- scanner input listener.

Exit criteria:
- common sale can be completed with minimal taps and no admin navigation.

## Round 5 — Checkout, payment, customer, receipt
Goal: complete real sale flow.

Deliverables:
- create POS order with items;
- cash/card/manual terminal payment flow;
- mark payment status safely;
- customer search/create/attach;
- receipt screen and printable/shareable receipt;
- payment error/retry states.

Exit criteria:
- sale is atomic: order, stock, payment record, receipt/audit are consistent.

## Round 6 — Shift management and manager controls
Goal: operational control per store point.

Deliverables:
- open/close shift;
- opening/closing cash;
- expected vs actual cash/card totals;
- cash in/out events;
- shift report;
- refund/cancel with permission and reason;
- manager override.

Exit criteria:
- manager can reconcile a shift and explain discrepancies.

## Round 7 — Production hardening
Goal: reduce launch risk.

Deliverables:
- backend unit/integration tests for stock, orders, payment, refund;
- concurrent checkout tests;
- tablet QA checklist;
- role/permission QA;
- audit log verification;
- migration rollback plan;
- release review.

Exit criteria:
- no launch without passing inventory/payment regression suite.

## Round 8 — Pilot rollout
Goal: safe real-store rollout.

Deliverables:
- seed barcodes for pilot products;
- configure one sales point and limited staff;
- run shadow mode / parallel reconciliation;
- collect seller feedback;
- fix UX bottlenecks;
- expand rollout gradually.

Exit criteria:
- pilot store can operate a full shift with reconciled sales and stock.
