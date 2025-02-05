'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {  Typography, Box } from "@mui/material";
import Stats from '@/components/admin/overview/stats';

const AdminPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/client/register');
    }
  }, [status, session]);


  return (
    <Box sx={{ flex: 1, px: 6, py: 2 }}>
      <Typography variant="h5" mb={2} fontWeight={800} gutterBottom>
        Overview
      </Typography>
      <Stats />
    </Box>
  );
};

export default AdminPage;