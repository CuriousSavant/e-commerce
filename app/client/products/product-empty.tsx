import { Typography } from "@mui/material";

export default function ProductEmpty() {
    return (
        <div className="text-center text-gray-500 py-4 min-h-screen flex justify-center items-center">
            <Typography variant='h6'>ไม่พบสินค้าที่ตรงกับคำค้นหา</Typography>
        </div>
    )
}
