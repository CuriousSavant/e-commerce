'use client'
import React from 'react';
import { Box, Typography, CircularProgress, Checkbox, Skeleton } from '@mui/material';
import { useCart } from '@/context/CartContext';
import CartEmpty from '@/components/client/cart/cart-empty';
import CartList from './cart-list';
import CartSummary from './cart-summary';

const CartPage = () => {
    const {
        cartItems,
        itemQuantities,
        selectedCartItems,
        updateItemQuantity,
        toggleSelectAllItems,
        toggleSelectItem,
        removeItemFromCart,
        loading,
    } = useCart();

    return (
        <Box sx={{ mt: 14 }}>
            {cartItems.length > 0 ? (
                <Box sx={{ mx: 'auto' }}>
                    {loading ? <Skeleton variant="text" height={40} width={200} /> : (
                        <Typography variant="h6" fontWeight="bold" mb={3} ml={1}>
                            รถเข็นของฉัน (สินค้า {cartItems.flatMap(cartItem => cartItem.product).length} ชิ้น)
                        </Typography>
                    )}
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
                        {/* รายการสินค้า */}
                        <Box flex={1}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Checkbox
                                    checked={
                                        cartItems.length > 0 && selectedCartItems.length === cartItems.flatMap(cartItem => cartItem.id).length
                                    }
                                    onChange={toggleSelectAllItems}
                                />
                                <Typography ml={1}>เลือกทั้งหมด</Typography>
                            </Box>
                            <Box>
                                {cartItems.flatMap(cartItem => cartItem.product).map((product, index) => (
                                    <CartList key={index}
                                        product={product}
                                        selectedCartItems={selectedCartItems}
                                        toggleSelectItem={toggleSelectItem}
                                        updateItemQuantity={updateItemQuantity}
                                        removeItemFromCart={removeItemFromCart}
                                        itemQuantities={itemQuantities} />
                                ))}
                            </Box>
                        </Box>

                        {/* สรุปคำสั่งซื้อ */}
                        <CartSummary />
                    </Box>
                </Box>
            ) : (
                <CartEmpty />
            )}
        </Box>
    );
};

export default CartPage;