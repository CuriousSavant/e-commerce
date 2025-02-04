'use client'
import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Breadcrumbs,
    TablePagination,
} from "@mui/material";
import { AiOutlinePlus, AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductTable from "@/components/admin/product/product-table";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <Box sx={{ p: { xs: 1.5, md: 3 } }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Products
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/arc/admin">
                            <AiOutlineHome />
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>Products</Typography>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<AiOutlinePlus />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#4F46E5",
                            ":hover": { backgroundColor: "#4338CA" },
                        }}
                    >
                        <Link href={`/arc/admin/products/add`}>Create</Link>
                    </Button>
                </Box>
            </Box>

            {/* Product Table */}
            <ProductTable
                page={page}
                products={products}
                rowsPerPage={rowsPerPage}
                setProducts={setProducts}
                sortOrder={sortOrder}
                toggleSortOrder={toggleSortOrder}
            />

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default Products;

