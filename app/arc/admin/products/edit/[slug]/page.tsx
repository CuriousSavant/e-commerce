'use client'
import ProductForm from '@/components/admin-page/product/productForm';
import { useParams } from 'next/navigation';
import React from 'react';

const EditProduct = () => {
    const { slug } = useParams();

    return (
        <>
            <h1 className='font-semibold text-2xl text-black mb-4'>Edit Product</h1>
            <ProductForm slug={slug} />
        </>
    );
};

export default EditProduct;