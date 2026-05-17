import { useEffect, useMemo, useState } from 'react';
import { CartPanel } from './components/CartPanel';
import { ProductGrid } from './components/ProductGrid';
import { getCurrentShift, searchCatalog } from './services/posApi';
import type { CartLine, PaymentMethod, PosProduct, PosShift } from './types/pos';

export default function App() {
  const [shift, setShift] = useState<PosShift | null>(null);
  const [products, setProducts] = useState<PosProduct[]>([]);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [status, setStatus] = useState('Loading POS session…');

  useEffect(() => {
    Promise.all([getCurrentShift(), searchCatalog('')])
      .then(([nextShift, nextProducts]) => {
        setShift(nextShift);
        setProducts(nextProducts);
        setStatus('Ready');
      })
      .catch((error: Error) => setStatus(error.message));
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      searchCatalog(query)
        .then(setProducts)
        .catch((error: Error) => setStatus(error.message));
    }, 180);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart]);

  function addToCart(product: PosProduct, sizeId?: string) {
    setCart((current) => {
      const existingIndex = current.findIndex((line) => line.product.id === product.id && line.sizeId === sizeId);
      if (existingIndex === -1) return [...current, { product, sizeId, quantity: 1 }];

      return current.map((line, index) =>
        index === existingIndex ? { ...line, quantity: line.quantity + 1 } : line,
      );
    });
  }

  function changeQuantity(index: number, quantity: number) {
    setCart((current) =>
      current.flatMap((line, lineIndex) => (lineIndex === index ? (quantity > 0 ? [{ ...line, quantity }] : []) : [line])),
    );
  }

  return (
    <main className="pos-shell">
      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">Tenpo POS</span>
            <h1>Fast checkout desk</h1>
          </div>
          <div className="shift-pill">
            <strong>{shift?.salesPointName ?? 'No sales point'}</strong>
            <span>{shift?.sellerName ?? status}</span>
          </div>
        </header>

        <section className="scan-panel">
          <label htmlFor="catalog-search">Scan barcode or search product</label>
          <input
            autoComplete="off"
            id="catalog-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Barcode, SKU, product name…"
            value={query}
          />
          <div className="scan-stats">
            <span>{products.length} products</span>
            <span>{cartCount} items in cart</span>
            <span>{status}</span>
          </div>
        </section>

        <ProductGrid products={products} onAdd={addToCart} />
      </section>

      <CartPanel
        cart={cart}
        paymentMethod={paymentMethod}
        onChangePaymentMethod={setPaymentMethod}
        onClear={() => setCart([])}
        onQuantityChange={changeQuantity}
      />
    </main>
  );
}
