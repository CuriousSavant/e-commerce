import { Product } from "./product";

// Enum for order status
export enum StatusOrder {
  Pending = "Pending",
  Completed = "Completed",
  Canceled = "Canceled",
}

export interface Order {
  id: number;
  userId: number;
  status: StatusOrder;
  totalAmount: number;
  orderDate: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  totalPrice: number;
  image: string;
  description: string;
  product: Product[],
  createdAt: string;
  updatedAt: string;
}


