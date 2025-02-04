'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, Typography, Box } from "@mui/material";
import { ShoppingCart, Person, Inventory, LocalShipping } from "@mui/icons-material";

const AdminPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/client/register');
    }
  }, [status, session]);

  return (
    <Box style={{ flex: 1, padding: 24, minHeight: "1000px" }}>
      <Typography variant="h5" gutterBottom>Overview</Typography>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <Card style={{ backgroundColor: "#27293D", padding: 16, display: "flex", alignItems: "center" }}>
          <ShoppingCart style={{ color: "white" }} />
          <CardContent>
            <Typography variant="h6">150</Typography>
            <Typography>จำนวนคำสั่งซื้อใหม่</Typography>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "#27293D", padding: 16, display: "flex", alignItems: "center" }}>
          <Person style={{ color: "white" }} />
          <CardContent>
            <Typography variant="h6">5 คน</Typography>
            <Typography>ยอดการลงทะเบียน</Typography>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "#27293D", padding: 16, display: "flex", alignItems: "center" }}>
          <Inventory style={{ color: "white" }} />
          <CardContent>
            <Typography variant="h6">18 คำสั่งซื้อ</Typography>
            <Typography>คำสั่งซื้อรอดำเนินการ</Typography>
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: "#27293D", padding: 16, display: "flex", alignItems: "center" }}>
          <LocalShipping style={{ color: "white" }} />
          <CardContent>
            <Typography variant="h6">5,000 บาท</Typography>
            <Typography>ยอดขายรวม (วันนี้)</Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default AdminPage;