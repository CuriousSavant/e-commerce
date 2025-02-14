"use client"

import { Table, TableContainer, TableBody, Paper, Box, Typography, TableCell, TableRow } from "@mui/material";
import UsersTableHead from "./user-table-head";
import UsersTableRow from "./user-table-row";
import React from "react";
import { User } from "@prisma/client";

export type TUsersTable = {
    users: User[];
    loading?: boolean;
}

const UsersTable: React.FC<TUsersTable> = ({ users, loading }) => {
    return (
        <TableContainer component={Paper} sx={{ bgcolor: "secondary.dark", borderRadius: "6px" }}>
            <Table>
                <UsersTableHead />
                <TableBody>
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <UsersTableRow key={i} loading />
                        ))
                        : users.length > 0 ? users?.map((user) => (
                            <UsersTableRow key={user.id} user={user as any} />
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} sx={{ borderBottom: 0, height: 160 }}>
                                    <Typography color="white" align="center" fontSize={20}>ไม่พบผลลัพธ์</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;