'use client'
import { Button, Typography } from '@mui/material';
import React from 'react'
import { useRouter } from 'next/navigation';
import { BiHome } from 'react-icons/bi';

const NotFound = () => {
    const router = useRouter()
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <Typography sx={{ fontWeight: 800, fontSize: "38px", color: "red" }}>ERROR 404</Typography>
            <h1 className='font-semibold text-xl'>ไม่พบหน้านี้ T_T</h1>
            <div className='mt-6'>
                <Button
                    variant='contained'
                    onClick={() => router.push('/')}
                    startIcon={<BiHome />}
                >
                    กลับหน้าหลัก
                </Button>
            </div>
        </div>
    )
}

export default NotFound;