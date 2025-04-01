'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartItem } from '@/types/cart';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAddress } from './AddressContext';
import { Product } from '@/types/product';
import useDialog from "@/context/DialogContext";

type CartQuantities = Record<number, number>;

type CartContextType = {
    cartItems: CartItem[];
    itemQuantities: CartQuantities;
    setItemQuantities: React.Dispatch<React.SetStateAction<CartQuantities>>;
    cartTotalPrice: number;
    selectedItems: number[];
    updateItemQuantity: (productId: number, increment: boolean) => void;
    toggleSelectAllItems: () => void;
    toggleSelectItem: (productId: number) => void;
    removeItemFromCart: (productId: number) => void;
    handleOrder: () => void;
    loading: boolean;
    handleAddToCart: (product: Product, quantity: number) => void;
    selectedCartItems: CartItem[];
    setSelectedCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    handleProductOrder: (product: Product) => void;
    directOrderItem: CartItem | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemQuantities, setItemQuantities] = useState<CartQuantities>({});
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const [directOrderItem, setDirectOrderItem] = useState<CartItem | null>(null);

    // สินค้าที่ถูกเลือก
    const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

    const { data: session, status } = useSession()
    const { defaultAddress } = useAddress();
    const { handleDialogToggle } = useDialog()

    const router = useRouter()

    useEffect(() => {
        localStorage.setItem("cartItemQuantities", JSON.stringify(itemQuantities));
    }, [itemQuantities]);

    const fetchCartItems = async () => {
        try {
            const res = await axios.get(`/api/cart?userId=${session?.user.id}`);
            setCartItems(res.data);

            const combinedItems = res.data.reduce((acc: CartItem[], cart: CartItem) => {
                const existingItem = acc.find(item => item.productId === cart.productId);
                if (existingItem) {
                    existingItem.quantity += cart.quantity;
                } else {
                    acc.push(cart);
                }
                return acc;
            }, []);

            setCartItems(combinedItems);

            const savedQuantities = JSON.parse(localStorage.getItem("cartItemQuantities") || "{}");
            const initialQuantities = combinedItems.reduce((acc: CartQuantities, cart: CartItem) => {
                acc[cart.productId] = savedQuantities[cart.productId] || cart.quantity;
                return acc;
            }, {});
            setItemQuantities(initialQuantities);

            const total = combinedItems.reduce((sum: number, cart: CartItem) => {
                return sum + cart.product.price * cart.quantity;
            }, 0);
            setCartTotalPrice(total);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!session?.user.id) return;
        setLoading(true);
        fetchCartItems();
    }, []);

    // คำนวณยอดรวมสินค้า
    useEffect(() => {
        const calculateCartTotalPrice = () => {
            const total = selectedCartItems.reduce((sum, item) => {
                const quantity = directOrderItem ? directOrderItem.quantity : itemQuantities[item.productId];
                return sum + item.product.price * quantity;
            }, 0);

            setCartTotalPrice(total);
        };
        calculateCartTotalPrice();
    }, [itemQuantities, selectedCartItems]);

    // เพิ่ม, ลบ จำนวณสินค้า
    const updateItemQuantity = (productId: number, increment: boolean) => {
        setItemQuantities((prev) => {
            const currentQuantity = prev[productId] || 1;
            const stock = cartItems.find(item => item.productId === productId)?.product.stock || 0;

            const newQuantity = increment
                ? Math.min(currentQuantity + 1, stock)
                : Math.max(currentQuantity - 1, 1);

            return { ...prev, [productId]: newQuantity };
        });
    };

    // เลือกสินค้าทั้งหมด
    const toggleSelectAllItems = () => {
        if (selectedCartItems.length === cartItems.length) {
            setSelectedCartItems([]);
        } else {
            setSelectedCartItems(cartItems);
        }
    };

    // เลือกสินค้าที่ต้องการชำระ
    const toggleSelectItem = (productId: number) => {
        setSelectedCartItems((prev) =>
            prev.some((item) => item.productId === productId)
                ? prev.filter((item) => item.productId !== productId)
                : [...prev, cartItems.find((item) => item.productId === productId)!]
        );
    };

    // นำสินค้าออกจากตะกร้า
    const removeItemFromCart = async (productId: number) => {
        try {
            const itemsToRemove = cartItems.filter(item => item.productId === productId);

            if (itemsToRemove.length > 0) {
                for (const item of itemsToRemove) {
                    await axios.delete(`/api/cart/${item.productId}`);
                }

                setCartItems(prev => prev.filter(item => item.productId !== productId));
                setItemQuantities(prev => {
                    const updatedQuantities = { ...prev };
                    delete updatedQuantities[productId];
                    return updatedQuantities;
                });
            }
        } catch (err) {
            console.error("เกิดข้อผิดพลาดระหว่างลบสินค้า:", err);
            toast.error('เกิดข้อผิดพลาด! กรุณาลองใหม่', { autoClose: 1200 });
        }
    };

    const handleOrder = async () => {
        /*
            NOTE FOR DEVELOPER
            สำหรับการใช้งานจริงอาจต้องทำการเช็คสต็อคสินค้าก่อนทำการสั่งซื้อ
            และ เรื่องของที่อยู่อาจต้องเพิ่มเติมเช่น การเลือกที่อยู่จัดส่ง การเลือกวิธีการจัดส่ง และอื่นๆ
            ในที่นี้ผมจะขอแค่ส่วนของการสั่งซื้อสินค้าเท่านั้น เพื่อความปลอดภัยของข้อมูลนะครับ
        */
        try {
            if (selectedCartItems.length === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "กรุณาเลือกสินค้าก่อนทำการสั่งซื้อ",
                });
                return;
            }

            if (!defaultAddress?.id) {
                Swal.fire({
                    icon: "warning",
                    title: "กรุณาเลือกที่อยู่จัดส่งก่อนทำการสั่งซื้อ",
                });
                return;
            }

            const orderItems = selectedCartItems.map(item => ({
                productId: item.productId,
                quantity: directOrderItem ? directOrderItem.quantity : itemQuantities[item.productId],
            }));

            const payload = {
                userId: session?.user.id,
                orderItems: orderItems,
                totalAmount: cartTotalPrice,
                addressId: defaultAddress?.id
            }

            axios.post('/api/order', payload).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "ทำการสั่งซื้อเรียบร้อยแล้ว🥳",
                }).then(() => {
                    router.push('/client/profile/order-summary')
                    setCartItems(prev => prev.filter(item => !selectedItems.includes(item.productId)));
                    setSelectedCartItems([]);
                    setSelectedItems([]);
                })
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: err.msg || "ไม่สามารถทำการสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง",
                });
            })
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถทำการสั่งซื้อได้ กรุณาลองใหม่อีกครั้ง",
            });
        }
    };

    // เพิ่มสินค้าลงตะกร้า
    const handleAddToCart = async (product: Product, quantity: number) => {
        if (status === 'unauthenticated' || !session?.user.id) {
            handleDialogToggle();
            return;
        }

        try {
            if (product) {
                if (product?.stock === 0) {
                    toast.warning("สินค้าหมดแล้ว", {
                        autoClose: 1200
                    });
                    return;
                } else {
                    await axios.post("/api/cart", {
                        userId: session?.user?.id,
                        productId: product?.id,
                        quantity: quantity
                    })
                    toast.success("เพิ่มสินค้าลงตะกร้าแล้ว 🎉", {
                        autoClose: 1200
                    });
                }
            }
        } catch (error) {
            console.error(error)
            toast.error("เกิดข้อผิดพลาดไม่สามารถเพิ่มสินค้าลงตะกร้าได้", {
                autoClose: 1200
            });
        }
    }

    const handleProductOrder = async (product: Product) => {
        try {

            if (status === "unauthenticated") {
                handleDialogToggle();
                return;
            }

            const newOrderItem: CartItem = {
                id: 1,
                cartId: 1,
                productId: product.id,
                quantity: 1,
                product,
            };

            setDirectOrderItem(newOrderItem);
            setSelectedCartItems([newOrderItem]);
            setCartTotalPrice(product.price)
            router.push('/client/checkout');
        } catch (err) {
            toast.error("เกิดข้อผิดพลาดไม่สามารถสั่งซื้อสินค้าได้", { autoClose: 1200 });
            console.error(err)
        }
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            itemQuantities,
            setItemQuantities,
            cartTotalPrice,
            selectedItems,
            updateItemQuantity,
            toggleSelectAllItems,
            toggleSelectItem,
            removeItemFromCart,
            handleOrder,
            loading,
            handleAddToCart,
            selectedCartItems,
            setSelectedCartItems,
            handleProductOrder,
            directOrderItem,
        }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};