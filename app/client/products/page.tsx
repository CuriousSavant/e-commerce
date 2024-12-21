'use client';
import CartProduct from '@/components/section/cart-product';
import React from 'react';
import { useSearchContext } from '@/app/context/ProductSearchContext';
import { Skeleton } from '@mui/material';

const Products = () => {
    const { viewMode, loading, filteredProducts } = useSearchContext();

    const getContainerClass = (viewMode: string) => (
        viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 p-6'
            : 'flex flex-col space-y-4 px-6'
    );

    const renderSkeletons = (count: number) => {
        const skeletonArray = Array.from({ length: count }, (_, index) => index);
        return (
            <div className={getContainerClass(viewMode)}>
                {skeletonArray.map((key) => (
                    <div key={key} className="flex flex-col w-full h-full bg-white shadow-md rounded-lg overflow-hidden">
                        <Skeleton variant="rectangular" className="w-full h-44 lg:h-[12rem]" />
                        <div className="p-3">
                            <Skeleton variant="text" width="80%" />
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="text" width="40%" />
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    const ProductList = () => {
        return (
            loading ? (
                renderSkeletons(filteredProducts.length)
            ) : filteredProducts.length > 0 ? (
                <div className={getContainerClass(viewMode)}>
                    {filteredProducts.map((product) => (
                        <CartProduct product={product} viewMode={viewMode} key={product.id} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-4 min-h-screen flex justify-center items-center">ไม่พบสินค้าที่ตรงกับคำค้นหา</div>
            )
        )
    }

    return <ProductList />;
};

export default Products;