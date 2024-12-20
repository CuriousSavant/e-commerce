'use client';
import CartProduct from '@/components/section/cart-product';
import React from 'react';
import { useSearchContext } from '@/app/context/ProductSearchContext';
import { CircularProgress } from '@mui/material';

const Products = () => {
    const { originalProducts, viewMode, loading } = useSearchContext();

    const getContainerClass = (viewMode: string) => (
        viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 p-6'
            : 'flex flex-col space-y-4 px-6'
    );

    const ProductList = () => {
        return (
            loading ? (
                <div className="flex justify-center py-6">
                    <CircularProgress />
                </div>
            ) : originalProducts.length > 0 ? (
                <div className={getContainerClass(viewMode)}>
                    {originalProducts.map((product) => (
                        <CartProduct product={product} viewMode={viewMode} key={product.id} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-4">ไม่พบสินค้าที่ตรงกับคำค้นหา</div>
            )
        )
    }

    return <ProductList />;
};

export default Products;