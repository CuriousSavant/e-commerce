'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { List, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { ShoppingCart, Person, Inventory, AdminPanelSettings, Category, Storefront, Dashboard } from "@mui/icons-material";

const SidebarMenu: React.FC = () => {
    const pathname = usePathname();

    const menuItems = [
        { text: "Overview", icon: <Dashboard />, href: "/admin" },
        { text: "Users", icon: <Person />, href: "/admin/users" },
        { text: "Products", icon: <Inventory />, href: "/admin/products" },
        { text: "Categories", icon: <Category />, href: "/admin/categories" },
        { text: "Brands", icon: <Storefront />, href: "/admin/brands" },
        { text: "Orders", icon: <ShoppingCart />, href: "/admin/orders" },
        { text: "Admin", icon: <AdminPanelSettings />, href: "/admin/admins" },
    ]

    return (
        <aside className='w-[250px] bg-["#27293D"] p-4 sticky top-0 h-screen border-r border-[#4A4A4A]'>
            <List>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        href={item.href}
                        sx={{
                            color: "#C2C7D0",
                            "&:hover": {
                                backgroundColor: "blue.600",
                                color: "#FFFFFF",
                                "& .MuiSvgIcon-root": {
                                    color: "#FFFFFF",
                                },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "#C2C7D0" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </aside>
    )
};

export default SidebarMenu;