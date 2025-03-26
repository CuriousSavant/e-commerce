'use client';
import React, { useState } from 'react';

// components
import Profile from '@/components/client/section/profile';
import AuthModel from '@/components/client/section/auth-form';
import { AppBar, Toolbar, Typography, IconButton, Box, Dialog, DialogContent, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import SearchBox from '../navbar/search/search-box';
import SearchBar from '../navbar/search/search-bar';
import ShoppingCart from '../navbar/shopping-cart';
import LoginRegisterBottom from '../navbar/button/login-register-bottom';

// icon
import { HiMenu, HiOutlineHome, HiOutlineSearch, HiOutlineUserGroup } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { RiContactsLine, RiFileList3Line } from 'react-icons/ri';

// customers hooks
import useDialog from "@/context/DialogContext";
import { useSession } from 'next-auth/react';
import NavbarMenu from '../navbar/navbar-menu';
import DrawerMenu from '../navbar/drawer-menu';

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
    const { handleDialogToggle, isDialogOpen, setIsDialogOpen } = useDialog();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

    const { status } = useSession();
    const isMd = useMediaQuery('(min-width: 900px)')

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar elevation={0} position="fixed" sx={{ zIndex: 1201, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
                <Toolbar sx={{ height: { xs: 60, md: 80 }, display: "flex", justifyContent: "space-between", px: { xs: 2, md: 6 } }}>
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
                        }}>
                        จูเนียร์ ช็อป
                    </Typography>

                    {/* แสดงหน้าหลัก, เกี่ยวกับเรา, ติดต่อ */}
                    <NavbarMenu LinkInfo={LinkInfo} />

                    {/* แสดงหน้าค้นหาในขนาดเล็ก */}
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
                        <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={() => toggleDrawer(!drawerOpen)}>
                            <HiMenu className="text-[26px] md:text-[28px]" />
                        </IconButton>
                    </Box>

                    {/* ปุ่ม cart สำหรับขนาดเล็ก */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
                        {status === "authenticated" && <ShoppingCart />}
                        {status === "authenticated" && <Profile />}

                        {/* ถ้ายังไม่ได้ให้แสดงปุ่ม login */}
                        {status !== "authenticated" && (
                            <LoginRegisterBottom handleDialogToggle={handleDialogToggle} />
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* แสดงหน้ามุมมองในขนาดเล็ก */}
            <DrawerMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} LinkInfo={LinkInfo} status={status} handleDialogToggle={handleDialogToggle} />
        </>
    );
};

export default Navbar;