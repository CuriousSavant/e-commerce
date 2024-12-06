'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/product';
import CartProduct from './cart-product';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

const LatestProduct = () => {
    const [allProduct, setAllProduct] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/product', {
                params: { search },
            });
            setAllProduct(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div id="all-product" className="min-h-screen">
            <div className="flex justify-between mt-10 px-2 md:px-0">
                <div className="flex">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">สินค้าทั้งหมด🔥</h1>
                    <button className="after:content-[>] after:pl-0.5 hover:after:pl-1 text-gray-600 transition text-xs md:text-base">
                        ดูทั้งหมด
                    </button>
                </div>
                {/* Search Icon */}
                <div className="relative">
                    <FaSearch
                        onClick={() => setIsSearchOpen(true)}
                        className="cursor-pointer text-xl md:text-2xl"
                    />
                </div>
            </div>

            {/* Dialog for Search */}
            <Dialog open={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
                <DialogTitle>ค้นหาสินค้า</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            autoFocus
                            fullWidth
                            size="small"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearchSubmit(e);
                                }
                            }}
                            placeholder="ค้นหาสินค้า..."
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSearchOpen(false)} color="primary">
                        ปิด
                    </Button>
                    <Button onClick={handleSearchSubmit} color="primary">
                        ค้นหา
                    </Button>
                </DialogActions>
            </Dialog>

            {/* การโหลดข้อมูล */}
            {loading ? (
                <div className="text-center">กำลังโหลด...</div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
                    {allProduct.length === 0 ? (
                        <div className="text-center">ไม่พบสินค้าที่ค้นหา</div>
                    ) : (
                        allProduct.map((product) => (
                            <CartProduct product={product} key={product.id} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default LatestProduct;