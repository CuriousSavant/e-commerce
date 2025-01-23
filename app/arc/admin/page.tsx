'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container, Paper } from '@mui/material';

const AdminPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/client/register');
    }
  }, [status, session]);

  return (
    <Container maxWidth="lg" sx={{ bgcolor: "" }}>
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