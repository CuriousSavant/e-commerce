"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import CartProduct from "./cart-product";
import { Product } from "@/types/product";

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
                    "&::-webkit-scrollbar": { display: "none" },
                    height: "full",
                }}
            >
                {products.map((product, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: "0 0 auto",
                            width: 180,
                        }}
                    >
                        <CartProduct product={product} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RandomProducts;
