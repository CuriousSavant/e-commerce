'use client';
import CardProducts from '@/components/client/section/card-product';
import React, { useEffect } from 'react';
import { useSearchContext } from '@/context/ProductSearchContext';
import { Skeleton } from '@mui/material';
import { useSearchParams } from 'next/navigation';

const Products = () => {
    const { viewMode, loading, productsList, filteredProducts, selectedCategory, setSelectedCategory } = useSearchContext();

    const params = useSearchParams()
    const categoryId = params.get('categoryId')

    useEffect(() => {
        setSelectedCategory(categoryId)
    }, [categoryId])

    const getContainerClass = (viewMode: string) => (
        viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-6 p-6'
            : 'flex flex-col space-y-4 px-6'
    );

    const renderSkeletons = (count: number) => {
        const skeletonArray = Array.from({ length: count }, (_, index) => index);
        return (
            <div className={getContainerClass(viewMode)}>
                {skeletonArray.map((key) => (
                    <div
                        key={key}
                        className={`flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row'} w-full h-full bg-white shadow-md rounded-lg overflow-hidden`}
                    >
                        <Skeleton
                            variant="rectangular"
                            className={`${viewMode === 'grid'
                                ? 'w-full h-44 lg:h-[12rem]'
                                : 'h-32 lg:h-32 min-w-[130px] max-w-[130px] md:min-w-[150px] md:max-w-[150px]'
                                }`}
                            animation="wave"
                        />
                        <div className="p-3 flex flex-col gap-1 flex-grow">
                            <Skeleton variant="rounded" width="80%" animation="wave" />
                            <Skeleton variant="rounded" width="60%" animation="wave" />
                            <Skeleton variant="rounded" width="40%" animation="wave" />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const products = selectedCategory === null ? productsList : filteredProducts

    const ProductList = () => (
        loading ? (
            renderSkeletons(products.length)
        ) : products.length > 0 ? (
            <div className={getContainerClass(viewMode)}>
                {products.map((product) => (
                    <CardProducts product={product} viewMode={viewMode} key={product.id} />
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-500 py-4 min-h-screen flex justify-center items-center">
                ไม่พบสินค้าที่ตรงกับคำค้นหา
            </div>
        )
    );

    return <ProductList />;
};

export default Products;