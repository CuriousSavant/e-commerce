'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Typography, Box } from "@mui/material";
import Stats from '@/components/admin/overview/stats';
import LatestOrders from '@/components/admin/overview/overview-latest-orders';
import LatestMembers from '@/components/admin/overview/overview-latest-users';

const AdminPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, session]);


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