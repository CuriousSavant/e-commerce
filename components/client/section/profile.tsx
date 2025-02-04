'use client'

import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { MdLogout, MdPersonOutline } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';
import { BiHeart } from 'react-icons/bi';

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const { data: session } = useSession();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (path: string) => {
        router.push(path);
        handleCloseMenu();
    };

    const menuItems = [
        { label: "บัญชีของฉัน", icon: <MdPersonOutline className="text-lg mr-1.5" />, action: () => handleMenuClick('/client/profile/overview') },
        { label: "รายการโปรด", icon: <BiHeart className="text-lg mr-1.5" />, action: () => handleMenuClick('/client/profile/wishlist') },
        { label: "คำสั่งชื้อของฉัน", icon: <RiFileList3Line className="text-lg mr-1.5" />, action: () => handleMenuClick("/client/profile/order-summary") },
        { label: "ออกจากระบบ", icon: <MdLogout className="text-lg mr-1.5 text-red-500" />, action: () => signOut({ callbackUrl: "/" }), color: "error" },
    ];

    let profileName = session?.user?.name?.at(0)

    return (
        <>
            <IconButton onClick={handleOpenMenu} size='small' sx={{ height: 40 }}>
                <Avatar sx={{ bgcolor: '#4B5563' }}>{profileName ? profileName : '?'}</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                PaperProps={{
                    sx: { mt: 1.5, minWidth: 200 }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={item.action}
                        sx={{ display: "flex", color: item.color || "black" }}
                    >
                        {item.icon}
                        <Typography textAlign="center" color={item.color || "inherit"}>
                            {item.label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ProfileMenu;