import { Address } from "@/types/address";
import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react";

interface FormUserAddressProps {
    addressFields: { label: string, name: string, multiline?: boolean, rows?: number }[];
    addressInfo: Address;
    addressErrors: { [key: string]: string };
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAddress: (userId: number) => void;
}

// เจอปัญหาเพราะว่า addressInfo ไม่มี userId จึงไม่สามารถเปลี่ยนที่อยู่ได้ และเมื่อมี address และถ้า address นั้นเป็นของผู้ใช้อื่นและเมื่อต้องการเปลี่ยน address dialog ก็จะแสดง list ของ address ของผู้ใช้อื่นด้วย
// และเมื่อผู้ใช้ไม่ได้ส่ง address อันนี้จะทำอย่างไร เปลี่ยนก็ไม่ได้เพราะว่า userId ที่ดึงมามันมาจาก userId จาก AddressInfo ซึ่งมันไม่มีค่า ต้องลองค้ดใหม่ละว่าจะทำเป็ฯ error แจ้งเดือนว่าไม่สามรถเปลี่ยนที่อยู่ของผู้ใช้นี้ได้เนื่องจากผู้ใช้นี้ไม่ได้ส่ง address มาด้วย หรือ หาทางอื่นเอา

const AddressFormEdit: React.FC<FormUserAddressProps> = ({
    addressFields, addressInfo, handleAddressChange,
    addressErrors, handleChangeAddress,
}) => {
    console.log("from address form edit:",addressInfo)
    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                <Typography sx={{ color: "#ffff" }} variant="h6">ข้อมูลที่อยู่</Typography>
                <Button size="small" variant="text" onClick={() => handleChangeAddress(addressInfo.userId ?? 0)}>เปลี่ยนที่อยู่</Button>
            </Box>
            {addressFields.map((field, index) => (
                <TextField
                    key={index}
                    label={field.label}
                    name={field.name}
                    value={addressInfo[field.name as keyof Address]}
                    onChange={handleAddressChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                    InputLabelProps={{ style: { color: "#C0C0C0" }, shrink: Boolean(addressInfo[field.name as keyof Address]) }}
                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, mb: 2, border: "1px solid #4a4a5c", input: { color: "white" }, textarea: { color: "white" } }}
                    error={!!addressErrors[field.name]}
                    helperText={addressErrors[field.name]} // แสดงข้อความ error
                />
            ))}
        </>
    )
}

export default AddressFormEdit;