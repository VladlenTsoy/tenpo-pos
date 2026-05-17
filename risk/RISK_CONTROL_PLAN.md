# Tenpo POS Risk Control Plan

## Highest-risk areas

### 1. Inventory correctness
Risk: overselling, double reservation, wrong soldQty, bad rollback on cancel/refund.

Controls:
- single shared inventory/checkout service for site + POS;
- DB transaction around order item creation and stock mutation;
- lock affected variant-size rows during checkout;
- idempotency key for checkout requests;
- invariant tests:
  - availableQty = qty - reservedQty;
  - cancelled order releases reserved stock exactly once;
  - delivered/closed order increments soldQty exactly once;
  - repeated request cannot double-sell.

### 2. Payment correctness
Risk: payment marked paid without real transaction, duplicate payment, refund mismatch.

Controls:
- POS payment record separate from order status;
- payment state machine: pending → paid/failed/refunded/voided;
- idempotency key per payment attempt;
- refund requires permission + reason + audit event;
- split payments designed in model even if not enabled in UI first.

### 3. Shift/cash reconciliation
Risk: seller can sell outside shift; cash totals cannot be explained.

Controls:
- POS sale requires open shift;
- order stores shiftId, employeeId, salesPointId, deviceId;
- cash/card totals derived from payment records;
- close shift requires actual cash entry;
- discrepancy stored and visible to manager.

### 4. Permissions and fraud
Risk: seller can refund/cancel/discount outside authority.

Controls:
- explicit POS permissions;
- manager override for sensitive actions;
- audit log for open/close shift, sale, refund, cancel, cash in/out, discount, manual price override;
- no hidden destructive action in UI.

### 5. Scanner reliability
Risk: duplicate scans, partial barcode input, unsupported devices.

Controls:
- keyboard-wedge scanner first: buffered input with Enter/Tab terminator and debounce;
- external scanner settings documented;
- camera scanner as secondary path;
- unknown barcode flow: show product search, do not create sale silently;
- scan event logging in debug mode.

### 6. Offline mode
Risk: offline POS creates unsynced sales and inventory conflicts.

Decision:
- do not implement full offline in first production release;
- allow graceful degraded state: read-only/no checkout when API unavailable;
- add future offline only after conflict-resolution design.

### 7. Fiscalization/legal receipt
Risk: local legal/fiscal requirements not met.

Controls:
- receipt model supports provider status and external fiscal ref;
- first version can print commercial receipt only if legal requirements allow;
- fiscal provider integration should be separate round after requirements confirmation.

## Release gates
- migrations reviewed;
- inventory tests pass;
- payment/refund tests pass;
- role QA pass;
- one pilot sales point configured;
- rollback plan ready;
- no production deploy without Vladlen approval.
