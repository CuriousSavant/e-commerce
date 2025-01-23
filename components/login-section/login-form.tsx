import { Button, TextField, Box, IconButton, InputAdornment, Typography } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { SetStateAction, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import writeFileSyncLib from '@/lib/read-file';
import { FormDataProps, FormErrorProps } from '../auth-form';

interface LoginFormProps {
    formData: FormDataProps;
    setFormError: React.Dispatch<SetStateAction<FormErrorProps>>;
    formError: FormErrorProps;
    setErrorMsg: React.Dispatch<SetStateAction<string>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, handleChange, onClose, setFormError, setErrorMsg, formError }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const router = useRouter()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const errors: FormErrorProps = {
            userName: false,
            lastName: false,
            email: false,
            password: false,
            confirmPassword: false,
        };

        if (!formData.email) {
            errors.email = true;
        }
        if (!formData.password) {
            errors.password = true;
        }

        setFormError(errors);

        if (errors.email || errors.password) {
            setErrorMsg("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            })
            if (res?.error) {
                setErrorMsg(res.error)
                return;
            }
            setErrorMsg('')
            writeFileSyncLib('json/login.json', [formData.email, formData.password])
            router.push('/client/profile/overview')
            window.location.reload()
            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Box component="form" onSubmit={handleLogin}>
            <TextField
                label="อีเมล"
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                name='email'
                size="small"
                value={formData.email}
                onChange={handleChange}
                error={formError.email}
                helperText={formError.email && "กรุณากรอกอีเมล"}
            />
            <TextField
                label="รหัสผ่าน"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="กรอกรหัสผ่านของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                name='password'
                value={formData.password}
                onChange={handleChange}
                error={formError.password}
                helperText={formError.password && "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร"}
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "secondary.main" }}
            >
                เข้าสู่ระบบ
            </Button>
        </Box>
    );
};

export default LoginForm;