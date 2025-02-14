"use client"

import { Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { CreateUserStateProps, fieldProps } from "@/types/components/create-user-form";
import InputField from "./InputField";
import axios from "axios";

type CreateUserFormProps = {
    formOpen: boolean;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchUsers: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ formOpen, setFormOpen, fetchUsers }) => {
    const [users, setUsers] = useState<CreateUserStateProps>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        birthday: "",
        role: "member",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        let { name, value } = e.target;

        if (name === "phone") {
            value = value.replace(/\D/g, "");
            if (value.length > 3) value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 10)}`;
        }

        setUsers((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" })); // ล้าง error เมื่อผู้ใข้กำลังพิมพ์
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!users.firstname) newErrors.firstname = "จำเป็นต้องกรอกชื่อผู้ใช้";
        if (!users.lastname) newErrors.lastname = "จำเป็นต้องกรองนามสกุล";

        if (!users.email) newErrors.email = "กรุณากรอกอีเมล";
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(users.email))
            newErrors.email = "อีเมลไม่ถูกต้อง";

        if (!users.password) newErrors.password = "จำเป็นต้องกรอกรหัสผ่าน"
        else if (users.password.length !== 8) newErrors.password = "รหัสผ่านต้องมีความยาว 8 ตัวขึ้นไป";

        if (!users.confirmPassword) newErrors.confirmPassword = "จำเป็นต้องกรอกยันยินรหัสผ่าน";

        if (users.password !== users.confirmPassword) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน"
            newErrors.password = "รหัสผ่านไม่ตรงกัน"
        };

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // คีนค่า true เมื่อไม่มี error
    }

    const handleSignUp = async () => {
        if (!validateForm()) return; // เช็คว่า validateForm คืนค่ามาเป็น false ไหม

        await axios.post("/api/user", users).then(() => {
            // ถ้า sign up เสร็จ
            setFormOpen(!formOpen)
            fetchUsers();
        })
    };

    const fields: fieldProps[] = [
        { lable: "First name", type: "text", name: "firstname", value: users.firstname },
        { lable: "Last Name", type: "text", name: "lastname", value: users.lastname },
        { lable: "Email", type: "email", name: "email", value: users.email },
        { lable: "Phone Number (optional)", type: "text", name: "phone", value: users.phone },
        { lable: "Date Of BirthDay (optional)", type: "date", name: "birthday", value: users.birthday },
        { select: true, name: "role", value: users.role },
        { lable: "Password", type: "password", name: "password", value: users.password },
        { lable: "Confirm password", type: "password", name: "confirmPassword", value: users.confirmPassword }
    ];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5, px: 3 }}>
            <Box sx={{ width: '100%', borderRadius: 2 }}>
                <Grid container spacing={2}>
                    {fields.map((field, index) => field.select ? (
                        <Grid item xs={12} sm={6} key={index}>
                            <Select
                                fullWidth
                                variant="outlined"
                                size="small"
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                                error={!!errors[field.name]}
                                sx={{
                                    bgcolor: 'secondary.dark',
                                    color: "white",
                                    "& .MuiSelect-icon": { color: "#999" }
                                }}>
                                <MenuItem value="member">Member</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                            {errors[field.name] && <Box sx={{ color: "red", fontSize: 12, mt: 1 }}>{errors[field.name]}</Box>}
                        </Grid>
                    ) : (
                        <InputField errors={errors} field={field} handleChange={handleChange} key={index} />
                    ))}
                </Grid>

                <Box mt={3} textAlign="right">
                    <Button
                        variant="contained"
                        sx={{ bgcolor: '#16A34A', color: 'white', px: 6 }}
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateUserForm;