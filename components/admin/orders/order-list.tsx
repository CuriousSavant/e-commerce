'use client';
import React from 'react';
import { Avatar, Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CalendarToday } from '@mui/icons-material'
import { format } from 'date-fns';
import { Order } from '@/types/order';

// component สำหรับแสดงรายการคำสั่งซื้อทั้งหมด

interface OrderListProps {
    order: Order;
    statusColors: { [key: string]: string };
    isExpanded: boolean;
    setEditOrderDetailId: React.Dispatch<React.SetStateAction<number | null>>;
    toggleExpand: (orderId: number) => void;
    onOpenDetail: () => void;
}

const OrderList: React.FC<OrderListProps> = ({
    order, statusColors, isExpanded,
    toggleExpand, onOpenDetail,
    setEditOrderDetailId,
}) => {
    return (
        <Card key={order.id} sx={{ bgcolor: "secondary.dark", color: "white", borderRadius: 2, '.MuiCardContent-root': { pb: 1.2 }, mb: 2, px: 1 }}>
            <CardContent>
                {/* หมายเลขคำสั่งซื้อ และ สถานะ */}
                <Box display="flex" alignItems={'center'} gap={1} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                        <Typography variant="h6" fontWeight={600}>
                            Order #{order.orderId}
                        </Typography>
                        <Chip label={order.status} color={statusColors[order.status as keyof typeof statusColors] as any} size="small" />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>฿{order.total.toLocaleString('th-TH')}</Typography>
                </Box>

                {/* วันที่ และ หมายเลขคำสั่งซื้อ */}
                <Box display="flex" flexDirection={'column'} mb={2} mt={1}>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "#c3c3c3" }}>
                        <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                        {`${format(order.createdAt, "d MMM yyyy h:mm a")} |`}
                        <Avatar src={order.user.image || ""} sx={{ width: 20, height: 20, ml: 0.5, mr: 0.5 }} />
                        <Typography variant='subtitle2'>{order.user.firstname} {order.user.lastname}</Typography>
                    </Typography>
                    <Typography variant='body2' sx={{ display: "flex", alignItems: "center", color: "#c3c3c3" }}>
                        วันที่คาดว่าจะได้รับ : <span className='text-[#635bff] ml-1'>ไม่มีกำหนด</span>
                    </Typography>
                </Box>

                {/* รูปภาพสินค้า */}
                {order.items.slice(0, isExpanded ? order.items.length : 1).map((item) => (
                    <Box key={item.product.title} display="flex" alignItems="center" gap={2} mb={1}>
                        <img src={item.product.image?.[0] || ""} alt={item.product.title} width={50} height={50} className='rounded-lg' />
                        <Box>
                            <Typography sx={{ fontSize: 14 }}>{item.product.title}</Typography>
                            <Typography component="span" sx={{ color: "#C3C3C3", fontSize: 13 }}>จำนวน: {item.quantity} ชิ้น</Typography>
                        </Box>
                    </Box>
                ))}

                <Box display={"flex"} justifyContent={order.items.length > 1 ? "space-between" : "end"} textAlign="right" alignItems={"center"} mt={2}>
                    {/* ปุ่มแสดงสินค้าเพิ่มเติมถ้าสินค้ามามากว่า 1 ชิ้น */}
                    {order.items.length > 1 && (
                        <Box display="flex" alignItems="center" color="gray" sx={{ cursor: "pointer" }}>
                            <Button startIcon={isExpanded ? <ExpandLess /> : <ExpandMore />} size='small' onClick={() => toggleExpand(order.id)} sx={{ color: "#c3c3c3" }}>
                                {isExpanded ? "ดูน้อยลง" : `ดูเพิ่มเติมอีก ${order.items.length - 1} ชิ้น`}
                            </Button>
                        </Box>
                    )}

                    <Box>
                        <Button variant='text' size='small' sx={{ color: "white" }} onClick={() => setEditOrderDetailId(order.id)}>แก้ไข</Button>
                        {/* ปุ่มรายละเอียดคำสั่งซื้อ */}
                        <Button variant="contained" size="small" sx={{ bgcolor: "primary.main", color: "white" }} onClick={onOpenDetail}>
                            ดูรายละเอียด
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default OrderList;