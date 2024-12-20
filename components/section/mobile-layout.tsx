import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react'
import { BsHeart } from 'react-icons/bs';
import { FiMapPin, FiShield, FiUser } from 'react-icons/fi';
import { MdArrowForwardIos } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';

const MobileLayout = () => {
    const menuItems = [
        { label: 'ข้อมูลส่วนตัว', icon: <FiUser />, href: '/client/profile/overview' },
        { label: 'จัดการข้อมูลส่วนตัว', icon: <FiShield />, href: '/client/profile/account-information' },
        { label: 'จัดการที่อยู่จัดส่ง', icon: <FiMapPin />, href: '/client/profile/shipping-address' },
        { label: 'คำสั่งชื้อ', icon: <RiFileList3Line />, href: '/client/profile/order-summary' },
        { label: 'รายการโปรด', icon: <BsHeart />, href: '/client/profile/wishlist' },
    ];

    return (
        <>
            {menuItems.map((link) => (
                <Link href={link.href} key={link.href}>
                    <Divider variant='fullWidth' />
                    <List sx={{ p: 0 }}>
                        <ListItemButton sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <ListItemIcon sx={{ minWidth: "24px" }}>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText>{link.label}</ListItemText>
                            <ListItemIcon sx={{ minWidth: "24px" }}>
                                <MdArrowForwardIos />
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Link>
            ))
            }
        </>
    )
}

export default MobileLayout;