'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Product } from '@/types/product';
import CardProducts from '../section/card-product';

const LatestProduct = () => {
    const [featureProduct, setFeatureProduct] = useState<Product[]>([])

    useEffect(() => {
        axios.get('/api/latest/').then((res) => setFeatureProduct(res.data))
    }, [])

    return (
        <div className="h-auto">
            <div className='flex mt-10 justify-between items-center'>
                <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold pl-3'>5 สินค้าใหม่ล่าสุด🔥</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 p-6">
                {featureProduct.map((product) => (
                    <CardProducts product={product} key={product.id} />
                ))}
            </div>
        </div>
    )
}

export default LatestProduct;