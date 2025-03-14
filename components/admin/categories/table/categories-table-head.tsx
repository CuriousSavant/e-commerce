import { TableCell, TableHead, TableRow } from "@mui/material";

export default function CategoriesTableHead() {
    return (
        <TableHead>
            <TableRow>
                {['หมายเลขหมวดหมู่', 'ชื่อหมวดหมู่', 'หมวดหมู่ย่อย', 'สถานะ', 'การจัดการ'].map((lable, index) => (
                    <TableCell key={index} size='small' sx={{ color: "white", borderBottom: "1px solid #50575E", px: 3 }}>{lable}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}