'use client'
import React, { useState } from "react";
import { Box, Typography, Breadcrumbs, TablePagination } from "@mui/material";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import { Product } from "@/types/product";
import ProductTable from "@/components/admin/product/product-table";
import ProductForm from "@/components/admin/product/product-form";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formOpen, setFormOpen] = useState<boolean>(true);

    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <Box sx={{ py: 2, px: 6 }}>
            {/* Header */}
            <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {formOpen ? (editingId ? "Edit Product" : "Add Product") : "Products"}
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link color="inherit" href="/arc/admin">
                            <AiOutlineHome />
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>Products</Typography>
                    </Breadcrumbs>
                </Box>
            </Box>

            {!formOpen ? (
                <>
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
                </>
            ) : (
                <ProductForm />
            )}
        </Box>
    );
};

export default Products;

