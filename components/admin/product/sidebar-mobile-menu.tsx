import { IconButton } from '@mui/material';
import { IoIosMenu } from 'react-icons/io'
import React from 'react'
import { BiBox, BiCategory, BiCog, BiHome, BiShoppingBag } from 'react-icons/bi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiAdminLine } from 'react-icons/ri';

const SidebarMobileMenu = () => {
    const menuItems = [
        { href: '/arc/admin', label: 'Overview', icon: <BiHome size={24} /> },
        { href: '/arc/admin/customers', label: 'Customers', icon: <HiOutlineUserGroup size={24} /> },
        { href: '/arc/admin/products', label: 'Products', icon: <BiBox size={24} /> },
        { href: '/arc/admin/orders', label: 'Orders', icon: <BiShoppingBag size={24} /> },
        { href: '/arc/admin/categorys', label: 'Category', icon: <BiCategory size={24} /> },
        { href: '/arc/admin/admin-user', label: 'Admin', icon: <RiAdminLine size={24} /> },
        { href: '/arc/admin/settings', label: 'Settings', icon: <BiCog size={24} /> },
    ];

    return (
        <nav className='h-24 block md:hidden'>
            <div className='flex justify-between items-center'>
                <div>
                    <IconButton>
                        <IoIosMenu />
                    </IconButton>
                </div>
                <div>

                </div>
            </div>
        </nav>
    )
}

export default SidebarMobileMenu;
