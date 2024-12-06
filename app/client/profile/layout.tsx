'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
} from '@mui/material';
import { FiUser, FiMapPin, FiShield, FiLogOut, FiMenu } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RiFileList3Line } from 'react-icons/ri';
import { BsHeart } from 'react-icons/bs';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: 'ข้อมูลส่วนตัว', icon: <FiUser color="#1976d2" />, action: () => router.push('/client/profile/overview') },
    { label: 'จัดการข้อมูลส่วนตัว', icon: <FiShield color="#1976d2" />, action: () => router.push('/client/profile/account-information') },
    { label: 'จัดการที่อยู่จัดส่ง', icon: <FiMapPin color="#1976d2" />, action: () => router.push('/client/profile/shipping-address') },
    { label: 'คำสั่งชื้อ', icon: <RiFileList3Line color="#1976d2" />, action: () => router.push('/client/profile/order-history') },
    { label: 'รายการโปรด', icon: <BsHeart color="#1976d2" />, action: () => router.push('/client/profile/wishlist') },
    { divider: true },
    { label: 'ออกจากระบบ', icon: <FiLogOut color="#1976d2" />, action: () => signOut({ callbackUrl: '/' }) },
  ];

  const drawerContent = (
    <>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        จัดการบัญชีผู้ใช้
      </Typography>
      <List>
        {menuItems.map((item, index) =>
          item.divider ? (
            <Divider key={index} sx={{ marginY: 1 }} />
          ) : (
            <ListItem
              key={index}
              component="button"
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              onClick={item.action}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          )
        )}
      </List>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex", minHeight: '100vh', mt: 12 }}>
        {/* Sidebar สำหรับหน้าจอใหญ่ */}
        <Box
          sx={{
            minWidth: { xs: 0, md: 250 },
            padding: 2,
            borderRight: { xs: 'none', md: '1px solid #e0e0e0' },
            display: { xs: 'none', md: 'block' },
          }}
        >
          {drawerContent}
        </Box>

        {/* Drawer สำหรับมือถือ */}
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <Box sx={{ width: 250, padding: 2 }}>{drawerContent}</Box>
        </Drawer>

        {/* IconButton สำหรับเปิด Drawer */}
        <IconButton
          sx={{ display: { xs: 'block', md: 'none' }, position: 'absolute', top: 16, left: 16 }}
          onClick={() => setMobileOpen(true)}
        >
          <FiMenu />
        </IconButton>

        {/* Content */}
        <Box sx={{ flexGrow: 1, padding: { xs: 0, md: 2 } }}>{children}</Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
