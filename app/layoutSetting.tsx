'use client'
import React from 'react'
import Navbar from "@/components/section/navbar";
import { usePathname } from "next/navigation";
import { CssBaseline } from '@mui/material';
import Footer from '@/components/section/footer';
import { ThemeProvider } from '@emotion/react';
import theme from '@/lib/theme';

const LayoutSetting = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <>
            <ThemeProvider theme={theme}>
                {/* Reset Css Base */}
                <CssBaseline />
                {/* If we are on a path that starts with /admin, do not display the navbar and footer components */}
                {!pathname.startsWith('/arc/admin') && <Navbar />}
                {children}
                {!pathname.startsWith('/arc/admin') && <Footer />}
            </ThemeProvider>
        </>
    )
}

export default LayoutSetting;