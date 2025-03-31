import { Box, Typography, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Swal from 'sweetalert2'

const CartSummary = () => {
    const router = useRouter();
    const { selectedCartItems, cartTotalPrice } = useCart();

    const handleNextToCheckout = () => {
        if (selectedCartItems.length > 0) {
            router.push('/client/checkout')
        } else {
            Swal.fire({
                title: "กรุณาเลือกสินค้าที่ต้องการชำระ",
                icon: "warning",
            })
        }

    }

    return (
        <Box flex={0.4} sx={{ p: 3, border: '1px solid #f0f0f0', borderRadius: '8px' }}>
            <Typography variant="h6" mb={2}>
                สรุปคำสั่งซื้อ
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography color='gray' variant='body2'>จำนวนสินค้า</Typography>
                    <Typography variant='body2'>{selectedCartItems.length > 0 ? selectedCartItems.length + " ชิ้น" : "-"}</Typography>
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
                onClick={handleNextToCheckout}
            >
                ชำระเงิน
            </Button>
        </Box>
    )
}

export default CartSummary;