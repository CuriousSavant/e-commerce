import { Badge } from "@mui/material";
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/types/cart";
import { FaCartShopping } from "react-icons/fa6";

const ShoppingCart = ({ size = 22 }: { size?: number }) => {
    const { cartItems } = useCart()

    return (
        <Badge
            badgeContent={cartItems.flatMap((item: CartItem) => item.quantity).reduce((a: number, b: number) => a + b, 0)}
            color="primary"
            component={'a'}
            href="/client/cart"
        >
            <FaCartShopping size={size} color='#000' />
        </Badge>
    );
};

export default ShoppingCart;