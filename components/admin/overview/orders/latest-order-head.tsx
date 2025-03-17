"use client"
import { TableCell, TableHead, TableRow } from "@mui/material"

const LatestOrderHeader = () => {
    return (
        <TableHead>
            <TableRow>
                {['หมายเลขคำสั่งซื้อ', 'ผู้สั่งซื้อ','สั่งซื้อเมื่อ', 'สถานะ', 'ยอด'].map((label, key) => (
                    <TableCell key={key} sx={{ color: "white", borderBottom: "1px solid #50575E", px: 2, whiteSpace: "pre" }}>{label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default LatestOrderHeader;