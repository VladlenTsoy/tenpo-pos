import type { PosProduct } from '../types/pos';

type ProductGridProps = {
  products: PosProduct[];
  onAdd: (product: PosProduct, sizeId?: string) => void;
};

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <section className="product-grid" aria-label="POS catalog">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div>
            <div className="product-meta">{product.category} · {product.sku}</div>
            <h3>{product.name}</h3>
            <p>{formatPrice(product.price)}</p>
          </div>

          <div className="size-row" aria-label={`Sizes for ${product.name}`}>
            {product.sizes.map((size) => (
              <button
                className="size-chip"
                disabled={size.availableQty <= 0}
                key={size.id}
                onClick={() => onAdd(product, size.id)}
                type="button"
              >
                {size.label}
                <span>{size.availableQty}</span>
              </button>
            ))}
          </div>

          <button className="add-button" disabled={product.availableQty <= 0} onClick={() => onAdd(product)} type="button">
            Add to cart
          </button>
        </article>
      ))}
    </section>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-UZ').format(value) + ' сум';
}
