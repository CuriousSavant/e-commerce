'use client'
import CartProduct from '@/components/section/cart-product';
import { Product } from '@/types/product';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent, Box, IconButton } from '@mui/material';
import { PiGridNineFill } from 'react-icons/pi'
import { MdViewList } from 'react-icons/md';

const Products = () => {
    const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortOption, setSortOption] = useState<string>('relevance');

    useEffect(() => {
        axios.get('/api/product').then((res) => {
            setOriginalProducts(res.data);
            setProducts(res.data);
        });
    }, []);

    const handleSortChange = (e: SelectChangeEvent<{ value: string }>) => {
        const value = e.target.value as string;
        setSortOption(value);

        const sortedProducts = [...originalProducts].sort((a, b) => {
            if (value === 'name') return a.title.localeCompare(b.title);
            if (value === 'price') return a.price - b.price;
            return 0; // Default relevance
        });

        setProducts(sortedProducts);
    };

    const handleViewModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: 'grid' | 'list'
    ) => {
        if (newMode) setViewMode(newMode);
    };

    return (
        <div className="mt-24">
            {/* Sort and View Options */}
            <div className="mb-6 flex justify-end items-center px-6">
                <div className='flex gap-1 items-center mr-3'>
                    <h1 className='text-gray-400'>Sort By:</h1>
                    {/* Sort Dropdown */}
                    <Select
                        size='small'
                        onChange={handleSortChange}
                        className="bg-white border border-gray-300 rounded"
                        value={sortOption || "" as any}
                    >
                        <MenuItem value="relevance">Sort by Relevance</MenuItem>
                        <MenuItem value="name">Sort by Name</MenuItem>
                        <MenuItem value="price">Sort by Price</MenuItem>
                    </Select>
                </div>

                <div className='flex gap-1 items-center text-gray-400'>
                    <div>View:</div>
                    <IconButton aria-label="list view" size='small' onClick={() => setViewMode('grid')} color={viewMode === 'grid' ? 'primary' : 'default'}>
                        <PiGridNineFill size={24} />
                    </IconButton>
                    <IconButton aria-label="grid view" size='small' onClick={() => setViewMode('list')} color={viewMode === 'list' ? 'primary' : 'default'}>
                        <MdViewList size={24} />
                    </IconButton>
                </div>
            </div>

            {/* Product List */}
            <div
                className={`${viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'
                    : 'flex flex-col space-y-4 px-6'
                    }`}
            >
                {products.map((product) => (
                    <CartProduct key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;