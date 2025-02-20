"use client"
import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, IconButton, Skeleton, TableCell, TableRow, Typography } from "@mui/material";
import { User } from "@/types/user";
import { format } from "date-fns";
import React from "react";

export type TUsersTableRow = {
    user?: User;
    loading?: boolean;
    startEditing: (user: User) => void;
}

const UsersTableRow: React.FC<TUsersTableRow> = ({ loading, user, startEditing }) => {
    return (
        <TableRow>
            {/* User Id */}
            <TableCell sx={{ color: "white", px: 3, borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={40} /> : user?.id}
            </TableCell>

            {/* User Info */}
            <TableCell sx={{ color: "white", px: 3, borderBottom: "1px solid #50575E" }}>
                <Box display="flex" alignItems="center">
                    {loading ? (
                        <>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Box ml={1}>
                                <Skeleton width={100} />
                                <Skeleton width={140} />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Avatar sx={{ bgcolor: "#4F4F4F" }}>
                                {user?.firstname?.charAt(0)}
                            </Avatar>
                            <Box ml={1}>
                                <Typography className="w-[230px] line-clamp-1">
                                    {`${user?.firstname} ${user?.lastname ? user.lastname : ""}`}
                                </Typography>
                                <Typography sx={{ color: "#BABABA", fontSize: "12px" }}>
                                    {user?.email}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </TableCell>

            {/* Phone Number */}
            <TableCell sx={{ color: "white", px: 3, borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={80} /> : user?.phone ? user.phone : '-'}
            </TableCell>

            {/* Created At */}
            <TableCell sx={{ color: "white", px: 3, borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={120} /> : user?.createdAt ? format(user?.createdAt, 'dd/MM/yyyy HH:mm') : "-"}
            </TableCell>

            {/* Order */}
            <TableCell sx={{ color: "white", px: 3, borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={80} height={30} /> : "3"}
            </TableCell>

            {/* Role */}
            <TableCell sx={{ color: "white", px: 3, borderBottom: "1px solid #50575E" }}>
                {loading ? <Skeleton width={60} /> : user?.role}
            </TableCell>

            {/* Actions */}
            <TableCell sx={{ borderBottom: "1px solid #50575E" }}>
                {loading ? (
                    <Box display="flex">
                        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
                        <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                ) : (
                    <>
                        <IconButton size="small" onClick={() => startEditing(user as User)}>
                            <Edit sx={{ color: "#1B6AF9" }} />
                        </IconButton>
                        <IconButton size="small">
                            <Delete color="error" />
                        </IconButton>
                    </>
                )}
            </TableCell>
        </TableRow>
    )
}

export default UsersTableRow;