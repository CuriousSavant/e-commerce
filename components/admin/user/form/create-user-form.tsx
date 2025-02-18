"use client"
import { Box, Button, Collapse, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserFormStateProps } from "@/types/components/create-user-form";
import { ArrowBack, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Address } from "@/types/address";
import { FiEye, FiEyeOff } from "react-icons/fi";

type CreateUserFormProps = {
    userForm: UserFormStateProps;
    errors: { [key: string]: string };
    formOpen: boolean;
    editingId: number | null;
    addressForm: Address;

    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
    setUserForm: React.Dispatch<React.SetStateAction<UserFormStateProps>>;

    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
    handleSignUp: () => void;
}

const userFields = [
    { label: "ชื่อ", name: "firstname" },
    { label: "นามสกุล", name: "lastname" },
    { label: "อีเมล", name: "email" },
    { label: "รหัสผ่าน", name: "password", type: "password", visibility: true },
    { label: "ยืนยันรหัสผ่าน", name: "confirmPassword", type: "password" },
];

const addressFields = [
    { label: "ชื่อผู้รับ", name: "fullName" },
    { label: "หมายเลขโทรศัพท์", name: "phone" },
    { label: "ที่อยู่", name: "address", multiline: true },
    { label: "แขวง/ตำบล", name: "subDistrict" },
    { label: "อำเภอ/เขต", name: "district" },
    { label: "จังหวัด", name: "province" },
    { label: "รหัสไปรษณีย์", name: "postalCode" },
];

const CreateUserForm: React.FC<CreateUserFormProps> = ({
    formOpen,
    editingId,
    userForm,
    errors,
    addressForm,
    setFormOpen,
    handleChange,
    handleSignUp,
    setEditingId,
    setUserForm,
}) => {
    const [showAddress, setShowAddress] = useState(false);

    const Back = () => {
        setFormOpen(!formOpen);
        setEditingId(null);
        setUserForm({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: "",
        })
    }

    return (
        <Box sx={{ bgcolor: "#1E1E2F", color: "white" }}>
            <IconButton
                onClick={Back}
                sx={{ color: "white" }}
            >
                <ArrowBack />
            </IconButton>
            <Box p={3} borderRadius={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    ข้อมูลผู้ใช้พื้นฐาน
                </Typography>

                <Grid container spacing={2}>
                    {userFields.filter(field => field.name === "confirmPassword" && editingId ? null : Boolean).map((field) => (
                        <Grid item xs={12} key={field.name}>
                            <TextField
                                fullWidth
                                label={field.label}
                                variant="outlined"
                                size="small"
                                type={field.type || "text"}
                                name={field.name}
                                value={userForm[field.name as keyof UserFormStateProps]} // ทำการยีนยันว่า field.name เป็น key ของ UserFormStateProps
                                onChange={handleChange}
                                error={!!errors[field.name]}
                                helperText={errors[field.name] || ""}
                                InputLabelProps={{ style: { color: "#C0C0C0" } }}
                                sx={{ bgcolor: "#27293D", input: { color: "white" } }}
                                // InputProps={{
                                //     endAdornment: (
                                //         <InputAdornment position="end">
                                //             <IconButton edge="end">
                                //                 {field ? <FiEye fontSize={16} /> : <FiEyeOff fontSize={16} />}
                                //             </IconButton>
                                //         </InputAdornment>
                                //     ),
                                // }}
                            />
                        </Grid>
                    ))}

                    {/* Role field */}
                    <FormControl sx={{ ml: 3, mt: 2 }}>
                        <RadioGroup
                            onChange={handleChange}
                            value={userForm.role}
                            name="role"
                            sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                        >
                            <FormControlLabel
                                value="member"
                                control={<Radio sx={{ color: "#ffffff", '&.Mui-checked': { color: "primary.main" } }} />}
                                label={<Typography sx={{ color: "whitesmoke" }}>Member</Typography>}
                            />
                            <FormControlLabel
                                value="admin"
                                control={<Radio sx={{ color: "#ffffff", '&.Mui-checked': { color: "primary.main" } }} />}
                                label={<Typography sx={{ color: "whitesmoke" }}>Admin</Typography>}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Box display="flex" alignItems="center" mt={2} onClick={() => setShowAddress(!showAddress)} sx={{ cursor: "pointer" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        ข้อมูลการจัดส่งเพิ่มเติม (ใส่หรือไม่ใส่ก็ได้)
                    </Typography>
                    <IconButton size="small" color="inherit">
                        {showAddress ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>

                {/* Address Form */}
                <Collapse in={showAddress} timeout="auto" unmountOnExit>
                    <Grid container spacing={2} mt={1}>
                        {addressFields.map((field) => (
                            <Grid item xs={12} key={field.name}>
                                <TextField
                                    fullWidth
                                    label={field.label}
                                    variant="outlined"
                                    size="small"
                                    type={"text"}
                                    name={field.name}
                                    value={addressForm[field.name as keyof Address]}
                                    multiline={field.multiline || false}
                                    minRows={field.multiline ? 3 : 1}
                                    InputLabelProps={{ style: { color: "#C0C0C0" } }}
                                    sx={{
                                        bgcolor: "#27293D",
                                        borderRadius: "8px",
                                        input: { color: "white" },
                                        "& .MuiInputBase-root": { color: "white" }
                                    }}
                                    onChange={handleChange}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Collapse>

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "primary",
                        color: "white",
                        mt: 3,
                        px: 4,
                    }}
                    onClick={handleSignUp}>
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
};

export default CreateUserForm