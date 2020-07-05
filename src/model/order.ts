import Product from './product';

export default interface Order {
  uuid: string;
  modId: string;
  modDisplayName: string;
  ownerDisplayName: string;
  requestedAt?: string;
  product: Product;
}
