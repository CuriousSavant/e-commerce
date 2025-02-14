"use client"

import { User } from "@/types/user";
import { Box, Card, CardContent, Typography, Button, Avatar, AvatarGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AvatarUser from "./users/AvatarUser";

export default function LatestUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            await axios.get('/api/user').then((res) => {
                setUsers(res.data.slice(0, 8));
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Card sx={{ backgroundColor: "secondary.dark", flex: 1, pb: 0, minHeight: "180px" }}>
            <CardContent sx={{ p: 0, height: "100%" }}>

                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2} mb={2} borderBottom={"1px solid #50575E"}>
                    <Typography variant="h6" color="white">สมาชิกใหม่ล่าสุด</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            textTransform: "none",
                            bgcolor: "secondary.main"
                        }}
                        href="/admin/users"
                    >View All Users</Button>
                </Box>

                {/* Table */}
                <Box display="flex" justifyContent={"center"} alignItems="center" px={1} height={"100%"} flexWrap={"wrap"} gap={2}>
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => <AvatarUser key={index} loading={true} />)
                    ) : (
                        users.length > 0 ? (
                            users.map((user, index) => (
                                <AvatarUser user={user} loading={loading} key={index} />
                            ))
                        ) : (
                            <Box display={"flex"} justifyContent={"center"} height={"100%"} width={"100%"} alignItems={"center"}>
                                <Typography color="white">ยังไม่มีสมาชิกมาใหม่วันนี้</Typography>
                            </Box>
                        ))}
                </Box>

            </CardContent>
        </Card>
    )
}