"use client"
import { Box, Card, CardContent, Typography, Table, TableContainer, Button, TableBody, TableRow, TableCell, Skeleton } from "@mui/material";
import { Order } from "@/types/order";
import axios from "axios";
import { useEffect, useState } from "react";
import LatestOrderTable from "./orders/latest-order-table";
import LatestOrderHead from "./orders/latest-order-head";

export default function LatestOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                await axios.get('/api/order').then((res) => {
                    setOrders(res.data)
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [])

    return (
        <Card sx={{ bgcolor: "secondary.dark", flex: 2, pb: 0, minHeight: "350px", overflowX: "auto", width: "100%", maxWidth: "100%" }}>
            <CardContent sx={{ p: 0 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2} borderBottom={"1px solid #50575E"}>
                    <Typography variant="h6" color="white">{orders.length > 0 ? `คำสั่งซื้อใหม่ล่าสุด (${orders.length})` : 'คำสั่งซื้อใหม่ล่าสุด'}</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: "none", bgcolor: "primary.main" }}
                        href="/admin/orders"
                    >ดูทั้งหมด</Button>
                </Box>
                <TableContainer>
                    <Table>
                        {/* Header */}
                        <LatestOrderHead />

                        {/* Body */}
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 4 }).map((_, __) => <LatestOrderTable loading={loading} key={__} />)
                            ) : (
                                orders.length > 0 ? orders.map((order, index) => (
                                    <LatestOrderTable order={order} key={index} />
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ borderBottom: 0 }}>
                                            <Typography color="white" align="center">ยังไม่มีคำสั่งซื้อใหม่</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
}