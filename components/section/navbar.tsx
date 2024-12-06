'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Link as MuiLink, Dialog, DialogContent, Drawer, List, ListItem, ListItemButton, ListItemText, Avatar, Divider, ListItemIcon } from '@mui/material';
import { FaCartShopping } from 'react-icons/fa6';
import { BiLogOut } from 'react-icons/bi';
import { HiMenu, HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

import Profile from './profile';
import NextLink from 'next/link';
import AuthModel from '@/components/auth-form';
import useDialog from '@/hooks/useDialog';
import { signOut, useSession } from 'next-auth/react';
import { BsCart, BsGrid3X3Gap } from 'react-icons/bs';
import { RiContactsLine } from 'react-icons/ri';

const LinkInfo = [
    { title: "หน้าแรก", href: "/", icon: <HiOutlineHome />, color: "#1976d2" },
    { title: "สินค้า", href: "/client/products", icon: <BsGrid3X3Gap />, color: "#1976d2" },
    { title: "เกี่ยวกับเรา", href: "/client/about", icon: <HiOutlineUserGroup />, color: "#1976d2" },
    { title: "ติดต่อ", href: "/client/contact", icon: <RiContactsLine />, color: "#1976d2" },
    { divider: true },
    { title: "รถเข็น", href: "/client/cart", icon: <BsCart />, color: "#1976d2", authRequired: true },
    { title: "ออกจากระบบ", href: "#", icon: <BiLogOut />, color: "red", action: "logout", authRequired: true },
]

const Navbar = () => {
    const {
        handleDialogToggle,
        isDialogOpen,
        isHover,
        isScrolled,
        setIsDialogOpen,
        setIsHover,
    } = useDialog();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const { data: session, status } = useSession();

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar
                position="fixed"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                sx={{
                    zIndex: 1201,
                    bgcolor: "white",
                    boxShadow: isScrolled || isHover ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                }}
            >
                <Toolbar
                    sx={{
                        height: 80,
                        display: "flex",
                        justifyContent: "space-between",
                        px: { xs: 2, md: 6 },
                    }}
                >
                    <Typography
                        variant="h6"
                        component={NextLink}
                        href="/"
                        sx={{
                            textDecoration: "none",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: { xs: "20px", md: "30px" },
                            fontStyle: "italic",
                            lineHeight: 1.4,
                            display: "flex",
                            flexWrap: "wrap",
                            width: { xs: "160px", md: "180px" }
                        }}
                    >
                        จูเนียร์ ช็อป
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            flexGrow: 1,
                            justifyContent: "flex-end",
                            gap: 2,
                            width: "100%",
                        }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}>
                            {LinkInfo.map((link, index) => (link.title === 'ออกจากระบบ' || link.title == 'รถเข็น') ? null : (
                                <MuiLink
                                    key={index}
                                    component={NextLink}
                                    href={link.href || "#"}
                                    sx={{
                                        textDecoration: "none",
                                        color: "black",
                                        fontSize: { md: "16px", lg: "1rem" },
                                        fontWeight: "500",
                                        transition: "color 0.3s ease",
                                        "&:hover": {
                                            color: isScrolled || isHover ? "primary.main" : "#A5A5A5",
                                            textDecoration: "underline",
                                        },
                                        alignItems: "center",
                                    }}>
                                    {link.title}
                                </MuiLink>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {status === 'authenticated' && <ShoppingCart />}
                            {status === 'authenticated' && <Profile />}
                        </Box>
                    </Box>

                    <IconButton
                        sx={{ display: { xs: "block", md: "none" } }}
                        onClick={() => toggleDrawer(!drawerOpen)}
                    >
                        <HiMenu className='text-[22px] md:text-[28px]' />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
            >
                <Box
                    sx={{
                        width: 250,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <IconButton
                        onClick={() => toggleDrawer(false)}
                        sx={{ alignSelf: "flex-end" }}
                    >
                        <MdClose size={24} />
                    </IconButton>

                    <List sx={{ pt: { xs: 2, md: 0 } }}>
                        {status === 'authenticated' && (
                            <Button href='/client/profile/overview' sx={{ marginBottom: 1, display: "flex", justifyContent: "start", textTransform: "lowercase" }}>
                                <Box sx={{ border: '1px solid #fefefe' }}>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>{session?.user?.name?.at(0)}</Avatar>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
                                    <Typography variant="subtitle2" fontSize={12} color="gray">สวัสดีคุณ</Typography>
                                    <Typography fontWeight={700}>{session?.user?.name}</Typography>
                                </Box>
                            </Button>
                        )}

                        {LinkInfo
                            .filter((link) => {
                                if (link.title === 'รถเข็น' || link.title === 'ออกจากระบบ') {
                                    return status === 'authenticated'
                                }
                                return true;
                            })
                            .map((link, index) => link.divider ? (
                                <Divider key={index} sx={{ marginY: 1 }} />
                            )
                                : (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton LinkComponent={link.action !== "logout" ? NextLink : undefined}
                                            href={link.href || "#"}
                                            sx={{
                                                textDecoration: "none",
                                                ":hover": { bgcolor: "" }
                                            }}
                                            onClick={() => {
                                                if (link.action === "logout") signOut({ callbackUrl: "/" });
                                                toggleDrawer(false);
                                            }}
                                        >
                                            <ListItemIcon sx={{ fontSize: 18, minWidth: "40px", color: link.color }}>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={link.title}
                                                sx={link.action === "logout" ? { color: "red", fontSize: 18 } : undefined}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                    </List>

                    {status === 'unauthenticated' && (
                        <Button
                            onClick={handleDialogToggle}
                            sx={{
                                backgroundColor: "#374151",
                                color: "white",
                                borderRadius: "30px",
                                px: 2,
                                py: 1,
                                textTransform: "none",
                            }}
                        >
                            Login / Register
                        </Button>
                    )}
                </Box>
            </Drawer>

            {
                status === 'unauthenticated' && (
                    <Dialog open={isDialogOpen} onClose={handleDialogToggle} maxWidth="sm" fullWidth>
                        <DialogContent>
                            <AuthModel onClose={() => setIsDialogOpen(!isDialogOpen)} />
                        </DialogContent>
                    </Dialog>
                )
            }
        </>
    );
};

export default Navbar;

const ShoppingCart = () => {
    return (
        <IconButton
            href="/client/cart"
            sx={{
                width: "40px",
                height: "40px",
                color: "black",
                "&:hover": {
                    backgroundColor
                        : "rgba(255, 255, 255, 0.1)",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease",
                },
            }}
        >
            <FaCartShopping size={20} />
        </IconButton>
    );
};