'use client'
import { Button } from '@mui/material';
import React from 'react'

const HeroSection = () => {
    return (
        <div className="relative h-[50vh] md:h-[60vh] bg-cover bg-center transition-all mt-16 md:mt-24 px-2 lg:px-0">
            <div className="group overflow-hidden w-full h-full relative rounded-lg">
                <img
                    src={'/young-content-creator-girl-is-her-laptop-creating-new-vlog-sitting-sofa-working-with-video-from-home.jpg'}
                    className="h-full w-full object-cover md:rounded-lg group-hover:scale-105 transition-transform duration-300"
                    alt="Online Shopping Background"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                        Welcome to Junior-Shop
                    </h1>
                    <p className="text-white text-sm lg:text-lg max-w-2xl">
                        เริ่มต้นประสบการณ์ช้อปปิ้งที่ Junior-Shop เรามีสินค้ารอคุณอยู่
                    </p>
                    <div className='pt-6'>
                        <Button
                            href={'/client/products'}
                            variant='contained' 
                            sx={{ bgcolor: "primary.500", color: "white", px: 3 }}>เริ่มช้อปปิ้งเลย</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;