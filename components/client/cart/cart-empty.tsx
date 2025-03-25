'use client'
import React from 'react';
import { Box, Typography, Button, } from '@mui/material';
import { MdAddShoppingCart } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const CartEmpty = () => {
    const router = useRouter();

    return (
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
    )
}

export default CartEmpty;