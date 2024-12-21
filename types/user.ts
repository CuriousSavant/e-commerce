import { Order, Wishlist, Cart } from "@prisma/client";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  name?: string;
  lastName?: string;
  email: string;
  password?: string;
  image?: string;
  role: "member" | "admin" | "guest";
  emailVerified?: Date | null;
  dateOfBirth?: Date | null;
  phone?: string | null;
  address?: string | null;
  orders: Order[];
  cart: Cart[];
  wishlist: Wishlist[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: number;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
}
