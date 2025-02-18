"use client"

import { TableHead, TableRow, TableCell } from "@mui/material";

const UsersTableHead = () => {
    return (
        <TableHead>
            <TableRow sx={{ bgcolor: "secondary.dark" }}>
                {["หมายเลขผู้ใช้", "ผู้ใช้", "หมายเลขโทรศัพท์", "เข้าสู่ระบบเมื่อ", "คำสั่งซื้อ", "บทบาท", "การจัดการ"].map((col) => (
                    <TableCell key={col} sx={{ color: "white", fontWeight: "bold", px: 3, py: 2, borderBottom: "1px solid #50575E" }}>
                        {col}   
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default UsersTableHead;