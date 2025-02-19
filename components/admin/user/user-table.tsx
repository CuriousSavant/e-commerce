"use client"
import { Table, TableContainer, TableBody, Paper, Typography, TableCell, TableRow } from "@mui/material";
import UsersTableHead from "./table/user-table-head";
import UsersTableRow from "./table/user-table-row";
import React from "react";
import { User } from "@/types/user";
import { Address } from "@/types/address";

export type TUsersTable = {
    userList: User[];
    loading?: boolean;
    startEditing: (user: User, address?: Address) => void;
}

const UsersTable: React.FC<TUsersTable> = ({
    userList,
    loading,
    startEditing,
}) => {
    return (
        <TableContainer component={Paper} sx={{ bgcolor: "secondary.dark", borderRadius: "6px" }}>
            <Table>
                <UsersTableHead />
                <TableBody>
                    {loading
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <UsersTableRow key={i} loading startEditing={startEditing} />
                        ))
                        : userList.length > 0 ? userList?.map((user) => (
                            <UsersTableRow key={user.id}
                                user={user as User}
                                startEditing={startEditing}
                            />
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