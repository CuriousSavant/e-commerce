import { Grid, TextField } from "@mui/material";
import React from "react";
import { Address } from "@/types/address";

type AddressFormProps = {
  addressForm: Address;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const addressFields = [
  { label: "ชื่อผู้รับ", name: "fullName" },
  { label: "หมายเลขโทรศัพท์", name: "phone" },
  { label: "ที่อยู่", name: "address", multiline: true },
  { label: "แขวง/ตำบล", name: "subDistrict" },
  { label: "อำเภอ/เขต", name: "district" },
  { label: "จังหวัด", name: "province" },
  { label: "รหัสไปรษณีย์", name: "postalCode" },
];

const AddressForm: React.FC<AddressFormProps> = ({ addressForm, handleChange }) => {
  return (
    <Grid container spacing={2} mt={1}>
      {addressFields.map((field) => (
        <Grid item xs={12} key={field.name}>
          <TextField
            fullWidth
            label={field.label}
            variant="outlined"
            size="small"
            type="text"
            name={field.name}
            value={addressForm[field.name as keyof Address]}
            multiline={field.multiline || false}
            minRows={field.multiline ? 3 : 1}
            InputLabelProps={{ style: { color: "#C0C0C0" } }}
            sx={{
              bgcolor: "#27293D",
              borderRadius: "8px",
              input: { color: "white" },
              "& .MuiInputBase-root": { color: "white" },
            }}
            onChange={handleChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AddressForm;