'use client'
import ProductForm from '@/components/admin-page/product/productForm';
import { IconButton } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';

const EditProduct = () => {
    const { slug } = useParams();
    const router = useRouter();

    return (
        <>
            <div className='p-4 md:p-6 lg:p-8'>
                <div className='my-6'>
                    <IconButton sx={{ mb: 2 }} onClick={() => router.push('/arc/admin/products')}>
                        <BiArrowBack />
                    </IconButton>
                    <h1 className='font-semibold text-2xl text-black'>Edit Product</h1>
                </div>
                <ProductForm slug={slug} />
            </div>
        </>
    );
};

export default EditProduct;