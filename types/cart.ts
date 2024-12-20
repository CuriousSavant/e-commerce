import { Product } from "./product";

export interface CartItem {
  id: string;
  cartId: number;
  product: Product;
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
}
