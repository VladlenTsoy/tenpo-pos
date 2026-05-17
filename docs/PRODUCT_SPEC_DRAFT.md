# Tenpo POS Product Spec Draft

## Product vision
A fast, reliable tablet-first POS for store sellers and managers that connects directly to Tenpo inventory, orders, clients, payments, and sales points.

## Primary users

### Seller / cashier
Needs to sell quickly, avoid mistakes, and close payments/receipts during a busy store shift.

### Store manager
Needs shift visibility, refunds/cancellations, cash reconciliation, stock awareness, and staff accountability.

### Admin / owner
Needs configuration, reporting, permissions, and safe rollout across sales points.

## Core flows

### Open shift
- login;
- select/confirm allowed sales point;
- select/confirm device;
- enter opening cash if cash enabled;
- start shift.

### Sell product
- search by name/category/barcode;
- scan via camera or external scanner;
- select product variant/size;
- see current-point available stock;
- add to cart;
- attach customer optionally;
- collect payment;
- issue receipt.

### Customer
- search by phone;
- create quick customer if missing;
- attach to order;
- later: show bonuses/history.

### Payment
- cash;
- card terminal/manual confirmation;
- later: Payme/online/split payment;
- retry failed payment;
- receipt after paid state.

### Close shift
- show expected totals;
- enter actual cash;
- record discrepancy;
- close shift;
- manager report.

## UX principles
- POS is not an admin table.
- Tablet-first: large targets, short flows, minimal typing.
- Seller always sees current shift, sales point, cart total, payment state.
- Inventory uncertainty must block checkout, not be hidden.
- Dangerous actions require explicit permission and reason.

## Non-goals for first production release
- full offline selling;
- complex fiscal integration before legal requirements are known;
- marketplace/delivery flows inside POS;
- rewrite of existing Kokoro platform.
