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
                    {/* If we are on a path that starts with /admin, do not display the navbar and footer components */}
                    {!pathname.startsWith('/admin') && <Navbar />}
                    {children}
                    {!pathname.startsWith('/admin') && <Footer />}
                </SearchProvider>
            </ThemeProvider>
        </>
    )
}

export default LayoutSetting;