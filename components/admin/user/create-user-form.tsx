import { Box, Button, Collapse, IconButton, SelectChangeEvent, Typography } from "@mui/material";
import { ArrowBack, ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import UserInfoFields from "./form/user-info-fields";
import RoleSelection from "./form/role-section";
import AddressForm from "./form/address-form";
import { UserFormStateProps } from "@/types/components/create-user-form";
import { Address } from "@/types/address";

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

const CreateUserForm: React.FC<CreateUserFormProps> = ({
    formOpen, editingId, userForm, errors, addressForm,
    setFormOpen, handleChange, handleSignUp, setEditingId, setUserForm,
}) => {
    const [showAddress, setShowAddress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = (field: "password" | "confirmPassword") => {
        if (field === "password") {
            setShowPassword(!showPassword)
        } else {
            setShowConfirmPassword(!showConfirmPassword)
        }
    }

    return (
        <Box sx={{ bgcolor: "#1E1E2F", color: "white" }}>
            <IconButton onClick={() => setFormOpen(!formOpen)} sx={{ color: "white" }}>
                <ArrowBack />
            </IconButton>

            <Box p={3} borderRadius={2}>
                <Typography variant="subtitle1" fontWeight="bold" mb={3}>
                    ข้อมูลผู้ใช้พื้นฐาน
                </Typography>
                <UserInfoFields {...{ userForm, errors, handleChange, showPassword, showConfirmPassword, toggleShowPassword, editingId }} />

                <RoleSelection value={userForm.role} handleChange={handleChange} />

                <Box display="flex" alignItems="center" mt={2} onClick={() => setShowAddress(!showAddress)} sx={{ cursor: "pointer" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        ข้อมูลการจัดส่งเพิ่มเติม (ใส่หรือไม่ใส่ก็ได้)
                    </Typography>
                    <IconButton size="small" color="inherit">
                        {showAddress ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>

                <Collapse in={showAddress}>
                    <AddressForm {...{ addressForm, handleChange }} />
                </Collapse>

                <Button variant="contained" sx={{ mt: 3 }} onClick={handleSignUp}>Sign Up</Button>
            </Box>
        </Box >
    );
};

export default CreateUserForm;
