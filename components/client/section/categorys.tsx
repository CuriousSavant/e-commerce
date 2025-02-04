'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';
import Link from 'next/link';

const CardCategorys = () => {
    // Mock categories
    const categories = [
        {
            id: 7,
            name: 'ไอโฟน',
            image: 'https://media-cdn.bnn.in.th/332524/iPhone_15_Pro_Blue_Titanium_3-square_medium.jpg',
        },
        {
            id: 8,
            name: 'โน๊ตบุ๊ค',
            image: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/04/Product/hp-omen-16-wf1073tx-gaming-notebook-front-right-view.jpg',
        },
        {
            id: 9,
            name: 'แมคบุ๊ค',
            image: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/05/Product/apple-macbook-pro-m3-14-2023-space-gray-top-open-view.jpg',
        },
        {
            id: 13,
            name: 'จอคอม',
            image: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/06/Computer/24GS50F-2(1).jpg',
        },
        {
            id: 15,
            name: 'ไอแพด',
            image: 'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/06/ipad-pro-m2-2022-02.jpg',
        },
    ];

    return (
        <div className='p-6'>
            <Box display={'flex'} justifyContent={'center'} alignContent={'center'} mt={10}>
                <Typography
                    variant='h6'
                    component={'span'}
                    sx={{ borderBottom: '4px solid #ddd', fontSize: '24px' }}
                >
                    หมวดหมู่
                </Typography>
            </Box>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6'>
                {categories.map((category) => (
                    <Link href={`/client/products?categoryId=${category.id}`} key={category.id}>
                        <div className='group h-[10rem] md:h-[12rem] rounded-lg flex justify-center items-center border border-[#ddd] shadow-md relative transition-transform duration-300 ease-in-out transform hover:scale-105'>
                            <img
                                src={category.image}
                                alt={category.name}
                                className='w-full h-full object-cover bg-center rounded-lg group-hover:blur-sm'
                            />
                            <Typography
                                variant='h6'
                                className='absolute text-white font-bold group-hover:scale-100 transition-transform duration-300'
                            >
                                {category.name}
                            </Typography>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardCategorys;
