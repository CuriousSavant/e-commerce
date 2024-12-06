'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Cart } from '@/types/cart';
import Swal from 'sweetalert2'

type CartQuantities = Record<number, number>;

const useCart = () => {
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [itemQuantities, setItemQuantities] = useState<CartQuantities>({});
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true);
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`/api/cart`);
                setCartItems(res.data);

                const combinedItems = res.data.reduce((acc: Cart[], cart: Cart) => {
                    const existingItem = acc.find(item => item.productId === cart.productId);
                    if (existingItem) {
                        existingItem.quantity += cart.quantity;
                    } else {
                        acc.push(cart);
                    }
                    return acc;
                }, []);
                setCartItems(combinedItems);

                const initialQuantities = combinedItems.reduce((acc: CartQuantities, cart: Cart) => {
                    acc[cart.productId] = cart.quantity;
                    return acc;
                }, {});
                setItemQuantities(initialQuantities);

                const total = combinedItems.reduce((sum: number, cart: Cart) => {
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
            const newQuantity = Math.max((prev[productId] || 1) + (increment ? 1 : -1), 1);
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

                toast.success('ลบสินค้าทั้งหมดเรียบร้อย!', { autoClose: 1500 });
            }
        } catch (err) {
            console.error("เกิดข้อผิดพลาดระหว่างลบสินค้า:", err);
            toast.error('เกิดข้อผิดพลาด! กรุณาลองใหม่', { autoClose: 1500 });
        }
    };

    const handleOrder = () => {
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

            Swal.fire({
                icon: "success",
                title: "ทำการสั่งซื้อเรียบร้อยแล้ว🥳",
            });

            setCartItems((prev) => prev.filter(item => !selectedItems.includes(item.productId)));
            setSelectedItems([]);
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