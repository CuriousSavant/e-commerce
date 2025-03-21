'use client'
import React from "react";
import { Box, Typography, TablePagination, Button } from "@mui/material";
import ProductTable from "@/components/admin/products/product-table";
import ProductForm from "@/components/admin/products/form/product-form";
import { MdDelete } from "react-icons/md";
import FilterSortSearchProduct from "@/components/admin/products/filter-sort-search-product";
import { useProducts } from "@/hooks/useProducts";
import { usePagination } from "@/app/context/PaginationContext";
import useBrands from "@/hooks/useBrands";

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
        countProducts,
    } = useProducts();

    const { brands } = useBrands();

    const {
        handleChangePage,
        handleChangeRowsPerPage,
        page,
        pageSize,
    } = usePagination();

    console.log("from page:", page, pageSize)

    console.log("next:", (page * pageSize) >= countProducts)
    console.log("prev:", page <= 1)

    return (
        <Box sx={{ py: 2, px: { xs: 2, md: 6 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 4, md: 2 } }}>
                {selectItem.length > 0 ? (
                    <>
                        <Typography variant="h5" fontWeight={"bold"}>{selectItem.length} Selected</Typography>
                        <Button
                            color="error"
                            variant="contained"
                            size="medium"
                            sx={{ textTransform: "none", display: "flex", alignItems: "center" }}>
                            <MdDelete size={20} color="#fff" />
                            <Typography variant="button" fontWeight={"bold"} sx={{ ml: 1 }} onClick={() => handleAllDelete()}>
                                Delete
                                ({selectItem.length > 0 ? selectItem.length : ""})
                            </Typography>
                        </Button>
                    </>
                ) : <Typography variant="h5" fontWeight={'bold'}>{formOpen ? (slug ? "แก้ไขสินค้า" : "เพิ่มสินค้า") : "สินค้าทั้งหมด"}</Typography>}
            </Box>

            {!formOpen ? ( // ถ้าเปิด form อยู่ให้ปิด
                <FilterSortSearchProduct
                    {...{
                        categoryFilter, formOpen, priceFilter,
                        query, setCategoryFilter, setFormOpen,
                        setPriceFilter, setQuery, setStatusFilter,
                        sortOrder, statusFilter, toggleSortOrder,
                        categories,
                    }}
                />
            ) : null}

            {!formOpen ? (
                <>
                    <ProductTable
                        {...{
                            handleDeleteProduct, loading,
                            products, selectItem,
                            setSelectItem, startEditing,
                        }} />

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={countProducts}
                        rowsPerPage={pageSize}
                        page={page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        nextIconButtonProps={{ disabled: (page * pageSize) >= countProducts }}
                        backIconButtonProps={{ disabled: page <= 1 }}
                        sx={{
                            color: "white",
                            "& .MuiSvgIcon-root": { color: "white" },
                            "& .MuiSelect-icon": { color: "white" },
                            "& .Mui-disabled": { color: "gray" },
                        }}
                    />
                </>
            ) : (
                <ProductForm {...{
                    productForm, setProductForm, slug, handleCreateProductAndUpdate,
                    handleRemoveImage, handleUndoDelete, handleUploadImage, imageUrl,
                    loadingImage, selectedImage, setSelectedImage, snackbarOpen,
                    setSnackbarOpen, startEditing, formOpen, setFormOpen, setSlug,
                    setImageUrl, brands, categories,
                }} />
            )}
        </Box>
    );
};

export default Products;