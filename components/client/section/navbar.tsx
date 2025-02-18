'use client';
import React, { useState } from 'react';

// components
import Profile from './profile';
import AuthModel from '@/components/client/section/auth-form';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Link as MuiLink, Dialog, DialogContent, Drawer, List, ListItem, ListItemButton, ListItemText, Avatar, Divider, ListItemIcon, TextField, InputAdornment, useMediaQuery, Backdrop, FormControl, Tooltip, Badge } from '@mui/material';
import NextLink from 'next/link';
import SearchBox from '../navbar/search-box';
import SearchBar from '../navbar/search-bar';
import ShoppingCart from '../navbar/shopping-cart';
import LoginRegisterBottom from '../navbar/login-register-bottom';

// icon
import { HiMenu, HiOutlineHome, HiOutlineSearch, HiOutlineUserGroup } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { RiContactsLine, RiFileList3Line } from 'react-icons/ri';

// customers hooks
import useDialog from '@/hooks/useDialog';
import { signOut, useSession } from 'next-auth/react';

const LinkInfo = [
    { title: "หน้าแรก", href: "/", icon: <HiOutlineHome />, color: "#1976d2" },
    { title: "สินค้า", href: "/client/products", icon: <BsGrid3X3Gap />, color: "#1976d2" },
    { title: "เกี่ยวกับเรา", href: "/client/about", icon: <HiOutlineUserGroup />, color: "#1976d2" },
    { title: "ติดต่อ", href: "/client/contact", icon: <RiContactsLine />, color: "#1976d2" },
    { divider: true },
    { title: "คำสั่งซื้อ", href: "/client/profile/order-summary", icon: <RiFileList3Line />, color: "#1976d2", authRequired: true },
    { title: "ออกจากระบบ", href: "#", icon: <BiLogOut />, color: "#1976d2", action: "logout", authRequired: true },
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

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

    const { data: session, status } = useSession();
    const isMd = useMediaQuery('(min-width: 900px)')

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    console.log(isDialogOpen)

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
                }}>
                <Toolbar
                    sx={{
                        height: { xs: 60, md: 80 },
                        display: "flex",
                        justifyContent: "space-between",
                        px: { xs: 2, md: 6 },
                    }}
                >
                    {/* Logo Website */}
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
                            whiteSpace: "pre",
                            mr: 4,
                        }}
                    >
                        จูเนียร์ ช็อป
                    </Typography>

                    {/* Menu Home, About... */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            flexGrow: 1,
                            gap: 2,
                        }}>
                        {LinkInfo.map((link, index) =>
                            link.title === "ออกจากระบบ" || link.title === "คำสั่งซื้อ" ? null : (
                                <MuiLink
                                    key={index}
                                    component={Button}
                                    // href={link.href || "#"}
                                    onClick={() => setIsDialogOpen(!isDialogOpen)}
                                    sx={{
                                        textDecoration: "none",
                                        color: "gray",
                                        fontSize: { md: "16px", lg: "1rem" },
                                        fontWeight: "500",
                                        transition: "color 0.3s ease",
                                        "&:hover": {
                                            color: "primary.main",
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {link.title}
                                </MuiLink>
                            )
                        )}
                    </Box>

                    {/* display search interface for mobile */}
                    {isSearchOpen && <SearchBox isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />}

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                        {/* ปุ่ม search ในขนาดเล็ก */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {isMd ? (
                                <SearchBar setIsSearchOpen={setIsSearchOpen} />
                            ) : (
                                <IconButton onClick={() => setIsSearchOpen(true)}>
                                    <HiOutlineSearch size={18} />
                                </IconButton>
                            )}
                        </Box>

                        {/* ปุ่ม cart สำหรับขนาดเล็ก */}
                        {!isMd && status === 'authenticated' && <ShoppingCart size={16} />}

                        {/* ปุ่ม menu สำหรัลขนาดเล็ก */}
                        <IconButton
                            sx={{ display: { xs: "block", md: "none" } }}
                            onClick={() => toggleDrawer(!drawerOpen)}
                        >
                            <HiMenu className="text-[26px] md:text-[28px]" />
                        </IconButton>
                    </Box>

                    {/* this menu profile, cart shopping */}
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        {status === "authenticated" && <ShoppingCart />}
                        {status === "authenticated" && <Profile />}

                        {/* ถ้ายังไม่ได้ให้แสดงปุ่ม login */}
                        {status !== "authenticated" && (
                            <LoginRegisterBottom handleDialogToggle={handleDialogToggle} />
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile menu */}
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

                    <List sx={{ pt: 0 }}>
                        {status === 'authenticated' && (
                            <Button href='/client/profile/overview' sx={{ marginBottom: 1, display: "flex", justifyContent: "start", textTransform: "lowercase" }}>
                                <Box sx={{ border: '1px solid #fefefe' }}>
                                    <Avatar sx={{ bgcolor: 'primary.main' }}>{session?.user?.name?.at(0)}</Avatar>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", marginLeft: 1 }}>
                                    <Typography variant="subtitle2" fontSize={12} color="gray">สวัสดีคุณ</Typography>
                                    <Typography fontWeight={700} className='line-clamp-1'>{session?.user?.name}</Typography>
                                </Box>
                            </Button>
                        )}

                        {LinkInfo
                            .filter((link) => {
                                if (link.title === 'รถเข็น' || link.title === 'ออกจากระบบ' || link.title === 'คำสั่งซื้อ') {
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
                                            sx={{ textDecoration: "none", borderRadius: 2, }}
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
                        {/* Login Button if user not login */}
                        {status === 'unauthenticated' && <LoginRegisterBottom handleDialogToggle={handleDialogToggle} />}
                    </List>
                </Box>
            </Drawer>
            {status === 'unauthenticated' && (
                <Dialog open={isDialogOpen} onClose={handleDialogToggle} maxWidth="sm" fullWidth>
                    <DialogContent>
                        <AuthModel onClose={() => setIsDialogOpen(!isDialogOpen)} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default Navbar;