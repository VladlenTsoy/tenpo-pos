import type { PosProduct, PosShift } from '../types/pos';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const DEMO_MODE = import.meta.env.VITE_POS_DEMO_MODE !== 'false';

const demoShift: PosShift = {
  id: 'demo-shift-001',
  sellerName: 'Seller demo',
  salesPointName: 'Kokoro Store',
  openedAt: new Date().toISOString(),
};

const demoProducts: PosProduct[] = [
  {
    id: 'hoodie-black',
    name: 'Kokoro Hoodie Black',
    sku: 'KOK-HOOD-BLK',
    barcode: '2000000000015',
    category: 'Hoodies',
    price: 499000,
    availableQty: 12,
    sizes: [
      { id: 's', label: 'S', availableQty: 2 },
      { id: 'm', label: 'M', availableQty: 4 },
      { id: 'l', label: 'L', availableQty: 6 },
    ],
  },
  {
    id: 'tee-white',
    name: 'Tenpo Tee White',
    sku: 'TEN-TEE-WHT',
    barcode: '2000000000022',
    category: 'T-shirts',
    price: 189000,
    availableQty: 18,
    sizes: [
      { id: 'm', label: 'M', availableQty: 8 },
      { id: 'l', label: 'L', availableQty: 10 },
    ],
  },
  {
    id: 'cap-logo',
    name: 'Kokoro Logo Cap',
    sku: 'KOK-CAP-LOGO',
    barcode: '2000000000039',
    category: 'Accessories',
    price: 159000,
    availableQty: 7,
    sizes: [{ id: 'one', label: 'ONE SIZE', availableQty: 7 }],
  },
];

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`POS API ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getCurrentShift(): Promise<PosShift> {
  if (DEMO_MODE || !API_BASE_URL) return demoShift;
  return request<PosShift>('/admin/pos/session');
}

export async function searchCatalog(query: string): Promise<PosProduct[]> {
  if (DEMO_MODE || !API_BASE_URL) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return demoProducts;
    return demoProducts.filter((product) =>
      [product.name, product.sku, product.barcode, product.category]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalized)),
    );
  }

  return request<PosProduct[]>(`/admin/pos/catalog?q=${encodeURIComponent(query)}`);
}
