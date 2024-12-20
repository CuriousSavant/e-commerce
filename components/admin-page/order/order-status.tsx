'use client'
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { FiShoppingCart, FiFileText, FiCheckSquare, FiXSquare } from 'react-icons/fi';
import axios from 'axios';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const initialStats: StatItem[] = [
  { icon: <FiShoppingCart size={28} color="#007BFF" />, label: 'Total Orders', value: 0, color: '#007BFF' },
  { icon: <FiFileText size={28} color="#FFC107" />, label: 'Active Orders', value: 0, color: '#FFC107' },
  { icon: <FiCheckSquare size={28} color="#28A745" />, label: 'Completed Orders', value: 0, color: '#28A745' },
  { icon: <FiXSquare size={28} color="#DC3545" />, label: 'Canceled Orders', value: 0, color: '#DC3545' },
];

const OrderStats = () => {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/order-admin/');
      const orders = response.data;

      const totalOrders = orders.length;
      const activeOrders = orders.filter((order: any) => order.status === 'active').length;
      const completedOrders = orders.filter((order: any) => order.status === 'completed').length;
      const canceledOrders = orders.filter((order: any) => order.status === 'canceled').length;

      setStats([
        { ...initialStats[0], value: totalOrders },
        { ...initialStats[1], value: activeOrders },
        { ...initialStats[2], value: completedOrders },
        { ...initialStats[3], value: canceledOrders },
      ]);
    } catch (err) {
      setError('Failed to fetch order data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  return (
    <Grid container spacing={0} mb={3} sx={{ borderRadius: 2, overflow: 'hidden', p: 2, border: '1px solid #ddd', gap: { xs: 2, md: 0 } }}>
      {stats.map((stat, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            borderRight: { xs: 0, md: index < stats.length - 1 ? '1px solid #ddd' : 0 },
          }}
        >
          {stat.icon}
          <Box ml={2}>
            <Typography variant="body1" color="textSecondary">
              {stat.label}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {stat.value}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderStats;
