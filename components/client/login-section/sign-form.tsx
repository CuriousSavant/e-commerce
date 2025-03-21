"use client"

import { Button, TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { FormDataProps, FormErrorProps } from '../section/auth-form';

interface SignUpFormProps {
    formData: FormDataProps;
    formError: FormErrorProps;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
    formData,
    formError,
    handleChange,
    onSignUp,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <Box component="form" onSubmit={onSignUp}>
            <TextField
                label="ชื่อ"
                type="text"
                placeholder="กรอกชื่อของคุณ"
                variant="outlined"
                margin="normal"
                size="small"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                error={!!formError.lastname}
                helperText={formError.firstname && "กรุณากรอกชื่อ"}
                fullWidth
            />
            <TextField
                label="นามสกุล"
                type="text"
                placeholder="กรอกนามสกุลของคุณ"
                variant="outlined"
                margin="normal"
                size="small"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                error={!!formError.lastname}
                helperText={formError.lastname && "กรุณากรอกนามสกุล"}
                fullWidth
            />
            <TextField
                label="อีเมล"
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                variant="outlined"
                margin="normal"
                size="small"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formError.email}
                helperText={formError.email && "กรุณากรอกอีเมลที่ถูกต้อง"}
                fullWidth
            />
            <TextField
                label="รหัสผ่าน"
                placeholder="กรอกรหัสผ่านของคุณ"
                variant="outlined"
                margin="normal"
                size="small"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!formError.password}
                helperText={formError.password && "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {passwordVisible ? <FiEye fontSize={16} /> : <FiEyeOff fontSize={16} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                label="ยืนยันรหัสผ่าน"
                placeholder="ยืนยันรหัสผ่านของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!formError.confirmPassword}
                helperText={formError.confirmPassword && "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                {confirmPasswordVisible ? <FiEye fontSize={16} /> : <FiEyeOff fontSize={16} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, bgcolor: "secondary.main" }}
            >
                สมัครสมาชิก
            </Button>
        </Box>
    );
};

export default SignUpForm;