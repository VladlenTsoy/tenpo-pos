import type { CartLine, PaymentMethod } from '../types/pos';

type CartPanelProps = {
  cart: CartLine[];
  paymentMethod: PaymentMethod;
  onChangePaymentMethod: (value: PaymentMethod) => void;
  onClear: () => void;
  onQuantityChange: (index: number, quantity: number) => void;
};

const paymentLabels: Record<PaymentMethod, string> = {
  cash: 'Cash',
  card: 'Card',
  payme: 'Payme',
};

export function CartPanel({ cart, paymentMethod, onChangePaymentMethod, onClear, onQuantityChange }: CartPanelProps) {
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return (
    <aside className="cart-panel" aria-label="Current cart">
      <header className="cart-header">
        <div>
          <span className="eyebrow">Current sale</span>
          <h2>{formatPrice(total)}</h2>
        </div>
        <button className="ghost-button" disabled={cart.length === 0} onClick={onClear} type="button">Clear</button>
      </header>

      <div className="cart-lines">
        {cart.length === 0 ? (
          <div className="empty-cart">Scan barcode or select products from catalog.</div>
        ) : (
          cart.map((line, index) => (
            <div className="cart-line" key={`${line.product.id}-${line.sizeId ?? 'default'}-${index}`}>
              <div>
                <strong>{line.product.name}</strong>
                <span>{line.sizeId ? `Size: ${line.sizeId.toUpperCase()}` : line.product.sku}</span>
              </div>
              <div className="qty-control">
                <button onClick={() => onQuantityChange(index, line.quantity - 1)} type="button">−</button>
                <span>{line.quantity}</span>
                <button onClick={() => onQuantityChange(index, line.quantity + 1)} type="button">+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="payment-methods">
        {(Object.keys(paymentLabels) as PaymentMethod[]).map((method) => (
          <button
            className={method === paymentMethod ? 'payment active' : 'payment'}
            key={method}
            onClick={() => onChangePaymentMethod(method)}
            type="button"
          >
            {paymentLabels[method]}
          </button>
        ))}
      </div>

      <button className="checkout-button" disabled={cart.length === 0} type="button">
        Checkout safely
      </button>
      <p className="safety-note">Checkout endpoint is intentionally gated until inventory idempotency is finalized.</p>
    </aside>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-UZ').format(value) + ' сум';
}
