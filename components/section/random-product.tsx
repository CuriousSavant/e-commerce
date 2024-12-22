"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Product } from "@/types/product";
import Link from "next/link";

const RandomProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const res = await axios.get("/api/product/random");
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching random products", error);
            }
        };

        fetchRandomProducts();
    }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                สินค้าแนะนำ
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    p: 1,
                    // "&::-webkit-scrollbar": { display: "none" },
                    width: "full",
                    height: "full",
                }}
            >
                {products.map((product, index) => (
                    <Box
                        key={index}
                        sx={{ width: { xs: 140, sm: 180 } }}
                        height={"auto"}
                    >
                        <Link
                            href={`/client/${product.slug}`}
                            className="w-full flex flex-col items-center group h-full shadow-md transition duration-75 bg-white rounded-lg overflow-hidden relative"
                        >
                            <div className="flex flex-col overflow-hidden rounded-lg w-full h-44 lg:h-[12rem]">
                                <img
                                    className="w-full h-full group-hover:scale-105 group-hover:filter group-hover:brightness-70 bg-cover bg-center transition-transform duration-500"
                                    src={`${product.image?.[0]}`}
                                />
                                {product.stock === 0 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] h-44 lg:h-[12rem]">
                                        <span className="text-white text-lg font-semibold">สินค้าหมด</span>
                                    </div>
                                )}
                            </div>

                            <div className="py-1 px-2 lg:p-3 min-w-full flex flex-col items-start group-hover:opacity-90 transition duration-300 ease-in-out">
                                <h2 className="text-xs text-neutral-700 font-semibold line-clamp-2 text-start">
                                    {product.title}
                                </h2>
                                <p className="mt-2 md:mt-4 flex-grow font-medium text-blue-500">
                                    ฿{product.price.toLocaleString('th-TH')}
                                </p>
                                <p className="text-xs text-gray-400 mb-2">ส่งฟรีทั่วไทย</p>
                                {product.stock <= 5 && (
                                    <div className="bg-gray-100 rounded-md pt-[2px] px-2 text-[10px]">
                                        เหลือสินค้าอีก {product.stock} ชิ้น
                                    </div>
                                )}
                            </div>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RandomProducts;
