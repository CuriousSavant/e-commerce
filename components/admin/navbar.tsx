'use client'
import { Avatar, Box } from "@mui/material";
import { useSession } from "next-auth/react";

export default function NavbarAdmin() {
    const { data } = useSession();

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ textTransform: "uppercase", fontWeight: 800 }}>
                    dashboard
                </Box>
                {/* Profile */}
                <Box>
                    <Avatar>{data?.user.name?.at(0)}</Avatar>
                </Box>
            </Box>
        </>
    )
}