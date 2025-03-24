import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Button,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Divider,
    Chip,
} from "@mui/material";
import { Order } from '@/types/order';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';

interface OrderListProps {
    order: Order;
    formatStatus: (status: string) => { label: string, color: string };
    handleCancelOrder: (orderId: number) => void;
    handleAddToCart: (product: Product, quantity: number) => void;
}

const OrderList: React.FC<OrderListProps> = ({
    order,
    formatStatus,
    handleCancelOrder,
    handleAddToCart,
}) => {
    const router = useRouter()

    return (
        <Paper
            key={order.id}
            sx={{
                mb: 4,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fdfdfd",
            }}
            elevation={0}
        >
            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                    รายการคำสั่งซื้อ{" "}
                    <Typography
                        component="span"
                        sx={{ color: "#1976d2", cursor: "pointer" }}
                    >
                        #{order.orderId}
                    </Typography>
                </Typography>
                <Button
                    sx={{ textTransform: "none", fontWeight: 600 }}
                    size='small'
                    onClick={() => router.push(`/client/profile/order-summary/${order.id}`)}
                >
                    ดูรายละเอียดคำสั่งซื้อ
                </Button>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Order Details */}
            <Box mb={2}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box>
                        <Typography variant="body2" color="textSecondary">
                            วันที่สั่งซื้อ
                        </Typography>
                        <Typography fontWeight="600">
                            {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
                        </Typography>
                    </Box>
                    <Chip
                        variant="filled"
                        color={`${formatStatus(order.status).color}` as "warning" | "success" | "error"}
                        size="small"
                        sx={{
                            textTransform: "none",
                            borderRadius: 10,
                            px: 1,
                            py: 2,
                        }}
                        label={"สถานะ: " + formatStatus(order.status).label}
                    />
                </Box>
                <Typography variant="body2" color="textSecondary" mt={1}>
                    วันที่คาดว่าจะได้รับสินค้า
                </Typography>
                <Typography fontWeight="600">ไม่มีวันได้หรอกจ้ะ อิ-อิ</Typography>
            </Box>

            {/* Product Items */}
            {order.items.map((citem, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: 2,
                        mb: 1,
                        height: { xs: "110px", sm: "80px", md: "90px" },
                    }}
                >
                    {/* รูปภาพ */}
                    <CardMedia
                        component="img"
                        image={citem.product.image?.[0]}
                        alt={citem.product.title}
                        sx={{
                            objectFit: "contain",
                            backgroundColor: "#fff",
                            width: { xs: "100px", sm: "90px", md: "100px" },
                            height: { xs: "110px", sm: "80px", md: "90px" },
                            borderRadius: 1,
                        }}
                    />

                    {/* เนื้อหาหลัก */}
                    <CardContent
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            p: 1,
                            "&:last-child": { pb: 1 },
                        }}
                    >
                        {/* ชื่อสินค้า */}
                        <Typography
                            variant="subtitle2"
                            fontWeight="700"
                            className="line-clamp-2 text-[12px] md:text-base"
                        >
                            {citem.product.title}
                        </Typography>

                        {/* จำนวน และ ราคา */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mt={1}
                        >
                            {/* จำนวน */}
                            <Typography variant="body2" color="textSecondary">
                                จำนวน: {citem.quantity}
                            </Typography>

                            {/* ราคา */}
                            <Box display="flex" alignItems="center" flexDirection={'column'}>
                                <Typography variant="body1" fontWeight="bold" color="primary">
                                    ฿{citem.total.toLocaleString("th-TH")}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={order.status !== 'COMPLETED' as any ? 3 : 2} gap={1}>
                <Box>
                    <Typography variant="body2" color="textSecondary">
                        ยอดสุทธิ
                    </Typography>
                    <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                        fontSize={'18px'}
                    >
                        ฿{order.total.toLocaleString('th-TH')}
                    </Typography>
                </Box>
                <Box>
                    {/* Cancel Order (จะแสดงเมื่อ order อยู่ในสภานะเตรียมจัดส่ง) */}
                    {order.status !== 'COMPLETED' as any && order.status !== 'CANCELED' as any && <Button
                        variant="outlined"
                        color="error"
                        size='small'
                        onClick={() => handleCancelOrder(order.id)}
                    >
                        ยกเลิกคำสั่งซื้อ
                    </Button>}
                    {order.status === 'COMPLETED' as any && <Button
                        variant="outlined"
                        size='small'
                        color='success'
                        onClick={() => {
                            order.items.forEach((item) => {
                                handleAddToCart(item.product, 1)
                                router.push('/client/checkout')
                            })
                        }}
                    >
                        สั่งซื้ออีกครั้ง
                    </Button>}
                </Box>
            </Box>
        </Paper>
    )
}

export default OrderList;