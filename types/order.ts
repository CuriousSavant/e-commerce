import { Product } from "./product";
import { User } from "./user";

// Enum for order status
export enum StatusOrder {
  Pending = "Pending",
  Completed = "Completed",
  Canceled = "Canceled",
}

export interface Order {
  id: string;
  userId: number;
  status: StatusOrder;
  totalAmount: number;
  orderDate: string;
  orderItems: OrderItem[];
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
  totalPrice: number;
  image: string;
  description: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}
