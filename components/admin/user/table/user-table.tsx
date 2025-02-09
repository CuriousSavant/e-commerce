import { Table, TableContainer, TableBody, Paper } from "@mui/material";
import UsersTableHead from "./user-table-head";
import UsersTableRow from "./user-table-row";
import React from "react";
import { TUsersTable } from "@/types/userTableRowType";

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
                        : users?.map((user) => (
                            <UsersTableRow key={user.id} user={user} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
