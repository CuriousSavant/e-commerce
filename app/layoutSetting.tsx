'use client'
import React from 'react'
import Navbar from '@/components/client/home/navbar';
import { usePathname } from "next/navigation";
import { CssBaseline } from '@mui/material';
import Footer from '@/components/client/home/footer';
import { ThemeProvider } from '@emotion/react';
import theme from '@/lib/theme';
import { SearchProvider } from './context/ProductSearchContext';
import { PaginationProvider } from './context/PaginationContext';

const LayoutSetting = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <>
            <ThemeProvider theme={theme}>
                <PaginationProvider>
                    <SearchProvider>
                        {/* Reset Css Base */}
                        <CssBaseline />
                        {/* เมื่ออยู่ใน path /admin/* จะไม่แสดง components พวกนนี้ */}
                        {!pathname.startsWith('/admin') && <Navbar />}
                        {children}
                        {!pathname.startsWith('/admin') && <Footer />}
                    </SearchProvider>
                </PaginationProvider>
            </ThemeProvider>
        </>
    )
}

export default LayoutSetting;