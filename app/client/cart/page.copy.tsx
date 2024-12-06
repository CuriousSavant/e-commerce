'use client'
import React from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    CircularProgress,
    Checkbox,
    IconButton
} from '@mui/material';
import { MdAdd, MdAddShoppingCart } from 'react-icons/md';
import { BiMinus } from 'react-icons/bi';
import useCart from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

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
                            <Typography variant="h6" fontWeight="bold" mb={3}>
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
                                        {cartItems.flatMap(cartItem => cartItem.product).map((cartItem, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col sm:flex-row text-neutral-600 items-center justify-between border-b border-gray-200 py-2 gap-2 sm:gap-0"
                                            >
                                                {/* ส่วนข้อมูลสินค้า */}
                                                <div className="flex items-center gap-2 w-full">
                                                    {/* Checkbox */}
                                                    <IconButton>
                                                        <Checkbox
                                                            checked={selectedItems.includes(cartItem.id)}
                                                            onChange={() => toggleSelectItem(cartItem.id)}
                                                            className="w-4 h-4"
                                                        />
                                                    </IconButton>
                                                    {/* รูปภาพ */}
                                                    <img
                                                        src={cartItem.image?.[0]}
                                                        alt={cartItem.title}
                                                        className="h-16 md:w-12 md:h-12 rounded"
                                                    />

                                                    <div className='flex flex-col gap-2 w-full'>
                                                        <a
                                                            href={`/client/${cartItem.slug}`}
                                                            className="text-sm hover:underline flex-grow overflow-hidden pr-0 sm:pr-2 line-clamp-2 sm:line-clamp-[2]l"
                                                        >
                                                            {cartItem.title}
                                                        </a>

                                                        {/* ส่วนการจัดการสินค้า */}
                                                        <div className="flex flex-row justify-between items-center gap-2  sm:w-auto text-sm">
                                                            {/* ราคา */}
                                                            <div className='text-red-600 text-sm'>฿{cartItem.price.toLocaleString('th-TH')}</div>

                                                            {/* จัดการเพิ่ม ลบ สินค้า */}
                                                            <div className="flex items-center justify-between mr-2">
                                                                <button
                                                                    onClick={() => updateItemQuantity(cartItem.id, false)}
                                                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                                                >
                                                                    <BiMinus />
                                                                </button>
                                                                <span className="mx-2">{itemQuantities[cartItem.id]?.toLocaleString('th-TH')}</span>
                                                                <button
                                                                    onClick={() => updateItemQuantity(cartItem.id, true)}
                                                                    className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                                                                >
                                                                    <MdAdd />
                                                                </button>
                                                            </div>
                                                            {/* <button
                                                                onClick={() => removeItemFromCart(cartItem.id)}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="นำออกจากรถเข็น"
                                                            >
                                                                <MdDeleteOutline />
                                                            </button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
