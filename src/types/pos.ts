export type PaymentMethod = 'cash' | 'card' | 'payme';

export type PosProduct = {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  availableQty: number;
  sizes: Array<{ id: string; label: string; availableQty: number }>;
};

export type CartLine = {
  product: PosProduct;
  sizeId?: string;
  quantity: number;
};

export type PosShift = {
  id: string;
  sellerName: string;
  salesPointName: string;
  openedAt: string;
};
