'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { List, ListItemText, ListItemButton, ListItemIcon, Typography } from "@mui/material";
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
    ]

    const linkStyles = (path: string) => {
        return ({
            borderLeft: "4px solid",
            borderLeftColor: pathname === path ? '#635bff' : 'transparent',
            color: pathname === path ? '#635bff' : '#C2C7D0',
            borderRadius: 0,
            transition: 'background-color 0.3s ease, color 0.3s ease',
        })
    };

    return (
        <aside className='w-[260px] bg-["#27293D"] p-4 fixed top-16 h-screen border-r border-[#4A4A4A]'>
            <List>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        href={item.href}
                        style={linkStyles(item.href)}
                        sx={{ mb: 1 }}
                    >
                        <ListItemIcon sx={{ color: pathname === item.href ? "primary.main" : "#C2C7D0", minWidth: "38px" }}>
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