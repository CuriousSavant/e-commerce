// components/OrderFilters.tsx
import React from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';

const OrderFilters = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
    <TextField label="Order ID" size="small" />
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Select defaultValue="All" size="small" sx={{ width: 150 }}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Canceled">Canceled</MenuItem>
      </Select>
      <TextField label="Customer" size="small" />
    </Box>
  </Box>
);

export default OrderFilters;