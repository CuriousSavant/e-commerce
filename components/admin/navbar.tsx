'use client'
import { Avatar, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from 'next/link'

export default function NavbarAdmin() {
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
                border: "1px solid #4A4A4A",
                zIndex: 1000
            }}>
                <Box sx={{ textTransform: "uppercase", fontWeight: 800, fontSize: "1.5rem", color: "white", p: 2, px: 4 }}>
                    <Link href="/admin">Admin Panel</Link>
                </Box>
                {/* Profile */}
                <Box sx={{ display: "flex", alignItems: "center", p: 2, px: 4 }}>
                    <Avatar sx={{ bgcolor: "secondary.dark" }}>{data?.user.name?.at(0)}</Avatar>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ color: "white", ml: 2, fontSize: 14, fontWeight: "600", width: "100px" }} className="line-clamp-1">
                            {data?.user.name}
                        </Box>
                        <Box sx={{ color: "white", ml: 2, fontSize: 12 }}>{data?.user.role}</Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}