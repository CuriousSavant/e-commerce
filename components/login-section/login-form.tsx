import { Button, TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import writeFileSyncLib from '@/lib/read-file';

interface LoginFormProps {
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    onClose: () => void;
    setErrorMsg: (Value: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, password, setPassword, onClose, setErrorMsg }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const router = useRouter()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })
        if (res?.status === 401) {
            setErrorMsg(res.error as any)
            return;
        }
        writeFileSyncLib('json/login.json', [email, password])
        router.push('/client/profile/overview')
        window.location.reload()
        onClose()

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
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="รหัสผ่าน"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="กรอกรหัสผ่านของคุณ"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                color="primary"
                sx={{ mt: 2 }}
            >
                เข้าสู่ระบบ
            </Button>
        </Box>
    );
};

export default LoginForm;
