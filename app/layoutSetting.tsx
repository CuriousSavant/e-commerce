'use client'
import React from 'react'
import Navbar from "@/components/client/section/navbar";
import { usePathname } from "next/navigation";
import { CssBaseline } from '@mui/material';
import Footer from '@/components/client/section/footer';
import { ThemeProvider } from '@emotion/react';
import theme from '@/lib/theme';
import { SearchProvider } from './context/ProductSearchContext';

const LayoutSetting = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <>
            <ThemeProvider theme={theme}>
                <SearchProvider>
                    {/* Reset Css Base */}
                    <CssBaseline />
                    {/* เมื่ออยู่ใน path /admin/* จะไม่แสดง components พวกนนี้ */}
                    {!pathname.startsWith('/admin') && <Navbar />}
                    {children}
                    {!pathname.startsWith('/admin') && <Footer />}
                </SearchProvider>
            </ThemeProvider>
        </>
    )
}

export default LayoutSetting;