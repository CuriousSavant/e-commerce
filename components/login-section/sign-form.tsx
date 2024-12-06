import { Button, TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';

interface SignUpFormProps {
    userName: string;
    setUserName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
    onSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    onSignUp
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
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                label="อีเมล"
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="รหัสผ่าน"
                type={passwordVisible ? "text" : "password"}
                placeholder="กรอกรหัสผ่านของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {passwordVisible ? <FiEye fontSize={16} /> : <FiEyeOff fontSize={16} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="ยืนยันรหัสผ่าน"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="ยืนยันรหัสผ่านของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                {confirmPasswordVisible ? <FiEye fontSize={16} /> : <FiEyeOff fontSize={16} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                สมัครสมาชิก
            </Button>
        </Box>
    );
};

export default SignUpForm;
