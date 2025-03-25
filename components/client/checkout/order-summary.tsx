import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Divider,
    Tooltip,
    IconButton,
} from "@mui/material";
import { CartItem } from '@/types/cart';
import { MdAdd } from 'react-icons/md';
import { BiMinus } from 'react-icons/bi';

interface OrderSummaryProps {
    cartItems?: CartItem[],
    itemQuantities: Record<number, number>;
    cartTotalPrice: number
    setItemQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    handleOrder: () => void
    updateItemQuantity: (productId: number, increment: boolean) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    cartItems,
    cartTotalPrice,
    handleOrder,
    itemQuantities,
    updateItemQuantity,
    setItemQuantities,
}) => {
    useEffect(() => {
        try {
            const savedQuantities = JSON.parse(localStorage.getItem("cartItemQuantities") || "{}");
            if (typeof savedQuantities === "object" && savedQuantities !== null) {
                setItemQuantities(savedQuantities);
            }
        } catch (error) {
            console.error("Error parsing cartItemQuantities from localStorage:", error);
            localStorage.removeItem("cartItemQuantities");
        }
    }, []);
    
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">สรุปคำสั่งซื้อ</Typography>
                <Divider sx={{ my: 2 }} />

                {cartItems?.map((item) => (
                    <Box key={item.productId} mb={2}>
                        <Box display="flex" justifyContent="space-between" alignItems={'center'}>
                            <Box sx={{ height: { xs: "50px", md: "60px" }, minWidth: "60px", mr: 1 }}>
                                <img className='h-full w-full' src={item.product.image?.[0]} />
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant="body2" className='line-clamp-1'>
                                    {item.product.title}
                                </Typography>
                                <div className="flex justify-between items-center rounded-lg overflow-hidden">
                                    <Typography variant="body2" color="primary">
                                        ฿{item.product.price.toLocaleString()}
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            size="small"
                                            disabled={itemQuantities[item.productId!] <= 1}
                                            onClick={() => updateItemQuantity(item.product.id, false)}
                                        >
                                            <BiMinus />
                                        </IconButton>
                                        <Typography
                                            variant='caption'
                                            textAlign="center"
                                            className="w-6 font-bold"
                                            color='text.secondary'
                                        >
                                            {itemQuantities[item.productId!]}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => updateItemQuantity(item.product.id, true)}
                                            disabled={itemQuantities[item.productId!] >= item.product.stock}
                                        >
                                            <MdAdd />
                                        </IconButton>
                                    </Box>
                                </div>
                            </Box>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                    </Box>
                ))}
                {/* ยอดรวม */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color='gray'>ยอดรวมสินค้า ({cartItems?.length} ชิ้น)</Typography>
                    <Typography variant="body2">
                        ฿{cartTotalPrice.toLocaleString()}
                    </Typography>
                </Box>
                {/* ส่วนลดคูปอง */}
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color='gray'>ส่วนลดคูปอง</Typography>
                    <Typography variant="body2">฿0</Typography>
                </Box>
                {/* ค่าจัดส่ง */}
                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color='gray'>ค่าจัดส่ง</Typography>
                    <Tooltip title="รายละเอียดค่าจัดส่ง">
                        <Typography variant="body2">
                            ฿ฟรี
                        </Typography>
                    </Tooltip>
                </Box>
                <Divider sx={{ my: 2 }} />
                {/* ยอดสุทธิ */}
                <Box display="flex" justifyContent="space-between" fontWeight="bold">
                    <Typography variant="body1">ยอดสุทธิ</Typography>
                    <Typography variant="body1" color="primary">
                        ฿{cartTotalPrice.toLocaleString()}
                    </Typography>
                </Box>

                {/* ปุ่มชำระเงิน */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, bgcolor: "primary.main" }}
                    onClick={handleOrder}
                >
                    ยืนยันคำสั่งซื้อ
                </Button>
            </CardContent>
        </Card>
    );
};

export default OrderSummary;