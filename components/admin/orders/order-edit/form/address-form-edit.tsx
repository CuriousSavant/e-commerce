import { Box, Button, TextField, Typography } from "@mui/material"
import { AddressInfo } from "../../order-edit";
import React from "react";

interface FormUserAddressProps {
    addressFields: { label: string, name: string, multiline?: boolean, rows?: number }[];
    addressInfo: AddressInfo;
    openAddressDialog: boolean
    addressErrors: { [key: string]: string };
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setOpenAddressDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressFormEdit: React.FC<FormUserAddressProps> = ({
    addressFields, addressInfo, handleAddressChange,
    openAddressDialog, setOpenAddressDialog, addressErrors,
}) => {
    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                <Typography sx={{ color: "#ffff" }} variant="h6">ข้อมูลที่อยู่</Typography>
                <Button size="small" variant="text" onClick={() => setOpenAddressDialog(!openAddressDialog)}>เปลี่ยนที่อยู่</Button>
            </Box>
            {addressFields.map((field, index) => (
                <TextField
                    key={index}
                    label={field.label}
                    name={field.name}
                    value={addressInfo[field.name as keyof AddressInfo]}
                    onChange={handleAddressChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                    InputLabelProps={{ style: { color: "#C0C0C0" }, shrink: Boolean(addressInfo[field.name as keyof AddressInfo]) }}
                    sx={{ bgcolor: "secondary.dark", borderRadius: 2, mb: 2, border: "1px solid #4a4a5c", input: { color: "white" }, textarea: { color: "white" } }}
                    error={!!addressErrors[field.name]}
                    helperText={addressErrors[field.name]} // แสดงข้อความ error
                />
            ))}
        </>
    )
}

export default AddressFormEdit;