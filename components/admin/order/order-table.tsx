import React, { SetStateAction } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Avatar, Typography, Box } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { format } from 'date-fns';
import { Order } from '@/types/order';
import axios from 'axios';

interface OrderTableProps {
    orders: Order[];
    setOrder: React.Dispatch<SetStateAction<Order[]>>
}

const formatStatus = (status: string) => {
    const statusObj = { label: "", color: "" }
    if (status === 'PENDING') {
        statusObj.label = 'กำลังจัดเตรียม'
        statusObj.color = 'warning'
    }
    else if (status === 'COMPLETED') {
        statusObj.label = 'จัดส่งเสร็จ'
        statusObj.color = 'success'
    }
    else if (status === 'CANCELLED') {
        statusObj.label = 'ยกเลิกสินค้าแล้ว'
        statusObj.color = 'error'
    }
    return statusObj;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, setOrder }) => {
    const handleDeleteOrder = (orderId: string) => {
        try {
            axios.delete(`/api/order-admin/${orderId}`)
                .then(() => {
                    setOrder((prev) => prev.filter(item => item.id !== orderId))
                })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <TableContainer
            sx={{
                overflowX: 'auto',
                width: '100%',
                display: 'block',
                tableLayout: 'fixed',
                maxWidth: '100%',
                border: '1px solid #ddd',
                borderRadius: '10px',
            }}
        >
            {orders.length > 0 ? (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ whiteSpace: "pre" }}>หมายเลขคำสั่งซื้อ</TableCell>
                            <TableCell sx={{ whiteSpace: "pre" }}>ผู้ใช้</TableCell>
                            <TableCell sx={{ whiteSpace: "pre" }}>วันที่สั่งซื้อ</TableCell>
                            <TableCell sx={{ whiteSpace: "pre" }}>จำนวนสินค้า</TableCell>
                            <TableCell sx={{ whiteSpace: "pre" }}>สถานะคำสั่งซื้อ</TableCell>
                            <TableCell sx={{ whiteSpace: "pre" }}>การจัดการ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) =>
                            order.orderItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell size='small'>
                                        <Typography sx={{ color: '#4F46E5', fontWeight: 'bold' }}>{item.id}</Typography>
                                    </TableCell>
                                    <TableCell size='small'>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar>{order.user.name?.charAt(0)}</Avatar>
                                            <Box>
                                                <Typography fontWeight="bold">{order.user.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {order.user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell size='small' sx={{ whiteSpace: "pre" }}>{format(new Date(order.createdAt), 'dd MMM yyyy, HH:mm')}</TableCell>
                                    <TableCell size='small'>{item.quantity}</TableCell>
                                    <TableCell size='small'>
                                        <Chip
                                            label={formatStatus(order.status).label}
                                            color={formatStatus(order.status).color as any}
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    </TableCell>
                                    <TableCell size='small'>
                                        <IconButton onClick={() => handleDeleteOrder(order.id)}>
                                            <MdDelete color="#FF0000" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            ): (
                <div className='min-h-[20rem] flex justify-center items-center'>
                    ไม่มี Order ในขณะนี้
                </div>
            )}
        </TableContainer>
    );
}

export default OrderTable;
