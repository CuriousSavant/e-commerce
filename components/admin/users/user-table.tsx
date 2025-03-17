import { Table, TableContainer, TableBody, Typography, TableCell, TableRow, Box } from "@mui/material";
import UsersTableHead from "./table/user-table-head";
import UsersTableRow from "./table/user-table-row";
import React from "react";
import { User } from "@/types/user";

export type TUsersTable = {
    userList: User[];
    loading?: boolean;
    startEditing: (user: User) => void;
    handleDeleteUser: (userId: number, userName: string) => void;
}

const UsersTable: React.FC<TUsersTable> = ({
    userList,
    loading,
    startEditing,
    handleDeleteUser,
}) => {
    return (
        <TableContainer
            sx={{
                bgcolor: "secondary.dark",
                borderRadius: "6px",
                overflowX: "auto",
                width: "100%",
                display: "block",
                maxWidth: "100%",
            }}>
            <Table>
                <UsersTableHead />
                <TableBody>
                    {loading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <UsersTableRow key={i} {...{ handleDeleteUser, startEditing, loading }} />
                        ))
                    ) : (
                        <>
                            {userList.length > 0 ? (
                                userList.map(user => (
                                    <UsersTableRow key={user.id} {...{ handleDeleteUser, startEditing, loading, user, newUsr: false }} />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} sx={{ borderBottom: 0, height: 160 }}>
                                        <Typography color="white" align="center" fontSize={20}>ไม่พบผลลัพธ์</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;