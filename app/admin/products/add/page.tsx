'use client'
import React from 'react';
import ProductForm from '@/components/admin/product/productForm';
import { IconButton } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const CreateProduct = () => {
  const router = useRouter()
  return (
    <div className='p-4 md:p-6 lg:p-8'>
      <div className='my-6'>
        <IconButton sx={{ mb: 2 }} onClick={() => router.push('/arc/admin/products')}>
          <BiArrowBack />
        </IconButton>
        <h1 className='font-semibold text-2xl text-black'>Create Product</h1>
      </div>
      <ProductForm />
    </div>
  )
}

export default CreateProduct;