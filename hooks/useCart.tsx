'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartItem } from '@/types/cart';
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useAddress from './useAddress';

type CartQuantities = Record<number, number>;

const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [itemQuantities, setItemQuantities] = useState<CartQuantities>({});
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    const { data: session } = useSession()
    const { defaultAddress } = useAddress();

    const router = useRouter()

    useEffect(() => {
        localStorage.setItem("cartItemQuantities", JSON.stringify(itemQuantities));
    }, [itemQuantities]);

    useEffect(() => {
        setLoading(true);
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
        fetchCartItems();
    }, []);

    // คำนวณยอดรวมสินค้า
    useEffect(() => {
        const calculateCartTotalPrice = () => {
            const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.productId));

            const total = selectedCartItems.reduce((sum, item) => {
                return sum + item.product.price * itemQuantities[item.productId];
            }, 0);

            setCartTotalPrice(total);
        };
        calculateCartTotalPrice();
    }, [itemQuantities, selectedItems, cartItems]);

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
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            const allItemIds = cartItems.map(item => item.productId);
            setSelectedItems(allItemIds);
        }
    };

    // เลือกสินค้าที่ต้องการชำระ
    const toggleSelectItem = (productId: number) => {
        setSelectedItems((prev) =>
            prev.includes(productId) ? prev.filter((selectedId) => selectedId !== productId) : [...prev, productId]
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

                toast.success('ลบสินค้าทั้งหมดเรียบร้อย!', { autoClose: 1200 });
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
            const selectedOrderItems = cartItems.filter(item => selectedItems.includes(item.productId));

            if (selectedOrderItems.length === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "กรุณาเลือกสินค้าก่อนทำการสั่งซื้อ",
                });
                return;
            }

            const orderItems = selectedOrderItems.map(item => ({
                productId: item.productId,
                quantity: itemQuantities[item.productId],
            }));

            axios.post('/api/order', { userId: session?.user.id, orderItems, totalAmount: cartTotalPrice, addressId: defaultAddress.id }).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "ทำการสั่งซื้อเรียบร้อยแล้ว🥳",
                }).then(() => {
                    router.push('/client/profile/order-summary')
                    setCartItems(prev => prev.filter(item => !selectedItems.includes(item.productId)));
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

    useEffect(() => {
        toggleSelectAllItems();
    }, [cartItems])

    return {
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
    };
};

export default useCart;