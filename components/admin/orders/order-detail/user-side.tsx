import { Order } from "@/types/order";
import { Card, CardContent, Typography, Avatar, Box, Stack } from "@mui/material";
import React from "react";

const UserSide = ({ order }: { order?: Order }) => {
    return (
        <Card sx={{ backgroundColor: "#27293d", width: { xs: "100%", md: 350 }, p: 2 }}>
            <Box sx={{ borderBottom: "1px solid #50575E", display: "flex", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "#ffff" }}>
                    ข้อมูลผู้ใช้
                </Typography>
            </Box>
            <CardContent sx={{ p: 1.5, px: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 56, height: 56 }}>{order?.user.firstname[0]}</Avatar>
                    <Box>
                        <Typography variant="body1" fontWeight={600} sx={{ color: "#ffff" }}>{order?.user.firstname} {order?.user.lastname}</Typography>
                        <Typography variant="body2" sx={{ color: "#c3c3c3" }}>{order?.user.email}</Typography>
                    </Box>
                </Stack>

                <Typography variant="h6" fontWeight={600} mt={6} sx={{ color: "#ffff" }}>ข้อมูลการจัดส่ง</Typography>
                <Box display={'flex'} justifyContent={'space-between'} gap={10} mt={2}>
                    <Typography variant="body2" sx={{ color: "#c3c3c3" }}>ที่อยู่จัดส่ง:</Typography>
                    <Typography variant="body2" sx={{ color: "#ffff" }}>
                        {order?.address?.address || "-"}
                    </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={1}>
                    <Typography variant="body2" sx={{ color: "#c3c3c3" }}>หมายเลขโทรศัพท์:</Typography>
                    <Typography variant="body2" sx={{ color: "#ffff" }}>{order?.address?.phone || "-"}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={1}>
                    <Typography variant="body2" sx={{ color: "#c3c3c3" }}>ภาษีมูลค่าเพิ่ม:</Typography>
                    <Typography variant="body2" sx={{ color: "#ffff" }}>-</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={1}>
                    <Typography variant="body2" sx={{ color: "#c3c3c3" }}>การชำระเงิน:</Typography>
                    <Typography variant="body2" sx={{ color: "#ffff" }}>จัดส่งแบบปลายทาง</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserSide;