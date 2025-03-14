'use client'
import React from "react";
import { Box, Typography, TablePagination, Button } from "@mui/material";
import ProductTable from "@/components/admin/products/product-table";
import ProductForm from "@/components/admin/products/form/product-form";
import { MdDelete } from "react-icons/md";
import FilterSortSearchProduct from "@/components/admin/products/filter-sort-search-product";
import { useProducts } from "@/hooks/useProducts";
import { usePagination } from "@/hooks/usePagination";

const Products = () => {
    const {
        categories, fetchProducts, formOpen,
        handleResetState, productForm,
        products, setFormOpen, setProductForm,
        setProducts, slug, sortOrder,
        startEditing, toggleSortOrder,
        handleCreateProductAndUpdate,
        query, selectItem, setQuery, setSelectItem,
        categoryFilter, priceFilter, setCategoryFilter,
        setPriceFilter, setStatusFilter, statusFilter,
        setSlug, loading, setLoading, handleAllDelete,
        handleDeleteProduct, imageUrl, setImageUrl,
        deletedImage, handleRemoveImage, handleUndoDelete,
        handleUploadImage, loadingImage, selectedImage,
        setSelectedImage, setSnackbarOpen, snackbarOpen,
    } = useProducts();

    const {
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        rowsPerPage,
    } = usePagination();

    return (
        <Box sx={{ py: 2, px: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                {selectItem.length > 0 ? (
                    <>
                        <Typography variant="h5" fontWeight={"bold"}>{selectItem.length} Selected</Typography>
                        <Button
                            color="error"
                            variant="contained"
                            size="medium"
                            sx={{ textTransform: "none", display: "flex", alignItems: "center" }}>
                            <MdDelete size={20} color="#fff" />
                            <Typography variant="button" fontWeight={"bold"} sx={{ ml: 1 }}>
                                Delete
                                ({selectItem.length > 0 ? selectItem.length : ""})
                            </Typography>
                        </Button>
                    </>
                ) : <Typography variant="h5" fontWeight={'bold'}>{formOpen ? (slug ? "แก้ไขสินค้า" : "เพิ่มสินค้า") : "สินค้าทั้งหมด"}</Typography>}
            </Box>

            {!formOpen ? ( // ถ้าเปิด form อยู่ให้ปิด
                <FilterSortSearchProduct
                    sortOrder={sortOrder}
                    toggleSortOrder={toggleSortOrder}
                    formOpen={formOpen}
                    setFormOpen={setFormOpen}
                    setQuery={setQuery}
                    query={query}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    setStatusFilter={setStatusFilter}
                    statusFilter={statusFilter}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                />
            ) : null}

            {!formOpen ? (
                <>
                    {/* Product Table */}
                    <ProductTable
                        page={page}
                        loading={loading}
                        products={products}
                        rowsPerPage={rowsPerPage}
                        selectItem={selectItem}
                        setSelectItem={setSelectItem}
                        startEditing={startEditing}
                        handleAllDelete={handleAllDelete}
                        handleDeleteProduct={handleDeleteProduct}
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
                <ProductForm {...{
                    productForm, setProductForm, slug, handleCreateProductAndUpdate,
                    handleRemoveImage, handleUndoDelete, handleUploadImage, imageUrl,
                    loadingImage, selectedImage, setSelectedImage, snackbarOpen,
                    setSnackbarOpen, startEditing, formOpen, setFormOpen, setSlug,
                    setImageUrl,
                }} />
            )}
        </Box>
    );
};

export default Products;