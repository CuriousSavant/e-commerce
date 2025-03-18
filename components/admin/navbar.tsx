'use client'
import { Avatar, Box, IconButton } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from 'next/link'
import { Menu } from "@mui/icons-material";
import React from "react";

export default function NavbarAdmin({
    setOpenDrawer,
    openDrawer
}: { openDrawer: boolean, setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { data } = useSession();

    return (
        <>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "primary.dark",
                position: "sticky",
                top: 0,
                borderBottom: "1px solid #4A4A4A",
                zIndex: 1000,
                px: { xs: 2, md: 0 }
            }}>
                <Box sx={{ display: { xs: "none", md: "flex" }, textTransform: "uppercase", fontWeight: 800, fontSize: "1.5rem", color: "white", p: 2, px: 2 }}>
                    <Link href="/admin">Admin Panel</Link>
                </Box>
                <Box display={{ xs: "flex", md: "none" }}>
                    <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                        <Menu sx={{ color: "white" }} />
                    </IconButton>
                </Box>

                {/* Profile */}
                <Box sx={{ display: "flex", alignItems: "center", p: { xs: 1.3, md: 2 }, px: { xs: 0, md: 4 } }}>
                    <Avatar sx={{ bgcolor: "secondary.dark" }}>{data?.user.name?.at(0)}</Avatar>
                    <Box sx={{ display: "flex", flexDirection: "column", ml: { xs: 1, md: 2 }, }}>
                        <Box sx={{ color: "white", fontSize: 14, fontWeight: "600", width: "100px" }} className="line-clamp-1">
                            {data?.user.name}
                        </Box>
                        <Box sx={{ color: "white", fontSize: 12 }}>{data?.user.role}</Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}