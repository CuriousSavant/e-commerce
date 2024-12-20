'use client'
import { Button, Typography } from '@mui/material';
import React from 'react'
import { useRouter } from 'next/navigation';
import { MdOutlineArrowBackIos } from 'react-icons/md'

const NotFound = () => {
    const router = useRouter()
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <Typography sx={{ fontWeight: 800, fontSize: "50px" }}>Oops!</Typography>
            <h1 className='font-semibold text-xl uppercase'>404 - not found page</h1>
            <div className='mt-6'>
                <Button
                    variant='contained'
                    onClick={() => router.push('/')}
                    startIcon={<MdOutlineArrowBackIos />}
                >
                    กลับหน้าหลัก
                </Button>
            </div>
        </div>
    )
}

export default NotFound;