'use client'
import React from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Divider,
    Tooltip,
    CircularProgress,
    Checkbox
} from '@mui/material';
import { MdAdd, MdAddShoppingCart, MdDeleteOutline } from 'react-icons/md';
import { BiMinus } from 'react-icons/bi';
import useCart from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CartPage = () => {
    const {
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
    } = useCart();

    const router = useRouter();

    return (
        <Box sx={{ minHeight: '100vh', mt: 10 }}>
            {cartItems.length > 0 ? (
                <>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ mx: 'auto' }}>
                            <Typography variant="h6" fontWeight="bold" mb={3} ml={1}>
                                รถเข็นของฉัน (สินค้า {cartItems.flatMap(cartItem => cartItem.product).length} ชิ้น)
                            </Typography>
                            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
                                {/* รายการสินค้า */}
                                <Box flex={1}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <Checkbox
                                            checked={
                                                cartItems.length > 0 && selectedItems.length === cartItems.flatMap(cartItem => cartItem.id).length
                                            }
                                            onChange={toggleSelectAllItems}
                                        />
                                        <Typography ml={1}>เลือกทั้งหมด</Typography>
                                    </Box>
                                    <Box>
                                        <Box>
                                            {cartItems.flatMap(cartItem => cartItem.product).map((cartItem, index) => (
                                                <Box
                                                    key={index}
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    borderBottom="1px solid #f5f5f5"
                                                    py={2}
                                                // px={2}
                                                >
                                                    <Box display="flex" alignItems="center" gap={0.5} flex={2}>
                                                        {/* Checkbox ของ MUI */}
                                                        <Checkbox
                                                            checked={selectedItems.includes(cartItem.id)}
                                                            onChange={() => toggleSelectItem(cartItem.id)}
                                                        />
                                                        <Box
                                                            component="img"
                                                            src={cartItem.image?.[0]}
                                                            alt={cartItem.title}
                                                            sx={{ width: 48, height: 48, borderRadius: 1 }}
                                                        />
                                                        <Box>
                                                            <Typography
                                                                component={Link}
                                                                href={`/client/${cartItem.slug}`}
                                                                sx={{
                                                                    fontSize: '14px',
                                                                    ':hover': { textDecoration: 'underline' },
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 1,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden',
                                                                }}
                                                            >
                                                                {cartItem.title}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ fontSize: 15 }}>฿{cartItem.price.toLocaleString('th-TH')}</Box>
                                                        <Box display="flex" alignItems="center" gap={0.5}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => updateItemQuantity(cartItem.id, false)}
                                                            >
                                                                <BiMinus />
                                                            </IconButton>
                                                            <Typography>{itemQuantities[cartItem.id]?.toLocaleString('th-TH')}</Typography>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => updateItemQuantity(cartItem.id, true)}
                                                            >
                                                                <MdAdd />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                    <Tooltip title="นำออกจากรถเข็น">
                                                        <IconButton onClick={() => removeItemFromCart(cartItem.id)}>
                                                            <MdDeleteOutline />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>

                                {/* สรุปคำสั่งซื้อ */}
                                <Box flex={0.4} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                                    <Typography variant="h6" fontWeight="bold" mb={2}>
                                        สรุปการสั่งซื้อ
                                    </Typography>
                                    <Box display="flex" justifyContent="space-between" py={1}>
                                        <Typography>ยอดรวมสินค้า</Typography>
                                        <Typography>฿{cartTotalPrice.toLocaleString('th-TH')}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" fontWeight="bold">
                                        <Typography>ส่วนลด</Typography>
                                        <Typography variant="subtitle1">ไม่มี</Typography>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Box display="flex" justifyContent="space-between" fontWeight="bold">
                                        <Typography>ยอดรวม</Typography>
                                        <Typography variant="h6">฿{cartTotalPrice.toLocaleString('th-TH')}</Typography>
                                    </Box>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3 }}
                                        onClick={handleOrder}
                                    >
                                        ทำการสั่งซื้อ
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="50vh">
                    <MdAddShoppingCart className="text-6xl font-bold text-gray-400" />
                    <Typography fontWeight="bold" fontSize="24px">
                        ไม่มีสินค้าอยู่ในรถเข็น
                    </Typography>
                    <Typography>เลือกสินค้าที่โดนใจมาใส่ไว้ในรถเข็นได้เลย</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ px: '100px', mt: '10px' }}
                        onClick={() => router.push('/')}
                    >
                        กลับหน้าหลัก
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CartPage;
