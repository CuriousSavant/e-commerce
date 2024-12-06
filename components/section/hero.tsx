import { Button, Typography } from '@mui/material';
import React from 'react'

const HeroSection = () => {
    return (
        <div className="relative h-[60vh] bg-cover bg-center transition-all mt-24 px-0 md:px-2 lg:px-0">
            <div className="group overflow-hidden w-full h-full relative md:rounded-lg">
                <img
                    src={'/imgs/bg/young-content-creator-girl-is-her-laptop-creating-new-vlog-sitting-sofa-working-with-video-from-home.jpg'}
                    className="h-full w-full object-cover md:rounded-lg group-hover:scale-105 transition-transform duration-300"
                    alt="Online Shopping Background"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4">
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                        Welcome to Junior-Commerce!
                    </h1>
                    <p className="text-white text-sm lg:text-lg max-w-2xl">
                        คุณย่าเคยพูดเอาไว้ ก้าวไปบนวิถีแห่งสวรรค์ เพื่อปกครองทุกสิ่ง
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;