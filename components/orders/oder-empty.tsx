import { Box, Typography } from '@mui/material'
import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'

const OrderEmpty = () => {
    return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="80vh"
                textAlign="center"
            >
                <MdOutlineShoppingCart size={80} color="#888" />
                <Typography variant="h6" color="textSecondary" mt={2}>
                    ไม่มีรายการคำสั่งซื้อ
                </Typography>
            </Box>
    )
}

export default OrderEmpty