import { TableCell, TableHead, TableRow } from "@mui/material"

const LatestOrderHeader = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>หมายเลขคำสั่งซื้อ</TableCell>
                <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>เวลา</TableCell>
                <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>สถานะ</TableCell>
                <TableCell sx={{ color: "white", borderBottom: "1px solid #50575E" }}>ยอดรวม</TableCell>
            </TableRow>
        </TableHead>
    )
}

export default LatestOrderHeader;