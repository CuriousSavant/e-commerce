"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Typography, Card, CardContent, Grid, Button, Divider, Chip, Stack, IconButton } from '@mui/material';
import axios from "axios";
import { useSession } from "next-auth/react";
import { Order } from "@/types/order";
import { format } from "date-fns";
import { BiArrowBack } from "react-icons/bi";
import OrderSummary from "@/components/client/orders/order-detail/order-summary";
import OrderCard from "@/components/client/orders/order-detail/order-card";

const OrderDetail = () => {
    const { id: orderId } = useParams();
    const [orders, setOrders] = useState<Order[]>([]);
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`/api/order/${orderId}?userId=${session?.user.id}`);
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (session?.user.id) fetchOrderDetails();
    }, [orderId, session?.user.id]);

    return (
        <Box px={{ xs: 2, md: 3 }}>
            <IconButton onClick={() => router.push('/client/profile/order-summary')}>
                <BiArrowBack />
            </IconButton>
            {orders.map((order, index) => (
                <div key={index}>
                    <Box key={index} border={'1px solid #ddd'} p={2} borderRadius={2}>
                        <Typography variant="h6">
                            หมายเลขคำสั่งซื้อ: <span className="text-blue-500">#{order.orderId}</span>
                        </Typography>
                        <Typography color="gray" variant="subtitle2">
                            วันที่สั่งซื้อ: {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
                        </Typography>

                        {/* Order Item */}
                        {order.items.map((item, index) => (
                            <OrderCard key={index} item={item} />
                        ))}
                    </Box>
                    <OrderSummary order={order} />
                </div>
            ))}
        </Box>
    );
};

export default OrderDetail;