'use client';
import { FormEvent, useState } from 'react';
import { Box, Button, Typography, Tabs, Tab, Alert } from '@mui/material';
import LoginForm from '@/components/login-section/login-form';
import SignupForm from '@/components/login-section/sign-form';
import Header from '@/components/login-section/header';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import writeFileSyncLib from '@/lib/read-file';

function AuthModal({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');

    const handleTabChange = (value: 'login' | 'signup') => {
        setActiveTab(value);
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMsg('');
    };

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
        console.log(res)
    }

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg('');
        const data = {
            name: userName,
            email,
            password,
            confirmPassword,
        }
        try {
            await axios.post('/api/users', data);
            await handleLogin(email, password)
            // เขียนข้อมูลการ signup ของ user ลงในไฟล์ .json
            writeFileSyncLib('json/signup.json', [data])
            window.location.reload();
            onClose()
        } catch (err: any) {
            if (err.response?.status === 400) {
                setErrorMsg(err.response.data.error);
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
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    width: '90%',
                    maxWidth: 400,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 3,
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
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onClose={onClose}
                        setErrorMsg={setErrorMsg}
                    />
                ) : (
                    <SignupForm
                        userName={userName}
                        setUserName={setUserName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
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