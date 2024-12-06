'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container, Paper } from '@mui/material';
import ProfileIcon from '@/components/admin-page/profileIcon';

const AdminPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/client/register');
    }
  }, [status, session]);

  return (
    <Container maxWidth="lg">
      <Paper elevation={1} sx={{ padding: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin Panel
          </Typography>
          <Typography variant="h6">
            Hello, {session?.user?.name}
          </Typography>
        </Box>
      </Paper>
    </Container >
  );
};

export default AdminPage;
