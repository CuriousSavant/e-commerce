"use client"

import { User } from "@/types/user";
import { Box, Typography, Avatar, Skeleton } from "@mui/material";
import { FC } from "react";

type IAvatarUser = {
    user?: User
    loading?: boolean
}

const AvatarUser: FC<IAvatarUser> = ({ user, loading }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: "70px" }}>

            {/* โปรไฟล์ผู้ใช้ */}
            {loading ? (
                <Skeleton variant="circular" width={70} height={70} sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />
            ) : (
                <>
                    <Avatar
                        alt={user!!.firstname}
                        src={user!!.image}
                        sx={{
                            width: 70,
                            height: 70,
                            bgcolor: "#BABABABA",
                            border: "none",
                        }}
                    >
                        <Typography variant="h6" fontSize={20} color="white">{user!!.firstname?.at(0)}</Typography>
                    </Avatar>
                </>
            )}

            {/* ชื่อผู้ใช้ */}
            {loading ? (
                <Skeleton width={70} height={20} sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.12)" }} />
            ) : (
                <Typography
                    align="center"
                    color="white"
                    fontSize={12}
                    mt={1}
                    sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "70px",
                    }}
                >
                    {`${user?.firstname} ${user?.lastname ? user?.lastname : ""}`}
                </Typography>
            )}
        </Box>
    )
}

export default AvatarUser;