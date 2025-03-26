import { TableCell, TableHead, TableRow } from "@mui/material";

export default function BrandsTableHead() {
    return (
        <TableHead>
            <TableRow>
                {['หมายเลขแบรนด์', 'ชื่อแบรนด์', 'รูปภาพ', 'การจัดการ'].map((lable, index) => (
                    <TableCell key={index} size='small' sx={{ color: "white", borderBottom: "1px solid #50575E", px: 3, whiteSpace: "pre" }}>{lable}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}