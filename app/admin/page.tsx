'use client';
import React from 'react';
import { Typography, Box } from "@mui/material";
import Stats from '@/components/admin/overview/stats';
import LatestOrders from '@/components/admin/overview/latest-orders';
import LatestMembers from '@/components/admin/overview/latest-users';

const AdminPage = () => {
  return (
    <Box sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 2 }}>
      <Typography variant="h5" mb={2} fontWeight={800} gutterBottom>
        Overview
      </Typography>

      <Stats />

      <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} alignItems={"flex-start"} gap={4} mt={4}>
        <LatestOrders />
        <LatestMembers />
      </Box>
    </Box>
  );
};

export default AdminPage;