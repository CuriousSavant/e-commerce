import { Product } from "./product";

export interface Cart {
  id: string;
  cartId: number;
  product: Product;
  productId: number;
  quantity: number;
}