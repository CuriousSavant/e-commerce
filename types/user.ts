import { Order, Wishlist, Cart } from "@prisma/client";
import { Address } from "./address";

export interface User {
	id: number;
	firstname: string;
	lastname?: string;
	email: string;
	password: string;
	image?: string;
	role: "member" | "admin" | "guest";
	emailVerified?: Date | null;
	birthday?: string;
	phone?: string;

	address: Address[];
	order: Order[];
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
