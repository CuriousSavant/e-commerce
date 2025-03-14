"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Card, CardContent, Grid, Button, Divider, Chip, Stack, IconButton } from '@mui/material';
import axios from "axios";
import { useSession } from "next-auth/react";
import { Order } from "@/types/order";
import { format } from "date-fns";
import { BiArrowBack } from "react-icons/bi";

const OrderDetail = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState<Order[]>([]);
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`/api/order/${id}?userId=${session?.user.id}`);
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (session?.user.id) fetchOrderDetails();
    }, [id, session?.user.id]);

    return (
        <Box px={{ xs: 2, md: 3 }}>
            <IconButton sx={{ mb: 4 }} onClick={() => router.push('/client/profile/order-summary')}>
                <BiArrowBack />
            </IconButton>
            {orders.map(order => (
                <>
                    {order.items.map((item) => (
                        <Box border={'1px solid #ddd'} p={2} borderRadius={2}>
                            <Typography variant="h6" fontSize={{ xs: '1rem', md: '1.25rem' }}>
                                หมายเลขคำสั่งซื้อ: <span className="text-blue-500">#{item.id}</span>
                            </Typography>
                            <Typography color="gray" fontSize={{ xs: '0.75rem', md: '0.875rem' }} sx={{ mt: 1 }}>
                                วันที่สั่งซื้อ: {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
                            </Typography>

                            {/* Order Item */}
                            <Card variant="outlined" sx={{ mt: 2 }}>
                                <CardContent>
                                    {/* Container Flex */}
                                    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
                                        {/* Product Image */}
                                        <Box
                                            sx={{
                                                width: { xs: '100%', sm: '150px' },
                                                flexShrink: 0,
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <img
                                                src={item.product.image?.[0]}
                                                alt="Product"
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '150px',
                                                    borderRadius: 8,
                                                }}
                                            />
                                        </Box>

                                        {/* Product Details */}
                                        <Box flex="1" display="flex" flexDirection="column" gap={1}>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                fontSize={{ xs: '0.875rem', md: '1rem' }}
                                            >
                                                {item.product.title}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                fontSize={{ xs: '0.75rem', md: '0.875rem' }}
                                                className="line-clamp-2"
                                            >
                                                {item.product.description}
                                            </Typography>
                                            <Box display="flex" justifyContent="space-between" alignItems={'end'} mt={2}>
                                                <Typography fontSize="0.875rem" color="gray">
                                                    จำนวณ: {item.quantity}
                                                </Typography>

                                                {/* Total Price */}
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="600"
                                                    fontSize={{ xs: '0.875rem', md: '1rem' }}
                                                    color="primary"
                                                >
                                                    ฿{item.total.toLocaleString('th-TH')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>

                            {/* Order Summary */}
                            <Card variant="outlined" sx={{ mt: 3 }}>
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        fontWeight="600"
                                    >
                                        สรุปคำสั่งซื้อ
                                    </Typography>
                                    <Stack spacing={1} mt={1}>
                                        <Grid container justifyContent="space-between">
                                            <Typography variant="subtitle2" sx={{ color: "gray" }}>ยอดรวม</Typography>
                                            <Typography variant="subtitle2">฿{item.total.toLocaleString('th-TH')}</Typography>
                                        </Grid>
                                        <Grid container justifyContent="space-between">
                                            <Typography variant="subtitle2" sx={{ color: "gray" }}>ส่วนลด</Typography>
                                            <Typography variant="subtitle2">$0</Typography>
                                        </Grid>
                                        <Grid container justifyContent="space-between">
                                            <Typography variant="subtitle2" sx={{ color: "gray" }}>ค่าส่ง</Typography>
                                            <Typography variant="subtitle2">ฟรี</Typography>
                                        </Grid>
                                    </Stack>
                                    <Divider sx={{ my: 1 }} />
                                    <Grid container justifyContent="space-between">
                                        <Typography fontWeight="600">
                                            ยอดสุทธิ
                                        </Typography>
                                        <Typography fontWeight="600" color="primary">
                                            ${order.total.toLocaleString('th-TH')}
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </>
            ))}
        </Box>
    );
};

export default OrderDetail;