export interface Product {
  uuid: string;
  code: string;
  summary: string;
  // eslint-disable-next-line camelcase
  created_at: string;
  // eslint-disable-next-line camelcase
  updated_at: string;
}

export interface Order {
  uuid: string;
  modId: string;
  modDisplayName: string;
  ownerDisplayName: string;
  requestedAt?: string;
  product: Product;
}

export default interface OrderCreation {
  modId: string;
  modDisplayName: string;
  ownerDisplayName: string;
}

export interface ProductTotal {
  all: number;
  taken: number;
  available: number;
}

export interface ProductResponse {
  total: ProductTotal;
  products: Array<Product>;
}
