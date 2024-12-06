import { Product } from "./product";

export interface Cart {
  id: number;
  cartId: number;
  product: Product;
  productId: number;
  quantity: number;
}