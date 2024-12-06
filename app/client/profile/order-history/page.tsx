'use client'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const OrderHistory = () => {
    const router = useRouter();
    return (
        <div className='p-3'>
            <IconButton sx={{ mb: 4 }} onClick={() => router.push('/client/profile/overview')}>
                <BiArrowBack />
            </IconButton>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-semibold'>ปัจจุบันยังไม่มีหน้านี้</h1>
                <p>เนื่องจากผู้สร้างคิด design ไม่ออก + ขี้เกียจ</p>
            </div>
        </div>
    )
}

export default OrderHistory