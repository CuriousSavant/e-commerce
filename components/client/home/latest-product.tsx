'use client'
import React from 'react'
import CardProducts from '../section/card-product';
import { Button } from '@mui/material';
import { Product } from '@/types/product';

const LatestProduct = ({ products }: { products: Product[] }) => {
    return (
        <div className="h-auto">
            <div className='flex mt-10 justify-between items-center'>
                <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold pl-3'>5 สินค้าใหม่ล่าสุด🔥</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 p-6">
                {products.map((product) => (
                    <CardProducts product={product} key={product.id} />
                ))}
            </div>

            <div className='flex justify-center my-6'>
                <Button variant="contained" href='/client/products' sx={{ bgcolor: "primary.main" }}>ดูสินค้าทั้งหมด</Button>
            </div>
        </div>
    )
}

export default LatestProduct;