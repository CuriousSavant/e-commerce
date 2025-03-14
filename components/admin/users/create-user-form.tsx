import { Box, Button, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import React, { useState } from "react";
import UserInfoFields from "./form/user-info-fields";
import RoleSelection from "./form/role-section";
import { UserFormStateProps } from "@/types/components/create-user-form";

type CreateUserFormProps = {
    userForm: UserFormStateProps;
    errors: { [key: string]: string };
    formOpen: boolean;
    editingId: number | null;

    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
    setUserForm: React.Dispatch<React.SetStateAction<UserFormStateProps>>;

    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
    handleSignUp: () => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
    formOpen, editingId, userForm, errors,
    setFormOpen, handleChange, handleSignUp, setEditingId, setUserForm, setErrors,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = (field: "password" | "confirmPassword") => {
        if (field === "password") {
            setShowPassword(!showPassword)
        } else {
            setShowConfirmPassword(!showConfirmPassword)
        }
    }

    const Back = () => {
        setFormOpen(false);
        setEditingId(null);
        setUserForm({
            firstname: "",
            lastname: "",
            email: "",
            role: "member",
            password: "",
            confirmPassword: "",
        })
        setErrors({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    return (
        <Box sx={{ bgcolor: "#1E1E2F", color: "white" }}>
            <IconButton onClick={Back} sx={{ color: "white" }}>
                <ArrowBack />
            </IconButton>

            <Box p={3} borderRadius={2} display={"flex"} flexDirection={"column"}>
                <Typography variant="subtitle1" fontWeight="bold" mb={3}>
                    ข้อมูลผู้ใช้พื้นฐาน
                </Typography>
                <UserInfoFields {...{ userForm, errors, handleChange, showPassword, showConfirmPassword, toggleShowPassword, editingId }} />

                <RoleSelection value={userForm.role} handleChange={handleChange} />

                <Button variant="contained" sx={{ mt: 3, bgcolor: "primary.main" }} onClick={handleSignUp}>
                    {editingId ? "Update User" : "Sign Up"}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateUserForm;