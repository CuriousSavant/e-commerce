import { Product } from "./product";
import { User } from "./user";

export interface Wishlist {
    id: number;
    userId: number;
    productId: number;
    user: User;
    product: Product;
}