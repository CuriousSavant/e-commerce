'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Avatar } from '@mui/material';
import { BiBox, BiCategory, BiCog, BiHome, BiMenu, BiShoppingBag, BiStore } from 'react-icons/bi';
import { RiAdminLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import Link from 'next/link';
import { useMediaQuery, Theme } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import ProfileIcon from './profileIcon';
import { GoSignOut } from 'react-icons/go'

const SidebarMenu: React.FC = () => {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
    const { data: session, data } = useSession();

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { href: '/arc/admin', label: 'Overview', icon: <BiHome size={24} /> },
        { href: '/arc/admin/customers', label: 'Customers', icon: <HiOutlineUserGroup size={24} /> },
        { href: '/arc/admin/products', label: 'Products', icon: <BiBox size={24} /> },
        { href: '/arc/admin/orders', label: 'Orders', icon: <BiShoppingBag size={24} /> },
        { href: '/arc/admin/categorys', label: 'Category', icon: <BiCategory size={24} /> },
        { href: '/arc/admin/admin-user', label: 'Admin', icon: <RiAdminLine size={24} /> },
            { label: 'LogOut', icon: <GoSignOut size={24} />, action: () => signOut({ callbackUrl: "/" }) },
    ];

    const linkStyles = (path: string) => ({
        backgroundColor: pathname === path ? '#635bff' : 'transparent',
        color: '#FFFFFF',
        borderRadius: '8px',
        padding: '6px 16px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    });

    const drawerContent = (
        <>
            <Box
                component={Link}
                href="/arc/admin"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    color: '#FFFFFF',
                    cursor: 'pointer',
                }}
            >
                <BiStore size={24} />
                <Typography variant="h6" color="inherit">Ecommerce Admin</Typography>
            </Box>
            <List sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton component="a" href={item.href} style={linkStyles(item.href || "#")}>
                            <ListItemIcon>
                                {React.cloneElement(item.icon, {
                                    style: { color: pathname === item.href ? '#FFFFFF' : '#B0BEC5' },
                                })}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <>
            {isMdUp ? (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 280,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 280,
                            boxSizing: 'border-box',
                            padding: 2,
                            backgroundColor: '#121212',
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 1,
                            boxShadow: "md",
                            border: "1px solid #ddd",
                        }}
                    >
                        <IconButton onClick={toggleDrawer} color="inherit">
                            <BiMenu size={24} />
                        </IconButton>
                        <Box>
                            <ProfileIcon />
                        </Box>
                    </Box>
                    <Drawer
                        anchor="left"
                        open={mobileOpen}
                        onClose={toggleDrawer}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: 280,
                                boxSizing: 'border-box',
                                padding: 2,
                                backgroundColor: '#121212',
                            },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </>
            )}
        </>
    );
};

export default SidebarMenu;