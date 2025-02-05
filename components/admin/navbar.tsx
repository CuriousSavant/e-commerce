'use client'
import { Avatar, Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function NavbarAdmin() {
    const { data } = useSession();

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "primary.dark", position: "sticky", top: 0, zIndex: 1000 }}>
                <Box sx={{ textTransform: "uppercase", fontWeight: 800, fontSize: "1.5rem", color: "white", p: 2, px: 4 }}>
                    dashboard
                </Box>
                {/* Profile */}
                <Box sx={{ display: "flex", alignItems: "center", p: 2, px: 4 }}>
                    <Avatar>{data?.user.name?.at(0)}</Avatar>
                </Box>
            </Box>
        </>
    )
}