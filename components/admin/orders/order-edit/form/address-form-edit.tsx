import { Address } from "@/types/address";
import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react";

interface FormUserAddressProps {
    addressFields: { label: string, name: string, multiline?: boolean, rows?: number }[];
    addressInfo: Address;
    addressErrors: { [key: string]: string };
    handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressFormEdit: React.FC<FormUserAddressProps> = ({
    addressFields, addressInfo, handleAddressChange,
    addressErrors,
}) => {
    return (
        <Box mb={2}>
            <Typography sx={{ color: "#ffff" }} variant="h6">ข้อมูลที่อยู่</Typography>
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
        </Box>
    )
}

export default AddressFormEdit;