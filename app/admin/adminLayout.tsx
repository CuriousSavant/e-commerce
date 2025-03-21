'use client'
import SidebarMenu from '@/components/admin/sidebar';
import { Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import NavbarAdmin from '@/components/admin/navbar';
import { useState } from 'react';
import { Category, Dashboard, Inventory, Person, ShoppingCart, Storefront } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const AdminLayoutPage = ({ children }: { children: React.ReactNode }) => {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const { data: session } = useSession();

    const menuItems = [
        { label: "Overview", icon: <Dashboard sx={{ color: "white" }} />, href: "/admin" },
        { label: "Users", icon: <Person sx={{ color: "white" }} />, href: "/admin/users" },
        { label: "Products", icon: <Inventory sx={{ color: "white" }} />, href: "/admin/products" },
        { label: "Categories", icon: <Category sx={{ color: "white" }} />, href: "/admin/categories" },
        { label: "Brands", icon: <Storefront sx={{ color: "white" }} />, href: "/admin/brands" },
        { label: "Orders", icon: <ShoppingCart sx={{ color: "white" }} />, href: "/admin/orders" },
    ]

    return (
        <>
            <NavbarAdmin setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
                {openDrawer && (
                    <Box sx={{ width: 250, bgcolor: "secondary.dark", height: "100%", color: "white" }} role="application" onClick={() => setOpenDrawer(!openDrawer)}>
                        <Link href="/profile" passHref>
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                alignItems: 'center',
                                p: 2,
                                m: 1,
                                borderRadius: 2,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                    boxShadow: 2,
                                }
                            }}>
                                <Avatar sx={{ bgcolor: "secondary.main" }}>{session?.user.name?.at(0)}</Avatar>
                                <Box display={'flex'} flexDirection={'column'}>
                                    <Typography variant='body1'>{session?.user.name}</Typography>
                                    <Typography variant='body2' sx={{ color: "#c3c3c3" }}>{session?.user.email}</Typography>
                                </Box>
                            </Box>
                        </Link>
                        <List>
                            {menuItems.map((item, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton href={item.href}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Drawer>
            <Box sx={{ backgroundColor: "#1E1E2F", minHeight: "100vh", display: "flex", color: "white" }}>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <SidebarMenu />
                </Box>

                <Box sx={{ ml: { xs: 0, md: "260px" }, width: "100%", overflowX: "auto" }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default AdminLayoutPage;