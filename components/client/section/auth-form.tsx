'use client';
import { FormEvent, useState } from 'react';
import { Box, Button, Typography, Tabs, Tab, Alert } from '@mui/material';
import LoginForm from '@/components/client/login-section/login-form';
import SignupForm from '@/components/client/login-section/sign-form';
import Header from '@/components/client/login-section/header';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export interface FormDataProps {
    userName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormErrorProps {
    userName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
}

function AuthModal({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
    const [errorMsg, setErrorMsg] = useState<string>('');

    const [formData, setFormData] = useState<FormDataProps>({
        userName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [formError, setFormError] = useState<FormErrorProps>({
        userName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    })

    const handleTabChange = (value: 'login' | 'signup') => {
        setActiveTab(value);
        setErrorMsg('')
        setFormData({
            userName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setFormError({
            userName: false,
            lastName: false,
            email: false,
            password: false,
            confirmPassword: false,
        })
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setFormError((prev) => ({
            ...prev,
            password: name === 'password' && value.length < 8,
            confirmPassword: name === 'confirmPassword' && value !== formData.password,
        }))
    }

    const handleLogin = async (email: string | undefined, password: string | undefined) => {
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
        })
        if (res?.status === 401) {
            setErrorMsg(res.error as any)
        }
        onClose()
    }

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors: FormErrorProps = {
            userName: !formData.userName.trim(),
            lastName: !formData.lastName?.trim(),
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
            password: formData.password.length < 8,
            confirmPassword: formData.confirmPassword !== formData.password || formData.confirmPassword.length < 8,
        };

        setFormError(errors);


        // ตรวจสอบว่ามีข้อผิดพลาดหรือไม่
        const hasError = Object.values(errors).some((error) => error);
        if (hasError) {
            setErrorMsg("กรุณากรอกข้อมูลให้ถูกต้อง");
            return;
        }

        try {
            await axios.post('/api/user', formData);
            await handleLogin(formData.email, formData.password);

            window.location.reload();
            onClose();
        } catch (err: any) {
            if (err.response?.status === 400) {
                setErrorMsg(err.response.data.msg);
            } else {
                setErrorMsg('เกิดข้อผิดพลาดในการสมัครสมาชิก');
            }
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: `${activeTab === 'login' ? 'center' : 'start'}`,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 99999,
                height: "100vh",
                overflowY: "auto",
                py: 2
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    maxWidth: 400,
                    bgcolor: 'white',
                    borderRadius: 2,
                    minHeight: "auto",
                    boxShadow: 3,
                    p: 3,
                    overflowY: 'auto',
                }}
            >
                <Header activeTab={activeTab} onClose={onClose} />
                <Tabs
                    value={activeTab === 'login' ? 0 : 1}
                    onChange={(_, value) => handleTabChange(value === 0 ? 'login' : 'signup')}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="fullWidth"
                    sx={{ mb: 3 }}
                >
                    <Tab label="เข้าสู่ระบบ" />
                    <Tab label="สมัครสมาชิก" />
                </Tabs>

                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}

                {activeTab === 'login' ? (
                    <LoginForm
                        formData={formData}
                        handleChange={handleChange}
                        onClose={onClose}
                        setFormError={setFormError}
                        setErrorMsg={setErrorMsg}
                        formError={formError}
                    />
                ) : (
                    <SignupForm
                        formData={formData}
                        formError={formError}
                        handleChange={handleChange}
                        onSignUp={handleSignUp}
                    />
                )}

                <Box textAlign="center" mt={2}>
                    {activeTab === 'login' ? (
                        <Typography variant="body2">
                            ยังไม่มีบัญชีใช่ไหม?{' '}
                            <Button
                                onClick={() => handleTabChange('signup')}
                                variant="text"
                                color="primary"
                                size="small"
                            >
                                สมัครสมาชิก
                            </Button>
                        </Typography>
                    ) : (
                        <Typography variant="body2">
                            มีบัญชีอยู่แล้ว?{' '}
                            <Button
                                onClick={() => handleTabChange('login')}
                                variant="text"
                                color="primary"
                                size="small"
                            >
                                เข้าสู่ระบบ
                            </Button>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default AuthModal;