'use client'
import React, { useState } from 'react'
import axios from 'axios';
import { Product } from '@/types/product';
import CartProduct from './cart-product';

const LatestProduct = () => {
    const [featureProduct, setFeatureProduct] = useState<Product[]>([])

    React.useEffect(() => {
        axios.get('/api/latest/').then((res) => setFeatureProduct(res.data))
    }, [])

    const scrollToAllProduct = () => {
        const all_product = document.getElementById('all-product')
        all_product?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="min-h-screen">
            <div className='flex mt-10 justify-between items-center'>
                <div className='flex px-2 md:px-0'>
                    <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold'>สินค้าใหม่ล่าสุด🔥</h1>
                    <button onClick={scrollToAllProduct} className='after:content-[">"] after:pl-0.5 hover:after:pl-1 text-gray-600 transition text-xs md:text-base'>ดูทั้งหมด</button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
                {featureProduct.map((product) => (
                    <CartProduct product={product} key={product.id} />
                ))}
            </div>

        </div>
    )
}

export default LatestProduct;