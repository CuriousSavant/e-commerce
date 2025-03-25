import { Box, Typography, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const CartSummary = () => {
    const router = useRouter();
    const { selectedItems, cartTotalPrice } = useCart();
    return (
        <Box flex={0.4} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: '8px' }}>
            <Typography variant="h6" mb={2}>
                สรุปคำสั่งซื้อ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography color='gray' variant='body2'>จำนวนสินค้า</Typography>
                    <Typography variant='body2'>{selectedItems.length > 0 ? selectedItems.length + " ชิ้น" : "-"}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography color='gray' variant='body2'>ค่าจัดส่ง</Typography>
                    <Typography variant='body2'>ฟรี</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" fontWeight="bold">
                    <Typography color='gray' variant='body2'>ส่วนลด</Typography>
                    <Typography variant='body2'>ไม่มี</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between" fontWeight="bold">
                    <Typography variant='body1'>ยอดรวม</Typography>
                    <Typography variant="body1" fontWeight={700} color='primary'>฿{cartTotalPrice.toLocaleString('th-TH')}</Typography>
                </Box>
            </Box>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: '#0f63e9' }}
                onClick={() => router.push('/client/checkout')}
            >
                ชำระเงิน
            </Button>
        </Box>
    )
}

export default CartSummary;
