
// มีแผลนจะใช้ api สำหรับข้อมูลของจังหวัด
import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, IconButton, Tooltip, Menu, Divider, MenuItem } from '@mui/material';
import { BiCog, BiLogOut, BiUser } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const ProfileIcon = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const { data: session, status } = useSession();

    const userName = session?.user?.name || 'Admin';
    const userEmail = session?.user?.email || 'admin@example.com';
    const userImage = session?.user?.image || null;
    const userInitial = userName.charAt(0).toUpperCase();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/client/register');
        }
    }, [status, session]);


    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        signOut();
    };
    return (
        <>
            <Tooltip title="Profile menu">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    {userImage ? (
                        <Avatar src={userImage} alt={userName} />
                    ) : (
                        <Avatar sx={{ backgroundColor: '#635bff', color: '#FFFFFF' }}>{userInitial}</Avatar>
                    )}
                </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: { mt: 1.5, width: 250 },
                }}
            >
                {/* User Info */}
                <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userEmail}
                    </Typography>
                </Box>
                <Divider />
                {/* Menu Items */}
                <Tooltip title="ยังไม่มีหน้า profile สำหรับ admin นะน้าบ">
                    <MenuItem onClick={handleMenuClose}>
                        <BiUser style={{ marginRight: 8 }} />
                        Profile
                    </MenuItem>
                </Tooltip>
                <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
                    <BiLogOut style={{ marginRight: 8 }} />
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileIcon