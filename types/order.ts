import { Address } from "./address";
import { Product } from "./product";
import { User } from "./user";

// Enum for order status
export enum STATUSORDER {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface Order {
  id: number;
  orderId: string;
  userId: number;
  status: STATUSORDER;
  total: number;
  items: OrderItem[];
  address?: Address;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  total: number;

  order: Order;
  product: Product;

  createdAt: string;
  updatedAt: string;
}