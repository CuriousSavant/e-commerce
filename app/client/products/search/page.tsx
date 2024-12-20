'use client';
import React from 'react';
import CartProduct from '@/components/section/cart-product';
import { useSearchContext } from '@/app/context/ProductSearchContext';
import { CircularProgress } from '@mui/material';

const SearchPage = () => {
    const { originalProducts, viewMode, query, loading } = useSearchContext()

    const getContainerClass = () => {
        if (viewMode === 'grid') return 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6';
        return 'flex flex-col space-y-4 px-6';
    };

    const SearchHeader = () => (
        query ? (
            <div className="mx-6 mt-4">
                <h1 className="md:text-xl">ผลลัพธ์การค้นหาสำหรับ "{query}"</h1>
                <p className="text-sm text-gray-500">พบผลลัพธ์ {originalProducts.length} รายการ</p>
            </div>
        ) : null
    );

    const ProductList = () => (
        loading ? (
            <div className="flex justify-center py-6">
                <CircularProgress />
            </div>
        ) : originalProducts.length > 0 ? (
            <div className={getContainerClass()}>
                {originalProducts.map((product) => (
                    <CartProduct product={product} viewMode={viewMode} key={product.id} />
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-500 py-4">ไม่พบสินค้าที่ตรงกับคำค้นหา</div>
        )
    );

    return (
        <>
            <SearchHeader />
            <ProductList />
        </>
    );
}

export default SearchPage;