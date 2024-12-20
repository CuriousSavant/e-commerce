'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';
import axios from 'axios';
import OrderStats from '@/components/admin-page/order/order-status';
import OrderFilters from '@/components/admin-page/order/order-filters';
import OrderTable from '@/components/admin-page/order/order-table';
import { Order } from '@/types/order';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get('/api/order-admin').then((res) => setOrders(res.data));
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Orders
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/arc/admin">
              <AiOutlineHome />
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Order</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Order Stats */}
      <OrderStats />

      {/* Filters */}
      <OrderFilters />

      {/* Order Table */}
      <OrderTable orders={orders} setOrder={setOrders} />
    </Box>
  );
}